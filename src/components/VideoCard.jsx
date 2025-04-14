// src/components/VideoCard.js
import React from 'react';
import clsx from 'clsx';

const VideoCard = ({ videoId, title, downloadUrl, shareUrl }) => {
  return (
    <div className={clsx("bg-white rounded-lg shadow-md overflow-hidden")}>
      <div className={clsx("relative")}>
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
          className={clsx("w-full h-48 object-cover")}
        />
        <div className={clsx("absolute inset-0 flex items-center justify-center")}>
          <svg
            className={clsx("w-12 h-12 text-white opacity-80")}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <div className={clsx("p-4")}>
        <h3 className={clsx("text-lg font-bold text-gray-800 mb-2")}>{title}</h3>
        <div className={clsx("flex gap-4")}>
          <a href={downloadUrl} className={clsx("text-blue-500 hover:underline")}>
            Download
          </a>
          <a href={shareUrl} className={clsx("text-blue-500 hover:underline")}>
            Share
          </a>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;