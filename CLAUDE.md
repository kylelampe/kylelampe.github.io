# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal GitHub Pages site (`kylelampe.github.io`) hosting "Arya's Happy Colouring App" — a single-page coloring book for a child. The user picks a category thumbnail, enters a per-category unlock code, browses a 9-image grid, and draws on a `<canvas>` overlaid on the chosen line-art image.

## Architecture

There are two parallel implementations of the same app in this repo, and only one is actually served:

1. **`index.html`** — the live site. A single self-contained file: inline CSS, inline `<script>`, and `<img>` tags that reference `*.webp` assets at the repo root. GitHub Pages serves this directly with no build step. **Edit this file to change the deployed site.**
2. **`src/`** — an unfinished React port (`App.js`, `components/ColoringApp.js`, `Modal.js`, `DrawingCanvas.js`, `ImageGrid.js`, plus CSS in `src/styles/`). There is no `package.json`, no bundler config, and no `App.css` — these files are not built or served. Treat them as a sketch of an in-progress migration, not running code. If asked to modify behavior, confirm whether the user wants the change in `index.html` (live), `src/` (the port), or both.

## Asset and unlock conventions

Category thumbnails live at the repo root as `<category>.webp` (e.g. `mermaids.webp`, `panda.webp`). The 9 images shown in the grid for a category are `<category>_1.webp` through `<category>_9.webp` — the grid loop in `index.html` hardcodes indices 1–9, so adding a 10th image requires bumping the loop bound. Note that some categories have files numbered up to `_11` on disk that are currently unreachable from the UI.

Each thumbnail's unlock code is set via `data-code="..."` on its `<img>` in `index.html` (and duplicated in the `images` array in `src/components/ColoringApp.js`). The literal string `unlock` (case-insensitive) unlocks everything — it's a backdoor, not a bug.

## Development

No build, no tests, no linter. To preview locally, serve the repo root over HTTP (e.g. `python3 -m http.server`) and open `index.html` — opening via `file://` will work for most things but can break canvas image loading due to CORS. Pushing to `master` deploys via GitHub Pages.
