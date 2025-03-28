import React from "react";
import clsx from "clsx";
import { FaLinkedin, FaFacebook, FaInstagram, FaYoutube, FaSearch } from "react-icons/fa";
import { PiThreadsLogoBold } from "react-icons/pi";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className={clsx(
        "footer",
        "bg-pink-50 py-8 px-4"
      )}
    >
      <div
        className={clsx(
          "max-w-6xl mx-auto",
          "flex flex-col md:flex-row justify-between items-center gap-6"
        )}
      >
        {/* Footer Title */}
        <Link to="/" className={clsx("text-2xl font-bold text-gray-800")}>
          HiddenSafari
        </Link>

        {/* Navigation Links */}
        <nav
          className={clsx(
            "footer-nav",
            "flex flex-wrap gap-6 text-gray-600"
          )}
        >
          <Link to="/" className={clsx("hover:text-gray-800")}>Home</Link>
          <Link to="/events" className={clsx("hover:text-gray-800")}>Events</Link>
          <Link to="/teams" className={clsx("hover:text-gray-800")}>Teams</Link>
          <Link to="/about" className={clsx("hover:text-gray-800")}>About</Link>
          <Link to="/contact" className={clsx("hover:text-gray-800")}>Contact</Link>
        </nav>
        </div>
      {/* Subscribe Section */}
      <div
        className={clsx(
          "footer-subscribe",
          "flex items-center"
        )}
      >
        <input
          type="email"
          placeholder="Enter your Email"
          className={clsx(
            "px-4 py-2 rounded-l-md border border-gray-300 bg-black-100",
            "focus:outline-none focus:ring-2 focus:ring-gray-400",
            "hover:border-white transition",
            "w-48 md:w-64"
          )}
        />
        <button
          className={clsx(
            "search-button",
            "px-4 py-2 bg-gray-600 rounded-r-md",
            "hover:bg-gray-300 transition"
          )}
        >
          <FaSearch className={clsx("text-black")} size={16} />
        </button>
      </div>
      <div
        className={clsx(
          "footer-socials",
          "pr-8 md:pr-14 flex gap-4"
        )}
      >
        <div
          className={clsx(
            "social-circle linkedin",
            "transform hover:scale-110 transition"
          )}
        >
          <FaLinkedin size={20} />
        </div>
        <div
          className={clsx(
            "social-circle facebook",
            "transform hover:scale-110 transition"
          )}
        >
          <FaFacebook size={20} />
        </div>
        <div
          className={clsx(
            "social-circle instagram",
            "transform hover:scale-110 transition"
          )}
        >
          <FaInstagram size={20} />
        </div>
        <div
          className={clsx(
            "social-circle threads",
            "transform hover:scale-110 transition"
          )}
        >
          <PiThreadsLogoBold size={20} />
        </div>
        <div
          className={clsx(
            "social-circle youtube",
            "transform hover:scale-110 transition"
          )}
        >
          <FaYoutube size={20} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;