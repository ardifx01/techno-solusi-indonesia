# Techno Solusi Indonesia

A modern web application built with **Laravel 12** + **React.js (Inertia)**, styled with **TailwindCSS 4.1** & **DaisyUI**, and bundled by **Vite**.  
Main module: **ISO Certification** with large-scale search, filtering, and listing (**JSON → Database** pipeline).

---

## 🚀 Features
- ⚙️ **Laravel 12** backend (robust, scalable, RESTful-ready)
- ⚛️ **React.js** via **Inertia.js** → SPA-like UX while staying secure & SEO-friendly
- 🎨 **TailwindCSS 4.1** + **DaisyUI** (ready components + theming)
- 🔎 **Advanced filtering & search** (full-text ready, meta filters, pagination)
- 🗃️ **JSON → Database pipeline** (artisan import command with upsert)
- ⚡ **Vite** (fast HMR and optimized builds)
- 🔒 Secure defaults: only `.env.example` is committed

---

## 🧰 Tech Stack
- **Backend:** PHP 8.2+, Laravel 12  
- **Frontend:** React (`@inertiajs/react`)  
- **Styling:** TailwindCSS 4.1, DaisyUI  
- **Bundler:** Vite  
- **Database:** MySQL/MariaDB (SQLite optional for local)

---

## 📦 Requirements
- PHP ≥ 8.2
- Composer ≥ 2.x
- Node.js ≥ 18.x (npm or pnpm)
- MySQL/MariaDB (or SQLite)

---

## 🛠️ One-Paste Quickstart

> Run line-by-line in **Git Bash / WSL / PowerShell**. Replace `<your-username>` if needed.

```bash
# 1) Clone & enter the project
git clone https://github.com/<your-username>/techno-solusi-indonesia.git
cd techno-solusi-indonesia

# 2) Prepare environment
php -r "if(!file_exists('.env')) copy('.env.example','.env');"

# 3) Minimal .env setup (APP & DB)
php -r "
\$e=file_get_contents('.env');
\$e=preg_replace('/^APP_NAME=.*/m','APP_NAME=\"Techno Solusi Indonesia\"',\$e);
\$e=preg_replace('/^APP_URL=.*/m','APP_URL=http://localhost',\$e);
\$e=preg_replace('/^DB_CONNECTION=.*/m','DB_CONNECTION=mysql',\$e);
\$e=preg_replace('/^DB_HOST=.*/m','DB_HOST=127.0.0.1',\$e);
\$e=preg_replace('/^DB_PORT=.*/m','DB_PORT=3306',\$e);
\$e=preg_replace('/^DB_DATABASE=.*/m','DB_DATABASE=techno_solusi',\$e);
\$e=preg_replace('/^DB_USERNAME=.*/m','DB_USERNAME=root',\$e);
\$e=preg_replace('/^DB_PASSWORD=.*/m','DB_PASSWORD=',\$e);
file_put_contents('.env',\$e);
"

# 4) Backend deps & app key
composer install
php artisan key:generate

# 5) Create database 'techno_solusi' first, then migrate
php artisan migrate

# 6) (Optional) Import ISO services from JSON file
#    Supported paths: storage/app/<file> OR resources/data/<file>
php artisan services:import resources/data/services.json

# 7) Frontend install & build
npm install
# For development:
npm run dev
# Or for production build:
npm run build

# 8) Run the app
php artisan serve
# Open http://127.0.0.1:8000
