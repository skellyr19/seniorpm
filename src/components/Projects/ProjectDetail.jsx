import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import airtable from "../../airtable";
import ModalOK from "../../components/ModalOK";

export class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.fetchRecord = this.fetchRecord.bind(this);
    this.fetchTasks = this.fetchTasks.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
    this.addTask = this.addTask.bind(this);
    this.modalOK = React.createRef();
    this.state = {
      project: {},
      newTask: {
        name: null,
        status: null
      }
    };
  }

  showModal() {
    this.modalOK.current.show();
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
    }
  }

  async addTask() {
    var { project } = this.state;
    var newTask = {
      fields: {
        Name: this.taskName.value,
        Status: this.taskStatus.value,
        Project: [project.fields.RecId]
      }
    };
    var resp = await fetch(airtable.createRecord("Task", newTask)).catch(
      err => {
        console.log(err);
      }
    );

    if (resp.status >= 200 && resp.status < 300) {
      // console.log(resp);
      this.showModal();

      // reload project and tasks
      await this.fetchTasks(project);
      this.setState({ project });

      // clear inputs
      this.taskName.value = null;
    }
  }

  render() {
    var { project } = this.state;
    return (
      <div className="d-flex flex-column h-100 pt-2">
        {project && project.fields && project.fields.Name ? (
          <div>
            <Link
              to={"/project/edit/" + project.fields.RecId}
              className="btn btn-sm btn-outline-primary float-right"
            >
              Edit Project
            </Link>
            <h3>
              {project.fields.Name} <small>by {project.fields.OwnerName}</small>
            </h3>
            <p>
              {project.fields.Full}
              {project.fields.Mentor
                ? " " + project.fields.Mentor + " is my mentor."
                : ""}
            </p>
            <h5>
              Tasks
              <span className="ml-1 badge badge-pill badge-primary">
                {project.fields.Tasks.length}
              </span>
            </h5>
            <ul className="list-group py-2">
              <li className="list-group-item">
                <div className="row small">
                  <div className="col-6">Task Name</div>
                  <div className="col-2">Status</div>
                  <div className="col-1">Date</div>
                  <div className="col-auto" />
                </div>
              </li>
              {project.fields.Tasks && project.fields.Tasks.length > 0 ? (
                project.fields.Tasks.map((item, idx) => (
                  <li
                    key={idx}
                    className="list-group-item list-group-item-action d-block py-1"
                  >
                    <div className="row flex-nowrap align-items-center">
                      <div className="col-6">{item.fields.Name}</div>
                      <div className="col-2">
                        <span
                          className={
                            "badge small " +
                            (!item.fields.Status ||
                            item.fields.Status === "Not Started"
                              ? "badge-success"
                              : "badge-dark")
                          }
                        >
                          {!item.fields.Status
                            ? "Not Started"
                            : item.fields.Status}
                        </span>
                      </div>
                      <div className="col-2 text-truncate">
                        {new Date(item.fields.DateCreated).toLocaleDateString(
                          "en-US"
                        )}
                      </div>
                      <div className="col-auto text-right">
                        <Link
                          className="ml-2 small btn btn-sm btn-success"
                          to={"../task/edit/" + item.id}
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="list-group-item">(No tasks yet...)</li>
              )}
              <li className="list-group-item d-flex flex-ro align-items-center">
                <input
                  className="form-control mb-2 mr-2 w-100"
                  placeholder="New task name..."
                  required
                  ref={input => (this.taskName = input)}
                />
                <select
                  className="form-control mb-2 mr-2 w-100"
                  placeholder="Enter task status..."
                  required
                  ref={input => (this.taskStatus = input)}
                >
                  <option>What is the status?</option>
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Waiting</option>
                  <option>Complete</option>
                  <option>Overdue</option>
                </select>
                <button
                  className="btn btn-primary mb-2  w-100"
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
        <ModalOK ref={this.modalOK} />
      </div>
    );
  }
}

export default ProjectDetail;
