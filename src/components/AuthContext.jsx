import React, { createContext, useState, useEffect } from 'react';
import { MdEmail } from 'react-icons/md';

// Create the Auth Context
export const AuthContext = createContext();

// Hardcoded user
const hardcodedUser = {
  username: 'masagazi',
  password: 'Masagazi@123',
  name: 'Masagazi Ruth',
  email: 'masagaziruth@gmail.com',
  role: 'admin',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token === 'fake-token') {
      setUser({
        username: hardcodedUser.username,
        name: hardcodedUser.name,
        email: hardcodedUser.email,
        role: hardcodedUser.role,
      });
    }
    setLoading(false);
  }, [token]);

  const login = async (username, password) => {
    console.log('Login attempt:', username, password);
    if (
      username === hardcodedUser.username &&
      password === hardcodedUser.password
    ) {
      const fakeToken = 'fake-token';
      setToken(fakeToken);
      localStorage.setItem('token', fakeToken);
      setUser({
        username: hardcodedUser.username,
        name: hardcodedUser.name,
        email: hardcodedUser.email,
        role: hardcodedUser.role,
      });
    } else {
      throw new Error('Invalid username or password');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  // Add the updateUser function
  const updateUser = (updatedUserData) => {
    setUser(prev => ({
      ...prev,
      ...updatedUserData
    }));
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;