import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import airtable from "../../airtable";
import jquery from "jquery";
import ModalOK from "../../components/ModalOK";

export class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleOk = this.handleOk.bind(this);
    //this.fetchRecord = this.fetchRecord.bind(this);
    this.modalOK = React.createRef();
    this.state = {
      user: {}
    };
  }

  showModal() {
    this.modalOK.current.show();
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

      this.saveUser(user);
    }
  }

  handleOk() {
    this.props.history.push("/project/edit");
  }

  async saveUser(userFields) {
    var resp;

    //console.log(userFields);

    if (userFields.id != null) {
      //user edit
      resp = await fetch(
        airtable.updateRecord("User", userFields.id, {
          fields: userFields
        })
      ).catch(err => {
        console.log(err);
      });
    } else {
      //user add
      delete userFields.id;
      resp = await fetch(
        airtable.createRecord("User", { fields: userFields })
      ).catch(err => {
        console.log(err);
      });
    }

    //console.log(resp);
    if (resp.status >= 200 && resp.status < 300) {
      console.log(resp);
      this.showModal();
    }
  }

  render() {
    return (
      <div className="d-flex flex-column h-100">
        <h4>{this.props.match.params.id ? "Edit" : "Add"} User Account</h4>
        <form onSubmit={this.onSubmit} noValidate="" name="formSubmit">
          <div className="form-row py-2">
            <label htmlFor="inputName" className="col-sm-2">
              Name
            </label>
            <input
              type="text"
              className="form-control col"
              id="inputName"
              name="Name"
              placeholder="Your full name"
              defaultValue={this.state.user.Name}
            />
          </div>
          <div className="form-row py-2">
            <label htmlFor="inputEmail" className="col-sm-2">
              Email
            </label>
            <input
              type="email"
              className="form-control col"
              id="inputEmail"
              name="Email"
              defaultValue={this.state.user.Email}
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
              name="Password"
              defaultValue={this.state.user.Password}
            />
          </div>
          <div className="form-row py-2">
            <label htmlFor="inputPasswordVerify" className="col-sm-2">
              Password (again)
            </label>
            <input
              type="password"
              className="form-control col"
              id="inputPasswordVerify"
            />
          </div>
          <div className="form-row py-2">
            <button type="submit" className="ml-auto btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        <ModalOK
          ref={this.modalOK}
          message="Great, now you're ready to set-up your project..."
          okHandler={this.handleOk}
        />
      </div>
    );
  }
}

export default withRouter(CreateUser);
