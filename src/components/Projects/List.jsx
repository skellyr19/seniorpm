import React, { Component } from "react";
import { Link } from "react-router-dom";

export class List extends Component {
  constructor(props) {
    super(props);
    this.doEdit = this.doEdit.bind(this);
    this.state = {
      projects: [
        { id: 123, name: "Project 1", student: "Jane Doe" },
        { id: 233, name: "Sr. PM App", student: "Ryan Skelly" },
        { id: 153, name: "Sign Build", student: "Mark Logan" }
      ],
      selected: {}
    };
  }

  doEdit(idx) {
    this.setState({
      selected: this.state.projects[idx]
    });
  }

  render() {
    return (
      <div className="d-flex flex-column h-100">
        <h3>Projects</h3>
        <ul className="list-group py-2">
          {this.state.projects && this.state.projects.length > 0
            ? this.state.projects.map((item, idx) => (
                <li
                  key={idx}
                  className="list-group-item list-group-item-action d-block py-1"
                >
                  <Link to={"project/" + item.id}>{item.name}</Link>
                  <Link
                    className="ml-2 small btn-link text-success"
                    to={"project/edit/" + item.id}
                  >
                    Edit
                  </Link>
                </li>
              ))
            : ""}
        </ul>
        <Link className="btn btn-dark btn-sm ml-1" to={"/project/edit"}>
          Add +
        </Link>
      </div>
    );
  }
}

export default List;
