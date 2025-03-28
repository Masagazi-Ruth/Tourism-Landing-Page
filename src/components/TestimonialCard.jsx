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
      className={clsx("flex items-center w-50 cursor-pointer")}
      onClick={onSelect}
    >
      {/* Profile Image */}
      <div
        className={clsx(
          "w-16 h-16 rounded-full bg-gray-200 mr-4 overflow-hidden border-2 transition",
          {
            "border-transparent": !isSelected,
            "border-blue-500": isSelected,
          }
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
          className={clsx("font-bold text-gray-800 text-xl", {
            "text-blue-500": isSelected,
          })}
        >
          {name}
        </h3>
        <p className={clsx("text-base text-gray-500")}>{role}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;