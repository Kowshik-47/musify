import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSong: null,
  isPlaying: false,
  volume: 1,
  currentTime: 0,
  duration: 0,
  queue: [],
  currentIndex: 0,
  shuffle: false,
  repeat: 'off', // 'off', 'all', 'one'
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setQueue: (state, action) => {
      state.queue = action.payload;
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    nextSong: (state) => {
      if (state.currentIndex < state.queue.length - 1) {
        state.currentIndex += 1;
        state.currentSong = state.queue[state.currentIndex];
      } else if (state.repeat === 'all') {
        state.currentIndex = 0;
        state.currentSong = state.queue[0];
      }
    },
    previousSong: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
        state.currentSong = state.queue[state.currentIndex];
      }
    },
    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle;
    },
    toggleRepeat: (state) => {
      const modes = ['off', 'all', 'one'];
      const currentIndex = modes.indexOf(state.repeat);
      state.repeat = modes[(currentIndex + 1) % modes.length];
    },
  },
});

export const {
  setCurrentSong,
  setIsPlaying,
  togglePlayPause,
  setVolume,
  setCurrentTime,
  setDuration,
  setQueue,
  setCurrentIndex,
  nextSong,
  previousSong,
  toggleShuffle,
  toggleRepeat,
} = playerSlice.actions;

export default playerSlice.reducer;
