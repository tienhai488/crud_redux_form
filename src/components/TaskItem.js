import React, { Component } from "react";

class TaskItem extends Component {
  showStatusElement(id) {
    return (
      <span
        className={
          this.props.item.status ? "label label-danger" : "label label-info"
        }
        onClick={() => this.props.toggleStatus(id)}
      >
        {this.props.item.status === true ? "Kích Hoạt" : "Ẩn"}
      </span>
    );
  }

  render() {
    const {
      item,
      index,
      deleteTodo,
      handleTaskEdit,
      showForm,
      taskEdit,
      handleHiddenForm,
    } = this.props;
    return (
      <tr>
        <td>{index}</td>
        <td>{item.name}</td>
        <td className="text-center">{this.showStatusElement(item.id)}</td>
        <td className="text-center">
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => {
              handleTaskEdit(item);
              showForm();
            }}
          >
            <span className="fa fa-pencil mr-5"></span>Sửa
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              deleteTodo(item.id);
              if (item.id === taskEdit.id) {
                handleTaskEdit({});
                handleHiddenForm();
              }
            }}
          >
            <span className="fa fa-trash mr-5"></span>Xóa
          </button>
        </td>
      </tr>
    );
  }
}

export default TaskItem;
