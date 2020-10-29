import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import configureStore from "./state/store/configureStore";
import { StripeProvider } from "react-stripe-elements";

const store = configureStore();

window.store = store;

let apiUrl;
if (process.env.NODE_ENV === "production") {
  apiUrl = "https://good-morning-news-team1.herokuapp.com/api/v1";
} else {
  apiUrl = "http://localhost:3000/api/v1";
}

axios.defaults.baseURL = apiUrl;

ReactDOM.render(
  <StripeProvider apiKey="pk_test_51HdYrMDq51jzAKNH4YJ57mqONMDOMjEbIiQxTz1Tm52eSsWwXZZTTVKKvHmjNljMflZ8nmeJdz4SyBzK6IuwBt0I00XuNFcgTi">
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </StripeProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
