import React from "react";
import { Component } from "react";
import airtable from "../../airtable";
import jquery from "jquery";
import ModalOK from "../../components/ModalOK";

export class ProjectEdit extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.fetchRecord = this.fetchRecord.bind(this);
    this.modalOK = React.createRef();
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
    //console.log(resp);
    if (resp.status >= 200 && resp.status < 300) {
      var projectFields = await resp.json();
      console.log(projectFields);
      this.setState({ project: projectFields.fields });
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
      const formData = new FormData(form);
      // convert formData to json obj

      var project = {};
      formData.forEach(function(value, key) {
        project[key] = value;
      });
      project.id = this.props.match.params.id
        ? this.props.match.params.id
        : null;

      this.saveProject(project);
    }
  }

  async saveProject(projectFields) {
    var resp;
    if (projectFields.id != null) {
      //project edit
      resp = await fetch(
        airtable.updateRecord("Project", projectFields.id, {
          fields: projectFields
        })
      ).catch(err => {
        console.log(err);
      });
    } else {
      //project add
      resp = await fetch(
        airtable.createRecord("Project", { fields: projectFields })
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
        <h4>{this.props.match.params.id ? "Edit" : "Add"} Project</h4>
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
              defaultValue={this.state.project.Name}
              placeholder="Enter project name"
            />
          </div>
          <div className="form-row py-2">
            <label htmlFor="inputDesc" className="col-sm-2">
              Description
            </label>
            <textarea
              className="form-control col"
              id="inputDesc"
              name="Full"
              defaultValue={this.state.project.Full}
              placeholder="Enter project description"
            />
          </div>
          <div className="form-row py-2">
            <label htmlFor="inputType" className="col-sm-2">
              Project Type
            </label>
            <select
              className="form-control col"
              id="inputType"
              name="ProjectType"
              defaultValue={this.state.project.ProjectType}
            >
              <option value="helping">Helping People / Organization</option>
              <option value="building">
                Career-oriented Learning / Building
              </option>
            </select>
          </div>
          <div className="form-row py-2">
            <label htmlFor="inputName" className="col-sm-2" required>
              Mentor
            </label>
            <input
              type="text"
              className="form-control col"
              id="inputName"
              name="Mentor"
              placeholder="Enter mentor's full name"
              defaultValue={this.state.project.Mentor}
              ref={input => (this.state.project.Mentor = input)}
            />
          </div>
          <div className="form-row py-2 d-none">
            <label className="col-sm-2">Standard Tasks</label>
            <div className="col">
              <small>These are tasks that all seniors must complete</small>
              <ul className="list-group">
                <li className="list-group-item">
                  Project idea proposal
                  <span className="ml-auto badge badge-success">complete</span>
                </li>
                <li className="list-group-item">
                  Project idea approved
                  <span className="ml-auto badge badge-success">complete</span>
                </li>
                <li className="list-group-item">
                  Mentor interview
                  <span className="ml-auto badge badge-success">complete</span>
                </li>
                <li className="list-group-item">
                  Fieldwork hours
                  <span className="ml-auto badge badge-success">
                    in-progress
                  </span>
                </li>
                <li className="list-group-item">
                  <button
                    type="btuton"
                    className="btn btn-sm btn-outline-primary"
                  >
                    Add Task +
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="form-row py-2 d-none">
            <label className="col-sm-2">Project Tasks</label>
            <div className="col">
              <small>These are custom tasks specific to this project</small>
              <ul className="list-group">
                <li className="list-group-item">
                  Task 1 <span className="badge badge-success">complete</span>
                </li>
                <li className="list-group-item">
                  Task 2 <span className="badge badge-primary">active</span>
                </li>
                <li className="list-group-item">
                  Task 3 <span className="badge badge-primary">active</span>
                </li>
                <li className="list-group-item">
                  Task 4 <span className="badge badge-warning">to do</span>
                </li>
                <li className="list-group-item">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                  >
                    Add Task +
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="form-row d-flex justify-content-end">
            <button type="button" className="btn btn-danger">
              Delete
            </button>
            <button type="submit" className="ml-1 btn btn-primary">
              Save
            </button>
          </div>
        </form>
        <ModalOK ref={this.modalOK} />
      </div>
    );
  }
}

export default ProjectEdit;
