import React from 'react'

export default function Todo( {todo, toggleTodo} ) {

    function TodoClick() {
        toggleTodo(todo.id)
    }

    return (
        <div>
            <label>
                <input type="checkbox" checked={todo.complete} onChange={TodoClick} />
                {todo.name}
            </label>
        </div>
    )
}
