const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Tüm tarifleri getir
router.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (error) {
    console.error('Tarifler yüklenirken hata:', error);
    res.status(500).json({ message: 'Tarifler yüklenirken bir hata oluştu' });
  }
});

// Tek bir tarifi getir
router.get('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Tarif bulunamadı' });
    }
    res.json(recipe);
  } catch (error) {
    console.error('Tarif detayı yüklenirken hata:', error);
    res.status(500).json({ message: 'Tarif detayı yüklenirken bir hata oluştu' });
  }
});

// Yeni tarif ekle
router.post('/recipes', async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    const savedRecipe = await recipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error('Tarif eklenirken hata:', error);
    res.status(500).json({ message: 'Tarif eklenirken bir hata oluştu' });
  }
});

// Tarifi güncelle
router.put('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!recipe) {
      return res.status(404).json({ message: 'Tarif bulunamadı' });
    }
    res.json(recipe);
  } catch (error) {
    console.error('Tarif güncellenirken hata:', error);
    res.status(500).json({ message: 'Tarif güncellenirken bir hata oluştu' });
  }
});

// Tarifi sil
router.delete('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({ message: 'Tarif bulunamadı' });
    }
    
    res.status(200).json({ message: 'Tarif başarıyla silindi' });
  } catch (error) {
    console.error('Silme hatası:', error);
    res.status(500).json({ message: 'Tarif silinirken bir hata oluştu', error: error.message });
  }
});

module.exports = router;
