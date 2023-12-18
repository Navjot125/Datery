import {
  ADD_TO_CART_FAIL, ADD_TO_CART_GUEST_FAIL, ADD_TO_CART_GUEST_REQUESTED, ADD_TO_CART_GUEST_SUCCESS, ADD_TO_CART_REQUESTED,
  ADD_TO_CART_SUCCESS, CART_LIST_FAIL, CART_LIST_REQUESTED, CART_LIST_SUCCESS, REMOVE_ALL, REMOVE_ITEM_FROM_CART_FAIL,
  REMOVE_ITEM_FROM_CART_REQUESTED, REMOVE_ITEM_FROM_CART_SUCCESS, REMOVE_ITEM_FROM_GUEST_CART_FAIL, REMOVE_ITEM_FROM_GUEST_CART_REQUESTED, REMOVE_ITEM_FROM_GUEST_CART_SUCCESS
} from './types';

export const addToCartRequest = (data, navigation) => {
  return {
    type: ADD_TO_CART_REQUESTED,
    data,
    navigation,
  };
};

export const addToCartSuccess = data => ({
  type: ADD_TO_CART_SUCCESS,
  data,
});

export const addToCartFail = () => ({
  type: ADD_TO_CART_FAIL,
});

export const addToCartGuestRequest = (data, navigation) => {
  return {
    type: ADD_TO_CART_GUEST_REQUESTED,
    data,
    navigation,
  };
};

export const addToCartGuestSuccess = data => ({
  type: ADD_TO_CART_GUEST_SUCCESS,
  data,
});

export const addToCartGuestFail = () => ({
  type: ADD_TO_CART_GUEST_FAIL,
});
export const removeFromCartGuestRequest = (data) => {
  return {
    type: REMOVE_ITEM_FROM_GUEST_CART_REQUESTED,
    data,
  };
};

export const removeFromCartGuestSuccess = (data) => {
  return {
    type: REMOVE_ITEM_FROM_GUEST_CART_SUCCESS,
    data,
  };
};

export const removeFromCartGuestFail = () => ({
  type: REMOVE_ITEM_FROM_GUEST_CART_FAIL,
});

export const CartListRequest = (data) => {
  return {
    type: CART_LIST_REQUESTED,
    data,
  };
};

export const CartListSuccess = data => ({
  type: CART_LIST_SUCCESS,
  data,
});

export const CartListFail = () => ({
  type: CART_LIST_FAIL,
});

export const removeItemFromCartRequest = (data) => {
  return {
    type: REMOVE_ITEM_FROM_CART_REQUESTED,
    data,
  };
};

export const removeItemFromCartSuccess = data => ({
  type: REMOVE_ITEM_FROM_CART_SUCCESS,
  data,
});

export const removeItemFromCartFail = () => ({
  type: REMOVE_ITEM_FROM_CART_FAIL,
});

export const removeAllCart = () => {
  return {
    type: REMOVE_ALL,
  };
};


