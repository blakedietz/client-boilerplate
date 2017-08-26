import React from "react";
import ReactDOM from "react-dom";
import "./app.css";

ReactDOM.render(
  <button
    onClick={() => {
      console.log("working");
    }}
  >
    Click
  </button>,
  // eslint-disable-next-line no-undef
  document.getElementById("app")
);
