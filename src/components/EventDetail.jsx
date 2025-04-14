// pages/EventDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import IMAGES from '../assets/images/image';

const EventDetail = () => {
  const { id } = useParams();
  console.log('EventDetail - URL ID:', id); // Log the ID from the URL

  const events = [
    { id: "he1", title: "Kilimanjaro", image: IMAGES.Kilimanjaro, description: "Climb the highest peak in Africa." },
    { id: "he2", title: "Madagascar", image: IMAGES.Madagascar, description: "Explore unique wildlife and landscapes." },
    { id: "he3", title: "Cape Town", image: IMAGES.CapeTown, description: "Discover the beauty of South Africa." },
    { id: "se1", title: "Kruger Park", image: IMAGES.KrugerPark, description: "Safari in Kruger National Park." },
    { id: "se2", title: "Western Cape", image: IMAGES.WesternCape, description: "Wine and scenery in the Western Cape." },
    { id: "se3", title: "Addo Park", image: IMAGES.AddoPark, description: "Elephant spotting in Addo." },
    { id: "se4", title: "Masai Mara", image: IMAGES.MasaiMara, description: "Witness the Great Migration." },
    { id: "ea1", title: "Kilimanjaro Trek", image: IMAGES.KilimanjaroTrek, badges: ["Extreme", "Guide Required"], description: "An epic adventure up Kilimanjaro." },
    { id: "ea2", title: "Hwange Park", image: IMAGES.HwangePark, description: "Wildlife in Hwange National Park." },
    { id: "ea3", title: "Botswana", image: IMAGES.Botswana, description: "Explore Botswana's wilderness." },
    { id: "sp1", title: "Hunting", image: IMAGES.Hunting, badges: ["Popular", "Challenging"], description: "A thrilling hunting experience." },
    { id: "sp2", title: "Training Camp", image: IMAGES.TrainingCamp, badges: ["Exotic", "Wildlife"], description: "Prepare for your next adventure." },
  ];

  const event = events.find(e => e.id === id);
  console.log('EventDetail - Found Event:', event); // Log the found event

  if (!event) {
    return <div className="text-center p-10">Event not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-center">{event.title}</h2>
      <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-lg mb-6" />
      <p className="text-gray-700 text-lg mb-4">{event.description}</p>
      {event.badges && (
        <div className="flex space-x-2">
          {event.badges.map((badge, index) => (
            <span key={index} className="text-xs bg-gray-600 text-white px-2 py-1 rounded">
              {badge}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventDetail;