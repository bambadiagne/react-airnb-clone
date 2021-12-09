import {
  SIGN_IN_SUCCESS_ACTION,
  SIGN_UP_SUCCESS_ACTION,
  SIGN_IN_FAIL_ACTION,
  SIGN_UP_FAIL_ACTION,
  LOGOUT_ACTION,
} from "./types";

import AuthService from "../../services/auth/auth-service";

export const register = (signupData) => {
  AuthService.register(signupData)
    .then(
      (response) => {
        console.log("nice", response);
        return new Promise.resolve({
          type: SIGN_UP_SUCCESS_ACTION,
        });
      },
      (error) => {
        console.log("sldskl", signupData);

        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        return new Promise.reject({
          type: SIGN_UP_FAIL_ACTION,
        });
      }
    )
    .catch((err) => console.log("catch err", err));
};

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      dispatch({
        type: SIGN_IN_SUCCESS_ACTION,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SIGN_IN_FAIL_ACTION,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT_ACTION,
  });
};
