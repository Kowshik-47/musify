import React from 'react';
import { useSelector } from 'react-redux';

const formatTime = (time) => {
  if (isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const ProgressBar = ({ onSeek }) => {
  const { currentTime, duration } = useSelector((state) => state.player);

  const handleClick = (e) => {
    const bar = e.currentTarget;
    const clickPosition = (e.pageX - bar.offsetLeft) / bar.offsetWidth;
    const time = clickPosition * duration;
    onSeek(time);
  };

  const progress = (currentTime / duration) * 100 || 0;

  return (
    <div className="flex items-center space-x-2 w-full">
      <span className="text-xs text-gray-400 w-10 text-right">
        {formatTime(currentTime)}
      </span>
      <div
        className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer group"
        onClick={handleClick}
      >
        <div
          className="h-full bg-white rounded-full relative group-hover:bg-spotify-green transition"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition"></div>
        </div>
      </div>
      <span className="text-xs text-gray-400 w-10">
        {formatTime(duration)}
      </span>
    </div>
  );
};

export default ProgressBar;