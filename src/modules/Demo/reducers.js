import {DEMO_FAIL, DEMO_REQUESTED, DEMO_SUCCESS} from './types';

const INITIAL_STATE = {
  demo: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // DEMO
    case DEMO_REQUESTED:
      return {
        ...state,
      };

    case DEMO_SUCCESS:
      return {
        ...state,
        demo: action.data,
      };

    case DEMO_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
};
