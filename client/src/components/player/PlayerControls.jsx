import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  togglePlayPause,
  nextSong,
  previousSong,
  toggleShuffle,
  toggleRepeat,
} from '../../redux/slices/playerSlice';
import {
  BsShuffle,
  BsSkipStart,
  BsPlayCircle,
  BsPauseCircle,
  BsSkipEnd,
  BsRepeat,
  BsRepeat1,
} from 'react-icons/bs';

const PlayerControls = () => {
  const dispatch = useDispatch();
  const { isPlaying, shuffle, repeat } = useSelector((state) => state.player);

  return (
    <div className="flex items-center space-x-6 mb-2">
      <button
        onClick={() => dispatch(toggleShuffle())}
        className={`${
          shuffle ? 'text-spotify-green' : 'text-gray-400'
        } hover:text-white transition`}
      >
        <BsShuffle size={16} />
      </button>

      <button
        onClick={() => dispatch(previousSong())}
        className="text-gray-400 hover:text-white transition"
      >
        <BsSkipStart size={20} />
      </button>

      <button
        onClick={() => dispatch(togglePlayPause())}
        className="text-white hover:scale-110 transition"
      >
        {isPlaying ? (
          <BsPauseCircle size={40} />
        ) : (
          <BsPlayCircle size={40} />
        )}
      </button>

      <button
        onClick={() => dispatch(nextSong())}
        className="text-gray-400 hover:text-white transition"
      >
        <BsSkipEnd size={20} />
      </button>

      <button
        onClick={() => dispatch(toggleRepeat())}
        className={`${
          repeat !== 'off' ? 'text-spotify-green' : 'text-gray-400'
        } hover:text-white transition`}
      >
        {repeat === 'one' ? <BsRepeat1 size={16} /> : <BsRepeat size={16} />}
      </button>
    </div>
  );
};

export default PlayerControls;