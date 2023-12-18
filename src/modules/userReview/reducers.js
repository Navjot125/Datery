import {
  REVIEWALL_FAIL, REVIEWALL_REQUESTED, REVIEWALL_SUCCESS, REVIEWALLDETAILS_REQUESTED,
  REVIEWALLDETAILS_SUCCESS, REVIEWALLDETAILS_FAIL, REVIEWFAVOURITELIST_FAIL, REVIEWFAVOURITELIST_REQUESTED,
  REVIEWFAVOURITELIST_SUCCESS, REVIEW_GUEST_FAVOURITE_FAIL, REVIEW_GUEST_FAVOURITE_REQUESTED, REVIEW_GUEST_FAVOURITE_SUCCESS,
  REVIEW_REMOVE_ALL_FAVOURITES, REVIEW_REMOVE_FAVOURITE_FAIL, REVIEW_REMOVE_FAVOURITE_REQUESTED,
  REVIEW_REMOVE_FAVOURITE_SUCCESS, REVIEW_REMOVE_GUEST_FAVOURITE_FAIL, REVIEW_REMOVE_GUEST_FAVOURITE_REQUESTED,
  REVIEW_REMOVE_GUEST_FAVOURITE_SUCCESS
} from './types';


const INITIAL_STATE = {
  demo: null,
  role: null,
  deviceToken: null,
  userToken: null,
  userReview: [],
  details: null,
  favourites: [],
  favouritesGuest: []
};

// {user: 'Guest', id: 1}
// {user: 'Login User', id: 2}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REVIEWALL_REQUESTED:
      return {
        ...state,
      };

    case REVIEWALL_SUCCESS:
       return {
        ...state,
        userReview: action.data

      };

    case REVIEWALL_FAIL:
      return {
        ...state,
        REVIEWs: []
      };
    case REVIEWALLDETAILS_REQUESTED:
      return {
        ...state,
      };

    case REVIEWALLDETAILS_SUCCESS:
      return {
        ...state,
        details: action.data
      };

    case REVIEWALLDETAILS_FAIL:
      return {
        ...state,
      };

    case REVIEWFAVOURITELIST_REQUESTED:
      return {
        ...state,
      };

    case REVIEWFAVOURITELIST_SUCCESS:
      return {
        ...state,
      };

    case REVIEWFAVOURITELIST_FAIL:
      return {
        ...state,
      };
    case REVIEWFAVOURITELIST_REQUESTED:
      return {
        ...state,
      };

    case REVIEWFAVOURITELIST_SUCCESS:
      return {
        ...state,
        favourites: action.data
      };

    case REVIEWFAVOURITELIST_FAIL:
      return {
        ...state,
      };

    case REVIEW_REMOVE_FAVOURITE_REQUESTED:
      return {
        ...state,
      };

    case REVIEW_REMOVE_FAVOURITE_SUCCESS:
      return {
        ...state,
        favourites: state.favourites.filter((item) => item.serviceId !== action.data)
      };

    case REVIEW_REMOVE_FAVOURITE_FAIL:
      return {
        ...state,
      };

    case REVIEW_GUEST_FAVOURITE_REQUESTED:
      return {
        ...state,
        favouritesGuest: state?.favouritesGuest ? [...state.favouritesGuest, action.data] : [action.data],
      };

    case REVIEW_GUEST_FAVOURITE_SUCCESS:
      return {
        ...state,
      };

    case REVIEW_GUEST_FAVOURITE_FAIL:
      return {
        ...state,
      };


    case REVIEW_REMOVE_GUEST_FAVOURITE_REQUESTED:
      return {
        ...state,
        favouritesGuest: state.favouritesGuest.filter((item) => item.serviceId !== action.data?.serviceId)
      };

    case REVIEW_REMOVE_GUEST_FAVOURITE_SUCCESS:
      return {
        ...state
      };

    case REVIEW_REMOVE_GUEST_FAVOURITE_FAIL:
      return {
        ...state,
      };

    case REVIEW_REMOVE_ALL_FAVOURITES:
      return {
        ...state,
        favouritesGuest: [],
        favourites: [],
      };

    default:
      return state;
  }
};
