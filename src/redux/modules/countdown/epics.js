import "rxjs";
import { Observable } from "rxjs/Observable";
import {
  completeCountdown,
  incrementAsync,
  pauseCountdown,
  playAlarm,
  resetCountdown,
  setTimerDuration,
  startCountdown,
  stopCountdown
} from "./action-creators";
import { filterFormActionOnField } from "./redux-form-filters";
import { getElapsedTimeInSeconds, getTimerDuration } from "./selectors";

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
  changeTimerDurationEpic,
  playAlarmEpic,
  // eslint-disable-next-line import/prefer-default-export
  startCountdownEpic
};

