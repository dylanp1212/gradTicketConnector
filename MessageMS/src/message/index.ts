/** @format uuid */
export type UUID = string

export interface Message {
  id: string
  memberto: string
  memberfrom: string
  content: string
  sent: Date
  listing?: string
  listingtitle?: string
}

export interface NewMessage {
  memberto: string
  memberfrom: string
  content: string
  listing?: string
  listingtitle?: string
}