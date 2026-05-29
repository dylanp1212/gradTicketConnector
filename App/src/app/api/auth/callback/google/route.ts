import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '../../../../../auth/service'

const SESSION_COOKIE = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 2 * 60 * 60,
  path: '/',
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const code = req.nextUrl.searchParams.get('code')
  const state = req.nextUrl.searchParams.get('state')
  const storedState = req.cookies.get('oauth_state')?.value
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  const origin = process.env.APP_URL ?? req.nextUrl.origin
  const returnTo = req.cookies.get('oauth_return_to')?.value ?? `${base}/`
  const loginUrl = new URL(`${base}/login`, origin)

  if (!code || !state || !storedState || state !== storedState) {
    console.error('[auth/callback] state mismatch', { code: !!code, state, storedState })
    return NextResponse.redirect(loginUrl)
  }

  const redirectUri = `${origin}${base}/api/auth/callback/google`
  console.log('[auth/callback] exchanging code, redirectUri:', redirectUri)
  const authenticated = await new AuthService().exchangeGoogle(code, redirectUri)
  console.log('[auth/callback] exchangeGoogle result:', authenticated ? `ok (${authenticated.name})` : 'undefined')

  if (!authenticated) {
    return NextResponse.redirect(loginUrl)
  }

  const response = NextResponse.redirect(new URL(returnTo, origin))
  response.cookies.set('session', authenticated.accessToken, SESSION_COOKIE)
  response.cookies.delete('oauth_state')
  response.cookies.delete('oauth_return_to')
  return response
}
