import React from "react";
import { Component } from "react";

export class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    console.log(localStorage.getItem("currentUserEmail"));
    this.setState({
      currentUser: {
        email: localStorage.getItem("currentUserEmail"),
        id: localStorage.getItem("currentUserId")
      }
    });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-danger">
        <img
          src="/Images/icon.png"
          className="img-fluid mr-2"
          style={{ height: "42px" }}
        />
        <span className="navbar-brand">Senior Project 2019</span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/project">
                Projects
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
          </ul>
          <ul className="navbar-nav">
            {this.state.currentUser && this.state.currentUser.email ? (
              <li className="nav-item">
                <a className="nav-link" href="/logout">
                  Logout {this.state.currentUser.email}
                </a>
              </li>
            ) : (
              <li className="nav-item">
                <a className="text-white mr-2" href="/login">
                  Login
                </a>
                |
                <a className="text-white ml-2" href="/newuser">
                  New User
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
