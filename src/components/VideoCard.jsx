import React from 'react';
import clsx from 'clsx';

const VideoCard = ({ videoId, title, downloadUrl, shareUrl, className }) => {
  return (
    <div
      className={clsx(
        'relative group rounded-lg shadow-lg overflow-hidden bg-white',
        'h-80', // Fixed height to match SpecialEventCard
        className
      )}
    >
      <div className="relative h-3/5"> {/* ~192px for 16:9 iframe */}
        <div
          className={clsx(
            "absolute top-0 left-0 w-full h-full transition-transform duration-500",
            "group-hover:scale-105" // Subtle zoom effect
          )}
        >
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <div className="flex space-x-4 mb-2">
          <a
            href={downloadUrl}
            className="text-blue-500 hover:underline text-sm"
            onClick={(e) => downloadUrl === '#' && e.preventDefault()}
          >
            Download
          </a>
          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-sm"
          >
            Share
          </a>
        </div>
        
      </div>
    </div>
  );
};

export default VideoCard;