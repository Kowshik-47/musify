import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SongCard from '../components/music/SongCard';
import AlbumCard from '../components/music/AlbumCard';
import { BsPlayFill } from 'react-icons/bs';
import Loader from '../components/common/Loader';

const Artist = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    setTimeout(() => {
      setArtist({
        _id: id,
        name: 'Artist Name',
        image: 'https://via.placeholder.com/300',
        followers: '1.2M',
        verified: true,
        topSongs: [
          {
            _id: '1',
            title: 'Popular Song 1',
            artist: 'Artist Name',
            albumArt: 'https://via.placeholder.com/50',
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          },
          {
            _id: '2',
            title: 'Popular Song 2',
            artist: 'Artist Name',
            albumArt: 'https://via.placeholder.com/50',
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
          },
        ],
        albums: [
          {
            _id: '1',
            title: 'Album 1',
            artist: 'Artist Name',
            year: 2024,
            coverImage: 'https://via.placeholder.com/200',
          },
          {
            _id: '2',
            title: 'Album 2',
            artist: 'Artist Name',
            year: 2023,
            coverImage: 'https://via.placeholder.com/200',
          },
        ],
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!artist) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-400 text-xl">Artist not found</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-purple-900 to-spotify-gray">
      {/* Header */}
      <div className="relative h-96 bg-gradient-to-b from-purple-800 to-purple-900">
        <div className="absolute inset-0 flex items-end p-8">
          <div className="flex items-end space-x-6">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-56 h-56 rounded-full shadow-2xl"
            />
            <div className="pb-4">
              {artist.verified && (
                <div className="flex items-center space-x-2 mb-2">
                  <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold">Verified Artist</span>
                </div>
              )}
              <h1 className="text-8xl font-bold mb-4">{artist.name}</h1>
              <p className="text-lg">{artist.followers} monthly listeners</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Popular Songs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Popular</h2>
          <div className="space-y-2">
            {artist.topSongs.map((song, index) => (
              <div
                key={song._id}
                className="grid grid-cols-[16px_4fr_minmax(120px,1fr)] gap-4 px-4 py-3 rounded hover:bg-gray-800 group cursor-pointer"
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
                  <div className="text-white font-medium">{song.title}</div>
                </div>
                <div className="flex items-center justify-end text-gray-400">
                  1,234,567
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Albums */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {artist.albums.map((album) => (
              <AlbumCard key={album._id} album={album} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Artist;