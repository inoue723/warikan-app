export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: "LOGIN_SUCCESS" })
    }).catch((err) => {
      dispatch({ type: "LOGIN_ERROR", err })
    })
  }
}

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: "SINGOUT_SUCCESS" })
    })
  }
}

export const signUp = (newUser) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    console.log("authActions signUp called");
    const firebase = getFirebase();
    const firestore = getFirestore();
    console.log("*****firestore Obj*****", firestore);

    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((response) => {
      console.log("authActions signUp firestore called");
      return firestore.collection("users").doc(response.user.uid).set({
        name: newUser.name,
      })
    }).then(() => {
      console.log("dispatch called");
      dispatch({ type: "SIGNUP_SUCCESS" })
    }).catch((err) => {
      dispatch({ type: "SIGNUP_FAIL" , err })
    })
  }
}