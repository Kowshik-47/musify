import React from 'react';
import { useSelector } from 'react-redux';
import PlaylistCard from '../components/music/PlaylistCard';

const Library = () => {
  const playlists = useSelector((state) => state.playlist.playlists);

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-spotify-light-gray to-spotify-gray p-8">
      <h1 className="text-4xl font-bold mb-8">Your Library</h1>

      {playlists.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist._id} playlist={playlist} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-20">
          <h2 className="text-2xl font-bold mb-4">Your library is empty</h2>
          <p>Start creating playlists and adding songs!</p>
        </div>
      )}
    </div>
  );
};

export default Library;