import {REMOVE_ALL_SIGNUP, SIGNUP_FAIL, SIGNUP_REQUESTED, SIGNUP_SUCCESS} from './types';


export const signupRequest = (data, navigation) => {
  return {
    type: SIGNUP_REQUESTED,
    data,
    navigation,
  };
};

export const signupSuccess = data => ({
  type: SIGNUP_SUCCESS,
  data,
});

export const signupFail = () => ({
  type: SIGNUP_FAIL,
});
export const removeAllSignupData = () => ({
  type: REMOVE_ALL_SIGNUP,
});
