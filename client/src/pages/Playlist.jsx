import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setQueue, setCurrentSong, setIsPlaying } from '../redux/slices/playerSlice';
import { BsPlayFill, BsClock, BsThreeDots } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import Loader from '../components/common/Loader';

const Playlist = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    setTimeout(() => {
      setPlaylist({
        _id: id,
        name: 'My Awesome Playlist',
        description: 'The best songs ever',
        coverImage: 'https://via.placeholder.com/300',
        owner: { name: 'User Name' },
        songs: [
          {
            _id: '1',
            title: 'Song Title 1',
            artist: 'Artist Name 1',
            album: 'Album Name 1',
            duration: 245,
            albumArt: 'https://via.placeholder.com/50',
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          },
          {
            _id: '2',
            title: 'Song Title 2',
            artist: 'Artist Name 2',
            album: 'Album Name 2',
            duration: 198,
            albumArt: 'https://via.placeholder.com/50',
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
          },
        ],
        totalDuration: 443,
        totalSongs: 2,
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayAll = () => {
    if (playlist?.songs?.length > 0) {
      dispatch(setQueue(playlist.songs));
      dispatch(setCurrentSong(playlist.songs[0]));
      dispatch(setIsPlaying(true));
    }
  };

  const handlePlaySong = (song, index) => {
    dispatch(setQueue(playlist.songs));
    dispatch(setCurrentSong(song));
    dispatch(setIsPlaying(true));
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!playlist) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-400 text-xl">Playlist not found</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-800 to-spotify-gray">
      {/* Header */}
      <div className="flex items-end space-x-6 bg-gradient-to-b from-gray-700 to-gray-800 p-8">
        <img
          src={playlist.coverImage}
          alt={playlist.name}
          className="w-56 h-56 shadow-2xl"
        />
        <div className="flex-1">
          <p className="text-sm font-semibold uppercase">Playlist</p>
          <h1 className="text-7xl font-bold my-4">{playlist.name}</h1>
          <p className="text-gray-300 mb-4">{playlist.description}</p>
          <div className="flex items-center space-x-2 text-sm">
            <span className="font-semibold">{playlist.owner.name}</span>
            <span>•</span>
            <span>{playlist.totalSongs} songs</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gradient-to-b from-gray-800 to-transparent p-8">
        <div className="flex items-center space-x-6">
          <button
            onClick={handlePlayAll}
            className="bg-spotify-green rounded-full p-4 hover:scale-105 transition shadow-lg"
          >
            <BsPlayFill size={32} className="text-black" />
          </button>
          <button className="text-gray-400 hover:text-white transition">
            <AiOutlineHeart size={32} />
          </button>
          <button className="text-gray-400 hover:text-white transition">
            <BsThreeDots size={32} />
          </button>
        </div>
      </div>

      {/* Song List */}
      <div className="px-8 pb-8">
        <div className="grid grid-cols-[16px_4fr_3fr_2fr_minmax(120px,1fr)] gap-4 px-4 py-2 text-sm text-gray-400 border-b border-gray-800 mb-4">
          <div>#</div>
          <div>TITLE</div>
          <div>ALBUM</div>
          <div>DATE ADDED</div>
          <div className="flex justify-end">
            <BsClock size={16} />
          </div>
        </div>

        {playlist.songs.map((song, index) => (
          <div
            key={song._id}
            onClick={() => handlePlaySong(song, index)}
            className="grid grid-cols-[16px_4fr_3fr_2fr_minmax(120px,1fr)] gap-4 px-4 py-3 rounded hover:bg-gray-800 group cursor-pointer"
          >
            <div className="flex items-center justify-center text-gray-400 group-hover:hidden">
              {index + 1}
            </div>
            <div className="hidden group-hover:flex items-center justify-center text-white">
              <BsPlayFill size={20} />
            </div>
            <div className="flex items-center space-x-3">
              <img
                src={song.albumArt}
                alt={song.title}
                className="w-10 h-10"
              />
              <div>
                <div className="text-white font-medium">{song.title}</div>
                <div className="text-sm text-gray-400">{song.artist}</div>
              </div>
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              {song.album}
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              2 days ago
            </div>
            <div className="flex items-center justify-end space-x-4">
              <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white">
                <AiOutlineHeart size={16} />
              </button>
              <span className="text-gray-400 text-sm">
                {formatTime(song.duration)}
              </span>
              <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white">
                <BsThreeDots size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Playlist;
