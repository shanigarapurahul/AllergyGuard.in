# AllergyGuardIN 🍛

> **Indian Food Allergy Detection System** — 100% static, no backend, works offline.

## 🌐 Live Demo
Deploy to [Netlify](https://netlify.com) or [GitHub Pages](https://pages.github.com) instantly.

---

## 📁 Folder Structure

```
Rahul144p/
├── index.html        ← Main app (all pages in one file, SPA-style)
├── style.css         ← All styles (dark theme, responsive)
├── app.js            ← All logic (localStorage, food DB, scanner)
├── netlify.toml      ← Netlify deployment config
└── README.md         ← This file
```

> **Note:** The `backend/` folder (Spring Boot) has been removed. All data is now stored locally in the browser using `localStorage`.

---

## ✨ Features

| Feature | Details |
|---|---|
| 📷 Food Scanner | Camera + manual text input; detects allergens instantly |
| 👤 Allergy Profile | Add/remove allergens; editable name & email |
| 📋 Scan History | Searchable, filterable; persisted via `localStorage` |
| 🥘 Food Database | 20 Indian foods; click any card to quick-scan |
| 📊 Dashboard | Live stats, allergen exposure bars, active alerts |
| 💾 Persistence | All data survives page refresh via `localStorage` |
| 📱 Responsive | Works on mobile, tablet, desktop |

---

## 🚀 Deploying

### Netlify (Recommended)
1. Drag-and-drop this folder to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Or connect your GitHub repo in Netlify dashboard → set **Publish directory** to `.`

### GitHub Pages
1. Push this folder to a GitHub repo
2. Go to **Settings → Pages → Source: Deploy from branch (main)**
3. Your site will be at `https://yourusername.github.io/repo-name/`

---

## 🛠️ Tech Stack

- **HTML5** — Semantic structure, SEO meta tags
- **Vanilla CSS** — Dark theme, glassmorphism, animations
- **Vanilla JavaScript** — No frameworks, no build step needed
- **localStorage** — Client-side data persistence (no database required)
- **MediaDevices API** — Camera access for food scanning

---

## 📦 No Dependencies

No `npm install`, no build step, no server required.  
Just open `index.html` in any modern browser — it works!

---

## 🔒 Privacy First

All your allergy data stays **on your device** in `localStorage`.  
Nothing is sent to any server. Ever.
