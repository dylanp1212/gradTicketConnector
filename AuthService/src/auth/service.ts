import { EncryptJWT, jwtDecrypt } from 'jose'
import { Authenticated, SessionUser } from '.'
import { pool } from '../db'
import { exchangeCodeForTokens, fetchGoogleProfile } from '../google'

if (!process.env.SECRET) {
  throw new Error('SECRET env var is required')
}

const SECRET = new TextEncoder().encode(process.env.SECRET)
const JWE_ALG = 'A128CBC-HS256'

export class AuthService {
  async issue(payload: SessionUser): Promise<string> {
    return new EncryptJWT({ ...payload })
      .setProtectedHeader({ alg: 'dir', enc: JWE_ALG })
      .setIssuedAt()
      .setExpirationTime('2h')
      .encrypt(SECRET)
  }

  async check(authHeader?: string): Promise<SessionUser> {
    if (!authHeader) throw new Error('Unauthorized')
    const token = authHeader.split(' ')[1]
    if (!token) throw new Error('Unauthorized')
    const { payload } = await jwtDecrypt<SessionUser>(token, SECRET, {
      contentEncryptionAlgorithms: [JWE_ALG],
    })
    return { id: payload.id, email: payload.email, name: payload.name }
  }

  async exchangeGoogle(code: string, redirectUri: string): Promise<Authenticated> {
    const tokens = await exchangeCodeForTokens(code, redirectUri)
    const profile = await fetchGoogleProfile(tokens.access_token)

    const existing = await pool.query<{ id: string }>(
      `SELECT id FROM member WHERE data->>'google_sub' = $1 LIMIT 1`,
      [profile.sub],
    )

    let memberId: string
    if (existing.rowCount && existing.rowCount > 0) {
      memberId = existing.rows[0].id
      await pool.query(
        `UPDATE member SET data = data || $1::jsonb WHERE id = $2`,
        [JSON.stringify({ email: profile.email, name: profile.name }), memberId],
      )
    } else {
      const inserted = await pool.query<{ id: string }>(
        `INSERT INTO member(data) VALUES ($1::jsonb) RETURNING id`,
        [JSON.stringify({ email: profile.email, name: profile.name, google_sub: profile.sub })],
      )
      memberId = inserted.rows[0].id
    }

    const accessToken = await this.issue({ id: memberId, email: profile.email, name: profile.name })
    return { name: profile.name, accessToken }
  }
}
