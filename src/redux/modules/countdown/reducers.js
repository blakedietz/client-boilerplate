import { handleActions } from "redux-actions";
import { minutesInSeconds } from "../../../utilities/time-utilities";
import {
  completeCountdown,
  incrementAsync,
  pauseCountdown,
  resetCountdown,
  setTimerDuration,
  setTimerElapsedTime,
  startCountdown,
  stopCountdown
} from "./action-creators";


const defaultState = {
  elapsedTimeInSeconds: 0,
  currentTime: null,
  hasStarted: false,
  isComplete: false,
  isElapsing: false,
  isStopped: false,
  isPaused: false,
  timerDuration: minutesInSeconds(5),
  timerStart: null
};

const reducer = handleActions(
  {
    [completeCountdown]: (state) => ({
      ...state,
      isElapsing: false,
      isComplete: true,
      elapsedTimeInSeconds: state.timerDuration
    }),
    [incrementAsync]: (state, action) => ({ ...state, elapsedTimeInSeconds: (state.elapsedTimeInSeconds + 1) , currentTime: action.payload.currentTime }),
    [startCountdown]: (state, action) => ({
      ...state,
      isElapsing: true,
      hasStarted: true,
      timerStart: action.payload.startTime
    }),
    [stopCountdown]: (state) => ({ ...state, isElapsing: false, isStopped: true }),
    [pauseCountdown]: (state) => ({ ...state, isElapsing: false, isPaused: true, hasStarted: false }),
    [resetCountdown]: (state) => ({
      ...state,
      isElapsing: false,
      isPaused: false,
      elapsedTimeInSeconds: 0,
      hasStarted: false,
      timerStart: null
    }),
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
    },
    [setTimerElapsedTime]: (state, action) =>  ({...state, elapsedTimeInSeconds: action.payload.elapsedTime })
  },
  defaultState
);

export default reducer;
