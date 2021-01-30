import { SETORDER } from "../actions";

const INITIAL_STATE = {
  first: false
};

const setFirstReducer = (state = INITIAL_STATE, action: any): any => {
  switch (action.type) {
    case SETORDER.SET_FIRST:
      return { ...state, first: action.payload };
    default:
      return state;
  }
};

export default setFirstReducer;
