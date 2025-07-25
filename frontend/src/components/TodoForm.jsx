import React, { useState } from 'react';
import { useTodo } from '../contexts/contexts';

function TodoForm() {
    // State to hold both title and description for the new todo
    const [todo, setTodo] = useState({ title: "", description: "" });

    const { addTodo } = useTodo();

    // Handler to update state when user types in either input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTodo(prevTodo => ({
            ...prevTodo,
            [name]: value
        }));
    };

    const add = (e) => {
        e.preventDefault();
        // Check if either title or description is empty
        if (!todo.title || !todo.description) {
            alert("Both title and description are required.");
            return;
        }
        
        // Call addTodo with an object matching the schema
        addTodo({ title: todo.title, description: todo.description, completed: false });
        
        // Reset the form fields
        setTodo({ title: "", description: "" });
    };

    return (
        <form onSubmit={add} className="flex flex-col space-y-2">
            <input
                type="text"
                placeholder="Write Todo Title..."
                name="title"
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo.title}
                onChange={handleChange}
            />
            <textarea
                placeholder="Write Todo Description..."
                name="description"
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo.description}
                onChange={handleChange}
                rows="2"
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;
