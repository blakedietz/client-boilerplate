import { combineEpics } from "redux-observable";
import { epics as countDownEpics } from "./modules/countdown";

const { startCountdownEpic, changeTimerDurationEpic } = countDownEpics;

const rootEpic = combineEpics(
  startCountdownEpic,
  changeTimerDurationEpic
);

export default rootEpic;

export { rootEpic };
