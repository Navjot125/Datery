import { all } from 'redux-saga/effects';

import sagaDemo from '../modules/Demo/sagas';
import sagaRole from '../modules/Role/sagas'
import sagaSignup from '../modules/SignUp/sagas';
import sagaLogin from '../modules/Login/sagas';
import sagaQuestion from '../modules/GetQuestions/sagas';
import sagaAnswer from '../modules/SetAnswer/sagas';
import sagaProfile from '../modules/Profile/sagas';
import sagaMerchant from '../modules/Merchants/sagas';
import sagaCart from '../modules/Cart/sagas';
import sagaLearn from '../modules/learn/sagas';
import sagaPlay from '../modules/play/sagas';
import sagauserReview from '../modules/userReview/sagas';
import sagaCard from '../modules/addCard/sagas';
import sagaPlan from '../modules/plan/sagas';

export default function* rootSaga() {
  yield all([
    sagaDemo(),
    sagaRole(),
    sagaSignup(),
    sagaLogin(),
    sagaQuestion(),
    sagaAnswer(),
    sagaProfile(),
    sagaMerchant(),
    sagaCart(),
    sagaLearn(),
    sagaPlay(),
    sagauserReview(),
    sagaCard(),
    sagaPlan()
  ]);
}
