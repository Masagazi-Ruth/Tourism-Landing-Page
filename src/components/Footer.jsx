// File: src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-bold mb-4">About HiddenSafari</h3>
          <p>India's Largest Trekking Organization</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p>Email: info@hiddensafari.com</p>
          <p>Phone: +91 123 456 7890</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400">Facebook</a>
            <a href="#" className="hover:text-blue-400">Instagram</a>
            <a href="#" className="hover:text-blue-400">Twitter</a>
          </div>
        </div>
      </div>
      <div className="text-center pt-4 border-t border-gray-700">
        © {new Date().getFullYear()} HiddenSafari. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;