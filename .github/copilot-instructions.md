## Quick orientation

This repository is a collection of static HTML/CSS student assignments for CS140. There is no build system or package manager. Most files are plain `.html`, `.css`, and images arranged by exercise.

Key directories:
- `activities/` — small exercise pages and related assets (images, css). Example: `activities/images/images.html` and `activities/images/images.css`.
- `projects/` — larger project folders (e.g. `projects/interest/`).
- `final/` — final project submissions.

Core rules and conventions (discoverable in `README.md`):
- Do not use spaces in file or folder names — use lowercase and hyphens/underscores instead.
- Put activities in `activities/`, projects in `projects/`, finals in `final/`.
- Keep asset links relative to the file (many pages use same-directory `styles.css` or `images/` subfolders).

What AI agents should know to be productive
- This is a static site: changes affect only files in-place. No build/test pipeline to run.
- Typical page structure: `header` → `main` → `footer`. When editing templates, update representative files such as `activities/index.html`, `activities/images/images.html`, and `projects/interest/Interest.html`.
- CSS is usually local to a folder. Example: `activities/images/images.css` contains basic rules (body font). Preserve relative `link rel="stylesheet" href="..."` paths when moving files.

Local dev & quick smoke tests
- Open files directly in a browser (double-click `.html`) or run a local static server from the repo root (recommended to catch relative path issues):

```bash
# run a simple HTTP server (macOS / zsh)
python3 -m http.server 8000
# then visit http://localhost:8000/activities/images/images.html
```

Debug checklist for visual/asset issues
- If an image or CSS is missing, check the browser DevTools Network tab for 404 and verify the relative path. Common mistakes: missing `..` when linking from a subfolder, mixed case in filenames, or duplicate images in multiple folders.
- macOS filesystem is often case-insensitive but remote hosts may be case-sensitive. Prefer all-lowercase filenames to avoid surprises (many files in this repo are lowercase).

Editing/PR guidance for agents
- When adding or moving files, update relative links in the referencing HTML files. Example: if you add `projects/interest/new.css`, link from `projects/interest/Interest.html` with `href="new.css"`.
- Avoid renaming folders to include spaces. Keep the repo structure consistent with `README.md` rules.

Files to inspect when making changes (high value):
- `README.md` — project rules and placement of assignments.
- `activities/index.html`, `activities/images/images.html`, `activities/images/images.css` — representative activity samples.
- `projects/interest/Interest.html`, `projects/interest/styles.css` — representative project layout and link patterns.

Edge cases and pitfalls seen in the repo
- Duplicate assets (e.g. `activities/cat.jpg` vs `activities/images/cat.jpg`) — confirm which one pages reference before deleting or consolidating.
- Broken relative links when files are moved between folders. Always run the local server smoke test after refactors.

If you need to make larger changes
- Propose a small, reversible PR that updates a single folder or page, run the local server, and include screenshots or file lists in the PR description showing before/after paths.

Questions for the repo owner
- Do you want a single shared CSS folder for global styles or keep CSS local to each exercise? State preference and any style variables to reuse.

If anything above is unclear or you want the agent to enforce extra rules (file name patterns, automated checks), tell me and I will iterate on this file.
