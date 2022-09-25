import * as type from "../constants/ActionTypes";

const initialState = false;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case type.TOGGLE_FORM:
      return !state;
    case type.OPEN_FORM:
      return true;
    case type.CLOSE_FORM:
      return false;
    default:
      return state;
  }
};

export default reducer;
