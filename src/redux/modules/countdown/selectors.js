export const getElapsedTimeInSeconds = state => state.countdown.elapsedTimeInSeconds;
export const getIsComplete = state => state.countdown.isComplete;
export const getIsElapsing = state => state.countdown.isElapsing;
export const getIsPaused = state => state.countdown.isPaused;
export const getIsStopped = state => state.countdown.isStopped;
export const getTimerDuration = state => state.countdown.timerDuration;
export const getPrettyTime = state => {
  const { timerDuration, elapsedTimeInSeconds } = state.countdown;

  const totalTimeLeft = timerDuration - elapsedTimeInSeconds;
  const totalMinutesLeft = Math.floor(totalTimeLeft / 60);
  const secondToSubtract = elapsedTimeInSeconds % 60;
  const seconds = timerDuration < 60
    ? timerDuration - elapsedTimeInSeconds
    : (60 - secondToSubtract) % 60;

  const totalMinutesLeftPretty = totalMinutesLeft < 10
    ? `0${totalMinutesLeft}`
    : totalMinutesLeft;

  const totalSecondsLeftPretty = seconds < 10
    ? `0${seconds}`
    : seconds;

  return `${totalMinutesLeftPretty}:${totalSecondsLeftPretty}`;
};
