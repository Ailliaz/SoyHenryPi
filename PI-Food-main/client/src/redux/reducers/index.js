import { SEARCH_ID, SEARCH_RECIPES } from "../actions";

const initialState = {
  recipes: [],
  details: [],
};

function searchRecipes(state, payload) {
  const temp = {
    recipes: payload,
    details: [...state.details],
  };

  return temp;
}

function searchId(state, payload) {
  const temp = state;
  temp.details[0] = { ...payload };
  return temp;
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_RECIPES:
      return searchRecipes(state, action.payload);

    case SEARCH_ID:
      return searchId(state, action.payload);

    default:
      return state;
  }
};

export default rootReducer;
