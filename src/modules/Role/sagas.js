import { put, takeLatest } from 'redux-saga/effects';
import { DEMO_REQUESTED, ROLE_REQUESTED } from './types';
import { demoFail, demoSuccess, roleFail, roleSuccess } from './actions';
import { API_URL } from '../../Constants/Config';

function* onDemoRequest({ data }) {
  // API CALL
  // RESULT
  // yield put(demoSuccess(data));
  // yield put(demoFail());
}

function* onRoleRequest({ data }) {
  // API CALL
  // RESULT
  if (data) {
    yield put(roleSuccess(data));
  } else {
    yield put(roleFail());
  }
}

function* sagaRole() {
  yield takeLatest(DEMO_REQUESTED, onDemoRequest);
  yield takeLatest(ROLE_REQUESTED, onRoleRequest);
}
export default sagaRole;
