import * as type from "../constants/ActionTypes";

export const listAll = () => {
  return {
    type: type.LIST_ALL,
  };
};

export const addTask = (task) => {
  return {
    type: type.ADD_TASK,
    task,
  };
};

export const deleteTask = (id) => {
  return {
    type: type.DELETE_TASK,
    id,
  };
};

export const updateTask = (task) => {
  return {
    type: type.UPDATE_TASK,
    task,
  };
};

export const sortTasks = (sort) => {
  return {
    type: type.SORT_TASKS,
    sort,
  };
};

export const searchTasks = (keyword) => {
  return {
    type: type.SEARCH_TASKS,
    keyword,
  };
};

export const toggleForm = () => {
  return {
    type: type.TOGGLE_FORM,
  };
};

export const openForm = () => {
  return {
    type: type.OPEN_FORM,
  };
};

export const closeForm = () => {
  return {
    type: type.CLOSE_FORM,
  };
};

export const updateStatus = (id) => {
  return {
    type: type.UPDATE_STATUS,
    id,
  };
};

export const updateTaskEdit = (task) => {
  return {
    type: type.UPDATE_TASK_EDIT,
    task,
  };
};

export const filterTable = (filter) => {
  return {
    type: type.FILTER_TABLE,
    filter,
  };
};
