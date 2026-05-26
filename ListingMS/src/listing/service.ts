import {pool} from '../db'
import {Listing} from '.'

interface rowreturn {
  data: Listing,
}

export class ListingService {
  public async getAllListings(): Promise<Listing[]> {
    const q = `
      SELECT data || jsonb_build_object('id', id) || jsonb_build_object('member', member) AS data
      FROM listing
      ORDER BY data->>'listed' DESC
    `;
    const query = {
      text: q,
      values: [],
    };
    const rows = (await pool.query<rowreturn>(query)).rows;
    const listings = [];
    for (const row of rows) {
      listings.push(row.data);
    }
    return(listings);
  }
}