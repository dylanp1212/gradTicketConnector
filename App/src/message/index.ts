export interface Message {
  id: string
  memberto: string
  memberfrom: string
  content: string
  sent: Date
  listing?: string
}

export interface NewMessage {
  memberto: string
  memberfrom: string
  content: string
  listing?: string
}