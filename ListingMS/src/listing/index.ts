/** @format uuid */
export type UUID = string

export type Ceremony = 'cowell' | 'stevenson' | 'crown' | 'merrill' | 'porter' | 'kresge' | 'oakes' | 'rcc' | 'c9' | 'jrl' | 'baskin'

export interface Listing {
  id: string
  ceremony: Ceremony
  term: string
  member: string
  listed: Date
  quantity: number
  title: string
  description: string
  method: string[]
  available: boolean
  verified: boolean
}

export interface NewListing {
  ceremony: Ceremony
  term: string
  member: string
  quantity: number
  title: string
  description: string
  method: string[]
  verified: boolean
}

export interface Options {
  ceremonies?: Ceremony[]
  term?: string
  quantity?: number
  method?: string[]
  available?: boolean
  verified?: boolean
}