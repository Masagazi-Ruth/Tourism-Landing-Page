import React from 'react';
import clsx from 'clsx';
import { FaBus, FaHammer, FaCampground, FaHiking, FaFirstAid } from 'react-icons/fa';
import { FaCodeFork, FaKitMedical, FaTents } from 'react-icons/fa6';

const TripCard = ({
  image,
  title,
  badges = [],
  onClick
}) => {
  return (
    <div
      className={clsx(
        "relative group rounded-lg overflow-hidden cursor-pointer bg-white shadow-lg",
        "h-70" 
      )}
      onClick={onClick}
    >
      <div className="relative h-full">
        <div
          className={clsx(
            "absolute inset-0 bg-cover bg-center transition-transform duration-500",
            "group-hover:scale-105" 
          )}
          style={{ backgroundImage: `url(${image})` }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/placeholder.jpg"; // Fallback image
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
        
        {badges.length > 0 && (
          <div className={clsx("absolute top-4 left-4 flex flex-wrap gap-1")}>
            {badges.map((badge, index) => (
              <span
                key={index}
                className={clsx(
                  "px-3 py-1 text-xs font-bold rounded-full",
                  "bg-[#DD501DE8] text-white"
                )}
              >
                {badge}
              </span>
            ))}
          </div>
        )}
        
        <div className={clsx("absolute text-center bottom-0 left-0 right-0 p-6 text-white")}>
          <h3
            className={clsx("text-xl font-bold mb-2")}
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            {title}
          </h3>
          {/* Icons Section */}
          <div className="flex justify-center px-6 gap-8 text-white">
            <FaBus size={20} className="hover:text-orange-500 transition" />
            <FaHammer size={20} className="hover:text-orange-500 transition" />
            <FaTents size={20} className="hover:text-orange-500 transition" />
            <FaHiking size={20} className="hover:text-orange-500 transition" />
            <FaKitMedical size={20} className="hover:text-orange-500 transition" />
          </div>
          <button
            className={clsx(
              "px-4 py-1 bg-[#DD501DE8] text-amber-200 rounded-full text-sm font-bold",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2"
            )}
          >
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;