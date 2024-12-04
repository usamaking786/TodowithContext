import { useEffect } from "react"
import { useState } from "react"
import TodoForm from "./components/todoForm"
import TodoItem from "./components/todoItem"
import { TodoProvider } from "./contexts"

function App() {
  const [todos, setTodos] = useState([])
  
  const addTodo = (todo) => {
    setTodos((prevTodo)=> [{id: Date.now(), ...todo},...prevTodo])
  }

  const updateTodo = (id,todo) => {
    setTodos((prev)=> prev.map((todoItem)=> todoItem.id === id ? {...todoItem, todo}: todoItem))
  }

  const deleteTodo = (id) => {
    setTodos((prev)=> prev.filter((todo)=> todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prevState)=> prevState.map((todo)=> todo.id === id ? {...todo, completed: !todo.completed} : todo ))
  }

  // Setting Todos
  useEffect(()=> {
    localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])

  // Getting Todos information
  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos & todos.length>0){
      setTodos(todos)
    }
  },[setTodos])

  return (
   <>
   
    {/* Todo List with Context*/}
   <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
    <div className="w-full min-h-screen bg-[#172842] pt-5">
    <div className="w-full p-7 text-white">
      <h1 className="text-3xl font-bold text-center">Manage your Todo's Here</h1>
      <div className="m-5">
      <TodoForm/>
      </div>

    {/* Todo items will be here */}
    <div className="flex flex-wrap gap-y-3">
    {
      todos.map((todo)=>(
        <div key={todo.id} className="w-full">
          <TodoItem todo={todo}/>
        </div>
      ))
    }
    </div>

    </div>

    </div>
    </TodoProvider>
   </>
  )
}

export default App
