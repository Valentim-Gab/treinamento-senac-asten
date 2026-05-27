import jwt, { type SignOptions } from 'jsonwebtoken'
import { db } from '../database.js'
import { authConfig } from '../config/AuthConfig.js'
import bcrypt from 'bcrypt'

type User = {
  id: number
  name: string
  email: string
  password: string
  role: string
}

export const login = async (email: string, password: string) => {
  const [rows] = await db.query(
    'SELECT id, name, email, password, role FROM users WHERE email = ?',
    [email],
  )

  const user = (rows as User[])[0]
  if (!user) {
    throw new Error('Email ou senha incorretos')
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw new Error('Email ou senha incorretos')
  }

  const options: SignOptions = {
    expiresIn: authConfig.expiresIn as unknown as SignOptions['expiresIn'],
  }

  const token = jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
    },
    authConfig.jwtSecret as string,
    options,
  )

  return {
    accessToken: token,
  }
}

export const register = async (data: {
  name: string
  email: string
  password: string  
}) => {
  const hash = await bcrypt.hash(data.password, authConfig.saltsRounds)

  const [result] = await db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [data.name, data.email, hash]
  )

  const insertId = (result as any).insertId

  return {
    id: insertId,
    name: data.name,
    email: data.email,
  }
}