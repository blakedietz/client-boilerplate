import { handleActions } from "redux-actions";
import { minutesInSeconds } from "../../../utilities/time-utilities";
import {
  completeCountdown,
  incrementAsync,
  pauseCountdown,
  resetCountdown,
  setTimerDuration,
  startCountdown,
  stopCountdown
} from "./action-creators";


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
