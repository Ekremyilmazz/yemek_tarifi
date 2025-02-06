import { useState, useEffect, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { recipeApi } from '../services/api';

// UserIcon bileşeni
const UserIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

// DeleteConfirmModal bileşeni
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
        <h2 className="text-xl font-bold mb-4">Tarifi Sil</h2>
        <p className="text-gray-600 mb-6">Bu tarifi silmek istediğinizden emin misiniz?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            İptal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
};

// EditButtons bileşeni
const EditButtons = memo(({ isEditing, onCancel, onSave, onDelete, onEdit }) => (
  <div className="flex justify-end gap-4 mb-6">
    {isEditing ? (
      <>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          İptal
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Kaydet
        </button>
      </>
    ) : (
      <div className="flex gap-4">
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Sil
        </button>
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
        >
          Düzenle
        </button>
      </div>
    )}
  </div>
));

// EditableContent bileşeni
const EditableContent = memo(({ editedRecipe, onUpdate }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'ingredients') {
      const ingredients = value.split(',').map(item => item.trim());
      onUpdate({
        ...editedRecipe,
        ingredients
      });
    } else {
      onUpdate({
        ...editedRecipe,
        [name]: value
      });
    }
  };

  return (
    <div className="space-y-6 bg-white rounded-xl shadow-md p-6">
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Açıklama
        </label>
        <textarea
          id="description"
          name="description"
          value={editedRecipe.description}
          onChange={handleChange}
          className={styles.textarea}
          rows="3"
        />
      </div>

      <div>
        <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-2">
          Malzemeler
        </label>
        <textarea
          id="ingredients"
          name="ingredients"
          value={editedRecipe.ingredients.join(', ')}
          onChange={handleChange}
          className={styles.textarea}
          rows="4"
        />
      </div>

      <div>
        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
          Hazırlanışı
        </label>
        <textarea
          id="instructions"
          name="instructions"
          value={editedRecipe.instructions}
          onChange={handleChange}
          className={styles.textarea}
          rows="10"
        />
      </div>
    </div>
  );
});

// Stil sabitleri
const styles = {
  textarea: "w-full px-4 py-2 border rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent"
};

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await recipeApi.getRecipeById(id);
        setRecipe(response.data);
        setEditedRecipe(response.data);
      } catch (err) {
        setError('Tarif yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setEditedRecipe(recipe);
  };

  const handleSave = async () => {
    try {
      const response = await recipeApi.updateRecipe(id, editedRecipe);
      setRecipe(response.data);
      setIsEditing(false);
      toast.success('Tarif başarıyla güncellendi!');
    } catch (err) {
      toast.error('Tarif güncellenirken bir hata oluştu');
    }
  };

  const handleDeleteClick = () => setIsDeleteModalOpen(true);
  
  const handleDeleteConfirm = async () => {
    try {
      await recipeApi.deleteRecipe(id);
      toast.success('Tarif başarıyla silindi!');
      navigate('/tarifler');
    } catch (err) {
      toast.error('Tarif silinirken bir hata oluştu');
    }
    setIsDeleteModalOpen(false);
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500" />
  </div>;

  if (error) return <div className="text-center py-12">
    <p className="text-red-500">{error}</p>
  </div>;

  if (!recipe) return <div className="text-center py-12">
    <p className="text-gray-500">Tarif bulunamadı</p>
  </div>;

  return (
    <>
      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 mt-20 lg:mt-28">
          <div className="max-w-4xl mx-auto">
            <EditButtons 
              isEditing={isEditing}
              onCancel={handleCancel}
              onSave={handleSave}
              onDelete={handleDeleteClick}
              onEdit={handleEdit}
            />
            {isEditing ? (
              <EditableContent 
                editedRecipe={editedRecipe}
                onUpdate={setEditedRecipe}
              />
            ) : (
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                {/* Resim Alanı */}
                {recipe.image && (
                  <div className="relative h-[400px] w-full">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-6 sm:p-8">
                  {/* Kategori Etiketi */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full">
                      {recipe.category}
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {recipe.cookingTime} dakika
                    </span>
                  </div>

                  {/* Başlık ve Açıklama */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                    {recipe.title}
                  </h1>
                  <p className="text-gray-600 text-base sm:text-lg mb-6">
                    {recipe.description}
                  </p>

                  {/* Malzemeler */}
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Malzemeler</h2>
                    <ul className="space-y-2">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <span className="w-2 h-2 bg-amber-500 rounded-full mr-2" />
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Hazırlanışı */}
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Hazırlanışı</h2>
                    <ol className="list-decimal list-inside space-y-2">
                      {recipe.instructions.split('\n').filter(step => step.trim()).map((step, index) => (
                        <li key={index} className="text-gray-600">
                          {step.trim().replace(/^\d+\./, '').trim()}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Yazar Bilgisi */}
                  <div className="flex items-center text-sm text-gray-500">
                    <UserIcon />
                    <span>Tarif Sahibi: {recipe.author}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
