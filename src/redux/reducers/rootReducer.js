import authReducer from './authReducer'
import costReducer from './costReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from "react-redux-firebase"

const rootReducer = combineReducers({
  auth: authReducer,
  cost: costReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer