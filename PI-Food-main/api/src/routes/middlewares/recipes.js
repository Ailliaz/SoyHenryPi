const { Router } = require("express");
const { Recipe, Diet, Op } = require("../../db");
const router = Router();
const {
  validatePost,
  // searchByName,
  createRecipe,
  saveRecipes,
} = require("./utility");

router.get("/", async (req, res) => {
  const { name } = req.query;
  if (!name) res.status(404).json({ msg: "Name is needed" });

  try {
    const recipes = await Recipe.findAll({
      where: { name: { [Op.iLike]: "%" + name + "%" } },
    });
    if (recipes.length > 0) res.status(200).json(recipes);
    else res.status(200).json({ msg: `There was no match for ${name}` });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Failed to do the search" });
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
});

router.post("/", async (req, res) => {
  const error = validatePost(req.body);
  if (error) return res.status(404).json({ msg: "Data is missing" });

  try {
    const recipe = await createRecipe(req.body);
    if (recipe) res.status(201).json(recipe);
  } catch (err) {
    res
      .status(400)
      .json({ msg: "Failed to creat a new recipe, bad data submited" });
  }
});

module.exports = router;
