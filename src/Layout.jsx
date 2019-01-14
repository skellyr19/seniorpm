import React from "react";
import { Switch, Route } from "react-router-dom";
import { Nav, Home, About, NotFound } from "./components";
import { Login, CreateUser } from "./components/Users";
import { List, Detail, Edit } from "./components/Projects";

const Layout = () => (
  <div className="d-flex flex-column min-vh-100">
    <Nav />
    <div className="container-fluid flex-fill bg-light">
      <div className="row">
        <div className="col py-2">
          <Switch>
            <Route exact path={"/"} component={Home} />
            <Route exact path={"/login"} component={Login} />
            <Route exact path={"/newuser"} component={CreateUser} />
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
