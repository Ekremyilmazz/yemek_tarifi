import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-black/20 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <svg 
              className={`w-8 h-8 ${isScrolled ? 'text-amber-500' : 'text-amber-400'}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span className={`font-playfair text-xl font-bold ${
              isScrolled ? 'text-gray-800' : 'text-white drop-shadow-md'
            }`}>
              Yemek Tarifleri
            </span>
          </Link>

          {/* Mobil Menü Butonu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <svg
              className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Menü */}
          <div className="hidden md:flex items-center space-x-8">
            {['/', '/tarifler', '/tarif-ekle'].map(path => (
              <Link
                key={path}
                to={path}
                className={`font-medium ${
                  location.pathname === path
                    ? isScrolled
                      ? 'text-amber-500'
                      : 'text-amber-400'
                    : isScrolled
                    ? 'text-gray-600 hover:text-amber-500'
                    : 'text-white hover:text-amber-400'
                }`}
              >
                {path === '/' ? 'Ana Sayfa' : path === '/tarifler' ? 'Tarifler' : 'Tarif Ekle'}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobil Menü */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-48' : 'max-h-0'
          }`}
        >
          <div className="py-4 space-y-4">
            {['/', '/tarifler', '/tarif-ekle'].map(path => (
              <Link
                key={path}
                to={path}
                className={`block font-medium ${
                  location.pathname === path
                    ? 'text-amber-500'
                    : isScrolled
                    ? 'text-gray-600 hover:text-amber-500'
                    : 'text-white hover:text-amber-400'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {path === '/' ? 'Ana Sayfa' : path === '/tarifler' ? 'Tarifler' : 'Tarif Ekle'}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
