import { combineReducers } from "redux";
import auth from "./auth";
import room from "./room";
import reservation from "./reservation";
import town from "./town";
import tenant from './tenant';
import landlord from './landlord';
export default combineReducers({
  auth,
  room,
  reservation,
  town,
  tenant,
  landlord

});
