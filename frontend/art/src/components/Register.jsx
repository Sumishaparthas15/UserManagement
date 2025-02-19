import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/app1/register/', formData);
      
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-center mb-4">Register</h2>
        <table className="w-full">
          <tbody>
            <tr>
              <td className="p-2">Username:</td>
              <td><input type="text" name="username" className="border p-2 w-full rounded" onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td className="p-2">Email:</td>
              <td><input type="email" name="email" className="border p-2 w-full rounded" onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td className="p-2">Password:</td>
              <td><input type="password" name="password" className="border p-2 w-full rounded" onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td className="p-2">Confirm Password:</td>
              <td><input type="password" name="password2" className="border p-2 w-full rounded" onChange={handleChange} required /></td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">Register</button>
      </form>
    </div>
  );
}

export default Register;
