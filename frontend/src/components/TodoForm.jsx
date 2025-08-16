import React, { useState } from 'react';
import { useTodo } from '../contexts/contexts';

function TodoForm() {
    // 1. Updated state to include dueDate and priority
    const [todo, setTodo] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: "Medium" 
    });

    const { addTodo } = useTodo();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTodo(prevTodo => ({
            ...prevTodo,
            [name]: value
        }));
    };

    const add = (e) => {
        e.preventDefault();

        // 3. Updated validation to include the new fields
        if (!todo.title || !todo.description || !todo.dueDate) {
            alert("Title, description, and due date are required.");
            return;
        }

        // Pass the entire todo object, matching the schema
        addTodo({
            title: todo.title,
            description: todo.description,
            dueDate: todo.dueDate,
            priority: todo.priority,
            completed: false
        });

        // Reset the form, including the new fields
        setTodo({
            title: "",
            description: "",
            dueDate: "",
            priority: "Medium"
        });
    };

    return (
        <form onSubmit={add} className="flex flex-col space-y-4  ">
            <input
                type="text"
                name="title"
                placeholder="Enter Todo Title..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo.title}
                onChange={handleChange}
            />
            <textarea
                name="description"
                placeholder="Enter Todo Description..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo.description}
                onChange={handleChange}
            />

            {/* 2. Added new form fields for Due Date and Priority */}
            <div className="flex space-x-4">
                <div className="flex-1">
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-300">Due Date</label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        className="w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                        value={todo.dueDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-1">
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-300">Priority</label>
                    <select
                        id="priority"
                        name="priority"
                        className="w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-2"
                        value={todo.priority}
                        onChange={handleChange}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
            </div>

            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;
