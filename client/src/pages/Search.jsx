import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import SongCard from '../components/music/SongCard';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement actual search API call
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-spotify-light-gray to-spotify-gray p-8">
      <div className="max-w-2xl mb-8">
        <form onSubmit={handleSearch} className="relative">
          <AiOutlineSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-4 py-4 rounded-full bg-white text-black placeholder-gray-500 outline-none font-semibold"
          />
        </form>
      </div>

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {searchResults.map((song) => (
            <SongCard key={song._id} song={song} songs={searchResults} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-20">
          <h2 className="text-2xl font-bold mb-4">Search for songs, artists, or albums</h2>
        </div>
      )}
    </div>
  );
};


export default Search;
