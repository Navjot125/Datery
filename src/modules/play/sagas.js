import { put, takeLatest } from "redux-saga/effects";
import {
  PLAYDETAILS_REQUESTED,
  PLAY_REQUESTED,
  PLAYFAVOURITELIST_REQUESTED,
  PLAYFAVOURITE_REQUESTED,
  PLAY_REMOVE_FAVOURITE_REQUESTED,
} from "./types";
import {
  playFail,
  playSuccess,
  playDetailsSuccess,
  playDetailsFail,
  playfavouriteListSuccess,
  playfavouriteListFail,
  playremoveFavouriteFail,
  playremoveFavouriteSuccess,
} from "./actions";
import axiosClient from "../../Utils/ApiClient";
import { REQUIRED_ERROR_MESSAGE } from "../../Constants/ErrorMessages";
import {
  showAlert,
  showAlertError,
  showAlertSuccess,
} from "../../Common/Functions/CommonFunctions";
import { setLoader } from "../Loader/actions";

// function* onplayRequest({ data }) {
//   // yield put(setLoader(true));
//   console.log(data,'-----------------------------------');
//   try {
//     let res = yield axiosClient.get(
//       data?.endpoint,
//       {
//         coordinates: data.coordinates,
//         sortby: data.sortby ? data.sortby : '',
//         gametype: data.gametype ? data.gametype : null,
//         name: data.name,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: data?.userToken ? `Bearer ${data.userToken}` : '',
//         },
//       }
//     );
//     // .then(function (response) {
//     //   return response;
//     // })
//     // .catch(function (error) {
//     //   // console.log('onMerchantListRequest SAGA ERROR ===>', error);
//     //   return;
//     // });
//     if (res) {
//       console.log(res?.data, "------Play res");
//       if (res?.data?.status) {
//         // yield put(setLoader(false));
//         yield put(playSuccess(res?.data));
//       } else {
//         // yield put(setLoader(false));
//         // yield put(merchantFail());
//         res.data.message == "Please provide the coridnates."
//           ? null
//           : // showAlertError(res.data.message)
//             yield put(playFail());
//         // console.log(res.data.message);
//       }
//     } else {
//       // yield put(setLoader(false));
//       res.data.message == "Please provide the coridnates.";
//       // showAlert(res.data.message)
//       // console.log(res.data.message);
//     }
//   } catch (error) {
//     console.log(error);
//   }
//   // yield put(setLoader(false));
// }

function* onplayRequest({ data }) {
  try {
    const config = {
      // params: {
      //   coordinates: data?.coordinates,
      //   sortby: data?.sortby || "",
      //   gametype: data?.gametype || null,
      //   name: data?.name,
      // },
      headers: {
        "Content-Type": "application/json",
        Authorization: data?.userToken,
      },
    };
    // console.log("data----", data, "config----", config);
    const res = yield axiosClient.get(data?.endpoint, config);
    if (res?.data) {
      // console.log(res.data, "------Play res");
      if (res.data.status) {
        yield put(playSuccess(res.data));
      } else if (res.data.message !== "Please provide the coordinates.") {
        yield put(playFail());
      }
    } else {
      console.log("Response data is empty.");
    }
  } catch (error) {
    if (error.response) {
      console.error(
        "Error response:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Request error:", error.message);
    }
  }
}

function* onplayDetailsRequest({ navigation }) {
  try {
    // yield put(setLoader(true));
    let res = yield axiosClient
      .get(navigation.endpoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: navigation?.userToken,
        },
        params: { gameId: navigation?.gameId },
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log("onplayDetailsRequest SAGA ERROR 1 ===>", error);
        return;
      });
    if (res) {
      // console.log(res.data, '....');
      if (res?.data?.status) {
        // yield put(setLoader(false));
        navigation.cb(res?.data?.data);
        // yield put(playDetailsSuccess(res?.data?.data));
        // navigation.navigation();
        // console.log(res.data.data, ' message from saga merchant details');
      } else {
        yield put(setLoader(false));
        // showAlertError(res.data.message)
        yield put(playDetailsFail());
        // console.log(res.data.message);
      }
    } else {
      yield put(setLoader(false));
      // showAlert(res.data.message)
      // console.log(REQUIRED_ERROR_MESSAGE);
    }
    // yield put(setLoader(false));
  } catch (error) {
    yield put(setLoader(false));
    console.log("onplayDetailsRequest SAGA ERROR 2 ===>", error);
    // Handle error scenarios here
    // showAlert(error.message) or dispatch failure action
    // console.error(REQUIRED_ERROR_MESSAGE);
  }
}

function* onplayFavouriteRequest({ navigation }) {
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
}

function* onplayFavouriteListRequest({ navigation }) {
  yield put(setLoader(true));
  // console.log(navigation, 'navigation ---------------request of favourites list');
  let res = yield axiosClient
    .get(navigation.endpoint, navigation.id)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // console.log('onplayFavouriteListRequest SAGA ERROR ===>', error);
      return;
    });
  if (res) {
    // console.log(res.data, '....');
    if (res?.data?.status) {
      yield put(setLoader(false));
      // yield put(merchantDetailsSuccess(res?.data?.data));
      yield put(playfavouriteListSuccess(res?.data?.data));
      navigation.navigation();
      // console.log(res.data, ' message from saga merchant details');
    } else {
      yield put(setLoader(false));
      // showAlertError(res.data.message)
      yield put(playfavouriteListFail());
      // console.log(res.data.message);
    }
  } else {
    yield put(setLoader(false));
    // showAlert(res.data.message)
    // console.log(REQUIRED_ERROR_MESSAGE);
  }
  // yield put(setLoader(false));
}

function* onplayRemoveFavouriteRequest({ navigation }) {
  yield put(setLoader(true));
  // console.log(navigation, 'navigation ---------------request of remove from favourites');
  let res = yield axiosClient
    .get(navigation.endpoint, navigation.data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // console.log('onplayRemoveFavouriteRequest SAGA ERROR ===>', error);
      return;
    });
  if (res) {
    // console.log(res.data, '....');
    if (res?.data?.status) {
      yield put(setLoader(false));
      // yield put(merchantDetailsSuccess(res?.data?.data));
      yield put(playremoveFavouriteSuccess(navigation.data.serviceId));
      // showAlertSuccess(res.data.message)
      // console.log(res.data, ' message from saga remove Favourite merchant');
    } else {
      yield put(setLoader(false));
      // showAlertError(res.data.message)
      yield put(playremoveFavouriteFail());
      // console.log(res.data.message);
    }
  } else {
    yield put(setLoader(false));
    // showAlert(res.data.message)
    // console.log(REQUIRED_ERROR_MESSAGE);
  }
  // yield put(setLoader(false));
}

function* sagaPlay() {
  yield takeLatest(PLAY_REQUESTED, onplayRequest);
  yield takeLatest(PLAYDETAILS_REQUESTED, onplayDetailsRequest);
  yield takeLatest(PLAYFAVOURITE_REQUESTED, onplayFavouriteRequest);
  yield takeLatest(PLAYFAVOURITELIST_REQUESTED, onplayFavouriteListRequest);
  yield takeLatest(
    PLAY_REMOVE_FAVOURITE_REQUESTED,
    onplayRemoveFavouriteRequest
  );
}
export default sagaPlay;
