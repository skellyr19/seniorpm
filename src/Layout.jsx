import React from "react";
import { Switch, Route } from "react-router-dom";
import { Nav, Home, About, NotFound } from "./components";
import { List, Detail, Edit } from "./components/Projects";

const Layout = () => (
  <div>
    <Nav />
    <div className="container-fluid">
      <div className="row">
        <div className="col-12" />
        <div className="col py-2">
          <Switch>
            <Route exact path={"/"} component={Home} />
            <Route exact path={"/project/edit/:id"} component={Edit} />
            <Route exact path={"/project/edit/"} component={Edit} />
            <Route exact path={"/project/:id"} component={Detail} />
            <Route exact path={"/project"} component={List} />
            <Route exact path={"/about"} component={About} />
            <Route path={"*"} component={NotFound} />
          </Switch>
        </div>
      </div>
    </div>
  </div>
);

export default Layout;
