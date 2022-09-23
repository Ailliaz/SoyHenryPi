const fetch = require("node-fetch");
const { Recipe, Diet, Op } = require("../../db");
const Recipe_Diet = require("../../models/Recipe_Diet");
const { API_KEY } = process.env;

//Mock Api
_EXTERNAL_URL = "https://run.mocky.io/v3/64dfef83-658b-47e0-a079-8e106c0bc34a";
//Spoonacular
// _EXTERNAL_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`;

async function initializeDiet() {
  const diets = [
    "Gluten Free",
    "Dairy Free",
    "Ketogenic",
    "Vegetarian",
    "Lacto-Vegetarian",
    "Ovo-Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "low FODMAP",
    "Whole30",
  ];
  try {
    for (const diet of diets) await Diet.create({ name: diet });
  } catch (error) {
    return error;
  }
}

function validatePost(body) {
  if (!body.name || !body.summary) return true;
  else return false;
}

// async function searchByName(name) {
//   let data = await fetch(_EXTERNAL_URL);
//   data = await data.json();
//   data = data.results;
//   const param = name.toLowerCase(name);
//   const match = data.filter((item) => {
//     return item.title.toLowerCase().includes(param);
//   });
//   let showable = [];
//   match.map((obj) =>
//     showable.push({
//       name: obj.title,
//       summary: obj.summary,
//       healthScore: obj.healthScore,
//       vegetarian: obj.vegetarian,
//       vegan: obj.vegan,
//       glutenFree: obj.glutenFree,
//       dairyFree: obj.dairyFree,
//       image: obj.image,
//       step: stepByStep(obj.analyzedInstructions),
//     })
//   );
//   return showable;
// }

function stepByStep(array) {
  let ing = [];
  let equip = [];
  const stepBy = array[0].steps.map((o) => {
    o.ingredients.map((i) => {
      if (ing.indexOf(i.name) === -1) ing.push(i.name);
    });
    o.equipment.map((e) => {
      if (equip.indexOf(e.name) === -1) equip.push(e.name);
    });
    return o.step;
  });
  return { steps: stepBy, ingredients: ing, equipment: equip };
}

function createRecipe(body) {
  const { name, summary, healthScore, image, dishTypes, analyzedInstructions } =
    body;
  const recipe = Recipe.create({
    name: name,
    summary: summary,
    healthScore: healthScore,
    steps: stepByStep(analyzedInstructions),
    image: image,
    dishTypes: dishTypes,
  }).catch((err) => {
    console.log(err);
    throw new Error(err);
  });
  return recipe;
}

async function initializeRecipes() {
  const rawData = await fetch(_EXTERNAL_URL);
  const data = await rawData.json();
  const recipes = data.results;
  const newRecipes = recipes.map((recipe) => {
    if (recipe.analyzedInstructions.length > 0)
      return {
        name: recipe.title,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        steps: stepByStep(recipe.analyzedInstructions),
        image: recipe.image,
        dishTypes: recipe.dishTypes,
      };
    else
      return {
        name: recipe.title,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        steps: "",
        image: recipe.image,
        dishTypes: recipe.dishTypes,
      };
  });
  await Recipe.bulkCreate(newRecipes);
  recipes.map((recipe) => createRelationship(recipe.title, recipe.diets));
}

async function createRelationship(name, diets) {
  const recipe = await Recipe.findOne({ where: { name: name } });
  let newDiets = diets.map((diet) => {
    return dietSelector(diet);
  });
  if (newDiets.find((element) => element === "Lacto-Vegetarian")) {
    newDiets.push("Vegetarian");
    newDiets.push("Ovo-Vegetarian");
  }
  if (
    newDiets.find((element) => element === "Vegan") &&
    !newDiets.find((element) => element === "Vegetarian")
  ) {
    newDiets.push("Vegetarian");
  }
  const array = newDiets.map((diet) => {
    return { name: diet };
  });
  const dietsdb = await Diet.findAll({ where: { [Op.or]: array } });
  await recipe.addDiet(dietsdb, { through: Recipe_Diet });
  return;
}

function dietSelector(str) {
  if (str === "gluten free") return "Gluten Free";
  else if (str === "dairy free") return "Dairy Free";
  else if (str === "vegan") return "Vegan";
  else if (str === "primal") return "Primal";
  else if (str === "ketogenic") return "Ketogenic";
  else if (str === "fodmap friendly") return "low FODMAP";
  else if (str === "paleolithic") return "Paleo";
  else if (str === "whole 30") return "Whole 30";
  else if (str === "pescatarian") return "Pescetarian";
  else if (str === "lacto ovo vegetarian") return "Lacto-Vegetarian";
  else if (str === "vegetarian") return "Vegetarian";
}

function details(summary, healthScore, steps, image, dishTypes) {
  let attributes = ["id", "name"];
  if (image) attributes.push(image);
  if (summary) attributes.push(summary);
  if (healthScore) attributes.push(healthScore);
  if (steps) attributes.push(steps);
  if (dishTypes) attributes.push(dishTypes);
  return attributes;
}

function filterByDiet(recipes, diet) {
  const diets = diet.split("_");
  const recipe = recipes.filter((diet) => check(diet.Diets, diets));
  function check(data, diet) {
    const comparison = data.map((d) => d.name);
    const check = diet.map((d) => {
      if (comparison.indexOf(d) !== -1) return true;
    });
    let checker = (arr) => arr.every((v) => v === true);
    if (diet.sort().join() === comparison.sort().join()) return true;
    else if (checker(check)) return true;
    return false;
  }
  return recipe;
}

module.exports = {
  validatePost,
  // searchByName,
  stepByStep,
  createRecipe,
  initializeRecipes,
  initializeDiet,
  details,
  createRelationship,
  filterByDiet,
};
