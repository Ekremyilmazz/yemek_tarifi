import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Axios instance oluştur
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const recipeApi = {
    getAllRecipes: () => api.get('/recipes'),

    getRecipeById: (id) => api.get(`/recipes/${id}`),

    createRecipe: (recipeData) => api.post('/recipes', recipeData),

    updateRecipe: (id, recipeData) => api.put(`/recipes/${id}`, recipeData),

    deleteRecipe: (id) => api.delete(`/recipes/${id}`)
};
