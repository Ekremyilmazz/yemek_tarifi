import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const recipeApi = {
    getAllRecipes: async () => {
        try {
            const response = await fetch(`${API_URL}/recipes`);
            return await response.json();
        } catch (error) {
            throw new Error('Failed to fetch recipes');
        }
    },

    createRecipe: async (recipeData) => {
        try {
            const response = await axios.post(`${API_URL}/recipes`, recipeData);
            return response.data;
        }catch (error) {
            throw new Error('Failed to create recipe');
        }
    },

    getRecipeById: async (id) => {
        try {
            const response = await fetch(`${API_URL}/recipes/${id}`);
            return await response.json();
        }catch (error) {
            throw new Error('Failed to fetch recipe');
        }
    }
};

