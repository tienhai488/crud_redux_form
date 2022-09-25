import React, { Component } from "react";

import { connect } from "react-redux";
import * as action from "../actions";

class TaskItem extends Component {
  showStatusElement(id) {
    return (
      <span
        className={
          this.props.item.status ? "label label-danger" : "label label-info"
        }
        onClick={() => this.props.onUpdateStatus(id)}
      >
        {this.props.item.status === true ? "Kích Hoạt" : "Ẩn"}
      </span>
    );
  }

  handleButtonDelete = (item) => {
    this.props.onDeleteTask(item.id);
    if (item.id === this.props.taskEdit.id) {
      this.props.onUpdateTaskEdit({});
      this.props.onCloseForm();
    }
  };

  handleButtonEdit = (item) => {
    this.props.onUpdateTaskEdit(item);
    this.props.onOpenForm();
  };

  render() {
    const { item, index } = this.props;
    return (
      <tr>
        <td>{index}</td>
        <td>{item.name}</td>
        <td className="text-center">{this.showStatusElement(item.id)}</td>
        <td className="text-center">
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => this.handleButtonEdit(item)}
          >
            <span className="fa fa-pencil mr-5"></span>Sửa
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => this.handleButtonDelete(item)}
          >
            <span className="fa fa-trash mr-5"></span>Xóa
          </button>
        </td>
      </tr>
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
    onOpenForm: () => {
      dispatch(action.openForm());
    },
    onCloseForm: () => {
      dispatch(action.closeForm());
    },
    onUpdateStatus: (id) => {
      dispatch(action.updateStatus(id));
    },
    onDeleteTask: (id) => {
      dispatch(action.deleteTask(id));
    },
    onUpdateTaskEdit: (task) => {
      dispatch(action.updateTaskEdit(task));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
