'use server'

import {Listing, NewListing, Options} from '.'
import {ListingService} from './service'

export async function createNewListing(listing: NewListing): Promise<Listing> {
  return new ListingService().createNewListing(listing);
}

export async function getListingById(id: string): Promise<Listing | null> {
  return new ListingService().getListingById(id);
}

export async function getAllListings(options: Options = {}): Promise<Listing[]> {
  return new ListingService().getAllListings(options);
}
