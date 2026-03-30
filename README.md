# 🏡 Abode by the Lake — Website

A luxury holiday bungalow website built with **React + TypeScript** (frontend) and **Node.js + Express** (backend).

---

## 📁 Project Structure

```
bungalow-website/
├── package.json               ← Root: runs client + server together
├── client/                    ← React + TypeScript (Vite)
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── styles/            ← External CSS files (one per component)
│       │   ├── global.css
│       │   ├── Navbar.css
│       │   ├── Hero.css
│       │   ├── About.css
│       │   ├── Facilities.css
│       │   ├── Gallery.css
│       │   ├── Pricing.css
│       │   ├── Location.css
│       │   ├── Contact.css
│       │   └── Footer.css
│       └── components/        ← TSX components
│           ├── Navbar.tsx
│           ├── Hero.tsx
│           ├── About.tsx
│           ├── Facilities.tsx
│           ├── Gallery.tsx
│           ├── Pricing.tsx
│           ├── Location.tsx
│           ├── Contact.tsx
│           └── Footer.tsx
└── server/
    ├── index.js               ← Express API server
    ├── package.json
    └── .env.example           ← Copy to .env and fill in values
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
# From project root
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

### 2. Configure email (for contact form)

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:

```
PORT=5000
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
NOTIFY_EMAIL=your-notification-email@gmail.com
```

> **Gmail App Password:** Go to Google Account → Security → 2-Step Verification → App Passwords.  
> Generate one for "Mail" and paste it as `EMAIL_PASS`.

### 3. Run development servers

```bash
# From project root — runs both client and server
npm run dev
```

- Frontend: http://localhost:3000  
- Backend API: http://localhost:5000

---

## ✨ Website Sections

| Section | Description |
|---------|-------------|
| **Hero** | Full-screen lakeside image with animated zoom, key stats |
| **About** | Two-column story with layered photos and feature list |
| **Facilities** | 9 amenity cards: bedrooms, pool, lake access, kitchen, etc. |
| **Gallery** | Editorial masonry photo grid with lightbox viewer |
| **Pricing** | 3 rate packages: weekday, weekend retreat, weekly escape |
| **Location** | Embedded Google Map + nearby distances + directions |
| **Contact** | Enquiry form → sends email to owner + auto-reply to guest |
| **Footer** | Links, contact details, amenities, social icons |

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary BG | `#0b0a09` |
| Gold | `#c9a84c` |
| Cream | `#f5ede0` |
| Display Font | Cormorant Garamond |
| Body Font | Josefin Sans |

---

## 🗺️ Customise the Map

In `client/src/components/Location.tsx`, replace the `iframe src` with your own Google Maps embed URL:

1. Go to [Google Maps](https://maps.google.com)
2. Search your bungalow address
3. Click **Share** → **Embed a map** → Copy the URL inside `src="..."`
4. Paste it into the iframe

---

## 📧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| POST | `/api/contact` | Submit enquiry form |

### POST `/api/contact` payload

```json
{
  "firstName": "John",
  "lastName": "Silva",
  "email": "john@example.com",
  "phone": "+94 77 000 0000",
  "checkIn": "2025-04-15",
  "checkOut": "2025-04-18",
  "guests": "4",
  "message": "Looking forward to our stay!"
}
```

---

## 🛠️ Production Build

```bash
cd client
npm run build       # Builds to client/dist/
```

Serve `client/dist/` with Nginx or deploy to Netlify/Vercel.  
Deploy `server/` to Railway, Render, or any Node.js host.

---

*Built with ♥ for Abode by the Lake, Negombo, Sri Lanka*
