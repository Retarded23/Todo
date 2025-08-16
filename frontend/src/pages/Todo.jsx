// src/pages/Todo.jsx
import { useState, useEffect, useMemo } from 'react';
import { TodoProvider } from '../contexts/contexts';
import axios from 'axios';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import { useAuth } from '../contexts/AuthContext';

const API_URL = 'https://todo-vs9q.onrender.com/api/todos';

function Todo() {
  const [todos, setTodos] = useState([]);
  const { token } = useAuth();

  const authHeader = useMemo(
    () => ({ headers: { Authorization: `Bearer ${token}` } }),
    [token]
  );

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(API_URL, authHeader);
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error?.response?.data || error.message);
      }
    };
    if (token) fetchTodos();
  }, [token, authHeader]);

  const addTodo = async (todo) => {
    try {
      const response = await axios.post(API_URL, todo, authHeader);
      setTodos((prev) => [response.data.todo, ...prev]);
    } catch (error) {
      console.error('Error adding todo:', error?.response?.data || error.message);
    }
  };

  const updateTodo = async (id, todo) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, todo, authHeader);
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? response.data : t))
      );
    } catch (error) {
      console.error('Error updating todo:', error?.response?.data || error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, authHeader);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error?.response?.data || error.message);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const found = todos.find((t) => t._id === id);
      if (!found) return;
      const response = await axios.put(
        `${API_URL}/${id}`,
        { ...found, completed: !found.completed },
        authHeader
      );
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? response.data : t))
      );
    } catch (error) {
      console.error('Error toggling todo completion:', error?.response?.data || error.message);
    }
  };

  const sortedTodos = [...todos].sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <h1 className="text-3xl font-bold mb-4">Manage Your Todos</h1>
      <TodoForm />
      <div className="mt-4 space-y-3">
        {sortedTodos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} />
        ))}
      </div>
    </TodoProvider>
  );
}

export default Todo;
