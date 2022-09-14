const { Router } = require("express");
const { Diet } = require("../db");
const { initializeDiet, initializeRecipes } = require("./middlewares/utility");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/diets", async (req, res) => {
  try {
    res.status(200).json(await Diet.findAll());
  } catch (error) {
    res.status(400).json({ msg: "Failed to get diets" });
  }
});

router.get("/initialize", async (req, res) => {
  try {
    await initializeDiet();
    await initializeRecipes();
    res.status(201).json({ msg: "Database created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Failed to create Diets database" });
  }
});

module.exports = router;
