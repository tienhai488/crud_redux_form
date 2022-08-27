import * as types from "../contants/ActionTypes";

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.types) {
    case types.LIST_ALL:
      return state;
    default:
      return state;
  }
};

export default reducer;
