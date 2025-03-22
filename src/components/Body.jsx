// File: src/components/Body.js
import React from 'react';
import HeroSection from './HeroSection';
import SectionContainer from './SectionContainer';
import TripCard from './TripCard';
import VideoCard from './VideoCard'; // Ensure this import is present
import TestimonialCard from './TestimonialCard';
import '../App.css';
import { FaStar } from 'react-icons/fa';

const Body = () => {
  // Data for your sections
  const heroData = {
    title: "Experience Nature",
    subtitle: "India's Largest Trekking Organization",
    backgroundImage: "https://images.stockcake.com/public/1/6/4/16494687-9d5e-4040-81cb-3c2122f28f6c_large/sunset-hiking-adventure-stockcake.jpg"
  };

  const highlightedEvents = [
    { id: 1, title: "Kilimanjaro", image: "https://www.explorerwandatours.com/wp-content/uploads/2023/06/Mount-Kilimanjaro-Tanzania.jpg" },
    { id: 2, title: "Madagascar", image: "https://jenmansafaris.com/wp-content/uploads/2020/02/shutterstock_259688660.jpg"},
    { id: 3, title: "Cape Town", image: "https://cdn.craft.cloud/101e4579-0e19-46b6-95c6-7eb27e4afc41/assets/uploads/Guides/cape-town-frommers.jpg" },
  ];

  const snowTreks = [
    { id: 1, title: "Kilimanjaro Trek", image: "https://www.adventurealternative.com/wp-content/uploads/2024/08/trekking-to-the-top-of-kilimanjaro-2.jpg.webp" },
    { id: 2, title: "Mount Kenya Trek", image: "https://images.stockcake.com/public/1/6/4/16494687-9d5e-4040-81cb-3c2122f28f6c_large/sunset-hiking-adventure-stockcake.jpg", badges: ["Mount Kenya Trek"] },
    { id: 3, title: "Rwenzori Trek", image: "https://images.stockcake.com/public/1/6/4/16494687-9d5e-4040-81cb-3c2122f28f6c_large/sunset-hiking-adventure-stockcake.jpg", badges: ["Rwenzori Trek"] },
    { id: 4, title: "Atlas Trek", image: "https://images.stockcake.com/public/1/6/4/16494687-9d5e-4040-81cb-3c2122f28f6c_large/sunset-hiking-adventure-stockcake.jpg", badges: ["Atlas Trek"] },
  ];

  const summerEvents = [
    { id: 1, title: "Kruger Park", image: "https://www.andbeyond.com/wp-content/uploads/sites/5/A-tender-moment-between-Lioness-and-cub.jpg" },
    { id: 2, title: "Western Cape", image: "https://images.stockcake.com/public/1/6/4/16494687-9d5e-4040-81cb-3c2122f28f6c_large/sunset-hiking-adventure-stockcake.jpg" },
    { id: 3, title: "Addo Park", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7zNU_q9aZYBb_b3Yo-dG9LG5DYRsDNmuTiQ&shttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7zNU_q9aZYBb_b3Yo-dG9LG5DYRsDNmuTiQ&s" },
    { id: 4, title: "Masai Mara", image: "https://images.stockcake.com/public/1/6/4/16494687-9d5e-4040-81cb-3c2122f28f6c_large/sunset-hiking-adventure-stockcake.jpg" },
  ];

  const epicAdventures = [
    { id: 1, title: "Kilimanjaro Trek", image: "https://www.nationalgeographic.com/content/dam/expeditions/destinations/africa/active/Tanaznia-Climbing-Mount-Kilimanjaro/hero-tanaznia-climbing-mount-kilimanjaro.jpg", badges: ["Extreme", "Guide Required"] },
    { id: 1, title: "Hwange Park", image: "https://media.istockphoto.com/id/606666442/photo/view-from-camp-in-hwange-national-park.jpg?s=612x612&w=0&k=20&c=2QchC5yc0leaodJ0tJTOCyt7ft8IIWKcACDJ3holJII=" },
    { id: 2, title: "Botswana", image: "https://i.natgeofe.com/k/8bc484fd-74a9-466d-9416-5b85d9358c6f/botswana-gaborone-capital_4x3.jpg" },
  ];


  const SpecialEvents = [
    { id: 1, title: "Hunting", image: "https://www.muhealth.org/sites/default/files/2019-02/HuntingSafety-compressor.jpg", badges: ["Popular", "Challenging"] },
    { id: 2, title: "Training Camp", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2xUxCGlvo7fN76ONH4vbXEuoFe15GGEUTdfdvg-eGVABCSD-h6QBLNK0Ap2Mei4dUhnE&usqp=CAU", badges: ["Exotic", "Wildlife"] },

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

  const testimonials = [
    { id: 1, name: "Milton Austin", role: "Manager, ABC" },
    { id: 2, name: "Annie", role: "Head of Sales, ABC" },
    { id: 3, name: "Sandra", role: "Head of Sales, ABC" },
  ];

  // Overall rating and review for the page
  const pageRating = {
    rating: 5,
    review: "This trekking organization is excellent. Their costs are minimal due to their NGO trekking efforts. You can have an experience of a lifetime at the lowest cost with basic amenities and the best available trek leaders. The best part is the food they provide during the trek, their cooks are the best! I have experienced it for 3 years with different organizations. The food here is healthy and a lot better."
  };

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

      {/* Epic Adventure (1 column, full-width) */}
      <SectionContainer
        title="Epic Adventure"
        subtitle="Push your limits with our most thrilling outdoor challenges"
        bgColor="bg-gray-100"
        gridCols="md:grid-cols-3"
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
      {/* Special Events (2 columns) */}
      <SectionContainer
        title="Special Events"
        subtitle="Join us for unique, limited-time gatherings that celebrate remarkable occasions"
        gridCols="md:grid-cols-3"
      >
        {SpecialEvents.map(event => (
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

      {/* Why People Love Invincible (3 columns) */}
      {/* Why People Love Invincible (Two Columns: People List and Rating/Review) */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Why People 💖 Invincible</h2>
          <p className="text-gray-600 mb-8">Experience the best with us</p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column: List of People (Horizontal Scroll) */}
            <div className="md:col-span-2">
              <div className="flex flex-row overflow-x-auto space-x-4">
                {testimonials.map(testimonial => (
                  <div key={testimonial.id} className="flex-none w-80">
                    <TestimonialCard
                      name={testimonial.name}
                      role={testimonial.role}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Right Column: Page Rating and Review */}
            <div className="md:col-span-1">
              <div className="flex mb-2">
                {[...Array(pageRating.rating)].map((_, index) => (
                  <FaStar key={index} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600">{pageRating.review}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Body;