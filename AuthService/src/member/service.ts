import {pool} from '../db'

export class MemberService {
  async getName(id: string): Promise<string | null> {
    const result = await pool.query<{name: string}>(
      `SELECT data->>'name' AS name FROM member WHERE id = $1::uuid LIMIT 1`,
      [id],
    )
    return result.rows[0]?.name ?? null
  }
}
