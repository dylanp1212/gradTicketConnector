import {pool} from '../db'
import {Message, NewMessage} from '.'

interface rowreturn {
  data: Message,
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
}
