import React, { useState, useEffect, useContext } from 'react';
import '../App.css';
import { navIcons } from './shared/constants.jsx';
import  Counter  from '../components/Counter';
import { AuthContext } from '../components/AuthContext';

const HeroSection = ({ title, subtitle, backgroundImage }) => {
  const { Participants, Volunteers, Events, Years } = navIcons;
  const { user } = useContext(AuthContext); // Access user from AuthContext

  // State to trigger animation
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  // Trigger animation on user state change or initial load
  useEffect(() => {
    setTriggerAnimation(true);
  }, [user]);

  return (
    <section
      className="h-screen items-center text-white flex flex-col relative w-full"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-opacity-40"></div>

      {/* Hero content */}
      <div className="container mx-auto px-4 relative z-10 flex-1 flex items-center">
        <div>
          <h1 className="text-5xl font-bold text-white">{title || "Experience Nature"}</h1>
          <p className="text-white text-xl mt-4">{subtitle || "India's Largest Trekking Organization"}</p>
        </div>
      </div>

      {/* Stats section */}
      <div className="absolute bottom-10 left-0 right-0 z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 px-4">
        <div className="text-center text-white min-w-[80px] sm:min-w-[100px]">
          <Participants className="text-2xl sm:text-3xl mb-2 mx-auto" />
          <div className="text-lg sm:text-2xl font-bold">
            <Counter key={triggerAnimation ? 'participants' : ''} endValue={211500} duration={2000} />
          </div>
          <div className="text-xs sm:text-sm">Participants</div>
        </div>
        <div className="text-center text-white min-w-[80px] sm:min-w-[100px]">
          <Volunteers className="text-2xl sm:text-3xl mb-2 mx-auto" />
          <div className="text-lg sm:text-2xl font-bold">
            <Counter key={triggerAnimation ? 'volunteers' : ''} endValue={2750} duration={2000} />
          </div>
          <div className="text-xs sm:text-sm">Volunteers</div>
        </div>
        <div className="text-center text-white min-w-[80px] sm:min-w-[100px]">
          <Events className="text-2xl sm:text-3xl mb-2 mx-auto" />
          <div className="text-lg sm:text-2xl font-bold">
            <Counter key={triggerAnimation ? 'events' : ''} endValue={68} duration={2000} />
          </div>
          <div className="text-xs sm:text-sm">Events</div>
        </div>
        <div className="text-center text-white min-w-[80px] sm:min-w-[100px]">
          <Years className="text-2xl sm:text-3xl mb-2 mx-auto" />
          <div className="text-lg sm:text-2xl font-bold">
            <Counter key={triggerAnimation ? 'years' : ''} endValue={11} duration={2000} />
          </div>
          <div className="text-xs sm:text-sm">Years</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;