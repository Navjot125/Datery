import { put, takeLatest } from 'redux-saga/effects';
import { FAVOURITELIST_REQUESTED, FAVOURITE_REQUESTED, MERCHANTDETAILS_REQUESTED, MERCHANT_REQUESTED, REMOVE_FAVOURITE_REQUESTED, } from './types';
import { merchantSuccess, merchantFail, merchantDetailsSuccess, merchantDetailsFail, favouriteListFail, favouriteListSuccess, removeFavouriteSuccess, removeFavouriteFail } from './actions';
import axiosClient from '../../Utils/ApiClient';
import { REQUIRED_ERROR_MESSAGE } from '../../Constants/ErrorMessages';
import { showAlert, showAlertError, showAlertSuccess } from '../../Common/Functions/CommonFunctions';
import { setLoader } from '../Loader/actions';

function* onMerchantRequest({ data }) {
  // yield put(setLoader(true));
  console.log(data, 'hiiiiå')
  try {
    let res = yield axiosClient
      .post(data.endpoint, {
        coordinates: data.coordinates,
        sortby: data.sortby ? data.sortby : '',
        category: data.category ?
          data.category : null, name: data.name,
        offset: data.offset
      })
    if (res) {
      console.log(res.data)
      if (res?.data?.status) {

        // yield put(setLoader(false));
        // console.log(res.data.data, ' message from saga merchant onMerchantRequest');
        yield put(merchantSuccess(res?.data?.data, data));
      } else {
        // yield put(setLoader(false));
        // yield put(merchantFail());
        res.data.message == "Please provide the coridnates." ? null :
          // showAlertError(res.data.message)
          yield put(merchantFail())
        // console.log(res.data.message);
      }
    } else {
      yield put(setLoader(false));
      res.data.message == "Please provide the coridnates."
      // showAlert(res.data.message)
      // console.log(REQUIRED_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log(error)
  }

  // yield put(setLoader(false));
}

function* onMerchantDetailsRequest({ navigation }) {
  yield put(setLoader(true));
  // console.log(navigation, 'navigation --------------- ');
  let res = yield axiosClient
    .post(navigation.endpoint, navigation.serviceId)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // console.log('onMerchantDetailsRequest SAGA ERROR ===>', error);
      return;
    });
  if (res) {
    // console.log(res.data, '....');
    if (res?.data?.status) {
      yield put(setLoader(false));
      yield put(merchantDetailsSuccess(res?.data?.data));
      navigation.navigation()
      // console.log(res.data.data, ' message from saga merchant details');
    } else {
      yield put(setLoader(false));
      // showAlertError(res.data.message)
      yield put(merchantDetailsFail());
      // console.log(res.data.message);
    }
  } else {
    yield put(setLoader(false));
    // showAlert(res.data.message)
    // console.log(REQUIRED_ERROR_MESSAGE);
  }
  // yield put(setLoader(false));
}


function* onFavouriteRequest({ navigation }) {
  yield put(setLoader(true));
  // console.log(navigation, 'navigation ---------------request of add to favourites');
  let res = yield axiosClient
    .post(navigation.endpoint, navigation.id)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // console.log('onMerchantDetailsRequest SAGA ERROR ===>', error);
      return;
    });
  if (res) {
    // console.log(res.data, '....');
    if (res?.data?.status) {
      yield put(setLoader(false));
      // yield put(merchantDetailsSuccess(res?.data?.data));
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


function* onFavouriteListRequest({ navigation }) {
  yield put(setLoader(true));
  console.log(navigation, 'navigation ---------------request of favourites list');
  let res = yield axiosClient
    .post(navigation.endpoint, {
      userId: navigation.id.userId,
      coordinates: navigation.coordinates
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // console.log('onMerchantDetailsRequest SAGA ERROR ===>', error);
      return;
    });
  if (res) {
    // console.log(res.data, '....');
    if (res?.data?.status) {
      yield put(setLoader(false));
      // yield put(merchantDetailsSuccess(res?.data?.data));
      yield put(favouriteListSuccess(res?.data?.data));
      navigation.navigation()
      // console.log(res.data, ' message from saga merchant details');
    } else {
      yield put(setLoader(false));
      // showAlertError(res.data.message)
      yield put(favouriteListFail());
      // console.log(res.data.message);
    }
  } else {
    yield put(setLoader(false));
    // showAlert(res.data.message)
    // console.log(REQUIRED_ERROR_MESSAGE);
  }
  // yield put(setLoader(false));
}


function* onRemoveFavouriteRequest({ navigation }) {
  // yield put(setLoader(true));
  // console.log(navigation, 'navigation ---------------request of remove from favourites');
  let res = yield axiosClient
    .post(navigation.endpoint, navigation.data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // console.log('onMerchantDetailsRequest SAGA ERROR ===>', error);
      return;
    });
  if (res) {
    console.log(res.data, '....');
    if (res?.data?.status) {
      // yield put(setLoader(false));
      // yield put(merchantDetailsSuccess(res?.data?.data));
      yield put(removeFavouriteSuccess(navigation.data.serviceId));
      navigation.callBack()
      // showAlertSuccess(res.data.message)
      // console.log(res.data, ' message from saga remove Favourite merchant');
    } else {
      // yield put(setLoader(false));
      // showAlertError(res.data.message)
      yield put(removeFavouriteFail());
      // console.log(res.data.message);
    }
  } else {
    // yield put(setLoader(false));
    // showAlert(res.data.message)
    console.log(REQUIRED_ERROR_MESSAGE);
  }
  // yield put(setLoader(false));
}

function* sagaMerchant() {
  yield takeLatest(MERCHANT_REQUESTED, onMerchantRequest);
  yield takeLatest(MERCHANTDETAILS_REQUESTED, onMerchantDetailsRequest);
  yield takeLatest(FAVOURITE_REQUESTED, onFavouriteRequest);
  yield takeLatest(FAVOURITELIST_REQUESTED, onFavouriteListRequest);
  yield takeLatest(REMOVE_FAVOURITE_REQUESTED, onRemoveFavouriteRequest);
}
export default sagaMerchant;