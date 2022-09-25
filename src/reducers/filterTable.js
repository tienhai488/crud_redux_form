import * as type from "../constants/ActionTypes";

const initialState = {
  name: "",
  status: -1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case type.FILTER_TABLE:

    default:
      return state;
  }
};

export default reducer;
