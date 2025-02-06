const Recipe = require('../models/Recipe');

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().sort({ createdAt: -1 });
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Tarifler yüklenirken bir hata oluştu', error: error.message });
    }
};

exports.createRecipe = async (req, res) => {
    try {
        const recipe = new Recipe(req.body);
        const savedRecipe = await recipe.save();
        res.status(201).json(savedRecipe);
    } catch (error) {
        res.status(500).json({ message: 'Tarif eklenirken bir hata oluştu', error: error.message });
    }
};

exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if(!recipe) {
            return res.status(404).json({ message: 'tarif bulunamadı.' });
        }
        res.json(recipe);
    }catch (error) {
        res.status(500).json({ message: 'tarif detayı yüklenirken bir hata oluştu', error: error.message });
    }
};

exports.updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            req.body, 
            { new: true });
            if (!recipe) {
                return res.status(404).json({ message: 'Tarif bulunamadı.' });
            }
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: 'Tarif güncellenirken bir hata oluştu', error: error.message });
    }
};

exports.deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: 'Tarif bulunamadı.' });
        }
        res.status(200).json({ message: 'Tarif başarıyla silindi' });
    } catch (error) {
        res.status(500).json({ message: 'Tarif silinirken bir hata oluştu', error: error.message });
    }
};
