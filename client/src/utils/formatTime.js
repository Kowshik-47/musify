/**
 * Format seconds to MM:SS format
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
export const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Format seconds to HH:MM:SS format
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
export const formatTimeWithHours = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return '0:00:00';
  
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Format seconds to human readable format (e.g., "3 min 24 sec")
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
export const formatTimeHumanReadable = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return '0 sec';
  
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  const parts = [];
  
  if (hours > 0) parts.push(`${hours} hr`);
  if (mins > 0) parts.push(`${mins} min`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs} sec`);
  
  return parts.join(' ');
};

/**
 * Convert duration to total seconds
 * @param {string} duration - Duration in format "MM:SS" or "HH:MM:SS"
 * @returns {number} Total seconds
 */
export const durationToSeconds = (duration) => {
  if (!duration) return 0;
  
  const parts = duration.split(':').map(Number);
  
  if (parts.length === 2) {
    // MM:SS format
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 3) {
    // HH:MM:SS format
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  
  return 0;
};

/**
 * Calculate total duration from array of songs
 * @param {Array} songs - Array of song objects with duration property
 * @returns {number} Total duration in seconds
 */
export const calculateTotalDuration = (songs) => {
  if (!Array.isArray(songs)) return 0;
  
  return songs.reduce((total, song) => {
    const duration = typeof song.duration === 'string' 
      ? durationToSeconds(song.duration) 
      : song.duration || 0;
    return total + duration;
  }, 0);
};