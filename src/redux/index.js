import { startCountdownEpic } from "./epics/countdown-epic";
import { combineEpics } from "redux-observable";

const rootEpic = combineEpics(startCountdownEpic);
/**
 * there is only one epic.
 */
export {
  rootEpic
}
