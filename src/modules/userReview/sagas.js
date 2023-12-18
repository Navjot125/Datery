import { put, takeLatest } from 'redux-saga/effects';
import { REVIEWALLDETAILS_REQUESTED, REVIEWALL_REQUESTED, REVIEWFAVOURITELIST_REQUESTED, REVIEWFAVOURITE_REQUESTED, REVIEW_REMOVE_FAVOURITE_REQUESTED } from './types';
import { ReviewAllSuccess, ReviewAllFail, ReviewAllDetailsSuccess, ReviewAllDetailsFail, ReviewfavouriteListSuccess, ReviewfavouriteListFail, ReviewremoveFavouriteSuccess, ReviewremoveFavouriteFail } from './actions';
import axiosClient from '../../Utils/ApiClient';
import { REQUIRED_ERROR_MESSAGE } from '../../Constants/ErrorMessages';
import { showAlert, showAlertError, showAlertSuccess } from '../../Common/Functions/CommonFunctions';
import { setLoader } from '../Loader/actions';

function* onReviewRequest({ data }) {
  // yield put(setLoader(true));
  // console.log(data, 'BBBBBB')
  try {
    let res = yield axiosClient
      .post(data.endpoint, data.data, {
        headers: {
          'Authorization': data?.token, // Add your authorization token here
          // Other headers you might need
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
      // console.log(res, "-----RRRr")
      if (res?.data?.status) {
        // yield put(setLoader(false));
        // console.log(JSON.stringify(res?.data.data,null,2),'data.data')
        yield put(ReviewAllSuccess(res?.data?.data))
        data.callback(res?.data)
      } else {
        // yield put(setLoader(false));
        // yield put(merchantFail());
        res.data.message == "Please provide the coridnates." ? null :
          // showAlertError(res.data.message)
          yield put(ReviewAllFail());
        // console.log(res.data.message);
      }
    } else {
      yield put(setLoader(false));
      res.data.message == "Please provide the coridnates." 
        // showAlert(res.data.message)
        // console.log(res.data.message);
    }
  }
  catch (err) {
    // console.log(err)
  }
}


function* onReviewDetailsRequest({ navigation }) {
  // yield put(setLoader(true));
  // console.log(navigation, 'navigation --------------- ');
  let res = yield axiosClient
    .get(navigation.endpoint, navigation.reviewId)
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
      yield put(ReviewAllDetailsSuccess(res?.data?.data));
      navigation.navigation()
      // console.log(res.data.data, ' message from saga merchant details');
    } else {
      yield put(setLoader(false));
      // showAlertError(res.data.message)
      yield put(ReviewAllDetailsFail());
      // console.log(res.data.message);
    }
  } else {
    yield put(setLoader(false));
    // showAlert(res.data.message)
    // console.log(REQUIRED_ERROR_MESSAGE);
  }
  // yield put(setLoader(false));
}


function* onReviewFavouriteRequest({ navigation }) {
  yield put(setLoader(true));
  // console.log(navigation, 'navigation ---------------request of add to favourites');
  let res = yield axiosClient
    .get(navigation.endpoint, navigation.id)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // console.log('oreviewRequest SAGA ERROR ===>', error);
      return;
    });
  if (res) {
    // console.log(res.data, '....');
    if (res?.data?.status) {
      yield put(setLoader(false));
      // yield put(merchantDetailsSuccess(res?.data?.data));
      // navigation.navigation()
      // showAlertSuccess(res.data.message)
      // console.log(res.data, ' reviewmessage from saga merchant details');
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


function* onReviewFavouriteListRequest({ navigation }) {
  yield put(setLoader(true));
  // console.log(navigation, 'navigation ---------------request of favourites list');
  let res = yield axiosClient
    .get(navigation.endpoint, navigation.id)
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
      yield put(ReviewfavouriteListSuccess(res?.data?.data));
      navigation.navigation()
      // console.log(res.data, ' message from saga merchant details');
    } else {
      yield put(setLoader(false));
      // showAlertError(res.data.message)
      yield put(ReviewfavouriteListFail());
      // console.log(res.data.message);
    }
  } else {
    yield put(setLoader(false));
    // showAlert(res.data.message)
    // console.log(REQUIRED_ERROR_MESSAGE);
  }
  // yield put(setLoader(false));
}


function* onReviewRemoveFavouriteRequest({ navigation }) {
  // yield put(setLoader(true));
  // console.log(navigation, 'navigation ---------------request of remove from favourites');
  let res = yield axiosClient
    .post(navigation.endpoint, navigation.data, {
      headers:
      {
        'Authorization': navigation?.token,
      }
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
      // yield put(setLoader(false));
      // yield put(merchantDetailsSuccess(res?.data?.data));
      yield put(ReviewremoveFavouriteSuccess(navigation.data.reviewId));
      // showAlertSuccess(res.data.message)
      // console.log(res.data, ' message from saga remove Favourite merchant');
    } else {
      // yield put(setLoader(false));
      // showAlertError(res.data.message)
      yield put(ReviewremoveFavouriteFail());
      // console.log(res.data.message);
    }
  } else {
    // yield put(setLoader(false));
    // showAlert(res.data.message)
    // console.log(REQUIRED_ERROR_MESSAGE);
  }
  // yield put(setLoader(false));
}

function* sagauserReview() {
  yield takeLatest(REVIEWALL_REQUESTED, onReviewRequest);
  yield takeLatest(REVIEWALLDETAILS_REQUESTED, onReviewDetailsRequest);
  yield takeLatest(REVIEWFAVOURITE_REQUESTED, onReviewFavouriteRequest);
  yield takeLatest(REVIEWFAVOURITELIST_REQUESTED, onReviewFavouriteListRequest);
  yield takeLatest(REVIEW_REMOVE_FAVOURITE_REQUESTED, onReviewRemoveFavouriteRequest);
}
export default sagauserReview;