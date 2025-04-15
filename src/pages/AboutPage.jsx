import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";


const About = () => {
  // State for tracking if sections are visible
  const [visibleSections, setVisibleSections] = useState({
    vision: false,
    mission: false,
    objectives: false
  });

  // State for about us content
  const [aboutData, setAboutData] = useState({
    title: "About Us",
    vision: "",
    mission: "",
    objectives: ""
  });

  // State for loading and error handling
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch about us data
  useEffect(() => {
    const fetchAboutData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://54.210.95.246:3005/api/v1/info/about-us');
        
        if (response.data && response.data.content) {
          // Parse the content to extract vision, mission, and objectives
          const content = response.data.content;
          
          // Extract sections using regex
          const visionMatch = content.match(/Vision\s*\n\s*([\s\S]*?)(?=\n\s*Mission|\n\s*Objectives|$)/i);
          const missionMatch = content.match(/Mission\s*\n\s*([\s\S]*?)(?=\n\s*Vision|\n\s*Objectives|$)/i);
          const objectivesMatch = content.match(/Objectives\s*\n\s*([\s\S]*?)(?=\n\s*Vision|\n\s*Mission|$)/i);
          
          setAboutData({
            title: response.data.title || "About Us",
            vision: visionMatch ? visionMatch[1].trim() : "",
            mission: missionMatch ? missionMatch[1].trim() : "",
            objectives: objectivesMatch ? objectivesMatch[1].trim() : ""
          });
        } else {
          throw new Error('Invalid data format received from API');
        }
      } catch (err) {
        console.error("Error fetching about us data:", err);
        setError("Failed to load about us information. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAboutData();
  }, []);

  // Effect for checking if sections are in viewport
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['vision', 'mission', 'objectives'];
      
      sections.forEach(section => {
        const element = document.getElementById(`${section}-section`);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight - 100;
          
          if (isVisible && !visibleSections[section]) {
            setVisibleSections(prev => ({
              ...prev,
              [section]: true
            }));
          }
        }
      });
    };
    
    // Initial check
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleSections]);

  return (
    <>
    
      <div className="min-h-screen bg-gray-100">
        {/* Hero Section - Updated color to match other pages */}
        <section className="bg-orange-500 py-16 text-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold">{aboutData.title}</h2>
            <p className="mt-2">Who we are & where we stand.</p>
          </div>
        </section>
        
        {isLoading ? (
          // Loading state
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DD501DE8]"></div>
          </div>
        ) : error ? (
          // Error state
          <div className="container mx-auto px-4 py-8">
            <div className="bg-red-100 text-red-500 p-4 rounded-lg text-center">
              {error}
            </div>
          </div>
        ) : (
          <>
          <section className="container mx-auto px-4 py-8">
              <div className={`bg-white shadow-md rounded-lg p-6 transition-opacity duration-1000 ${
                visibleSections.vision ? 'opacity-100' : 'opacity-0'
              }`}>
                <h3 className="text-2xl font-bold mb-4">Vision</h3>
                <p className="text-gray-600">{aboutData.vision}</p>
              </div>
            
              <div className={`bg-white shadow-md rounded-lg p-6 transition-opacity duration-1000 ${
                visibleSections.mission ? 'opacity-100' : 'opacity-0'
              }`}>
                <h3 className="text-2xl font-bold mb-4">Mission</h3>
                <p className="text-gray-600">{aboutData.mission}</p>
              </div>
            
              <div className={`bg-white shadow-md rounded-lg p-6 transition-opacity duration-1000 ${
                visibleSections.objectives ? 'opacity-100' : 'opacity-0'
              }`}>
                <h3 className="text-2xl font-bold mb-4">Objectives</h3>
                <p className="text-gray-600">{aboutData.objectives}</p>
              </div>
            
            </section>
          </>
        )}
      </div>
  
    </>
  );
}



export default About;