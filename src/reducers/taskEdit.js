import * as type from "../constants/ActionTypes";

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case type.UPDATE_TASK_EDIT:
      return action.task;
    default:
      return state;
  }
};

export default reducer;
