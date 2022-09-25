import React, { Component } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import TaskControl from "./TaskControl";
import { lowerCase } from "lodash";

import { connect } from "react-redux";
import * as action from "../actions";

class TodoList extends Component {
  handleButtonAddTask = () => {
    if (this.props.taskEdit.id) {
      this.props.onUpdateTaskEdit({});
    } else {
      this.props.onToggleForm();
    }
  };

  render() {
    const { isDisplayForm } = this.props;
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={"col-xs-4 col-sm-4 col-md-4 col-lg-4"}>
            {isDisplayForm && <TaskForm />}
          </div>
          <div
            className={
              isDisplayForm
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleButtonAddTask}
            >
              <span className="fa fa-plus mr-5"></span>
              Thêm Công Việc
            </button>

            <TaskControl />

            <TaskList />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    isDisplayForm: state.isDisplayForm,
    taskEdit: state.taskEdit,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(action.toggleForm());
    },
    onUpdateTaskEdit: (task) => {
      dispatch(action.updateTaskEdit(task));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
