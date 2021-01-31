import { combineReducers } from "redux";
import setModalReducer from "./registerModal";
import setFirstReducer from "./googleFirstLogin";

export default combineReducers({ setModalReducer, setFirstReducer });
