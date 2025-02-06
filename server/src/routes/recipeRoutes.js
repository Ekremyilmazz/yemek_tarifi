const express = require('express');
const router = express.Router();
const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
} = require('../controllers/recipeController');

// Tüm tarifleri getir
router.get('/recipes', getAllRecipes);

// Tek bir tarifi getir
router.get('/recipes/:id', getRecipeById);

// Yeni tarif ekle
router.post('/recipes', createRecipe);

// Tarifi güncelle
router.put('/recipes/:id', updateRecipe);

// Tarifi sil
router.delete('/recipes/:id', deleteRecipe);

module.exports = router;
