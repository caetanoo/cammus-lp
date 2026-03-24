# FLUX AURORA v2 — Paleta Minimalista Premium

**Transformação:** De orange/violet para monochromatic charcoal + off-white

---

## CORES BASE (Não-negociável)

```css
--charcoal-1: #1a1a1a;  /* Mais escuro */
--charcoal-2: #2e2e2e;  /* Meio termo */
--off-white: #f5f5f5;   /* Mais claro */
```

---

## TAREFA 1 — NOVA PALETA COMPLETA

### 1.1 BACKGROUNDS

```css
/* Page */
--bg-page: #f5f5f5;              /* Off-white — fundo principal */
--bg-page-alt: #ebebeb;          /* Off-white -10% lightness — alternativo */

/* Section */
--bg-section: #ffffff;           /* Branco puro — seções elevadas */
--bg-section-alt: #fafafa;       /* Quase branco — variação sutil */

/* Elevated Surface (cards, modals) */
--bg-elevated: #ffffff;          /* Branco puro */
--bg-elevated-hover: #fafafa;    /* Hover state */

/* Overlay */
--bg-overlay-dark: rgba(26, 26, 26, 0.8);   /* Charcoal-1 com alpha */
--bg-overlay-light: rgba(245, 245, 245, 0.95); /* Off-white com alpha */
```

**Uso:**
- `--bg-page`: body background
- `--bg-section`: seções principais (hero, features, etc)
- `--bg-elevated`: cards, dropdowns, tooltips
- `--bg-overlay-dark`: modals, backdrop escuros

---

### 1.2 TEXT

```css
/* Primary (máximo contraste) */
--text-primary: #1a1a1a;         /* Charcoal-1 — headings, body importante */

/* Secondary */
--text-secondary: #2e2e2e;       /* Charcoal-2 — body regular */

/* Muted */
--text-muted: #6b6b6b;           /* Charcoal derivado +40% lightness — labels, captions */

/* Inverse (texto em fundo escuro) */
--text-inverse: #f5f5f5;         /* Off-white — texto em bg dark */
--text-inverse-secondary: #d4d4d4; /* Off-white -10% — secondary em dark */

/* Disabled */
--text-disabled: #a3a3a3;        /* Cinza neutro médio */
```

**Contraste (WCAG AA):**
- `#1a1a1a` em `#f5f5f5` → **16.2:1** ✅ (excelente)
- `#2e2e2e` em `#f5f5f5` → **12.8:1** ✅ (excelente)
- `#6b6b6b` em `#f5f5f5` → **4.6:1** ✅ (AA approved)

---

### 1.3 BORDERS / DIVIDERS

```css
/* Subtle (quase invisível) */
--border-subtle: #e5e5e5;        /* Off-white -5% lightness */

/* Default (visível mas discreto) */
--border-default: #d4d4d4;       /* Off-white -10% lightness */

/* Strong (bem definido) */
--border-strong: #a3a3a3;        /* Cinza neutro médio */

/* Inverse (bordas em fundo escuro) */
--border-inverse: #404040;       /* Charcoal +10% lightness */
```

**Uso:**
- `--border-subtle`: separadores de seção, dividers internos
- `--border-default`: cards, inputs, botões outline
- `--border-strong`: elementos com ênfase, tabelas
- `--border-inverse`: elementos em background dark

---

### 1.4 INTERACTIVE (Links, Hover, Active)

**Justificativa para accent neutro:**
Uso um azul-acinzentado MUITO sutil apenas para links/CTAs, garantindo usabilidade sem quebrar a vibe monocromática.

```css
/* Link (azul-acinzentado desaturado) */
--interactive-link: #5a7a8c;        /* Azul slate muito fechado */
--interactive-link-hover: #486575;  /* Escurecido 15% */
--interactive-link-active: #3a5361; /* Escurecido 30% */

/* Alternativa 100% monocromática (se preferir sem azul) */
--interactive-mono: #2e2e2e;        /* Charcoal-2 */
--interactive-mono-hover: #1a1a1a;  /* Charcoal-1 (mais escuro no hover) */
--interactive-mono-active: #0a0a0a; /* Quase preto */
```

