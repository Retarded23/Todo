import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../public/logo.png';

const NavBar = () => (
  <nav className="bg-[#172842] shadow-md">
    <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
      {/* Logo and App Name */}
      <div className="flex items-center gap-2">
        <Link to="/" className="text-2xl  flex font-bold text-gray-800">
          <img src={logo} alt="Logo" className="h-16 w-16" />
          <div className="text-white font-bold text-xl flex items-center justify-center">Todo App</div>
        </Link>
      </div>
      
      <div className="flex items-center space-x-4">
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
      </div>
    </div>
  </nav>
);

export default NavBar;
