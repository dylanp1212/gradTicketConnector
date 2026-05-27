'use server'

import {Listing, NewListing, Options} from '.'
import {ListingService} from './service'

export async function getAllListingsByMember(member: string): Promise<Listing[]> {
  return new ListingService().getAllListingsByMember(member);
}

export async function createNewListing(listing: NewListing): Promise<Listing> {
  return new ListingService().createNewListing(listing);
}

export async function getListingById(id: string): Promise<Listing | null> {
  return new ListingService().getListingById(id);
}

export async function editQuantity(id: string, quantity: number): Promise<Listing | null> {
  return new ListingService().editQuantity(id, quantity);
}

export async function editMethod(id: string, method: string[]): Promise<Listing | null> {
  return new ListingService().editMethod(id, method);
}

export async function editAvailable(id: string, available: boolean): Promise<Listing | null> {
  return new ListingService().editAvailable(id, available);
}

export async function getAllListings(options: Options = {}): Promise<Listing[]> {
  return new ListingService().getAllListings(options);
}
