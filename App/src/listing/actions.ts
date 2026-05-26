'use server'

import {Listing} from '.'
import {ListingService} from './service'

export async function getAllListings(): Promise<Listing[]> {
  return new ListingService().getAllListings();
}
