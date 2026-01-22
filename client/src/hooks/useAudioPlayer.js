import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsPlaying,
  setCurrentTime,
  setDuration,
  nextSong,
} from '../redux/slices/playerSlice';

const useAudioPlayer = () => {
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const { currentSong, isPlaying, volume, repeat } = useSelector(
    (state) => state.player
  );

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      dispatch(setCurrentTime(audio.currentTime));
    };

    const handleLoadedMetadata = () => {
      dispatch(setDuration(audio.duration));
    };

    const handleEnded = () => {
      if (repeat === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else {
        dispatch(nextSong());
      }
    };

    const handleError = (e) => {
      console.error('Audio error:', e);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [dispatch, repeat]);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.audioUrl;
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error('Play error:', error);
          dispatch(setIsPlaying(false));
        });
      }
    }
  }, [currentSong, dispatch, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error('Play error:', error);
          dispatch(setIsPlaying(false));
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, dispatch]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const seek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      dispatch(setCurrentTime(time));
    }
  };

  return {
    audioRef,
    seek,
  };
};

export default useAudioPlayer;