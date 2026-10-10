# Deadly Dinosaurs 🦖

A fun, educational dinosaur app for kids: a Dino-pedia of 83 prehistoric animals, a timeline of the
Triassic, Jurassic and Cretaceous periods, and games (Dino Pairs, Egg Rescue Maze, Dino Quiz, Who Am I? and Dino Dash).

It's a Progressive Web App (PWA): once installed it works offline.

## Install on a tablet
1. Open the GitHub Pages link while connected to the internet.
2. **iPad:** in Safari tap **Share → Add to Home Screen**. **Android:** in Chrome tap **Install app**.
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
