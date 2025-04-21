import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { fetchContact } from '../services/api';

const ContactPage = () => {
  const [offices, setOffices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffices = async () => {
      setIsLoading(true);
      setError(null);

      const { data, error } = await fetchContact();

      if (error) {
        setError(error);
        setOffices([]);
      } else if (data && Array.isArray(data)) {
        setOffices(data);
      } else {
        setError('Invalid data format received from API');
        setOffices([]);
      }

      setIsLoading(false);
    };

    fetchOffices();
  }, []);

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

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-600">
          <p>{error}</p>
        </div>
      ) : (
        // Offices Grid
        <section className={clsx("flex-grow py-10 bg-white")}>
          <div className={clsx("max-w-6xl mx-auto px-4")}>
            {offices.length > 0 ? (
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
                      {office.phoneNumbers && Array.isArray(office.phoneNumbers) ? (
                        office.phoneNumbers.map((phone, idx) => (
                          <p key={idx}>
                            <span className={clsx("font-semibold")}>Phone:</span>{" "}
                            <a href={`tel:${phone}`} className={clsx("text-gray-600 hover:underline")}>
                              {phone}
                            </a>
                          </p>
                        ))
                      ) : (
                        <p>No phone numbers available</p>
                      )}
                    </div>
                    <a
                      href={office.mapLink || "#"}
                      className={clsx("text-orange-500 hover:underline")}
                    >
                      View on Map →
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-600">
                <p>No office locations available at the moment.</p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default ContactPage;