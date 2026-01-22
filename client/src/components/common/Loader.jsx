import React from 'react';

const Loader = ({ size = 'medium', fullScreen = false }) => {
  const sizeClasses = {
    small: 'w-6 h-6 border-2',
    medium: 'w-12 h-12 border-4',
    large: 'w-16 h-16 border-4',
  };

  const loader = (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} border-spotify-green border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-spotify-black bg-opacity-80 flex items-center justify-center z-50">
        <div className="text-center">
          <div className={`${sizeClasses.large} border-spotify-green border-t-transparent rounded-full animate-spin mx-auto mb-4`}></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return loader;
};

export default Loader;