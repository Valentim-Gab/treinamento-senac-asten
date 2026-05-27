import { db } from '../database.js'
import type { User } from '../models/interfaces/User.js'

export const findAll = async () => {
  const [rows] = await db.query('SELECT id, name FROM users')
  return rows as User[]
}

export const create = async (data: {
  name: string
  email: string
  password: string
}) => {
  const [result] = await db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [data.name, data.email, data.password],
  )

  const insertId = (result as any).insertId

  return {
    id: insertId,
    name: data.name,
  }
}
