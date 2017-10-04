/* eslint-disable */

/**
 * configureStore for production.
 *
 * NOTE:
 * If you make changes to functionality in this file, make sure to make those changes in the development
 * (configure_store.dev.js) file as well.
 */

import { createStore, compose } from "redux";
import window from "window";
import rootReducer from "./root_reducer";

// Check to see if there's redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, composeEnhancers());

  return store;
}
