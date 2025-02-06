import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Kahvaltı",
    description: "En sevilen kahvaltı tarifleri",
    image:
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800",
    link: "/tarifler?category=kahvalti",
  },
  {
    title: "Ana Yemek",
    description: "En sevilen ana yemek tarifleri",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800",
    link: "/tarifler?category=ana-yemek",
  },
  {
    title: "Çorba",
    description: "En sevilen çorba tarifleri",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800",
    link: "/tarifler?category=corba",
  },
  {
    title: "Tatlı",
    description: "En sevilen tatlı tarifleri",
    image:
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800",
    link: "/tarifler?category=tatli",
  },
  {
    title: "Salata",
    description: "En sevilen salata tarifleri",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    link: "/tarifler?category=salata",
  },
];

const Home = () => {

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          className="relative h-[500px] rounded-2xl overflow-hidden mb-12 mt-28"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img
            src="https://images.unsplash.com/photo-1543353071-087092ec393a?w=1800"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="max-w-4xl mx-auto px-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6"
              >
                Lezzetli Yemek Tarifleri
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-sans text-xl md:text-2xl text-white/90 mb-8"
              >
                En sevilen yemek tarifleri ve püf noktaları burada!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link
                  to="/tarifler"
                  className="inline-block bg-amber-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-600 transition-colors duration-300"
                >
                  Tarifleri Keşfet
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Kategoriler Grid Yapısı*/}
        <div className="grid grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.link}
              className="relative group overflow-hidden rounded-xl transition-transform hover:scale-105"
            >
              <div
                className="aspect-square w-full bg-cover bg-center"
                style={{ backgroundImage: `url('${category.image}')` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-semibold">{category.title}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
