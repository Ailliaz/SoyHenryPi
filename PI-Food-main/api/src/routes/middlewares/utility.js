const fetch = require("node-fetch");
const { Recipe, Diet } = require("../../db");

_EXTERNAL_URL = "https://run.mocky.io/v3/64dfef83-658b-47e0-a079-8e106c0bc34a";

async function initializeDiet() {
  const diets = [
    "Gluten Free",
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
  const { name, summary, healthScore, step } = body;
  return Recipe.create({
    name: name,
    summary: summary,
    healthScore: healthScore,
    steps: JSON.stringify(step),
  });
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
        steps: JSON.stringify(stepByStep(recipe.analyzedInstructions)),
        image: recipe.image,
      };
    else
      return {
        name: recipe.title,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        steps: "",
        image: recipe.image,
      };
  });
  await Recipe.bulkCreate(newRecipes);
}

module.exports = {
  validatePost,
  // searchByName,
  stepByStep,
  createRecipe,
  initializeRecipes,
  initializeDiet,
};
