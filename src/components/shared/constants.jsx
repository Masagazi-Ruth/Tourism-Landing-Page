import { FaHome, FaCalendarAlt, FaUsers, FaInfoCircle, FaEnvelope, FaHandsHelping, FaClock } from 'react-icons/fa';

export const navItems = [
  { name: "Home", icon: <FaHome />, link: "/" },
  { name: "Events", icon: <FaCalendarAlt />, link: "/events" },
  { name: "Teams", icon: <FaUsers />, link: "/teams" },
  { name: "About", icon: <FaInfoCircle />, link: "/about" },
  { name: "Contact", icon: <FaEnvelope />, link: "/contact" },
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
};