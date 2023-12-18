import {
  LEARNALL_FAIL, LEARNALL_REQUESTED, LEARNALL_SUCCESS, LEARNALLDETAILS_REQUESTED,
  LEARNALLDETAILS_SUCCESS, LEARNALLDETAILS_FAIL, LEARNFAVOURITELIST_FAIL, LEARNFAVOURITELIST_REQUESTED,
  LEARNFAVOURITELIST_SUCCESS, LEARN_GUEST_FAVOURITE_FAIL, LEARN_GUEST_FAVOURITE_REQUESTED, LEARN_GUEST_FAVOURITE_SUCCESS,
  LEARN_REMOVE_ALL_FAVOURITES, LEARN_REMOVE_FAVOURITE_FAIL, LEARN_REMOVE_FAVOURITE_REQUESTED,
  LEARN_REMOVE_FAVOURITE_SUCCESS, LEARN_REMOVE_GUEST_FAVOURITE_FAIL, LEARN_REMOVE_GUEST_FAVOURITE_REQUESTED,
  LEARN_REMOVE_GUEST_FAVOURITE_SUCCESS
} from './types';


const INITIAL_STATE = {
  demo: null,
  role: null,
  deviceToken: null,
  userToken: null,
  learns: [],
  details: null,
  favourites: [],
  favouritesGuest: [],
};

// {user: 'Guest', id: 1}
// {user: 'Login User', id: 2}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LEARNALL_REQUESTED:
      return {
        ...state,
      };

    case LEARNALL_SUCCESS:
      // console.log("ACTION_____", action);
      return {
        ...state,
        learns: action.data

      };

    case LEARNALL_FAIL:
      return {
        ...state,
        learns: []
      };
    case LEARNALLDETAILS_REQUESTED:
      return {
        ...state,
      };

    case LEARNALLDETAILS_SUCCESS:
      return {
        ...state,
        details: action.data
      };

    case LEARNALLDETAILS_FAIL:
      return {
        ...state,
      };

    case LEARNFAVOURITELIST_REQUESTED:
      return {
        ...state,
      };

    case LEARNFAVOURITELIST_FAIL:
      return {
        ...state,
      };
    case LEARNFAVOURITELIST_REQUESTED:
      return {
        ...state,
      };

    case LEARNFAVOURITELIST_SUCCESS:
      return {
        ...state,
        favourites: action.data
      };

    case LEARNFAVOURITELIST_FAIL:
      return {
        ...state,
      };

    case LEARN_REMOVE_FAVOURITE_REQUESTED:
      return {
        ...state,
      };

    case LEARN_REMOVE_FAVOURITE_SUCCESS:
      return {
        ...state,
        favourites: state.favourites.filter((item) => item.serviceId !== action.data)
      };

    case LEARN_REMOVE_FAVOURITE_FAIL:
      return {
        ...state,
      };

    case LEARN_GUEST_FAVOURITE_REQUESTED:
      return {
        ...state,
        favouritesGuest: state?.favouritesGuest ? [...state.favouritesGuest, action.data] : [action.data],
      };

    case LEARN_GUEST_FAVOURITE_SUCCESS:
      return {
        ...state,
      };

    case LEARN_GUEST_FAVOURITE_FAIL:
      return {
        ...state,
      };


    case LEARN_REMOVE_GUEST_FAVOURITE_REQUESTED:
      return {
        ...state,
        favouritesGuest: state.favouritesGuest.filter((item) => item.serviceId !== action.data?.serviceId)
      };

    case LEARN_REMOVE_GUEST_FAVOURITE_SUCCESS:
      return {
        ...state
      };

    case LEARN_REMOVE_GUEST_FAVOURITE_FAIL:
      return {
        ...state,
      };

    case LEARN_REMOVE_ALL_FAVOURITES:
      return {
        ...state,
        favouritesGuest: [],
        favourites: [],
      };

    default:
      return state;
  }
};
