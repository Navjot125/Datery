import { put, takeLatest } from "redux-saga/effects";
import {
  CARDALLDETAILS_REQUESTED,
  CARDALL_REQUESTED,
  CARDFAVOURITELIST_REQUESTED,
  CARDFAVOURITE_REQUESTED,
  CARD_EDIT_FAVOURITES,
  CARD_REMOVE_FAVOURITE_REQUESTED,
} from "./types";
import {
  favouriteListFail,
  removeFavouriteSuccess,
  removeFavouriteFail,
  CardAllFail,
  CardAllSuccess,
  CardAllDetailsSuccess,
  CardAllDetailsFail,
  CardfavouriteListSuccess,
  CardfavouriteListFail,
  CardremoveFavouriteFail,
  CardremoveFavouriteSuccess,
  CardEditRequest,
} from "./actions";
import axiosClient from "../../Utils/ApiClient";
import { REQUIRED_ERROR_MESSAGE } from "../../Constants/ErrorMessages";
import {
  showAlert,
  showAlertError,
  showAlertSuccess,
} from "../../Common/Functions/CommonFunctions";
import { setLoader } from "../Loader/actions";
import { navigationRef } from "../../RootNavigation";

function* onCardRequest({ data }) {
  yield put(setLoader(true));
  try {
    let res = yield axiosClient.post(data.endpoint, data.data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: data?.token,
      },
    });
    if (res) {
      yield put(setLoader(false));
      if (res?.data?.status) {
        yield put(CardAllSuccess(res?.data?.data));
        data.callback(res?.data);
      } else {
        console.log(res?.data, "res of onCardRequest");
        // console.log(res?.data);
        res.data.msg == "Please provide the coridnates."
          ? null
          : showAlertError(res.data.msg);
        yield put(CardAllFail());
      }
    } else {
      yield put(setLoader(false));
      res.data.message == "Please provide the coridnates."
        ? null
        : showAlert(res.data.message);
    }
  } catch (err) {
    console.log(err, "err onCardRequest", err?.response?.data);
    showAlertError(err?.response?.data?.Error);
  }
}

function* onCardEditRequest({ data }) {
  // yield put(setLoader(true));
  // console.log(data, 'IIIIIAAAa')
  try {
    let res = yield axiosClient
      .post(data.endpoint, data.data, {
        headers: {
          Authorization: data?.token, // Add your authorization token here
          // Other headers you might need
        },
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        // console.log('onMerchantListRequest SAGA ERROR ===>', error);
        return;
      });
    if (res) {
      // console.log(res, "-----")
      if (res?.data?.status) {
        // yield put(setLoader(false));
        // yield put(CardEditRequest(res?.data?.data))
        data.callback(res?.data);
      } else {
        // yield put(setLoader(false));
        // yield put(merchantFail());
        res.data.message == "Please provide the coridnates."
          ? null
          : showAlertError(res.data.message);
        // yield put(CardAllFail());
        // console.log(res.data.message);
      }
    } else {
      yield put(setLoader(false));
      res.data.message == "Please provide the coridnates."
        ? null
        : showAlert(res.data.message);
      // console.log(res.data.message);
    }
  } catch (err) {
    // console.log(err)
  }
}

function* onCardDetailsRequest({ navigation }) {
  // yield put(setLoader(true));
  try {
    // console.log(navigation, 'navigation --------------- ');
    let res = yield axiosClient.post(
      navigation.endpoint,
      {},
      {
        headers: {
          Authorization: navigation.token, // Add your authorization token here
          // Other headers you might need
        },
      }
    );
    // .then(function (response) {
    //   return response;
    // })
    // .catch(function (error) {
    //   return;
    // });
    if (res) {
      // console.log(res.data, '....');
      if (res?.data?.status) {
        yield put(setLoader(false));
        yield put(CardAllDetailsSuccess(res?.data?.data));
        // navigation.navigation()
        // console.log(res.data.data, ' message from saga merchant details');
      } else {
        yield put(setLoader(false));
        // showAlertError(res.data.message)
        yield put(CardAllDetailsFail());
        // console.log(res.data.message);
      }
    } else {
      yield put(setLoader(false));
      // showAlert(res.data.message)
      // console.log(REQUIRED_ERROR_MESSAGE);
    }
  } catch (error) {
    // console.log("EEEEe", error)
  }
  // yield put(setLoader(false));
}

function* onCardFavouriteRequest({ navigation }) {
  yield put(setLoader(true));
  // console.log(navigation, 'navigation ---------------request of add to favourites');
  let res = yield axiosClient
    .post(navigation.endpoint, navigation.id)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // console.log('oLEARNRequest SAGA ERROR ===>', error);
      return;
    });
  if (res) {
    if (res?.data?.status) {
      yield put(setLoader(false));
      // yield put(merchantDetailsSuccess(res?.data?.data));
      // navigation.navigation()
      showAlertSuccess(res.data.message);
      // console.log(res.data, 'AddFavourite')
    } else {
      yield put(setLoader(false));
      // console.log(res.data, 'AddFavourite')
      showAlertError(res.data.message);
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

function* onCardFavouriteListRequest({ navigation }) {
  // yield put(setLoader(true));
  let res = yield axiosClient
    .post(navigation.endpoint, {
      userId: navigation.userId,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return;
    });
  if (res) {
    if (res?.data?.status) {
      // yield put(setLoader(false));
      // yield put(merchantDetailsSuccess(res?.data?.data));
      yield put(CardfavouriteListSuccess(res?.data?.data));
      // navigation.navigation()
      // console.log(res.data, ' message from saga merchant details');
    } else {
      // yield put(setLoader(false));
      // showAlertError(res.data.message)
      yield put(CardfavouriteListSuccess([]));

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

function* onCardRemoveFavouriteRequest({ navigation }) {
  // yield put(setLoader(true));
  console.log(navigation, "navigation ---------------request of remove card");
  let res = yield axiosClient
    .post(
      navigation.endpoint,
      navigation.data,
      {},
      {
        headers: {
          Authorization: navigation.token,
        },
      }
    )
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return;
    });
  if (res) {
    // console.log(res.data, '....card');
    if (res?.data?.status) {
      // yield put(setLoader(false));
      // yield put(merchantDetailsSuccess(res?.data?.data));
      // console.log(res.data, '....cardmsg');

      yield put(CardremoveFavouriteSuccess(navigation.data.serviceId));
      navigation.cb();
      // showAlertSuccess(res.data.message)
      // console.log(res.data, ' message from saga remove Favourite merchant');
    } else {
      yield put(setLoader(false));
      // showAlertError(res.data.message)
      yield put(CardremoveFavouriteFail());
      // console.log(res.data.msg);
      navigation.cbErr(res.data.msg);
    }
  } else {
    yield put(setLoader(false));
    // showAlert(res.data.message)
    // console.log(REQUIRED_ERROR_MESSAGE);
  }
  // yield put(setLoader(false));
}

function* sagaCard() {
  yield takeLatest(CARDALL_REQUESTED, onCardRequest);
  yield takeLatest(CARDALLDETAILS_REQUESTED, onCardDetailsRequest);
  yield takeLatest(CARDFAVOURITE_REQUESTED, onCardFavouriteRequest);
  yield takeLatest(CARDFAVOURITELIST_REQUESTED, onCardFavouriteListRequest);
  yield takeLatest(
    CARD_REMOVE_FAVOURITE_REQUESTED,
    onCardRemoveFavouriteRequest
  );
  yield takeLatest(CARD_EDIT_FAVOURITES, onCardEditRequest);
}
export default sagaCard;
