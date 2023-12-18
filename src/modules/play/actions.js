import {
  PLAYDETAILS_REQUESTED, PLAY_SUCCESS, PLAY_FAIL, PLAYDETAILS_SUCCESS, PLAYDETAILS_FAIL,
  PLAYFAVOURITE_REQUESTED, PLAYFAVOURITE_SUCCESS, PLAYFAVOURITE_FAIL, PLAYFAVOURITELIST_REQUESTED,
  PLAYFAVOURITELIST_SUCCESS, PLAYFAVOURITELIST_FAIL, PLAY_REMOVE_FAVOURITE_REQUESTED, PLAY_REMOVE_FAVOURITE_SUCCESS,
  PLAY_REMOVE_FAVOURITE_FAIL, PLAY_GUEST_FAVOURITE_REQUESTED, PLAY_GUEST_FAVOURITE_SUCCESS, PLAY_GUEST_FAVOURITE_FAIL,
  PLAY_REMOVE_GUEST_FAVOURITE_REQUESTED, PLAY_REMOVE_GUEST_FAVOURITE_FAIL, PLAY_REMOVE_ALL_FAVOURITES, PLAY_REQUESTED
}
  from './types';

export const playRequest = (data) => {
  return {
    type: PLAY_REQUESTED,
    data,
  };
};

export const playSuccess = data => ({
  type: PLAY_SUCCESS,
  data,
});

export const playFail = () => ({
  type: PLAY_FAIL,
});


export const playDetailsRequest = (navigation) => {
  return {
    type: PLAYDETAILS_REQUESTED,
    // data,
    navigation,
  };
};

export const playDetailsSuccess = data => ({
  type: PLAYDETAILS_SUCCESS,
  data,
});

export const pPlayDetailsFail = () => ({
  type: PLAYDETAILS_FAIL,
});

export const playfavouriteRequest = (navigation) => {
  return {
    type: PLAYFAVOURITE_REQUESTED,
    // data,
    navigation,
  };
};

export const playfavouriteSuccess = data => ({
  type: PLAYFAVOURITE_SUCCESS,
  data,
});

export const playfavouriteFail = () => ({
  type: PLAYFAVOURITE_FAIL,
});

export const playfavouriteListRequest = (navigation) => {
  return {
    type: PLAYFAVOURITELIST_REQUESTED,
    // data,
    navigation,
  };
};

export const playfavouriteListSuccess = data => ({
  type: PLAYFAVOURITELIST_SUCCESS,
  data,
});

export const playfavouriteListFail = () => ({
  type: PLAYFAVOURITELIST_FAIL,
});

export const playremoveFavouriteRequest = (navigation) => {
  return {
    type: PLAY_REMOVE_FAVOURITE_REQUESTED,
    // data,
    navigation,
  };
};

export const playremoveFavouriteSuccess = data => ({
  type: PLAY_REMOVE_FAVOURITE_SUCCESS,
  data,
});

export const playremoveFavouriteFail = () => ({
  type: PLAY_REMOVE_FAVOURITE_FAIL,
});


export const playguestFavouriteRequest = (data) => {
  // console.log(data, 'navo action');
  return {
    type: PLAY_GUEST_FAVOURITE_REQUESTED,
    data
  };
};

export const playguestFavouriteSuccess = data => ({
  type: PLAY_GUEST_FAVOURITE_SUCCESS,
  data,
});

export const playguestFavouriteFail = () => ({
  type: PLAY_GUEST_FAVOURITE_FAIL,
});

export const playremoveGuestFavouriteRequest = (data) => {
  // console.log(data, 'action');
  return {
    type: PLAY_REMOVE_GUEST_FAVOURITE_REQUESTED,
    data,
  };
};

export const playremoveGuestFavouriteSuccess = () => ({
  type: PLAY_GUEST_FAVOURITE_SUCCESS,
});

export const playremoveGuestFavouriteFail = () => ({
  type: PLAY_REMOVE_GUEST_FAVOURITE_FAIL,
});

export const playremoveAllFavourites = () => ({
  type: PLAY_REMOVE_ALL_FAVOURITES,
});
