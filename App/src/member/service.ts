import 'server-only'

function authServiceUrl(): string {
  return process.env.AUTH_SERVICE_URL ?? 'http://localhost:3002'
}

export class MemberService {
  async getName(id: string): Promise<string | undefined> {
    try {
      const res = await fetch(`${authServiceUrl()}/api/v0/member/${id}/name`)
      if (!res.ok) return undefined
      const body = await res.json() as {name: string}
      return body.name
    } catch {
      return undefined
    }
  }
}
