import React, { useState } from 'react'
import {useTodo} from "../contexts"

function TodoForm() {
const [todo, setTodo] = useState("");
  const {addTodo} = useTodo();
  const add = (e)=>{
    e.preventDefault()
    if(!todo) return

    addTodo({todo, completed:false});
    setTodo("");
  }


  return (
    <form onSubmit={add} className="flex">
   <input type="text" 
   className='w-full border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5'
   placeholder='Add Todo..'
   value={todo}
   onChange={(e)=> setTodo(e.target.value)}
   />
   <button type='submit'
   className='rounded-r-lg bg-blue-600 p-3 shrink-0'
   >Add</button>   
    </form>
  )
}

export default TodoForm