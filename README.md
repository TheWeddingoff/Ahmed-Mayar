# Ahmed & Laila — Wedding Invitation

A romantic luxury wedding invitation website built with **plain HTML, CSS and JavaScript**. No build step, no frameworks.

**Date:** 08 . 08 . 2026 · **Venue:** White Garden, Cairo

## 📁 Project Structure

```
wedding-site/
├── index.html      # All page sections / markup
├── styles.css      # Design system + all styles
├── script.js       # Preloader, scroll-reveal, countdown, scroll heart path
├── assets/
│   ├── couple-1.jpg
│   ├── couple-2.jpg
│   ├── couple-3.jpg
│   └── venue.jpg
└── README.md
```

## 🚀 Run Locally

Just open `index.html` in any browser. Or serve it:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then visit http://localhost:8000

## 🌐 Deploy to GitHub Pages

1. Create a new repository on GitHub.
2. Upload **all the files in this folder** (keep the same structure).
3. In your repo, go to **Settings → Pages**.
4. Under **Source**, select branch `main` and folder `/ (root)`.
5. Save. After ~1 minute your site will be live at:
   `https://<your-username>.github.io/<repo-name>/`

## ✨ Features

- Romantic deep-wine + beige luxury palette
- Italianno + Cormorant Garamond + Dancing Script typography (Google Fonts)
- Full-page curved SVG path with a heart that follows scroll
- Live countdown to the wedding day
- Smooth fade-in reveal animations
- Fully responsive (mobile-first)
- Lightweight — no dependencies

## 🎨 Customize

- **Names / date / texts** → edit `index.html`
- **Colors / fonts / spacing** → edit the `:root` variables in `styles.css`
- **Photos** → replace files inside `/assets/` (keep the same names) or update the `<img src="">` paths
- **Wedding date** → change the `TARGET` constant in `script.js`
