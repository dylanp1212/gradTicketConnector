'use server'

import {MemberService} from './service'

export async function getMemberName(id: string): Promise<string | undefined> {
  return new MemberService().getName(id)
}
