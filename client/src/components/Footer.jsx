import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative z-10 bg-gradient-to-b from-amber-50 to-orange-100 backdrop-blur-md">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center mb-10">
          <h3 className="text-3xl font-bold text-amber-800 mb-4">Yemek Tarifleri</h3>
          <p className="text-amber-700 text-center max-w-md mb-6">
            Türk ve dünya mutfağından en lezzetli yemek tarifleri, püf noktaları ve
            mutfak ipuçları.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Menü */}
          <div>
            <h4 className="font-semibold text-amber-800 mb-4">Menü</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-amber-700 hover:text-amber-500">Ana Sayfa</Link></li>
              <li><Link to="/tarifler" className="text-amber-700 hover:text-amber-500">Tarifler</Link></li>
              <li><Link to="/tarif-ekle" className="text-amber-700 hover:text-amber-500">Tarif Ekle</Link></li>
            </ul>
          </div>

          {/* Kategoriler */}
          <div>
            <h4 className="font-semibold text-amber-800 mb-4">Kategoriler</h4>
            <ul className="space-y-2">
              <li><Link to="/tarifler?category=kahvalti" className="text-amber-700 hover:text-amber-500">Kahvaltı</Link></li>
              <li><Link to="/tarifler?category=ana-yemek" className="text-amber-700 hover:text-amber-500">Ana Yemekler</Link></li>
              <li><Link to="/tarifler?category=corba" className="text-amber-700 hover:text-amber-500">Çorbalar</Link></li>
              <li><Link to="/tarifler?category=tatli" className="text-amber-700 hover:text-amber-500">Tatlılar</Link></li>
              <li><Link to="/tarifler?category=salata" className="text-amber-700 hover:text-amber-500">Salatalar</Link></li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="font-semibold text-amber-800 mb-4">İletişim</h4>
            <ul className="space-y-2">
              <li className="text-amber-700">info@yemektarifleri.com</li>
              <li className="text-amber-700">+90 123 456 7890</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-8 text-amber-700 text-sm">
          © {new Date().getFullYear()} Yemek Tarifleri. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
