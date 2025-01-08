const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [String],
    instructions: { type: String, required: true },
    category: { type: String, required: true },
    cookingTime: { type: Number, required: true },
    author: { type: String, required: true },
    image: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);
