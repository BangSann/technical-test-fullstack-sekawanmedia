# Laravel + Inertia.js (React) Starter

## 📌 Deskripsi Proyek

Proyek ini menggunakan **Laravel** sebagai backend dan **React** sebagai frontend dengan bantuan **Inertia.js**. Inertia memungkinkan kita membangun Single Page Application (SPA) tanpa perlu membuat REST API terpisah, karena data dikirim langsung dari controller Laravel ke komponen React.

Teknologi utama:

* **Laravel** – Backend framework
* **Inertia.js** – Bridge antara Laravel dan React
* **React** – Frontend UI library
* **Vite** – Frontend build tool
* **Tailwind CSS** (opsional) – Styling


* Request ditangani Laravel
* Controller mengembalikan response Inertia
* React menerima props dan merender UI

---

## ⚙️ Prasyarat

Pastikan tools berikut sudah terpasang (versi milik saya):

* PHP : 8.4.11
* Composer : 2.8.10
* Node.js : 22.14.00
* NPM
* Database (MySQL : 10.4.32-MariaDB)

---

## 🚀 Setup & Instalasi

### 1️⃣ Clone Repository

```bash
git https://github.com/BangSann/technical-test-fullstack-sekawanmedia.git
cd vehicle-booking
```

### 2️⃣ Install Dependency Backend

```bash
composer install
```

### 3️⃣ Konfigurasi Environment

```bash
cp .env.example .env
php artisan key:generate
```

Atur konfigurasi database di file `.env`:

```
DB_DATABASE=vehicle_booking
DB_USERNAME=your_DB_username
DB_HOST=your_DB_host
DB_PORT=your_DB_port
DB_PASSWORD=your_DB_password
```

### 4️⃣ Migrasi Database

```bash
php artisan migrate --seed
```

---

## ⚛️ Setup Frontend (React + Inertia)

### 5️⃣ Install Dependency Frontend

```bash
npm install
```

### 6️⃣ Jalankan Development Server

```bash
npm run dev
```

atau langsung build aplikasi
```bash
npm run build
```

Pada terminal lain, jalankan Laravel:

```bash
php artisan serve
```

Aplikasi dapat diakses di:

```
http://127.0.0.1:8000
```

---

## Default Users (Seeder)

Berikut adalah akun default yang tersedia setelah menjalankan seeder:

| No | Name        | Email                  | Password         | Role ID | Region ID |
|----|------------|------------------------|------------------|---------|-----------|
| 1  | Admin       | admin@gmail.com        | admin12345       | 1       | 1         |
| 2  | Approval 1  | approval_1@gmail.com   | approval12345    | 2       | 1         |
| 3  | Approval 2  | approval_2@gmail.com   | approval12345    | 2      | 1         |

### Keterangan Role
- **Role ID 1** : Admin  
- **Role ID 2** : Approval  

> ⚠️ **Catatan:**  
> Password di atas adalah password awal dari seeder. Pada implementasi Laravel, password akan otomatis di-*hash* menggunakan `bcrypt` atau `Hash::make()`.


