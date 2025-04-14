// pages/DetailPage.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { FaStar } from 'react-icons/fa';
import IMAGES from '../assets/images/image';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const events = [
    {
      id: 1,
      title: "Whole of South Africa",
      price: "3,360",
      description: "Explore the diverse landscapes and cultures of South Africa, from vibrant cities to stunning wildlife reserves.",
      image: "https://img.freepik.com/free-photo/beautiful-shot-three-zebras-crossing-road-safari-with-trees_181624-30309.jpg",
      rating: 4.7,
      sections: [
        {
          title: "Itinerary",
          description:
            "Day 1: Arrive in Johannesburg.\nDay 2: Explore Soweto.\nDay 3-5: Safari in Kruger National Park.\nDay 6-7: Cape Town city tour.\nDay 8: Wine tasting in Stellenbosch.\nDay 9: Table Mountain hike.\nDay 10: Depart.",
          image: "https://via.placeholder.com/600x400?text=South+Africa+Itinerary",
        },
        {
          title: "Accommodation",
          description: "Luxury lodges in Kruger and boutique hotels in Cape Town.",
          image: "https://via.placeholder.com/600x400?text=South+Africa+Accommodation",
        },
        {
          title: "Activities",
          description: "Safaris, city tours, wine tasting, and hiking.",
          image: "https://via.placeholder.com/600x400?text=South+Africa+Activities",
        },
        {
          title: "Inclusions",
          description:
            "Included: All meals, guides, park fees, and accommodations.\nNot Included: Flights, insurance, personal expenses.",
          image: "https://via.placeholder.com/600x400?text=South+Africa+Inclusions",
        },
      ],
    },
    {
      id: 2,
      title: "South Africa with Mauritius",
      price: "4,000",
      description: "Combine South Africa’s wildlife with Mauritius’ pristine beaches for an unforgettable adventure.",
      image: "https://img.freepik.com/free-photo/view-quiver-trees-forest-with-beautiful-sky-sunset-twilight-sky-scene-keetmanshoop-namibia_1150-21603.jpg",
      rating: 4.8,
      sections: [
        {
          title: "Itinerary",
          description:
            "Day 1-5: South Africa (Cape Town, Kruger).\nDay 6-13: Mauritius beach resort.\nDay 14: Depart.",
          image: "https://via.placeholder.com/600x400?text=Mauritius+Itinerary",
        },
        {
          title: "Accommodation",
          description: "5-star resorts in Mauritius and safari lodges in South Africa.",
          image: "https://via.placeholder.com/600x400?text=Mauritius+Accommodation",
        },
      ],
    },
    {
      id: 3,
      title: "Splendid South Africa",
      price: "2,560",
      description: "A compact journey through South Africa’s iconic landmarks and natural beauty.",
      image: "https://img.freepik.com/free-photo/grassy-field-with-trees-giraffes-walking-around-with-light-blue-sky-background_181624-3477.jpg",
      rating: 4.5,
      sections: [
        {
          title: "Itinerary",
          description:
            "Day 1-3: Cape Town.\nDay 4-6: Garden Route.\nDay 7-8: Safari.\nDay 9-10: Depart.",
          image: "https://via.placeholder.com/600x400?text=Splendid+Itinerary",
        },
        {
          title: "Accommodation",
          description: "Comfortable hotels and lodges.",
          image: "https://via.placeholder.com/600x400?text=Splendid+Accommodation",
        },
      ],
    },
    {
      id: 4,
      title: "African Jambo",
      price: "3,360",
      description: "Experience the vibrant wildlife and cultures of Kenya and Tanzania.",
      image: "https://img.freepik.com/free-photo/savannah-landscape-national-park-kenya-africa_167946-107.jpg",
      rating: 4.6,
      sections: [
        {
          title: "Itinerary",
          description:
            "Day 1-3: Nairobi.\nDay 4-6: Masai Mara.\nDay 7-9: Serengeti.\nDay 10: Depart.",
          image: "https://via.placeholder.com/600x400?text=Jambo+Itinerary",
        },
        {
          title: "Accommodation",
          description: "Tented camps and lodges.",
          image: "https://via.placeholder.com/600x400?text=Jambo+Accommodation",
        },
      ],
    },
    {
      id: 5,
      title: "Glimpse of South Africa with Kruger - Private Tour",
      price: "4,050",
      description: "A private safari experience with luxury accommodations.",
      image: IMAGES.WesternCape || "https://via.placeholder.com/300x200?text=Kruger+Tour",
      rating: 4.9,
      sections: [
        {
          title: "Itinerary",
          description:
            "Day 1-4: Cape Town.\nDay 5-10: Kruger private safari.\nDay 11-13: Stellenbosch.\nDay 14: Depart.",
          image: "https://via.placeholder.com/600x400?text=Kruger+Itinerary",
        },
        {
          title: "Accommodation",
          description: "Private lodges and 5-star hotels.",
          image: "https://via.placeholder.com/600x400?text=Kruger+Accommodation",
        },
      ],
    },
    {
      id: 6,
      title: "Splendid South Africa",
      price: "2,560",
      description: "Another splendid journey through South Africa’s highlights.",
      image: IMAGES.MasaiMara || "https://via.placeholder.com/300x200?text=Splendid+South+Africa+2",
      rating: 4.5,
      sections: [
        {
          title: "Itinerary",
          description:
            "Day 1-3: Cape Town.\nDay 4-6: Garden Route.\nDay 7-8: Safari.\nDay 9-10: Depart.",
          image: "https://via.placeholder.com/600x400?text=Splendid+2+Itinerary",
        },
        {
          title: "Accommodation",
          description: "Comfortable hotels and lodges.",
          image: "https://via.placeholder.com/600x400?text=Splendid+2+Accommodation",
        },
      ],
    },
  ];

  const event = events.find((e) => e.id === parseInt(id));

  if (!event) {
    return <div className="text-center p-10">Event not found</div>;
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
                <div className={clsx("md:w-1/2")}>
                  <img
                    src={section.image}
                    alt={section.title}
                    className={clsx("w-full h-64 object-cover rounded-md")}
                  />
                </div>
                <div className={clsx("md:w-1/2")}>
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
                <div className={clsx("md:w-1/2")}>
                  <img
                    src={section.image}
                    alt={section.title}
                    className={clsx("w-full h-64 object-cover rounded-md")}
                  />
                </div>
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default DetailPage;