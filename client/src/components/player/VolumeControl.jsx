import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVolume } from '../../redux/slices/playerSlice';
import {
  BsVolumeUp,
  BsVolumeMute,
  BsVolumeDown,
} from 'react-icons/bs';

const VolumeControl = () => {
  const dispatch = useDispatch();
  const volume = useSelector((state) => state.player.volume);
  const [prevVolume, setPrevVolume] = useState(volume);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    dispatch(setVolume(newVolume));
  };

  const toggleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      dispatch(setVolume(0));
    } else {
      dispatch(setVolume(prevVolume));
    }
  };

  const VolumeIcon = () => {
    if (volume === 0) return <BsVolumeMute size={20} />;
    if (volume < 0.5) return <BsVolumeDown size={20} />;
    return <BsVolumeUp size={20} />;
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={toggleMute}
        className="text-gray-400 hover:text-white transition"
      >
        <VolumeIcon />
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
        style={{
          background: `linear-gradient(to right, white 0%, white ${
            volume * 100
          }%, rgb(75, 85, 99) ${volume * 100}%, rgb(75, 85, 99) 100%)`,
        }}
      />
    </div>
  );
};

export default VolumeControl;