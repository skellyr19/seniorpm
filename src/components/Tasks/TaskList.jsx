import React, { Component } from "react";
import { Link } from "react-router-dom";
import airtable from "../../airtable";

export class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      selected: {},
      page: 0,
      offset: 0
    };
  }

  async componentDidMount() {
    await this.fetchTasks(this.state.page, this.state.offset);
  }

  async fetchTasks(pageNo, offset) {
    //if (pageNo===0){
    this.setState({ loading: true });
    //}

    var resp = await fetch(
      airtable.getPagedListView("Task", "Grid view", 12, offset)
    ).catch(err => {
      console.log(err);
    });
    if (resp.status >= 200 && resp.status < 300) {
      console.log("resp", resp);
      var json = await resp.json();
      const tasks = json.records;

      // append the new items and update state
      this.setState({
        loading: false,
        offset: json.offset,
        tasks: [...this.state.tasks, ...tasks]
      });
    }
  }
  render() {
    return (
      <div className="d-flex flex-column h-100">
        <h3>Tasks</h3>
        <ul className="list-group py-2">
          {this.state.tasks && this.state.tasks.length > 0
            ? this.state.tasks.map((item, idx) => (
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
        <Link className="btn btn-dark btn-sm ml-1" to={"/project/edit"}>
          Add +
        </Link>
      </div>
    );
  }
}

export default TaskList;
