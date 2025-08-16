import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../public/logo.png';
import { useAuth } from '../contexts/AuthContext';

const NavBar = () => {
  const { username, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white shadow-md">
      {/* Logo and App Name */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="App Logo" className="w-10 h-10" />
        <span className="text-2xl font-bold tracking-tight">Todo App</span>
      </div>
      <div className="flex items-center space-x-4">
        {username ? (
          <>
            <span className="bg-green-500 px-4 py-1 rounded-full font-semibold flex items-center">
              Welcome, {username} <span className="ml-1">👋</span>
            </span>
            <button
              onClick={logout}
              className="ml-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded transition-colors duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
            Login
            </Link>
            <Link
            to="/signin"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
            SignIn 
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
