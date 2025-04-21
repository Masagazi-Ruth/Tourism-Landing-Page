import React from 'react';
import clsx from 'clsx';

const TestimonialCard = ({
  name,
  role,
  image,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={clsx("flex items-center w-full cursor-pointer")}
      onClick={onSelect}
    >
      {/* Profile Image */}
      <div
        className={clsx(
          "w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-gray-200 mr-3 sm:mr-4 overflow-hidden border-2 transition",
          {
            "border-transparent": !isSelected,
            "border-orange-500": isSelected,
          },
          "hover:border-orange-500"
        )}
      >
        <img
          src={image}
          alt={name}
          className={clsx("w-full h-full object-cover")}
        />
      </div>

      {/* Name and Role */}
      <div>
        <h3
          className={clsx("font-bold text-brown-800 text-lg sm:text-xl", {
            "text-orange-500": isSelected,
          })}
        >
          {name}
        </h3>
        <p className={clsx("text-sm sm:text-base text-brown-600")}>{role}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;