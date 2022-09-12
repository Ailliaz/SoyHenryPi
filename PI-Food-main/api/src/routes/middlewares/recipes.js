const { Router } = require("express");
const { Recipe } = require("../../models/Recipe");
const { Diet } = require("../../models/Diet");
const router = Router();
const { validatePost } = require("./utility");

router.get("/", (req, res) => {
  const { name } = req.query;
  if (!name) res.status(404).json({ msg: "Name is needed" });
  const { data } = fetch(
    "https://run.mocky.io/v3/64dfef83-658b-47e0-a079-8e106c0bc34a"
  ).then((response) => response.json);
});

router.get("/:id", (req, res) => {
  const id = req.params;
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const error = validatePost(req.body);
  console.log(error);
  if (error) return res.status(404).json({ msg: "Data is missing" });

  try {
    const recipe = await Recipe.create({ ...req.body });
    console.log(recipe);
    res.status(201).json(recipe);
  } catch (err) {
    res
      .status(400)
      .json({ msg: "Failed to creat a new recipe, bad data submited" });
  }
});

module.exports = router;
