import "rxjs";
import { createActions, handleActions } from "redux-actions";
import { Observable } from "rxjs/Observable";

const {
  startCountdownCommit,
  startCountdownRollback,
  completeCountdownCommit,
  completeCountdownRollback,
  stopCountdownCommit,
  stopCountdownRollback,
  pauseCountdownCommit,
  pauseCountdownRollback,
  resetCountdownCommit,
  resetCountdownRollback,
  setTimerDuration
} = createActions({
  START_COUNTDOWN_COMMIT: undefined,
  START_COUNTDOWN_ROLLBACK: undefined,
  COMPLETE_COUNTDOWN_COMMIT: undefined,
  COMPLETE_COUNTDOWN_ROLLBACK: undefined,
  STOP_COUNTDOWN_COMMIT: undefined,
  STOP_COUNTDOWN_ROLLBACK: undefined,
  PAUSE_COUNTDOWN_COMMIT: undefined,
  PAUSE_COUNTDOWN_ROLLBACK: undefined,
  RESET_COUNTDOWN_COMMIT: undefined,
  RESET_COUNTDOWN_ROLLBACK: undefined,
  SET_TIMER_DURATION: (durationType) => ({ durationType })
});

export const actionCreators = createActions({
  INCREMENT_ASYNC: undefined,
  CANCEL_INCREMENT_ASYNC: undefined,
  START_COUNTDOWN: [
    undefined,
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

const {
  completeCountdown,
  incrementAsync,
  pauseCountdown,
  startCountdown,
  stopCountdown,
  resetCountdown
} = actionCreators;

const defaultState = {
  elapsedTimeInSeconds: 0,
  isComplete: false,
  isElapsing: false,
  isStopped: false,
  isPaused: false,
  timerDuration: 5
};

const reducer = handleActions(
  {
    [completeCountdown]: (state) => ({ ...state, isElapsing: false, isComplete: true }),
    [incrementAsync]: (state) => ({ ...state, elapsedTimeInSeconds: (state.elapsedTimeInSeconds + 1) }),
    [startCountdown]: (state) => ({ ...state, isElapsing: true }),
    [stopCountdown]: (state) => ({ ...state, isElapsing: false, isStopped: true }),
    [pauseCountdown]: (state) => ({ ...state, isElapsing: false, isPaused: true }),
    [resetCountdown]: (state) => ({ ...state, isElapsing: false, isPaused: false, elapsedTimeInSeconds: 0 }),
    [setTimerDuration]: (state, action) => {
      switch (action.payload.durationType) {
        case "focus":
          return { ...state, timerDuration: 25 };
        case "short-break":
          return { ...state, timerDuration: 5 };
        case "long-break":
          return { ...state, timerDuration: 15 };
        default:
          return state;
      }
    }
  },
  defaultState
);

export default reducer;

const getElapsedTimeInSeconds = state => state.countdown.elapsedTimeInSeconds;
const getTimerDuration = state => state.countdown.timerDuration;
const getIsElapsing = state => state.countdown.isElapsing;
const getIsStopped = state => state.countdown.isStopped;
const getIsComplete = state => state.countdown.isComplete;

export const selectors = {
  getElapsedTimeInSeconds,
  getTimerDuration,
  getIsElapsing,
  getIsComplete,
  getIsStopped
};

const startCountdownEpic = (action$, store) =>
  action$.ofType(startCountdown)
    .delay(1000)
    .switchMap(() => Observable
      .timer(0, 1000)
      .mergeMap(tick => Observable.of(tick))
      // supports cancellation
      .takeUntil(action$.ofType(completeCountdown))
      .takeUntil(action$.ofType(pauseCountdown))
      .takeUntil(action$.ofType(stopCountdown))
      .takeUntil(action$.ofType(resetCountdown))
      .map(() => {
        // actual increment action
        if ((getElapsedTimeInSeconds(store.getState())) === getTimerDuration(store.getState())) {
          return completeCountdown();
        }
        // increment async action

        return incrementAsync();
      }));

const changeTimerDurationEpic = (action$) => action$
  .filter((action) => (action.type === "@@redux-form/CHANGE") && (action.meta.form === "currentDurationLengthForm"))
  .map((action) => setTimerDuration(action.payload));

export {
// eslint-disable-next-line import/prefer-default-export
  startCountdownEpic
};
export const epics = {
  startCountdownEpic,
  changeTimerDurationEpic
};
