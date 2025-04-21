import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import IMAGES from '../assets/images/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Header from '../components/shared/Header';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/'); // Redirect to homepage if user is already logged in
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        login(formData.username, formData.password);
        navigate('/'); // Redirect to homepage after successful login
      } catch (err) {
        setErrors({ submit: err.message || 'Invalid username or password' });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Header />
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative pt-16"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(245, 166, 35, 0.3)), url(${IMAGES.Heros})`,
        }}
      >
        <div className="max-w-md w-full mx-4 p-8 bg-white rounded-xl shadow-xl transform transition-all duration-500 hover:scale-105">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center border-2 border-orange-500">
              <span className="text-2xl font-bold text-orange-700">HS</span>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-center text-brown-800">Welcome Back</h2>
          {errors.submit && <p className="text-orange-500 text-center mb-4">{errors.submit}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-left text-sm font-medium text-brown-700 mb-2">Username</label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-3 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 bg-white"
                  autoComplete="username"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brown-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </span>
              </div>
              {errors.username && <span className="text-orange-500 text-sm">{errors.username}</span>}
            </div>
            <div>
              <label className="block text-left text-sm font-medium text-brown-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 bg-white"
                  autoComplete="current-password"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brown-400 cursor-pointer hover:text-orange-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                </span>
              </div>
              {errors.password && <span className="text-orange-500 text-sm">{errors.password}</span>}
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
            >
              Login
            </button>
          </form>
          <p className="text-center text-brown-600 mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="text-orange-500 hover:text-orange-600 font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;