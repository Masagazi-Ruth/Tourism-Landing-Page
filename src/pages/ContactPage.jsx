import React from 'react';
import clsx from 'clsx';

const ContactPage = () => {
  const offices = [
    {
      name: "Office 1 (Head Office)",
      address: "308, University, Above Chocolate Room, ABC Cross Roads, XYZ",
      timings: "10 AM to 8 PM",
      phoneNumbers: ["+91-0000004700", "+91-0000004700"],
      mapLink: "#", // Replace with actual map link
    },
    {
      name: "Office 2",
      address: "308, University, Above Chocolate Room, ABC Cross Roads, XYZ",
      timings: "10 AM to 8 PM",
      phoneNumbers: ["+91-0000004700", "+91-0000004700"],
      mapLink: "#",
    },
    {
      name: "Office 3",
      address: "308, University, Above Chocolate Room, ABC Cross Roads, XYZ",
      timings: "11 AM to 8 PM",
      phoneNumbers: ["+91-0000004700", "+91-0000004700"],
      mapLink: "#",
    },
    {
      name: "Office 4",
      address: "308, University, Above Chocolate Room, ABC Cross Roads, XYZ",
      timings: "11 AM to 8 PM",
      phoneNumbers: ["+91-0000004700", "+91-0000004700"],
      mapLink: "#",
    },
  ];

  return (
    <div className={clsx("min-h-screen flex flex-col")}>
      {/* Hero Section */}
      <section className={clsx("bg-orange-500 py-16 text-white")}>
        <div className={clsx("max-w-6xl mx-auto px-4")}>
          <h1 className={clsx("text-4xl font-bold mb-2")}>Contact</h1>
          <p className={clsx("text-xl mb-8")}>
            Life is either a daring adventure or nothing.
          </p>
        </div>
      </section>

      {/* Offices Grid */}
      <section className={clsx("flex-grow py-10 bg-white")}>
        <div className={clsx("max-w-6xl mx-auto px-4")}>
          <div className={clsx("grid grid-cols-1 md:grid-cols-2 gap-6")}>
            {offices.map((office, index) => (
              <div
                key={index}
                className={clsx("bg-pink-50 p-6 rounded-lg shadow-md")}
              >
                <h3 className={clsx("text-xl font-bold text-gray-800 mb-2")}>
                  {office.name}
                </h3>
                <p className={clsx("text-gray-600 mb-2")}>{office.address}</p>
                <p className={clsx("text-gray-600 mb-2")}>
                  <span className={clsx("font-semibold")}>Office Timings:</span> {office.timings}
                </p>
                <div className={clsx("text-gray-600 mb-4")}>
                  {office.phoneNumbers.map((phone, idx) => (
                    <p key={idx}>
                      <span className={clsx("font-semibold")}>Phone:</span>{" "}
                      <a href={`tel:${phone}`} className={clsx("text-gray-600 hover:underline")}>
                        {phone}
                      </a>
                    </p>
                  ))}
                </div>
                <a
                  href={office.mapLink}
                  className={clsx("text-orange-500 hover:underline")}
                >
                  View on Map →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;