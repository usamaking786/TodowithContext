import React, { useState } from 'react'
import {useTodo} from "../contexts"
function TodoItem({todo}) {
 const [isTodoEditable, setIsTodoEditable] = useState(false);
 const [todoMsg, setTodoMsg] = useState(todo.todo);
const {updateTodo, deleteTodo, toggleComplete} = useTodo();

const editTodo = ()=> {
  updateTodo(todo.id,{...todo, todo: todoMsg});
  setIsTodoEditable(false)
}
const toggleCompleted = ()=>{
  toggleComplete(todo.id)
}
  return (
    <div className={`flex border border-black/10 rounded-lg gap-x-3 px-3 ${todo.completed ? "bg-[#c6e9a7]" :"bg-[#ccbed7]"} mx-6`}>
      <input type="checkbox"
      className='cursor-pointer'
      checked={todo.completed}
      onChange={toggleCompleted}
      />
      <input type="text"
      className={`w-full text-gray-500 p-2 outline-none rounded-lg  ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"} ${todo.completed ? "line-through bg-[#c6e9a7]" : "bg-[#ccbed7]"}`}
      readOnly={!isTodoEditable}
      value={todoMsg}
      onChange={(e)=> setTodoMsg(e.target.value)}
      />
      
      {/* Edit and Save Button */}
      <button className='inline-flex rounded-lg text-sm border border-black/10 p-3 bg-gray-300' 
      onClick={
        ()=> {
          if(todo.completed) return

          if(isTodoEditable){
            editTodo();
           }
           else{
            setIsTodoEditable((prev)=> !prev);
           }
        }
      }
      >{isTodoEditable ? "📁" : "✏️"}</button>

    {/* Delete Button */}
    <button
    className='inline-flex rounded-lg text-sm border border-black/10 bg-gray-300 p-3'
    onClick={()=> deleteTodo(todo.id)}
    >
    ❌
    </button>

    </div>
  )
}

export default TodoItem