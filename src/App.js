import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import uuidv4 from 'uuid/v4'

const LOCAL_STORAGE = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()
  
  useEffect(() =>  {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() =>  {
    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }
  
  function AddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  function ClearTodo() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }
  
  return (
    <>
    <div>To do List</div>
    <input ref={todoNameRef} type="text" />
    <button onClick={AddTodo}>Add To Do</button>
    <button onClick={ClearTodo}>Clear Completed Todos</button>
    <TodoList todos = {todos} toggleTodo={toggleTodo} />
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
