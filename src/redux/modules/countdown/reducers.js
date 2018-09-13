import { handleActions } from "redux-actions";
import { minutesInSecondsFromDurationType } from "../../../utilities/time-utilities";
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
import { FOCUS, LONG_BREAK, SHORT_BREAK } from "../../../utilities/duration-types";


const defaultState = {
  elapsedTimeInSeconds: 0,
  currentTime: null,
  isComplete: false,
  isElapsing: false,
  isStopped: false,
  isPaused: false,
  timerDuration: minutesInSecondsFromDurationType(FOCUS),
  durationType: FOCUS
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
    [startCountdown]: (state) => ({
      ...state,
      isElapsing: true,
      isPaused: false
    }),
    [stopCountdown]: (state) => ({ ...state, isElapsing: false, isStopped: true }),
    [pauseCountdown]: (state) => ({ ...state, isElapsing: false, isPaused: true }),
    [resetCountdown]: (state) => ({
      ...state,
      isElapsing: false,
      isComplete: false,
      isPaused: false,
      elapsedTimeInSeconds: 0,
    }),
    [setTimerDuration]: (state, action) => {
      switch (action.payload.durationType) {
        // TODO: (bdietz) - would be good to have this enumerated somewhere and linked where the dropdown is
        case FOCUS:
          return { ...state, timerDuration: minutesInSecondsFromDurationType(FOCUS) };
        case SHORT_BREAK:
          return { ...state, timerDuration: minutesInSecondsFromDurationType(SHORT_BREAK) };
        case LONG_BREAK:
          return { ...state, timerDuration: minutesInSecondsFromDurationType(LONG_BREAK) };
        default:
          return state;
      }
    },
    [setTimerElapsedTime]: (state, action) =>  ({...state, elapsedTimeInSeconds: action.payload.elapsedTime })
  },
  defaultState
);

export default reducer;
