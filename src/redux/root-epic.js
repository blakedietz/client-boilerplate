import { combineEpics } from "redux-observable";
import { epics as countDownEpics } from "./modules/countdown";

const { startCountdownEpic, changeTimerDurationEpic, playAlarmEpic } = countDownEpics;

const rootEpic = combineEpics(
  startCountdownEpic,
  changeTimerDurationEpic,
  playAlarmEpic
);

export default rootEpic;

export { rootEpic };
