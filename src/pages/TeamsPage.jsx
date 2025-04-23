import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { fetchTeam } from '../services/api';

const Teams = () => {
  // State for team members and loading/error states
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch team data using api.js
  useEffect(() => {
    const fetchTeamData = async () => {
      setIsLoading(true);
      setError(null);

      const { data, error } = await fetchTeam();

      if (error) {
        console.error("Error fetching team data:", error);
        setError("Failed to load team data. Please try again later.");
        // Fallback to placeholder data if API fails
        setTeamMembers([
          { name: "Emmy Rosum", designation: "Founder", profileImage: "https://source.unsplash.com/200x200/?business,leader" },
          { name: "Nandan Manek", designation: "Project Director", profileImage: "https://source.unsplash.com/200x200/?manager" },
          { name: "Hana Mira", designation: "Project Advisor", profileImage: "https://source.unsplash.com/200x200/?consultant" },
          { name: "Jitendra", designation: "Project Leader", profileImage: "https://source.unsplash.com/200x200/?developer" },
        ]);
      } else {
        // Check if data has the expected structure
        if (Array.isArray(data?.data)) {
          setTeamMembers(data.data);
        } else if (Array.isArray(data)) {
          setTeamMembers(data);
        } else {
          console.warn("API response format unexpected, using default structure");
          setTeamMembers([]);
        }
      }
      setIsLoading(false);
    };

    fetchTeamData();
  }, []);

  return (
    <div className={clsx("min-h-screen flex flex-col")}>
      {/* Hero Section */}
      <section className={clsx("bg-orange-500 py-16 text-white")}>
        <div className={clsx("max-w-6xl mx-auto px-4")}>
          <h1 className={clsx("text-4xl font-bold mb-2")}>Our Team</h1>
          <p className={clsx("text-xl mb-8")}>Meet the heroes behind our Success</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        {error && (
          <div className="text-red-500 text-center mb-6 p-4 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {isLoading ? (
          // Loading state
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DD501DE8]"></div>
          </div>
        ) : (
          // Team members grid
          <section className={clsx("flex-grow py-10 bg-white")}>
            <div className={clsx("max-w-6xl mx-auto px-4")}>
              {teamMembers.length === 0 ? (
                <p className="text-center text-gray-600">No team members available.</p>
              ) : (
                <div className={clsx("grid grid-cols-1 md:grid-cols-4 gap-6")}>
                  {teamMembers.map((member, index) => (
                    <div
                      key={member.id || index}
                      className="bg-white rounded-lg shadow-md text-center hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out overflow-hidden"
                    >
                      <div className="overflow-hidden">
                        <img
                          src={member.profileImage || `https://source.unsplash.com/200x300/?person,${index}`}
                          alt={member.name}
                          className="w-full h-64 object-cover hover:brightness-110 transition-all duration-300"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`;
                          }}
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                        <p className="text-gray-600 mt-1">{member.designation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </section>
    </div>
  );
};

export default Teams;