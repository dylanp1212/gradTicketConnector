export type Ceremony = 'cowell' | 'stevenson' | 'crown' | 'merrill' | 'porter' | 'kresge' | 'oakes' | 'rcc' | 'c9' | 'jrl'

export interface Listing {
  cerimony: Ceremony
  member: string
  listed: Date
  quantity: number
  title: string
  description: string
  method: string[]
  available: boolean
  verified: boolean
}
