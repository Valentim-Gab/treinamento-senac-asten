import type { Request, Response } from 'express'
import * as userService from '../services/UserService.js'
import type { UserCreate } from '../models/interfaces/User.js'

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.findAll()
  res.json(users)
}

export const createUser = async (
  req: Request<{}, {}, UserCreate>,
  res: Response,
) => {
  const user = await userService.create(req.body)
  res.status(201).json(user)
}
