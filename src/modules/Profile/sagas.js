import { put, takeLatest } from "redux-saga/effects";
import {
  ABOUT_COMFILITY_REQUESTED,
  DATING_PROFILE_REQUESTED,
  UPDATE_PROFILE_REQUESTED,
} from "./types";
import {
  aboutComfilityFail,
  aboutComfilitySuccess,
  datingProfileSuccess,
  datingProfileFail,
  updateProfileSuccess,
  updateProfileFail,
} from "./actions";
import axiosClient from "../../Utils/ApiClient";
import { REQUIRED_ERROR_MESSAGE } from "../../Constants/ErrorMessages";
import {
  showAlert,
  showAlertError,
} from "../../Common/Functions/CommonFunctions";
import { setLoader } from "../Loader/actions";

function* onAboutComfilityRequest({ navigation }) {
  // yield put(setLoader(true));
  // console.log(navigation, 'navigation --------------- ');
  navigation.navigation();

  let res = yield axiosClient
    .post(navigation.endpoint, navigation.type)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // console.log('onLogin SAGA ERROR ===>', error);
      return;
    });
  if (res) {
    // console.log(res.data, '....');
    if (res?.data?.status) {
      // yield put(setLoader(false));
      yield put(aboutComfilitySuccess(res.data.data));
      // console.log(res.data.data, ' message from saga login ');
    } else {
      // yield put(setLoader(false));
      // showAlertError(res.data.message)
      yield put(aboutComfilityFail());
      // console.log(res.data.message);
    }
  } else {
    // yield put(setLoader(false));
    // showAlert(res.data.message)
    // console.log(REQUIRED_ERROR_MESSAGE);
  }
  // yield put(setLoader(false));
}

function* onDatingProfileRequest({ navigation }) {
  yield put(setLoader(true));
  // console.log(navigation, 'navigation++++++ --------------- ');
  try {
    let res = yield axiosClient
      .post(
        navigation.endpoint,
        { userId: navigation?.id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: navigation.token,
          },
        }
      )
      .then(function (res) {
        return res;
      })
      .catch(function (error) {
        console.log("onDatingProfileRequest SAGA ERROR ===>", error);
        return;
      });
    if (res?.data?.status) {
      yield put(setLoader(false));
      yield put(datingProfileSuccess(res.data));
      // navigation?.navigation();
    } else {
      yield put(setLoader(false));
      yield put(datingProfileFail());
      console.log(res.data.message);
    }
  } catch (error) {
    console.log(error, "error in onDatingProfileRequest"),
      yield put(setLoader(false));
  }
}

function* onUpdateProfileRequest({ data }) {
  yield put(setLoader(true));
  // console.log(data, 'navigation --------------- ', "onUpdateProfileRequest",);
  // let formdata = FormData
  // data.updateDatingData.forEach(element => {
  //   // formdata.apply(element)
  // })
  let res = yield axiosClient
    .post(
      data.endpoint,
      data.updateDatingData,
      // .post(data.endpoint, data?.typeOfDates ? { "typeOfDates": data?.typeOfDates } : null, data.updateDatingData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: data.userToken,
        },
      }
    )
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // console.log('onUpdateProfileRequest SAGA ERROR ===>', error);
      return;
    });
  if (res) {
    console.log(res.data, "....onUpdateProfileRequest");
    if (res?.data?.status) {
      yield put(setLoader(false));
      // yield put(updateProfileSuccess());
      // console.log(res.data, ' message from saga login ');
      // navigation?.navigation()
    } else {
      yield put(setLoader(false));
      // showAlertError(res.data.message)
      // yield put(updateProfileFail());
      // console.log(res.data.message);
    }
  } else {
    yield put(setLoader(false));
    // showAlert(res.data.message)
    // console.log(REQUIRED_ERROR_MESSAGE);
  }
  // yield put(setLoader(false));
}

function* sagaProfile() {
  yield takeLatest(DATING_PROFILE_REQUESTED, onDatingProfileRequest);
  yield takeLatest(ABOUT_COMFILITY_REQUESTED, onAboutComfilityRequest);
  yield takeLatest(UPDATE_PROFILE_REQUESTED, onUpdateProfileRequest);
}
export default sagaProfile;
