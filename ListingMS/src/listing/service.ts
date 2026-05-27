import {pool} from '../db'
import {Listing, Options, NewListing} from '.'

interface rowreturn {
  data: Listing,
}

export class ListingService {
  public async getAllListings(options: Options): Promise<Listing[]> {
    const conditions: string[] = []
    const vals: string[] = []
    let valcounter = 1;
    if (options.ceremonies && options.ceremonies.length > 0) {
      let clause = `(data->>'ceremony' = $${valcounter}`
      valcounter += 1
      vals.push(options.ceremonies[0])
      for (let c = 1; c < options.ceremonies.length; c++) {
        clause = clause + ` OR data->>'ceremony' = $${valcounter}`
        valcounter += 1
        vals.push(options.ceremonies[c])
      }
      clause = clause + ')'
      conditions.push(clause)
    }
    if (options.method && options.method.length > 0) {
      let clause = `(data->'method' ? $${valcounter}`
      valcounter += 1
      vals.push(options.method[0])
      for (let m = 1; m < options.method.length; m++) {
        clause = clause + ` OR data->'method' ? $${valcounter}`
        valcounter += 1
        vals.push(options.method[m])
      }
      clause = clause + ')'
      conditions.push(clause)
    }
    if (options.term) {
      conditions.push(`data->>'term' = $${valcounter}`)
      valcounter += 1
      vals.push(options.term)
    }
    if (options.available) {
      conditions.push(`data->>'available' = 'true'`)
    }
    if (options.verified) {
      conditions.push(`data->>'verified' = 'true'`)
    }
    // console.log(vals)
    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
    const q = `
      SELECT data || jsonb_build_object('id', id) || jsonb_build_object('member', member) AS data
      FROM listing
      ${whereClause}
      ORDER BY data->>'listed' DESC
    `;
    const query = {
      text: q,
      values: vals,
    };
    const rows = (await pool.query<rowreturn>(query)).rows;
    const listings = [];
    for (const row of rows) {
      listings.push(row.data);
    }
    return (listings);
  }
  public async getListingsById(id: string): Promise<Listing|undefined> {
    const q = `
      SELECT data || jsonb_build_object('id', id) || jsonb_build_object('member', member) AS data
      FROM listing
      WHERE id = $1
    `;
    const query = {
      text: q,
      values: [id],
    };
    const rows = (await pool.query<rowreturn>(query)).rows;
    if (rows.length < 1) {
      return (undefined)
    }
    return (rows[0].data)
  }

  public async createListing(nl: NewListing): Promise<Listing> {
    const q = `
      INSERT INTO listing (member, data)
      VALUES ($1::uuid,
        jsonb_build_object(
          'ceremony', $2::text,
          'term', $3::text,
          'listed', NOW(),
          'quantity', $4::numeric,
          'title', $5::text,
          'description', $6::text,
          'method', $7::text[],
          'available', 'true'::jsonb,
          'verified', $8::jsonb
        )
      )
      RETURNING data || jsonb_build_object('id', id) || jsonb_build_object('member', member) AS data
    `;
    const query = {
      text: q,
      values: [nl.member, nl.ceremony, nl.term, nl.quantity, nl.title,
        nl.description, nl.method, nl.verified],
    };
    const rows = (await pool.query<rowreturn>(query)).rows;
    return (rows[0].data)
  }
}
