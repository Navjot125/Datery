import {
  CARDALL_FAIL, CARDALL_REQUESTED, CARDALL_SUCCESS, CARDALLDETAILS_REQUESTED,
  CARDALLDETAILS_SUCCESS, CARDALLDETAILS_FAIL, CARDFAVOURITELIST_FAIL, CARDFAVOURITELIST_REQUESTED,
  CARDFAVOURITELIST_SUCCESS, CARD_GUEST_FAVOURITE_FAIL, CARD_GUEST_FAVOURITE_REQUESTED, CARD_GUEST_FAVOURITE_SUCCESS,
  CARD_REMOVE_ALL_FAVOURITES, CARD_REMOVE_FAVOURITE_FAIL, CARD_REMOVE_FAVOURITE_REQUESTED,
  CARD_REMOVE_FAVOURITE_SUCCESS, CARD_REMOVE_GUEST_FAVOURITE_FAIL, CARD_REMOVE_GUEST_FAVOURITE_REQUESTED,
  CARD_REMOVE_GUEST_FAVOURITE_SUCCESS
} from './types';


const INITIAL_STATE = {
  demo: null,
  role: null,
  deviceToken: null,
  userToken: null,
  cards: [],
  details: null,
  favourites: [],
  favouritesGuest: [],
};

// {user: 'Guest', id: 1}
// {user: 'Login User', id: 2}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CARDALL_REQUESTED:
      return {
        ...state,
      };

    case CARDALL_SUCCESS:
      // console.log("ACTION_____", action);
      return {
        ...state,
        cards: action.data

      };

    case CARDALL_FAIL:
      return {
        ...state,
        cards: []
      };
    case CARDALLDETAILS_REQUESTED:
      return {
        ...state,
      };

    case CARDALLDETAILS_SUCCESS:
      return {
        ...state,
        details: action.data
      };

    case CARDALLDETAILS_FAIL:
      return {
        ...state,
      };

    case CARDFAVOURITELIST_REQUESTED:
      return {
        ...state,
      };

    case CARDFAVOURITELIST_FAIL:
      return {
        ...state,
      };
    case CARDFAVOURITELIST_REQUESTED:
      return {
        ...state,
      };

    case CARDFAVOURITELIST_SUCCESS:
      return {
        ...state,
        favourites: action.data
      };

    case CARDFAVOURITELIST_FAIL:
      return {
        ...state,
      };

    case CARD_REMOVE_FAVOURITE_REQUESTED:
      return {
        ...state,
      };

    case CARD_REMOVE_FAVOURITE_SUCCESS:
      return {
        ...state,
        favourites: state.favourites.filter((item) => item.serviceId !== action.data)
      };

    case CARD_REMOVE_FAVOURITE_FAIL:
      return {
        ...state,
      };

    case CARD_GUEST_FAVOURITE_REQUESTED:
      return {
        ...state,
        favouritesGuest: state?.favouritesGuest ? [...state.favouritesGuest, action.data] : [action.data],
      };

    case CARD_GUEST_FAVOURITE_SUCCESS:
      return {
        ...state,
      };

    case CARD_GUEST_FAVOURITE_FAIL:
      return {
        ...state,
      };


    case CARD_REMOVE_GUEST_FAVOURITE_REQUESTED:
      return {
        ...state,
        favouritesGuest: state.favouritesGuest.filter((item) => item.serviceId !== action.data?.serviceId)
      };

    case CARD_REMOVE_GUEST_FAVOURITE_SUCCESS:
      return {
        ...state
      };

    case CARD_REMOVE_GUEST_FAVOURITE_FAIL:
      return {
        ...state,
      };

    case CARD_REMOVE_ALL_FAVOURITES:
      return {
        ...state,
        favouritesGuest: [],
        favourites: [],
      };

    default:
      return state;
  }
};
