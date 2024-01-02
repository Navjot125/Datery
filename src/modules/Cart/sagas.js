import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { ADD_TO_CART_GUEST_REQUESTED, ADD_TO_CART_REQUESTED, CART_LIST_REQUESTED, REMOVE_ITEM_FROM_CART_REQUESTED, REMOVE_ITEM_FROM_GUEST_CART_REQUESTED } from './types';
import { setLoader } from '../Loader/actions';
import axiosClient from '../../Utils/ApiClient';
import { showAlertError, showAlertSuccess } from '../../Common/Functions/CommonFunctions';
import { showAlert } from '../../Constants/AlertHelper';
import { CartListRequest, CartListSuccess, addToCartGuestSuccess, addToCartSuccess, removeFromCartGuestRequest, removeFromCartGuestSuccess, removeItemFromCartSuccess } from './actions';
import { API_URL } from '../../Constants/Config';
import { REQUIRED_ERROR_MESSAGE } from '../../Constants/ErrorMessages';


function* onAddToCartRequest({ data, navigation }) {
  yield put(setLoader(true));
  // console.log(navigation, 'navigation ---------------request for add to cart User', data);
  let res = yield axiosClient
    .post(navigation.endpoint, data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // console.log('onAddToCartRequest SAGA ERROR ===>', error);
      return;
    });
  if (res) {
    // console.log(res.data, '....');
    if (res?.data?.status) {
      yield put(setLoader(false));
      yield put(addToCartSuccess(res?.data?.cartcount));
      // navigation.navigation()
      // showAlertSuccess(res.data.message)
      // console.log(res.data, ' message from saga merchant details');
    } else {
      yield put(setLoader(false));
      // showAlertError(res.data.message)
      // yield put(merchantDetailsFail());  
      // console.log(res.data.message);
    }
  } else {
    yield put(setLoader(false));
    // showAlert(res.data.message)
    // console.log(REQUIRED_ERROR_MESSAGE);
  }
  // yield put(setLoader(false));
}

function* onAddToCartGuestRequest({ data, navigation }) {
  yield put(setLoader(true));
  // console.log(navigation, 'navigation ---------------request for add to cart Guest', data);
  if (data) {
    yield put(setLoader(false));
    yield put(addToCartGuestSuccess(data));
    // navigation.navigation()
  } else {
    yield put(setLoader(false));
  }
  // yield put(setLoader(false));
}


function* onRemoveFromCartGuestRequest({ data }) {
  yield put(setLoader(true));
  // console.log('navigation ---------------request for add to cart Guest', data);
  if (data) {
    yield put(setLoader(false));
    yield put(removeFromCartGuestSuccess(data.itemId.itemId));
    // navigation.navigation()
  } else {
    yield put(setLoader(false));
  }
  // yield put(setLoader(false));
}

function* onCartListRequest({ data }) {
  // yield put(setLoader(true));
  // console.log(data, 'navigation ---------------request for cart list');
  let res = yield axiosClient
    .post(data.endpoint, data.userId, {
      headers: {
        Authorization: data.token
      }
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // console.log('onCartListRequest SAGA ERROR ===>', error);
      return;
    });
  if (res) {
    // console.log(res.data, '....');
    if (res?.data?.status) {
      // yield put(setLoader(false));
      yield put(CartListSuccess(res?.data?.data));
      data.navigation()
      // showAlertSuccess(res.data.message)
      // console.log(res.data.data, ' message from saga merchant details');
    } else {
      // yield put(setLoader(false));
      // showAlertError(res.data.message)
      // yield put(merchantDetailsFail());
      // console.log(res.data.message);
    }
  } else {
    // yield put(setLoader(false));
    // showAlert(res.data.message)
    // console.log(REQUIRED_ERROR_MESSAGE);
  }
  // yield put(setLoader(false));
}

function* onRemoveItemFromCartRequest({ data }) {
  yield put(setLoader(true));
  // console.log(data, 'navigation ---------------request for cart list');
  let res = yield axiosClient
    .post(data.endpoint, data._id)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // console.log('onRemoveItemFromCartRequest SAGA ERROR ===>', error);
      return;
    });
  if (res) {
    // console.log(res.data, '....');
    if (res?.data?.status) {
      yield put(setLoader(false));
      let removeData = {
        cartId: data._id,
        cartCount: res.data.cartcount
      }
      yield put(removeItemFromCartSuccess(removeData));
      // navigation.navigation()
      // showAlertSuccess(res.data.message)
      // console.log(res.data, ' message from saga cart remove item');
    } else {
      yield put(setLoader(false));
      // showAlertError(res.data.message)
      yield put(removeItemFromCartFail());
      // console.log(res.data.message);
    }
  } else {
    yield put(setLoader(false));
    // showAlert(res.data.message)
    // console.log(REQUIRED_ERROR_MESSAGE);
  }
  // yield put(setLoader(false));
}

function* sagaCart() {
  yield takeLatest(ADD_TO_CART_REQUESTED, onAddToCartRequest);
  yield takeLatest(ADD_TO_CART_GUEST_REQUESTED, onAddToCartGuestRequest);
  yield takeLatest(CART_LIST_REQUESTED, onCartListRequest);
  yield takeLatest(REMOVE_ITEM_FROM_CART_REQUESTED, onRemoveItemFromCartRequest);
  yield takeLatest(REMOVE_ITEM_FROM_GUEST_CART_REQUESTED, onRemoveFromCartGuestRequest);
}
export default sagaCart;
