import authReducer from './authReducer'
import costReducer from './costReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  auth: authReducer,
  cost: costReducer,
  firestore: firestoreReducer
});

export default rootReducer