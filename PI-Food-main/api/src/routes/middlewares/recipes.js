const { Router } = require("express");
const { Recipe, Diet, Op } = require("../../db");
const router = Router();
const {
  validatePost,
  // searchByName,
  createRecipe,
  details,
  createRelationship,
} = require("./utility");

router.get("/", async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(404).json({ msg: "Name is needed" });
  }

  try {
    const recipes = await Recipe.findAll({
      where: { name: { [Op.iLike]: "%" + name + "%" } },
      attributes: ["id", "name", "summary", "healthScore", "steps", "image"],
      include: Diet,
      order: [["id", "ASC"]],
    });
    if (recipes.length > 0) res.status(200).json(recipes);
    else res.status(200).json({ msg: `There was no match for ${name}` });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Failed to do the search" });
  }
});

router.get("/get", async (req, res) => {
  let { prop, order } = req.query;
  if (!req.query.prop) {
    prop = "id";
  }
  if (!req.query.order) {
    order = "ASC";
  }
  res.status(200).json(
    await Recipe.findAll({
      attributes: ["id", "name", "summary", "healthScore", "steps", "image"],
      include: Diet,
      order: [[prop, order]],
    })
  );
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (id / 1 !== NaN)
    return res.status(400).json({ msh: "Id must be a number" });
  const { summary, healthScore, steps, image } = req.query;
  const attributes = details(summary, healthScore, steps, image);
  const recipe = await Recipe.findByPk(id, {
    attributes: attributes,
    include: Diet,
  });
  if (!recipe)
    return res
      .status(400)
      .json({ msg: "No recipe was found that matched that id" });
  res.status(200).json(recipe);
});

router.post("/", (req, res) => {
  const error = validatePost(req.body);
  const find = Recipe.findAll({ where: { name: req.body.name } });
  if (error) return res.status(404).json({ msg: "Data is missing" });
  if (find.length > 0)
    return res
      .status(400)
      .json({ msg: `${req.body.name} is already in the database` });

  return createRecipe(req.body)
    .then((returned) => {
      createRelationship(returned.name, req.body.diets);
      return res.status(201).json(returned);
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ msg: "Failed to creat a new recipe, bad data submited" });
    });
});

module.exports = router;
