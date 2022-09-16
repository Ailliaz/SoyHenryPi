const axios = require("axios");
export const GET_RECIPES = "GET_RECIPIES";
export const ALL_RECIPES = "ALL_RECIPES";

export const getRecipes = (name) => (dispatch) => {
  return axios
    .get(`http://localhost:3001/recipes?name=${name}`)
    .then((response) => response.data)
    .then((data) => dispatch({ type: GET_RECIPES, payload: data }));
};

export const allRecipes = (prop, order) => (dispatch) => {
  return axios
    .get(`http://localhost:3001/recipes/get?prop=${prop}&order=${order}`)
    .then((response) => response.data)
    .then((data) => dispatch({ type: ALL_RECIPES, payload: data }));
};

export const getDetails = () => (dipatch) => {};
