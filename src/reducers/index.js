import { combineReducers } from "redux";
import tasks from "./tasks";
import isDisplayForm from "./isDisplayForm";
import taskEdit from "./taskEdit";
import filterTable from "./filterTable";

const myReducer = combineReducers({
  tasks,
  isDisplayForm,
  taskEdit,
  filterTable,
});

export default myReducer;
