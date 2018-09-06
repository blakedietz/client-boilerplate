import { createActions } from "redux-actions";

const {
  completeCountdownCommit,
  completeCountdownRollback,
  pauseCountdownCommit,
  pauseCountdownRollback,
  playAlarm,
  resetCountdownCommit,
  resetCountdownRollback,
  setTimerDuration,
  setTimerElapsedTime,
  startCountdownCommit,
  startCountdownRollback,
  stopCountdownCommit,
  stopCountdownRollback
} = createActions({
  COMPLETE_COUNTDOWN_COMMIT: undefined,
  COMPLETE_COUNTDOWN_ROLLBACK: undefined,
  PAUSE_COUNTDOWN_COMMIT: undefined,
  PAUSE_COUNTDOWN_ROLLBACK: undefined,
  PLAY_ALARM: undefined,
  RESET_COUNTDOWN_COMMIT: undefined,
  RESET_COUNTDOWN_ROLLBACK: undefined,
  SET_TIMER_DURATION: (durationType) => ({ durationType }),
  SET_TIMER_ELAPSED_TIME: (elapsedTime) => ({ elapsedTime }),
  START_COUNTDOWN_COMMIT: undefined,
  START_COUNTDOWN_ROLLBACK: undefined,
  STOP_COUNTDOWN_COMMIT: undefined,
  STOP_COUNTDOWN_ROLLBACK: undefined
});

const {
  incrementAsync,
  cancelIncrementAsync,
  startCountdown,
  stopCountdown,
  pauseCountdown,
  completeCountdown,
  resetCountdown
} = createActions({
  INCREMENT_ASYNC: (currentTime) => ({ currentTime }),
  CANCEL_INCREMENT_ASYNC: undefined,
  START_COUNTDOWN: [
    ({startTime} = {}) => ({ startTime }),
    () => ({
      offline: {
        // the network action to execute:
        effect: { url: "http://localhost:3000/pomodoro", method: "GET" },
        // action to dispatch when effect succeeds:
        commit: startCountdownCommit(),
        // action to dispatch if network action fails permanently:
        rollback: startCountdownRollback()
      }
    })
  ],
  STOP_COUNTDOWN: [
    undefined,
    () => ({
      offline: {
        // the network action to execute:
        effect: { url: "http://localhost:3000/pomodoro", method: "GET" },
        // action to dispatch when effect succeeds:
        commit: stopCountdownCommit(),
        // action to dispatch if network action fails permanently:
        rollback: stopCountdownRollback()
      }
    })
  ],
  PAUSE_COUNTDOWN: [
    undefined,
    () => ({
      offline: {
        // the network action to execute:
        effect: { url: "http://localhost:3000/pomodoro", method: "GET" },
        // action to dispatch when effect succeeds:
        commit: pauseCountdownCommit(),
        // action to dispatch if network action fails permanently:
        rollback: pauseCountdownRollback()
      }
    })
  ],
  COMPLETE_COUNTDOWN: [
    undefined,
    () => ({
      offline: {
        // the network action to execute:
        effect: { url: "http://localhost:3000/pomodoro", method: "GET" },
        // action to dispatch when effect succeeds:
        commit: completeCountdownCommit(),
        // action to dispatch if network action fails permanently:
        rollback: completeCountdownRollback()
      }
    })
  ],
  RESET_COUNTDOWN: [
    undefined,
    () => ({
      offline: {
        // the network action to execute:
        effect: { url: "http://localhost:3000/pomodoro", method: "GET" },
        // action to dispatch when effect succeeds:
        commit: resetCountdownCommit(),
        // action to dispatch if network action fails permanently:
        rollback: resetCountdownRollback()
      }
    })
  ]
});

export {
  cancelIncrementAsync,
  completeCountdown,
  completeCountdownCommit,
  completeCountdownRollback,
  incrementAsync,
  pauseCountdown,
  pauseCountdownCommit,
  pauseCountdownRollback,
  playAlarm,
  resetCountdown,
  resetCountdownCommit,
  resetCountdownRollback,
  setTimerDuration,
  setTimerElapsedTime,
  startCountdown,
  startCountdownCommit,
  startCountdownRollback,
  stopCountdown,
  stopCountdownCommit,
  stopCountdownRollback,
};
