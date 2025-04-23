import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeroSection from './HeroSection';
import SectionContainer from './SectionContainer';
import TripCard from './TripCard';
import VideoCard from './VideoCard';
import TestimonialCard from './TestimonialCard';
import '../App.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import IMAGES from '../assets/images/image';
import { AuthContext } from '../components/AuthContext'; // Import AuthContext

const Body = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext); // Access authentication status

  // Hero data (static) with fallback
  const heroData = {
    title: "Experience Nature",
    subtitle: "India's Largest Trekking Organization",
    backgroundImage: IMAGES.HEROS || IMAGES.Heros,
  };

  // State for event categories
  const [highlightedEvents, setHighlightedEvents] = useState([]);
  const [snowTreks, setSnowTreks] = useState([]);
  const [summerEvents, setSummerEvents] = useState([]);
  const [monsoonEvents, setMonsoonEvents] = useState([]);
  const [epicAdventures, setEpicAdventures] = useState([]);
  const [specialEvents, setSpecialEvents] = useState([]);

  // State for testimonials
  const [testimonials, setTestimonials] = useState({});

  // State for exclusive footage (static)
  const [exclusiveFootage] = useState([
    {
      id: 1,
      videoId: "BHACKCNDMW8",
      title: "Exploring the Wilderness: A Journey to Remember",
      downloadUrl: "#",
      shareUrl: "https://www.youtube.com/watch?v=BHACKCNDMW8",
    },
    {
      id: 2,
      videoId: "KfNthrjEClE",
      title: "Epic Trekking Adventures in the Mountains",
      downloadUrl: "#",
      shareUrl: "https://www.youtube.com/watch?v=KfNthrjEClE",
    },
    {
      id: 3,
      videoId: "W6kp_lSISWg",
      title: "Hunting in the Wild: A Unique Experience",
      downloadUrl: "#",
      shareUrl: "https://www.youtube.com/watch?v=W6kp_lSISWg",
    },
  ]);

  // State for loading and errors
  const [loading, setLoading] = useState({
    highlighted: true,
    snowTreks: true,
    summerEvents: true,
    monsoonEvents: true,
    epicAdventures: true,
    specialEvents: true,
    testimonials: true,
  });
  const [errors, setErrors] = useState({
    highlighted: null,
    snowTreks: null,
    summerEvents: null,
    monsoonEvents: null,
    epicAdventures: null,
    specialEvents: null,
    testimonials: null,
  });

  // State for selected person and hovered section
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [hoveredSection, setHoveredSection] = useState("Highlighted Events");

  // API endpoints using environment variable, memoized
  const apiEndpoints = useMemo(() => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://sample-project-api.chordifyed.com/api/v1';
    return {
      highlighted: `${baseUrl}/events/highlighted-events`,
      snowTreks: `${baseUrl}/events/snow-treks-events`,
      summerEvents: `${baseUrl}/events/summer-events`,
      monsoonEvents: `${baseUrl}/events/monsoon-events`,
      epicAdventures: `${baseUrl}/events/epic-adventure-events`,
      specialEvents: `${baseUrl}/events/special-events`,
      testimonials: `${baseUrl}/info/testimonials`,
    };
  }, []);

  // Fetch events for a specific category
  const fetchEvents = useCallback(async (category, setData) => {
    const controller = new AbortController();
    try {
      setLoading((prev) => ({ ...prev, [category]: true }));
      setErrors((prev) => ({ ...prev, [category]: null }));

      const response = await axios.get(apiEndpoints[category], {
        signal: controller.signal,
      });

      const data = Array.isArray(response.data) ? response.data : response.data[category] || [];
      setData(data);
    } catch (err) {
      console.error(`Error fetching ${category}:`, err.message, err.response);
      if (err.name === 'AbortError') return;
      setErrors((prev) => ({
        ...prev,
        [category]: `Failed to load ${category} data. Please try again.`,
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [category]: false }));
    }
    return () => controller.abort();
  }, [apiEndpoints]);

  // Fetch testimonials
  const fetchTestimonials = useCallback(async () => {
    const controller = new AbortController();
    try {
      setLoading((prev) => ({ ...prev, testimonials: true }));
      setErrors((prev) => ({ ...prev, testimonials: null }));

      const response = await axios.get(apiEndpoints.testimonials, {
        signal: controller.signal,
      });

      // Transform API array into object with keys
      const testimonialObj = response.data.reduce((acc, curr) => {
        const key = curr.name.toLowerCase().replace(/\s+/g, '');
        acc[key] = {
          name: curr.name,
          role: curr.role,
          message: curr.review,
          image: curr.profileImage,
          ratings: curr.ratings,
        };
        return acc;
      }, {});

      setTestimonials(testimonialObj);
      const firstKey = Object.keys(testimonialObj)[0];
      if (firstKey) setSelectedPerson(firstKey);
    } catch (err) {
      console.error('Error fetching testimonials:', err.message, err.response);
      if (err.name === 'AbortError') return;
      setErrors((prev) => ({
        ...prev,
        testimonials: 'Failed to load testimonials. Please try again.',
      }));
    } finally {
      setLoading((prev) => ({ ...prev, testimonials: false }));
    }
    return () => controller.abort();
  }, [apiEndpoints]);

  // Fetch all data on mount
  useEffect(() => {
    fetchEvents('highlighted', setHighlightedEvents);
    fetchEvents('snowTreks', setSnowTreks);
    fetchEvents('summerEvents', setSummerEvents);
    fetchEvents('monsoonEvents', setMonsoonEvents);
    fetchEvents('epicAdventures', setEpicAdventures);
    fetchEvents('specialEvents', setSpecialEvents);
    fetchTestimonials();
  }, [fetchEvents, fetchTestimonials]);

  // Transform API data to match TripCard props
  const transformEventData = (events) =>
    events.map((event) => ({
      id: event.id,
      title: event.heading,
      image: event.bannerImages1,
      badges: event.badges || [],
    }));

  // Memoize transformed data
  const memoizedHighlightedEvents = useMemo(
    () => transformEventData(highlightedEvents),
    [highlightedEvents]
  );
  const memoizedSnowTreks = useMemo(() => transformEventData(snowTreks), [snowTreks]);
  const memoizedSummerEvents = useMemo(() => transformEventData(summerEvents), [summerEvents]);
  const memoizedMonsoonEvents = useMemo(() => transformEventData(monsoonEvents), [monsoonEvents]);
  const memoizedEpicAdventures = useMemo(() => transformEventData(epicAdventures), [epicAdventures]);
  const memoizedSpecialEvents = useMemo(() => transformEventData(specialEvents), [specialEvents]);

  // Render star ratings dynamically
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-3xl text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-3xl text-yellow-400" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-3xl text-yellow-400" />);
    }

    return stars;
  };

  // Skeleton Loader Component
  const SkeletonCard = ({ variant = 'default' }) => (
    <div
      className={clsx(
        'bg-white rounded-lg shadow-md overflow-hidden animate-pulse',
        variant === 'large' ? 'h-80' : 'h-64'
      )}
    >
      <div className="w-full h-48 bg-gray-200" />
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded mb-2" />
        <div className="h-4 bg-gray-200 rounded" />
      </div>
    </div>
  );

  // Error Display Component
  const ErrorDisplay = ({ error, onRetry }) => (
    <div className="text-center py-10 text-red-600">
      <p>{error}</p>
      <button
        onClick={onRetry}
        className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
      >
        Retry
      </button>
    </div>
  );

  // Handle TripCard click with authentication check
  const handleTripCardClick = (eventId) => {
    if (isAuthenticated) {
      navigate(`/events/${eventId}`); // Navigate to DetailPage if logged in
    } else {
      navigate('/login'); // Redirect to login if not authenticated
    }
  };

  // useEffect for logging state changes
  useEffect(() => {
    console.log(`Selected person changed to: ${selectedPerson}`);
  }, [selectedPerson]);

  useEffect(() => {
    console.log(`Hovered section changed to: ${hoveredSection}`);
  }, [hoveredSection]);

  // useEffect for keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const sections = [
          'highlighted',
          'snowTreks',
          'summerEvents',
          'monsoonEvents',
          'epicAdventures',
          'specialEvents',
          'exclusiveFootage',
        ];
        const currentIndex = sections.indexOf(hoveredSection.toLowerCase());
        let newIndex;

        if (e.key === 'ArrowLeft') {
          newIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
        } else {
          newIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
        }

        setHoveredSection(sections[newIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hoveredSection]);

  return (
    <main>
      {/* Hero Section */}
      <HeroSection
        title={heroData.title}
        subtitle={heroData.subtitle}
        backgroundImage={heroData.backgroundImage}
      />

      {/* Highlighted Events (3 columns) */}
      <SectionContainer
        title="Highlighted Events"
        subtitle="Recommended camps by our instructors"
        gridCols="md:grid-cols-6"
        onMouseEnter={() => setHoveredSection('highlighted')}
        onMouseLeave={() => setHoveredSection(null)}
        isHovered={hoveredSection === 'highlighted'}
      >
        {loading.highlighted ? (
          Array(3)
            .fill()
            .map((_, i) => <SkeletonCard key={i} />)
        ) : errors.highlighted ? (
          <ErrorDisplay
            error={errors.highlighted}
            onRetry={() => fetchEvents('highlighted', setHighlightedEvents)}
          />
        ) : memoizedHighlightedEvents.length > 0 ? (
          memoizedHighlightedEvents.map((event) => (
            <TripCard
              key={event.id}
              image={event.image}
              title={event.title}
              badges={event.badges}
              variant="default"
              onClick={() => handleTripCardClick(event.id)} // Use the new handler
            />
          ))
        ) : (
          <p className="text-center text-gray-600">No events available.</p>
        )}
      </SectionContainer>

      {/* Snow Treks (4 columns) */}
      <SectionContainer
        title="Snow Treks"
        subtitle="Experience the magic of winter landscapes with our guided snow treks"
        bgColor="bg-gray-100"
        gridCols="md:grid-cols-6"
        onMouseEnter={() => setHoveredSection('snowTreks')}
        onMouseLeave={() => setHoveredSection(null)}
        isHovered={hoveredSection === 'snowTreks'}
      >
        {loading.snowTreks ? (
          Array(4)
            .fill()
            .map((_, i) => <SkeletonCard key={i} />)
        ) : errors.snowTreks ? (
          <ErrorDisplay
            error={errors.snowTreks}
            onRetry={() => fetchEvents('snowTreks', setSnowTreks)}
          />
        ) : memoizedSnowTreks.length > 0 ? (
          memoizedSnowTreks.map((trek) => (
            <TripCard
              key={trek.id}
              image={trek.image}
              title={trek.title}
              badges={trek.badges}
              variant="default"
              onClick={() => handleTripCardClick(trek.id)} // Use the new handler
            />
          ))
        ) : (
          <p className="text-center text-gray-600">No treks available.</p>
        )}
      </SectionContainer>

      {/* Summer Events (4 columns) */}
      <SectionContainer
        title="Summer Events"
        subtitle="Join our exciting range of summer activities"
        gridCols="md:grid-cols-6"
        onMouseEnter={() => setHoveredSection('summerEvents')}
        onMouseLeave={() => setHoveredSection(null)}
        isHovered={hoveredSection === 'summerEvents'}
      >
        {loading.summerEvents ? (
          Array(4)
            .fill()
            .map((_, i) => <SkeletonCard key={i} />)
        ) : errors.summerEvents ? (
          <ErrorDisplay
            error={errors.summerEvents}
            onRetry={() => fetchEvents('summerEvents', setSummerEvents)}
          />
        ) : memoizedSummerEvents.length > 0 ? (
          memoizedSummerEvents.map((event) => (
            <TripCard
              key={event.id}
              image={event.image}
              title={event.title}
              badges={event.badges}
              variant="default"
              onClick={() => handleTripCardClick(event.id)} // Use the new handler
            />
          ))
        ) : (
          <p className="text-center text-gray-600">No events available.</p>
        )}
      </SectionContainer>

      {/* Monsoon Events (4 columns) */}
      <SectionContainer
        title="Monsoon Events"
        subtitle="Explore thrilling adventures during the lush monsoon season"
        bgColor="bg-gray-100"
        gridCols="md:grid-cols-6"
        onMouseEnter={() => setHoveredSection('monsoonEvents')}
        onMouseLeave={() => setHoveredSection(null)}
        isHovered={hoveredSection === 'monsoonEvents'}
      >
        {loading.monsoonEvents ? (
          Array(4)
            .fill()
            .map((_, i) => <SkeletonCard key={i} />)
        ) : errors.monsoonEvents ? (
          <ErrorDisplay
            error={errors.monsoonEvents}
            onRetry={() => fetchEvents('monsoonEvents', setMonsoonEvents)}
          />
        ) : memoizedMonsoonEvents.length > 0 ? (
          memoizedMonsoonEvents.map((event) => (
            <TripCard
              key={event.id}
              image={event.image}
              title={event.title}
              badges={event.badges}
              variant="default"
              onClick={() => handleTripCardClick(event.id)} // Use the new handler
            />
          ))
        ) : (
          <p className="text-center text-gray-600">No events available.</p>
        )}
      </SectionContainer>

      {/* Epic Adventure (3 columns) */}
      <SectionContainer
        title="Epic Adventure"
        subtitle="Push your limits with our most thrilling outdoor challenges"
        bgColor="bg-gray-100"
        gridCols="md:grid-cols-6"
        onMouseEnter={() => setHoveredSection('epicAdventures')}
        onMouseLeave={() => setHoveredSection(null)}
        isHovered={hoveredSection === 'epicAdventures'}
      >
        {loading.epicAdventures ? (
          Array(3)
            .fill()
            .map((_, i) => <SkeletonCard key={i} variant="large" />)
        ) : errors.epicAdventures ? (
          <ErrorDisplay
            error={errors.epicAdventures}
            onRetry={() => fetchEvents('epicAdventures', setEpicAdventures)}
          />
        ) : memoizedEpicAdventures.length > 0 ? (
          memoizedEpicAdventures.map((adventure) => (
            <TripCard
              key={adventure.id}
              image={adventure.image}
              title={adventure.title}
              badges={adventure.badges}
              variant="large"
              onClick={() => handleTripCardClick(adventure.id)} // Use the new handler
            />
          ))
        ) : (
          <p className="text-center text-gray-600">No adventures available.</p>
        )}
      </SectionContainer>

      {/* Special Events (3 columns) */}
      <SectionContainer
        title="Special Events"
        subtitle="Join us for unique, limited-time gatherings that celebrate remarkable occasions"
        gridCols="md:grid-cols-6"
        onMouseEnter={() => setHoveredSection('specialEvents')}
        onMouseLeave={() => setHoveredSection(null)}
        isHovered={hoveredSection === 'specialEvents'}
      >
        {loading.specialEvents ? (
          Array(3)
            .fill()
            .map((_, i) => <SkeletonCard key={i} />)
        ) : errors.specialEvents ? (
          <ErrorDisplay
            error={errors.specialEvents}
            onRetry={() => fetchEvents('specialEvents', setSpecialEvents)}
          />
        ) : memoizedSpecialEvents.length > 0 ? (
          memoizedSpecialEvents.map((event) => (
            <TripCard
              key={event.id}
              image={event.image}
              title={event.title}
              badges={event.badges}
              variant="default"
              onClick={() => handleTripCardClick(event.id)} // Use the new handler
            />
          ))
        ) : (
          <p className="text-center text-gray-600">No events available.</p>
        )}
      </SectionContainer>

      {/* Exclusive Footage (2 columns) */}
      <SectionContainer className='bg-pink-200'
        title="Experience Yourself"
        subtitle="Exclusive footage from our camps"
        bgColor="bg-pink-800"
        gridCols="md:grid-cols-6"
        onMouseEnter={() => setHoveredSection('exclusiveFootage')}
        onMouseLeave={() => setHoveredSection(null)}
        isHovered={hoveredSection === 'exclusiveFootage'}
      >
        {exclusiveFootage.map((video) => (
          <VideoCard
            key={video.id}
            videoId={video.videoId}
            title={video.title}
            downloadUrl={video.downloadUrl}
            shareUrl={video.shareUrl}
          />
        ))}
      </SectionContainer>

      {/* Why People Love Invincible */}
      <section
        className={clsx('why-people-love-section', 'p-6 sm:p-10 bg-white rounded-xl shadow-lg mt-8 sm:mt-10')}
      >
        <div className={clsx('mb-6 sm:mb-8 text-left')}>
          <h1 className={clsx('text-2xl sm:text-3xl font-bold mb-2 text-brown-800')}>
            Why people 💖 Invincible
          </h1>
          <h2 className={clsx('text-lg sm:text-xl font-normal text-brown-600')}>
            Experience the best with us
          </h2>
        </div>

        <div className={clsx('flex flex-col lg:flex-row gap-6 sm:gap-8 items-start')}>
          {/* Profile Image Section */}
          <div
            className={clsx(' bg-[#E6DADA] p-4 sm:p-6 rounded-lg shadow-md w-full lg:w-1/2 max-w-full lg:max-w-md')}
          >
            {loading.testimonials ? (
              <div className="space-y-6 sm:space-y-8 h-full flex flex-col justify-center">
                {Array(3)
                  .fill()
                  .map((_, i) => (
                    <div key={i} className="flex items-center animate-pulse">
                      <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-gray-200 mr-4" />
                      <div>
                        <div className="h-5 sm:h-6 w-32 bg-gray-200 rounded mb-1" />
                        <div className="h-4 w-24 bg-gray-200 rounded" />
                      </div>
                    </div>
                  ))}
              </div>
            ) : errors.testimonials ? (
              <ErrorDisplay
                error={errors.testimonials}
                onRetry={fetchTestimonials}
              />
            ) : Object.keys(testimonials).length > 0 ? (
              <div className={clsx('space-y-6 sm:space-y-8 h-full flex flex-col justify-center')}>
                {Object.keys(testimonials).map((key) => (
                  <TestimonialCard
                    key={key}
                    name={testimonials[key].name}
                    role={testimonials[key].role}
                    image={testimonials[key].image}
                    isSelected={selectedPerson === key}
                    onSelect={() => setSelectedPerson(key)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-brown-600">No testimonials available.</p>
            )}
          </div>

          {/* Testimonial Display Section */}
          <div className={clsx('flex flex-col w-full lg:w-1/2')}>
            <div className={clsx('flex mb-3 sm:mb-4 ml-2')}>
              {selectedPerson && testimonials[selectedPerson]
                ? renderStars(testimonials[selectedPerson].ratings)
                : Array(5)
                  .fill()
                  .map((_, i) => (
                    <FaStar key={i} className={clsx('text-2xl sm:text-3xl text-orange-500')} />
                  ))}
            </div>

            <div
              className={clsx('bg-white p-4 sm:p-6 rounded-lg shadow-md w-full max-w-full lg:max-w-md min-h-[200px] sm:min-h-[300px]')}
            >
              {loading.testimonials ? (
                <div className="h-full flex items-center animate-pulse">
                  <div className="w-full h-20 bg-gray-200 rounded" />
                </div>
              ) : errors.testimonials ? (
                <p className="text-brown-700 text-left leading-relaxed text-base sm:text-lg">
                  Unable to load testimonial.
                </p>
              ) : selectedPerson && testimonials[selectedPerson] ? (
                <p
                  className={clsx(
                    'text-brown-700 text-left leading-relaxed text-base sm:text-lg h-full flex items-center'
                  )}
                >
                  {testimonials[selectedPerson].message}
                </p>
              ) : (
                <p className="text-brown-700 text-left leading-relaxed text-base sm:text-lg">
                  Select a person to view their testimonial.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Body;