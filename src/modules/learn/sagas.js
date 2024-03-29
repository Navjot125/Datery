import { put, takeLatest } from "redux-saga/effects";
import {
  FAVOURITE_REQUESTED,
  LEARNALLDETAILS_REQUESTED,
  LEARNALL_REQUESTED,
  LEARNFAVOURITELIST_REQUESTED,
  LEARNFAVOURITE_REQUESTED,
  LEARN_REMOVE_FAVOURITE_REQUESTED,
  MERCHANTDETAILS_REQUESTED,
  MERCHANT_REQUESTED,
} from "./types";
import {
  merchantSuccess,
  merchantFail,
  merchantDetailsSuccess,
  merchantDetailsFail,
  favouriteListFail,
  removeFavouriteSuccess,
  removeFavouriteFail,
  LearnAllFail,
  LearnAllSuccess,
  LearnAllDetailsSuccess,
  LearnAllDetailsFail,
  LearnfavouriteListSuccess,
  LearnfavouriteListFail,
  LearnremoveFavouriteFail,
  LearnremoveFavouriteSuccess,
} from "./actions";
import axiosClient from "../../Utils/ApiClient";
import { REQUIRED_ERROR_MESSAGE } from "../../Constants/ErrorMessages";
import {
  showAlert,
  showAlertError,
  showAlertSuccess,
} from "../../Common/Functions/CommonFunctions";
import { setLoader } from "../Loader/actions";
import { API_URL } from "../../Constants/Config";

function* onLearnRequest({ data }) {
  // console.log("onLearnRequest--------------------------onLearnRequest", data);
  try {
    let res = yield axiosClient
      .post(
        data?.endpoint,
        {
          labels: data?.labels ? data?.labels : "",
          category: data?.category ? data?.category : "",
          name: data?.name ? data?.name : "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: data?.token,
          },
        }
      )
      .then(function (response) {
        // console.log("onMerchantListRequest SAGA ERROR ===>", response.data);
        return response;
      })
      .catch(function (error) {
        console.log(
          error?.response?.data,
          "onLearnRequest onMerchantListRequest SAGA ERROR ===>",
          error
        );
        return;
      });
    if (res) {
      // console.log(res?.data, "----------------------------rrrrreeeeeessssss");
      if (res?.data?.status) {
        // console.log(res?.data, "----------------------------onLearnRequest",data);
        // yield put(setLoader(false));
        yield put(LearnAllSuccess(res?.data?.data));
      } else {
        // yield put(setLoader(false));
        // yield put(merchantFail());
        res?.data?.message == "Please provide the coridnates."
          ? null
          : // showAlertError(res.data.message)
            yield put(LearnAllFail());
        // console.log(res.data.message);
      }
    } else {
      yield put(setLoader(false));
      res?.data?.message == "Please provide the coridnates."
        ? null
        : // showAlert(res?.data?.message)
          console.log("error alert onLearnRequest");
      // console.log(res.data.message);
    }
  } catch (error) {
    console.log(error, "error in onLearnRequest");
  }
  // yield put(setLoader(false));
}

