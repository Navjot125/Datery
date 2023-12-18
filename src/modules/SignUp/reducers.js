import { REMOVE_ALL_SIGNUP, SIGNUP_FAIL, SIGNUP_REQUESTED, SIGNUP_SUCCESS } from './types';

const INITIAL_STATE = {
  demo: null,
  role: null,
  signupSucessData: [],
};

// {user: 'Guest', id: 1}
// {user: 'Login User', id: 2}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP_REQUESTED:
      return {
        ...state,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupSucessData: action.data,
      };

    case SIGNUP_FAIL:
      return {
        ...state,
      };
    case REMOVE_ALL_SIGNUP:
      return {
        ...state,
        signupSucessData: []
      };

    default:
      return state;
  }
};
