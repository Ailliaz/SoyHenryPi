import { GET_RECIPES, ALL_RECIPES } from "../actions";

const initialState = {
  recipes: [],
};

function getRecipes(state, payload) {
  const temp = { ...state };
  temp.recipes = { ...payload };
  return temp;
}

function allRecipes(state, payload) {
  const temp = { ...state };
  temp.recipes = { ...payload };
  return temp;
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_RECIPES":
      return getRecipes(state, action.payload);

    case "ALL_RECIPES":
      return allRecipes(state, action.payload);

    default:
      return state;
  }
};

export default rootReducer;