function* onLearnDetailsRequest({ navigation }) {
  // console.log('onLearnDetailsRequest navigation0-----',navigation);
  // yield put(setLoader(true));
  try {
    let res = yield axiosClient
      .get(
        navigation.endpoint,
        //  navigation.serviceId
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: navigation?.userToken,
          },
          params: {
            learnId: navigation?.learnId,
            learnType: navigation?.learnType,
          },
        }
      )
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(
          error?.response?.data,
          "onLearnDetailsRequest SAGA ERROR ===>",
          error
        );
        return;
      });
    if (res) {
      if (res?.data?.status) {
        // console.log(res.data, '----------------....');
        yield put(setLoader(false));
        yield put(LearnAllDetailsSuccess(res?.data?.data));
        navigation.cb(res?.data?.data);
        // navigation.navigation();
        // console.log(res.data.data, ' message from saga merchant details');
      } else {
        yield put(setLoader(false));
        // showAlertError(res.data.message)
        yield put(LearnAllDetailsFail());
        // console.log(res.data.message);
      }
    } else {
      yield put(setLoader(false));
      // showAlert(res.data.message)
      // console.log(REQUIRED_ERROR_MESSAGE);
    }
  } catch (error) {
    yield put(setLoader(false));
    console.log("onLearnDetailsRequest SAGA ERROR 2 ===>", error);
  }
  // yield put(setLoader(false));
}
function* onLearnFavouriteRequest({ navigation }) {
  yield put(setLoader(true));
  console.log(
    navigation,
    "navigation ---------------request of add to favourites"
  );
  let res = yield axiosClient
    .post(navigation?.endpoint, navigation?.id)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // console.log('oLEARNRequest SAGA ERROR ===>', error);
      return;
    });
  if (res) {
    // console.log("---------------LEARNFAVOURITE_REQUESTED");
    if (res?.data?.status) {
      yield put(setLoader(false));
      console.log(res?.data, "res of onLearnFavouriteRequest fav");
      // yield put(merchantDetailsSuccess(res?.data?.data));
      // navigation.navigation()
      // yield put(onLearnFavouriteListRequest({
      //   endpoint: API_URL?.fetchFavoriteLearn, userId: navigation?.id?.userId
      // }))
      showAlertSuccess(res?.data?.message);
      //  console.log(res.data,'AddFavourite')
    } else {
      console.log(res?.data, "res of add fav");
      yield put(setLoader(false));
      // console.log(res.data,'AddFavourite')
      showAlertError(res?.data?.message);
      // yield put(merchantDetailsFail());
      // console.log(res.data.message);
    }
  } else {
    console.log("error LEARNFAVOURITE_REQUESTED");
    yield put(setLoader(false));
    // showAlert(res.data.message)
    // console.log(REQUIRED_ERROR_MESSAGE);
  }
  // yield put(setLoader(false));
}
function* onLearnFavouriteListRequest({ navigation }) {
  // yield put(setLoader(true));
  let res = yield axiosClient
    .post(navigation.endpoint, {
      userId: navigation.userId,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // console.log('onLearnFavouriteListRequest SAGA ERROR ===>', error);
      return;
    });
  if (res) {
    if (res?.data?.status) {
      // yield put(setLoader(false));
      // yield put(merchantDetailsSuccess(res?.data?.data));
      yield put(LearnfavouriteListSuccess(res?.data?.data));
      // navigation.navigation()
      console.log(res?.data, "res of onLearnFavouriteListRequest 1");
    } else {
      // yield put(setLoader(false));
      // showAlertError(res.data.message)
      yield put(LearnfavouriteListSuccess([]));

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
function* onLearnRemoveFavouriteRequest({ navigation }) {
  yield put(setLoader(true));
  // console.log(navigation, 'navigation ---------------request of remove from favourites');
  let res = yield axiosClient
    .post(navigation.endpoint, navigation.data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // console.log('onLearnRemoveFavouriteRequest SAGA ERROR ===>', error);
      return;
    });
  if (res) {
    console.log(res.data, "....LEARN_REMOVE_FAVOURITE_REQUESTED");
    if (res?.data?.status) {
      yield put(setLoader(false));
      // yield put(merchantDetailsSuccess(res?.data?.data));
      yield put(LearnremoveFavouriteSuccess(navigation.data.serviceId));
      // showAlertSuccess(res.data.message)
      // console.log(res.data, ' message from saga remove Favourite merchant');
    } else {
      yield put(setLoader(false));
      // showAlertError(res.data.message)
      yield put(LearnremoveFavouriteFail());
      // console.log(res.data.message);
    }
  } else {
    console.log("erro in LEARN_REMOVE_FAVOURITE_REQUESTED");
    yield put(setLoader(false));
    // showAlert(res?.data?.message)
    console.log(
      REQUIRED_ERROR_MESSAGE,
      "onLearnRemoveFavouriteRequest error -"
    );
  }
  // yield put(setLoader(false));
}

function* sagaLearn() {
  yield takeLatest(LEARNALL_REQUESTED, onLearnRequest);
  yield takeLatest(LEARNALLDETAILS_REQUESTED, onLearnDetailsRequest);
  yield takeLatest(LEARNFAVOURITE_REQUESTED, onLearnFavouriteRequest);
  yield takeLatest(LEARNFAVOURITELIST_REQUESTED, onLearnFavouriteListRequest);
  yield takeLatest(
    LEARN_REMOVE_FAVOURITE_REQUESTED,
    onLearnRemoveFavouriteRequest
  );
}
export default sagaLearn;
