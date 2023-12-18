import {QUESTION_FAIL, QUESTION_REQUESTED, QUESTION_SUCCESS} from './types';


const INITIAL_STATE = {
  demo: null,
  role: null,
  questions: [],
  // forgotPassData: null,
  // otpVerificationData: [],
  // resetPassData: null,
  // deviceToken: null,
};


// {user: 'Guest', id: 1}
// {user: 'Login User', id: 2}

export default (state = INITIAL_STATE, action) => {
  // console.log(action,'++++++++++++++++++')
  switch (action.type) {
      case QUESTION_REQUESTED:
      return {
        ...state,
      };

    case QUESTION_SUCCESS:
      // console.log(action,'++++++++++++++++++')
      return {
        ...state,
        questions: action.data,
        
      };

    case QUESTION_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
};
