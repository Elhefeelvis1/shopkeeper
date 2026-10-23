# ShopKeeper — Modern Retail & POS Landing Page

A high-performance, responsive single-page introductory website and customer onboarding platform for **ShopKeeper** — the offline-first inventory management and Point of Sale (POS) system engineered for supermarkets, pharmacies, wholesale distributors, and retail merchants.

---

## 🌟 Key Features

- **Responsive Single-Page Layout**:
  - Smooth vertical scrolling with sticky navigation and active section scroll-spy.
  - Interactive top reading scroll progress bar (`#scrollProgressBar`).
  - Mobile-responsive layout optimized for phones, tablets, and high-DPI desktop screens.

- **Light & Dark Theme Engine**:
  - **Light Mode by Default**: Clean, modern aesthetic with high contrast and subtle drop shadows.
  - **Dark Mode Switch**: Smooth toggle with persistent state saved via `localStorage`.
  - Driven by CSS custom variables for seamless theme transitions.

- **Real Application Showcase**:
  - **Hero Showcase**: Displays the live **ShopKeeper Analytics & Sales Dashboard** (`assets/analytics.png`) within a macOS-style browser frame mockup.
  - **Solutions Showcase**: Highlights the **Point of Sale Barcode Checkout Interface** (`assets/Point of sale.png`) featuring split payment routes, customer selection, and live cart calculation.

- **Operational Impact & Metrics**:
  - Highlights real retail challenges (manual register bottlenecks, inventory shrinkage, unrecovered customer credit debts).
  - Demonstrates measurable operational improvements (+68% checkout flow, +74% operational visibility, 99.9% local availability).

- **Integrated Store Onboarding Form**:
  - Captures essential merchant information:
    - **Store / Business Name** *(Required)*
    - **Contact Person Name** *(Required)*
    - **Phone Number / WhatsApp** *(Required)*
    - **Email Address** *(Optional)*
    - **Store Category** *(Pharmacy, Supermarket, Wholesale, Electronics, etc.)*
    - **Store Address / City** *(Optional)*
    - **Notes or Specific Requirements** *(Optional)*
  - Validates inputs client-side, triggers a visual toast notification, and automatically formats an onboarding email draft pre-addressed to **`shopkeeperonboarding@gmail.com`**.

- **Zero-Dependency Frontend**:
  - Built with pure HTML5, Vanilla CSS, and modern ES6 JavaScript. No heavy frontend libraries or frameworks required.

---

## 📁 Project Structure

```
Shopkeeper-intro/
├── assets/
│   ├── analytics.png          # Real screenshot: ShopKeeper Dashboard & Analytics
│   └── Point of sale.png      # Real screenshot: ShopKeeper POS Checkout Interface
├── app.js                     # Theme switch, scroll progress, form validation & mailto redirection
├── index.html                 # Semantic single-page landing page markup
├── package.json               # Project manifest and scripts
├── README.md                  # Project documentation
├── server.js                  # Standalone Node.js HTTP server (zero npm dependencies)
└── style.css                  # Responsive design system & light/dark CSS variables
```

---

## 🚀 Quick Start

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v16 or newer recommended).

### 2. Start the Local Server
Run the built-in static server:

```bash
# Using npm
npm start

# Or directly with Node.js
node server.js
```

### 3. Open in Browser
Visit **[http://localhost:8080](http://localhost:8080)** in your browser.

*(You can also double-click `index.html` to preview directly in any modern web browser).*

---

## ⚙️ Configuration & Customization

### Onboarding Target Email
To change the recipient email address for onboarding submissions:
1. In `app.js`, update the `targetEmail` constant:
   ```javascript
   const targetEmail = 'shopkeeperonboarding@gmail.com';
   ```
2. In `index.html`, update the displayed email and direct mail links (in the form section and footer).

### Updating Screenshots
Replace the corresponding PNG files in the `assets/` directory:
- `assets/analytics.png`: Hero section showcase image.
- `assets/Point of sale.png`: Solutions section showcase image.

---

## 📄 License
ISC License © 2026 Mmaduabuchi Igwilo
