// pages/TrekDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import IMAGES from '../assets/images/image';

const TrekDetail = () => {
  const { id } = useParams();
  console.log('TrekDetail - URL ID:', id); // Log the ID from the URL

  const treks = [
    { id: "st1", title: "Kilimanjaro Trek", image: IMAGES.KilimanjaroTrek, description: "A challenging trek up Kilimanjaro." },
    { id: "st2", title: "Mount Kenya Trek", image: IMAGES.MountKenyaTrek, badges: ["Mount Kenya Trek"], description: "Trek through Kenya's stunning mountains." },
    { id: "st3", title: "Rwenzori Trek", image: IMAGES.RwenzoriTrek, badges: ["Rwenzori Trek"], description: "Adventure in the Rwenzori Mountains." },
    { id: "st4", title: "Atlas Trek", image: IMAGES.AtlasTrek, badges: ["Atlas Trek"], description: "Explore the Atlas Mountains." },
  ];

  const trek = treks.find(t => t.id === id);
  console.log('TrekDetail - Found Trek:', trek); // Log the found trek

  if (!trek) {
    return <div className="text-center p-10">Trek not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-center">{trek.title}</h2>
      <img src={trek.image} alt={trek.title} className="w-full h-64 object-cover rounded-lg mb-6" />
      <p className="text-gray-700 text-lg mb-4">{trek.description}</p>
      {trek.badges && (
        <div className="flex space-x-2">
          {trek.badges.map((badge, index) => (
            <span key={index} className="text-xs bg-gray-600 text-white px-2 py-1 rounded">
              {badge}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrekDetail;