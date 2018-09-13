import { MINUTE } from "./time-constants";
import { FOCUS, SHORT_BREAK, LONG_BREAK} from "./duration-types";

export const minutesInMilliseconds = (minutes) => minutes * MINUTE;
export const minutesInSeconds = (numberOfMinutes) => numberOfMinutes * 60;
export const minutesInSecondsFromDurationType = (durationType) => {
  switch(durationType) {
    case FOCUS:
      return minutesInSeconds(25);
    case SHORT_BREAK:
      return minutesInSeconds(5);
    case LONG_BREAK:
      return minutesInSeconds(15);
    default:
      throw new Error("Incorrect duration type specified");
  }
};
