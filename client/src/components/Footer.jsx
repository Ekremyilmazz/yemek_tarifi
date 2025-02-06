import { Link } from 'react-router-dom';

const linkStyle = "text-amber-700 hover:text-amber-500";
const FooterSection = ({title, children}) => (
  <div>
    <h4 className="font-semibold text-amber-800 mb-4">{title}</h4>
    <ul className="space-y-2">{children}</ul>
  </div>
);
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
          <FooterSection title="Menü">
              <li><Link to="/" className={linkStyle}>Ana Sayfa</Link></li>
              <li><Link to="/tarifler" className={linkStyle}>Tarifler</Link></li>
              <li><Link to="/tarif-ekle" className={linkStyle}>Tarif Ekle</Link></li>
          </FooterSection>

          {/* Kategoriler */}
          <FooterSection title="Kategoriler">
              <li><Link to="/tarifler?category=kahvalti" className={linkStyle}>Kahvaltı</Link></li>
              <li><Link to="/tarifler?category=ana-yemek" className={linkStyle}>Ana Yemekler</Link></li>
              <li><Link to="/tarifler?category=corba" className={linkStyle}>Çorbalar</Link></li>
              <li><Link to="/tarifler?category=tatli" className={linkStyle}>Tatlılar</Link></li>
              <li><Link to="/tarifler?category=salata" className={linkStyle}>Salatalar</Link></li>
          </FooterSection>

          {/* İletişim */}
          <FooterSection title="İletişim">
              <li className="text-amber-700">info@yemektarifleri.com</li>
              <li className="text-amber-700">+90 123 456 7890</li>
          </FooterSection>
        </div>

        <div className="text-center mt-8 text-amber-700 text-sm">
          © {new Date().getFullYear()} Yemek Tarifleri. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
