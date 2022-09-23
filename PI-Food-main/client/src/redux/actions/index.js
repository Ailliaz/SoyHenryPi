const axios = require("axios");
export const SEARCH_RECIPES = "SEARCH_RECIPES";
export const SEARCH_ID = "SEARCH_ID";

export const searchRecipes =
  (recipe, orderValue, filterValue, diets) => (dispatch) => {
    if (recipe === "") {
      return axios
        .get(`http://localhost:3001/recipes/get`, {
          params: {
            ...(orderValue !== "" ? { order: orderValue } : {}),
            ...(filterValue !== "" ? { filter: filterValue } : {}),
            ...(diets.length > 0 ? { diet: diets.join("_") } : {}),
          },
        })
        .then((response) => response.data)
        .then((data) => dispatch({ type: SEARCH_RECIPES, payload: data }));
    } else {
      return axios
        .get(`http://localhost:3001/recipes/`, {
          params: {
            name: recipe,
            ...(orderValue !== "" ? { order: orderValue } : {}),
            ...(filterValue !== "" ? { filter: filterValue } : {}),
            ...(diets.length > 0 ? { diet: diets.join("_") } : {}),
          },
        })
        .then((response) => response.data)
        .then((data) => dispatch({ type: SEARCH_RECIPES, payload: data }));
    }
  };

export const searchId = (id) => (dispatch) => {
  return axios
    .get(
      `http://localhost:3001/recipes/${id}?summary=summary&steps=steps&healthScore=healthScore&image=image&dishTypes=dishTypes`
    )
    .then((response) => response.data)
    .then((data) => dispatch({ type: SEARCH_ID, payload: data }));
};
