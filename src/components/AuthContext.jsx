import React, { createContext, useState, useEffect } from 'react';
import { MdEmail } from 'react-icons/md';

// Create the Auth Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]); // In-memory user storage
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    console.log('Login attempt:', username, password);
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!foundUser) {
      throw new Error('Invalid username or password');
    }
    setUser(foundUser);
  };

  const register = async (username, email, password) => {
    if (users.some((u) => u.username === username)) {
      throw new Error('Username already exists');
    }
    const newUser = { username, email, password, name: username, role: 'user' };
    setUsers([...users, newUser]);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updatedUserData) => {
    // Update the current user
    setUser((prev) => {
      const updatedUser = { ...prev, ...updatedUserData };
      // Update the users array to reflect the changes (e.g., username change)
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.username === prev.username ? { ...u, ...updatedUserData } : u
        )
      );
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;