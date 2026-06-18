interface TodoBase {
  title: string
}

export interface Todo extends TodoBase {
  id: number
  user_id: number
  completed: boolean
}

export type CreateTodo = TodoBase

export interface TodoUpdate extends TodoBase {
  completed?: boolean
}
