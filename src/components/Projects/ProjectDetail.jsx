import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import airtable from "../../airtable";

export class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.fetchRecord = this.fetchRecord.bind(this);
    this.state = {
      project: {}
    };
  }

  async componentDidMount() {
    if (this.props && this.props.match.params.id) {
      await this.fetchRecord(this.props.match.params.id);
    }
  }

  async fetchRecord(id) {
    //console.log(id);
    var resp = await fetch(airtable.getRecord("Project", id)).catch(err => {
      console.log(err);
    });
    if (resp.status >= 200 && resp.status < 300) {
      var project = await resp.json();
      await this.fetchTasks(project);
      this.setState({ project });
    }
  }

  async fetchTasks(Project) {
    var resp = await fetch(
      airtable.findRecords(
        "Task",
        "Project",
        Project.fields.Name,
        "Grid%20view"
      )
    ).catch(err => {
      console.log(err);
    });
    //console.log("Category",resp);
    if (resp.status >= 200 && resp.status < 300) {
      var task = await resp.json();
      Project.fields.Tasks = task.records;
      //this.setState({ Category });
    }
  }

  render() {
    var { project } = this.state;
    return (
      <div className="d-flex flex-column h-100 pt-2">
        {project && project.fields && project.fields.Name ? (
          <div>
            <h2>
              {project.fields.Name} ({project.fields.RecId})
            </h2>
            <p>{project.fields.Full}</p>
            Tasks: {project.fields.Tasks.length}
            <ul className="list-group py-2">
              {project.fields.Tasks && project.fields.Tasks.length > 0
                ? project.fields.Tasks.map((item, idx) => (
                    <li
                      key={idx}
                      className="list-group-item list-group-item-action d-block py-1"
                    >
                      {item.fields.Name} -{" "}
                      {!item.fields.Status ? "Not Started" : item.fields.Status}
                      <Link
                        className="ml-2 small btn-link text-success"
                        to={"task/edit/" + item.id}
                      >
                        Edit
                      </Link>
                    </li>
                  ))
                : ""}
            </ul>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default ProjectDetail;
