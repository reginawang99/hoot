const initialState = {
  query: null,
  section: null,
};
export default function search(state = initialState, action) {
  console.log(state);
  console.log(action)
  switch (action.type) {
    case "SET_QUERY": {
      return {
        ...state,
        query: action.payload.query
      };
    }
    case "SET_SECTION": {
      return {
        ...state,
        section: action.payload.section
      };
    }
    default:
      return state;
  }
}
