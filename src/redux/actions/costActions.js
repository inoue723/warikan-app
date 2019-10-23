export const saveCost = (cost) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const { uid } = getState().firebase.auth;


    dispatch({ type: "SAVE_COST_TRY" });
    const userRef = firestore.collection("users").doc(uid);

    const category = await userRef.collection("categories").doc(cost.category).get();
    if (!category.exists) {
      await userRef.collection("categories").add({
        name: cost.category,
        createdAt: firestore.FieldValue.serverTimestamp()
      }).catch((err) => dispatch({ type: "CREATE_CATEGORY_ERROR" }, err));
    }

    await userRef.collection("costs").add({
      ...cost,
      createdAt: firestore.FieldValue.serverTimestamp()
    }).catch(err => dispatch({ type: "SAVE_COST_ERROR" }, err));

    dispatch({ type: "SAVE_COST_SUCCESS" });
    dispatch({ type: "EMIT_FLASH_MESSAGE", message: "保存しました", messageType: "success" });
  }
};