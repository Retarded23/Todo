import React, { useState } from 'react';
import { useTodo } from '../contexts/contexts';

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [editableTodo, setEditableTodo] = useState({
        title: todo.title,
        description: todo.description,
    });
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

    const { updateTodo, deleteTodo, toggleComplete } = useTodo();

    const editTodo = () => {
        if (!editableTodo.title) {
            alert("Title cannot be empty.");
            setEditableTodo({ title: todo.title, description: todo.description });
            setIsTodoEditable(false);
            return;
        }
        updateTodo(todo._id, { ...todo, ...editableTodo });
        setIsTodoEditable(false);
    };

    const toggleCompleted = () => {
        toggleComplete(todo._id);
    };

    const toggleDescription = () => {
        setIsDescriptionVisible(prev => !prev);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableTodo(prevTodo => ({ ...prevTodo, [name]: value }));
    };

    return (
        <div className={`flex flex-col border border-black/10 rounded-lg p-3 gap-y-2 ${
            todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
        }`}>
            <div className="flex items-center w-full">
                <input
                    type="checkbox"
                    className="cursor-pointer shrink-0"
                    checked={todo.completed}
                    onChange={toggleCompleted}
                    disabled={isTodoEditable}
                />
                <input
                    type="text"
                    name="title"
                    className={`border outline-none w-full bg-transparent rounded-lg ${
                        isTodoEditable 
                            ? "border-black/20 px-4 py-1 text-black" // --- FIX: Added 'text-black' for edit mode
                            : "border-transparent px-4 text-bold text-black text-xl"
                    } ${todo.completed ? "line-through" : ""}`}
                    value={isTodoEditable ? editableTodo.title : todo.title}
                    onChange={handleChange}
                    readOnly={!isTodoEditable}
                />

                {!isTodoEditable && (
                    <button
                        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 mx-1"
                        onClick={toggleDescription}
                    >
                        {isDescriptionVisible ? '⬆️' : '⬇️'}
                    </button>
                )}
                
                <button
                    className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                    onClick={() => {
                        if (todo.completed) return;
                        if (isTodoEditable) {
                            editTodo();
                        } else {
                            setIsTodoEditable((prev) => !prev);
                        }
                    }}
                    disabled={todo.completed}
                >
                    {isTodoEditable ? "💾" : "✏️"}
                </button>
                <button
                    className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 ml-1"
                    onClick={() => deleteTodo(todo._id)}
                >
                    ❌
                </button>
            </div>

            {isDescriptionVisible && !isTodoEditable && (
                <div className="text-sm text-gray-600 ">
                    <p>{todo.description}</p>
                </div>
            )}

            {isTodoEditable && (
                 <textarea
                    name="description"
                    className="border outline-none w-full bg-transparent rounded-lg border-black/20  text-black px-2" // --- FIX: Added 'text-black' for edit mode
                    value={editableTodo.description}
                    onChange={handleChange}
                    rows="2"
                 />
            )}
        </div>
    );
}

export default TodoItem;
