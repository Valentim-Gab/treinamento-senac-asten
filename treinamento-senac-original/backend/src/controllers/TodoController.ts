import type { Request, Response } from 'express'
import * as todoService from '../services/TodoService.js'
import type { Todo, TodoCreate, TodoUpdate } from '../models/interfaces/Todo.js'

export const create = async (
  req: Request<{}, {}, TodoCreate>,
  res: Response,
) => {
  const todo = await todoService.create(req.userId!, req.body)
  res.status(201).json(todo)
}

export const findAll = async (req: Request<{}, {}, Todo>, res: Response) => {
  const todos = await todoService.findAllByUser(req.userId!)
  res.json(todos)
}

export const findOne = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
) => {
  const todo = await todoService.findById(req.userId!, Number(req.params.id))

  if (!todo) return res.status(404).json({ message: 'Not found' })

  res.json(todo)
}

export const update = async (
  req: Request<{ id: string }, {}, TodoUpdate>,
  res: Response,
) => {
  const todo = await todoService.update(
    req.userId!,
    Number(req.params.id),
    req.body,
  )

  res.json(todo)
}

export const updateCompleted = async (
  req: Request<{ id: string }, {}, { completed: boolean }>,
  res: Response,
) => {
  const todo = await todoService.updateCompleted(
    req.userId!,
    Number(req.params.id),
    req.body.completed,
  )

  res.json(todo)
}

export const remove = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
) => {
  await todoService.remove(req.userId!, Number(req.params.id))
  res.status(204).send()
}
