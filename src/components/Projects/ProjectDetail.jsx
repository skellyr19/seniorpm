import React from "react";
import { Component } from "react";
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
    console.log(resp);
    if (resp.status >= 200 && resp.status < 300) {
      var project = await resp.json();
      this.setState({ project });
    }
  }

  render() {
    var { project } = this.state;
    return (
      <div className="d-flex flex-column h-100 pt-2">
        {project && project.fields && project.fields.Name ? (
          <div>
            <h2>{project.fields.Name}</h2>
            <p>{project.fields.Full}</p>
          </div>
        ) : (
          <p>Project not found.</p>
        )}
      </div>
    );
  }
}

export default ProjectDetail;
