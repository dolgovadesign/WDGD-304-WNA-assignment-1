const express = require('express');
const controller = require('../controllers/index');

// Creating a router
const router = express.Router();

// Registering routes
router.get('/', controller.viewHome);
router.get('/recipes', controller.viewRecipes);
router.get('/recipes/add', controller.viewAddRecipe);
router.get('/recipes/:id', controller.viewRecipe);
router.get('/recipes/:id/delete', controller.deleteRecipe);
router.get('/recipes/:id/edit', controller.viewEditRecipe);
router.post('/recipes', controller.addRecipe);
router.put('/recipes/:id', controller.editRecipe);

// Exporting configured router
module.exports = router;