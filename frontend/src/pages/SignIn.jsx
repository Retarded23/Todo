import React, { useState } from 'react';
import signin from'../../assets/signin.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  // Client-side validation before sending
  if (!formData.username || !formData.email || !formData.password) {
    setError("All fields are required.");
    setIsLoading(false);
    return;
  }

  try {
    await axios.post('https://todo-vs9q.onrender.com/api/auth/register', formData);
    alert('Registration successful! Please login.');
    navigate('/login');
  } catch (err) {
    if (err.response && err.response.data && err.response.data.msg) {
      setError(err.response.data.msg); // Show detailed backend error
    } else {
      setError('Registration failed. Please try again.');
    }
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-sans">
      <div className="w-full max-w-xl flex flex-col md:flex-row bg-white">
        {/* SignIn Panel */}
        <div className="flex-1 flex flex-col justify-center ">
          {/* Heading */}
          <h2 className="text-2xl font-bold text-[#1936a3] mb-6 text-center tracking-wide">Sign Up</h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="rounded-full py-3 px-5 bg-[#e7e9f6] text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1936a3] border-none"
              autoComplete="username"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="rounded-full py-3 px-5 bg-[#e7e9f6] text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1936a3] border-none"
              autoComplete="email"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="rounded-full py-3 px-5 bg-[#e7e9f6] text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1936a3] border-none"
              autoComplete="new-password"
              required
            />
            <button
              type="submit"
              className="w-full rounded-full bg-[#1936a3] text-white font-semibold tracking-wider py-3 shadow-lg hover:bg-[#0c236b] transition"
            >
              SIGN UP
            </button>
          </form>
        </div>
        {/* Illustration (optional, for visual symmetry) */}
        <div className="hidden md:flex flex-1 flex-col justify-center items-center relative">
          <img
            src={signin}
            alt="Sign up illustration"
            className="max-w-[300px] mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
