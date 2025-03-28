import React from 'react';
import clsx from 'clsx';
import IMAGES from '../assets/images/image'; // Adjust path if needed
import { FaStar } from 'react-icons/fa';


const DetailPage = () => {
  // Static event data (replace with dynamic data fetching later)
  const event = {
    id: 1,
    title: "Kilimanjaro Trek",
    price: "301",
    description:
      "Mount Kilimanjaro is a dormant volcano in Tanzania. It is the highest mountain in Africa, about 4,900 meters (16,100 ft) from its base, and 5,895 meters (19,341 ft) above sea level. The first persons known to have reached the summit of the mountain were Hans Meyer and Ludwig Purtscheller in 1889.",
    image: IMAGES.Kilimanjaro || "https://s3-alpha-sig.figma.com/img/ff39/55a2/66338b6b168281c30bf2833f211d634d?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=mq6oihcpcS-pATnhAha8GnqK4FdBZzQbPo0oJRt7kgIeDoXJq5WTYiSTucTAaTi1w12O8ZqR1RcM6pTeYJb82Z9jNjspwvR3a4ZxArtt9~PfGFs9GR4sPvlu63WUDdN5fmrunp8356ma773GK-9SmUGZ-jwOVXqooB~1b~~-H4uqNuqf-0N~z-Y1i~ODXeXjywvWdrac7HJ4aegODehqLTo~XLNeIP7GIr1qzMVPchZmuXyDzZyUo1fO~YI7en64NlP9gfZib5kqZIRCCKaDJ868cEs05LXleKGnuFkBk5HoXE3IYhJZEJvxFb0mW9kKvL5PjncaO0qE1lZ8fgpp9g__",
    rating: 4.5,
    sections: [
      {
        title: "Itinerary",
        description:
          "Day 1: Arrival in Tanzania, transfer to hotel.\nDay 2: Trek to Machame Camp (3,000m).\nDay 3: Trek to Shira Camp (3,840m).\nDay 4: Trek to Barranco Camp (3,950m).\nDay 5: Trek to Karanga Camp (4,000m).\nDay 6: Trek to Barafu Camp (4,600m).\nDay 7: Summit attempt (5,895m) and descent to Mweka Camp.\nDay 8: Descent to Mweka Gate and transfer to hotel.\nDay 9: Departure.",
        image: "https://via.placeholder.com/600x400?text=Itinerary",
      },
      {
        title: "Accommodation",
        description:
          "During the trek, you will stay in high-quality tents at designated campsites. Each campsite offers stunning views and basic amenities. Before and after the trek, you will stay in a comfortable hotel in Moshi or Arusha.",
        image: IMAGES.TrainingCamp || "https://via.placeholder.com/600x400?text=Accommodation",
      },
      {
        title: "Activities",
        description:
          "The Kilimanjaro Trek includes daily hiking through diverse landscapes, from rainforests to alpine deserts. You’ll also have opportunities for photography, wildlife spotting, and cultural interactions with local communities.",
        image: "https://via.placeholder.com/600x400?text=Activities",
      },
      {
        title: "Inclusions",
        description:
          "Included: All meals during the trek, professional guides, porters, park fees, camping equipment, and hotel stays before and after the trek.\nNot Included: International flights, travel insurance, personal gear, and tips for guides and porters.",
        image: "https://via.placeholder.com/600x400?text=Inclusions",
      },
    ],
  };

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
          {/* Left Column: Description */}
          <div className={clsx("md:w-2/3")}>
            <h2 className={clsx("text-3xl font-bold text-gray-800 mb-4")}>About</h2>
            <p className={clsx("text-gray-600 mb-6")}>{event.description}</p>
          </div>
          {/* Right Column: Price and Booking */}
          <div className={clsx("md:w-1/3 bg-white p-6 rounded-lg shadow-md")}>
            <h3 className={clsx("text-2xl font-bold text-gray-800 mb-2")}>
              $ {event.price} / person
            </h3>
            <button
              className={clsx(
                "w-full px-4 py-2 bg-orange-500 text-white rounded-md",
                "hover:bg-orange-600 transition"
              )}
            >
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Additional Sections (Itinerary, Accommodation, etc.) */}
      {event.sections.map((section, index) => (
        <section key={index} className={clsx("py-10", index % 2 === 0 ? "bg-white" : "bg-gray-50")}>
          <div className={clsx("max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8")}>
            {/* Alternate image and text based on index */}
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