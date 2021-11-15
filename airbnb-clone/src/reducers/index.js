import { combineReducers } from "redux";
import auth from "./auth";
import room from "./room";
export default combineReducers({
  auth,
  room,
});
