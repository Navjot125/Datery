import {DEMO_FAIL, DEMO_REQUESTED, DEMO_SUCCESS, ROLE_FAIL, ROLE_REQUESTED, ROLE_SUCCESS} from './types';

// Demo
export const demoRequest = data => {
  return {
    type: DEMO_REQUESTED,
    data,
  };
};

export const demoSuccess = data => ({
  type: DEMO_SUCCESS,
  data,
});

export const demoFail = () => ({
  type: DEMO_FAIL,
});


export const roleRequest = data => {
  return {
    type: ROLE_REQUESTED,
    data,
  };
};

export const roleSuccess = data => ({
  type: ROLE_SUCCESS,
  data,
});

export const roleFail = () => ({
  type: ROLE_FAIL,
});
