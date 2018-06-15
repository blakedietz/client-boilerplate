import "rxjs";
// eslint-disable-next-line
import "typeface-roboto";

import React from "react";
import ReactDOM from "react-dom";
import JssProvider from "react-jss/lib/JssProvider";
import { create } from "jss";
import { jssPreset } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
// eslint-disable-next-line
import { document } from "window";
import { Provider } from "react-redux";
import configureStore from "./redux/configure-store";
import RootContainer from "./containers/root-container";

const store = configureStore();

const jss = create(jssPreset());

ReactDOM.render(
  <Provider store={store}>
    <JssProvider jss={jss}>
      <React.Fragment>
        <CssBaseline />
        <RootContainer />
      </React.Fragment>
    </JssProvider>
  </Provider>,
  // eslint-disable-next-line
  document.getElementById("app")
);
