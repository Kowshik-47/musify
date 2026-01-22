import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';

const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <AiOutlineSearch 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
        size={24} 
      />
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-14 pr-12 py-3 rounded-full bg-white text-black placeholder-gray-500 outline-none font-medium focus:ring-2 focus:ring-spotify-green"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
        >
          <MdClose size={24} />
        </button>
      )}
    </form>
  );
};

export default SearchBar;