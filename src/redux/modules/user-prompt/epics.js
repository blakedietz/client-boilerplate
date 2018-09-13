import { Observable } from "rxjs";

// eslint-disable-next-line
export const windowOnPwaPromptEpic = () => Observable.fromEvent(window, "beforeinstallprompt")
  .map(() => ({
    type: "test"
  }));
