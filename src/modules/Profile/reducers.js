import {
  ABOUT_COMFILITY_FAIL, ABOUT_COMFILITY_REQUESTED, ABOUT_COMFILITY_SUCCESS,
  DATING_PROFILE_REQUESTED, DATING_PROFILE_SUCCESS, DATING_PROFILE_FAIL, REMOVE_ALL_PROFILEDATA, TEMP_COORDINATES_REQUESTED, USER_TEMP_COORDINATES_REQUESTED, UPDATE_PROFILE_REQUESTED, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL
} from './types';

const INITIAL_STATE = {
  demo: null,
  role: null,
  loginData: [],
  deviceToken: null,
  userToken: null,
  datingData: null,
  privacyStatement: null,
  licences: null,
  cookies: null,
  termsOfUse: null,
  customerSupport: null,
  tempCoordinates: [],
  tempLocatioName: null,
  userTempCoordinates: [],
  userTempLocatioName: null
};

// {user: 'Guest', id: 1}
// {user: 'Login User', id: 2}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ABOUT_COMFILITY_REQUESTED:
      return {
        ...state,
      };

    case ABOUT_COMFILITY_SUCCESS:
      return {
        ...state,
        privacyStatement: action.data
      };

    case ABOUT_COMFILITY_FAIL:
      return {
        ...state,
      };
    case DATING_PROFILE_REQUESTED:
      return {
        ...state,
        datingData: action.data
      };

    case DATING_PROFILE_SUCCESS:
      return {
        ...state,
        datingData: action.data
      };

    case DATING_PROFILE_FAIL:
      return {
        ...state,
      };
    case TEMP_COORDINATES_REQUESTED:
      return {
        ...state,
        tempCoordinates: action.data?.coordinates,
        tempLocatioName: action.data?.city
      };
    case USER_TEMP_COORDINATES_REQUESTED:
      return {
        ...state,
        userTempCoordinates: action.data?.coordinates,
        userTempLocatioName: action.data?.city
      };

    case UPDATE_PROFILE_REQUESTED:
      return {
        ...state,
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
      };

    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
      };

    case REMOVE_ALL_PROFILEDATA:
      return {
        ...state,
        demo: null,
        role: null,
        loginData: [],
        deviceToken: null,
        userToken: null,
        datingData: null,
        privacyStatement: null,
        licences: null,
        cookies: null,
        termsOfUse: null,
        customerSupport: null,
        tempLocatioName: null,
        tempCoordinates: [],
        userTempLocatioName: null,
        userTempCoordinates: [],
      };

    default:
      return state;
  }
};
