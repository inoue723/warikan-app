export const saveCost = (cost) => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const { uid } = getState().firebase.auth;

    dispatch({ type: "SAVE_COST_TRY" });
    firestore.collection("users").doc(uid).collection("costs").add({
      ...cost,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: "SAVE_COST_SUCCESS" });
      dispatch({ type: "EMIT_FLASH_MESSAGE", message: "保存しました", messageType: "success" });
    }).catch(err => {
      dispatch({ type: "SAVE_COST_ERROR" }, err);
    });
  }
};