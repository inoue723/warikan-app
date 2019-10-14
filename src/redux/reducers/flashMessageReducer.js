const initState = {
  message: null,
  messageType: null
}
  
const flashMessageReducer = (state = initState, action) => {
  switch (action.type) {
    case "EMIT_FLASH_MESSAGE":
      console.log("emit message");
      return {
        message: action.message,
        messageType: action.messageType
      }
    default:
      return state;
  }
};
  
export default flashMessageReducer;