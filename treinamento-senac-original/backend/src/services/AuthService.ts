import jwt, { type SignOptions } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { db } from '../database.js'
import { authConfig } from '../config/AuthConfig.js'
import { HttpError } from '../errors/HttpError.js'
import type { UserAuth } from '../models/interfaces/Auth.js'

type UserRow = {
  id: number
  name: string
  email: string
  password: string
  role: string
}

export const getMe = async (userId: number) => {
  const [rows] = await db.query(
    'SELECT id, name, email, role FROM users WHERE id = ? LIMIT 1',
    [userId],
  )

  const user = (rows as UserAuth[])[0]
  if (!user) {
    throw new Error('User not found')
  }

  return { id: user.id, name: user.name, email: user.email, role: user.role }
}

export const login = async (email: string, password: string) => {
  const [rows] = await db.query(
    'SELECT id, name, email, password, role FROM users WHERE email = ? LIMIT 1',
    [email],
  )

  const user = (rows as UserRow[])[0]
  if (!user) {
    throw new HttpError(401, 'Email ou senha incorretos')
  }

  const valid = await bcrypt.compare(password, user.password)

  if (!valid) {
    throw new HttpError(401, 'Email ou senha incorretos')
  }

  const options: SignOptions = {
    expiresIn: authConfig.expiresIn as unknown as SignOptions['expiresIn'],
  }

  const token = jwt.sign(
    {
      sub: user.id,
      name: user.name,
      role: user.role,
    },
    authConfig.jwtSecret as string,
    options,
  )

  return { accessToken: token }
}

export const register = async (data: {
  name: string
  email: string
  password: string
}) => {
  const hash = await bcrypt.hash(data.password, authConfig.saltRounds)

  const [result] = await db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [data.name, data.email, hash],
  )

  const insertId = (result as any).insertId

  return { id: insertId, name: data.name, email: data.email }
}
