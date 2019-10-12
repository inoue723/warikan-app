const initState = {}

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SAVE_COST_SUCCESS':
      console.log('save cost success');
      return state;
    case 'SAVE_COST_ERROR':
      console.log('save cost error');
      return state;
    default:
      return state;
  }
};

export default projectReducer;