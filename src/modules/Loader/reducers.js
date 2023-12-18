import {SET_LOADER} from './types';

const INITIAL_STATE = {
  loader: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // SET LOADER
    case SET_LOADER:
      return {
        ...state,
        loader: action.data,
      };
    default:
      return state;
  }
};
