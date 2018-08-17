import { combineEpics } from "redux-observable";
import { startCountdownEpic, changeTimerDurationEpic, playAlarmEpic } from "./modules/countdown/epics";

const rootEpic = combineEpics(
  startCountdownEpic,
  changeTimerDurationEpic,
  playAlarmEpic
);

// eslint-disable-next-line import/prefer-default-export
export { rootEpic };
