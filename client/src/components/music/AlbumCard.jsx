import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPlayFill } from 'react-icons/bs';

const AlbumCard = ({ album }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/album/${album._id}`)}
      className="bg-spotify-light-gray p-4 rounded-lg hover:bg-gray-700 transition-all group cursor-pointer"
    >
      <div className="relative mb-4">
        <img
          src={album.coverImage || 'https://via.placeholder.com/200'}
          alt={album.title}
          className="w-full aspect-square object-cover rounded-md"
        />
        <button className="absolute bottom-2 right-2 bg-spotify-green rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all hover:scale-110">
          <BsPlayFill size={24} className="text-black" />
        </button>
      </div>
      <h3 className="font-semibold text-white mb-1 truncate">
        {album.title}
      </h3>
      <p className="text-sm text-gray-400 truncate">
        {album.artist} • {album.year}
      </p>
    </div>
  );
};

export default AlbumCard;