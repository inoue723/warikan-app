import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './redux/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { reduxFirestore, createFirestoreInstance, getFirestore } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import firebase from './config/fbConfig'

const store = createStore(rootReducer, {},
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(firebase, {})
  )
);

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}

let render = () => {
    ReactDOM.render(
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={rrfConfig}
        initializeAuth={true}
        dispatch={store.dispatch}
        createFirestoreInstance={createFirestoreInstance}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
  )
};

if (module.hot) {
  module.hot.accept('./App', () => {
    setTimeout(render);
  })
}

render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
