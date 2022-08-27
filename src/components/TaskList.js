import { lowerCase } from "lodash";
import React, { Component } from "react";
import TaskItem from "./TaskItem";
import { connect } from "react-redux";

class TaskList extends Component {
  state = {
    filterName: "",
    filterStatus: -1,
  };

  handleOnChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    console.log("data redux :", this.props.todos);
    let {
      tasks,
      deleteTodo,
      toggleStatus,
      handleTaskEdit,
      showForm,
      taskEdit,
      handleHiddenForm,
    } = this.props;
    const { filterName, filterStatus } = this.state;

    tasks = tasks.filter((item) => {
      const str = item.name;
      return lowerCase(str).indexOf(lowerCase(filterName)) !== -1;
    });

    tasks = tasks.filter((item) => {
      const temp = Math.floor(Number.parseInt(filterStatus));
      if (temp === -1) return true;
      else if (temp === 0) return item.status === false;
      else if (temp === 1) return item.status === true;
    });
    console.log("Tasks : ", tasks);

    return (
      <div className="row mt-15">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th className="text-center">STT</th>
                <th className="text-center">Tên</th>
                <th className="text-center">Trạng Thái</th>
                <th className="text-center">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="filterName"
                    value={filterName}
                    onChange={this.handleOnChange}
                  />
                </td>
                <td>
                  <select
                    className="form-control"
                    name="filterStatus"
                    value={filterStatus}
                    onChange={this.handleOnChange}
                  >
                    <option value={-1}>Tất Cả</option>
                    <option value={0}>Ẩn</option>
                    <option value={1}>Kích Hoạt</option>
                  </select>
                </td>
                <td></td>
              </tr>
              {/* {elmTasks} */}
              {tasks.map((item, index) => {
                return (
                  <TaskItem
                    key={item.id}
                    item={item}
                    index={index}
                    deleteTodo={deleteTodo}
                    toggleStatus={toggleStatus}
                    handleTaskEdit={handleTaskEdit}
                    showForm={showForm}
                    taskEdit={taskEdit}
                    handleHiddenForm={handleHiddenForm}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.tasks,
  };
};

export default connect(mapStateToProps, null)(TaskList);
