import { lowerCase } from "lodash";
import * as type from "../constants/ActionTypes";

var listTodo = JSON.parse(localStorage.getItem("tasks")) || [];

var initialState = listTodo;

var s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

var guid = () => {
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};

var reducer = (state = initialState, action) => {
  switch (action.type) {
    case type.LIST_ALL:
      return state;
    case type.ADD_TASK:
      console.log(action.task);
      var { name, status, id } = action.task;
      var task = {
        id: id ? id : guid(),
        name,
        status,
      };
      var newTasks = [...state, task];
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks;
    case type.UPDATE_STATUS:
      var tasks = [...state];
      var index = tasks.findIndex((item) => item.id === action.id);
      console.log(index);
      tasks[index].status = !tasks[index].status;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      return tasks;
    case type.DELETE_TASK:
      var tasks = [...state];
      var newTasks = tasks.filter((item) => item.id !== action.id);
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return [...newTasks];
    case type.UPDATE_TASK:
      var task = action.task;
      var newTasks = [...state];
      var index = newTasks.findIndex((item) => item.id === task.id);
      console.log(index);
      newTasks[index].name = task.name;
      newTasks[index].status = task.status;
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return [...newTasks];
    case type.SORT_TASKS:
      var sort = action.sort;
      var tasks = [...state];
      let arr_sort;
      if (sort.sortBy === "name") {
        console.log(sort);
        arr_sort = tasks.sort((a, b) => {
          var nameA = a.name.toUpperCase();
          var nameB = b.name.toUpperCase();
          if (nameA > nameB) {
            return sort.sortStatus;
          }
          if (nameA < nameB) {
            return -sort.sortStatus;
          }
          return 0;
        });
      } else if (sort.sortBy === "status") {
        console.log(sort);
        arr_sort = tasks.sort((a, b) => {
          if (a.status && !b.status) {
            return -sort.sortStatus;
          }
          if (!a.status && b.status) {
            return sort.sortStatus;
          }
          return 0;
        });
      }
      //kiểm tra nếu không phải tasks search thì mới đc lưu vào data
      if (tasks.length === JSON.parse(localStorage.getItem("tasks")).length) {
        localStorage.setItem("sort", JSON.stringify(sort));
        localStorage.setItem("tasks", JSON.stringify(arr_sort));
      }
      return [...arr_sort];
    case type.SEARCH_TASKS:
      if (action.keyword) {
        var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        var newTasks = tasks.filter((item) => {
          var name = item.name;
          return lowerCase(name).indexOf(lowerCase(action.keyword)) !== -1;
        });
        return [...newTasks];
      } else {
        return JSON.parse(localStorage.getItem("tasks")) || [];
      }
    default:
      return state;
  }
};

export default reducer;
