import "rxjs";
import { createActions, handleActions, combineActions } from "redux-actions";
import { Observable } from "rxjs/Observable";

const { startCountdownCommit, startCountdownRollback } = createActions({
  START_COUNTDOWN_COMMIT: undefined,
  START_COUNTDOWN_ROLLBACK: undefined
});

export const actionCreators = createActions({
  INCREMENT: (amount = 1) => ({ amount }),
  DECREMENT: (amount = 1) => ({ amount: -amount }),
  INCREMENT_ASYNC: (amount) => ({ amount }),
  CANCEL_INCREMENT_ASYNC: undefined,
  START_COUNTDOWN: [() => ({ value: 1000 }), () => ({
    offline: {
      // the network action to execute:
      effect: { url: 'http://localhost:3000/posts', method: 'GET' },
      // action to dispatch when effect succeeds:
      commit:  startCountdownCommit(),
      // action to dispatch if network action fails permanently:
      rollback: startCountdownRollback()
    }
  })],
  COUNTDOWN_TERMINATED: undefined
});

const {
  increment,
  incrementAsync,
  startCountdown,
  countdownTerminated
} = actionCreators;

const reducer = handleActions(
  {
    [incrementAsync]: (state, { payload: { amount } }) => ({ ...state, value: amount }),
    [combineActions(countdownTerminated)]: (state) => ({ ...state, value: 0 }),
    [increment]: (state, { payload: { amount } }) => ({ ...state, counter: state.counter + amount }),
    [startCountdown]: (state, { payload: { value } }) => ({ ...state, value }),
    [startCountdownCommit]: (state) => ({ ...state }),
    [startCountdownRollback]: (state) => ({ ...state })
  },
  { counter: 0, value: 0 }
);

export default reducer;

const getTimeInSeconds = state => state.countdown.value;

export const selectors = {
  getTimeInSeconds
};

const startCountdownEpic = (action$) =>
  action$.ofType(startCountdown).switchMap(() => {
    const start = 5;

    return Observable
      .timer(0, 1000)
      .mergeMap(tick => Observable.of(tick))
      .map(i => start - i)
      // supports cancellation
      .takeUntil(action$.ofType(countdownTerminated))
      .map(seconds => {
        // actual increment action
        if (seconds === -1) {
          return countdownTerminated();
        }
        // increment async action

        return incrementAsync(seconds);
      });
  });


export {
// eslint-disable-next-line import/prefer-default-export
  startCountdownEpic
};
export const epics = {
  startCountdownEpic
};
