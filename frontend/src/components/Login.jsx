import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import image from '../../assets/image.png';
const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/auth/login', formData);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-sans">
      <div className="w-full max-w-xl flex flex-col justify-center md:flex-row bg-white">
        {/* Login Panel */}
        <div className="flex-1 flex flex-col justify-center p-8">
          {/* Heading */}
          <h2 className="text-2xl font-bold text-[#0b1783] mb-6 text-center tracking-wide">User Login</h2>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="rounded-full py-3 px-5 bg-[#e7e9f6] text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fb4b23] border-none"
              autoComplete="username"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="rounded-full py-3 px-5 bg-[#e7e9f6] text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fb4b23] border-none"
              autoComplete="current-password"
              required
            />
            <div className="flex items-center justify-between text-sm -mt-2 mb-2">
              <label className="flex items-center space-x-2 select-none">
                <input type="checkbox" className="w-4 h-4 accent-[#290e74]" />
                <span className="text-gray-500">Remember</span>
              </label>
              <button
                type="button"
                tabIndex={-1}
                className="text-gray-500 hover:text-[#fb4b23] transition"
              >
                Forgot Password ?
              </button>
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-[#210c6f] text-white font-semibold tracking-wider py-3 shadow-lg hover:bg-[#e04b23] transition"
            >
              SUBMIT
            </button>
          </form>
        </div>

        <div className="hidden md:flex flex-1 flex-col justify-center items-center relative">
 
          <img src={image} className="max-w-[500px] mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
