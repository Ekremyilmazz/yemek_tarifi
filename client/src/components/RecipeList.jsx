import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Kategorileri tanımlayalım
  const categories = [
    { id: 'kahvalti', name: 'Kahvaltı' },
    { id: 'ana-yemek', name: 'Ana Yemek' },
    { id: 'tatli', name: 'Tatlı' },
    { id: 'corba', name: 'Çorba' },
    { id: 'salata', name: 'Salata' }
  ];

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/recipes');
        if (!response.ok) {
          throw new Error('Tarifler yüklenirken bir hata oluştu');
        }
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Tarifler yüklenirken hata:', error);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes && recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? recipe.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Başlık ve arama alanı */}
      <div className="container mx-auto px-4 pt-28">
        {/* Kategoriler */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${selectedCategory === '' 
                ? 'bg-amber-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setSelectedCategory('')}
          >
            Tümü
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === category.id 
                  ? 'bg-amber-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Arama çubuğu */}
        <div className="max-w-xl mx-auto mb-12 px-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tarif ara..."
              className="w-full px-4 py-3 rounded-lg"
            />
          </div>
        </div>

        {/* Tarifler Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
          {filteredRecipes.map((recipe, index) => (
            <motion.div 
              key={recipe._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <div className="p-6 flex-grow">
                <h2 className="font-playfair text-xl font-bold text-gray-800 mb-2">
                  {recipe.title}
                </h2>
                <p className="font-sans text-gray-600 mb-4">
                  {recipe.description}
                </p>
                
                {/* Yazar ve süre bilgisi */}
                <div className="flex items-center text-sm text-gray-500 font-sans mb-4">
                  <span className="font-medium">{recipe.author}</span>
                  <span className="mx-2">•</span>
                  <span>{recipe.cookingTime} dakika</span>
                </div>

                {/* Malzemeler listesi */}
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-700">Malzemeler:</h3>
                  <ul className="space-y-1">
                    {recipe.ingredients.slice(0, 3).map((ingredient, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-amber-500 rounded-full mr-2" />
                        {ingredient}
                      </li>
                    ))}
                    {recipe.ingredients.length > 3 && (
                      <li className="text-amber-500 font-medium">
                        +{recipe.ingredients.length - 3} daha...
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <Link
                to={`/tarif/${recipe._id}`}
                className="block w-full bg-amber-500 text-white py-3 text-center hover:bg-amber-600 transition-colors font-medium"
              >
                Tarifi Görüntüle
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeList;
