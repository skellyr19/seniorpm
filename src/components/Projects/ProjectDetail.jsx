import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import airtable from "../../airtable";

export class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.fetchRecord = this.fetchRecord.bind(this);
    this.fetchTasks = this.fetchTasks.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
    this.addTask = this.addTask.bind(this);
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
      // await this.fetchUser(project);
      console.log("project from API", project);
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
    if (resp.status >= 200 && resp.status < 300) {
      var task = await resp.json();
      if (task.records) {
        Project.fields.Tasks = task.records;
      }
    }
  }

  async fetchUser(Project) {
    var resp = await fetch(
      airtable.findRecords(
        "User",
        "Project",
        Project.fields.Name,
        "Grid%20view"
      )
    ).catch(err => {
      console.log(err);
    });
    if (resp.status >= 200 && resp.status < 300) {
      var owner = await resp.json();
      if (owner.records) {
        Project.fields.Owner = owner.records[0];
      }
      //this.setState({ Project });
    }
  }

  async addTask() {
    // console.log(this.taskName.value);
    var { project } = this.state;
    var newTask = {
      fields: {
        Name: this.taskName.value,
        Project: [project.fields.RecId]
      }
    };
    var resp = await fetch(airtable.createRecord("Task", newTask)).catch(
      err => {
        console.log(err);
      }
    );
    console.log(resp);
  }

  render() {
    var { project } = this.state;
    return (
      <div className="d-flex flex-column h-100 pt-2">
        {project && project.fields && project.fields.Name ? (
          <div>
            <h2>
              {project.fields.Name} <small>by {project.fields.OwnerName}</small>
            </h2>

            <p>{project.fields.Full}</p>
            <h5>
              Tasks
              <span className="ml-1 badge badge-pill badge-primary">
                {project.fields.Tasks.length}
              </span>
            </h5>
            <ul className="list-group py-2">
              {project.fields.Tasks && project.fields.Tasks.length > 0 ? (
                project.fields.Tasks.map((item, idx) => (
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
              ) : (
                <li className="list-group-item">(No tasks yet...)</li>
              )}
              <li className="list-group-item d-inline">
                <input
                  className="form-control"
                  placeholder="Enter task description..."
                  ref={input => (this.taskName = input)}
                />
                <button
                  className="btn btn-sm btn-primary"
                  onClick={this.addTask}
                >
                  Add task
                </button>
              </li>
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
