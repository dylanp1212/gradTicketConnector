// import 'server-only'

// needed to not get error in testing environment
const isTest = process.env.NODE_ENV === 'test';
if (!isTest) {
  await import('server-only');
}

import {Listing, Options} from '.'

const MS_URL = 'http://localhost:3003/api/v0/listing'

export class ListingService {
  public async getListingById(id: string): Promise<Listing | null> {
    const res = await fetch(`${MS_URL}/${id}`)
    if (!res.ok) return null
    return res.json() as Promise<Listing>
  }

  public async getAllListings(options: Options = {}): Promise<Listing[]> {
    const params = new URLSearchParams()
    // console.log(options)
    if (options.ceremonies?.length) {
      // console.log(options.ceremonies)
      options.ceremonies.forEach(c => params.append('ceremonies', c))
    }
    if (options.term) params.set('term', options.term)
    if (options.quantity != null) params.set('quantity', String(options.quantity))
    if (options.method?.length) {
      options.method.forEach(m => params.append('method', m))
    }
    if (options.available != null) params.set('available', String(options.available))
    if (options.verified != null) params.set('verified', String(options.verified))

    const url = params.size ? `${MS_URL}?${params}` : MS_URL
    const res = await fetch(url)
    return res.json() as Promise<Listing[]>
  }
}
