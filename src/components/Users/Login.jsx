import React, { Component, useReducer } from "react";
import { Link, withRouter } from "react-router-dom";
import jquery from "jquery";
import airtable from "../../airtable";
import ModalOK from "../../components/ModalOK";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
    this.modalOK = React.createRef();
    this.state = {
      user: {}
    };
  }

  showModal() {
    this.modalOK.current.show();
  }

  async fetchUser(email) {
    //console.log(id);
    var resp = await fetch(
      airtable.findRecords("User", "Email", email, "Grid%20view")
    ).catch(err => {
      console.log(err);
    });
    if (resp.status >= 200 && resp.status < 300) {
      var user = await resp.json();
      console.log("user from API", user);
      if (user.records && user.records.length === 1) {
        //this.setState({ user });
        this.setSession(user.records[0]);
      } else {
        console.log("User not found");
      }
    }
  }

  setSession(user) {
    localStorage.clear();
    localStorage.setItem("currentUserId", user.fields.RecId);
    localStorage.setItem("currentUserEmail", user.fields.Email);

    if (user.fields.Project && user.fields.Project[0]) {
      localStorage.setItem("currentUserProjectId", user.fields.Project[0]);
      this.props.history.push("/project/" + user.fields.Project[0]);
    } else {
      this.props.history.push("/project/edit");
    }
    window.location.reload();
  }

  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    var form = event.target;

    if (form[0].checkValidity() === false) {
      jquery(form).addClass("was-validated");
    } else {
      const formData = new FormData(form);
      // convert formData to json obj

      var user = {};
      formData.forEach(function(value, key) {
        user[key] = value;
      });
      user.id = this.props.match.params.id ? this.props.match.params.id : null;

      console.log(user["Email"]);
      this.fetchUser(user["Email"]);
    }
  }

  render() {
    return (
      <div className="d-flex flex-column h-100">
        <h4>Login</h4>
        <form onSubmit={this.onSubmit} noValidate="" name="formSubmit">
          <div className="form-row py-2">
            <label htmlFor="inputEmail" className="col-sm-2">
              Email
            </label>
            <input
              type="email"
              className="form-control col"
              id="inputEmail"
              placeholder="Your email address"
              name="Email"
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
              name="Password"
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
        <ModalOK ref={this.modalOK} message="OK, you're are now logged in" />
      </div>
    );
  }
}

export default withRouter(Login);
