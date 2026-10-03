# PakPattan Services Hub (پاکپتن سروسز ہب)

> **Urdu Tagline:** “پاکپتن کی ہر سروس، ایک جگہ”  
> **English Supporting Phrase:** “Find trusted local services near you.”

PakPattan Services Hub is a complete, production-ready, fully responsive **multi-vendor hyperlocal services marketplace** connecting customers with verified local service providers throughout:
* Pakpattan City (Urban & Rural)
* Arifwala City (Urban & Rural)
* Surrounding union councils, villages, and chaks (Chak 19/SP, Chak 23/EB, Chak 69/D, Malka Hans, Qaboola, Bonga Hayat, etc.)

---

## Key Features

1. **Hyperlocal Multi-Village Network**:
   - Hierarchical data architecture: District → Tehsil → Union Council → Village / Chak.
   - **One provider → Multiple service areas**: Service technicians carry tools and register multiple rural chaks they serve.
   - Built-in GPS "Use My Location" detecting nearest tehsil and rural hubs.

2. **16 Specialized Service Categories**:
   - Plumber, Electrician & Solar, Carpenter, Painter, AC & Refrigerator, Computer & Mobile, Auto & Tractor Mechanic, Home Cleaning & Fumigation, Property Dealer, Construction, Beauty & Personal Care, Restaurant & Catering, Delivery, Transport & Loader, Event & Tent Services, Education & Home Tutors.

3. **Built-in Safe Customer-Provider Chat**:
   - Customers and providers negotiate and discuss jobs without having to broadcast private personal phone numbers publicly.
   - Real-time simulated message exchange, unread badges, and conversation history.

4. **Multi-Role Portals**:
   - **Customer Portal**: Post tasks, view status, track saved favorite technicians, and message history.
   - **Provider Portal**: View local leads matching their trade, manage multiple service village areas with 1-click checkboxes, add custom services and rates, check subscription status.
   - **Super Admin Control Center**: CNIC identity verification approval, category manager, village/chak registry, task oversight.

5. **PWA (Progressive Web App)**:
   - Installable on Android, Windows, macOS, and iOS Safari.
   - Service worker precaching and offline catalog fallback when internet is unstable.

6. **Bilingual Support (English & اردو)**:
   - Live 1-click language switcher with authentic Urdu typography.

---

## Deploying to Hostinger

### 1. Build the Production Files
Run the build script in your project root:
```bash
npm run build
```
This produces an optimized production bundle inside the `dist/` directory.

### 2. Upload via Hostinger File Manager
1. Log into your **Hostinger hPanel**.
2. Navigate to **Websites → Manage → File Manager**.
3. Open the **`public_html`** root folder.
4. Upload all files and folders located **inside** `dist/` directly into `public_html` (i.e. `index.html`, `assets/`, `manifest.json`, `icon.svg`, and `.htaccess`).

### 3. Verify `.htaccess` SPA Routing
The included `.htaccess` file ensures that HTML5 client-side navigation works seamlessly without throwing 404 errors when visitors refresh a page or bookmark a direct link:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### 4. Enable SSL
In Hostinger hPanel, go to **Security → SSL** and ensure that Free Lifetime SSL is activated so your PWA can register service workers securely (`https://`).

---

## Environment Variables (`.env.example`)
Client-side environment variables for Vite must begin with `VITE_`:
```env
# Optional External API configurations
VITE_APP_NAME="PakPattan Services Hub"
VITE_DEFAULT_TEHSIL="Pakpattan"
VITE_MAPS_KEY=""
```

---

## Tech Stack
* **Framework**: React 19 + TypeScript + Vite 8
* **Styling**: Tailwind CSS v4 with custom responsive design system
* **Icons**: Lucide Icons
* **PWA**: vite-plugin-pwa + Web App Manifest
