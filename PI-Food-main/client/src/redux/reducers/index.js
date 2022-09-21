const initialState = {
  recipes: [],
  id: [],
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

function addId(state, payload) {
  return (state.id[0] = payload.id);
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_RECIPES":
      return getRecipes(state, action.payload);

    case "ALL_RECIPES":
      return allRecipes(state, action.payload);

    case "ADD_ID":
      return addId(state, action.payload);

    default:
      return state;
  }
};

export default rootReducer;
