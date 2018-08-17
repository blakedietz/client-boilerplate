import { MINUTE } from "./time-constants";

export const minutesInMilliseconds = (minutes) => minutes * MINUTE;
export const minutesInSeconds = (numberOfMinutes) => numberOfMinutes * 60;