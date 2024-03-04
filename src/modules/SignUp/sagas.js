import { put, takeLatest } from "redux-saga/effects";
import { SIGNUP_REQUESTED } from "./types";
import { signupFail, signupSuccess } from "./actions";
import { API_URL } from "../../Constants/Config";
import axiosClient from "../../Utils/ApiClient";
import { CommonActions } from "@react-navigation/native";
import { removeAnswer, setAnswer } from "../SetAnswer/actions";
import { setLoader } from "../Loader/actions";
import {
  showAlert,
  showAlertError,
  showAlertSuccess,
} from "../../Common/Functions/CommonFunctions";

function* onDemoRequest({ data }) {
  // API CALL
  // RESULT
  // yield put(demoSuccess(data));
  // yield put(demoFail());
}

function* onSignUpRequest({ data, navigation, callbackSignUp }) {
  yield put(setLoader(true));
  // console.log(data, 'data', navigation, 'navigation ---------------- ');
  // yield put(setLoader(true));
  let res = yield axiosClient
    .post(navigation.endpoint, data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // console.log('onSignUp SAGA ERROR ===>', error);
      return;
    });
  if (res) {
    // console.log(res.data);
    if (res?.data?.status) {
      // showAlertSuccess(res.data.message)
      yield put(setLoader(false));
      yield put(signupSuccess(res.data));
      callbackSignUp();
      yield put(removeAnswer());
      // yield put(loginSuccess(res.data));
      // showAlert(res.data.message);
      // console.log(res.data.message);
      navigation.changeRole({ user: "user", id: 2 });
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0, // Reset to the first screen in the stack
      //     routes: [{ name: 'Play' }] // Replace the current stack with the 'Home' screen
      //   })
      // );
      navigation.navigation();
    } else {
      yield put(setLoader(false));
      // showAlertError(res.data.message)
      yield put(signupFail());
      // showAlert(res.data.message);
      // console.log(res.data.message);
    }
  } else {
    yield put(setLoader(false));
    // showAlert(res.data.message)
    // console.log(ERROR_MESSAGE);
    // showAlert(ERROR_MESSAGE);
  }
  // yield put(setLoader(false));
}

function* sagaSignup() {
  yield takeLatest(SIGNUP_REQUESTED, onSignUpRequest);
}
export default sagaSignup;
