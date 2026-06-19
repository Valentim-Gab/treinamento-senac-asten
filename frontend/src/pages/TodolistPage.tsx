import type { Todo } from '@/interfaces/Todo'
import {
  createTodo,
  deleteTodo,
  findTodos,
  updateTodoCompleted,
} from '@/services/TodoService'
import { useEffect, useState } from 'react'
import './todolist.css'

export default function TodolistPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    void findTodos()
      .then((data) => {
        setTodos(data)
      })
      .catch((error) => {
        console.error('Error fetching todos:', error)
      })
  }, [])

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
      alert('Error creating todo')
    }
  }

  const handleCompleted = async (id: number, completed: boolean) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: completed } : todo,
      ),
    )

    try {
      await updateTodoCompleted(id, completed)
    } catch {
      alert('Error updating todo')

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo,
        ),
      )
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id)
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    } catch {
      alert('Error deleting todo')
    }
  }

  return (
    <main className="todo-container">
      <h1 className="todo-title">Todolist</h1>

      <form className="todo-input-container" onSubmit={handleAdd}>
        <input
          type="text"
          className="todo-input"
          placeholder="Digite uma tarefa..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="todo-button-add" type="submit">
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
              <button className="todo-button-edit">Editar</button>
              <button
                className="todo-button-delete"
                onClick={() => handleDelete(todo.id)}
              >
                Excluir
              </button>
            </li>
          ))}
      </ul>
    </main>
  )
}
