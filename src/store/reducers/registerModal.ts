import { SETMODAL } from "../actions";

const INITIAL_STATE = {
  signupModal: false,
  loginModal: false
};

const setModalReducer = (state = INITIAL_STATE, action: any): any => {
  switch (action.type) {
    case SETMODAL.SET_SIGNUP:
      return { ...state, signupModal: action.payload };
    case SETMODAL.SET_LOGIN:
      return { ...state, loginModal: action.payload };
    default:
      return state;
  }
};

export default setModalReducer;
