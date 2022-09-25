import React, { Component } from "react";

import { connect } from "react-redux";
import * as action from "../actions";

class TaskForm extends Component {
  state = {
    id: this.props.taskEdit.id || "",
    name: this.props.taskEdit.name || "",
    status: this.props.taskEdit.status || true,
  };

  handleResetState = () => {
    this.setState({
      id: "",
      name: "",
      status: true,
    });
  };

  handleCancel = () => {
    this.props.onCloseForm();
    this.handleResetState();
  };

  handleSave = () => {
    if (this.state.name) {
      console.log("ON SAVE");
      this.state.id
        ? this.props.onUpdateTask(this.state)
        : this.props.onAddTask(this.state);
    }
    this.props.onCloseForm();
    this.handleResetState();
  };

  handleOnChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  };

  componentWillMount() {
    if (this.props.taskEdit && this.props.taskEdit.id !== null) {
      this.setState({
        id: this.props.taskEdit.id || "",
        name: this.props.taskEdit.name || "",
        status: this.props.taskEdit.status || true,
      });
    } else {
      this.handleResetState();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.taskEdit) {
      this.setState({
        id: nextProps.taskEdit.id || "",
        name: nextProps.taskEdit.name || "",
        status: nextProps.taskEdit.status || true,
      });
    } else {
      this.handleResetState();
    }
  }

  render() {
    const { onCloseForm } = this.props;
    const { name, status } = this.state;
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {!this.state.id ? "Thêm Công Việc" : "Cập Nhật Công Việc"}
            <span
              className="fa fa-times-circle text-right"
              onClick={onCloseForm}
            ></span>
          </h3>
        </div>
        <div className="panel-body">
          <form>
            <div className="form-group">
              <label>Tên :</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={this.handleOnChange}
                autoFocus={true}
              />
            </div>
            <label>Trạng Thái :</label>
            <select
              className="form-control"
              name="status"
              value={status}
              onChange={this.handleOnChange}
            >
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-warning"
                onClick={this.handleSave}
              >
                <span className="fa fa-plus mr-5"></span>Lưu Lại
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.handleCancel}
              >
                <span className="fa fa-close mr-5"></span>
                Hủy Bỏ
              </button>
            </div>
          </form>
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
    onAddTask: (task) => {
      dispatch(action.addTask(task));
    },
    onCloseForm: () => {
      dispatch(action.closeForm());
    },
    onUpdateTask: (task) => {
      dispatch(action.updateTask(task));
    },
    onUpdateTaskEdit: (task) => {
      dispatch(action.updateTaskEdit(task));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
