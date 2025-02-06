import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetail from './components/RecipeDetail';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const backgroundImages = [
    'https://images.unsplash.com/photo-1543353071-10c8ba85a904?q=80&w=2000',
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2000',
    'https://images.unsplash.com/photo-1605522561233-768ad7a8fabf?q=80&w=2000',
    'https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=2000'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
      <Router>
        <div className="min-h-screen flex flex-col relative overflow-hidden">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-2000 ease-in-out"
              style={{
                backgroundImage: `
                  linear-gradient(
                    rgba(255, 255, 255, 0.6),
                    rgba(255, 255, 255, 0.6)
                  ),
                  url('${image}')
                `,
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: currentImageIndex === index ? 1 : 0,
                zIndex: -1
              }}
            />
          ))}

          <Navbar />
          <div className="flex-grow w-full relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tarifler" element={<RecipeList />} />
              <Route path="/tarif-ekle" element={<AddRecipeForm />} />
              <Route path="/tarif/:id" element={<RecipeDetail />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
