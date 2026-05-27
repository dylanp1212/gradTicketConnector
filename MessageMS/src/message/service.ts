import {pool} from '../db'
import {Message, NewMessage} from '.'

interface rowreturn {
  data: Message,
}

interface memberrow {
  partner: string,
}

export class MessageService {
  public async getAllMessages(): Promise<Message[]> {
    const q = `
      SELECT data || jsonb_build_object('id', id) AS data 
      FROM message 
      ORDER BY id DESC
    `;
    const query = {text: q, values: []};
    const rows = (await pool.query<rowreturn>(query)).rows;
    return rows.map(r => r.data);
  }

  public async createMessage(nm: NewMessage): Promise<Message> {
    const q = `
      INSERT INTO message(memberto, memberfrom, data)
      VALUES ($1::uuid, $2::uuid,
        jsonb_build_object(
          'content', $3::text,
          'sent', NOW()
        )
      )
      RETURNING data || jsonb_build_object('id', id)
        || jsonb_build_object('memberto', memberto)
        || jsonb_build_object('memberfrom', memberfrom) AS data
    `;
    const query = {text: q, values: [nm.memberto, nm.memberfrom, nm.content]};
    const rows = (await pool.query<rowreturn>(query)).rows;
    return (rows[0].data)
  }

  public async getConvo(member1: string, member2: string): Promise<Message[]> {
    const q = `
      SELECT data || jsonb_build_object('id', id)
        || jsonb_build_object('memberto', memberto)
        || jsonb_build_object('memberfrom', memberfrom) AS data
      FROM message
      WHERE (memberto = $1 AND memberfrom = $2)
        OR (memberto = $2 AND memberfrom = $1)
    `;
    const query = {text: q, values: [member1, member2]};
    const rows = (await pool.query<rowreturn>(query)).rows;
    const messages = [];
    for (const row of rows) {
      messages.push(row.data);
    }
    return (messages);
  }

  public async getAllConvos(id: string): Promise<string[]> {
    const q = `
      SELECT partner
      FROM (
        SELECT memberto AS partner, (data->>'sent')::timestamptz AS sent
        FROM message
        WHERE memberfrom = $1
        UNION ALL
        SELECT memberfrom AS partner, (data->>'sent')::timestamptz AS sent
        FROM message
        WHERE memberto = $1
      ) t
      GROUP BY partner
      ORDER BY MAX(sent) DESC
    `;
    const query = {text: q, values: [id]};
    const rows = (await pool.query<memberrow>(query)).rows;
    const convos = [];
    for (const row of rows) {
      convos.push(row.partner);
    }
    return (convos);
  }
}
