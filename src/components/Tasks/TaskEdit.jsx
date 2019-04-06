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
    var resp = await fetch(airtable.getRecord("Project", id)).catch(err => {
      console.log(err);
    });
    //console.log(resp);
    if (resp.status >= 200 && resp.status < 300) {
      var projectFields = await resp.json();
      console.log(projectFields);
      this.setState({ task: projectFields.fields });
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

      this.saveTask({ fields: task });
    }
  }

  async saveTask(task) {
    var resp = await fetch(airtable.createRecord("Task", task)).catch(err => {
      console.log(err);
    });
    //console.log(resp);
    if (resp.status >= 200 && resp.status < 300) {
      console.log(resp);
      this.showModal();
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
              value={this.state.task.Name}
              placeholder="Enter task name"
            />
          </div>
          <div className="form-row py-2">
            <label htmlFor="inputDesc" className="col-sm-2">
              Description
            </label>
            <textarea
              className="form-control col"
              id="inputDesc"
              name="Desc"
              value={this.state.task.Desc}
              placeholder="Enter task details"
            />
          </div>
          <div className="form-row py-2">
            <label htmlFor="inputType" className="col-sm-2">
              Status
            </label>
            <select
              className="form-control col mb-2"
              placeholder="Enter task status..."
              ref={input => (this.taskStatus = input)}
            >
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Waiting</option>
              <option>Complete</option>
              <option>Overdue</option>
            </select>
          </div>
          <div className="form-row py-2">
            <button type="button" className="btn btn-danger">
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
