import React from "react";

const Edit = ({ match, props }) => (
  <div className="d-flex flex-column h-100">
    <h4>{match.params.id ? "Edit" : "Add"} Project</h4>
    <form>
      <div className="form-row py-2">
        <label htmlFor="inputName" className="col-sm-2">
          Name
        </label>
        <input
          type="text"
          className="form-control col"
          id="inputName"
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
          placeholder="Enter project description"
        />
      </div>
      <div className="form-row py-2">
        <label htmlFor="inputType" className="col-sm-2">
          Project Type
        </label>
        <select className="form-control col" id="inputType">
          <option>Helping People / Organization</option>
          <option>Career-oriented Learning</option>
        </select>
      </div>
      <div className="form-row py-2">
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
              <span className="ml-auto badge badge-success">in-progress</span>
            </li>
            <li className="list-group-item">
              <button type="btuton" className="btn btn-sm btn-outline-primary">
                Add Task +
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="form-row py-2">
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
              <button type="btuton" className="btn btn-sm btn-outline-primary">
                Add Task +
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="form-row py-2">
        <button type="submit" className="ml-auto btn btn-primary">
          Save
        </button>
      </div>
    </form>
  </div>
);

export default Edit;
