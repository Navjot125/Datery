import { call, put, takeLatest } from "redux-saga/effects";
import { ANSWER_REQUESTED, SET_ANSWER } from "./types";
import { answerFail, answerSuccess } from "./actions";
import { API_URL } from "../../Constants/Config";
import axiosClient from "../../Utils/ApiClient";
import { REQUIRED_ERROR_MESSAGE } from "../../Constants/ErrorMessages";
import { CommonActions } from "@react-navigation/native";
import { datingProfileRequest } from "../Profile/actions";
import { setLoader } from "../Loader/actions";

function* onDemoRequest({ data }) {
  // API CALL
  // RESULT
  // yield put(demoSuccess(data));
  // yield put(demoFail());
}

// function* onSetAnswer({data, navigation}) {
// console.log(data, 'data', navigation, 'navigation --------------- onAnswerRequest');
//   const response = yield call(props.answerRequest, mergedObject, params);
//   // yield put(setLoader(true));
// console.log(response,'response ------------------------------------');
//   // let res = yield axiosClient
//   // .post(navigation.endpoint, data,
//   //   {
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //       'Authorization': navigation.userToken
//   //     }
//   //   })
//   // .then(function (response) {
//   //     return response;
//   //   })
//   //   .catch(function (error) {
//     console.log('onAnswerRequest SAGA ERROR ===>', error);
//   //     return;
//   //   });
//   // if (res) {
//   console.log(res.data,'....response of api onAnswerRequest');
//   //   if (res?.data?.status) {
//   //     // yield put(answerSuccess(res.data.UserData));
//   //     yield put(answerSuccess(res.data));
//   //     // yield put(loginSuccess(res.data));
//   //     // showAlert(res.data.message);
//   //     console.log(res.data.message,' message from saga login onAnswerRequest ');
//   //     navigation.navigation();
//   //   } else {
//   //     yield put(answerFail());
//   //     // showAlert(res.data.message);
//   //     console.log(res.data.message, 'fail at onAnswerRequest');
//   //   }
//   // } else {
//   //   console.log(REQUIRED_ERROR_MESSAGE);
//   //   // showAlert(ERROR_MESSAGE);
//   // }
//   // yield put(setLoader(false));
// }

function* onAnswerRequestOld({ data, navigation }) {
  console.log(
    data,
    "data",
    navigation,
    "navigation --------------- onAnswerRequest"
  );
  // yield put(setLoader(true));
  let res = yield axiosClient
    .post(navigation.endpoint, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: navigation.userToken || navigation.token,
      },
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // console.log('onAnswerRequest SAGA ERROR ===>', error);
      return;
    });
  if (res) {
    yield put(setLoader(false));
    console.log(res.data, "....response of api onAnswerRequest");
    if (res?.data?.status) {
      // yield put(answerSuccess(res.data.UserData));
      yield put(answerSuccess(res.data));
      let params = {
        endpoint: API_URL.getProfile,
        userToken: navigation.userToken || navigation.token,
        id: { userId: navigation.id },
      };
      // yield put(datingProfileRequest(params));

      // yield call(datingProfileRequest(params));
      // yield put(loginSuccess(res.data));
      // showAlert(res.data.message);
      console.log(res.data, " message from saga login onAnswerRequest ");
      navigation.navigation();
    } else {
      yield put(answerFail());
      // showAlert(res.data.message);
      console.log(res.data, "fail at onAnswerRequest");
    }
  } else {
    yield put(setLoader(false));
    // console.log(REQUIRED_ERROR_MESSAGE);
    // showAlert(ERROR_MESSAGE);
  }
  // yield put(setLoader(false));
}

function* onAnswerRequest({ data }) {
  try {
  yield put(setLoader(true));
  let res = yield axiosClient
    .post(data?.endpoint, data?.mergedObject, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: data?.token,
      },
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // yield put(setLoader(false));
      // data?.error(error)
      console.log(error, "-------------onAnswerRequest error saga", error?.response?.data);
      return;
    });
  if (res?.data?.status) {
    yield put(setLoader(false));
    console.log(res?.data, "res?.data-------- on onAnswerRequest");
    // yield put(signupSuccess(res.data));
    // yield put(addToCartSuccess(0));
    // data.changeRole({ user: "user", id: 2 });
    data.navigation();
    // let param = {
    //   token: res?.data?.Usertoken,
    //   endpoint: API_URL.getProfile,
    //   id: res?.data?.UserData?._id,
    // };
    // data?.cb(param);
  } else {
    yield put(setLoader(false));
    // data?.error(res?.data?.message)
    console.log("res of false status onAnswerRequest", res);
    // yield put(signupFail());
  }
}
catch (err) {
console.log(err,'error in submit answer');
}
}
function* sagaAnswer() {
  // yield takeLatest(SET_ANSWER, onSetAnswer);
  yield takeLatest(ANSWER_REQUESTED, onAnswerRequest);
}
export default sagaAnswer;
