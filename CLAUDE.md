# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Flux Aurora Design System** — a standalone design system for startup landing pages, with two variants:

1. **v1 (Flux Aurora)**: Orange/Violet palette, warm tech-startup energy
2. **v2 (Minimalista)**: 100% monochromatic, premium/editorial feel with dark mode support

All files are self-contained HTML with embedded CSS and minimal vanilla JS. **No build process** — open HTML files directly in a browser or use a local server.

## Development

```bash
# Preferred: local server (needed for iframe embedding tests)
python3 -m http.server 8000

# Quick open (macOS)
open index.html
```

No npm, no package.json, no build step. `npm run dev` will fail.

## Key Files

### Active / Production
- `index.html` — **⭐ Latest CAMMUS landing page**
- `design-system/design-system.html` — **⭐ Design system main** (source of truth for tokens, typography, components)
- `design-system/flux-aurora-v2-source.html` — v2 CSS source used in index.html
- `Formulario Cammus/forms.html` — Standalone booking/scheduling page (v2 tokens, dark mode)
- `Formulario Cammus/forms-embed.html` — Form component for iframe embedding
- `Formulario Cammus/obrigado.html` — Post-form thank-you page
- `Formulario Cammus/agendamento.html` — Appointment scheduling page

### Config (Formulario Cammus/)
- `config.js` — Webhook token + URLs reais (**não commitado** — gitignored)
- `config.example.js` — Template para novos devs

### Design System Reference
- `design-system/embed-example.html` — Reference implementation for iframe embedding pattern

### Deprecated / Archive
- `_archive/` — Versões antigas da landing page (cammus-final, cammus-v2, etc.)

### Documentation
- `design-system-spec.md` — Complete design rationale, tokens, component anatomy, motion patterns
- `nova-paleta-minimalista.md` — Full v2 token spec with exact CSS values and contrast ratios
- `GUIA-DE-APLICACAO-v2.md` — v1→v2 migration guide and usage rules
- `VALIDACAO-MELHORIAS.md` — Diff of forms.html vs forms-embed.html (validation, CORS, storage)
- `Landing Page CAMMUS - VERSÃO OTIMIZADA.md` — Strategic copywriting and content

## Architecture

### Token System
Both variants define all design values as CSS custom properties in `:root`. v1 uses orange/violet with colored glows; v2 uses charcoal/off-white with neutral shadows. Always use `var(--token-name)` — never hardcode colors, shadows, or spacing values.

### Typography
- **v1**: Space Grotesk (headings) + Inter (body) + Instrument Serif (italic accents) + JetBrains Mono
- **v2**: Coolvetica (headings, **not included** — falls back to `system-ui`) + EB Garamond (serif accents) + JetBrains Mono

### Code Style
HTML/CSS/JS live in a single file. Indentation is 4 spaces. Section headers in HTML use the existing banner comment style.

### Component Naming
Classes follow `.component-variant` kebab-case (`.btn-primary`, `.card-glass`, `.fa-nav`, `.fa-card`). State is via pseudo-classes, not extra classes.

### Section Layout Pattern
```html
<section class="py-16 md:py-20 lg:py-24">
  <div class="max-w-7xl mx-auto px-6">
    <!-- content -->
  </div>
</section>
```

### Dark Mode (v2)
Toggle `data-theme="dark"` on the `<html>` element. Some files include a JS theme toggle button.

### Form Embedding
Use `Formulario Cammus/forms-embed.html` inside an `<iframe>`. See `design-system/embed-example.html` for the pattern.

## Design Principles

**v2 (active for CAMMUS):**
- Differentiate through weight, size, and spacing — not color
- 16:1 contrast on headings, 12:1 on body text minimum
- No colored glows or gradients; shadows are neutral gray only

**v1 (Flux Aurora):**
- Lift pattern: `translateY(-4px)` + shadow increase on hover
- Glow pattern: colored box-shadow using `--shadow-glow-primary`
- Max 2-3 colors per gradient

**Both variants:**
- WCAG 2.1 AA: 4.5:1 contrast minimum for body text
- Semantic HTML — use `<nav>`, `<section>`, `<button>`, not `<div>` for interactive elements
- Focus states: 2px outline + 2px offset on all interactive elements

## Testing Checklist

Before finishing any change:
- [ ] Test at mobile, tablet, and desktop breakpoints
- [ ] Verify hover states and transitions
- [ ] Check FAQ accordion expand/collapse (if present)
- [ ] Keyboard navigate with Tab, Enter, Space
- [ ] Verify focus rings are visible on all interactive elements
- [ ] Check contrast with WebAIM Contrast Checker
