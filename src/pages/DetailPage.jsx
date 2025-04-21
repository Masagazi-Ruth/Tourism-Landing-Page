import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { FaStar } from 'react-icons/fa';
import { fetchEventById } from '../services/api';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for event data, loading, and error
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch event data from API
  useEffect(() => {
    const fetchEventData = async () => {
      setIsLoading(true);
      setError(null);

      const { data, error } = await fetchEventById(id);

      if (error) {
        setError(error);
        setIsLoading(false);
        return;
      }

      if (data) {
        // Map API data to the expected structure
        const eventData = {
          id: data.id,
          title: data.heading,
          description: data.about,
          image: data.bannerImages1 || 'https://via.placeholder.com/300x200?text=Event+Image',
          // Fallback for fields not in API
          price: data.price || '3,360',
          rating: data.rating || 4.7,
          sections: data.sections || [
            {
              title: "Itinerary",
              description: "Day 1: Arrive at destination.\nDay 2-5: Explore key attractions.\nDay 6: Depart.",
              image: "https://via.placeholder.com/600x400?text=Itinerary",
            },
            {
              title: "Accommodation",
              description: "Comfortable hotels and lodges.",
            },
            {
              title: "Activities",
              description: "Sightseeing, cultural tours, and outdoor adventures.",
            },
          ],
        };

        setEvent(eventData);
      } else {
        setError('Invalid data format received from API');
      }

      setIsLoading(false);
    };

    fetchEventData();
  }, [id]);

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Render error state
  if (error || !event) {
    return (
      <div className="text-center p-10 text-red-600">
        {error || 'Event not found'}
      </div>
    );
  }

  return (
    <div className={clsx("min-h-screen flex flex-col")}>
      {/* Hero Section */}
      <section
        className={clsx("relative h-[50vh] flex items-center justify-center bg-cover bg-center")}
        style={{ backgroundImage: `url(${event.image})` }}
      >
        <div className={clsx("absolute inset-0 bg-black opacity-40")} />
        <div className={clsx("relative z-10 text-center text-white")}>
          <h1 className={clsx("text-5xl font-bold mb-4")}>{event.title}</h1>
          <div className={clsx("flex justify-center gap-1 mb-4")}>
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={clsx(
                  "text-2xl",
                  i < Math.floor(event.rating) ? "text-yellow-400" : "text-gray-300"
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className={clsx("bg-gray-100 py-10")}>
        <div className={clsx("max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8")}>
          <div className={clsx("md:w-2/3")}>
            <h2 className={clsx("text-3xl font-bold text-gray-800 mb-4")}>About</h2>
            <p className={clsx("text-gray-600 mb-6")}>{event.description}</p>
          </div>
          <div className={clsx("md:w-1/3 bg-white p-6 rounded-lg shadow-md")}>
            <h3 className={clsx("text-2xl font-bold text-gray-800 mb-2")}>
              $ {event.price} / person
            </h3>
            <button
              className={clsx(
                "w-full px-4 py-2 bg-orange-500 text-white rounded-md",
                "hover:bg-orange-600 transition"
              )}
              onClick={() => navigate('/booking')}
            >
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      {event.sections.map((section, index) => (
        <section key={index} className={clsx("py-10", index % 2 === 0 ? "bg-white" : "bg-gray-50")}>
          <div className={clsx("max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8")}>
            {index % 2 === 0 ? (
              <>
                {section.image && (
                  <div className={clsx("md:w-1/2")}>
                    <img
                      src={section.image}
                      alt={section.title}
                      className={clsx("w-full h-64 object-cover rounded-md")}
                    />
                  </div>
                )}
                <div className={clsx(section.image ? "md:w-1/2" : "md:w-full")}>
                  <h2 className={clsx("text-2xl font-bold text-gray-800 mb-4")}>{section.title}</h2>
                  <p className={clsx("text-gray-600 whitespace-pre-line")}>{section.description}</p>
                </div>
              </>
            ) : (
              <>
                <div className={clsx("md:w-1/2")}>
                  <h2 className={clsx("text-2xl font-bold text-gray-800 mb-4")}>{section.title}</h2>
                  <p className={clsx("text-gray-600 whitespace-pre-line")}>{section.description}</p>
                </div>
                {section.image && (
                  <div className={clsx("md:w-1/2")}>
                    <img
                      src={section.image}
                      alt={section.title}
                      className={clsx("w-full h-64 object-cover rounded-md")}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default DetailPage;