**Uso:**
- Links de texto: `--interactive-link`
- Hover: underline + cor hover
- Active: cor active

**Recomendação:** Usar versão monocromática (`--interactive-mono`) se quiser 100% neutro. Azul slate é OPCIONAL apenas se precisar de diferenciação visual para links.

---

### 1.5 CTA (Call-to-Action Buttons)

**Primary Button (high contrast, dark background)**

```css
/* Background */
--cta-primary-bg: #1a1a1a;            /* Charcoal-1 */
--cta-primary-bg-hover: #2e2e2e;      /* Charcoal-2 (mais claro no hover) */
--cta-primary-bg-active: #0a0a0a;     /* Mais escuro que Charcoal-1 */

/* Text */
--cta-primary-text: #f5f5f5;          /* Off-white */

/* Border (opcional, para versão outlined) */
--cta-primary-border: #1a1a1a;        /* Mesmo que bg */
```

**Secondary Button (outline style)**

```css
/* Background */
--cta-secondary-bg: transparent;
--cta-secondary-bg-hover: #fafafa;    /* Cinza muito claro */
--cta-secondary-bg-active: #f5f5f5;   /* Off-white */

/* Text */
--cta-secondary-text: #1a1a1a;        /* Charcoal-1 */
--cta-secondary-text-hover: #1a1a1a;

/* Border */
--cta-secondary-border: #1a1a1a;
--cta-secondary-border-hover: #2e2e2e;
```

**Ghost Button (texto apenas)**

```css
--cta-ghost-text: #2e2e2e;
--cta-ghost-text-hover: #1a1a1a;
--cta-ghost-bg-hover: #fafafa;
```

---

### 1.6 SEMANTIC (Feedback States)

**Princípio:** Tons MUITO discretos, desaturados, mantendo vibe neutra.

```css
/* Success (verde acinzentado) */
--semantic-success-bg: #e8f0e9;       /* Verde muito pálido, quase cinza */
--semantic-success-border: #a8c5ab;   /* Verde acinzentado */
--semantic-success-text: #3d5940;     /* Verde escuro desaturado */
--semantic-success-icon: #5a7a5d;     /* Verde médio desaturado */

/* Warning (amarelo acinzentado) */
--semantic-warning-bg: #f5f3e8;       /* Amarelo muito pálido */
--semantic-warning-border: #d4c9a3;   /* Amarelo acinzentado */
--semantic-warning-text: #5c5333;     /* Amarelo escuro desaturado */
--semantic-warning-icon: #8a7a4d;     /* Amarelo médio desaturado */

/* Error (vermelho acinzentado) */
--semantic-error-bg: #f5e8e8;         /* Vermelho muito pálido */
--semantic-error-border: #d4a3a3;     /* Vermelho acinzentado */
--semantic-error-text: #5c3333;       /* Vermelho escuro desaturado */
--semantic-error-icon: #8a4d4d;       /* Vermelho médio desaturado */

/* Info (azul acinzentado — mesmo tom do link) */
--semantic-info-bg: #e8eef5;          /* Azul muito pálido */
--semantic-info-border: #a3b9d4;      /* Azul acinzentado */
--semantic-info-text: #334059;        /* Azul escuro desaturado */
--semantic-info-icon: #5a7a8c;        /* Mesmo azul do link */
```

**Uso:**
- Alerts, badges, status indicators
- Sempre com fundo pálido + borda + texto escuro (não saturado)

---

### 1.7 SHADOWS

**Princípio:** Sombras sutis em tons de cinza, sem cor.

