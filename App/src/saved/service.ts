import 'server-only'

import {Listing} from '../listing'

const MS_URL = 'http://localhost:3003/api/v0/saved'

export class SavedService {
  public async saveListing(id: string, listingid: string): Promise<string> {
    const res = await fetch(`${MS_URL}/${id}/${listingid}`, {method: 'POST'})
    return res.text()
  }

  public async removeSavedListing(id: string, listingid: string): Promise<string> {
    const res = await fetch(`${MS_URL}/${id}/${listingid}`, {method: 'DELETE'})
    return res.text()
  }

  public async checkSaved(id: string, listingid: string): Promise<boolean> {
    const res = await fetch(`${MS_URL}/${id}/${listingid}`)
    return res.json() as Promise<boolean>
  }

  public async getAllSavedListings(id: string): Promise<Listing[]> {
    const res = await fetch(`${MS_URL}/${id}`)
    return res.json() as Promise<Listing[]>
  }
}
