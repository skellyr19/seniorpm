import React from "react";
import { render } from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Layout from "./Layout";

const hist = createBrowserHistory({});

render(
  <Router history={hist}>
    <Layout />
  </Router>,
  document.getElementById("root")
);
