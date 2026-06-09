# ACE Agrovet Consults - cPanel Deployment Guide
This manual provides comprehensive, step-by-step instructions for deploying your high-performance **Laravel 11 PHP application** onto a standard **cPanel Shared Hosting account** with a **MySQL database** and **Google Gemini API** integration.

---

## Part 1: Preparing Your Database on cPanel
Since Laravel utilizes MySQL for high-performance persistence of bookings and feed recipes, follow these steps to configure your database engine:

1. Log into your **cPanel Dashboard**.
2. Find the **Databases** group and click **MySQL&reg; Database Wizard**.
3. **Step 1: Create A Database**  
   * Enter a database suffix name (e.g., `ace_agrovet_db`), then click **Next Step**.
4. **Step 2: Create Database Users**  
   * Enter a username suffix (e.g., `ace_agrovet_user`).
   * Generate a secure password, copy it down, then click **Create User**.
5. **Step 3: Add User to Database**  
   * Check the box for **ALL PRIVILEGES** to link the user, then click **Make Changes**.

---

## Part 2: Restructuring Folders for cPanel Shared Hosting
In a typical cPanel environment, the publicly indexable folder is `public_html`. To shield your environment files and core PHP controller logic from direct web extraction, follow this established **two-tier foldering structure**:

```
[your-root-user]/
├── ace_agrovet_laravel_core/       <-- Put all core Laravel folders here
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── routes/
│   ├── vendor/
│   ├── .env
│   └── artisan
│
└── public_html/                     <-- Put contents of Laravel's "public/" folder here
    ├── css/
    ├── js/
    ├── .helper_scripts/
    ├── .htaccess
    ├── index.php                    <-- Modified index file
    └── favicon.ico
```

### Steps to upload and arrange files:
1. In your local development machine, compress your entire Laravel folder excluding `node_modules` and `vendor` directories into a `.zip` file (e.g., `laravel_core.zip`).
2. On **cPanel**, open the **File Manager** tool.
3. Access your private home directory (`/home/username/` - the level *above* `public_html`).
4. Click **Upload**, select your `laravel_core.zip` file, and extract it here. Rename the extracted directory to `ace_agrovet_laravel_core`.
5. Open the `ace_agrovet_laravel_core/public/` folder, select **all contents**, use the **Move** tool in File Manager, and shift them directly into your standard `/public_html/` folder.

### Step 3: Patching `index.php` Entrypoint
Since we shifted files into the private segment, we must modify `/public_html/index.php` to point to the correct bootstrap paths:

1. Open `/public_html/index.php` in the **cPanel Code Editor**.
2. Locate the following lines:
   ```php
   // Usually around Line 34
   if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
       require $maintenance;
   }
   ```
   **Replace with:**
   ```php
   if (file_exists($maintenance = __DIR__.'/../ace_agrovet_laravel_core/storage/framework/maintenance.php')) {
       require $maintenance;
   }
   ```
3. Locate the following autoloader and bootstrap definitions (around Lines 47-50):
   ```php
   require __DIR__.'/../vendor/autoload.php';

   $app = require_once __DIR__.'/../bootstrap/app.php';
   ```
   **Replace with:**
   ```php
   require __DIR__.'/../ace_agrovet_laravel_core/vendor/autoload.php';

   $app = require_once __DIR__.'/../ace_agrovet_laravel_core/bootstrap/app.php';
   ```
4. Save changes and close.

---

## Part 3: Environment Setup (`.env`)
1. In `ace_agrovet_laravel_core`, copy `.env.example` and name the file `.env`.
2. Open `.env` in the **cPanel Code Editor** and update the following settings with your live details:

```env
APP_NAME="ACE_AGROVET_CONSULTS"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com       <-- Enter your live domain here

# Production MySQL Database Configured via cPanel
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=yourusername_ace_agrovet_db   <-- Copy exact full name from step 1
DB_USERNAME=yourusername_ace_agrovet_user <-- Copy exact full username
DB_PASSWORD=your_secure_password_here

# Mailer dispatch configurations
MAIL_MAILER=smtp
MAIL_HOST=smtp.mail.yahoo.com
MAIL_PORT=587
MAIL_USERNAME=ace_vets@yahoo.com
MAIL_PASSWORD=your_yahoo_app_password_here
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="ace_vets@yahoo.com"
MAIL_FROM_NAME="ACE Agrovet Consults"

# Administrative setup
ADMIN_PASSWORD=Aceagrovet1234

# Sourced Google Gemini Key
GEMINI_API_KEY=AIzaSyYourActualAPIKeyHere
```
3. Save changes.

---

## Part 4: Installing Dependencies & Running Migrations
If you have **SSH Terminal** access on cPanel, log in as your cPanel user, navigate to `/home/username/ace_agrovet_laravel_core`, and run:
```bash
composer install --no-dev --optimize-autoloader
php artisan key:generate
php artisan migrate --force
```

### Alternative: What if your Shared Plan has NO SSH Terminal Access?
No worries! You can run migrations easily by declaring a temporary route in `/routes/web.php` or using a helper PHP file in public_html:

1. Append this snippet to your route definitions inside `/routes/web.php`:
   ```php
   Route::get('/run-migrations-setup', function() {
       try {
           \Illuminate\Support\Facades\Artisan::call('migrate:fresh', ['--force' => true]);
           return "Database tables (bookings and formulations) migrated successfully!";
       } catch (\Exception $e) {
           return "Migration Error: " . $e->getMessage();
       }
   });
   ```
2. Navigate to `https://yourdomain.com/run-migrations-setup` in your web browser.
3. The tables will be initialized instantly on your cPanel MySQL instance! Once done, **remove this route snippet** on your production site for security.

---

## Part 5: Optimizing for Performance on cPanel
1. In cPanel, find **Select PHP Version**.
2. Set your PHP version to **8.2 or 8.3**.
3. In the **Extensions** checklist tab, ensure that the following standard components are checked:
   * `pdo_mysql` (standard for MySQL connections)
   * `curl` & `openssl` (required for Google Gemini API HTTP requests)
   * `mbstring` & `xml`
   * `zip` (for file processing)
4. Your application is now ready to receive bookings, calculate livestock feed mixes, and answer advisory queries perfectly!
