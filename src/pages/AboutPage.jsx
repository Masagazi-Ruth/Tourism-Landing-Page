import React from 'react';
import clsx from 'clsx';

const About = () => {
  return (
    <div className={clsx("min-h-screen flex flex-col")}>
      {/* Hero Section */}
      <section className={clsx("bg-orange-500 py-16 text-white")}>
        <div className={clsx("max-w-6xl mx-auto px-4")}>
          <h1 className={clsx("text-4xl font-bold mb-2")}>About Us</h1>
          <p className={clsx("text-xl mb-8")}>
            Who we are & where do we stand
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className={clsx("flex-grow py-10 bg-white")}>
        <div className={clsx("max-w-6xl mx-auto px-4")}>
          <div className={clsx("space-y-8")}>
            {/* Vision */}
            <div>
              <h2 className={clsx("text-2xl font-bold text-gray-800 mb-4")}>Vision</h2>
              <p className={clsx("text-gray-600")}>
                Keeping the core values and the ethics in center HiddenSafari – the NGO will be a benchmark in training the youth for a better situation. The NGO will work for enhancement of all good qualities in the modern youth with a brighter wak for mission.
              </p>
            </div>

            {/* Mission */}
            <div>
              <h2 className={clsx("text-2xl font-bold text-gray-800 mb-4")}>Mission</h2>
              <p className={clsx("text-gray-600")}>
                The motive of the NGO is to moderate the young thinking for a happy and developed world. The youth become responsible and understand their own need for the society and country is the heart value of the mission...
              </p>
            </div>

            {/* Objectives */}
            <div>
              <h2 className={clsx("text-2xl font-bold text-gray-800 mb-4")}>Objectives</h2>
              <p className={clsx("text-gray-600")}>
                The idea of establishing NGO came up during the various activities with other NGOs as a part of collaboration with NSS/NCC in college activities. It was a very clear view behind the organization that it will for young people and specially students development activities will be given priority. Keeping the ethics and value system in center, the NGO has thought for such activities, which will fill valuable qualities in the youth. NGO is thankful to all the young students of various colleges who are voluntarily giving a boost to the activities. For spreading awareness in the field of adventure, NGO has planned some very charming events as per regular basis.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;