import {
  PLAY_FAIL, PLAY_REQUESTED, PLAY_SUCCESS, PLAYDETAILS_REQUESTED,
  PLAYDETAILS_SUCCESS, PLAYDETAILS_FAIL, PLAYFAVOURITELIST_FAIL, PLAYFAVOURITELIST_REQUESTED,
  PLAYFAVOURITELIST_SUCCESS, PLAY_GUEST_FAVOURITE_FAIL, PLAY_GUEST_FAVOURITE_REQUESTED, PLAY_GUEST_FAVOURITE_SUCCESS,
  PLAY_REMOVE_ALL_FAVOURITES, PLAY_REMOVE_FAVOURITE_FAIL, PLAY_REMOVE_FAVOURITE_REQUESTED,
  PLAY_REMOVE_FAVOURITE_SUCCESS, PLAY_REMOVE_GUEST_FAVOURITE_FAIL, PLAY_REMOVE_GUEST_FAVOURITE_REQUESTED,
  PLAY_REMOVE_GUEST_FAVOURITE_SUCCESS
} from './types';


const INITIAL_STATE = {
  demo: null,
  role: null,
  deviceToken: null,
  userToken: null,
  play: [],
  details: null,
  favourites: [],
  favouritesGuest: []
};

// {user: 'Guest', id: 1}
// {user: 'Login User', id: 2}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAY_REQUESTED:
      console.log(action)
      return {
        ...state,
      };

    case PLAY_SUCCESS:
      console.log("PLAY_SUCCESS, ACTION_____", action);
      return {
        ...state,
        play: action.data
      };

    case PLAY_FAIL:
      return {
        ...state,
        play: []
      };
    case PLAYDETAILS_REQUESTED:
      return {
        ...state,
      };

    case PLAYDETAILS_SUCCESS:
      return {
        ...state,
        details: action.data
      };

    case PLAYDETAILS_FAIL:
      return {
        ...state,
      };

    case PLAYFAVOURITELIST_REQUESTED:
      return {
        ...state,
      };

    case PLAYFAVOURITELIST_SUCCESS:
      return {
        ...state,
      };

    case PLAYFAVOURITELIST_FAIL:
      return {
        ...state,
      };
    case PLAYFAVOURITELIST_REQUESTED:
      return {
        ...state,
      };

    case PLAYFAVOURITELIST_SUCCESS:
      return {
        ...state,
        favourites: action.data
      };

    case PLAYFAVOURITELIST_FAIL:
      return {
        ...state,
      };

    case PLAY_REMOVE_FAVOURITE_REQUESTED:
      return {
        ...state,
      };

    case PLAY_REMOVE_FAVOURITE_SUCCESS:
      return {
        ...state,
        favourites: state.favourites.filter((item) => item.serviceId !== action.data)
      };

    case PLAY_REMOVE_FAVOURITE_FAIL:
      return {
        ...state,
      };

    case PLAY_GUEST_FAVOURITE_REQUESTED:
      return {
        ...state,
        favouritesGuest: state?.favouritesGuest ? [...state.favouritesGuest, action.data] : [action.data],
      };

    case PLAY_GUEST_FAVOURITE_SUCCESS:
      return {
        ...state,
      };

    case PLAY_GUEST_FAVOURITE_FAIL:
      return {
        ...state,
      };


    case PLAY_REMOVE_GUEST_FAVOURITE_REQUESTED:
      return {
        ...state,
        favouritesGuest: state.favouritesGuest.filter((item) => item.serviceId !== action.data?.serviceId)
      };

    case PLAY_REMOVE_GUEST_FAVOURITE_SUCCESS:
      return {
        ...state
      };

    case PLAY_REMOVE_GUEST_FAVOURITE_FAIL:
      return {
        ...state,
      };

    case PLAY_REMOVE_ALL_FAVOURITES:
      return {
        ...state,
        favouritesGuest: [],
        favourites: [],
      };

    default:
      return state;
  }
};
