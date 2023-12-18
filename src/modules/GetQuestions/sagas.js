import {put, takeLatest} from 'redux-saga/effects';
import {QUESTION_REQUESTED} from './types';
import { questionFail, questionSuccess} from './actions';
import axiosClient from '../../Utils/ApiClient';
import { REQUIRED_ERROR_MESSAGE } from '../../Constants/ErrorMessages';

function* onDemoRequest({data}) {
  // API CALL
  // RESULT
  // yield put(demoSuccess(data));
  // yield put(demoFail());
}
function* onQuestionRequest({data, navigation}) {
  // console.log( navigation, 'navigation ---------------');
  // yield put(setLoader(true));
  // .get(navigation.endpoint)
  let res = yield axiosClient
  .get('getQuestion')
  .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // console.log('onQuestion SAGA ERROR ===>', error);
      return;
    });
  if (res) {
    // console.log(res?.data,'....');
    if (res?.data?.status) {
      yield put(questionSuccess(res.data.Question));
      // yield put(loginSuccess(res.data));
      // showAlert(res.data.message);
      // console.log(res.data.message,' message from saga login ');
      // navigation.saveQuestion({questions: res?.data})
      navigation.navigation();
    } else {
      yield put(questionFail());
      // showAlert(res.data.message);
      // console.log(res.data.message);
    }
  } else {
    // console.log(REQUIRED_ERROR_MESSAGE);
    // showAlert(ERROR_MESSAGE);
  }
  // yield put(setLoader(false));
}
function* sagaQuestion() {
  yield takeLatest(QUESTION_REQUESTED, onQuestionRequest);
}
export default sagaQuestion;

