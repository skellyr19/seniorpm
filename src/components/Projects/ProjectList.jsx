import React, { Component } from "react";
import { Link } from "react-router-dom";
import airtable from "../../airtable";

export class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //TODO: Load the project list from the database/api
      projects: [],
      selected: {},
      page: 0,
      offset: 0
    };
  }

  async componentDidMount() {
    // first page
    await this.fetchProjects(this.state.page, this.state.offset);
  }
  async fetchProjects(pageNo, offset) {
    var _self = this;
    //if (pageNo===0){
    this.setState({ loading: true });
    //}

    var resp = await fetch(
      airtable.getPagedListView("Project", "Grid view", 12, offset)
    ).catch(err => {
      console.log(err);
    });
    if (resp.status >= 200 && resp.status < 300) {
      console.log("resp", resp);
      var json = await resp.json();
      const projects = json.records;

      // append the new items and update state
      this.setState({
        loading: false,
        offset: json.offset,
        projects: [...this.state.projects, ...projects]
      });
    }
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
                  <Link to={"project/" + item.id}>{item.fields.Name}</Link>
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

export default ProjectList;
