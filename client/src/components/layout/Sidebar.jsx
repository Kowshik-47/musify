import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  AiFillHome, 
  AiOutlineSearch, 
  AiFillHeart,
  AiOutlinePlus 
} from 'react-icons/ai';
import { BiLibrary } from 'react-icons/bi';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const playlists = useSelector((state) => state.playlist.playlists);

  const navItems = [
    { name: 'Home', icon: AiFillHome, path: '/' },
    { name: 'Search', icon: AiOutlineSearch, path: '/search' },
    { name: 'Your Library', icon: BiLibrary, path: '/library' },
  ];

  return (
    <div className="w-64 bg-black h-screen p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold">Spotify Clone</h1>
      </div>

      {/* Navigation */}
      <nav className="mb-8">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-4 py-3 px-4 rounded-lg transition-colors ${
                isActive
                  ? 'text-white bg-spotify-light-gray'
                  : 'text-gray-400 hover:text-white'
              }`
            }
          >
            <item.icon size={24} />
            <span className="font-semibold">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Actions */}
      <div className="space-y-4 mb-8">
        <button className="flex items-center space-x-4 text-gray-400 hover:text-white transition-colors">
          <div className="bg-spotify-light-gray p-2 rounded">
            <AiOutlinePlus size={20} />
          </div>
          <span>Create Playlist</span>
        </button>
        <button className="flex items-center space-x-4 text-gray-400 hover:text-white transition-colors">
          <div className="bg-gradient-to-br from-purple-400 to-blue-400 p-2 rounded">
            <AiFillHeart size={20} />
          </div>
          <span>Liked Songs</span>
        </button>
      </div>

      {/* Playlists */}
      <div className="flex-1 overflow-y-auto">
        <div className="border-t border-gray-800 pt-4">
          {playlists.map((playlist) => (
            <NavLink
              key={playlist._id}
              to={`/playlist/${playlist._id}`}
              className="block py-2 px-4 text-gray-400 hover:text-white text-sm truncate"
            >
              {playlist.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;