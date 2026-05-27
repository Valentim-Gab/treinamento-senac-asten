import type { Request, Response } from 'express'
import * as authService from '../services/AuthService.js'

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const data = await authService.login(email, password)

  res.json(data)
}

export const register = async (req: Request, res: Response) => {
  const user = await authService.register(req.body)
  res.status(201).json(user)
}