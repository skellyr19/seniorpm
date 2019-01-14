import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  render() {
    return (
      <div className="d-flex flex-column h-100">
        <h4>Login</h4>
        <form>
          <div className="form-row py-2">
            <label htmlFor="inputEmail" className="col-sm-2">
              Email
            </label>
            <input
              type="email"
              className="form-control col"
              id="inputEmail"
              placeholder="Your email address"
            />
          </div>
          <div className="form-row py-2">
            <label htmlFor="inputPassword" className="col-sm-2">
              Password
            </label>
            <input
              type="password"
              className="form-control col"
              id="inputPassword"
            />
          </div>
          <div className="form-row py-2">
            <Link to={"/newuser"} className="ml-auto btn btn-outline-primary">
              Create Account
            </Link>
            <button type="submit" className="ml-2 btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
