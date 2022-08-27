import React, { Component } from "react";

class TaskForm extends Component {
  state = {
    id: this.props.taskEdit.id || "",
    name: this.props.taskEdit.name || "",
    status: this.props.taskEdit.status || true,
  };

  handleCancel = () => {
    this.props.hiddenForm();
    this.setState({
      id: "",
      name: "",
      status: true,
    });
  };

  handleSave = () => {
    if (this.state.name) {
      this.state.id
        ? this.props.handleEdit(this.state)
        : this.props.addTodo(this.state);
    }
    this.props.hiddenForm();
    this.setState({
      id: "",
      name: "",
      status: true,
    });
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
      this.setState({
        id: "",
        name: "",
        status: true,
      });
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
      this.setState({
        id: "",
        name: "",
        status: true,
      });
    }
  }

  render() {
    console.log(this.state.id);
    console.log(this.props.taskEdit);
    const { hiddenForm } = this.props;
    const { name, status } = this.state;
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {!this.state.id ? "Thêm Công Việc" : "Cập Nhật Công Việc"}
            <span
              className="fa fa-times-circle text-right"
              onClick={hiddenForm}
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

export default TaskForm;
