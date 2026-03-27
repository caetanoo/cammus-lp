# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Cammus** front-end repository — a B2B marketing startup using AI to replace paid traffic with intelligent organic growth. The codebase uses the **Flux Aurora Design System** with two variants:

1. **v1 (Flux Aurora)**: Orange/Violet palette, warm tech-startup energy
2. **v2 (Minimalista)**: 100% monochromatic, premium/editorial feel with dark mode support (active for CAMMUS)

All files are self-contained HTML with embedded CSS and minimal vanilla JS. **No build process** — open HTML files directly in a browser or use a local server.

## Development

```bash
# Preferred: local server (needed for iframe embedding tests)
python3 -m http.server 8000
# Visit http://localhost:8000

# Quick open (macOS)
open index.html
```

**Critical:** No npm, no package.json, no build step. `npm run dev` will fail.

## Repository Structure

### Production Files
- `index.html` — **⭐ Main CAMMUS landing page** (uses v2 design system)
- `design-system/design-system.html` — **⭐ Design system source of truth** (all tokens, typography, components)
- `design-system/flux-aurora-v2-source.html` — v2 CSS reference extracted from design system
- `Formulario Cammus/forms.html` — Standalone lead capture form (v2 tokens, dark mode)
- `Formulario Cammus/forms-embed.html` — Form for iframe embedding (optimized, no storage conflicts)
- `Formulario Cammus/agendamento.html` — Appointment scheduling page
- `Formulario Cammus/obrigado.html` — Post-submission thank-you page

### Configuration
- `Formulario Cammus/config.js` — **Webhook credentials** (gitignored, never commit)
- `Formulario Cammus/config.example.js` — Template for new developers to create `config.js`

To set up webhook config:
```bash
cp "Formulario Cammus/config.example.js" "Formulario Cammus/config.js"
# Edit config.js with real webhook token and URLs
```

### Design System Reference
- `design-system/embed-example.html` — Reference implementation for iframe embedding pattern

### Documentation
- `docs/design-system-spec.md` — Design rationale, tokens, component anatomy, motion patterns
- `docs/nova-paleta-minimalista.md` — Full v2 token spec with exact CSS values and contrast ratios
- `docs/GUIA-DE-APLICACAO-v2.md` — v1→v2 migration guide and usage rules
- `docs/copy-landing-page.md` — Strategic copywriting and content guidelines
- `docs/AGENTS.md` — Repository guidelines and structure (older, partially redundant with this file)

### Archive
- `_archive/` — Deprecated landing page versions (cammus-final, cammus-v2, etc.) kept for reference

## Architecture

### Design Token System
Both variants define all design values as CSS custom properties in `:root`. **Always use `var(--token-name)` — never hardcode colors, shadows, or spacing values.**

**v2 (Minimalista) — Active for CAMMUS:**
- `--charcoal-1` through `--charcoal-5` (dark backgrounds and text)
- `--off-white-1` through `--off-white-4` (light backgrounds and text)
- Neutral shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`
- No colored glows or gradients allowed

**v1 (Flux Aurora):**
- `--primary-500` (orange), `--secondary-500` (violet)
- Gradient support: `--gradient-primary`, `--gradient-secondary`
- Colored shadows: `--shadow-glow-primary`, `--shadow-glow-secondary`

### Typography
**v2 (active):**
- Headings: Coolvetica (external font, **not included** — falls back to `system-ui`)
- Serif accents: EB Garamond
- Monospace: JetBrains Mono

**v1:**
- Headings: Space Grotesk
- Body: Inter
- Serif: Instrument Serif
- Monospace: JetBrains Mono

### Code Style
- All HTML/CSS/JS in single-file architecture
- Indentation: **4 spaces** (not tabs)
- Section headers: Use existing HTML banner comment style
- Component classes: `.component-variant` kebab-case (`.btn-primary`, `.card-glass`, `.fa-nav`)
- State management: Use pseudo-classes (`:hover`, `:focus`), not state classes

### Standard Section Layout
```html
<section class="py-16 md:py-20 lg:py-24">
  <div class="max-w-7xl mx-auto px-6">
    <!-- content -->
  </div>
</section>
```

### Dark Mode (v2 only)
Toggle `data-theme="dark"` attribute on the `<html>` element. Forms include a JavaScript toggle button. Dark mode tokens are defined under `[data-theme="dark"]` selector.

### Form Embedding
Use `Formulario Cammus/forms-embed.html` inside an `<iframe>`. This version has:
- Fixed CORS handling
- No localStorage conflicts with parent page
- Isolated form validation
- See `design-system/embed-example.html` for integration pattern

## Design Principles

**v2 (Minimalista) — Current Active System:**
- Differentiate through **weight, size, and spacing** — not color
- Minimum contrast: 16:1 on headings, 12:1 on body text
- No colored glows, gradients, or saturated colors
- Shadows must be neutral gray only

**v1 (Flux Aurora):**
- Lift pattern: `translateY(-4px)` + shadow increase on hover
- Glow pattern: colored box-shadow using `--shadow-glow-primary`
- Gradients: max 2-3 colors

**Both variants:**
- WCAG 2.1 AA compliance: 4.5:1 contrast minimum for body text
- Semantic HTML: use `<nav>`, `<section>`, `<button>`, not `<div>` for interactive elements
- Focus states: 2px outline + 2px offset on all focusable elements

## Testing Checklist

Before finishing any change:
- [ ] Test at mobile (≤640px), tablet (641-1024px), desktop (≥1025px) breakpoints
- [ ] Verify all hover states and transitions work smoothly
- [ ] Check FAQ accordion expand/collapse (if present)
- [ ] Keyboard navigate with Tab, Enter, Space
- [ ] Verify focus rings are visible on all interactive elements
- [ ] Check contrast with WebAIM Contrast Checker or browser DevTools

## Custom Skills

This repository includes two Claude Code skills:

### design-check
Validates HTML files against Flux Aurora Design System v2 (Minimalista). Checks:
- CSS token usage (v2 variables)
- Monochromatic palette compliance
- Contrast ratios (WCAG AA)
- Typography (fonts, hierarchy)
- Component class naming
- Dark mode support
- Accessibility (semantic HTML, focus states)

Trigger: When user asks to "review", "validate", or "check design conformance"

### html-optimize
Optimizes standalone HTML files for performance while preserving functionality:
- CSS: removes duplicates, combines selectors, reduces whitespace
- HTML: removes unnecessary comments, consolidates whitespace
- Performance: adds font preconnect, suggests lazy loading
- Maintains legibility (does not fully minify)
- Preserves all accessibility attributes

Trigger: When user asks to "optimize", "minify", or "improve performance" of HTML

## Backend & API Architecture

### Dual Backend Strategy (Development vs Production)

**Development (Local)**:
```bash
# Terminal 1: Backend Express
cd backend && node server.js    # Port 3000

