# Deadly Dinosaurs 🦖

## ▶️ [Open the app](https://richardbrb9-coder.github.io/deadly-dinosaurs/)

**https://richardbrb9-coder.github.io/deadly-dinosaurs/** works in any web browser on a computer, tablet or phone.
(This GitHub page only shows the code; the link above is the working app.)

A fun, educational dinosaur app for kids: a Dino-pedia of 83 prehistoric animals, a timeline of the
Triassic, Jurassic and Cretaceous periods, and games (Dino Pairs, Egg Rescue Maze, Dino Quiz, Who Am I? and Dino Dash).

## ▶️ [Open the app in your browser](https://richardbrb9-coder.github.io/deadly-dinosaurs/)

**https://richardbrb9-coder.github.io/deadly-dinosaurs/** works on a computer, tablet or phone. Nothing to download.

It's a Progressive Web App (PWA): once installed it works offline.

## Install on a tablet
1. Open [the app link](https://richardbrb9-coder.github.io/deadly-dinosaurs/) while connected to the internet.
2. **iPad:** in **Safari** tap **Share → Add to Home Screen**.
   **Android:** in **Chrome** tap the **⋮** menu → **Install app** (or **Add to home screen → Install**, not "Create shortcut").
3. Open it once from the home screen while still online, so every picture is saved for offline use.

## Updating
After changing the app, bump `CACHE_NAME` in `sw.js` (e.g. `v4` → `v5`) and push. Tablets pick up the
new version the next time the app is opened while online.

## Files
- `index.html` – the whole app (screens, games, styles)
- `dinosaurs.js` – the dinosaur list, descriptions and clues
- `dino-images/` – one WebP picture per dinosaur
- `sw.js` – the service worker that saves everything for offline use
- `manifest.json` – app name, icons and colours for installing
