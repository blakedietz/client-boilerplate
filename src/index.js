import React from "react";
import ReactDOM from "react-dom";
// eslint-disable-next-line
import { document } from "window";
import { Provider } from "react-redux";
import configureStore from "./redux/configure_store";
import RootContainer from "./containers/root_container";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <RootContainer />
  </Provider>,
  // eslint-disable-next-line
  document.getElementById("app")
);
