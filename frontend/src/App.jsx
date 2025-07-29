import { useState, useEffect } from 'react';
import { TodoProvider } from './contexts/contexts';
import axios from 'axios'; 
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

// Define the base URL for your API
// After
const API_URL = "/api/todos";


function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(API_URL);
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []); 

  // --- UPDATED CRUD Functions ---

  const addTodo = async (todo) => {
    try {
        const response = await axios.post(API_URL, todo);
        setTodos((prev) => [response.data.todo, ...prev]); 
    } catch (error) {
        console.error("Error adding todo:", error);
    }
};

  const updateTodo = async (id, todo) => {
    try {
      // The `todo` object here will contain the new text: { todo: "new text" }
      const response = await axios.put(`${API_URL}/${id}`, todo);
      setTodos((prev) =>
        prev.map((prevTodo) => (prevTodo._id === id ? response.data : prevTodo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      // Filter out the deleted todo from the state
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const todoToToggle = todos.find((todo) => todo._id === id);
      if (!todoToToggle) {
        console.error("Todo not found in local state:", id);
        return;
      }

      const response = await axios.put(`${API_URL}/${id}`, {
        ...todoToToggle,
        completed: !todoToToggle.completed,
      });
      setTodos((prev) =>
        prev.map((prevTodo) => (prevTodo._id === id ? response.data : prevTodo))
      );
    } catch (error) {
      console.error("Error toggling todo completion:", error);
    }
  };

  const sortedTodos = [...todos].sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );


  return (
    <TodoProvider value={{ todos, addTodo, deleteTodo, toggleComplete, updateTodo }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/* Loop and Add TodoItem here */}
            {sortedTodos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} />
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
