import React, { Component } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import TaskControl from "./TaskControl";
import { lowerCase } from "lodash";

const Courses = JSON.parse(localStorage.getItem("tasks")) || [];

class TodoList extends Component {
  state = {
    tasks: Courses,
    showForm: false,
    taskEdit: {},
    checkSearch: false,
    tasksSearch: [],
    sort: {
      sortBy: "name",
      sortStatus: 1,
    },
  };

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  guid() {
    return (
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      this.s4() +
      this.s4()
    );
  }

  handleShowForm = () => {
    this.setState({
      showForm: true,
    });
  };

  handleHiddenForm = () => {
    this.setState({
      showForm: false,
    });
  };

  addTodo = (todo) => {
    if (!todo.id) {
      todo.id = this.guid();
    }
    const newTasks = [...this.state.tasks, todo];
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    this.setState({
      tasks: newTasks,
    });
  };

  deleteTodo = (id) => {
    const tasks = this.state.tasks;
    const newTasks = tasks.filter((item) => item.id !== id);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    this.setState({
      tasks: newTasks,
    });
  };

  handleEdit = (obj) => {
    const tasks = this.state.tasks;
    const index = tasks.findIndex((item) => item.id === obj.id);
    console.log(index);
    tasks[index].name = obj.name;
    tasks[index].status = obj.status;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.setState({
      tasks,
      taskEdit: {},
      showForm: false,
    });
  };

  toggleStatus = (id) => {
    const tasks = this.state.tasks;
    const index = tasks.findIndex((item) => item.id === id);
    tasks[index].status = !tasks[index].status;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.setState({
      tasks,
    });
  };

  handleTaskEdit = (obj) => {
    this.setState({
      taskEdit: obj,
    });
  };

  onSearch = (keyword) => {
    if (keyword) {
      const tasks = this.state.tasks;
      const newTasks = tasks.filter((item) => {
        const name = item.name;
        return lowerCase(name).indexOf(lowerCase(keyword)) !== -1;
      });
      this.setState({
        checkSearch: true,
        tasksSearch: newTasks,
      });
    } else {
      this.setState({
        checkSearch: false,
        tasksSearch: [],
      });
    }
  };

  handleSort = (obj) => {
    const tasks = this.state.tasks;
    let arr_sort;
    if (obj.sortBy === "name") {
      console.log(obj);
      arr_sort = tasks.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA > nameB) {
          return obj.sortStatus;
        }
        if (nameA < nameB) {
          return -obj.sortStatus;
        }

        return 0;
      });
    } else if (obj.sortBy === "status") {
      console.log(obj);
      arr_sort = tasks.sort((a, b) => {
        if (a.status && !b.status) {
          return -obj.sortStatus;
        }
        if (!a.status && b.status) {
          return obj.sortStatus;
        }
        return 0;
      });
    }

    localStorage.setItem("tasks", JSON.stringify(arr_sort));

    this.setState({
      sort: obj,
      tasks: arr_sort,
    });
  };

  render() {
    const { tasks, showForm, taskEdit, checkSearch, tasksSearch, sort } =
      this.state;
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={"col-xs-4 col-sm-4 col-md-4 col-lg-4"}>
            {showForm && (
              <TaskForm
                hiddenForm={this.handleHiddenForm}
                addTodo={this.addTodo}
                taskEdit={taskEdit}
                handleEdit={this.handleEdit}
              />
            )}
          </div>
          <div
            className={
              showForm
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                if (taskEdit.id) {
                  this.setState({
                    taskEdit: {},
                  });
                } else {
                  showForm ? this.handleHiddenForm() : this.handleShowForm();
                }
              }}
            >
              <span className="fa fa-plus mr-5"></span>
              Thêm Công Việc
            </button>

            <TaskControl
              onSearch={this.onSearch}
              sort={sort}
              handleSort={this.handleSort}
            />

            <TaskList
              tasks={checkSearch ? tasksSearch : tasks}
              deleteTodo={this.deleteTodo}
              toggleStatus={this.toggleStatus}
              handleTaskEdit={this.handleTaskEdit}
              showForm={this.handleShowForm}
              taskEdit={taskEdit}
              handleHiddenForm={this.handleHiddenForm}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TodoList;
