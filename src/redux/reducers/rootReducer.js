import authReducer from './authReducer'
import costReducer from './costReducer'
import flashMessageReducer from "./flashMessageReducer"
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from "react-redux-firebase"

const rootReducer = combineReducers({
  auth: authReducer,
  cost: costReducer,
  flashMessage: flashMessageReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer