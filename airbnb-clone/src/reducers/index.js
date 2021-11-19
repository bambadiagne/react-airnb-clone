import { combineReducers } from "redux";
import auth from "./auth";
import room from "./room";
import reservation from "./reservation";
export default combineReducers({
  auth,
  room,
  reservation,
});
