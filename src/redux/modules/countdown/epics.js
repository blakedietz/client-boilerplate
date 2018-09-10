import "rxjs";
import { Observable } from "rxjs/Observable";
import {
  completeCountdown,
  incrementAsync,
  pauseCountdown,
  playAlarm,
  resetCountdown,
  setTimerDuration,
  setTimerElapsedTime,
  startCountdown,
  stopCountdown
} from "./action-creators";
import { empty } from "../app/action-creators";
import { filterFormActionOnField } from "./redux-form-filters";
import { getElapsedTimeInSeconds, getTimerDuration, getIsElapsing, getCurrentTime } from "./selectors";

const convertToListOfObservables = (...actions) => {
  const action$ = actions.map(action => Observable.of(action));
  return Observable.concat(...action$);
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

        return incrementAsync(Date.now());
      }));

const resumeFromClose = (action$, store) => action$
  .ofType("persist/REHYDRATE")
  .flatMap(() => {
    const state = store.getState();
    const isElapsing = getIsElapsing(store.getState());

    // The user has started the application and left the page somehow
    if (isElapsing) {
      const currentTime = Date.now();
      const lastIncrementedTime = getCurrentTime(state);
      const timeSinceIncrement = Math.floor(Math.abs(lastIncrementedTime - currentTime) / 1000);
      const elapsedTime = getElapsedTimeInSeconds(state);
      const timerDuration = getTimerDuration(state);

      if ((timeSinceIncrement !== 0))
      {
        if ((timeSinceIncrement + elapsedTime) > timerDuration) {
          return convertToListOfObservables(completeCountdown());
        }

        return convertToListOfObservables(
          setTimerElapsedTime(timeSinceIncrement + elapsedTime),
          startCountdown({ startTime: Date.now()})
        );
      }
    }

    return convertToListOfObservables(empty());
  });

const changeTimerDurationEpic = (action$) => action$
  .filter((action) => (filterFormActionOnField("CHANGE", "currentDurationLengthForm", "duration")(action)))
  .map((action) => setTimerDuration(action.payload));

const playAlarmEpic = (action$) => action$.ofType(completeCountdown)
  .map(() => {
    // eslint-disable-next-line no-undef
    const audio = new Audio("https://freesound.org/data/previews/250/250629_4486188-lq.mp3");
    audio.play();

    return playAlarm();
  });


export {
  changeTimerDurationEpic,
  playAlarmEpic,
  resumeFromClose,
  // eslint-disable-next-line import/prefer-default-export
  startCountdownEpic
};

