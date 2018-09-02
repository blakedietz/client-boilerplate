import { createActions } from "redux-actions";

const {
  appAboutToStart,
  empty
} = createActions({
  APP_ABOUT_TO_START: undefined,
  EMPTY: undefined
});

export {
  appAboutToStart,
  empty
};
