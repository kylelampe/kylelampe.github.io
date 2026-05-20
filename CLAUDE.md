# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal GitHub Pages site (`kylelampe.github.io`) hosting "Arya's Happy Colouring App" — a single-page coloring book for a child. The user picks a category thumbnail, enters a per-category unlock code, browses the category's images, and draws on a `<canvas>` overlaid on the chosen line-art image.

## Architecture

Vite + vanilla JS modules. No framework. The whole app is ~5 small files in `src/`:

- **`src/main.js`** — entry. Imports the CSS, wires up DOM event handlers on `DOMContentLoaded`, calls into the other modules.
- **`src/categories.js`** — single source of truth. An array of `{ id, label, code, count, slot }` objects. The `<ol>` listing, the thumbnail gallery, and the per-category image grid all read from this. Adding or renaming a category means editing this file and nothing else.
- **`src/gallery.js`** — renders the thumbnail picker into `#thumbnails`, manages locked state, and exposes `applyCode(value)` for the unlock-code input.
- **`src/grid.js`** — renders the per-category image grid into the modal. The number of images shown comes from `category.count`, so the old hardcoded `1..9` loop (which orphaned `_10` and `_11` files on disk) is gone.
- **`src/canvas.js`** — drawing logic. Uses Pointer Events (not separate mouse/touch listeners) with `setPointerCapture`, and computes coordinates via `getBoundingClientRect()`. The canvas has `touch-action: none` so the browser doesn't scroll/zoom while drawing.
- **`src/styles.css`** — all CSS, imported by `main.js` so Vite bundles it. Includes a `@media (max-width: 600px)` block that swaps the desktop corner-positioned thumbnail layout for a vertical stack on phones.

`index.html` is a thin shell: the modal scaffolding, the `<h1>`, an empty `<ol id="categoryList">`, the code input, and an empty `<div id="thumbnails">`. Everything else is rendered by JS.

## Asset conventions

Static assets live in `public/` (Vite serves it as the site root). Category thumbnails are `<id>.webp` (e.g. `mermaids.webp`); the gallery images are `<id>_1.webp` through `<id>_<count>.webp`. Counts are declared in `src/categories.js` and must match what's on disk. The `lock.png` overlay also lives in `public/`.

The literal unlock code `unlock` (case-insensitive) opens every category — it's a deliberate backdoor, not a bug. Per-category codes are in `src/categories.js`. Since this is client-side, all codes are visible in the bundle; treat them as a soft gate, not security.

## Development

```sh
npm install         # one-time
npm run dev         # local dev server with hot reload
npm run build       # production build into dist/
npm run preview     # serve the built dist/ locally
```

There are no tests and no linter.

## Deployment

Production site: `https://happycolouring.ca` — served by Caddy on a VPS (Ubuntu 24.04, IP `51.81.202.68`). Auto-HTTPS via Let's Encrypt (Caddy handles renewal).

Pushing to `master` triggers `.github/workflows/deploy.yml`, which runs `npm ci && npm run build` and `rsync`s `dist/` to `/var/www/arya/` on the VPS over SSH as the `deploy` user. The deploy user's SSH key is restricted via `rrsync -wo /var/www/arya` — it can only write into that directory, no shell, no sudo.

Repo secrets the workflow needs:
- `DEPLOY_SSH_KEY` — private key for `deploy@happycolouring.ca`
- `SSH_KNOWN_HOSTS` — host keys for `happycolouring.ca`

Manual SSH access for admin (separate from CI key, full `ubuntu` user with sudo): `ssh arya-vps` (configured in `~/.ssh/config`, key at `~/.ssh/arya_vps`).

GitHub Pages is disabled — the `kylelampe.github.io` URL no longer serves this site.
