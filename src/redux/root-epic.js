import { combineEpics } from "redux-observable";
import { startCountdownEpic, changeTimerDurationEpic, playAlarmEpic, resumeFromClose } from "./modules/countdown/epics";
import { windowOnPwaPromptEpic } from "./modules/user-prompt/epics";

const rootEpic = combineEpics(
  startCountdownEpic,
  changeTimerDurationEpic,
  playAlarmEpic,
  resumeFromClose,
  windowOnPwaPromptEpic
);

// eslint-disable-next-line import/prefer-default-export
export { rootEpic };
