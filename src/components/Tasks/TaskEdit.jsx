import React from "react";
import { Component } from "react";
import airtable from "../../airtable";
import jquery from "jquery";
import ModalOK from "../../components/ModalOK";

export class TaskEdit extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.fetchRecord = this.fetchRecord.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.modalOK = React.createRef();
    this.state = {
      task: {}
    };
  }

  async componentDidMount() {
    if (this.props && this.props.match.params.id) {
      await this.fetchRecord(this.props.match.params.id);
    }
  }

  async fetchRecord(id) {
    //console.log(id);
    var resp = await fetch(airtable.getRecord("Task", id)).catch(err => {
      console.log(err);
    });

    if (resp.status >= 200 && resp.status < 300) {
      var taskObj = await resp.json();
      console.log(taskObj);
      this.setState({
        task: taskObj.fields,
        projectId: taskObj.fields.Project[0],
        taskId: taskObj.id
      });
    }
  }

  async deleteTask() {
    console.log("delete...", this.state.taskId);
    var resp = await fetch(
      airtable.deleteRecord("Task", this.state.taskId)
    ).catch(err => {
      console.log(err);
    });
    //console.log(resp);
    if (resp.status >= 200 && resp.status < 300) {
      this.props.history.push("/project/" + this.state.projectId);
    }
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
      const formData = new FormData(event.target);

      // convert formData to json obj
      var task = {};
      formData.forEach(function(value, key) {
        task[key] = value;
      });
      task.id = this.props.match.params.id ? this.props.match.params.id : null;
      this.saveTask(task);
    }
  }

  handleChange(event) {
    this.setState({
      task: {
        ...this.state.task,
        Desc: event.target.value
      }
    });
  }

  async saveTask(taskFields) {
    var resp;

    if (taskFields.id != null) {
      //task edit
      resp = await fetch(
        airtable.updateRecord("Task", taskFields.id, {
          fields: taskFields
        })
      ).catch(err => {
        console.log(err);
      });
    } else {
      resp = await fetch(airtable.createRecord("Task", taskFields)).catch(
        err => {
          console.log(err);
        }
      );
    }

    if (resp.status >= 200 && resp.status < 300) {
      // after updating task, redirect to project details
      this.props.history.push("/project/" + this.state.projectId);
    }
  }

  render() {
    return (
      <div className="d-flex flex-column h-100">
        <h4>{this.props.match.params.id ? "Edit" : "Add"} Task</h4>
        <form onSubmit={this.onSubmit} noValidate="" name="formSubmit">
          <div className="form-row py-2">
            <label htmlFor="inputName" className="col-sm-2" required>
              Name
            </label>
            <input
              type="text"
              className="form-control col"
              id="inputName"
              name="Name"
              defaultValue={this.state.task.Name}
              placeholder="Enter task name"
            />
          </div>
          <div className="form-row py-2">
            <label htmlFor="inputDesc" className="col-sm-2">
              Description
            </label>
            <textarea
              className="form-control col"
              value={this.state.task.Desc}
              onChange={this.handleChange}
              name="Desc"
            />
          </div>

          <div className="form-row py-2">
            <label htmlFor="inputType" className="col-sm-2">
              Status
            </label>
            <select
              className="form-control col mb-2"
              placeholder="Enter task status..."
              name="Status"
              defaultValue={this.state.task.Status}
              ref={input => (this.taskStatus = input)}
            >
              <option selected={this.state.task.Status === "Not Started"}>
                Not Started
              </option>
              <option selected={this.state.task.Status === "In Progress"}>
                In Progress
              </option>
              <option selected={this.state.task.Status === "Waiting"}>
                Waiting
              </option>
              <option selected={this.state.task.Status === "Complete"}>
                Complete
              </option>
              <option selected={this.state.task.Status === "Overdue"}>
                Overdue
              </option>
            </select>
          </div>
          <div className="form-row py-2">
            <button
              type="button"
              onClick={this.deleteTask}
              className="btn btn-danger"
            >
              Delete
            </button>
            <button type="submit" className="ml-auto btn btn-primary">
              Save
            </button>
          </div>
        </form>
        <ModalOK ref={this.modalOK} />
      </div>
    );
  }
}

export default TaskEdit;
