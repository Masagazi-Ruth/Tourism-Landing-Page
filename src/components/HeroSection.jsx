import React from 'react';
import '../App.css';
import { FaHome, FaCalendarAlt, FaUsers, FaInfoCircle, FaEnvelope, FaHandsHelping, FaClock } from 'react-icons/fa';

// Navigation items

const navItems = [
  { name: "Home", icon: <FaHome />, link: "#home" },
  { name: "Events", icon: <FaCalendarAlt />, link: "#events" },
  { name: "Treks", icon: <FaUsers />, link: "#treks" },
  { name: "About", icon: <FaInfoCircle />, link: "#about" },
  { name: "Contact", icon: <FaEnvelope />, link: "#contact" }
];

// HeroSection Component with Integrated Navbar
const HeroSection = ({ title, subtitle, backgroundImage }) => {
  return (
    <section 
      className="h-screen flex flex-col relative w-full"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-opacity-40"></div>

      {/* Navbar integrated directly into HeroSection */}
      <nav className="flex justify-between items-center px-10 py-4 text-white w-full top-0 z-50">
        <h1 className="text-xl font-bold">HiddenSafari</h1>
        <ul className="flex space-x-6">
          {navItems.map((item) => (
            <li key={item.name} className="hover:text-blue-300 cursor-pointer flex items-center gap-2">
              <a href={item.link} className="flex items-center gap-2">
                {item.icon}
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero content */}
      <div className="container mx-auto px-4 relative z-10 flex-1 flex items-center">
        <div>
          <h1 className="text-5xl font-bold text-white">{title || "Experience Nature"}</h1>
          <p className="text-white text-xl mt-4">{subtitle || "India's Largest Trekking Organization"}</p>
        </div>
      </div>

      {/* Stats section */}
      <div  className="absolute bottom-10 left-15 z-10 grid grid-cols-4 gap-4">
        <div className="text-center text-white">
          <FaUsers className="text-3xl mb-2 mx-auto" />
          <div className="text-2xl font-bold">2,11,500+</div>
          <div className="text-sm">Participants</div>
        </div>
        <div className="text-center text-white">
          <FaHandsHelping className="text-3xl mb-2 mx-auto" />
          <div className="text-2xl font-bold">2750+</div>
          <div className="text-sm">Volunteers</div>
        </div>
        <div className="text-center text-white">
          <FaCalendarAlt className="text-3xl mb-2 mx-auto" />
          <div className="text-2xl font-bold">68+</div>
          <div className="text-sm">Events</div>
        </div>
        <div className="text-center text-white">
          <FaClock className="text-3xl mb-2 mx-auto" />
          <div className="text-2xl font-bold">11</div>
          <div className="text-sm">Years</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;