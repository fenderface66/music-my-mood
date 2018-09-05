import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import "./index.css";
import App from "./containers/App/App";
import registerServiceWorker from "./registerServiceWorker";

const root: ?Element = document.getElementById("root");

if (root != null) {
  ReactDOM.render(
    <Provider store={configureStore()}>
      <App />
    </Provider>,
    root
  );
  registerServiceWorker();
}