# Terminal 2: Frontend
python3 -m http.server 8000     # Port 8000
```

**Production (Vercel)**:
- Frontend: Static files served by Vercel
- Backend: Serverless function at `/api/submit-lead`
- No Express server needed

### API Endpoint: /api/submit-lead

**Files**:
- **Development**: `backend/server.js` (Express proxy)
- **Production**: `api/submit-lead.js` (Vercel serverless function)

**Format**: MUST use `module.exports` (CommonJS), NOT `export default` (ESM)

```javascript
// ✅ CORRECT (CommonJS - works on Vercel)
module.exports = async function handler(req, res) { ... }

// ❌ WRONG (ESM - causes compilation warnings)
export default async function handler(req, res) { ... }
```

**Why**: Vercel compiles ESM to CommonJS, causing warnings and execution issues. CommonJS runs natively.

### Environment Variables

**Development**: `backend/.env` (gitignored)
```env
WEBHOOK_URL=https://webhook.dev.sakaguchifutai.shop/webhook/lead-analysis
WEBHOOK_TOKEN=29dd43a31c2419183e0eb7d7b298335050807c5d83fb5c231cf02c3b740e0e1a
FRONTEND_URL=*
```

**Production**: Vercel Dashboard → Settings → Environment Variables
- `WEBHOOK_URL` (required)
- `WEBHOOK_TOKEN` (required)
- `FRONTEND_URL` (optional, defaults to `*`)

**NEVER commit tokens/secrets to Git**. Use `.env.example` as template.

### Deploy Configuration (vercel.json)

```json
{
  "rewrites": [
    { "source": "/agendamento", "destination": "/Formulario Cammus/agendamento.html" },
    { "source": "/obrigado", "destination": "/Formulario Cammus/obrigado.html" }
  ],
  "functions": {
    "api/submit-lead.js": {
      "maxDuration": 30,
      "memory": 1024
    }
  }
}
```

**Note**: `/` rewrite removed - Vercel serves `index.html` at root automatically.

### URL Strategy

Forms use **relative URL** (`/api/submit-lead`) that works in both environments:
- **Localhost**: Resolves to `http://localhost:8000/api/submit-lead` → proxied to backend:3000
- **Vercel**: Resolves to `https://domain.vercel.app/api/submit-lead` → serverless function

### Debugging Production Issues

**1. Console do Navegador** (F12):
```javascript
// Frontend errors appear here
❌ Erro ao enviar formulário: 500
```

**2. Vercel Function Logs**:
```
Dashboard → Deployments → [deployment] → Functions → submit-lead → Logs
```

**3. Test Script** (`test-api.js`):
```bash
node test-api.js
```
Simulates form submission to diagnose API issues.

### Scope Issues (JavaScript)

**Common pitfall**: Variables declared in one script block not accessible in submit handler.

**Solution**: Use `window` object to share data between scopes:
```javascript
// Script 1: Dropdown initialization
window.nichos = nichos;  // ✅ Expose globally

// Script 2: Submit handler
const nichosData = window.nichos || {};  // ✅ Access safely
```

**Example**: Nicho dropdown data needed in form validation but declared in different scope.

## Common Pitfalls

1. **No build tools**: Do not suggest webpack, vite, or npm scripts. This is intentional.
2. **Config secrets**: Never commit `Formulario Cammus/config.js` or `backend/.env` — they're gitignored.
3. **Token usage**: Always use CSS variables. Never hardcode `#1a1a1a` or `rgba(255, 255, 255, 0.9)`.
4. **v1 vs v2**: CAMMUS uses v2 (monochrome). Do not add orange/violet colors unless explicitly requested for v1.
5. **Single-file architecture**: Do not extract CSS/JS into separate files unless explicitly requested.
6. **Font availability**: Coolvetica is not included. Fallback chain must include `system-ui`.
7. **Forms embedding**: Use `forms-embed.html` for iframe, not `forms.html` (storage conflicts).
8. **Vercel functions format**: Use `module.exports`, NOT `export default`. ESM causes compilation issues.
9. **Environment variables**: Configure in Vercel Dashboard, not in code. Check after every redeploy.
10. **Relative URLs**: Forms use `/api/submit-lead` (relative), works in dev and prod without changes.
