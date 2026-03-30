# Darshan Patel Photography

Personal photography portfolio website built with Vite + React 18 + Tailwind CSS.

---

## Tech Stack

- **Vite** — build tool & dev server
- **React 18** + **React Router v6** — UI & routing
- **Tailwind CSS v3** — styling
- **Google Fonts** — Playfair Display (headings) + Inter (body)

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build
```

---

## Free Hosting (Deployment)

### Option 1 — Vercel (Recommended)

1. Push your project to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up with GitHub
3. Click **"Add New Project"** and import your repo
4. Vercel auto-detects Vite — click **Deploy**
5. You get a free URL like `darshan-photography.vercel.app`

Every time you push to GitHub, Vercel automatically redeploys.

### Option 2 — Netlify

1. Run `npm run build` to generate the `dist/` folder
2. Go to [netlify.com](https://netlify.com) and sign up
3. Drag and drop your `dist/` folder onto the Netlify dashboard
4. Or connect your GitHub repo for automatic deploys on every push

---

## Adding Photos & Albums

All content is driven by a single file: **`src/data/gallery.json`**

### Add a photo to an existing album

Open `gallery.json` and add a new entry to the album's `photos` array:

```json
{
  "id": "b6",
  "album_id": "birthdays",
  "album_name": "Birthdays & Celebrations",
  "url": "https://your-image-url.com/photo.jpg",
  "thumbnail": "https://your-image-url.com/photo-thumb.jpg",
  "caption": "Riya's Birthday Party",
  "is_featured": false
}
```

- Set `"is_featured": true` to include the photo in the homepage spotlight slideshow
- `url` = full-size image, `thumbnail` = smaller version for grid views

### Add a brand new album

Add a new object to the `albums` array in `gallery.json`:

```json
{
  "id": "housewarming",
  "name": "Housewarming Ceremonies",
  "description": "New beginnings captured beautifully.",
  "cover": "https://your-image-url.com/cover.jpg",
  "year": 2025,
  "photos": []
}
```

The album will automatically appear in the Albums page — no code changes needed.

---

## Where to Host Your Photos (Free)

| Service | Free Storage | Notes |
|---|---|---|
| **Cloudinary** | 25 GB | Best option — auto-resizes images via URL parameters |
| **ImgBB** | Unlimited | Simple drag-and-drop, get a direct URL instantly |
| **GitHub repo** | 1 GB | Commit photos directly into `public/photos/` |
| **Google Photos** | 15 GB | Works but getting direct URLs is tricky |

**Cloudinary is recommended** — upload once and get both a full-size and thumbnail URL by adjusting URL parameters (e.g. `w_800` for width). Replace the placeholder `picsum.photos` URLs in `gallery.json` with your real Cloudinary URLs.

---

## Project Structure

```
src/
├── data/
│   └── gallery.json          # All photographer info, services, and albums
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Albums.jsx
│   │   ├── AlbumDetail.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   └── ui/
│       ├── LazyImage.jsx     # Lazy loading with shimmer skeleton
│       ├── Lightbox.jsx      # Full-screen viewer with keyboard nav
│       └── RandomSpotlight.jsx # Featured photos slideshow
└── context/
    └── ThemeContext.jsx       # Dark / light mode
```

---

## Contact

- **Email:** dphotography1511@gmail.com
- **Phone:** (551) 226-2151
- **Instagram:** [@through._.my_lens](https://www.instagram.com/through._.my_lens/)
