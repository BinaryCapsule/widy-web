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
