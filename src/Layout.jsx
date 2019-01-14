import React from "react";
import { Switch, Route } from "react-router-dom";
import { Nav, Home, Project, NotFound } from "./components";

const Layout = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-12">
        <Nav />
      </div>
      <div className="col">
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/project"} component={Project} />
          <Route path={"*"} component={NotFound} />
        </Switch>
      </div>
    </div>
  </div>
);

export default Layout;
