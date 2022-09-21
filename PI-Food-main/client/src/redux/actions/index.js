const axios = require("axios");
export const GET_RECIPES = "GET_RECIPIES";
export const ALL_RECIPES = "ALL_RECIPES";

export const getRecipes = (name) => (dispatch) => {
  return axios
    .get(`http://localhost:3001/recipes?name=${name}`)
    .then((response) => response.data)
    .then((data) => dispatch({ type: GET_RECIPES, payload: data }));
};

export const allRecipes = () => (dispatch) => {
  return axios
    .get(`http://localhost:3001/recipes/get`)
    .then((response) => response.data)
    .then((data) => dispatch({ type: ALL_RECIPES, payload: data }));
};

export function addId(id) {
  return {
    type: "ADD_ID",
    payload: {
      id: id,
    },
  };
}
