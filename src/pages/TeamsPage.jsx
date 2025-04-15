import React from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Teams = () => {
  // State for team members and loading/error states
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch team data from the API using axios
  useEffect(() => {
    const fetchTeamData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://54.210.95.246:3005/api/v1/team');

        // Check if data has the expected structure
        if (response.data && Array.isArray(response.data.data)) {
          setTeamMembers(response.data.data);
        } else if (response.data && Array.isArray(response.data)) {
          // If the data is directly an array
          setTeamMembers(response.data);
        } else {
          // Fallback to a default structure if API response is unexpected
          console.warn("API response format unexpected, using default structure");
          setTeamMembers([]);
        }
      } catch (err) {
        console.error("Error fetching team data:", err);
        setError("Failed to load team data. Please try again later.");

        // Fallback to placeholder data if API fails
        setTeamMembers([
          { name: "Emmy Rosum", designation: "Founder", profileImage: "https://source.unsplash.com/200x200/?business,leader" },
          { name: "Nandan Manek", designation: "Project Director", profileImage: "https://source.unsplash.com/200x200/?manager" },
          { name: "Hana Mira", designation: "Project Advisor", profileImage: "https://source.unsplash.com/200x200/?consultant" },
          { name: "Jitendra", designation: "Project Leader", profileImage: "https://source.unsplash.com/200x200/?developer" }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  return (
    <div className={clsx("min-h-screen flex flex-col")}>
      {/* Hero Section */}
      <section className={clsx("bg-orange-500 py-16 text-white")}>
        <div className={clsx("max-w-6xl mx-auto px-4")}>
          <h1 className={clsx("text-4xl font-bold mb-2")}>Our Team</h1>
          <p className={clsx("text-xl mb-8")}>
            Meet the heroes behind our Success
          </p>
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
              <div className={clsx("grid grid-cols-1 md:grid-cols-4 gap-6")}>
                {teamMembers.map((member, index) => (
                  <div
                    key={member.id || index}
                    className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      src={member.profileImage || `https://source.unsplash.com/200x200/?person,${index}`}
                      alt={member.name}
                      className="w-32 h-32 mx-auto object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`;
                      }}
                    />
                    <h3 className="text-xl font-semibold mt-4">{member.name}</h3>
                    <p className="text-gray-600">{member.designation}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </section>
    </div>
  );
};

export default Teams;