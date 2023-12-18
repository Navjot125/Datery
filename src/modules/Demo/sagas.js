import {put, takeLatest} from 'redux-saga/effects';
import {DEMO_REQUESTED} from './types';
import {demoFail, demoSuccess} from './actions';

function* onDemoRequest({data}) {
  // API CALL
  // RESULT
  // yield put(demoSuccess(data));
  // yield put(demoFail());
}

function* sagaDemo() {
  yield takeLatest(DEMO_REQUESTED, onDemoRequest);
}
export default sagaDemo;
