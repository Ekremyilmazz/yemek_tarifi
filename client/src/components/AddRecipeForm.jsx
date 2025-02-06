import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { recipeApi } from '../services/api';

const AddRecipeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    category: '',
    cookingTime: '',
    instructions: '',
    author: '',
    image: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const ingredientsArray = formData.ingredients.split(',').map(item => item.trim());
      
      const recipeData = {
        ...formData,
        ingredients: ingredientsArray,
        cookingTime: parseInt(formData.cookingTime)
      };

      await recipeApi.createRecipe(recipeData);
      toast.success('Tarif başarıyla eklendi!');
      navigate('/tarifler');

    } catch (error) {
      console.error('Hata:', error);
      toast.error('Tarif eklenirken bir hata oluştu');
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[300px] mt-28">
        <img
          src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1800"
          alt="Recipe Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-white mb-4">
              Yeni Tarif Ekle
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Sevdiğiniz tarifleri toplulukla paylaşın
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[100%] mx-auto"
        >
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="space-y-6">
              {/* Tarif Adı */}
              <div>
                <label className="block font-playfair text-lg font-semibold text-gray-700 mb-2">
                  Tarif Adı
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                  placeholder="Tarifinizin adı"
                  required
                />
              </div>

              {/* Kategori */}
              <div>
                <label className="block font-playfair text-lg font-semibold text-gray-700 mb-2">
                  Kategori
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                  required
                >
                  <option value="">Kategori seçin</option>
                  <option value="kahvalti">Kahvaltı</option>
                  <option value="corba">Çorba</option>
                  <option value="ana-yemek">Ana Yemek</option>
                  <option value="tatli">Tatlı</option>
                  <option value="salata">Salata</option>
                </select>
              </div>

              {/* Açıklama */}
              <div>
                <label className="block font-playfair text-lg font-semibold text-gray-700 mb-2">
                  Açıklama
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                  placeholder="Tarifiniz hakkında kısa bir açıklama yazın"
                  required
                />
              </div>

              {/* Malzemeler */}
              <div>
                <label className="block font-playfair text-lg font-semibold text-gray-700 mb-2">
                  Malzemeler
                </label>
                <textarea
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                  placeholder="Malzemeleri virgülle ayırarak yazın (örn: 2 su bardağı pirinç, 1 adet soğan, 2 yemek kaşığı zeytinyağı)"
                  required
                />
              </div>

              {/* Hazırlanışı */}
              <div>
                <label className="block font-playfair text-lg font-semibold text-gray-700 mb-2">
                  Hazırlanışı
                </label>
                <textarea
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                  placeholder="Hazırlanış adımlarını alt alta madddeler şeklinde (1. 2. 3.) detaylı bir şekilde yazın"
                  required
                />
              </div>

              {/* Pişirme Süresi */}
              <div>
                <label className="block font-playfair text-lg font-semibold text-gray-700 mb-2">
                  Pişirme Süresi (dakika)
                </label>
                <input
                  type="number"
                  name="cookingTime"
                  value={formData.cookingTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                  placeholder="Örn: 45"
                  required
                />
              </div>

              {/* Resim Yükleme */}
              <div>
                <label className="block font-playfair text-lg font-semibold text-gray-700 mb-2">
                  Tarif Görseli
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    {formData.image ? (
                      <div className="mb-4">
                        <img
                          src={formData.image}
                          alt="Yüklenecek görsel"
                          className="mx-auto h-32 w-auto rounded-lg"
                        />
                      </div>
                    ) : (
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-amber-600 hover:text-amber-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-amber-500">
                        <span>Dosya Seç</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="pl-1">veya sürükle bırak</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF max 10MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Yazar Adı */}
              <div>
                <label className="block font-playfair text-lg font-semibold text-gray-700 mb-2">
                  Yazar Adı
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                  placeholder="Adınız ve soyadınız"
                  required
                />
              </div>

              {/* Gönder Butonu */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-amber-500 text-white py-4 px-6 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                >
                  Tarifi Yayınla
                </button>
              </div>
            </div>
          </form>

          {/* İpuçları Kartı */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100"
          >
            <h3 className="font-playfair text-lg font-semibold text-blue-800 mb-3">
              Tarif Ekleme İpuçları
            </h3>
            <ul className="space-y-2 text-blue-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                Malzemeleri virgülle ayırarak yazın
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                Ölçü birimlerini belirtmeyi unutmayın
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                Açıklamada tarifinizin özel noktalarından bahsedin
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddRecipeForm;
