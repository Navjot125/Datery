import {
  ABOUT_COMFILITY_FAIL, ABOUT_COMFILITY_REQUESTED, ABOUT_COMFILITY_SUCCESS,
  DATING_PROFILE_REQUESTED, DATING_PROFILE_SUCCESS, DATING_PROFILE_FAIL, REMOVE_ALL_PROFILEDATA, TEMP_COORDINATES_REQUESTED, USER_TEMP_COORDINATES_REQUESTED, UPDATE_PROFILE_REQUESTED, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL
} from './types';

export const aboutComfilityRequest = (navigation) => {
  return {
    type: ABOUT_COMFILITY_REQUESTED,
    // data,
    navigation,
  };
};

export const aboutComfilitySuccess = data => ({
  type: ABOUT_COMFILITY_SUCCESS,
  data,
});

export const aboutComfilityFail = () => ({
  type: ABOUT_COMFILITY_FAIL,
});

export const datingProfileRequest = (navigation) => {
  // console.log("NNNN", navigation);
  return {
    type: DATING_PROFILE_REQUESTED,
    navigation,
  };
};

export const datingProfileSuccess = data => ({
  type: DATING_PROFILE_SUCCESS,
  data,
});

export const datingProfileFail = () => ({
  type: DATING_PROFILE_FAIL,
});

export const userTempCoordinates = (data) => ({
  type: USER_TEMP_COORDINATES_REQUESTED,
  data,
});
export const tempCoordinates = (data) => ({
  type: TEMP_COORDINATES_REQUESTED,
  data,
});

export const updateProfileRequest = (data) => {
  return {
    type: UPDATE_PROFILE_REQUESTED,
    data,
  };
};

export const updateProfileSuccess = () => ({
  type: UPDATE_PROFILE_SUCCESS,
});

export const updateProfileFail = () => ({
  type: UPDATE_PROFILE_FAIL,
});

export const removeAllProfileData = () => ({
  type: REMOVE_ALL_PROFILEDATA,
});
