import { combineEpics } from "redux-observable";
import { startCountdownEpic } from "./modules/countdown";

const rootEpic = combineEpics(
  startCountdownEpic
);

export default rootEpic;

export { rootEpic };
