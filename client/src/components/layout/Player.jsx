import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setIsPlaying,
  setCurrentTime,
  setDuration,
  nextSong,
  previousSong,
} from '../../redux/slices/playerSlice';
import PlayerControls from '../player/PlayerControls';
import VolumeControl from '../player/VolumeControl';
import ProgressBar from '../player/ProgressBar';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const Player = () => {
  const dispatch = useDispatch();
  const { currentSong, isPlaying, volume, currentTime } = useSelector(
    (state) => state.player
  );
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      dispatch(setCurrentTime(audioRef.current.currentTime));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      dispatch(setDuration(audioRef.current.duration));
    }
  };

  const handleEnded = () => {
    dispatch(nextSong());
  };

  const handleSeek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      dispatch(setCurrentTime(time));
    }
  };

  if (!currentSong) {
    return null;
  }

  return (
    <div className="h-24 bg-spotify-light-gray border-t border-gray-900 px-4 flex items-center justify-between">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={currentSong?.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Song Info */}
      <div className="flex items-center space-x-4 w-1/4">
        <img
          src={currentSong?.albumArt || 'https://via.placeholder.com/56'}
          alt={currentSong?.title}
          className="w-14 h-14 rounded"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-white text-sm font-semibold truncate">
            {currentSong?.title}
          </h4>
          <p className="text-gray-400 text-xs truncate">
            {currentSong?.artist}
          </p>
        </div>
        <button className="text-spotify-green hover:scale-110 transition">
          <AiOutlineHeart size={20} />
        </button>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center w-2/4">
        <PlayerControls />
        <ProgressBar onSeek={handleSeek} />
      </div>

      {/* Volume Control */}
      <div className="flex justify-end w-1/4">
        <VolumeControl />
      </div>
    </div>
  );
};

export default Player;