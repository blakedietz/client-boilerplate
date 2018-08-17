import "rxjs";
import { createActions, handleActions } from "redux-actions";
import { Observable } from "rxjs/Observable";
import { minutesInSeconds} from "../../../utilities/time-utilities";

const filterFormActionOnField = (reduxFormAction, formNameSpace, field) => (action) => (action.type === `@@redux-form/${reduxFormAction}`) && (action.meta.form === formNameSpace) && (action.meta.field === field);

const {
  completeCountdownCommit,
  completeCountdownRollback,
  pauseCountdownCommit,
  pauseCountdownRollback,
  playAlarm,
  resetCountdownCommit,
  resetCountdownRollback,
  setTimerDuration,
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
  START_COUNTDOWN_COMMIT: undefined,
  START_COUNTDOWN_ROLLBACK: undefined,
  STOP_COUNTDOWN_COMMIT: undefined,
  STOP_COUNTDOWN_ROLLBACK: undefined
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
        // TODO: (bdietz) - would be good to have this enumerated somewhere and linked where the dropdown is
        case "focus":
          return { ...state, timerDuration: minutesInSeconds(25) };
        case "short-break":
          return { ...state, timerDuration: minutesInSeconds(5) };
        case "long-break":
          return { ...state, timerDuration: minutesInSeconds(15) };
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
const getPrettyTime = state => {
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

export const selectors = {
  getElapsedTimeInSeconds,
  getTimerDuration,
  getIsElapsing,
  getIsComplete,
  getIsStopped,
  getPrettyTime
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
  .filter((action) => (filterFormActionOnField("CHANGE", "currentDurationLengthForm", "duration")(action)))
  .map((action) => setTimerDuration(action.payload));

const playAlarmEpic = (action$) => action$.ofType(completeCountdown)
  .do(() => {
  // eslint-disable-next-line no-undef
  const audio = new Audio("https://freesound.org/data/previews/250/250629_4486188-lq.mp3");
  audio.play();

  return playAlarm();
});

export {
// eslint-disable-next-line import/prefer-default-export
  startCountdownEpic
};
export const epics = {
  startCountdownEpic,
  changeTimerDurationEpic,
  playAlarmEpic
};
