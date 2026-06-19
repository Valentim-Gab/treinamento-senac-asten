import type { Request, Response } from 'express'
import * as authService from '../services/AuthService.js'
import type { Login, Register } from '../models/interfaces/Auth.js'

export const getMe = async (req: Request, res: Response) => {
  const user = await authService.getMe(req.userId!)
  res.json(user)
}

export const login = async (req: Request<{}, {}, Login>, res: Response) => {
  const { email, password } = req.body

  const data = await authService.login(email, password)
  res.json(data)
}

export const register = async (
  req: Request<{}, {}, Register>,
  res: Response,
) => {
  const user = await authService.register(req.body)
  res.status(201).json(user)
}
