import { db } from '../database.js'
import type { Todo } from '../models/interfaces/Todo.js'

export const create = async (
  userId: number,
  data: { title: string },
): Promise<Todo> => {
  const [result] = await db.query(
    'INSERT INTO todos (user_id, title) VALUES (?, ?)',
    [userId, data.title],
  )

  const insertId = (result as any).insertId

  return {
    id: insertId,
    user_id: userId,
    title: data.title,
    completed: false,
  }
}

export const findAllByUser = async (userId: number): Promise<Todo[]> => {
  const [rows] = await db.query(
    'SELECT id, user_id, title, completed FROM todos WHERE user_id = ?',
    [userId],
  )

  const todos = rows as Todo[]

  return todos.map((row: Todo) => ({
    ...row,
    completed: Boolean(row.completed),
  }))
}

export const findById = async (
  userId: number,
  id: number,
): Promise<Todo | null> => {
  const [rows] = await db.query(
    'SELECT id, user_id, title, completed FROM todos WHERE id = ? AND user_id = ? AND LIMIT 1',
    [id, userId],
  )

  const todo = (rows as Todo[])[0]
  todo.completed = Boolean(todo.completed)

  return todo || null
}

export const update = async (
  userId: number,
  id: number,
  data: { title?: string; completed?: boolean },
) => {
  await db.query(
    `
    UPDATE todos
    SET title = ?,
        completed = ?
    WHERE id = ? AND user_id = ?
    `,
    [data.title ?? null, data.completed ?? null, id, userId],
  )

  return findById(userId, id)
}

export const updateCompleted = async (
  userId: number,
  id: number,
  completed: boolean,
) => {
  await db.query(
    `
      UPDATE todos
      SET completed = ?
      WHERE id = ? AND user_id = ?
    `,
    [completed, id, userId],
  )

  return findById(userId, id)
}

export const remove = async (userId: number, id: number) => {
  await db.query('DELETE FROM todos WHERE id = ? AND user_id = ?', [id, userId])
}
