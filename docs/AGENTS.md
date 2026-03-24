# Repository Guidelines

## Project Structure & Module Organization
- `index.html`: CAMMUS landing page (production).
- `design-system/design-system.html`: Primary design system — all tokens, components, and JS behaviors. Source of truth.
- `Formulario Cammus/`: Main form pages (forms.html, forms-embed.html, agendamento.html, obrigado.html).
- `docs/design-system-spec.md`: Design-system rationale, tokens, component specs, and motion guidelines.
- `docs/CHECKLIST-ANTI-CLONE.md`: Differentiation checklist against reference systems.
- `README.md`: High-level overview, usage, and accessibility notes.
- `_archive/`: Deprecated HTML versions kept for reference.

## Build, Test, and Development Commands
This repository is static and does not require a build step.
- Open locally: `open index.html` (macOS) to view the landing page.
- Open design system: `open design-system/design-system.html`
- Optional local server (for relative assets or testing): `python3 -m http.server` and then open `http://localhost:8000` in a browser.

## Coding Style & Naming Conventions
- HTML/CSS/JS live in a single file; keep indentation at 4 spaces to match existing style.
- CSS tokens are defined under `:root` with `--token-name` conventions (e.g., `--primary-500`).
- Typography: body uses Inter, headings use Space Grotesk, and accents use `.font-serif` or `.font-mono` classes (see the base styles in `flux-aurora-design-system.html`).
- Component classes use descriptive, kebab-case names (e.g., `.btn-primary`, `.faq-item`).
- Keep comments concise and section headers aligned with the existing banner style in the HTML.

## Testing Guidelines
- No automated tests are present.
- Manual checks: open the HTML and validate responsive layout, hover states, and FAQ accordion behavior.

## Commit & Pull Request Guidelines
- No git history is available in this folder, so there is no established commit message convention.
- If you add history later, prefer short, imperative summaries (e.g., "Add pricing cards").
- PRs (if used) should include a brief description of changes and screenshots of affected sections.

## Configuration & Assets
- Fonts load from Google Fonts and Tailwind is pulled via CDN. Keep external links up to date if you modify dependencies.
- Copying tokens or components into other projects should include the `:root` variables to preserve styling.
