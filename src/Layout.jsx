import React from "react";
import TaskList from "./components/Tasks/TaskList";
import TaskEdit from "./components/Tasks/TaskEdit";
import { Switch, Route } from "react-router-dom";
import { Nav, Home, About, NotFound } from "./components";
import { Login, Logout, CreateUser } from "./components/Users";
import { ProjectList, ProjectDetail, ProjectEdit } from "./components/Projects";

const Layout = () => (
  <div className="d-flex flex-column min-vh-100">
    <Nav />
    <div className="container-fluid flex-fill bg-light">
      <div className="row">
        <div className="col py-2">
          <Switch>
            <Route exact path={"/"} component={Home} />
            <Route exact path={"/login"} component={Login} />
            <Route exact path={"/logout"} component={Logout} />
            <Route exact path={"/newuser"} component={CreateUser} />
            <Route exact path={"/project/edit/:id"} component={ProjectEdit} />
            <Route exact path={"/project/edit/"} component={ProjectEdit} />
            <Route exact path={"/project/:id"} component={ProjectDetail} />
            <Route exact path={"/project"} component={ProjectList} />
            <Route exact path={"/task"} component={TaskList} />
            <Route exact path={"/task/edit/:id"} component={TaskEdit} />
            <Route exact path={"/about"} component={About} />
            <Route path={"*"} component={NotFound} />
          </Switch>
        </div>
      </div>
    </div>
  </div>
);

export default Layout;
