import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

// Song APIs
export const songAPI = {
  getAllSongs: (params) => api.get('/songs', { params }),
  getSongById: (id) => api.get(`/songs/${id}`),
  createSong: (songData) => api.post('/songs', songData),
  updateSong: (id, songData) => api.put(`/songs/${id}`, songData),
  deleteSong: (id) => api.delete(`/songs/${id}`),
  searchSongs: (query) => api.get(`/songs/search?q=${query}`),
};

// Playlist APIs
export const playlistAPI = {
  getAllPlaylists: () => api.get('/playlists'),
  getPlaylistById: (id) => api.get(`/playlists/${id}`),
  createPlaylist: (playlistData) => api.post('/playlists', playlistData),
  updatePlaylist: (id, playlistData) => api.put(`/playlists/${id}`, playlistData),
  deletePlaylist: (id) => api.delete(`/playlists/${id}`),
  addSongToPlaylist: (id, songId) => api.post(`/playlists/${id}/songs`, { songId }),
  removeSongFromPlaylist: (id, songId) => api.delete(`/playlists/${id}/songs/${songId}`),
};

// Album APIs
export const albumAPI = {
  getAllAlbums: () => api.get('/albums'),
  getAlbumById: (id) => api.get(`/albums/${id}`),
  createAlbum: (albumData) => api.post('/albums', albumData),
  updateAlbum: (id, albumData) => api.put(`/albums/${id}`, albumData),
  deleteAlbum: (id) => api.delete(`/albums/${id}`),
};

// Artist APIs
export const artistAPI = {
  getAllArtists: () => api.get('/artists'),
  getArtistById: (id) => api.get(`/artists/${id}`),
  createArtist: (artistData) => api.post('/artists', artistData),
  updateArtist: (id, artistData) => api.put(`/artists/${id}`, artistData),
  deleteArtist: (id) => api.delete(`/artists/${id}`),
};

// Upload API
export const uploadAPI = {
  uploadFile: (file, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });
  },
};

export default api;