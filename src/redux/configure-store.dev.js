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

import createHistory from "history/createBrowserHistory";
import window from "window";
import { createEpicMiddleware } from "redux-observable";
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import { rootEpic } from "./root-epic";
import rootReducer from "./root-reducer";
import { offline } from 'redux-offline';
import offlineConfig from 'redux-offline/lib/defaults';

// Check to see if there's redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const history = createHistory();

const epicMiddleware = createEpicMiddleware(rootEpic);


function configureStore(initialState) {
  const enhancers = composeEnhancers(
    applyMiddleware(
      epicMiddleware,
      routerMiddleware(history)
    ),
    offline(offlineConfig),
    // https://github.com/zalmoxisus/redux-devtools-extension/issues/365
    (createStore) => (reducer, preloadedState, enhancer) => enhancer(createStore)(reducer, preloadedState)
  );

  const store = createStore(
    rootReducer,
    initialState,
    enhancers
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./root-reducer", () => {
      const nextRootReducer = require("./root-reducer").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export default configureStore;

export {
  history
};
