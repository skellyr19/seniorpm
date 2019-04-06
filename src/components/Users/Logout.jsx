import React, { Component } from "react";

export class Logout extends Component {
  componentDidMount() {
    localStorage.clear();
    this.props.history.push("/");
    window.location.reload();
  }

  render() {
    return (
      <div className="d-flex flex-column h-100">
        <h4>Logged Out</h4>
      </div>
    );
  }
}

export default Logout;
