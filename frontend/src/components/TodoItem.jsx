import React, { useState, useEffect } from 'react';
import { useTodo } from '../contexts/contexts';

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [editableTodo, setEditableTodo] = useState({
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '',
        priority: todo.priority || 'Medium',
    });
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
    const { updateTodo, deleteTodo, toggleComplete } = useTodo();
    const getCardColor = () => {
    if (!todo.dueDate || todo.completed) return 'bg-zinc-800'; 

    const dueDate = new Date(todo.dueDate);
    const today = new Date();
    const daysLeft = (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    if (daysLeft < 0) return 'bg-gray-600 text-gray-400';
    if (daysLeft < 3) return 'bg-red-900/90 border border-red-500';
    if (daysLeft <= 7) return 'bg-yellow-900/90 border border-yellow-500';
    return 'bg-zinc-800';
    };
    const edit = () => {
        if (!editableTodo.title || !editableTodo.dueDate) {
            alert("Title and Due Date are required.");
            return;
        }
        updateTodo(todo._id, editableTodo);
        setIsTodoEditable(false);
    };

    const toggleCompleted = () => {
        toggleComplete(todo._id);
    };

    const toggleDescription = () => {
        if (!isTodoEditable) {
            setIsDescriptionVisible(prev => !prev);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableTodo(prevTodo => ({ ...prevTodo, [name]: value }));
    };

    // Reset editable state if the main todo object changes
    useEffect(() => {
        setEditableTodo({
            title: todo.title,
            description: todo.description,
            dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '',
            priority: todo.priority || 'Medium',
        });
    }, [todo]);


    return (
        <div
            className={`flex flex-col border border-black/10 rounded-lg px-4 py-3 w-full  shadow-sm transition-all duration-300 ${getCardColor()} ${
                todo.completed ? 'opacity-50' : ''
            }`}
        >
            <div className="flex items-start gap-x-3 w-full">
                <input
                    type="checkbox"
                    className="cursor-pointer mt-1"
                    checked={todo.completed}
                    onChange={toggleCompleted}
                />
                
                {isTodoEditable ? (
                    // --- Editable View ---
                     <div className="flex-grow flex flex-col space-y-2">
                        <input type="text" name="title" className="w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5" value={editableTodo.title} onChange={handleChange} />
                        <textarea name="description" className="w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5 text-sm" value={editableTodo.description} onChange={handleChange} />
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                            <input type="date" name="dueDate" className="w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5" value={editableTodo.dueDate} onChange={handleChange} />
                            <select name="priority" className="w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5" value={editableTodo.priority} onChange={handleChange}>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>
                ) : (
                // --- Read-only View ---
                <div className="flex-grow cursor-pointer" onClick={toggleDescription}>
                    <span className={`${todo.completed ? 'line-through' : ''}`}>{todo.title}</span>
                    <div className="flex items-center gap-x-4 text-xs text-gray-400 mt-1">
                        <span>Due: {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : 'N/A'}</span>
                        <span className="font-semibold">Priority: {todo.priority}</span>
                    </div>
                </div>
                )}

                {/* --- Action Buttons --- */}
                <div className="flex items-center gap-x-2">
                    <button
                        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50 text-black"
                        onClick={() => {
                            if (todo.completed) return;
                            if (isTodoEditable) {
                                edit();
                            } else setIsTodoEditable(prev => !prev);
                        }}
                        disabled={todo.completed}
                    >
                        {isTodoEditable ? '💾' : '✏️'}
                    </button>
                    <button
                        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 text-black"
                        onClick={() => deleteTodo(todo._id)}
                    >
                        ❌
                    </button>
                </div>
            </div>

            {/* --- Collapsible Description --- */}
            {isDescriptionVisible && !isTodoEditable && (
                <div className="w-full mt-2 pt-2 border-t border-white/10 text-sm text-gray-300">
                    <p>{todo.description}</p>
                </div>
            )}
        </div>
    );
}

export default TodoItem;
