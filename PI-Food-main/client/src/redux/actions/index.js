const axios = require("axios");
export const SEARCH_RECIPES = "SEARCH_RECIPES";
export const SEARCH_ID = "SEARCH_ID";
export const CLEAR_ID = "CLEAR_ID";

export const searchRecipes =
  (recipe, orderValue, filterValue, diets) => (dispatch) => {
    if (recipe === "") {
      return axios
        .get(`recipes/get`, {
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
        .get(`recipes/`, {
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
      `recipes/${id}?summary=summary&steps=steps&healthScore=healthScore&image=image&dishTypes=dishTypes`
    )
    .then((response) => response.data)
    .then((data) => dispatch({ type: SEARCH_ID, payload: data }));
};

export function clearId() {
  return {
    type: CLEAR_ID,
    payload: [],
  };
}
