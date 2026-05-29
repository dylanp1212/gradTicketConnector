import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest): NextResponse {
  const session = request.cookies.get('session')?.value
  if (!session) {
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
    const loginUrl = new URL(`${base}/login`, request.url)
    loginUrl.searchParams.set('returnTo', `${base}${request.nextUrl.pathname}`)
    return NextResponse.redirect(loginUrl)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/(my-tickets|saved|new|messages)(.*)'],
}
