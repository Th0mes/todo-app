import { useState } from 'react'
import { Logo, Clipboard } from './assets'

import { PlusCircleIcon } from '@heroicons/react/24/outline'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTodoStore } from './hooks/useTodos'

function App() {
  const [inputText, setInputText] = useState<string>('')
  const { todos, addTodo, removeTodo, toggleCompletedState } = useTodoStore()

  const completedTodos = todos.filter((todo) => todo.completed === true).length

  const handleSubmitTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTodo(inputText)
  }

  return (
    <>
      <div className="h-screen w-screen text-white">
        <header className="centralize h-1/6 bg-gray-700">
          <Logo />
        </header>
        <main className="h-5/6 bg-gray-600">
          <div className="mx-auto h-full max-w-screen-md">
            <form
              className="relative bottom-5 flex w-full gap-2"
              onSubmit={(e) => handleSubmitTodo(e)}
            >
              <input
                type="text"
                className="w-full rounded-lg border border-gray-700 bg-gray-500 px-4 placeholder:font-light"
                placeholder="Adicione uma nova tarefa"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputText(e.target.value)
                }
              />
              <button
                type="submit"
                className="centralize rounded-lg bg-blue-dark py-2 px-4 font-bold text-gray-100"
              >
                <span>Criar</span> <PlusCircleIcon className="h5 ml-2 w-5" />
              </button>
            </form>

            <div className="h-2/5 space-y-12">
              <div className="flex items-center justify-between font-bold">
                <p className="text-blue">
                  Tarefas cridas
                  <span className="ml-2 rounded-xl bg-gray-400 px-3 text-white">
                    {todos.length}
                  </span>
                </p>
                <p className="text-purple">
                  Concluídas
                  <span className="ml-2 rounded-xl bg-gray-400 px-3 text-white">
                    {todos.length <= 0
                      ? 0
                      : `${todos.length} de ${completedTodos}`}
                  </span>
                </p>
              </div>

              {todos.length ? (
                todos.map((todo) => (
                  <div key={todo.id}>
                    <p>{todo.description}</p>
                    <button type="button" onClick={() => removeTodo(todo.id)}>
                      remove
                    </button>
                  </div>
                ))
              ) : (
                <div className="centralize flex h-full w-full flex-col gap-2 rounded-lg border-t border-gray-400">
                  <Clipboard className="h-16 w-16 text-gray-400 opacity-50" />
                  <p className="text-center text-gray-300">
                    <b className="block">
                      Você ainda não tem tarefas cadastradas
                    </b>
                    Crie tarefas e organize seus itens a fazer
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <ToastContainer autoClose={3000} />
    </>
  )
}

export default App
