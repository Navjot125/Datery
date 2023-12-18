import { DEMO_FAIL, DEMO_REQUESTED, DEMO_SUCCESS, ROLE_FAIL, ROLE_REQUESTED, ROLE_SUCCESS } from './types';

const INITIAL_STATE = {
  demo: null,
  role: { user: 'Guest', id: 1 },
};

// {user: 'Guest', id: 1}
// {user: 'Login User', id: 2}

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

    case ROLE_REQUESTED:
      return {
        ...state,
      };

    case ROLE_SUCCESS:
      return {
        ...state,
        role: action.data,
      };

    case ROLE_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
};
