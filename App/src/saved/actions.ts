'use server'

import {Listing} from '../listing'
import {SavedService} from './service'

export async function saveListing(id: string, listingid: string): Promise<string> {
  return new SavedService().saveListing(id, listingid);
}

export async function removeSavedListing(id: string, listingid: string): Promise<string> {
  return new SavedService().removeSavedListing(id, listingid);
}

export async function checkSaved(id: string, listingid: string): Promise<boolean> {
  return new SavedService().checkSaved(id, listingid);
}

export async function getAllSavedListings(id: string): Promise<Listing[]> {
  return new SavedService().getAllSavedListings(id);
}
