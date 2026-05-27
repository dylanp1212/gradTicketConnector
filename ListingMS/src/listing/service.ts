import {pool} from '../db'
import {Listing, Options} from '.'

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
    return(listings);
  }
}