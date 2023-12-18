import {
  CHANGEPASSWORD_FAIL, CHANGEPASSWORD_REQUESTED, CHANGEPASSWORD_SUCCESS, LOGIN_FAIL, LOGIN_REQUESTED, LOGIN_SUCCESS, SIGNOUT_FAIL,
  SIGNOUT_REQUESTED, SIGNOUT_SUCCESS, REMOVE_ALL
} from './types';


const INITIAL_STATE = {
  demo: null,
  role: null,
  loginData: [],
  forgotPassData: null,
  otpVerificationData: [],
  resetPassData: null,
  deviceToken: null,
  userToken: null,
  datingData: [],
};

// {user: 'Guest', id: 1}
// {user: 'Login User', id: 2}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return {
        ...state,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loginData: action.data.UserData,
        userToken: action.data.Usertoken,
        datingData: action.data.userProfile,
        role: null,
      };

    case LOGIN_FAIL:
      return {
        ...state,
      };

    case SIGNOUT_REQUESTED:
      return {
        ...state,
      };

    case SIGNOUT_SUCCESS:
      return {
        ...INITIAL_STATE
      };

    case SIGNOUT_FAIL:
      return {
        ...state,
      };

    case CHANGEPASSWORD_REQUESTED:
      return {
        ...state,
      };

    case CHANGEPASSWORD_SUCCESS:
      return {
        ...state
      };

    case CHANGEPASSWORD_FAIL:
      return {
        ...state,
      };
    case REMOVE_ALL:
      return {
        ...state,
        loginData: [],
        userToken: null,
        datingData: []
      };

    default:
      return state;
  }
};
