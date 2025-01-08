const Recipe = require('../models/Recipe');

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch recipes', error: error.message });
    }
};

exports.createRecipe = async (req, res) => {
    try {
        const recipe = new Recipe(req.body);
        const savedRecipe = await recipe.save();
        res.status(201).json(savedRecipe);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create recipe', error: error.message });
    }
};

exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if(!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json(recipe);
    }catch (error) {
        res.status(500).json({ message: 'Failed to fetch recipe', error: error.message });
    }
};

