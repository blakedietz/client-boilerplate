// eslint-disable-next-line
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import "rxjs";
// eslint-disable-next-line
import "typeface-roboto";

import React from "react";
import ReactDOM from "react-dom";
// eslint-disable-next-line
import { document } from "window";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import configureStore, { history } from "./redux/configure-store";
import RootContainer from "./containers/root-container";

OfflinePluginRuntime.install();

// A theme with custom primary and secondary color.
// It's optional.

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <RootContainer />
    </ConnectedRouter>
  </Provider>,
  // eslint-disable-next-line
  document.getElementById("app")
);
