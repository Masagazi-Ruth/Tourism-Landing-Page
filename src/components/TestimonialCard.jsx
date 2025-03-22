// File: src/components/TestimonialCard.jsx
import React from 'react';
import { FaStar } from 'react-icons/fa';

const TestimonialCard = ({ name, role, rating, review }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex space-x-4">
      {/* Left Side: Avatar, Name, and Role */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        <div className="mt-2">
          <h4 className="text-lg font-bold text-black">{name}</h4>
          <p className="text-gray-600 text-sm">{role}</p>
        </div>
      </div>
      {/* Right Side: Rating and Review */}
      <div className="flex-1">
        <div className="flex mb-2">
          {[...Array(rating)].map((_, index) => (
            <FaStar key={index} className="text-yellow-400" />
          ))}
        </div>
        <p className="text-gray-600">{review}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;