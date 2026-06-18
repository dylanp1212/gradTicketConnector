import 'server-only'

import {Message, NewMessage} from '.'

const MS_URL = 'http://localhost:3004/api/v0/message'

export class MessageService {
  public async createMessage(message: NewMessage): Promise<Message> {
    const res = await fetch(MS_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(message),
    })
    return res.json() as Promise<Message>
  }

  public async getAllConvos(id: string): Promise<string[]> {
    const res = await fetch(`${MS_URL}/convos/${id}`)
    return res.json() as Promise<string[]>
  }

  public async getConvo(member1: string, member2: string): Promise<Message[]> {
    const res = await fetch(`${MS_URL}/convo/${member1}/${member2}`)
    return res.json() as Promise<Message[]>
  }
}
