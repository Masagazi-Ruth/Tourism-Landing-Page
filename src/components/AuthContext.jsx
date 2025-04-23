import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize users from local storage on app load
  const getUsersFromStorage = () => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  };

  // Save users to local storage
  const saveUsersToStorage = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  // Check for logged-in user on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing logged-in user:', error);
        localStorage.removeItem('loggedInUser');
      }
    }
    setLoading(false);
  }, []);

  const register = (username, email, password) => {
    const users = getUsersFromStorage();

    // Check if user already exists
    const userExists = users.some(
      (u) => u.email === email || u.username === username
    );
    if (userExists) {
      throw new Error('User with this email or username already exists');
    }

    // Add new user
    const newUser = { username, email, password };
    users.push(newUser);
    saveUsersToStorage(users);
  };

  const login = (username, password) => {
    const users = getUsersFromStorage();

    // Find user by username and password
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!foundUser) {
      throw new Error('Invalid username or password');
    }

    // Set logged-in user
    setUser(foundUser);
    localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('loggedInUser');
  };

  // Derive isAuthenticated from user state
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, register, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;