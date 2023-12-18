import {
  LEARNALLDETAILS_REQUESTED, LEARNALL_SUCCESS, LEARNALL_FAIL, LEARNALLDETAILS_SUCCESS, LEARNALLDETAILS_FAIL,
  LEARNFAVOURITE_REQUESTED, LEARNFAVOURITE_SUCCESS, LEARNFAVOURITE_FAIL, LEARNFAVOURITELIST_REQUESTED,
  LEARNFAVOURITELIST_SUCCESS, LEARNFAVOURITELIST_FAIL, LEARN_REMOVE_FAVOURITE_REQUESTED, LEARN_REMOVE_FAVOURITE_SUCCESS,
  LEARN_REMOVE_FAVOURITE_FAIL, LEARN_GUEST_FAVOURITE_REQUESTED, LEARN_GUEST_FAVOURITE_SUCCESS, LEARN_GUEST_FAVOURITE_FAIL,
  LEARN_REMOVE_GUEST_FAVOURITE_REQUESTED, LEARN_REMOVE_GUEST_FAVOURITE_FAIL, LEARN_REMOVE_ALL_FAVOURITES, LEARNALL_REQUESTED
}
  from './types';

export const LearnAllRequest = (data) => {
  return {
    type: LEARNALL_REQUESTED,
    data,
  };
};

export const LearnAllSuccess = data => ({
  type: LEARNALL_SUCCESS,
  data,
});

export const LearnAllFail = () => ({
  type: LEARNALL_FAIL,
});


export const LearnAllDetailsRequest = (navigation) => {
  return {
    type: LEARNALLDETAILS_REQUESTED,
    // data,
    navigation,
  };
};

export const LearnAllDetailsSuccess = data => ({
  type: LEARNALLDETAILS_SUCCESS,
  data,
});

export const LearnAllDetailsFail = () => ({
  type: LEARNALLDETAILS_FAIL,
});

export const LearnfavouriteRequest = (navigation) => {
  return {
    type: LEARNFAVOURITE_REQUESTED,
    // data,
    navigation,
  };
};

export const LearnfavouriteSuccess = data => ({
  type: LEARNFAVOURITE_SUCCESS,
  data,
});

export const LearnfavouriteFail = () => ({
  type: LEARNFAVOURITE_FAIL,
});

export const LearnfavouriteListRequest = (navigation) => {
   return {
    type: LEARNFAVOURITELIST_REQUESTED,
    // data,
    navigation,
  };
};

export const LearnfavouriteListSuccess = data => ({

  type: LEARNFAVOURITELIST_SUCCESS,
  data,
});

export const LearnfavouriteListFail = () => ({
  type: LEARNFAVOURITELIST_FAIL,
});

export const LearnremoveFavouriteRequest = (navigation) => {
  return {
    type: LEARN_REMOVE_FAVOURITE_REQUESTED,
    // data,
    navigation,
  };
};

export const LearnremoveFavouriteSuccess = data => ({
  type: LEARN_REMOVE_FAVOURITE_SUCCESS,
  data,
});

export const LearnremoveFavouriteFail = () => ({
  type: LEARN_REMOVE_FAVOURITE_FAIL,
});


export const LearnguestFavouriteRequest = (data) => {
  // console.log(data, 'navo action');
  return {
    type: LEARN_GUEST_FAVOURITE_REQUESTED,
    data
  };
};

export const LearnguestFavouriteSuccess = data => ({
  type: LEARN_GUEST_FAVOURITE_SUCCESS,
  data,
});

export const LearnguestFavouriteFail = () => ({
  type: LEARN_GUEST_FAVOURITE_FAIL,
});

export const LearnremoveGuestFavouriteRequest = (data) => {
  // console.log(data, 'action');
  return {
    type: LEARN_REMOVE_GUEST_FAVOURITE_REQUESTED,
    data,
  };
};

export const LearnremoveGuestFavouriteSuccess = () => ({
  type: LEARN_GUEST_FAVOURITE_SUCCESS,
});

export const LearnremoveGuestFavouriteFail = () => ({
  type: LEARN_REMOVE_GUEST_FAVOURITE_FAIL,
});

export const LearnremoveAllFavourites = () => ({
  type: LEARN_REMOVE_ALL_FAVOURITES,
});
