const initState = {
  isSuccess: null,
  isTrying: null,
  error: null
}

const costReducer = (state = initState, action) => {
  switch (action.type) {
    case "SAVE_COST_TRY":
      console.log("save cost try");
      return {
        isTrying: true
      }
    case 'SAVE_COST_SUCCESS':
      console.log('save cost success');
      return {
        ...state,
        isSuccess: true,
        isTrying: false
      };
    case 'SAVE_COST_ERROR':
      console.log('save cost error');
      return {
        ...state,
        error: action.err,
        isSuccess: false,
        isTrying: false
      };
    default:
      return state;
  }
};

export default costReducer;