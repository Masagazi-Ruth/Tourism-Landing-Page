import React, { useState } from 'react';
import clsx from 'clsx';
import IMAGES from '../assets/images/image'; // Adjust path if needed

const Events = () => {
  // Event data based on the screenshot
  const eventsData = [
    {
      id: 1,
      title: "Whole of South Africa",
      price: "3,360",
      duration: "10 Days/9 Nights",
      image:"https://img.freepik.com/free-photo/beautiful-shot-three-zebras-crossing-road-safari-with-trees_181624-30309.jpg",
      carouselImages: [
        "https://via.placeholder.com/300x200?text=South+Africa+1",
        "https://via.placeholder.com/300x200?text=South+Africa+2",
        "https://via.placeholder.com/300x200?text=South+Africa+3",
      ],
    },
    {
      id: 2,
      title: "South Africa with Mauritius",
      price: "4,000",
      duration: "13 Days/14 Nights",
      image: "https://img.freepik.com/free-photo/view-quiver-trees-forest-with-beautiful-sky-sunset-twilight-sky-scene-keetmanshoop-namibia_1150-21603.jpg",
      carouselImages: [
        "https://via.placeholder.com/300x200?text=Mauritius+1",
        "https://via.placeholder.com/300x200?text=Mauritius+2",
        "https://via.placeholder.com/300x200?text=Mauritius+3",
      ],
    },
    {
      id: 3,
      title: "Splendid South Africa",
      price: "2,560",
      duration: "8 Days/10 Nights",
      image: "https://img.freepik.com/free-photo/grassy-field-with-trees-giraffes-walking-around-with-light-blue-sky-background_181624-3477.jpg",
      carouselImages: [
        "https://via.placeholder.com/300x200?text=Splendid+1",
        "https://via.placeholder.com/300x200?text=Splendid+2",
        "https://via.placeholder.com/300x200?text=Splendid+3",
      ],
    },
    {
      id: 4,
      title: "African Jambo",
      price: "3,360",
      duration: "10 Days/9 Nights",
      image: "https://img.freepik.com/free-photo/savannah-landscape-national-park-kenya-africa_167946-107.jpg",
      carouselImages: [
        "https://via.placeholder.com/300x200?text=Jambo+1",
        "https://via.placeholder.com/300x200?text=Jambo+2",
        "https://via.placeholder.com/300x200?text=Jambo+3",
      ],
    },
    {
      id: 5,
      title: "Glimpse of South Africa with Kruger - Private Tour",
      price: "4,050",
      duration: "13 Days/14 Nights",
      image: IMAGES.WesternCape || "https://via.placeholder.com/300x200?text=Kruger+Tour",
      carouselImages: [
        "https://via.placeholder.com/300x200?text=Kruger+1",
        "https://via.placeholder.com/300x200?text=Kruger+2",
        "https://via.placeholder.com/300x200?text=Kruger+3",
      ],
    },
    {
      id: 6,
      title: "Splendid South Africa",
      price: "2,560",
      duration: "8 Days/10 Nights",
      image: IMAGES.MasaiMara || "https://via.placeholder.com/300x200?text=Splendid+South+Africa+2",
      carouselImages: [
        "https://via.placeholder.com/300x200?text=Splendid+2-1",
        "https://via.placeholder.com/300x200?text=Splendid+2-2",
        "https://via.placeholder.com/300x200?text=Splendid+2-3",
      ],
    },
  ];

  // State for search and pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleEvents, setVisibleEvents] = useState(6); // Initially show 6 events

  // Filter events based on search query
  const filteredEvents = eventsData.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setVisibleEvents(6); // Reset pagination when searching
  };

  // Handle "Load More" button click
  const handleLoadMore = () => {
    setVisibleEvents((prev) => prev + 6); // Load 6 more events
  };

  return (
    <div className={clsx("min-h-screen flex flex-col")}>
      {/* Hero Section */}
      <section className={clsx("bg-orange-500 py-16 text-white")}>
        <div className={clsx("max-w-6xl mx-auto px-4")}>
          <h1 className={clsx("text-4xl font-bold mb-2")}>Events</h1>
          <p className={clsx("text-xl mb-8")}>
            Life is either a daring adventure or nothing.
          </p>
          <div className={clsx("flex justify-end")}>
            <input
              type="text"
              placeholder="Search Here"
              value={searchQuery}
              onChange={handleSearchChange}
              className={clsx(
                "px-4 py-2 rounded-l-md border border-gray-300 bg-white text-gray-800",
                "focus:outline-none focus:ring-2 focus:ring-gray-400",
                "w-full max-w-xs"
              )}
            />
            <button
              className={clsx(
                "px-4 py-2 bg-gray-200 rounded-r-md",
                "hover:bg-gray-300 transition"
              )}
            >
              <svg
                className={clsx("w-5 h-5 text-gray-600")}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className={clsx("flex-grow py-10 bg-white")}>
        <div className={clsx("max-w-6xl mx-auto px-4")}>
          <div className={clsx("grid grid-cols-1 md:grid-cols-3 gap-6")}>
            {filteredEvents.slice(0, visibleEvents).map((event) => (
              <div
                key={event.id}
                className={clsx("bg-white rounded-lg shadow-md overflow-hidden")}
              >
                {/* Event Image with Carousel Dots */}
                <div className={clsx("relative")}>
                  <img
                    src={event.image}
                    alt={event.title}
                    className={clsx("w-full h-48 object-cover")}
                  />
                  {/* Carousel Dots */}
                  <div className={clsx("absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2")}>
                    {event.carouselImages.map((_, index) => (
                      <span
                        key={index}
                        className={clsx(
                          "w-3 h-3 rounded-full",
                          index === 0 ? "bg-white" : "bg-gray-400"
                        )}
                      />
                    ))}
                  </div>
                </div>
                {/* Event Details */}
                <div className={clsx("p-4")}>
                  <h3 className={clsx("text-lg font-bold text-gray-800 mb-2")}>
                    {event.title}
                  </h3>
                  <div className={clsx("flex items-center gap-2 text-gray-600")}>
                    <span>From $ {event.price} ~</span>
                    <span className={clsx("flex items-center gap-1")}>
                      <svg
                        className={clsx("w-5 h-5")}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"
                        />
                      </svg>
                      {event.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Load More Button */}
      {visibleEvents < filteredEvents.length && (
        <div className={clsx("py-6 text-center")}>
          <button
            onClick={handleLoadMore}
            className={clsx(
              "px-6 py-2 bg-orange-500 text-white rounded-md",
              "hover:bg-orange-600 transition"
            )}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Events;