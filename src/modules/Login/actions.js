import {
  CHANGEPASSWORD_FAIL,
  CHANGEPASSWORD_REQUESTED,
  CHANGEPASSWORD_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUESTED,
  LOGIN_SUCCESS,
  SIGNOUT_FAIL,
  SIGNOUT_REQUESTED,
  SIGNOUT_SUCCESS,
  REMOVE_ALL,
  FORGOT_PASSWORD_REQUESTED,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
} from "./types";

export const loginRequest = (data, navigation) => {
  return {
    type: LOGIN_REQUESTED,
    data,
    navigation,
  };
};

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  data,
});

export const loginFail = () => ({
  type: LOGIN_FAIL,
});

export const ForgotPasswordRequest = (data, navigation) => {
  return {
    type: FORGOT_PASSWORD_REQUESTED,
    data,
    navigation,
  };
};

export const ForgotPasswordSuccess = (data) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  data,
});

export const ForgotPasswordFail = () => ({
  type: FORGOT_PASSWORD_FAIL,
});

export const signOutRequest = (navigation) => {
  return {
    type: SIGNOUT_REQUESTED,
    // data,
    navigation,
  };
};

export const signOutSuccess = () => ({
  type: SIGNOUT_SUCCESS,
  // data,
});

export const signOutFail = () => ({
  type: SIGNOUT_FAIL,
});

export const changePasswordRequest = (data, navigation) => {
  return {
    type: CHANGEPASSWORD_REQUESTED,
    data,
    navigation,
  };
};

export const changePasswordSuccess = (data) => ({
  type: CHANGEPASSWORD_SUCCESS,
  data,
});

export const changePasswordFail = () => ({
  type: CHANGEPASSWORD_FAIL,
});
export const removeAll = () => ({
  type: REMOVE_ALL,
});
