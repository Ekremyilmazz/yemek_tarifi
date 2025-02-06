# Lezzet Defteri | Yemek Tarifleri Platformu
Lezzet Defteri, kullanıcıların yemek tarfilerini toplulukla paylaşabildiği ve keşfedebildiği modern bir web platformudur.

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

### Tarifler sayfası (filtreleme, arama çubuğu ve tarif detaylarını görüntüle
- filtreleme ![Image](https://github.com/user-attachments/assets/569f2058-ab94-493c-ac04-ae5166c9aa58)
- arama çubuğu ![Image](https://github.com/user-attachments/assets/4c415367-efdf-4671-a648-7f82254e50b2)
- tarif detayları ![image](https://github.com/user-attachments/assets/87c8a843-c55f-466c-82ec-d7e4ab997977)

### Tarif ekleme formu
- ![Image](https://github.com/user-attachments/assets/e4865d1b-fb6a-45ab-aa76-8d47979f0e0f)
  
- ![Image](https://github.com/user-attachments/assets/ebf9459c-1b07-45e7-8ec9-3f21b230353c)

