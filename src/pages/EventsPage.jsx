import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleEvents, setVisibleEvents] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map of category names to their API endpoints
  const categoryEndpoints = {
    all: 'all-events',
    SnowTreks: 'snow-treks-events',
    SummerEvents: 'summer-events',
    MonsoonEvents: 'monsoon-events',
    EpicAdventures: 'epic-adventure-events',
    SpecialEvents: 'special-events',
  };

  const fetchEvents = useCallback(async (category = 'all') => {
    try {
      setIsLoading(true);
      setError(null);

      // Get the appropriate endpoint for the selected category
      const endpoint = categoryEndpoints[category] || 'all-events';
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://sample-project-api.chordifyed.com/api/v1';
      const apiUrl = `${baseUrl}/events/${endpoint}`;

      console.log(`Fetching from: ${apiUrl}`);
      const response = await axios.get(apiUrl);
      console.log('API Response:', response.data);

      // Handle different response structures based on category
      if (category === 'all' && response.data && typeof response.data === 'object') {
        // For 'all-events', we get an object with category arrays
        const categories = Object.keys(response.data);

        // Flatten all event arrays from different categories
        const allEvents = categories.reduce((acc, cat) => {
          const eventsWithCategory = response.data[cat].map(event => ({
            ...event,
            category: cat,
          }));
          return [...acc, ...eventsWithCategory];
        }, []);

        setEvents(allEvents);
      } else if (Array.isArray(response.data)) {
        // For category-specific endpoints, we get an array directly
        const eventsWithCategory = response.data.map(event => ({
          ...event,
          category,
        }));
        setEvents(eventsWithCategory);
      } else if (response.data && response.data[category] && Array.isArray(response.data[category])) {
        // Some APIs might return an object with a single category key
        const eventsWithCategory = response.data[category].map(event => ({
          ...event,
          category,
        }));
        setEvents(eventsWithCategory);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error(`Error fetching ${category} events:`, err.message, err.response);
      setError(`Failed to load ${category} events. Please try again later.`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial data load
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Fetch new data when category changes
  useEffect(() => {
    if (selectedCategory) {
      fetchEvents(selectedCategory);
    }
  }, [selectedCategory, fetchEvents]);

  // Title-based filtering within the current category
  const filteredEvents = events.filter((event) =>
    event?.heading?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setVisibleEvents(6);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setVisibleEvents(6);
  };

  const handleLoadMore = () => {
    setVisibleEvents((prev) => prev + 6);
  };

  const handleEventClick = (eventId) => {
    window.location.href = `/events/${eventId}`;
  };

  // Helper function to format category names for display
  const formatCategoryName = (category) => {
    return category.replace(/([A-Z])/g, ' $1').trim();
  };

  // Helper function to truncate text
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-orange-500 py-16 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Adventures & Expeditions</h1>
          <p className="text-xl mb-8">
            Life is either a daring adventure or nothing.
          </p>
          <div className="flex justify-end">
            <input
              type="text"
              placeholder="Search Here"
              value={searchQuery}
              onChange={handleSearchChange}
              className="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 w-full max-w-xs"
            />
            <button
              className="px-4 py-2 bg-gray-200 rounded-r-md hover:bg-gray-300 transition"
              aria-label="Search"
            >
              <svg
                className="w-5 h-5 text-gray-600"
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

      {/* Category Chips */}
      <div className="bg-gray-100 py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap gap-2">
          <button 
            className={`px-4 py-1 rounded-full text-sm font-medium ${selectedCategory === 'all' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            onClick={() => handleCategoryChange('all')}
          >
            All Adventures
          </button>
          {Object.keys(categoryEndpoints).filter(cat => cat !== 'all').map(category => (
            <button
              key={category}
              className={`px-4 py-1 rounded-full text-sm font-medium ${selectedCategory === category ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              onClick={() => handleCategoryChange(category)}
            >
              {formatCategoryName(category)}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-600">
          <p>{error}</p>
          <button
            onClick={() => fetchEvents(selectedCategory)}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          {/* Events Grid */}
          <section className="flex-grow py-10 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              {filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredEvents.slice(0, visibleEvents).map((event) => (
                    <div
                      key={event?.id || Math.random().toString()}
                      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
                      onClick={() => handleEventClick(event?.id)}
                    >
                      <div className="relative">
                        <img
                          src={event?.bannerImages1}
                          alt={event?.heading || "Event"}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                          }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                          <div className="flex gap-1">
                            <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                              {event?.numberOfDays || 0} days
                            </span>
                            {event.category && (
                              <span className="bg-gray-700 text-white px-2 py-1 rounded-md text-xs font-semibold">
                                {formatCategoryName(event.category)}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Image indicators */}
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                          {event?.bannerImages1 && (
                            <span className="w-2 h-2 rounded-full bg-white" />
                          )}
                          {event?.bannerImages2 && (
                            <span className="w-2 h-2 rounded-full bg-gray-400" />
                          )}
                          {event?.bannerImages3 && (
                            <span className="w-2 h-2 rounded-full bg-gray-400" />
                          )}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          {event?.heading || "Untitled Event"}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {truncateText(event?.about, 100)}
                        </p>
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="flex items-center gap-1">
                            <svg
                              className="w-5 h-5"
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
                            {event?.calendarDates || "Date not specified"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-xl text-gray-600">
                    No events found matching your search.
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mt-4 text-orange-500 font-semibold"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* Load More Button */}
          {visibleEvents < filteredEvents.length && (
            <div className="py-6 text-center">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Events;