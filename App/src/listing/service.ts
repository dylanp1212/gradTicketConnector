// import 'server-only'

// needed to not get error in testing environment
const isTest = process.env.NODE_ENV === 'test';
if (!isTest) {
  await import('server-only');
}

import {Listing} from '.'

const MS_URL = 'http://localhost:3003/api/v0/listing'

export class ListingService {
  public async getAllListings(): Promise<Listing[]> {
    const res = await fetch(MS_URL)
    return res.json() as Promise<Listing[]>
  }
}
