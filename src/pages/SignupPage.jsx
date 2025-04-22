import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import IMAGES from '../assets/images/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Header from '../components/shared/Header';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

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

    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      tempErrors.email = 'Invalid email address';
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

    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        register(formData.username, formData.email, formData.password);
        navigate('/login');
      } catch (err) {
        setErrors({ submit: err.message });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <Header />
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative pt-20"
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

          <h2 className="text-3xl font-bold mb-6 text-center text-brown-800">Create an Account</h2>
          {errors.submit && <p className="text-orange-500 text-center mb-4">{errors.submit}</p>}
          <div className="space-y-6">
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
              <label className="block text-left text-sm font-medium text-brown-700 mb-2">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your fullname"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 bg-white"
                  autoComplete="name"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brown-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </span>
              </div>
              {errors.name && <span className="text-orange-500 text-sm">{errors.name}</span>}
            </div>
            <div>
              <label className="block text-left text-sm font-medium text-brown-700 mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 bg-white"
                  autoComplete="email"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brown-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2h2m8 0a4 4 0 01-8 0m8 0h2m-10 0H6"></path>
                  </svg>
                </span>
              </div>
              {errors.email && <span className="text-orange-500 text-sm">{errors.email}</span>}
            </div>
            <div>
              <label className="block text-left text-sm font-medium text-brown-700 mb-2">Phone Number</label>
              <div className="relative">
                <input
                  type="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 bg-white"
                  autoComplete="contact"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brown-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2h2m8 0a4 4 0 01-8 0m8 0h2m-10 0H6"></path>
                  </svg>
                </span>
              </div>
              {errors.phone && <span className="text-orange-500 text-sm">{errors.phone}</span>}
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
                  autoComplete="new-password"
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
            <div>
              <label className="block text-left text-sm font-medium text-brown-700 mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 bg-white"
                  autoComplete="new-password"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brown-400 cursor-pointer hover:text-orange-500"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                </span>
              </div>
              {errors.confirmPassword && <span className="text-orange-500 text-sm">{errors.confirmPassword}</span>}
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
            >
              Sign Up
            </button>
          </div>
          <p className="text-center text-brown-600 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-500 hover:text-orange-600 font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;