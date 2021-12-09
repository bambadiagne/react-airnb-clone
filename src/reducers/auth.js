import {
  SIGN_IN_SUCCESS_ACTION,
  SIGN_IN_FAIL_ACTION,
  SIGN_UP_SUCCESS_ACTION,
  SIGN_UP_FAIL_ACTION,
  LOGOUT_ACTION,
} from "../actions/auth/types";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SIGN_UP_SUCCESS_ACTION:
      return state;
    case SIGN_UP_FAIL_ACTION:
      return {
        ...state,
        isLoggedIn: false,
      };
    case SIGN_IN_SUCCESS_ACTION:
      return {
        ...state,
        isLoggedIn: true,
        user: payload,
      };
    case SIGN_IN_FAIL_ACTION:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT_ACTION:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
