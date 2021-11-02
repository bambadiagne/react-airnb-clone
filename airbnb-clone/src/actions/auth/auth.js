import {
   SIGN_IN_SUCCESS_ACTION,
   SIGN_UP_SUCCESS_ACTION,
   SIGN_IN_FAIL_ACTION,
   SIGN_UP_FAIL_ACTION,
   LOGOUT_ACTION,
  } from "./types";
  
  import AuthService from "../services/auth.service";
  
  export const register = (username, email, password) => (dispatch) => {
    return AuthService.register(username, email, password).then(
      (response) => {
        dispatch({
          type: SIGN_UP_SUCCESS_ACTION,
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
          type: SIGN_UP_FAIL_ACTION,
        });
  
  
        return Promise.reject();
      }
    );
  };
  
  export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
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
          type: SIGN_UP_FAIL_ACTION,
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
  