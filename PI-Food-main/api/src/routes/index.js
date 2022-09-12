const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes/recipes?name=:name", (req, res) => {});

router.get("/recipes/:id", (req, res) => {});

router.post("/recipes", async (req, res) => {});

router.get("/diets", (req, res) => {});

module.exports = router;
