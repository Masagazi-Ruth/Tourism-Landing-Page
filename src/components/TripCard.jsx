import React, { useState } from 'react';
import clsx from 'clsx';

const TripCard = ({
  image,
  title,
  badges = [],
  variant = "default",
  onClick,
  hoverEffect = "none"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className={clsx(
        "rounded-lg overflow-hidden cursor-pointer bg-white shadow-md",
        "transition-all duration-300",
        variant === "large" && "h-80",
        variant === "default" && "h-64",
        hoverEffect === "netflix" && isHovered && "transform scale-110 z-10 shadow-xl"
      )}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      }}
    >
      <div className={clsx("relative h-full")}>
        <img
          src={image}
          alt={title}
          className={clsx(
            "w-full h-full object-cover",
            hoverEffect === "netflix" && isHovered && "brightness-75"
          )}
        />
        
        {badges.length > 0 && (
          <div className={clsx("absolute top-2 left-2 flex flex-wrap gap-1")}>
            {badges.map((badge, index) => (
              <span
                key={index}
                className={clsx(
                  "px-2 py-1 text-xs font-bold rounded",
                  "bg-orange-500 text-white"
                )}
              >
                {badge}
              </span>
            ))}
          </div>
        )}
        
        <div
          className={clsx(
            "absolute bottom-0 left-0 right-0 p-4",
            "bg-gradient-to-t from-black to-transparent",
            hoverEffect === "netflix" && isHovered && "pb-8 from-black to-black/50"
          )}
        >
          <h3 className={clsx("text-white font-bold text-xl")}>{title}</h3>
          
          {hoverEffect === "netflix" && isHovered && (
            <div className={clsx("mt-2 flex gap-2 opacity-100 transition-opacity")}>
              <button className={clsx("px-3 py-1 bg-white text-black rounded text-sm font-bold")}>
                Details
              </button>
              <button className={clsx("px-3 py-1 bg-orange-500 text-white rounded text-sm font-bold")}>
                Book Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripCard;