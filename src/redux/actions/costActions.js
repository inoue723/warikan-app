export const saveCost = (cost) => {
    return (dispatch, getState, { getFirestore }) => {
      // make async call to database
      const firestore = getFirestore();
      firestore.collection('costs').add({
        ...cost,
        createdAt: new Date()
      }).then(() => {
        dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
      });
    }
  };