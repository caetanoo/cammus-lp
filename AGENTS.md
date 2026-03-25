# Repository Guidelines

## Project Structure & Module Organization
This repository is split between static frontend assets and a small Node proxy. `index.html` is the main landing page. `Formulario Cammus/` contains the lead funnel pages (`forms.html`, `forms-embed.html`, `agendamento.html`, `obrigado.html`). `design-system/` holds the reusable visual reference in `design-system.html`. Shared frontend assets live in `assets/`. The webhook proxy lives in `backend/` with `server.js`, `.env.example`, and its own `package.json`. Reference material and product notes stay in `docs/`; `_archive/` is for old snapshots only.

## Build, Test, and Development Commands
The frontend has no build step.

- `open index.html`: open the landing page locally on macOS.
- `python3 -m http.server`: serve the repo at `http://localhost:8000` for browser testing.
- `cd backend && npm install`: install backend dependencies.
- `cd backend && npm run dev`: start the proxy on `http://localhost:3000`.
- `cd backend && npm start`: run the backend in production mode.

## Coding Style & Naming Conventions
Match the existing codebase: 4-space indentation in HTML, CSS, and backend JS. Keep CSS class names descriptive and kebab-case, such as `.faq-item` or `.btn-primary`. Prefer semantic section IDs and avoid introducing frameworks or build tooling unless the repository structure changes. In backend JavaScript, use `const` by default and keep validation and request handling explicit rather than abstracted.

## Testing Guidelines
There is no automated test suite yet. Validate frontend changes manually in desktop and mobile widths, checking layout, form flow, animations, and broken asset paths. For backend changes, start the server with a local `.env` copied from `backend/.env.example` and verify `GET /health` plus one `POST /api/submit-lead` request with sample payload data.

## Commit & Pull Request Guidelines
Recent history uses short imperative subjects with prefixes, for example `security: implement CSRF protection with tokens` and `refactor: optimize spacing across form pages`. Follow that pattern: `<type>: <change>`, with common types like `security`, `fix`, `refactor`, or `docs`. Pull requests should include a brief scope summary, linked issue or task when available, environment/config changes, and screenshots for any visual edits to the landing page or form pages.

## Security & Configuration Tips
Never commit real secrets. Keep `backend/.env` local, use `backend/.env.example` as the template, and ensure webhook tokens stay server-side only.
