import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { navItems } from './constants.jsx';
import { AuthContext } from '../AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine if the current page is one of the specified routes for orange background
  const isTargetPage = ['/login', '/signup', '/profile'].includes(location.pathname);

  // useEffect for scroll handling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/'); // Redirect to homepage after logout
  };

  // Background class logic for the header
  const headerBgClass = isTargetPage
    ? 'bg-orange-500'
    : isScrolled
    ? 'bg-black'
    : 'bg-transparent';

  // Background class for the mobile menu
  const mobileMenuBgClass = isTargetPage
    ? 'bg-orange-500'
    : 'bg-black';

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${headerBgClass}`}>
      <nav className="flex justify-between items-center px-4 sm:px-6 lg:px-10 py-4 text-white w-full top-0 z-50">
        <Link to="/" className="text-2xl font-bold text-white">
          HiddenSafari
        </Link>
        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-4 lg:space-x-6 items-center">
          {navItems.map((item) => (
            <li key={item.name} className="hover:text-brown-700 cursor-pointer">
              <Link to={item.link} className="flex items-center gap-2 text-white">
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
          {user ? (
            <>
              <li className="hover:text-brown-700 cursor-pointer">
                <Link to="/profile" className="flex items-center gap-2 text-white">
                  <FaUserCircle />
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:text-brown-700 text-white focus:outline-none flex items-center gap-2"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="hover:text-brown-700 cursor-pointer">
              <Link to="/login" className="flex items-center gap-2 text-white">
                <FaSignInAlt />
                Login
              </Link>
            </li>
          )}
        </ul>
        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden absolute top-full left-0 w-full bg-opacity-100 ${mobileMenuBgClass}`}>
            <ul className="flex flex-col items-center space-y-4 py-6">
              {navItems.map((item) => (
                <li 
                  key={item.name} 
                  className="hover:text-brown-700 cursor-pointer"
                  onClick={toggleMenu}
                >
                  <Link to={item.link} className="flex items-center gap-2 text-white">
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
              {user ? (
                <>
                  <li 
                    className="hover:text-brown-700 cursor-pointer"
                    onClick={toggleMenu}
                  >
                    <Link to="/profile" className="flex items-center gap-2 text-white">
                      <FaUserCircle />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="hover:text-brown-700 text-white focus:outline-none flex items-center gap-2"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li 
                  className="hover:text-brown-700 cursor-pointer"
                  onClick={toggleMenu}
                >
                  <Link to="/login" className="flex items-center gap-2 text-white">
                    <FaSignInAlt />
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;