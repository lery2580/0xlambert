import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter>
    <Suspense fallback={<div></div>}>
      <App />
    </Suspense>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
