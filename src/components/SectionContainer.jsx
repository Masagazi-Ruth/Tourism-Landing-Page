import React from 'react';

function SectionContainer({ title, subtitle, children, bgColor = "white", backgroundImage }) {
  return (
    <section 
      className={`py-8 px-4  gap-1 ${bgColor} relative`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      <div className="absolute inset-0  bg-white bg-opacity-40"></div> {/* Overlay */}
      <div className="relative z-10">
        {title && <h2 className="text-2xl text-left font-bold mb-2 text-amber-700">{title}</h2>}
        {subtitle && <p className="text-amber-950 text-left mb-6">{subtitle}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {children}
        </div>
      </div>
    </section>
  );
}

export default SectionContainer;
