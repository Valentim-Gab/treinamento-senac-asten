import type { Todo } from '@/interfaces/Todo'
import { findTodos } from '@/services/TodoService'
import { useEffect, useState } from 'react'
import './todolist.css'

export default function TodolistPage() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    void findTodos()
      .then((data) => {
        setTodos(data)
      })
      .catch((error) => {
        console.error('Error fetching todos:', error)
      })
  }, [])

  return (
    <main className="todo-container">
      <ul className="todo-list">
        {todos.length > 0 &&
          todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <input type="checkbox" checked={todo.completed} readOnly />
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
              <button className="todo-button-delete">Excluir</button>
            </li>
          ))}
      </ul>
    </main>
  )
}
