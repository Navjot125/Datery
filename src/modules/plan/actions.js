import {
  PLANALLDETAILS_REQUESTED, PLANALL_SUCCESS, PLANALL_FAIL, PLANALLDETAILS_SUCCESS, PLANALLDETAILS_FAIL,
  PLANFAVOURITE_REQUESTED, PLANFAVOURITE_SUCCESS, PLANFAVOURITE_FAIL, PLANFAVOURITELIST_REQUESTED,
  PLANFAVOURITELIST_SUCCESS, PLANFAVOURITELIST_FAIL, PLAN_REMOVE_FAVOURITE_REQUESTED, PLAN_REMOVE_FAVOURITE_SUCCESS,
  PLAN_REMOVE_FAVOURITE_FAIL, PLAN_GUEST_FAVOURITE_REQUESTED, PLAN_GUEST_FAVOURITE_SUCCESS, PLAN_GUEST_FAVOURITE_FAIL,
  PLAN_REMOVE_GUEST_FAVOURITE_REQUESTED, PLAN_REMOVE_GUEST_FAVOURITE_FAIL, PLAN_REMOVE_ALL_FAVOURITES, PLANALL_REQUESTED
}
  from './types';

export const PlanAllRequest = (data) => {
  // console.log(data, "DD")
  return {
    type: PLANALL_REQUESTED,
    data,
  };
};

export const PlanAllSuccess = data => ({
  type: PLANALL_SUCCESS,
  data,
});

export const PlanAllFail = () => ({
  type: PLANALL_FAIL,
});


export const PlanAllDetailsRequest = (navigation) => {
  return {
    type: PLANALLDETAILS_REQUESTED,
    // data,
    navigation,
  };
};

export const PlanAllDetailsSuccess = data => ({
  type: PLANALLDETAILS_SUCCESS,
  data,
});

export const PlanAllDetailsFail = () => ({
  type: PLANALLDETAILS_FAIL,
});

export const PlanfavouriteRequest = (navigation) => {
  return {
    type: PLANFAVOURITE_REQUESTED,
    // data,
    navigation,
  };
};

export const PlanfavouriteSuccess = data => ({
  type: PLANFAVOURITE_SUCCESS,
  data,
});

export const PlanfavouriteFail = () => ({
  type: PLANFAVOURITE_FAIL,
});

export const PlanfavouriteListRequest = (navigation) => {
  return {
    type: PLANFAVOURITELIST_REQUESTED,
    // data,
    navigation,
  };
};

export const PlanfavouriteListSuccess = data => ({

  type: PLANFAVOURITELIST_SUCCESS,
  data,
});

export const PlanfavouriteListFail = () => ({
  type: PLANFAVOURITELIST_FAIL,
});

export const PlanremoveFavouriteRequest = (navigation) => {
  return {
    type: PLAN_REMOVE_FAVOURITE_REQUESTED,
    // data,
    navigation,
  };
};

export const PlanremoveFavouriteSuccess = data => ({
  type: PLAN_REMOVE_FAVOURITE_SUCCESS,
  data,
});

export const PlanremoveFavouriteFail = () => ({
  type: PLAN_REMOVE_FAVOURITE_FAIL,
});


export const PlanguestFavouriteRequest = (data) => {
  // console.log(data, 'navo action');
  return {
    type: PLAN_GUEST_FAVOURITE_REQUESTED,
    data
  };
};

export const PlanguestFavouriteSuccess = data => ({
  type: PLAN_GUEST_FAVOURITE_SUCCESS,
  data,
});

export const PlanguestFavouriteFail = () => ({
  type: PLAN_GUEST_FAVOURITE_FAIL,
});

export const PlanremoveGuestFavouriteRequest = (data) => {
  // console.log(data, 'action');
  return {
    type: PLAN_REMOVE_GUEST_FAVOURITE_REQUESTED,
    data,
  };
};

export const PlanremoveGuestFavouriteSuccess = () => ({
  type: PLAN_GUEST_FAVOURITE_SUCCESS,
});

export const PlanremoveGuestFavouriteFail = () => ({
  type: PLAN_REMOVE_GUEST_FAVOURITE_FAIL,
});

export const PlanremoveAllFavourites = () => ({
  type: PLAN_REMOVE_ALL_FAVOURITES,
});
