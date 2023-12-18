import {
  CARDALLDETAILS_REQUESTED, CARDALL_SUCCESS, CARDALL_FAIL, CARDALLDETAILS_SUCCESS, CARDALLDETAILS_FAIL,
  CARDFAVOURITE_REQUESTED, CARDFAVOURITE_SUCCESS, CARDFAVOURITE_FAIL, CARDFAVOURITELIST_REQUESTED,
  CARDFAVOURITELIST_SUCCESS, CARDFAVOURITELIST_FAIL, CARD_REMOVE_FAVOURITE_REQUESTED, CARD_REMOVE_FAVOURITE_SUCCESS,
  CARD_REMOVE_FAVOURITE_FAIL, CARD_GUEST_FAVOURITE_REQUESTED, CARD_GUEST_FAVOURITE_SUCCESS, CARD_GUEST_FAVOURITE_FAIL,
  CARD_REMOVE_GUEST_FAVOURITE_REQUESTED, CARD_REMOVE_GUEST_FAVOURITE_FAIL, CARD_REMOVE_ALL_FAVOURITES, CARDALL_REQUESTED, CARD_EDIT_FAVOURITES
}
  from './types';

export const CardAllRequest = (data) => {
  return {
    type: CARDALL_REQUESTED,
    data,
  };
};

export const CardEditRequest = (data) => {
  return {
    type: CARD_EDIT_FAVOURITES,
    data,
  };
};


export const CardAllSuccess = data => ({
  type: CARDALL_SUCCESS,
  data,
});

export const CardAllFail = () => ({
  type: CARDALL_FAIL,
});


export const CardAllDetailsRequest = (navigation) => {
  return {
    type: CARDALLDETAILS_REQUESTED,
    // data,
    navigation,
  };
};

export const CardAllDetailsSuccess = data => ({
  type: CARDALLDETAILS_SUCCESS,
  data,
});

export const CardAllDetailsFail = () => ({
  type: CARDALLDETAILS_FAIL,
});

export const CardfavouriteRequest = (navigation) => {
  return {
    type: CARDFAVOURITE_REQUESTED,
    // data,
    navigation,
  };
};

export const CardfavouriteSuccess = data => ({
  type: CARDFAVOURITE_SUCCESS,
  data,
});

export const CardfavouriteFail = () => ({
  type: CARDFAVOURITE_FAIL,
});

export const CardfavouriteListRequest = (navigation) => {
  return {
    type: CARDFAVOURITELIST_REQUESTED,
    // data,
    navigation,
  };
};

export const CardfavouriteListSuccess = data => ({

  type: CARDFAVOURITELIST_SUCCESS,
  data,
});

export const CardfavouriteListFail = () => ({
  type: CARDFAVOURITELIST_FAIL,
});

export const CardremoveFavouriteRequest = (navigation) => {
  return {
    type: CARD_REMOVE_FAVOURITE_REQUESTED,
    // data,
    navigation,
  };
};

export const CardremoveFavouriteSuccess = data => ({
  type: CARD_REMOVE_FAVOURITE_SUCCESS,
  data,
});

export const CardremoveFavouriteFail = () => ({
  type: CARD_REMOVE_FAVOURITE_FAIL,
});


export const CardguestFavouriteRequest = (data) => {
  // console.log(data, 'navo action');
  return {
    type: CARD_GUEST_FAVOURITE_REQUESTED,
    data
  };
};

export const CardguestFavouriteSuccess = data => ({
  type: CARD_GUEST_FAVOURITE_SUCCESS,
  data,
});

export const CardguestFavouriteFail = () => ({
  type: CARD_GUEST_FAVOURITE_FAIL,
});

export const CardremoveGuestFavouriteRequest = (data) => {
   return {
    type: CARD_REMOVE_GUEST_FAVOURITE_REQUESTED,
    data,
  };
};

export const CardremoveGuestFavouriteSuccess = () => ({
  type: CARD_GUEST_FAVOURITE_SUCCESS,
});

export const CardremoveGuestFavouriteFail = () => ({
  type: CARD_REMOVE_GUEST_FAVOURITE_FAIL,
});

export const CardremoveAllFavourites = () => ({
  type: CARD_REMOVE_ALL_FAVOURITES,
});