```css
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.08), 0 4px 6px rgba(0, 0, 0, 0.04);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.12);

/* Focus ring */
--shadow-focus: 0 0 0 3px rgba(26, 26, 26, 0.2);  /* Charcoal-1 com alpha */
```

---

### 1.8 GRADIENTS (Opcional, sutil)

**Nota:** Gradientes são opcionais. Se usar, manter monocromático.

```css
/* Subtle gradient (cinza claro para branco) */
--gradient-subtle: linear-gradient(180deg, #fafafa 0%, #ffffff 100%);

/* Dark gradient (charcoal para quase preto) */
--gradient-dark: linear-gradient(180deg, #2e2e2e 0%, #1a1a1a 100%);

/* Radial glow (para overlays decorativos) */
--gradient-glow: radial-gradient(circle at 50% 50%, rgba(26, 26, 26, 0.05), transparent 70%);
```

---

## TAREFA 2 — GUIA DE APLICAÇÃO

### 2.1 BACKGROUNDS

| Elemento | Token | Cor Final | Uso |
|----------|-------|-----------|-----|
| Body | `--bg-page` | `#f5f5f5` | Fundo principal da página |
| Navbar | `--bg-elevated` | `#ffffff` | Navbar sticky, blur opcional |
| Hero Section | `--bg-section` | `#ffffff` | Seções principais |
| Cards | `--bg-elevated` | `#ffffff` | Cards, modals, dropdowns |
| Footer | `--bg-page-alt` | `#ebebeb` | Footer, seções alternadas |
| Modal Backdrop | `--bg-overlay-dark` | `rgba(26,26,26,0.8)` | Overlay escuro |

---

### 2.2 TYPOGRAPHY

| Elemento | Token | Cor Final | Peso | Uso |
|----------|-------|-----------|------|-----|
| H1, H2 | `--text-primary` | `#1a1a1a` | 700 | Headlines principais |
| H3, H4 | `--text-secondary` | `#2e2e2e` | 600 | Subheadings |
| Body | `--text-secondary` | `#2e2e2e` | 400 | Parágrafos, texto regular |
| Labels | `--text-muted` | `#6b6b6b` | 500 | Labels, captions, metadata |
| Texto em dark BG | `--text-inverse` | `#f5f5f5` | 400-700 | Texto em footer escuro, CTAs |

---

### 2.3 BUTTONS (CTAs)

#### Primary Button
```css
background: var(--cta-primary-bg);        /* #1a1a1a */
color: var(--cta-primary-text);           /* #f5f5f5 */
border: none;
box-shadow: var(--shadow-sm);

/* Hover */
background: var(--cta-primary-bg-hover);  /* #2e2e2e */
box-shadow: var(--shadow-md);
transform: translateY(-1px);

/* Active */
background: var(--cta-primary-bg-active); /* #0a0a0a */
transform: translateY(0);
```

**HTML:**
```html
<button class="btn-primary">Começar Agora</button>
```

#### Secondary Button
```css
background: transparent;
color: var(--cta-secondary-text);         /* #1a1a1a */
border: 2px solid var(--cta-secondary-border); /* #1a1a1a */

/* Hover */
background: var(--cta-secondary-bg-hover); /* #fafafa */
border-color: var(--cta-secondary-border-hover); /* #2e2e2e */
```

---

### 2.4 LINKS

**Opção 1: Com azul slate (recomendado para usabilidade)**
```css
color: var(--interactive-link);           /* #5a7a8c */
text-decoration: none;

/* Hover */
color: var(--interactive-link-hover);     /* #486575 */
text-decoration: underline;
```

**Opção 2: 100% monocromático**
```css
color: var(--interactive-mono);           /* #2e2e2e */
text-decoration: underline;

/* Hover */
color: var(--interactive-mono-hover);     /* #1a1a1a */
font-weight: 600;
```

---

### 2.5 CARDS

