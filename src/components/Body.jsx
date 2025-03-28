import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import HeroSection from './HeroSection';
import SectionContainer from './SectionContainer';
import TripCard from './TripCard';
import VideoCard from './VideoCard';
import TestimonialCard from './TestimonialCard';
import '../App.css';
import { FaStar } from 'react-icons/fa';
import IMAGES from '../assets/images/image'; // Correct path to images.jsx

const Body = () => {
  // Data for your sections
  const heroData = {
    title: "Experience Nature",
    subtitle: "India's Largest Trekking Organization",
    backgroundImage: IMAGES.Heros,
  };

  const highlightedEvents = [
    { id: 1, title: "Kilimanjaro", image: IMAGES.Kilimanjaro },
    { id: 2, title: "Madagascar", image: IMAGES.Madagascar },
    { id: 3, title: "Cape Town", image: IMAGES.CapeTown },
  ];

  const snowTreks = [
    { id: 1, title: "Kilimanjaro Trek", image: IMAGES.KilimanjaroTrek },
    { id: 2, title: "Mount Kenya Trek", image: IMAGES.MountKenyaTrek, badges: ["Mount Kenya Trek"] },
    { id: 3, title: "Rwenzori Trek", image: IMAGES.RwenzoriTrek, badges: ["Rwenzori Trek"] },
    { id: 4, title: "Atlas Trek", image: IMAGES.AtlasTrek, badges: ["Atlas Trek"] },
  ];

  const summerEvents = [
    { id: 1, title: "Kruger Park", image: IMAGES.KrugerPark },
    { id: 2, title: "Western Cape", image: IMAGES.WesternCape },
    { id: 3, title: "Addo Park", image: IMAGES.AddoPark },
    { id: 4, title: "Masai Mara", image: IMAGES.MasaiMara },
  ];

  const epicAdventures = [
    { id: 1, title: "Kilimanjaro Trek", image: IMAGES.KilimanjaroTrek, badges: ["Extreme", "Guide Required"] },
    { id: 2, title: "Hwange Park", image: IMAGES.HwangePark },
    { id: 3, title: "Botswana", image: IMAGES.Botswana },
  ];

  const specialEvents = [
    { id: 1, title: "Hunting", image: IMAGES.Hunting, badges: ["Popular", "Challenging"] },
    { id: 2, title: "Training Camp", image: IMAGES.TrainingCamp, badges: ["Exotic", "Wildlife"] },
  ];

  const exclusiveFootage = [
    {
      id: 1,
      videoId: "BHACKCNDMW8",
      title: "Exploring the Wilderness: A Journey to Remember",
      downloadUrl: "#",
      shareUrl: "https://www.youtube.com/watch?v=BHACKCNDMW8"
    },
    {
      id: 2,
      videoId: "KfNthrjEClE",
      title: "Epic Trekking Adventures in the Mountains",
      downloadUrl: "#",
      shareUrl: "https://www.youtube.com/watch?v=KfNthrjEClE"
    },
    {
      id: 3,
      videoId: "W6kp_lSISWg",
      title: "Hunting in the Wild: A Unique Experience",
      downloadUrl: "#",
      shareUrl: "https://www.youtube.com/watch?v=W6kp_lSISWg"
    },
  ];

  const testimonials = {
    milton: {
      name: "Milton Austin",
      role: "Sales Manager, ABC",
      message:
        "This trekking organization is excellent. Their costs are minimal due to their NGO's non-profit efforts. You can have the experience of trekking at the lowest cost with basic amenities and the best available trek leaders. The best part is the food they provide during the trek. Their cooks are the best I have experienced so far with different organizations. The food they serve is healthy and a balan.",
    },
    annie: {
      name: "Annie",
      role: "Head of Sales, ABC",
      message:
        "I had an amazing experience! The trek was well-organized, and the guides were extremely helpful. I highly recommend this adventure to everyone.",
    },
    sandra: {
      name: "Sandra",
      role: "Head of Sales, ABC",
      message:
        "An unforgettable experience! The support team ensured we had everything we needed. The entire trek was breathtaking, and I can't wait to do it again!",
    },
  };

  const [selectedPerson, setSelectedPerson] = useState("milton");
  const [hoveredSection, setHoveredSection] = useState("Highlighted Events");

  const profileImages = {
    milton: IMAGES.Milton || "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
    annie: IMAGES.Annie || "https://img.freepik.com/free-photo/portrait-expressive-young-woman_1258-48167.jpg",
    sandra: IMAGES.Sandra || "https://img.freepik.com/free-photo/portrait-caucasian-woman-smiling_53876-24998.jpg",
  };

  // useEffect to log state changes
  useEffect(() => {
    console.log(`Selected person changed to: ${selectedPerson}`);
  }, [selectedPerson]);

  useEffect(() => {
    console.log(`Hovered section changed to: ${hoveredSection}`);
  }, [hoveredSection]);

  // useEffect to add a global event listener for keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        // Example: Navigate between sections using arrow keys
        const sections = ["highlighted", "snowTreks", "summerEvents", "epicAdventures", "specialEvents", "exclusiveFootage"];
        const currentIndex = sections.indexOf(hoveredSection);
        let newIndex;

        if (e.key === "ArrowLeft") {
          newIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
        } else {
          newIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
        }

        setHoveredSection(sections[newIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
        gridCols="md:grid-cols-3"
        onMouseEnter={() => setHoveredSection("highlighted")}
        onMouseLeave={() => setHoveredSection(null)}
        isHovered={hoveredSection === "highlighted"}
      >
        {highlightedEvents.map(event => (
          <TripCard
            key={event.id}
            image={event.image}
            title={event.title}
            badges={event.badges}
            variant="default"
          />
        ))}
      </SectionContainer>

      {/* Snow Treks (4 columns) */}
      <SectionContainer
        title="Snow Treks"
        subtitle="Experience the magic of winter landscapes with our guided snow treks"
        bgColor="bg-gray-100"
        gridCols="md:grid-cols-4"
        onMouseEnter={() => setHoveredSection("snowTreks")}
        onMouseLeave={() => setHoveredSection(null)}
        isHovered={hoveredSection === "snowTreks"}
      >
        {snowTreks.map(trek => (
          <TripCard
            key={trek.id}
            image={trek.image}
            title={trek.title}
            variant="default"
          />
        ))}
      </SectionContainer>

      {/* Summer Events (4 columns) */}
      <SectionContainer
        title="Summer Events"
        subtitle="Join our exciting range of summer activities"
        gridCols="md:grid-cols-4"
        onMouseEnter={() => setHoveredSection("summerEvents")}
        onMouseLeave={() => setHoveredSection(null)}
        isHovered={hoveredSection === "summerEvents"}
      >
        {summerEvents.map(event => (
          <TripCard
            key={event.id}
            image={event.image}
            title={event.title}
            variant="default"
          />
        ))}
      </SectionContainer>

      {/* Epic Adventure (3 columns) */}
      <SectionContainer
        title="Epic Adventure"
        subtitle="Push your limits with our most thrilling outdoor challenges"
        bgColor="bg-gray-100"
        gridCols="md:grid-cols-3"
        onMouseEnter={() => setHoveredSection("epicAdventures")}
        onMouseLeave={() => setHoveredSection(null)}
        isHovered={hoveredSection === "epicAdventures"}
      >
        {epicAdventures.map(adventure => (
          <TripCard
            key={adventure.id}
            image={adventure.image}
            title={adventure.title}
            badges={adventure.badges}
            variant="large"
          />
        ))}
      </SectionContainer>

      {/* Special Events (3 columns) */}
      <SectionContainer
        title="Special Events"
        subtitle="Join us for unique, limited-time gatherings that celebrate remarkable occasions"
        gridCols="md:grid-cols-3"
        onMouseEnter={() => setHoveredSection("specialEvents")}
        onMouseLeave={() => setHoveredSection(null)}
        isHovered={hoveredSection === "specialEvents"}
      >
        {specialEvents.map(event => (
          <TripCard
            key={event.id}
            image={event.image}
            title={event.title}
            badges={event.badges}
            variant="default"
          />
        ))}
      </SectionContainer>

      {/* Exclusive Footage (2 columns) */}
      <SectionContainer
        title="Experience Yourself"
        subtitle="Exclusive footage from our camps"
        bgColor="bg-pink-50"
        gridCols="md:grid-cols-2"
        onMouseEnter={() => setHoveredSection("exclusiveFootage")}
        onMouseLeave={() => setHoveredSection(null)}
        isHovered={hoveredSection === "exclusiveFootage"}
      >
        {exclusiveFootage.map(video => (
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
        className={clsx(
          "why-people-love-section",
          "p-10 bg-gray-50 rounded-xl shadow-lg mt-10"
        )}
      >
        <div className={clsx("mb-8 text-left")}>
          <h1
            className={clsx(
              "text-3xl font-bold mb-2 text-gray-800"
            )}
          >
            Why people 💖 Invincible
          </h1>
          <h2
            className={clsx(
              "text-xl font-normal text-gray-600"
            )}
          >
            Experience the best with us
          </h2>
        </div>

        <div className={clsx("flex flex-col md:flex-row gap-8 items-start")}>
          {/* Profile Image Section */}
          <div
            className={clsx(
              "bg-white p-6 rounded-lg shadow-md"
            )}
            style={{ width: "547px", height: "429px" }}
          >
            <div className={clsx("space-y-8 h-full flex flex-col justify-center bg-[#EEE6E6]")}>
              {Object.keys(testimonials).map((key) => (
                <div
                  key={key}
                  className={clsx("flex items-center cursor-pointer")}
                  onClick={() => setSelectedPerson(key)}
                >
                  <div
                    className={clsx(
                      "w-16 h-16 rounded-full bg-gray-200 mr-4 overflow-hidden border-2 border-transparent",
                      "hover:border-blue-500 transition"
                    )}
                  >
                    <img
                      src={profileImages[key]}
                      alt={testimonials[key].name}
                      className={clsx("w-full h-full object-cover")}
                    />
                  </div>
                  <div>
                    <h3
                      className={clsx(
                        "font-bold text-left text-gray-800 text-xl",
                        selectedPerson === key && "text-blue-500"
                      )}
                    >
                      {testimonials[key].name}
                    </h3>
                    <p className={clsx("text-md text-gray-500")}>
                      {testimonials[key].role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Display Section */}
          <div className={clsx("flex flex-col")}>
            <div className={clsx("flex mb-4 ml-2")}>
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={clsx("text-3xl text-yellow-400")} />
              ))}
            </div>

            <div
              className={clsx(
                "bg-white p-6 rounded-lg shadow-md"
              )}
              style={{ width: "569px", height: "358px" }}
            >
              <p
                className={clsx(
                  "text-gray-700 text-left leading-relaxed text-lg h-full flex items-center"
                )}
              >
                {testimonials[selectedPerson].message}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Body;