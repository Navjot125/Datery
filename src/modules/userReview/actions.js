import {
  REVIEWALLDETAILS_REQUESTED, REVIEWALL_SUCCESS, REVIEWALL_FAIL, REVIEWALLDETAILS_SUCCESS, REVIEWALLDETAILS_FAIL,
  REVIEWFAVOURITE_REQUESTED, REVIEWFAVOURITE_SUCCESS, REVIEWFAVOURITE_FAIL, REVIEWFAVOURITELIST_REQUESTED,
  REVIEWFAVOURITELIST_SUCCESS, REVIEWFAVOURITELIST_FAIL, REVIEW_REMOVE_FAVOURITE_REQUESTED, REVIEW_REMOVE_FAVOURITE_SUCCESS,
  REVIEW_REMOVE_FAVOURITE_FAIL, REVIEW_GUEST_FAVOURITE_REQUESTED, REVIEW_GUEST_FAVOURITE_SUCCESS, REVIEW_GUEST_FAVOURITE_FAIL,
  REVIEW_REMOVE_GUEST_FAVOURITE_REQUESTED, REVIEW_REMOVE_GUEST_FAVOURITE_FAIL, REVIEW_REMOVE_ALL_FAVOURITES, REVIEWALL_REQUESTED
}
  from './types';

export const ReviewAllRequest = (data) => {
  return {
    type: REVIEWALL_REQUESTED,
    data,
  };
};

export const ReviewAllSuccess = data => ({
  type: REVIEWALL_SUCCESS,
  data,
});

export const ReviewAllFail = () => ({
  type: REVIEWALL_FAIL,
});


export const ReviewAllDetailsRequest = (navigation) => {
  return {
    type: REVIEWALLDETAILS_REQUESTED,
    // data,
    navigation,
  };
};

export const ReviewAllDetailsSuccess = data => ({
  type: REVIEWALLDETAILS_SUCCESS,
  data,
});

export const ReviewAllDetailsFail = () => ({
  type: REVIEWALLDETAILS_FAIL,
});

export const ReviewfavouriteRequest = (navigation) => {
  return {
    type: REVIEWFAVOURITE_REQUESTED,
    // data,
    navigation,
  };
};

export const ReviewfavouriteSuccess = data => ({
  type: REVIEWFAVOURITE_SUCCESS,
  data,
});

export const ReviewfavouriteFail = () => ({
  type: REVIEWFAVOURITE_FAIL,
});

export const ReviewfavouriteListRequest = (navigation) => {
  return {
    type: REVIEWFAVOURITELIST_REQUESTED,
    // data,
    navigation,
  };
};

export const ReviewfavouriteListSuccess = data => ({
  type: REVIEWFAVOURITELIST_SUCCESS,
  data,
});

export const ReviewfavouriteListFail = () => ({
  type: REVIEWFAVOURITELIST_FAIL,
});

export const ReviewremoveFavouriteRequest = (navigation) =>({
    type: REVIEW_REMOVE_FAVOURITE_REQUESTED,
    navigation,
  })

export const ReviewremoveFavouriteSuccess = data => ({
  type: REVIEW_REMOVE_FAVOURITE_SUCCESS,
  data,
});

export const ReviewremoveFavouriteFail = () => ({
  type: REVIEW_REMOVE_FAVOURITE_FAIL,
});


export const ReviewguestFavouriteRequest = (data) => {
  // console.log(data, 'navo action');
  return {
    type: REVIEW_GUEST_FAVOURITE_REQUESTED,
    data
  };
};

export const ReviewguestFavouriteSuccess = data => ({
  type: REVIEW_GUEST_FAVOURITE_SUCCESS,
  data,
});

export const ReviewguestFavouriteFail = () => ({
  type: REVIEW_GUEST_FAVOURITE_FAIL,
});

export const ReviewremoveGuestFavouriteRequest = (data) => {
  // console.log(data, 'action');
  return {
    type: REVIEW_REMOVE_GUEST_FAVOURITE_REQUESTED,
    data,
  };
};

export const ReviewremoveGuestFavouriteSuccess = () => ({
  type: REVIEW_GUEST_FAVOURITE_SUCCESS,
});

export const ReviewremoveGuestFavouriteFail = () => ({
  type: REVIEW_REMOVE_GUEST_FAVOURITE_FAIL,
});

export const ReviewremoveAllFavourites = () => ({
  type: REVIEW_REMOVE_ALL_FAVOURITES,
});
