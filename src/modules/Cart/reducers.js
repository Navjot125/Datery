import {
  ADD_TO_CART_REQUESTED,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  CART_LIST_REQUESTED,
  CART_LIST_SUCCESS,
  CART_LIST_FAIL,
  ADD_TO_CART_GUEST_REQUESTED,
  ADD_TO_CART_GUEST_SUCCESS,
  ADD_TO_CART_GUEST_FAIL,
  REMOVE_ITEM_FROM_CART_REQUESTED,
  REMOVE_ITEM_FROM_CART_SUCCESS,
  REMOVE_ITEM_FROM_CART_FAIL,
  REMOVE_ITEM_FROM_GUEST_CART_REQUESTED,
  REMOVE_ITEM_FROM_GUEST_CART_SUCCESS,
  REMOVE_ITEM_FROM_GUEST_CART_FAIL,
  REMOVE_ALL,
} from "./types";

const INITIAL_STATE = {
  cartList: [],
  cartListUser: [],
  cartCount: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUESTED:
      return {
        ...state,
      };

    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        // cartList: action.data
        // cartCount: state.cartCount == null ? 1 : state.cartCount + 1
        cartCount: action.data,
      };

    case ADD_TO_CART_FAIL:
      return {
        ...state,
      };
    case ADD_TO_CART_GUEST_REQUESTED:
      return {
        ...state,
      };

    case ADD_TO_CART_GUEST_SUCCESS:
      // console.log(action.data,'reducer cart');
      return {
        ...state,
        cartList: [...state.cartList, action.data],
        // cartList: []
        cartCount: state.cartCount == null ? 1 : state.cartCount + 1,
      };

    case ADD_TO_CART_GUEST_FAIL:
      return {
        ...state,
      };
    case REMOVE_ITEM_FROM_GUEST_CART_REQUESTED:
      return {
        ...state,
      };

    case REMOVE_ITEM_FROM_GUEST_CART_SUCCESS:
      return {
        ...state,
        cartList: state.cartList.filter((item) => item.itemId !== action.data),
        cartCount: state.cartCount - 1,
      };

    case REMOVE_ITEM_FROM_GUEST_CART_FAIL:
      return {
        ...state,
      };

    case CART_LIST_REQUESTED:
      return {
        ...state,
      };

    case CART_LIST_SUCCESS:
      return {
        ...state,
        cartListUser: action.data,
      };

    case CART_LIST_FAIL:
      return {
        ...state,
      };
    case REMOVE_ITEM_FROM_CART_REQUESTED:
      return {
        ...state,
      };

    case REMOVE_ITEM_FROM_CART_SUCCESS:
      return {
        ...state,
        cartListUser: state?.cartListUser?.filter(
          (item) => item?._id !== action?.data?.cartId
        ),
        cartCount: action?.data?.cartCount,
      };

    case REMOVE_ITEM_FROM_CART_FAIL:
      return {
        ...state,
      };

    case REMOVE_ALL:
      return {
        cartList: [],
        cartListUser: [],
        cartCount: 0,
      };

    default:
      return state;
  }
};
