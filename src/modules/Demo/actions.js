import {DEMO_FAIL, DEMO_REQUESTED, DEMO_SUCCESS} from './types';

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
