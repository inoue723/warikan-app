export const emitFlashMessage = (message, messageType) => {
  return (dispatch, getState) => {
    dispatch({ type: "EMIT_FLASH_MESSAGE", message, messageType});
  }
};