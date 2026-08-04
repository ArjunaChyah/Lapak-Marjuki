# 🍜 Warung Marjuki'S - Modern E-Commerce Web Application

Website e-commerce modern, responsif, dan siap produksi untuk **Warung Marjuki'S** (usaha makanan rumahan milik Ibu Yulia di Semarang, Indonesia). Dibangun menggunakan **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Prisma ORM**, **Database MySQL**, serta arsitektur **OOP (Object-Oriented Programming)**.

---

## 🌟 Fitur Utama

- 🎨 **Desain Warm & Responsif**: Tema warna khas masakan Nusantara (`#F97316` Orange, `#16A34A` Green, `#FACC15` Yellow, `#FFF8F1` Warm Cream).
- 🌙 **Dark Mode Toggle**: Mode gelap/terang interaktif dengan preferensi pengguna.
- 📱 **Mobile-First & Sticky Navbar**: Navigasi responsif dengan drawer mobile & badge keranjang belanja real-time.
- 🔍 **Katalog & Live Search**: Pencarian menu makanan, minuman, dan gorengan secara instan tanpa reload.
- 🏷️ **Filter & Sorting**: Filter kategori (`Makanan`, `Minuman`, `Gorengan`) & pengurutan harga/popularitas.
- 🛒 **Shopping Cart Context**: Pengelolaan keranjang belanja interaktif dengan `localStorage` persistence.
- 📝 **Checkout & WhatsApp Order**: Checkout terintegrasi yang menghasilkan payload format order otomatis ke WhatsApp Ibu Yulia.
- 🗄️ **Database MySQL & Prisma ORM**: Penyimpanan produk, pesanan, dan pesan kontak ke database MySQL.
- 🏛️ **Arsitektur OOP Complete**: 4 Pilar OOP (Abstraction, Inheritance, Encapsulation, Polymorphism) melalui Service Classes (`CartService`, `OrderService`, `ProductService`, `InquiryService`).

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons
- **Backend / API**: Next.js API Routes (Serverless Functions)
- **Database**: MySQL Server
- **ORM**: Prisma ORM (`@prisma/client`)
- **State Management**: React Context API (`CartContext`, `ThemeContext`)

---

## 🏛️ Arsitektur OOP (Object-Oriented Programming)

Proyek ini mengimplementasikan Service Architecture berbasis OOP di folder `lib/services/`:

1. **Abstraction (`BaseService.ts`)**: Abstract class induk yang mendefinisikan kontrak method wajib `abstract validate(): boolean`.
2. **Inheritance**:
   - `CartService extends BaseService`
   - `OrderService extends BaseService`
   - `ProductService extends BaseService`
   - `InquiryService extends BaseService`
3. **Encapsulation**: Mengamankan properti internal dengan modifier `private` & `protected`.
4. **Polymorphism**: Menimpa (*override*) method `validate()` sesuai aturan bisnis tiap service class.

---

## 🚀 Cara Menjalankan Proyek

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/USERNAME/warung-marjukis.git
cd warung-marjukis
npm install
```

### 2. Konfigurasi Database MySQL
Buat file `.env.local` dan sesuaikan koneksi MySQL Anda:
```env
DATABASE_URL="mysql://root:@localhost:3306/warung_marjukis"
```

### 3. Migrate & Seed Database
```bash
npx prisma db push
npx prisma db seed
```

### 4. Jalankan Server Dev
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 📄 Lisensi
© 2026 **Warung Marjuki'S** - Ibu Yulia (Semarang, Jawa Tengah, Indonesia).
