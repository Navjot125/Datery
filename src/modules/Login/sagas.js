import { call, put, takeLatest } from 'redux-saga/effects';
import { CHANGEPASSWORD_REQUESTED, LOGIN_REQUESTED, SIGNOUT_REQUESTED } from './types';
import { changePasswordFail, changePasswordSuccess, loginFail, loginSuccess, removeAll, signOutSuccess } from './actions';
import { API_URL } from '../../Constants/Config';
import axiosClient from '../../Utils/ApiClient';
import { REQUIRED_ERROR_MESSAGE } from '../../Constants/ErrorMessages';
import { CommonActions } from '@react-navigation/native';
import { removeAnswer, setAnswer } from '../SetAnswer/actions';
import { showAlert, showAlertError, showAlertSuccess } from '../../Common/Functions/CommonFunctions';
import { setLoader } from '../Loader/actions';
import { datingProfileRequest, removeAllProfileData } from '../Profile/actions';
import { addToCartSuccess, removeAllCart } from '../Cart/actions';
import { removeAllSignupData } from '../SignUp/actions';
import { removeAllFavourites } from '../Merchants/actions';

function* onDemoRequest({ data }) {
  // API CALL
  // RESULT
  // yield put(demoSuccess(data));
  // yield put(demoFail());
}
function* onLoginRequest({ data, navigation }) {
  // yield put(setLoader(true));
  // console.log(data, 'data', navigation, 'navigation --------------- ');
  // yield put(setLoader(true));
  let res = yield axiosClient
    .post(navigation.endpoint, data)
    // .post("http://3.144.132.104:4000/login", {userType:1, email:"swatisharma2435.indiit@gmail.com", password:"Swati20"})
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // console.log('onLogin SAGA ERROR ===>', error);
      return;
    });
  if (res) {
    // console.log(res.data, '..--------------------------------------------..');
    if (res?.data?.status) {
      yield put(setLoader(false));
      // showAlertSuccess(res.data.message);
      yield put(loginSuccess(res.data));
      yield put(addToCartSuccess(res.data?.cartcount));
      // yield put(removeAnswer())
      // yield put(loginSuccess(res.data));
      // showAlert(res.data.message);
      // console.log(res.data.message, ' message from saga login ');
      navigation.changeRole({ user: 'user', id: 2 })
      res?.data?.userProfile == true ?
        navigation.navigation2() : navigation.navigation()

      let params = {
        endpoint: API_URL.getProfile,
        userToken: res?.data?.Usertoken,
        id: { userId: res?.data?.UserData?._id },
      };
      // callback({ params: params })
      // yield call(datingProfileRequest(params));

    } else {
      yield put(setLoader(false));
      // showAlertError(res.data.message)
      yield put(loginFail());
      // showAlert(res.data.message);
      // console.log(res.data.message);
    }
  } else {
    yield put(setLoader(false));
    // showAlert(res.data.message)
    // console.log(REQUIRED_ERROR_MESSAGE);
    // showAlert(ERROR_MESSAGE);
  }
  // yield put(setLoader(false));
}


function* onChangePasswordRequest({ data, navigation }) {
  yield put(setLoader(true));
  // console.log(data, 'data', navigation, 'navigation onChangePasswordRequest --------------- ');
  let res = yield axiosClient
    .post(navigation.endpoint,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': navigation.userToken
        }
      })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // console.log('onChangePasswordRequest SAGA ERROR ===>', error);
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
      navigation.onPlaceOrder()
    } else {
      yield put(setLoader(false));
      navigation.onPlaceOrderFail()
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
    // yield put(setLoader(true));
    // console.log(navigation.endpoint, navigation.userToken, 'navigation --------------- ', "hi");
    let res = yield axiosClient
      .post(navigation.endpoint,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': navigation.userToken
          }
        })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // console.log('onSignOut SAGA ERROR ===>', error);
      return;
    });
    if (res) {
      // console.log(res?.data, '....onSignOut Api Response');
      if (res?.data?.status) {
        yield put(setLoader(false));
        // showAlertSuccess(res?.data?.message);
        yield put(signOutSuccess());
        // yield put(removeAnswer('all'))
        // Removed because we can use rootReducer
        // yield put(removeAnswer())
        // yield put(removeAll())
        // yield put(removeAllSignupData())
        // yield put(removeAllCart())
        // yield put(removeAllFavourites())
        // yield put(removeAllProfileData())
        //....................................
        // yield put(loginSuccess(res.data));
        // showAlert(res.data.message);
        navigation.changeRole({ user: 'Guest', id: 1 })
        navigation.navigation();
        // console.log(res?.data?.status, 'onSignOut Api Response status');
      } else {
        yield put(setLoader(false));
        // console.log(res?.data?.status, 'onSignOutFail Response status');
        // res?.data?.message ?
        //   showAlertError(res?.data?.message) : null  // remove
        yield put(signOutFail());
        // showAlert(res.data.message);
        // console.log(res?.data?.message);  // remove
      }
    } else {
      yield put(setLoader(false));
      {
        // res?.data?.message ?
        //   showAlert(res?.data?.message) : null // remove
      }
      // console.log(REQUIRED_ERROR_MESSAGE);
    }
  } catch (err) {
    // console.log(err, "SIGNERR")
  }

}



function* sagaLogin() {
  yield takeLatest(LOGIN_REQUESTED, onLoginRequest);
  yield takeLatest(SIGNOUT_REQUESTED, onSignOutRequest);
  yield takeLatest(CHANGEPASSWORD_REQUESTED, onChangePasswordRequest);
}
export default sagaLogin;


// function* sagaMobile() {
//   yield takeLatest(LOGIN_REQUESTED, onLoginRequest);
//   yield takeLatest(SOCIAL_LOGIN_REQUESTED, onSocialLoginRequest);
//   yield takeLatest(FORGOT_PASS_REQUESTED, onForgotPass);
//   yield takeLatest(OTP_VERIFICATION_REQUESTED, onOtpVerification);
//   yield takeLatest(RESET_PASSWORD_REQUESTED, onResetPassword);
//   yield takeLatest(LOGOUT_REQUESTED, onLogoutRequest);
//   yield takeLatest(RESET_REQUESTED, onResetRequest);
// }
// export default sagaMobile;