/* eslint-disable */

/**
 * configureStore for development purposes. This file is responsible for adding developer tools to the current build
 * and detecting whether or not the dev tools are available from within the browser e.g. Redux Devtools. This file
 * also takes into account hot module reloading (hmr for short) so the store reducers can be overwriittern on the fly.
 *
 * NOTE:
 * If you make changes to functionality in this file, make sure to make those changes in the development
 * (configure-store.prod.js) file as well.
 *
 *  */

import { createStore, applyMiddleware, compose } from "redux";
import window from "window";
import rootReducer from "./root-reducer";

// Check to see if there's redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware())
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./root_reducer", () => {
      const nextRootReducer = require("./root-reducer").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
