// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Todo from './pages/Todo';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        <NavBar />
        <div className="max-w-4xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<Todo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
