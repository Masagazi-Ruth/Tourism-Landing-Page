import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { FaStar } from 'react-icons/fa';
import { fetchEventById } from '../services/api';
import { AuthContext } from '../components/AuthContext';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (!isAuthenticated) return; // Don't fetch data if not authenticated

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
        const eventData = {
          id: data.id,
          title: data.heading || 'Untitled Event',
          description: data.about || 'No description available.',
          image: data.bannerImages1 || 'https://via.placeholder.com/300x200?text=Event+Image',
          price: data.price || '3,360',
          rating: data.rating || 4.7,
          dates: data.calendarDates || 'TBD',
          duration: data.numberOfDays ? `${data.numberOfDays} Days` : 'TBD',
          sections: [
            {
              title: "Itinerary",
              days: data.schedule
                ? data.schedule.map(day => ({
                    day: day.day,
                    description: day.plan,
                    image: day.bannerImage,
                  }))
                : [],
            },
            {
              title: "Accommodation",
              description: data.accommodation || "Comfortable hotels and lodges.",
            },
            {
              title: "Activities",
              description: data.activities || "Sightseeing, cultural tours, and outdoor adventures.",
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
  }, [id, isAuthenticated]);

  if (authLoading || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

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
            <p className={clsx("text-gray-600 mb-4")}>{event.description}</p>
            <div className={clsx("text-gray-600 space-y-2")}>
              <p>
                <span className="font-semibold">Dates:</span> {event.dates}
              </p>
              <p>
                <span className="font-semibold">Duration:</span> {event.duration}
              </p>
            </div>
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
      {event.sections.map((section, index) => {
        const hasDays = section.days && section.days.length > 0;

        return (
          <section key={index} className={clsx("py-10", index % 2 === 0 ? "bg-white" : "bg-gray-50")}>
            <div className={clsx("max-w-6xl mx-auto px-4")}>
              <h2 className={clsx("text-2xl font-bold text-gray-800 mb-4")}>{section.title}</h2>
              {hasDays ? (
                <div className="space-y-6">
                  {section.days.map(day => {
                    const hasValidImage = day.image && !day.image.includes('via.placeholder.com');
                    return (
                      <div
                        key={day.day}
                        className={clsx("flex flex-col md:flex-row gap-6 p-6 rounded-lg", index % 2 === 0 ? "bg-gray-50" : "bg-white", "shadow-md")}
                      >
                        {hasValidImage && (
                          <div className={clsx("md:w-1/3")}>
                            <img
                              src={day.image}
                              alt={`Day ${day.day}`}
                              className={clsx("w-full h-48 object-cover rounded-md")}
                            />
                          </div>
                        )}
                        <div className={clsx(hasValidImage ? "md:w-2/3" : "md:w-full")}>
                          <h3 className={clsx("text-xl font-semibold text-gray-800 mb-2")}>
                            Day {day.day}: {day.description}
                          </h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div
                  className={clsx(
                    "p-6 rounded-lg",
                    index % 2 === 0 ? "bg-gray-50" : "bg-white",
                    "shadow-md"
                  )}
                >
                  <p className={clsx("text-gray-600 whitespace-pre-line")}>{section.description}</p>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default DetailPage;