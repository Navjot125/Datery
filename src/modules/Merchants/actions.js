import {
  MERCHANT_FAIL, MERCHANT_REQUESTED, MERCHANT_SUCCESS, MERCHANTDETAILS_REQUESTED, MERCHANTDETAILS_SUCCESS, MERCHANTDETAILS_FAIL,
  FAVOURITE_FAIL, FAVOURITE_SUCCESS, FAVOURITE_REQUESTED, FAVOURITELIST_REQUESTED, FAVOURITELIST_SUCCESS, FAVOURITELIST_FAIL,
  REMOVE_FAVOURITE_REQUESTED, REMOVE_FAVOURITE_SUCCESS, REMOVE_FAVOURITE_FAIL, GUEST_FAVOURITE_REQUESTED, GUEST_FAVOURITE_SUCCESS, GUEST_FAVOURITE_FAIL, REMOVE_GUEST_FAVOURITE_SUCCESS, REMOVE_GUEST_FAVOURITE_FAIL, REMOVE_GUEST_FAVOURITE_REQUESTED, REMOVE_ALL_FAVOURITES
}
  from './types';

export const merchantRequest = (data) => {
   return {
    type: MERCHANT_REQUESTED,
    data,
   };
};

export const merchantSuccess = (data,params = {}) => ({
  type: MERCHANT_SUCCESS,
  data,
  params
});

export const merchantFail = () => ({
  type: MERCHANT_FAIL,
});


export const merchantDetailsRequest = (navigation) => {
  return {
    type: MERCHANTDETAILS_REQUESTED,
    // data,
    navigation,
  };
};

export const merchantDetailsSuccess = data => ({
  type: MERCHANTDETAILS_SUCCESS,
  data,
});

export const merchantDetailsFail = () => ({
  type: MERCHANTDETAILS_FAIL,
});

export const favouriteRequest = (navigation) => {
  return {
    type: FAVOURITE_REQUESTED,
    // data,
    navigation,
  };
};

export const favouriteSuccess = data => ({
  type: FAVOURITE_SUCCESS,
  data,
});

export const favouriteFail = () => ({
  type: FAVOURITE_FAIL,
});

export const favouriteListRequest = (navigation) => {
  return {
    type: FAVOURITELIST_REQUESTED,
    // data,
    navigation,
  };
};

export const favouriteListSuccess = data => ({
  type: FAVOURITELIST_SUCCESS,
  data,
});

export const favouriteListFail = () => ({
  type: FAVOURITELIST_FAIL,
});

export const removeFavouriteRequest = (navigation) => {
  return {
    type: REMOVE_FAVOURITE_REQUESTED,
    // data,
    navigation,
  };
};

export const removeFavouriteSuccess = data => ({
  type: REMOVE_FAVOURITE_SUCCESS,
  data,
});

export const removeFavouriteFail = () => ({
  type: REMOVE_FAVOURITE_FAIL,
});


export const guestFavouriteRequest = (data) => {
  // console.log(data, 'navo action');
  return {
    type: GUEST_FAVOURITE_REQUESTED,
    data
  };
};

export const guestFavouriteSuccess = data => ({
  type: GUEST_FAVOURITE_SUCCESS,
  data,
});

export const guestFavouriteFail = () => ({
  type: GUEST_FAVOURITE_FAIL,
});

export const removeGuestFavouriteRequest = (data) => {
  // console.log(data,'action');
  return {
    type: REMOVE_GUEST_FAVOURITE_REQUESTED,
    data,
  };
};

export const removeGuestFavouriteSuccess = () => ({
  type: REMOVE_GUEST_FAVOURITE_SUCCESS,
});

export const removeGuestFavouriteFail = () => ({
  type: REMOVE_GUEST_FAVOURITE_FAIL,
});

export const removeAllFavourites = () => ({
  type: REMOVE_ALL_FAVOURITES,
});
