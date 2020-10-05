import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <link rel="stylesheet" href="http://localhost:8000/staticfiles/test.css" />{" "}
    {/* stylesheet CDN, change to S3 in production */}
    <h1>Devroast</h1>
    <image alt="test image" src="http://localhost:8000/media/monkeygun.jpg" />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