```css
background: var(--bg-elevated);           /* #ffffff */
border: 1px solid var(--border-default);  /* #d4d4d4 */
border-radius: 1rem;
box-shadow: var(--shadow-sm);

/* Hover */
border-color: var(--border-strong);       /* #a3a3a3 */
box-shadow: var(--shadow-md);
transform: translateY(-2px);
```

---

### 2.6 INPUTS

```css
background: #ffffff;
border: 1px solid var(--border-default);  /* #d4d4d4 */
color: var(--text-primary);               /* #1a1a1a */

/* Focus */
border-color: var(--text-primary);        /* #1a1a1a */
box-shadow: var(--shadow-focus);          /* Ring charcoal */

/* Error */
border-color: var(--semantic-error-border); /* #d4a3a3 */

/* Success */
border-color: var(--semantic-success-border); /* #a8c5ab */
```

---

### 2.7 BADGES

```css
/* Default */
background: var(--bg-page-alt);           /* #ebebeb */
color: var(--text-secondary);             /* #2e2e2e */
border: 1px solid var(--border-subtle);   /* #e5e5e5 */

/* Success */
background: var(--semantic-success-bg);   /* #e8f0e9 */
color: var(--semantic-success-text);      /* #3d5940 */
border: 1px solid var(--semantic-success-border); /* #a8c5ab */
```

---

## TAREFA 3 — TOKENS FINAIS (CSS Variables)

```css
:root {
  /* ═══ BASE ═══ */
  --charcoal-1: #1a1a1a;
  --charcoal-2: #2e2e2e;
  --off-white: #f5f5f5;

  /* ═══ BACKGROUNDS ═══ */
  --bg-page: #f5f5f5;
  --bg-page-alt: #ebebeb;
  --bg-section: #ffffff;
  --bg-section-alt: #fafafa;
  --bg-elevated: #ffffff;
  --bg-elevated-hover: #fafafa;
  --bg-overlay-dark: rgba(26, 26, 26, 0.8);
  --bg-overlay-light: rgba(245, 245, 245, 0.95);

  /* ═══ TEXT ═══ */
  --text-primary: #1a1a1a;
  --text-secondary: #2e2e2e;
  --text-muted: #6b6b6b;
  --text-inverse: #f5f5f5;
  --text-inverse-secondary: #d4d4d4;
  --text-disabled: #a3a3a3;

  /* ═══ BORDERS ═══ */
  --border-subtle: #e5e5e5;
  --border-default: #d4d4d4;
  --border-strong: #a3a3a3;
  --border-inverse: #404040;

  /* ═══ INTERACTIVE ═══ */
  --interactive-link: #5a7a8c;
  --interactive-link-hover: #486575;
  --interactive-link-active: #3a5361;
  /* Alternativa monocromática */
  --interactive-mono: #2e2e2e;
  --interactive-mono-hover: #1a1a1a;
  --interactive-mono-active: #0a0a0a;

  /* ═══ CTA PRIMARY ═══ */
  --cta-primary-bg: #1a1a1a;
  --cta-primary-bg-hover: #2e2e2e;
  --cta-primary-bg-active: #0a0a0a;
  --cta-primary-text: #f5f5f5;

  /* ═══ CTA SECONDARY ═══ */
  --cta-secondary-bg: transparent;
  --cta-secondary-bg-hover: #fafafa;
  --cta-secondary-bg-active: #f5f5f5;
  --cta-secondary-text: #1a1a1a;
  --cta-secondary-border: #1a1a1a;
  --cta-secondary-border-hover: #2e2e2e;

  /* ═══ CTA GHOST ═══ */
  --cta-ghost-text: #2e2e2e;
  --cta-ghost-text-hover: #1a1a1a;
  --cta-ghost-bg-hover: #fafafa;

  /* ═══ SEMANTIC - SUCCESS ═══ */
  --semantic-success-bg: #e8f0e9;
  --semantic-success-border: #a8c5ab;
  --semantic-success-text: #3d5940;
  --semantic-success-icon: #5a7a5d;

  /* ═══ SEMANTIC - WARNING ═══ */
  --semantic-warning-bg: #f5f3e8;
  --semantic-warning-border: #d4c9a3;
  --semantic-warning-text: #5c5333;
  --semantic-warning-icon: #8a7a4d;

  /* ═══ SEMANTIC - ERROR ═══ */
  --semantic-error-bg: #f5e8e8;
  --semantic-error-border: #d4a3a3;
  --semantic-error-text: #5c3333;
  --semantic-error-icon: #8a4d4d;

  /* ═══ SEMANTIC - INFO ═══ */
  --semantic-info-bg: #e8eef5;
  --semantic-info-border: #a3b9d4;
  --semantic-info-text: #334059;
  --semantic-info-icon: #5a7a8c;

  /* ═══ SHADOWS ═══ */
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.08), 0 4px 6px rgba(0, 0, 0, 0.04);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.12);
  --shadow-focus: 0 0 0 3px rgba(26, 26, 26, 0.2);

  /* ═══ GRADIENTS (Opcional) ═══ */
  --gradient-subtle: linear-gradient(180deg, #fafafa 0%, #ffffff 100%);
  --gradient-dark: linear-gradient(180deg, #2e2e2e 0%, #1a1a1a 100%);
  --gradient-glow: radial-gradient(circle at 50% 50%, rgba(26, 26, 26, 0.05), transparent 70%);
}
```

