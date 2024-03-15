import { call, put, takeLatest } from "redux-saga/effects";
import {
  CHANGEPASSWORD_REQUESTED,
  FORGOT_PASSWORD_REQUESTED,
  LOGIN_REQUESTED,
  SIGNOUT_REQUESTED,
} from "./types";
import {
  changePasswordFail,
  changePasswordSuccess,
  loginFail,
  loginSuccess,
  removeAll,
  signOutFail,
  signOutSuccess,
} from "./actions";
import { API_URL } from "../../Constants/Config";
import axiosClient from "../../Utils/ApiClient";
import { REQUIRED_ERROR_MESSAGE } from "../../Constants/ErrorMessages";
import { CommonActions } from "@react-navigation/native";
import { removeAnswer, setAnswer } from "../SetAnswer/actions";
import {
  showAlert,
  showAlertError,
  showAlertSuccess,
} from "../../Common/Functions/CommonFunctions";
import { setLoader } from "../Loader/actions";
import { datingProfileRequest, removeAllProfileData } from "../Profile/actions";
import { addToCartSuccess, removeAllCart } from "../Cart/actions";
import { removeAllSignupData } from "../SignUp/actions";
import { removeAllFavourites } from "../Merchants/actions";

// yield call(datingProfileRequest(params));
function* onLoginRequest({ data, navigation }) {
  yield put(setLoader(true));
  let res = yield axiosClient
    .post(data.endpoint, navigation)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error, "-------------login error saga");
      return;
    });
  if (res?.data?.status) {
    console.log(JSON.stringify(res?.data), "res?.data-------- on login");
    yield put(setLoader(false));
    yield put(loginSuccess(res.data));
    yield put(addToCartSuccess(res.data?.cartcount));
    data.changeRole({ user: "user", id: 2 });
    res?.data?.userProfile == true ? data.navigation2() : data.navigation();
    let param = {
      token: res?.data?.Usertoken,
      endpoint: API_URL.getProfile,
      id: res?.data?.UserData?._id,
    };
    data?.cb(param);
  } else {
    console.log("res of false status onLoginRequest", res?.data);
    showAlertError(res?.data?.message);
    yield put(setLoader(false));
    yield put(loginFail());
  }
}

function* onChangePasswordRequest({ data, navigation }) {
  yield put(setLoader(true));
  // console.log(data, 'data', navigation, 'navigation onChangePasswordRequest --------------- ');
  let res = yield axiosClient
    .post(navigation.endpoint, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: navigation.userToken,
      },
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(
        error?.response?.data,
        "onChangePasswordRequest SAGA ERROR ===>",
        error
      );
      return;
    });
  if (res) {
    // console.log(res?.data, '....onChangePasswordRequest Api Response');
    // console.log(res?.data.status, '....onChangePasswordRequest Api Response type');
    if (res?.data?.status) {
      yield put(setLoader(false));
      // showAlertSuccess(res?.data?.message);
      yield put(changePasswordSuccess());
      // navigation.navigation();
      navigation.onPlaceOrder();
    } else {
      console.log(res?.data, "on fail of onChangePasswordRequest");
      yield put(setLoader(false));
      navigation.onPlaceOrderFail(res.data.message);
      // showAlertError(res?.data?.message)
      yield put(changePasswordFail());
      // showAlert(res.data.message);
      // console.log(res?.data?.message);
    }
  } else {
    yield put(setLoader(false));
    // showAlert(res?.data?.message)
    // console.log(REQUIRED_ERROR_MESSAGE);
  }
}

function* onSignOutRequest({ navigation }) {
  try {
    yield put(setLoader(true));
    let res = yield axiosClient
      .post(
        navigation.endpoint,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: navigation.userToken,
          },
        }
      )
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error?.response?.data, "onSignOut SAGA ERROR ===>", error);
        return;
      });
    if (res) {
      if (res?.data?.status) {
        yield put(setLoader(false));
        yield put(signOutSuccess());
        navigation.changeRole({ user: "Guest", id: 1 });
        navigation.navigation();
      } else {
        yield put(setLoader(false));
        res?.data?.message && showAlertError(res?.data?.message);
        console.log(res?.data?.message); // remove
      }
    } else {
      yield put(setLoader(false));
    }
  } catch (err) {
    console.log(err, "Catch part of onSignOutRequest", err?.response?.data);
  }
}

// ForgotPasswordRequest
function* onForgotRequest({ data, navigation }) {
  console.log(data, "data", navigation, "navigation --------------- ");
  // let res = yield axiosClient
  //   .post(navigation.endpoint, data)
  //   .then(function (response) {
  //     return response;
  //   })
  //   .catch(function (error) {
  //     console.log("onLogin SAGA ERROR ===>", error);
  //     return;
  //   });
  // if (res) {
  //   console.log(res.data, "..--------------------------------------------..");
  //   if (res?.data?.status) {
  //     yield put(setLoader(false));
  //     // yield put(loginSuccess(res.data));

  //     let params = {
  //       endpoint: API_URL.getProfile,
  //       userToken: res?.data?.Usertoken,
  //       id: { userId: res?.data?.UserData?._id },
  //     };
  //     // callback({ params: params })
  //     // yield call(datingProfileRequest(params));
  //   } else {
  //     yield put(setLoader(false));
  //     // showAlertError(res.data.message)
  //     yield put(loginFail());
  //     // showAlert(res.data.message);
  //     // console.log(res.data.message);
  //   }
  // } else {
  //   yield put(setLoader(false));
  //   // showAlert(res.data.message)
  //   // console.log(REQUIRED_ERROR_MESSAGE);
  //   // showAlert(ERROR_MESSAGE);
  // }
  // yield put(setLoader(false));
}

function* sagaLogin() {
  yield takeLatest(LOGIN_REQUESTED, onLoginRequest);
  yield takeLatest(SIGNOUT_REQUESTED, onSignOutRequest);
  yield takeLatest(CHANGEPASSWORD_REQUESTED, onChangePasswordRequest);
  yield takeLatest(FORGOT_PASSWORD_REQUESTED, onForgotRequest);
}
export default sagaLogin;
