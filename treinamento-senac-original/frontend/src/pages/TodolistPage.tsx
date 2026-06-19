import { RequireAuth } from '@/guards/RequireAuth'
import type { Todo } from '@/interfaces/Todo'
import {
  createTodo,
  deleteTodo,
  findTodos,
  updateTodo,
  updateTodoCompleted,
} from '@/services/todo-service'
import { formatError } from '@/utils/ErrorUtils'
import { useEffect, useState } from 'react'
import './todolist.css'
import ModalMain from '@/components/ModalMain/ModalMain'

export default function TodolistPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [open, setOpen] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
  const [updateTitle, setUpdateTitle] = useState('')

  useEffect(() => {
    void findTodos()
      .then((todos) => setTodos(todos))
      .catch((error) =>
        console.error('Error fetching todos:', formatError(error).message),
      )
  }, [])

  const handleOpenModalEdit = (value: boolean, todo?: Todo) => {
    if (!value || !todo) {
      setOpen(false)
      setSelectedTodo(null)
      setUpdateTitle('')

      return
    }

    setSelectedTodo(todo)
    setUpdateTitle(todo.title)
    setOpen(true)
  }

  const handleAdd = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (!newTodo.trim()) {
      return
    }

    try {
      const todo = await createTodo({ title: newTodo })

      setTodos((prev) => [...prev, todo])
      setNewTodo('')
    } catch {
      console.error('Erro ao criar todo')
    }
  }

  const handleUpdate = async (id: number, title: string) => {
    try {
      const updated = await updateTodo(id, { title })
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)))
      setOpen(false)
    } catch {
      console.error('Erro ao atualizar todo')
    }
  }

  const handleCompleted = async (id: number, completed: boolean) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed } : t)))

    try {
      await updateTodoCompleted(id, completed)
    } catch {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !completed } : t)),
      )

      alert('Erro ao atualizar tarefa')
    }
  }

  const handleRemove = async (id: number) => {
    try {
      await deleteTodo(id)
      setTodos((prev) => prev.filter((t) => t.id !== id))
    } catch {
      console.error('Erro ao excluir todo')
    }
  }

  return (
    <RequireAuth>
      <main className="todo-container">
        <h1 className="todo-title">Todolist</h1>

        <form className="todo-input-container" onSubmit={handleAdd}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Digite uma tarefa..."
            className="todo-input"
          />
          <button type="submit" className="todo-button-add">
            Adicionar
          </button>
        </form>

        <ul className="todo-list">
          {todos.length > 0 &&
            todos.map((todo) => (
              <li key={todo.id} className="todo-item">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => handleCompleted(todo.id, e.target.checked)}
                />
                <span
                  className="todo-text"
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    opacity: todo.completed ? 0.6 : 1,
                  }}
                >
                  {todo.title}
                </span>
                <button
                  onClick={() => handleOpenModalEdit(true, todo)}
                  className="todo-button-edit"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleRemove(todo.id)}
                  className="todo-button-delete"
                >
                  Excluir
                </button>
              </li>
            ))}
        </ul>

        {open && (
          <ModalMain title="Meu Modal" handleClose={() => setOpen(false)}>
            <form
              className="todo-form"
              onSubmit={(e) => {
                e.preventDefault()

                if (selectedTodo) {
                  handleUpdate(selectedTodo.id, updateTitle)
                }
              }}
            >
              <input
                type="text"
                value={updateTitle}
                onChange={(e) => setUpdateTitle(e.target.value)}
                placeholder="Digite o título da tarefa..."
                className="todo-form-input"
              />

              <button type="submit" className="todo-form-button">
                Atualizar
              </button>
            </form>
          </ModalMain>
        )}
      </main>
    </RequireAuth>
  )
}
