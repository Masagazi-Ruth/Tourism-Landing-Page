import React from "react";
import clsx from "clsx";
import { FaFacebook, FaInstagram, FaYoutube, FaSearch, FaUsers, FaInfoCircle, FaCalendarAlt, FaEnvelope, FaFileContract, FaLock } from 'react-icons/fa';
import { PiThreadsLogoBold } from "react-icons/pi";
import "./Footer.css";
import { Link } from "react-router-dom";

const footerLinks = [
  { name: "Team", icon: <FaUsers />, path: "/teams" },
  { name: "About", icon: <FaInfoCircle />, path: "/about" },
  { name: "Events", icon: <FaCalendarAlt />, path: "/events" },
  { name: "ContactUs", icon: <FaEnvelope />, path: "/contact" },
  { name: "Terms And Conditions", icon: <FaFileContract />, path: "/termsandconditions" },
  { name: "Privacy Policy", icon: <FaLock />, path: "/privacypolicy" } 
];


const Footer = () => {
  return (
    <footer
      className={clsx(
        "footer",
        "bg-[#E6DADA] py-8 px-4 min-h-[200px] font-sans"
      )}
    >
      <div
        className={clsx(
          "max-w-7xl mx-auto",
          "flex flex-col gap-6"
        )}
      >
        {/* Footer Title */}
        <div className="flex justify-center">
          <Link to="/" className={clsx("text-3xl font-bold text-gray-800")}>
            HiddenSafari
          </Link>
        </div>

        {/* Navigation Links */}
        <nav
          className={clsx(
            "footer-nav",
            "flex flex-wrap justify-center gap-6 text-gray-600 text-lg"
          )}
        >
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={clsx("hover:text-gray-800 flex items-center gap-2")}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>

        {/* Search Bar and Socials on the Same Line */}
        <div
          className={clsx(
            "flex flex-col md:flex-row justify-between text-black items-center gap-4 mt-4"
          )}
        >
          {/* Search - Bottom Left */}
          <div className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your Email"
              className={clsx(
                "border border-width-4px px-4 py-2 rounded-l-md focus:outline-none w-full md:w-64",
                "border-gray-500 bg-[#bd9d9d]  hover:border-gray-500 transition"
              )}
            />
            <button
              className={clsx(
                "bg-gray-400 text-black px-4 py-2 rounded-r-md hover:bg-gray-500 transition"
              )}
            >
              <FaSearch size={16} />
            </button>
          </div>

          {/* Social Media Icons - Bottom Right */}
          <div
            className={clsx(
              "footer-socials",
              "flex gap-4"
            )}
          >
            <div
              className={clsx(
                "social-circle facebook",
                "transform hover:scale-110 transition"
              )}
            >
              <FaFacebook size={20} className="text-blue-800" />
            </div>
            <div
              className={clsx(
                "social-circle instagram",
                "transform hover:scale-110 transition"
              )}
            >
              <FaInstagram size={20} className="text-pink-500" />
            </div>
            <div
              className={clsx(
                "social-circle threads",
                "transform hover:scale-110 transition"
              )}
            >
              <PiThreadsLogoBold size={20} className="text-black" />
            </div>
            <div
              className={clsx(
                "social-circle youtube",
                "transform hover:scale-110 transition"
              )}
            >
              <FaYoutube size={20} className="text-red-600" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;