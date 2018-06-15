import { combineEpics } from "redux-observable";
import { startCountdownEpic } from "./epics/countdown-epic";

const rootEpic = combineEpics(startCountdownEpic);
/**
 * there is only one epic.
 */
export {
// eslint-disable-next-line import/prefer-default-export
  rootEpic
}
