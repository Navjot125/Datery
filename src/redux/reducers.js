import storage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';

import demoReducer from '../modules/Demo/reducers';
import roleReducer from '../modules/Role/reducers'
import signupReducer from '../modules/SignUp/reducers'
import loginReducer from '../modules/Login/reducers'
import questionsReducer from '../modules/GetQuestions/reducers'
import answerReducer from '../modules/SetAnswer/reducers'
import loaderReducer from '../modules/Loader/reducers'
import profileReducer from '../modules/Profile/reducers'
import merchantReducer from '../modules/Merchants/reducers'
import cartReducer from '../modules/Cart/reducers'
import learnReducer from '../modules/learn/reducers'
import playReducer from '../modules/play/reducers'
import userReviewReducer from '../modules/userReview/reducers'
import addCardReducer from '../modules/addCard/reducers'
import planReducer from '../modules/plan/reducers'






const appReducer = combineReducers({
  demoReducer,
  roleReducer,
  signupReducer,
  loginReducer,
  questionsReducer,
  answerReducer,
  loaderReducer,
  profileReducer,
  merchantReducer,
  cartReducer,
  learnReducer,
  playReducer,
  userReviewReducer,
  addCardReducer,
  planReducer

});

const initialState = appReducer({}, {});

const rootReducer = (state, action) => {
  if (action.type === 'SIGNOUT_SUCCESS') {
    Object.keys(state).forEach(key => {
      storage.removeItem(`persist:${key}`);
    });
    state = Object.assign({}, initialState);
  }

  return appReducer(state, action);
};

export default rootReducer;

