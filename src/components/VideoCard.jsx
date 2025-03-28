// File: src/components/VideoCard.jsx
import React from 'react';
import { FaDownload, FaShareAlt } from 'react-icons/fa';

const VideoCard = ({ videoId, title, downloadUrl, shareUrl }) => {
  // Function to handle sharing (copies the share URL to clipboard)
  const handleShare = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => alert('Share link copied to clipboard!'))
      .catch((err) => console.error('Failed to copy share link:', err));
  };

  return (
    <div className="rounded-lg overflow-hidden  p-2 w-75 shadow-md bg-white">
      {/* YouTube Video Player */}
      <div className="relative" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?rel=0`} // rel=0 removes related videos at the end
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      {/* Video Title, Note, and Buttons */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <div className="flex space-x-3">
          {/* Download Button (Conditionally Rendered) */}
          {downloadUrl && downloadUrl !== '#' ? (
            <a
              href={downloadUrl}
              download
              className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FaDownload className="mr-2" />
              Download
            </a>
          ) : (
            <button
              disabled
              className="flex items-center px-3 py-2 bg-white text-black rounded-lg cursor-not-allowed"
            >
              <FaDownload className="mr-2" />
              Download
            </button>
          )}
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center px-3 py-2 bg-white text-black rounded-lg hover:bg-amber-100 transition-colors"
          >
            <FaShareAlt className="mr-2" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;