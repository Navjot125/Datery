import {QUESTION_FAIL, QUESTION_REQUESTED, QUESTION_SUCCESS} from './types';


export const questionRequest = (data, navigation) => {
  return {
    type: QUESTION_REQUESTED,
    data,
    navigation,
  };
};

export const questionSuccess = data => ({
  type: QUESTION_SUCCESS,
  data,
});

export const questionFail = () => ({
  type: QUESTION_FAIL,
});
