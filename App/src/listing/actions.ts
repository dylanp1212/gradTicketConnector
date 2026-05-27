'use server'

import {Listing, Options} from '.'
import {ListingService} from './service'

export async function getAllListings(options: Options = {}): Promise<Listing[]> {
  return new ListingService().getAllListings(options);
}
