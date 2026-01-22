import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  playlists: [],
  currentPlaylist: null,
  loading: false,
  error: null,
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setPlaylists: (state, action) => {
      state.playlists = action.payload;
    },
    setCurrentPlaylist: (state, action) => {
      state.currentPlaylist = action.payload;
    },
    addPlaylist: (state, action) => {
      state.playlists.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setPlaylists,
  setCurrentPlaylist,
  addPlaylist,
  setLoading,
  setError,
} = playlistSlice.actions;

export default playlistSlice.reducer;