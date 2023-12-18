import {
  MERCHANT_FAIL, MERCHANT_REQUESTED, MERCHANT_SUCCESS, MERCHANTDETAILS_REQUESTED,
  MERCHANTDETAILS_SUCCESS, MERCHANTDETAILS_FAIL, FAVOURITE_REQUESTED, FAVOURITE_SUCCESS, FAVOURITE_FAIL, FAVOURITELIST_REQUESTED,
  FAVOURITELIST_SUCCESS, FAVOURITELIST_FAIL, REMOVE_FAVOURITE_REQUESTED, REMOVE_FAVOURITE_SUCCESS, REMOVE_FAVOURITE_FAIL,
  GUEST_FAVOURITE_REQUESTED, GUEST_FAVOURITE_SUCCESS, GUEST_FAVOURITE_FAIL, REMOVE_GUEST_FAVOURITE_REQUESTED,
  REMOVE_GUEST_FAVOURITE_SUCCESS, REMOVE_GUEST_FAVOURITE_FAIL, REMOVE_ALL_FAVOURITES,
} from './types';


const INITIAL_STATE = {
  demo: null,
  role: null,
  deviceToken: null,
  userToken: null,
  totalMerchant: 0,
  merchants: [],
  details: null,
  favourites: [],
  favouritesGuest: []
};

// {user: 'Guest', id: 1}
// {user: 'Login User', id: 2}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MERCHANT_REQUESTED:
      return {
        ...state,
      };

    case MERCHANT_SUCCESS: {
      const { data, params } = action || { data: {}, params: {} }
      let arr = []
       if (params.offset && params.offset > 0) {
        arr = [...state.merchants, ...data[0]?.data]
      }
      else {

        arr = [...data[0]?.data]
      }
      return {
        ...state,
        merchants: arr,
        totalMerchant: data[0].total
      };
    }
    case MERCHANT_FAIL:
      return {
        ...state,
        merchants: []
      };
    case MERCHANTDETAILS_REQUESTED:
      return {
        ...state,
      };

    case MERCHANTDETAILS_SUCCESS:
      return {
        ...state,
        details: action.data
      };

    case MERCHANTDETAILS_FAIL:
      return {
        ...state,
      };

    case FAVOURITE_REQUESTED:
      return {
        ...state,
      };

    case FAVOURITE_SUCCESS:
      return {
        ...state,
      };

    case FAVOURITE_FAIL:
      return {
        ...state,
      };
    case FAVOURITELIST_REQUESTED:
      return {
        ...state,
      };

    case FAVOURITELIST_SUCCESS:
      return {
        ...state,
        favourites: action.data
      };

    case FAVOURITELIST_FAIL:
      return {
        ...state,
      };

    case REMOVE_FAVOURITE_REQUESTED:
      return {
        ...state,
      };

    case REMOVE_FAVOURITE_SUCCESS:
      return {
        ...state,
        favourites: state.favourites.filter((item) => item.serviceId !== action.data)
      };

    case REMOVE_FAVOURITE_FAIL:
      return {
        ...state,
      };

    case GUEST_FAVOURITE_REQUESTED:
      return {
        ...state,
        favouritesGuest: state?.favouritesGuest ? [...state.favouritesGuest, action.data] : [action.data],
      };

    case GUEST_FAVOURITE_SUCCESS:
      return {
        ...state,
      };

    case GUEST_FAVOURITE_FAIL:
      return {
        ...state,
      };


    case REMOVE_GUEST_FAVOURITE_REQUESTED:
      return {
        ...state,
        favouritesGuest: state.favouritesGuest.filter((item) => item.serviceId !== action.data?.serviceId)
      };

    case REMOVE_GUEST_FAVOURITE_SUCCESS:
      return {
        ...state
      };

    case REMOVE_GUEST_FAVOURITE_FAIL:
      return {
        ...state,
      };

    case REMOVE_ALL_FAVOURITES:
      return {
        ...state,
        favouritesGuest: [],
        favourites: [],
      };

    default:
      return state;
  }
};
