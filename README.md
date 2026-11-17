# VICKY — MY LITTLE UNIVERSE ❤️
### A Cinematic Birthday Surprise & Dark Romance Love Story by Afzal

A bespoke, mobile-exclusive romantic surprise application created exclusively for Vicky (My Bujji).

---

## 🚀 Netlify Deployment Guide

The project is **100% Netlify-ready** with [`netlify.toml`](./netlify.toml) and [`public/_redirects`](./public/_redirects) configured.

### Method A — Netlify Dashboard (Manual Drag-and-Drop)

1. Run the production build command in your terminal:
   ```bash
   npm run build
   ```
2. Log in to [Netlify](https://app.netlify.com/).
3. Go to the **Sites** tab and select **"Add new site"** ➔ **"Deploy manually"**.
4. Drag and drop the generated `dist` folder directly onto the upload area.
5. Your website will be live with an instant URL in seconds! You can also set a custom site name (e.g. `yogi-my-little-universe.netlify.app`).

---

### Method B — GitHub Integration (Automatic Continuous Deployment)

1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "Deploy to Netlify"
   git push origin main
   ```
2. Open [Netlify](https://app.netlify.com/), click **"Add new site"** ➔ **"Import an existing project"**.
3. Choose **GitHub** and select this repository.
4. The build settings will be automatically detected from [`netlify.toml`](./netlify.toml):
   * **Build command**: `npm run build`
   * **Publish directory**: `dist`
5. Click **"Deploy site"**. Netlify will build and deploy it immediately!

---

## 🛠️ Local Development & Testing

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Create production build
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```text
yogi-birthday-surprise/
│
├── public/
│   ├── assets/
│   │   ├── photos/       # Real photographs of Afzal & Yogi (photo1 - photo8)
│   │   └── music/
│   │       └── lover-bgm.mp3  # Official soundtrack "Lover BGM"
│   │
│   ├── _redirects       # SPA redirect rule for Netlify
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── canvas/      # 60fps Starfield, butterflies, and paper confetti canvas
│   │   ├── layout/      # Mobile music widget, bottom nav, and desktop gate
│   │   ├── scenes/      # All 9 cinematic chapters
│   │   └── ui/          # Cute animated virtual hug illustration
│   │
│   ├── config/
│   │   └── personalization.ts  # Central configuration
│   │
│   ├── utils/
│   │   └── audioManager.ts     # Persistent singleton HTMLAudioElement engine
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── index.html
├── netlify.toml         # Netlify build & redirect configuration
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## ✨ Features & Storyline Highlights

1. **Chapter 01 — Magical Opening**: Dreamy starfield, floating hearts, glowing butterflies, and the reveal of Yogi's name with **[ Open My Birthday Surprise ❤️ ]** (launches Lover BGM from 00:00).
2. **Chapter 02 — Birthday Celebration**: Animated cake, interactive candle blowing, confetti shower, and Afzal's birthday wish card.
3. **Chapter 03 — Friendship Memories**: Full-width Polaroid scrapbook gallery with your real photographs and lightbox zoom.
4. **Chapter 04 — How Friendship Became Love**: The 5-part sequential story tracing your journey from friends to soulmates with real photos.
5. **Chapter 05 — Our Relationship Story**: Romantic overview of your unbreakable bond.
6. **Chapter 06 — Reasons I Love You**: 12 touch-flippable cards revealing reasons why Afzal's heart chooses Yogi.
7. **Chapter 07 — Dark Romance Love Letter**: Black wax-sealed envelope with typewriter reveal, dark crimson/gold aesthetics, and closing poem.
8. **Chapter 08 — One Last Question**: Paced dramatic question preamble.
9. **Chapter 09 — Grand Proposal Celebration**:
   * **[ ALWAYS, MY AFZAL ❤️ ]**: Full-screen paper confetti explosion (hearts, love letters, petals, ribbons, gold stars) + framed couple keepsake.
   * **[ COME HERE, YOU NEED A HUG 🥺 ]**: Animated hugging arms wrapping around a blushing heart + warm hug resonance and paper burst.

---

*Made with all my heart for Vicky (My Bujji). Forever your Afzal ❤️*
