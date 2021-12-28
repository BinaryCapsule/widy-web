/**
 * Formats total time
 *
 * @example
 *   getTotalTime(4 * 60) ➜ { hours: 0, minutes: 4 }
 *   getTotalTime(64 * 60) ➜ { hours: 1, minutes: 4 }
 */
export const getTotalTime = (time: number) => {
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor((time - hours * 60 * 60) / 60);
  const seconds = Math.round(time - hours * 60 * 60 - minutes * 60);

  return {
    hours,
    minutes,
    seconds,
  };
};

/**
 * Converts time in secs to a formatted string (00 h 00 min)
 *
 * @param {number} time - Time to format (secs)
 * @returns {string} - Formatted time ➜ 00 h 00 min
 */
export const formatTotalTime = (time: number) => {
  const { hours, minutes } = getTotalTime(time);

  return `${hours > 0 ? `${hours} h ` : ''}${
    hours > 0 ? minutes.toString().padStart(2, '0') : minutes
  } min`;
};
