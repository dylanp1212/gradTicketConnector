import {pool} from '../db'
import {Listing} from '../listing'

interface rowreturn {
  data: Listing,
}

export class ListingService {
  public async saveListing(id: string, listingid: string): Promise<string> {
    const q = `
      INSERT INTO saved(member, listing, data)
      VALUES ($1, $2, jsonb_build_object('saved', NOW()))
    `;
    const query = {
      text: q,
      values: [id, listingid],
    };
    await pool.query<rowreturn>(query)
    return (listingid)
  }

  public async checkSaved(id: string, listingid: string): Promise<boolean> {
    const q = `
      SELECT listing
      FROM saved
      WHERE member = $1 AND listing = $2
    `;
    const query = {
      text: q,
      values: [id, listingid],
    };
    const rows = (await pool.query<rowreturn>(query)).rows;
    return (rows.length > 0)
  }

  public async removeSavedListing(id: string, listingid: string): Promise<string> {
    const q = `
      DELETE FROM saved
      WHERE member = $1 AND listing = $2
    `;
    const query = {text: q, values: [id, listingid]};
    await pool.query<rowreturn>(query)
    return (listingid)
  }

  public async getAllSavedListings(id: string): Promise<Listing[]> {
    const q = `
      SELECT data || jsonb_build_object('id', id) || jsonb_build_object('member', member) AS data
      FROM saved
      WHERE member = $1
      ORDER BY data->>'saved' DESC
    `;
    const query = {
      text: q,
      values: [id],
    };
    const rows = (await pool.query<rowreturn>(query)).rows;
    const savedListings = [];
    for (const row of rows) {
      savedListings.push(row.data);
    }
    return (savedListings);
  }
}