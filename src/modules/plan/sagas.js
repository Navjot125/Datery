import { put, takeLatest } from 'redux-saga/effects';
import { FAVOURITELIST_REQUESTED, FAVOURITE_REQUESTED, PLANALLDETAILS_REQUESTED, PLANALL_REQUESTED, PLANFAVOURITELIST_REQUESTED, PLANFAVOURITE_REQUESTED, PLAN_REMOVE_FAVOURITE_REQUESTED } from './types';
import { PlanAllDetailsFail, PlanAllDetailsSuccess, PlanAllFail, PlanAllSuccess, PlanfavouriteListSuccess, PlanremoveFavouriteFail, PlanremoveFavouriteSuccess } from './actions';
import axiosClient from '../../Utils/ApiClient';
import { REQUIRED_ERROR_MESSAGE } from '../../Constants/ErrorMessages';
import { showAlert, showAlertError, showAlertSuccess } from '../../Common/Functions/CommonFunctions';
import { setLoader } from '../Loader/actions';

function* onPlanRequest({ data }) {
  // yield put(setLoader(true));
  // console.log(data, 'IIIIIAAAa')
  try {
    let res = yield axiosClient
      .get(data.endpoint, {
        headers: {
          Authorization: data?.token
        }
      })
      .then(function (response) {
        return response;  
      })
      .catch(function (error) {
        // console.log('onMerchantListRequest SAGA ERROR ===>', error);
        return;
      });
    if (res) {
      // console.log(res?.data?.cartItem,"REEEEEE")
      if (res?.data?.status) {
        // yield put(setLoader(false));
        yield put(PlanAllSuccess(res?.data?.cartItem));
      } else {
        // yield put(setLoader(false));
        // yield put(merchantFail());
        res.data.message == "Please provide the coridnates." ? null :
          // showAlertError(res.data.message)
          yield put(PlanAllFail());
        // console.log(res.data.message);
      }
    } else {
      // yield put(setLoader(false));
      res.data.message == "Please provide the coridnates." 
        // showAlert(res.data.message)
        // console.log(res.data.message);
    }
  } catch (error) {
    // console.log(error)
  }

  // yield put(setLoader(false));
}

function* onPlanDetailsRequest({ navigation }) {
  // yield put(setLoader(true));
  // console.log(navigation, 'navigation --------------- ');
  let res = yield axiosClient
    .post(navigation.endpoint, navigation.serviceId)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // console.log('onPlanDetailsRequest SAGA ERROR ===>', error);
      return;
    });
  if (res) {
    // console.log(res.data, '....');
    if (res?.data?.status) {
      yield put(setLoader(false));
      yield put(PlanAllDetailsSuccess(res?.data?.data));
      navigation.navigation()
      // console.log(res.data.data, ' message from saga merchant details');
    } else {
      yield put(setLoader(false));
      // showAlertError(res.data.message)
      yield put(PlanAllDetailsFail());
      // console.log(res.data.message);
    }
  } else {
    yield put(setLoader(false));
    // showAlert(res.data.message)
    // console.log(REQUIRED_ERROR_MESSAGE);
  }
  // yield put(setLoader(false));
}


function* onPlanFavouriteRequest({ navigation }) {
  yield put(setLoader(true));
  // console.log(navigation, 'navigation ---------------request of add to favourites');
  let res = yield axiosClient
    .post(navigation.endpoint, navigation.id)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // console.log('oPLANRequest SAGA ERROR ===>', error);
      return;
    });
  if (res) {
    if (res?.data?.status) {
      yield put(setLoader(false));
      // yield put(merchantDetailsSuccess(res?.data?.data));
      // navigation.navigation()
      showAlertSuccess(res.data.message)
      // console.log(res.data, 'AddFavourite')
    } else {
      yield put(setLoader(false));
      // console.log(res.data, 'AddFavourite')
      showAlertError(res.data.message)
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


function* onPlanFavouriteListRequest({ navigation }) {
  // yield put(setLoader(true));
  let res = yield axiosClient
    .post(navigation.endpoint, {
      userId: navigation.userId
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // console.log('onPlanFavouriteListRequest SAGA ERROR ===>', error);
      return;
    });
  if (res) {
    if (res?.data?.status) {
      // yield put(setLoader(false));
      // yield put(merchantDetailsSuccess(res?.data?.data));
      yield put(PlanfavouriteListSuccess(res?.data?.data));
      // navigation.navigation()
      // console.log(res.data, ' message from saga merchant details');
    } else {
      // yield put(setLoader(false));
      // showAlertError(res.data.message)
      yield put(PlanfavouriteListSuccess([]));

      // yield put(LearnfavouriteListFail());
      // console.log(res.data);
    }
  } else {
    // yield put(setLoader(false));
    // showAlert(res.data.message)
    // console.log(REQUIRED_ERROR_MESSAGE);
  }
  // yield put(setLoader(false));
}


function* onPlanRemoveFavouriteRequest({ navigation }) {
  yield put(setLoader(true));
  // console.log(navigation, 'navigation ---------------request of remove from favourites');
  let res = yield axiosClient
    .post(navigation.endpoint, navigation.data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // console.log('onPlanRemoveFavouriteRequest SAGA ERROR ===>', error);
      return;
    });
  if (res) {
    // console.log(res.data, '....');
    if (res?.data?.status) {
      yield put(setLoader(false));
      // yield put(merchantDetailsSuccess(res?.data?.data));
      yield put(PlanremoveFavouriteSuccess(navigation.data.serviceId));
      // showAlertSuccess(res.data.message)
      // console.log(res.data, ' message from saga remove Favourite merchant');
    } else {
      yield put(setLoader(false));
      // showAlertError(res.data.message)
      yield put(PlanremoveFavouriteFail());
      // console.log(res.data.message);
    }
  } else {
    yield put(setLoader(false));
    // showAlert(res.data.message)
    // console.log(REQUIRED_ERROR_MESSAGE);
  }
  // yield put(setLoader(false));
}

function* sagaPlan() {
  yield takeLatest(PLANALL_REQUESTED, onPlanRequest);
  yield takeLatest(PLANALLDETAILS_REQUESTED, onPlanDetailsRequest);
  yield takeLatest(PLANFAVOURITE_REQUESTED, onPlanFavouriteRequest);
  yield takeLatest(PLANFAVOURITELIST_REQUESTED, onPlanFavouriteListRequest);
  yield takeLatest(PLAN_REMOVE_FAVOURITE_REQUESTED, onPlanRemoveFavouriteRequest);
}
export default sagaPlan;