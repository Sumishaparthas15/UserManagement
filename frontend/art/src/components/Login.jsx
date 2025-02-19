import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/app1/login/', formData);
      console.log(response.data);

      // ✅ Redirect to Home/Dashboard on successful login
      navigate('/Profile'); 
    } catch (error) {
      console.error(error.response?.data || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input 
            type="email" 
            name="email" 
            className="border p-2 w-full rounded" 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input 
            type="password" 
            name="password" 
            className="border p-2 w-full rounded" 
            onChange={handleChange} 
            required 
          />
        </div>

        {/* <div className="flex justify-between items-center mb-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Remember Me
          </label>
          <button 
            type="button" 
            className="text-blue-500 hover:underline"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot Password?
          </button>
        </div> */}

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account? 
          <button 
            type="button" 
            className="text-blue-500 hover:underline ml-1"
            onClick={() => navigate('/register')}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
