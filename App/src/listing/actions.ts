'use server'

import {Listing, Options} from '.'
import {ListingService} from './service'

export async function getListingById(id: string): Promise<Listing | null> {
  return new ListingService().getListingById(id);
}

export async function getAllListings(options: Options = {}): Promise<Listing[]> {
  return new ListingService().getAllListings(options);
}
