import { SETORDER } from "../actions";

const INITIAL_STATE = {
  first: false
};

interface actionInterface {
  type: string;
  payload: boolean;
}

interface StateInterface {
  first: boolean;
}

const setFirstReducer = (
  state = INITIAL_STATE,
  action: actionInterface
): StateInterface => {
  switch (action.type) {
    case SETORDER.SET_FIRST:
      return { ...state, first: action.payload };
    default:
      return state;
  }
};

export default setFirstReducer;
