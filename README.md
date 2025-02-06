# Lezzet Defteri | Yemek Tarifleri Platformu
Lezzet Defteri, kullanıcıların yemek tarfilerini paylaşabildiğive keşfedebildiği modern bir web platformudur

## 🚀 Özellikler
- Tarif ekleme, düzenleme ve silme
- Kategori bazlı tarif filtreleme
- Arama fonksiyonu
- Responsive tasarım
- Tarif eklerken, tarifle beraber resim yükleme desteği
- Gerçek zamanlı bildirimler

## 🛠 Teknolojiler

### Frontend (client)
- React.js
- React Router DOM
- Axios
- Framer Motion (Animasyonlu geçişler)
- Tailwind CSS
- React Tostify (Gerçek zamanlı bildirimler)

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- CORS

### DevOps
- Docker
- Docker Compose

## 💻 Kurulum

1. Repoyu yerel bilgisayarınıza klonlayın:

   ```bash
   git clone https://github.com/Ekremyilmazz/yemek_tarifi.git
2. Docker ile çalıştırın:
   ```
   docker-compose up --build

## Ya da manuel olarak kurmak için:

## Backend

1. Proje dizinine gidin:
   ```bash
   cd server
2. Bağımlılıkları yükleyin:
   ```
   npm install
3. Projeyi başlatır
   ```
   npm run dev

## Frontend

1. Proje dizinine geçin:
   ```bash
   cd client
2. Bağımlılıkları yükleyin:
   ```
   npm install
3. Frontendi çalıştırın:
   ```
   npm start
## 🌐 Ortam değişkenleri

### Frontend (.env)
- REACT_APP_API_URL=http://localhost:5000/api

### Backend (.env)
- MONGODB_URI=your_mongodb_uri
- PORT=5000

## 📱 Ekran görüntüleri

### Anasayfa
![Image](https://github.com/user-attachments/assets/26f04889-6bd1-4577-aee2-9cacb685771a)

### Tarifler sayfası (filtreleme ve tarif detaylarını görüntüle?
- filtreleme ![Image](https://github.com/user-attachments/assets/073cec80-0542-488c-b68e-fe86194362c2)
- tarif detyları ![image](https://github.com/user-attachments/assets/87c8a843-c55f-466c-82ec-d7e4ab997977)

