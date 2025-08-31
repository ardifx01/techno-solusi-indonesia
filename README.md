# Techno Solusi Indonesia

Aplikasi web modern berbasis **Laravel 12** + **React.js (Inertia)** dengan **TailwindCSS 4.1** & **DaisyUI** (bundler **Vite**).  
Modul utama: **ISO Certification** dengan pencarian, filtering, dan listing data skala besar (pipeline **JSON → Database**).

---

## 🚀 Fitur
- ⚙️ **Laravel 12** (robust, scalable, RESTful-ready).
- ⚛️ **React.js** via **Inertia.js** → UX seperti SPA namun tetap aman & SEO-friendly.
- 🎨 **TailwindCSS 4.1** + **DaisyUI** (komponen siap pakai + kustom tema).
- 🔎 **Advanced filtering & search** (full-text ready, meta filters, pagination).
- 🗃️ **JSON → Database pipeline** (perintah artisan import + upsert).
- ⚡ **Vite** (HMR cepat, build optimal).
- 🔒 `.env` aman: hanya **.env.example** dibagikan.

---

## 🧰 Tech Stack
Backend: **PHP 8.2+**, **Laravel 12**  
Frontend: **React.js** (**@inertiajs/react**)  
Styling: **TailwindCSS 4.1**, **DaisyUI**  
Bundler: **Vite**  
Database: **MySQL/MariaDB** (opsional **SQLite**)

---

## 📦 Requirements
PHP ≥ 8.2 · Composer ≥ 2.x · Node.js ≥ 18.x (npm/pnpm) · MySQL/MariaDB

---

## 🛠️ Instalasi (one-paste quickstart)

> Jalankan blok perintah **baris demi baris** di **Git Bash/WSL/PowerShell** (komentar dengan `#` aman di kedua shell).  
> Ganti `<your-username>` bila perlu.

```bash
# 1) Clone & masuk folder
git clone https://github.com/<your-username>/techno-solusi-indonesia.git
cd techno-solusi-indonesia

# 2) Siapkan .env (buat dari example bila belum ada)
php -r "if(!file_exists('.env')) copy('.env.example','.env');"

# 3) Konfigurasi dasar .env (APP_NAME, DB, dsb) - aman lintas OS
php -r "
$e=file_get_contents('.env');
$e=preg_replace('/^APP_NAME=.*/m','APP_NAME=\"Techno Solusi Indonesia\"',$e);
$e=preg_replace('/^APP_URL=.*/m','APP_URL=http://localhost',$e);
$e=preg_replace('/^DB_CONNECTION=.*/m','DB_CONNECTION=mysql',$e);
$e=preg_replace('/^DB_HOST=.*/m','DB_HOST=127.0.0.1',$e);
$e=preg_replace('/^DB_PORT=.*/m','DB_PORT=3306',$e);
$e=preg_replace('/^DB_DATABASE=.*/m','DB_DATABASE=techno_solusi',$e);
$e=preg_replace('/^DB_USERNAME=.*/m','DB_USERNAME=root',$e);
$e=preg_replace('/^DB_PASSWORD=.*/m','DB_PASSWORD=',$e);
file_put_contents('.env',$e);
"

# 4) Backend deps & key
composer install
php artisan key:generate

# 5) Database migrate (pastikan DB 'techno_solusi' sudah ada)
php artisan migrate
php artisan services:import resources/data/services.json

# 6) Frontend deps & build
npm install
# (opsional dev server: npm run dev)
npm run build

# 7) (Opsional) Import data ISO dari JSON jika file tersedia
#   - lokasi default yang didukung command: storage/app/<file> ATAU resources/data/<file>
#   - contoh file: storage/app/services.json
if [ -f "storage/app/services.json" ]; then php artisan services:import storage/app/services.json --fresh; fi 2>/dev/null || php artisan services:import storage/app/services.json --fresh

# 8) Jalankan aplikasi (dev)
php artisan serve
# Akses: http://127.0.0.1:8000
