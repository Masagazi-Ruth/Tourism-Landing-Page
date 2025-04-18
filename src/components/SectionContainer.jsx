import React, { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function SectionContainer({ title, subtitle, children, bgColor = 'white', backgroundImage }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      className={`py-2 px-1 ${bgColor} relative`}
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'left' }
          : {}
      }
    >
      <div className="absolute inset-0 bg-white bg-opacity-40"></div> {/* Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {title && <h2 className="text-2xl text-left font-bold mb-2 text-amber-700">{title}</h2>}
        {subtitle && <p className="text-amber-950 text-left mb-6">{subtitle}</p>}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 focus:outline-none"
            aria-label="Scroll left"
          >
            <FaChevronLeft className="text-gray-700" />
          </button>
          {/* Scrollable Content */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-4 scroll-smooth scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {React.Children.map(children, (child) => (
              <div className="flex-none w-[300px]">{child}</div>
            ))}
          </div>
          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 focus:outline-none"
            aria-label="Scroll right"
          >
            <FaChevronRight className="text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default SectionContainer;