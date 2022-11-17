import { toast } from 'react-toastify'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { v4 as uuid } from 'uuid'

export interface Todo {
  id: string
  description: string
  completed: boolean
}

export interface TodoStore {
  todos: Todo[]
  addTodo: (description: string) => void
  removeTodo: (id: string) => void
  toggleCompletedState: (id: string) => void
}

export const useTodo = create<TodoStore>()(
  persist((set) => ({
    todos: [],
    addTodo: (description: string) =>
      set(({ todos }) => ({
        todos: [
          ...todos,
          {
            id: uuid(),
            description,
            completed: false,
          },
        ],
      })),
    removeTodo: (id: string) =>
      set(({ todos }) => ({ todos: todos.filter((todo) => todo.id !== id) })),
    toggleCompletedState: (id: string) =>
      set(({ todos }) => ({
        todos: todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
      })),
  }))
)
