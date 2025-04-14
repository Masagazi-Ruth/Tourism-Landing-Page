import { FaHome, FaCalendarAlt, FaUsers, FaInfoCircle, FaEnvelope, FaHandsHelping, FaClock, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

export const navItems = [
  { name: "Home", icon: <FaHome />, link: "/" },
  { name: "Events", icon: <FaCalendarAlt />, link: "/events" },
  { name: "Teams", icon: <FaUsers />, link: "/teams" },
  { name: "About", icon: <FaInfoCircle />, link: "/about" },
  { name: "Contact", icon: <FaEnvelope />, link: "/contact" },
  // { name: "Profile", icon: <FaUserCircle />, link: "/profile" },
  // // { name: "Logout", icon: <FaSignOutAlt />, link: "/logout" },
  // // {name: "Login", icon: <FaSignInAlt />, link: "/login" },
];

export const navIcons = {
  Home: FaHome,
  Events: FaCalendarAlt,
  Teams: FaUsers,
  About: FaInfoCircle,
  Contact: FaEnvelope,
  Participants: FaUsers,
  Volunteers: FaHandsHelping,
  Years: FaClock,
  Profile: FaUserCircle,
  Logout: FaSignOutAlt
};