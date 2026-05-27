'use server'

import {Message, NewMessage} from '.'
import {MessageService} from './service'

export async function createMessage(message: NewMessage): Promise<Message> {
  return new MessageService().createMessage(message);
}

export async function getAllConvos(id: string): Promise<string[]> {
  return new MessageService().getAllConvos(id);
}

export async function getConvo(member1: string, member2: string): Promise<Message[]> {
  return new MessageService().getConvo(member1, member2);
}
