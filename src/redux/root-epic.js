import { combineEpics } from "redux-observable";
import { startCountdownEpic, changeTimerDurationEpic, playAlarmEpic, resumeFromClose } from "./modules/countdown/epics";

const rootEpic = combineEpics(
  startCountdownEpic,
  changeTimerDurationEpic,
  playAlarmEpic,
  resumeFromClose
);

// eslint-disable-next-line import/prefer-default-export
export { rootEpic };