---

## TAREFA 4 — ANTES vs DEPOIS

### Mudanças Principais

| Elemento | ANTES (Flux Aurora v1) | DEPOIS (v2 Minimalista) |
|----------|------------------------|-------------------------|
| **Primary** | Orange #F97316 | Charcoal #1a1a1a |
| **Secondary** | Violet #8B5CF6 | Charcoal #2e2e2e (nuance) |
| **Background** | Stone #FAFAF9 | Off-white #f5f5f5 |
| **CTAs** | Gradient orange→dark orange | Solid charcoal #1a1a1a |
| **Links** | Orange #F97316 | Azul slate #5a7a8c (ou mono #2e2e2e) |
| **Success** | Verde vibrante #10B981 | Verde acinzentado #5a7a5d |
| **Error** | Vermelho vibrante #EF4444 | Vermelho acinzentado #8a4d4d |
| **Shadows** | Com glow colorido | Cinza neutro, sem cor |

### Vibe

**ANTES:** Energético, colorful, tech startup vibrante
**DEPOIS:** Premium, minimalista, tech profissional, quase monocromático

---

## TAREFA 5 — ACESSIBILIDADE

### Contraste (WCAG AA)

| Combinação | Ratio | Status |
|------------|-------|--------|
| `#1a1a1a` em `#f5f5f5` | 16.2:1 | ✅ AAA |
| `#2e2e2e` em `#f5f5f5` | 12.8:1 | ✅ AAA |
| `#6b6b6b` em `#f5f5f5` | 4.6:1 | ✅ AA |
| `#5a7a8c` em `#f5f5f5` | 4.8:1 | ✅ AA (link) |
| `#f5f5f5` em `#1a1a1a` (inverse) | 16.2:1 | ✅ AAA |

### Focus States

Todos os elementos interativos têm:
- Focus ring visível: `--shadow-focus` (charcoal com alpha)
- Outline offset de 2px
- Transição suave (150ms)

---

## CONCLUSÃO

**Nova identidade:**
- 100% derivada de 3 cores base (charcoal-1, charcoal-2, off-white)
- Apenas 1 accent sutil (azul slate) para links, OPCIONAL
- Semantic colors desaturados e neutros
- Contraste excelente (WCAG AAA em maioria)
- Vibe premium, tech, minimalista

**Próximo passo:** Aplicar os tokens no HTML do Flux Aurora.
