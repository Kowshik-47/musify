import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentSong, setIsPlaying, setQueue } from '../../redux/slices/playerSlice';
import { BsPlayFill } from 'react-icons/bs';

const SongCard = ({ song, songs = [] }) => {
  const dispatch = useDispatch();

  const handlePlay = () => {
    dispatch(setCurrentSong(song));
    dispatch(setQueue(songs));
    dispatch(setIsPlaying(true));
  };

  return (
    <div className="bg-spotify-light-gray p-4 rounded-lg hover:bg-gray-700 transition-all group cursor-pointer">
      <div className="relative mb-4">
        <img
          src={song.albumArt || 'https://via.placeholder.com/200'}
          alt={song.title}
          className="w-full aspect-square object-cover rounded-md"
        />
        <button
          onClick={handlePlay}
          className="absolute bottom-2 right-2 bg-spotify-green rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all hover:scale-110"
        >
          <BsPlayFill size={24} className="text-black" />
        </button>
      </div>
      <h3 className="font-semibold text-white mb-1 truncate">{song.title}</h3>
      <p className="text-sm text-gray-400 truncate">{song.artist}</p>
    </div>
  );
};

export default SongCard;