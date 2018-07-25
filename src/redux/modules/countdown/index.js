import "rxjs";
import { createActions, handleActions, combineActions } from "redux-actions";
import { Observable } from "rxjs/Observable";

const { startCountdownCommit, startCountdownRollback } = createActions({
  START_COUNTDOWN_COMMIT: undefined,
  START_COUNTDOWN_ROLLBACK: undefined
});

export const actionCreators = createActions({
  INCREMENT_ASYNC: undefined,
  CANCEL_INCREMENT_ASYNC: undefined,
  START_COUNTDOWN: [
    undefined,
    () => ({
      offline: {
        // the network action to execute:
        effect: { url: "http://localhost:3000/posts", method: "GET" },
        // action to dispatch when effect succeeds:
        commit: startCountdownCommit(),
        // action to dispatch if network action fails permanently:
        rollback: startCountdownRollback()
      }
    })],
  COUNTDOWN_TERMINATED: undefined
});

const {
  incrementAsync,
  startCountdown,
  countdownTerminated
} = actionCreators;

const reducer = handleActions(
  {
    [incrementAsync]: (state) => ({ ...state, elapsedTimeInSeconds: (state.elapsedTimeInSeconds + 1) }),
    [combineActions(countdownTerminated)]: (state) => ({ ...state, elapsedTimeInSeconds: 0 }),
    [combineActions(startCountdown, startCountdownCommit, startCountdownRollback)]: (state) => ({ ...state })
  },
  { timerDuration: 5, elapsedTimeInSeconds: 0 }
);

export default reducer;

const getElapsedTimeInSeconds = state => state.countdown.elapsedTimeInSeconds;
const getTimerDuration = state => state.countdown.timerDuration;

export const selectors = {
  getElapsedTimeInSeconds,
  getTimerDuration
};

const startCountdownEpic = (action$, store) =>
  action$.ofType(startCountdown)
    .delay(1000)
    .switchMap(() => Observable
      .timer(0, 1000)
      .mergeMap(tick => Observable.of(tick))
      // supports cancellation
      .takeUntil(action$.ofType(countdownTerminated))
      .map(seconds => {
        // actual increment action
        if ((getElapsedTimeInSeconds(store.getState())) === getTimerDuration(store.getState())) {
          return countdownTerminated();
        }
        // increment async action

        return incrementAsync(seconds);
      }));


export {
// eslint-disable-next-line import/prefer-default-export
  startCountdownEpic
};
export const epics = {
  startCountdownEpic
};
