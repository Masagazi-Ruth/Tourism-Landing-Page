
import {  useRef } from 'react';
import EventCard from "./EventCard";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const events = [
  { name: "Kilimanjaro", image: "/top.jpg" },
  { name: "Madagascar", image: "/cliff.jpg" },
  { name: "Cape Town", image: "/walk.jpg" },
  { name: "Kilimanjaro", image: "/top.jpg" },
  { name: "Madagascar", image: "/cliff.jpg" },
  { name: "Cape Town", image: "/walk.jpg" }
];

const Events = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="py-16 px-10 relative">
      <h2 className="text-3xl font-bold">Highlighted Events</h2>
      <p className="text-gray-600">Recommended camps by our instructors</p>
      
      <div className="relative mt-8">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
        >
          <FaChevronLeft className="text-gray-700" />
        </button>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 scroll-smooth scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {events.map((event, index) => (
            <div key={index} className="flex-none w-full md:w-1/3">
              <EventCard event={event} />
            </div>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
        >
          <FaChevronRight className="text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default Events;

