import React from "react";

const CreateUser = () => (
  <div className="d-flex flex-column h-100">
    <h4>Create User Account</h4>
    <form>
      <div className="form-row py-2">
        <label htmlFor="inputName" className="col-sm-2">
          Name
        </label>
        <input
          type="text"
          className="form-control col"
          id="inputName"
          placeholder="Your full name"
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
  </div>
);

export default CreateUser;
