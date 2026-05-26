import { Authenticated, ExchangeRequest, SessionUser } from '.'

function authServiceUrl(): string {
  return process.env.AUTH_SERVICE_URL ?? 'http://localhost:3002'
}

export class AuthService {
  async exchangeGoogle(code: string, redirectUri: string): Promise<Authenticated | undefined> {
    try {
      const body: ExchangeRequest = { code, redirectUri }
      const response = await fetch(`${authServiceUrl()}/api/v0/auth/google/exchange`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!response.ok) {
        console.error('[AuthService.exchangeGoogle] non-ok response:', response.status, await response.text())
        return undefined
      }
      return (await response.json()) as Authenticated
    } catch (err) {
      console.error('[AuthService.exchangeGoogle] fetch failed:', err)
      return undefined
    }
  }

  async check(accessToken: string): Promise<SessionUser | undefined> {
    try {
      const response = await fetch(`${authServiceUrl()}/api/v0/check`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      if (!response.ok) return undefined
      return (await response.json()) as SessionUser
    } catch {
      return undefined
    }
  }
}
