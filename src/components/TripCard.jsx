// File: src/components/TripCard.jsx
import React from 'react';

function TripCard({ 
  image, 
  title, 
  badges = [], 
  variant = "default", 
  onClick 
}) {
  const cardStyles = {
    default: "rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow",
    large: "rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow",
    overlay: "rounded-lg overflow-hidden relative"
  };

  return (
    <div className={cardStyles[variant]} onClick={onClick}>
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        {variant === "overlay" && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h3 className="text-white text-2xl font-bold">{title}</h3>
          </div>
        )}
      </div>
      {variant !== "overlay" && (
        <div className="p-4 bg-white">
          <h3 className="font-bold text-lg text-black">{title}</h3>
          <div className="flex mt-2 space-x-2">
            {badges.map((badge, index) => (
              <span key={index} className="text-xs bg-gray-600 text-white px-2 py-1 rounded">
                {badge}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TripCard;