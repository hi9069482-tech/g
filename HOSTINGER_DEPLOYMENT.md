# PakPattan Services Hub — Hostinger Deployment Guide

This guide explains how to deploy **PakPattan Services Hub** to Hostinger (Shared Web Hosting, Cloud Hosting, or VPS).

---

## Method 1: Hostinger Shared / Cloud Web Hosting (hPanel File Manager) — **Recommended & Easiest**

Hostinger’s standard web hosting uses LiteSpeed/Apache web servers. The app is built as a fast, high-performance Single Page Application (SPA) with Progressive Web App (PWA) support.

### Step 1: Build the Production Bundle
If you have the source code locally, build the production bundle:
```bash
npm run build
```
This generates the optimized production files inside the `dist/` folder, including:
- `index.html` (SEO, meta tags, schema markup)
- `assets/` (bundled and minified JavaScript, CSS, and optimized images)
- `.htaccess` (pre-configured LiteSpeed/Apache SPA URL routing)
- `manifest.json` (PWA Web App Manifest)
- `sw.js` & `workbox-*.js` (PWA Offline Service Worker)

*(A ready-to-upload `hostinger_deploy.zip` archive has also been created in this repository)*.

---

### Step 2: Upload to Hostinger hPanel
1. Log in to your **[Hostinger Account](https://hpanel.hostinger.com)**.
2. Under **Websites**, click **Manage** on your domain (e.g. `pakpattanserviceshub.pk` or your domain).
3. In the left sidebar, click **Files** → **File Manager**.
4. Double-click to open the **`public_html`** folder.
5. If there is a default `default.php` or placeholder `index.html`, you can delete or backup those files.
6. Click the **Upload** button (top right icon) and either:
   - **Option A (Fastest)**: Upload `hostinger_deploy.zip`. Once uploaded, right-click `hostinger_deploy.zip` and choose **Extract** directly into `public_html`.
   - **Option B**: Open `dist/` locally, select all files inside (`index.html`, `assets/`, `.htaccess`, `manifest.json`, `sw.js`, etc.), and drag & drop them into `public_html`.

> **IMPORTANT**: Make sure the files are directly inside `public_html`, not nested inside a subfolder like `public_html/dist/`.

---

### Step 3: Verify the `.htaccess` File
Hostinger LiteSpeed/Apache requires an `.htaccess` file in `public_html` so that any refreshed URL routes properly back to `index.html` without giving a 404 error.

The `.htaccess` file is already included in `public/` and `dist/`. For reference, it contains:
```apache
# Hostinger LiteSpeed / Apache Single Page Application (SPA) Routing Configuration
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Browser Caching & GZIP/Brotli Compression for Fast Loading
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain text/html text/xml text/css application/xml application/xhtml+xml application/rss+xml application/javascript application/x-javascript
</IfModule>
```

> In Hostinger File Manager, hidden files starting with a dot (like `.htaccess`) are visible by default. If you don't see it, ensure "Show Hidden Files" is checked in File Manager settings.

---

### Step 4: Enable Free SSL (HTTPS)
A valid SSL certificate is mandatory for PWA installation and service worker caching:
1. In Hostinger hPanel, go to **Security** → **SSL**.
2. Click **Install SSL** (Hostinger provides free lifetime Let's Encrypt SSL).
3. Toggle **Force HTTPS** to ON.

---

## Method 2: Hostinger VPS / Cloud Server (Nginx / Node.js)

If you are using a Hostinger VPS with Nginx:

1. Copy the contents of `dist/` to `/var/www/pakpattanserviceshub/`.
2. Configure your Nginx server block:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/pakpattanserviceshub;
    index index.html;

    # SSL configuration
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # SPA Fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Static Assets Caching
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}
```
3. Test and reload Nginx:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## Summary of Admin Contact Configured for Pakpattan & Arifwala:
- **Admin**: Omar Draz Gill
- **Contact Line**: `03107217253`
- **WhatsApp**: `03107217253`
- **Email**: `umarcome347@gmail.com`
- **Central Operations**: Near DHQ Hospital Road, Pakpattan
