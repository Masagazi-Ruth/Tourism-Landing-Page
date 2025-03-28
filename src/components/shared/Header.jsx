import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Add this import
import { FaBars, FaTimes } from 'react-icons/fa';
import { navItems } from './constants.jsx';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <nav className="flex justify-between items-center px-10 py-4 text-white w-full top-0 z-50">
        <Link to="/" className="text-2xl font-bold text-white">
          HiddenSafari
        </Link>
        <ul className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <li key={item.name} className="hover:text-blue-300 cursor-pointer">
              <Link to={item.link} className="flex items-center gap-2 text-white">
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black bg-opacity-90">
            <ul className="flex flex-col items-center space-y-4 py-6">
              {navItems.map((item) => (
                <li 
                  key={item.name} 
                  className="hover:text-blue-300 cursor-pointer"
                  onClick={toggleMenu}
                >
                  <Link to={item.link} className="flex items-center gap-2 text-white">
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;