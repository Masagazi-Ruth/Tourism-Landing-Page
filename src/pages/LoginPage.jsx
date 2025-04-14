// pages/LoginPage.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
// Import your background image (place it in your src/assets folder)
import IMAGES from '../assets/images/image';// Add your image path

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    
    if (!formData.username) {
      tempErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      tempErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      tempErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!formData.password) {
      tempErrors.password = 'Password is required';
    } else {
      if (formData.password.length < 8) {
        tempErrors.password = 'Password must be at least 8 characters';
      }
      if (!/[A-Z]/.test(formData.password)) {
        tempErrors.password = 'Password must contain at least one uppercase letter';
      }
      if (!/[0-9]/.test(formData.password)) {
        tempErrors.password = 'Password must contain at least one number';
      }
      if (!/[!@#$%^&*]/.test(formData.password)) {
        tempErrors.password = 'Password must contain at least one special character';
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await login(formData.username, formData.password);
        navigate('/dashboard');
      } catch (err) {
        setErrors({ submit: err.message });
      }
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${IMAGES.Heros})` }}
    >
      <div className="max-w-md w-full mx-4 p-6 bg-white bg-opacity-90 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        {errors.submit && <p className="text-red-500 text-center mb-4">{errors.submit}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-left text-bold text-gray-700 mb-2">Username:</label>
            <input
              type="text"
              name="username"
              placeholder='username'
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              autoComplete="username"
            />
            {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
          </div>
          <div className="mb-6">
            <label className="block text-left text-gray-700 mb-2">Password:</label>
            <input
              type="password"
              name="password"
              placeholder='password'
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              autoComplete="current-password"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;