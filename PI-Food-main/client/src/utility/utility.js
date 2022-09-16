const { useDispatch } = require("react-redux");
const { useState } = require("react");
const { allRecipes } = require("../redux/actions");

function Recipes(prop, order) {
  const dispatch = useDispatch();
  const recipe = dispatch(allRecipes(prop, order));

  const [recipeState, setRecipe] = useState([]);

  recipe.then((response) => setRecipe(response));

  const middleArray = recipeState.map((obj) => obj);
  let recipes = [];
  for (const obj of middleArray) {
    if (middleArray[obj].length > 0) recipes.push(middleArray[obj]);
  }
  return recipes;
}

module.exports = { Recipes };
