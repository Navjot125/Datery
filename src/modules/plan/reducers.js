import {
  PLANALL_FAIL, PLANALL_REQUESTED, PLANALL_SUCCESS, PLANALLDETAILS_REQUESTED,
  PLANALLDETAILS_SUCCESS, PLANALLDETAILS_FAIL, PLANFAVOURITELIST_FAIL, PLANFAVOURITELIST_REQUESTED,
  PLANFAVOURITELIST_SUCCESS, PLAN_GUEST_FAVOURITE_FAIL, PLAN_GUEST_FAVOURITE_REQUESTED, PLAN_GUEST_FAVOURITE_SUCCESS,
  PLAN_REMOVE_ALL_FAVOURITES, PLAN_REMOVE_FAVOURITE_FAIL, PLAN_REMOVE_FAVOURITE_REQUESTED,
  PLAN_REMOVE_FAVOURITE_SUCCESS, PLAN_REMOVE_GUEST_FAVOURITE_FAIL, PLAN_REMOVE_GUEST_FAVOURITE_REQUESTED,
  PLAN_REMOVE_GUEST_FAVOURITE_SUCCESS
} from './types';


const INITIAL_STATE = {
  demo: null,
  role: null,
  deviceToken: null,
  userToken: null,
  Plan: [],
  details: null,
  favourites: [],
  favouritesGuest: [],
};

// {user: 'Guest', id: 1}
// {user: 'Login User', id: 2}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLANALL_REQUESTED:
      return {
        ...state,
      };

    case PLANALL_SUCCESS:
      // console.log("ACTION_____", action);
      return {
        ...state,
        Plan: action.data

      };

    case PLANALL_FAIL:
      return {
        ...state,
        Plan: []
      };
    case PLANALLDETAILS_REQUESTED:
      return {
        ...state,
      };

    case PLANALLDETAILS_SUCCESS:
      return {
        ...state,
        details: action.data
      };

    case PLANALLDETAILS_FAIL:
      return {
        ...state,
      };

    case PLANFAVOURITELIST_REQUESTED:
      return {
        ...state,
      };

    case PLANFAVOURITELIST_FAIL:
      return {
        ...state,
      };
    case PLANFAVOURITELIST_REQUESTED:
      return {
        ...state,
      };

    case PLANFAVOURITELIST_SUCCESS:
      return {
        ...state,
        favourites: action.data
      };

    case PLANFAVOURITELIST_FAIL:
      return {
        ...state,
      };

    case PLAN_REMOVE_FAVOURITE_REQUESTED:
      return {
        ...state,
      };

    case PLAN_REMOVE_FAVOURITE_SUCCESS:
      return {
        ...state,
        favourites: state.favourites.filter((item) => item.serviceId !== action.data)
      };

    case PLAN_REMOVE_FAVOURITE_FAIL:
      return {
        ...state,
      };

    case PLAN_GUEST_FAVOURITE_REQUESTED:
      return {
        ...state,
        favouritesGuest: state?.favouritesGuest ? [...state.favouritesGuest, action.data] : [action.data],
      };

    case PLAN_GUEST_FAVOURITE_SUCCESS:
      return {
        ...state,
      };

    case PLAN_GUEST_FAVOURITE_FAIL:
      return {
        ...state,
      };


    case PLAN_REMOVE_GUEST_FAVOURITE_REQUESTED:
      return {
        ...state,
        favouritesGuest: state.favouritesGuest.filter((item) => item.serviceId !== action.data?.serviceId)
      };

    case PLAN_REMOVE_GUEST_FAVOURITE_SUCCESS:
      return {
        ...state
      };

    case PLAN_REMOVE_GUEST_FAVOURITE_FAIL:
      return {
        ...state,
      };

    case PLAN_REMOVE_ALL_FAVOURITES:
      return {
        ...state,
        favouritesGuest: [],
        favourites: [],
      };

    default:
      return state;
  }
};
