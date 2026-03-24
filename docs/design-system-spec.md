# FLUX AURORA — Design System
**Landing Page para Startup | Sistema Novo e Inovador**

---

## ETAPA 1 — Auditoria das Referências

### Social Grow (PRINCIPAL)
**10 bullets de sensação:**
1. Background bege quente (#E3DDD7) — sensação acolhedora, organic warmth
2. Glow/gradientes sutis (orange-100/40 + purple-100/30) — atmosfera etérea, energia
3. Cards semi-translúcidos (bg-white/40 backdrop-blur-sm) — profundidade, camadas glass
4. Raios grandes e generosos (rounded-[2rem], 2.5rem) — formas orgânicas, suaves
5. Tipografia mix: sans-serif bold + serif itálico — contraste dinâmico
6. Preto intenso (#000) para CTAs — alto contraste, decisivo
7. Animações slideUpBlur com blur+movimento — entrada suave, cinematográfica
8. Sonar ring pulse — energia viva, pulsante
9. Sombras suaves multi-camadas — elevação sutil
10. Phone mockup social — contexto produto, tangível

**Densidade:** Média-alta, conteúdo rico
**Contraste:** Alto (preto vs bege claro)
**Motion:** Animações suaves, blur+translate
**Tipografia:** Geist (sans) + Playfair/Instrument Serif (italic accents)

### uPlane (YC)
**10 bullets de sensação:**
1. Background neutro tech (#f5f5f5) — clean, profissional, SaaS
2. Gradiente azul vibrante (#2476FF → #0E54C9) — tech confiável, YC energy
3. Tipografia dupla: Inter Display (headings) + Geist (body) — hierarquia clara
4. Sombras consistentes multi-layer — elevação bem definida
5. Raios pill 100px + cards 12-16px — sistema coeso
6. Spacing scale preciso (8→12→16→20→24→32→40→60) — grid matemático
7. Inset shadow em buttons — profundidade sutil
8. Arrow hover translateX — microinteração eficiente
9. Nav pills hover dark invertido — contraste forte
10. Container 1240px — densidade balanceada

**Densidade:** Média, organizado, respirável
**Contraste:** Médio-alto (azul forte + branco)
**Motion:** Sutis, funcionais (translateX, opacity)
**Tipografia:** Inter Display + Geist (moderna, tech)

### Typa (YC)
**10 bullets de sensação:**
1. CSS variables/design tokens — sistema modular, escalável
2. Tipografia serif protagonista — elegância editorial
3. Hero com SVG ilustração atmosférica (sol/lua) — storytelling visual
4. Border transitions sutis — feedback leve
5. Espaçamento generoso — minimalismo, respiro
6. Primary + orange dot accent — personalidade, marca
7. Monospace para labels — diferenciação técnica
8. Rounded-2xl consistente — suavidade uniforme
9. Text hierarchy com muted-foreground — legibilidade
10. Dark mode nativo — flexibilidade moderna

**Densidade:** Baixa-média, muito respiro
**Contraste:** Médio (depende do tema)
**Motion:** Minimalista (border-color, translate)
**Tipografia:** Serif display + sans body (editorial tech)

---

### 5 Elementos que NÃO Copiar do Social Grow

1. ❌ **Phone mockup com slider de posts sociais** — muito específico, assinatura visual
2. ❌ **Combinação exata orange-purple gradient glow** — gradiente característico
3. ❌ **Layout hero split 50/50 com phone à direita** — composição icônica
4. ❌ **Sonar ring animation circular** — padrão de movimento único
5. ❌ **Badge pill (#d1c8c0) + surface (#efeae5) específicos** — paleta exata

### 5 Elementos do Social Grow que MANTER como DNA

1. ✅ **Direção de cor warm/neutral** — energia do bege (mas shift de hue)
2. ✅ **Glass/blur surfaces** — profundidade, atmosfera translúcida
3. ✅ **Glow/gradients sutis** — energia controlada, não flat
4. ✅ **Alto contraste em CTAs** — preto/dark vs background claro
5. ✅ **Mix tipográfico sans + serif italic** — dinamismo, personalidade

---

## ETAPA 2 — DNA do Novo Design System

### Nome Interno
**FLUX AURORA**

### 3 Princípios
1. **Clareza primeiro** — Hierarquia visual imediata, informação escaneável sem esforço
2. **Energia controlada** — Glow e movimento presentes mas sutis, nunca excessivos
3. **Profundidade respirável** — Camadas translúcidas com espaço generoso entre elementos

### 3 Anti-princípios (o que evitar)
1. **Não sobrecarregar com gradientes** — máximo 2-3 cores por gradiente
2. **Não copiar layouts característicos** — criar composições próprias
3. **Não sacrificar legibilidade** — contraste mínimo WCAG AA (4.5:1)

### Palavras-chave de Feeling
- Sofisticado
- Respirável
- Luminoso
- Moderno
- Confiável
- Fluido
- Preciso
- Escalável

### Palavras Proibidas
- Pesado
- Confuso
- Genérico
- Corporativo-frio
- Saturado
- Rígido
- Datado
- Amador

---

## ETAPA 3 — Tokens (Especificação Completa)

### 3.1 CORES

#### Neutrals
```json
{
  "neutral-0": "#FAFAF9",     // Page background (shift do bege Social Grow para stone)
  "neutral-50": "#F5F5F4",    // Card/Surface
  "neutral-100": "#E7E5E4",   // Badge/Tag
  "neutral-200": "#D6D3D1",   // Border muted
  "neutral-300": "#A8A29E",   // Border default
  "neutral-800": "#292524",   // Text body
  "neutral-900": "#1C1917",   // Text heading
  "neutral-950": "#0C0A09"    // CTA dark, high contrast
}
```

**Uso:**
- `neutral-0`: Background principal
- `neutral-50`: Cards, surfaces elevadas
- `neutral-100`: Badges, tags, inputs desabilitados
- `neutral-900`: Headings, texto primário
- `neutral-950`: Botões CTA principais

#### Primary / Secondary / Accent
```json
{
  "primary-400": "#FB923C",   // Orange warm (shift do purple Social Grow)
  "primary-500": "#F97316",   // Primary laranja vibrante
  "primary-600": "#EA580C",   // Primary hover/active

  "secondary-400": "#A78BFA", // Violet soft
  "secondary-500": "#8B5CF6", // Secondary violeta
  "secondary-600": "#7C3AED", // Secondary hover

  "accent-teal": "#14B8A6",   // Teal para success/highlights
  "accent-cyan": "#06B6D4"    // Cyan para info/links
}
```

**Uso:**
- `primary-500`: CTA primários, links principais, accents
- `secondary-500`: CTA secundários, elementos decorativos
- `accent-teal`: Success states, highlighted features
- `accent-cyan`: Info badges, secondary links

#### Semantic
```json
{
  "success": "#10B981",       // Green-500
  "warning": "#F59E0B",       // Amber-500
  "error": "#EF4444",         // Red-500
  "info": "#3B82F6"           // Blue-500
}
```

#### Glow / Highlight
```json
{
  "glow-primary": "rgba(249, 115, 22, 0.3)",   // Orange glow
  "glow-secondary": "rgba(139, 92, 246, 0.25)", // Violet glow
  "glow-ambient": "rgba(251, 146, 60, 0.15)"    // Ambient warm glow
}
```

#### Gradients (3-6)
```json
{
  "gradient-hero": "linear-gradient(135deg, rgba(251, 146, 60, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)",
  "gradient-cta": "linear-gradient(180deg, #F97316 0%, #EA580C 100%)",
  "gradient-accent": "linear-gradient(90deg, #14B8A6 0%, #06B6D4 100%)",
  "gradient-glow": "radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.2), transparent 70%)"
}
```

**Uso recomendado:**
- `gradient-hero`: Background decorativo hero section
- `gradient-cta`: Botões primários principais
- `gradient-accent`: Badges, highlights, borders animados
- `gradient-glow`: Overlays decorativos, glow effects

---

### 3.2 TIPOGRAFIA

#### Font Pairing
```
Headings: "Space Grotesk", sans-serif (moderno, tech, geométrico)
Body: "Inter", sans-serif (legível, neutro, versátil)
Accent/Italic: "Instrument Serif", serif (elegância, contraste)
Mono: "JetBrains Mono", monospace (labels, código)
```

**Fallbacks:**
```css
font-family: "Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
font-family: "Instrument Serif", Georgia, serif;
```

#### Escala Tipográfica

| Token | Size | Line Height | Weight | Letter Spacing | Uso |
|-------|------|-------------|--------|----------------|-----|
| **H1** | 64px (4rem) | 1.1 (110%) | 700 | -0.02em | Hero headlines |
| **H2** | 48px (3rem) | 1.15 (115%) | 700 | -0.01em | Section titles |
| **H3** | 32px (2rem) | 1.25 (125%) | 600 | -0.01em | Subsection titles |
| **H4** | 24px (1.5rem) | 1.4 (140%) | 600 | 0 | Card titles |
| **Body L** | 20px (1.25rem) | 1.6 (160%) | 400 | 0 | Hero subtitle, intros |
| **Body M** | 16px (1rem) | 1.5 (150%) | 400 | 0 | Paragraph default |
| **Body S** | 14px (0.875rem) | 1.5 (150%) | 400 | 0 | Captions, metadata |
| **Label** | 12px (0.75rem) | 1.4 (140%) | 600 | 0.05em | Badges, tags, labels |
| **Caption** | 11px (0.6875rem) | 1.4 (140%) | 500 | 0.02em | Footnotes, legal |

#### Regras de Uso
- **H1-H3**: Space Grotesk, bold weights
- **H4**: Space Grotesk, medium weight
- **Body**: Inter, regular (400) e medium (500)
- **Serif accent**: Usar em palavras-chave dentro de headings para contraste (ex: "Cresça *rápido*")
- **Mono**: Labels técnicos, badges de feature, código

**Gradiente em texto (opcional):**
```css
.text-gradient-primary {
  background: linear-gradient(90deg, #F97316, #EA580C);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

### 3.3 LAYOUT & SPACING

#### Container Widths
```json
{
  "container-sm": "640px",   // Mobile landscape
  "container-md": "768px",   // Tablet
  "container-lg": "1024px",  // Desktop
  "container-xl": "1280px",  // Desktop wide (main container)
  "container-2xl": "1536px"  // Ultra wide (opt-in)
}
```

**Uso:** `container-xl` (1280px) como padrão principal, com `px-6 md:px-12` de padding horizontal.

#### Grid
```
Colunas: 12 (padrão)
Gutters: 24px (1.5rem) mobile, 32px (2rem) desktop
```

#### Spacing Scale (Tailwind-based)
```
0.5 → 2px   (hairline)
1   → 4px   (tight)
2   → 8px   (compact)
3   → 12px  (cozy)
4   → 16px  (default)
5   → 20px  (comfortable)
6   → 24px  (spacious)
8   → 32px  (relaxed)
10  → 40px  (loose)
12  → 48px  (airy)
16  → 64px  (generous)
20  → 80px  (section start)
24  → 96px  (section default)
32  → 128px (section large)
```

#### Section Padding Padrões
```css
/* Mobile */
py-16 (4rem top+bottom)

/* Tablet+ */
md:py-20 (5rem)

/* Desktop */
lg:py-24 (6rem)

/* Entre seções */
gap-20 md:gap-24 lg:gap-32
```

---

### 3.4 SHAPE & ELEVATION

#### Radii Scale
```json
{
  "rounded-xs": "4px",      // Inputs, small buttons
  "rounded-sm": "6px",      // Badges, tags
  "rounded-md": "8px",      // Default buttons
  "rounded-lg": "12px",     // Small cards
  "rounded-xl": "16px",     // Default cards
  "rounded-2xl": "20px",    // Large cards, modals
  "rounded-3xl": "24px",    // Hero cards, featured content
  "rounded-full": "9999px"  // Pills, avatars, icon buttons
}
```

**Uso:**
- Botões: `rounded-md` (8px) ou `rounded-full` para pills
- Cards: `rounded-xl` (16px) ou `rounded-2xl` (20px)
- Inputs: `rounded-xs` (4px) ou `rounded-sm` (6px)

#### Shadow Scale
```css
/* Sombras (baseadas em Social Grow + uPlane) */
shadow-xs:  0 1px 2px rgba(0,0,0,0.05)
shadow-sm:  0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)
shadow-md:  0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.05)
shadow-lg:  0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)
shadow-xl:  0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)
shadow-2xl: 0 25px 50px rgba(0,0,0,0.15)

/* Glow shadows */
shadow-glow-primary: 0 0 40px rgba(249, 115, 22, 0.3)
shadow-glow-secondary: 0 0 30px rgba(139, 92, 246, 0.25)
```

#### Border Styles
```css
border-default: 1px solid neutral-300
border-muted: 1px solid neutral-200
border-primary: 1px solid primary-500
border-glass: 1px solid rgba(255,255,255,0.2)
```

#### Blur / Glass Rules
```css
/* Glass cards */
.glass-card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Glass navbar */
.glass-nav {
  background: rgba(250, 250, 249, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

/* Blur levels */
blur-sm: 8px
blur-md: 12px
blur-lg: 16px
blur-xl: 24px
```

#### Dividers & Overlays
```css
/* Dividers */
divider-horizontal: border-top 1px solid neutral-200
divider-vertical: border-left 1px solid neutral-200

/* Overlays */
overlay-dark: rgba(0, 0, 0, 0.5)
overlay-light: rgba(255, 255, 255, 0.8)
overlay-gradient: linear-gradient(to bottom, transparent, rgba(0,0,0,0.6))
```

---

### 3.5 ESTADOS E ACESSIBILIDADE

#### Focus Ring
```css
.focus-ring {
  outline: 2px solid primary-500;
  outline-offset: 2px;
  border-radius: inherit;
}

/* Alternativa com box-shadow */
.focus-ring-shadow {
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.4);
}
```

**Regra:** Todo elemento interativo (button, link, input) deve ter focus visível.

#### Hover / Active / Disabled

**Buttons:**
```css
/* Primary */
default: bg-primary-500
hover: bg-primary-600, scale-105
active: bg-primary-600, scale-95
disabled: bg-neutral-100, text-neutral-400, cursor-not-allowed

/* Secondary */
default: border-primary-500, text-primary-500
hover: bg-primary-50
active: bg-primary-100
disabled: border-neutral-200, text-neutral-400
```

**Links:**
```css
default: text-neutral-900
hover: text-primary-500, underline
active: text-primary-600
```

**Cards:**
```css
default: border-neutral-300
hover: border-primary-400, shadow-md
active: border-primary-500
```

#### Contraste Mínimo (WCAG AA)

**Metas:**
- Texto normal (< 18px): contraste mínimo 4.5:1
- Texto grande (≥ 18px): contraste mínimo 3:1
- Elementos UI (botões, ícones): contraste mínimo 3:1

**Como garantir:**
1. Usar `neutral-900` (#1C1917) para texto principal sobre `neutral-0` (#FAFAF9) → contraste ~17:1 ✅
2. Usar `neutral-800` (#292524) para body text → contraste ~13:1 ✅
3. Evitar `neutral-400` ou mais claro para texto importante
4. Botões primários: branco sobre `primary-500` → contraste ~4.8:1 ✅
5. Testar com ferramentas: WebAIM Contrast Checker, Figma plugins

---

## ETAPA 4 — COMPONENTES (Spec + Exemplos)

### BUTTONS

#### Variantes
1. **Primary** — CTA principal, conversão
2. **Secondary** — Ação secundária, outline
3. **Tertiary/Ghost** — Links discretos, navegação interna
4. **Icon Button** — Apenas ícone, ações rápidas

#### Estados
- Default
- Hover (scale 1.05 + bg darker)
- Active/Pressed (scale 0.95)
- Disabled (opacity 0.5, cursor not-allowed)
- Loading (spinner + disabled)

#### Anatomia
- Container (padding, radius, bg, border)
- Label (text, weight, size)
- Icon (opcional, left ou right)
- Focus ring (outline)

#### Regras de Uso
- **DO:** Usar Primary para ação principal por tela (máx 1-2)
- **DO:** Alinhar ícones com gap-2 (8px)
- **DON'T:** Misturar mais de 2 estilos de botão na mesma área
- **DON'T:** Usar só ícone sem aria-label

#### Exemplo de Copy
```html
<button>Começar Agora</button>
<button>Agendar Demo</button>
<button>Saiba Mais</button>
```

---

### INPUTS

#### Variantes
1. **Text** — Email, nome, etc
2. **Textarea** — Mensagens longas
3. **Select** — Dropdown

#### Estados
- Default
- Focus (border primary, focus ring)
- Error (border error, helper text vermelho)
- Success (border success, helper text verde)
- Disabled

#### Anatomia
- Label (acima, font-medium, size-sm)
- Input field (border, padding, radius)
- Helper text / Error message (abaixo, size-xs)
- Icon (opcional, left inside)

#### Regras de Uso
- **DO:** Label sempre visível, não usar placeholder como label
- **DO:** Helper text para erros claros ("Email inválido", não "Erro")
- **DON'T:** Inputs muito largos (max 480px para text)

#### Exemplo de Copy
```html
<label>Email corporativo</label>
<input placeholder="seu@empresa.com" />
<span class="error">Por favor, insira um email válido</span>
```

---

### BADGE / TAG

#### Variantes
1. **Default** — Neutro, informação
2. **Primary** — Destaque, novo
3. **Success** — Status positivo
4. **Warning** — Atenção

#### Estados
- Static (não interativo)
- Clickable (hover + cursor pointer) — se for filtro/removível

#### Anatomia
- Container (padding compacto, radius-full ou rounded-sm)
- Label (size-xs, weight-600, uppercase opcional)
- Icon (opcional, left)

#### Regras de Uso
- **DO:** Usar para categorias, status, labels curtos
- **DON'T:** Usar para CTAs (use button)

#### Exemplo de Copy
```html
<span class="badge">Novo</span>
<span class="badge">Em desenvolvimento</span>
<span class="badge">YC W24</span>
```

---

### CARD

#### Variantes
1. **Default** — Card básico, informação
2. **Highlighted** — Card com borda primary, destaque
3. **Interactive** — Hover effect, clickable
4. **Glass** — Translúcido com backdrop-blur

#### Estados
- Default
- Hover (border color change, shadow increase) — se interactive
- Active/Selected (border primary, bg tint)

#### Anatomia
- Container (padding, radius, bg, border, shadow)
- Header (opcional, title + icon)
- Body (content, flex-col, gap)
- Footer (opcional, CTA ou metadata)

#### Regras de Uso
- **DO:** Padding generoso (p-6 ou p-8)
- **DO:** Usar shadow sutil para elevação
- **DON'T:** Cards dentro de cards (exceção: design específico)

---

### NAVBAR

#### Variantes
1. **Default** — Opaco
2. **Glass** — Translúcido com blur (sticky)

#### Anatomia
- Container (flex, justify-between, padding, border-bottom)
- Logo (left)
- Nav links (center, hidden mobile)
- CTA button (right)
- Mobile menu toggle (right, visible mobile)

#### Regras de Uso
- **DO:** Sticky top-0 com backdrop-blur
- **DO:** CTA contrastante (Primary button)
- **DON'T:** Mais de 5 links no nav principal

#### Exemplo de Copy
```html
Logo | Recursos • Preços • Sobre | [Entrar] [Começar Grátis]
```

---

### HERO

#### Variações
1. **Centered** — Texto centralizado, CTA abaixo, visual decorativo no fundo
2. **Split** — Texto left, visual right (EVITAR copiar Social Grow)

#### Anatomia (Centered)
- Badge/Label (opcional, "Novidade" etc)
- H1 (grande, bold, max-width para legibilidade)
- Subtitle (Body L, muted color, max-width)
- CTA row (flex gap, primary + secondary)
- Background glow/gradient decorativo
- Optional: Social proof logos abaixo

#### Regras de Uso
- **DO:** H1 max 12 palavras
- **DO:** Subtitle max 2 linhas
- **DO:** 1 CTA primário claro
- **DON'T:** Mais de 2 CTAs no hero

#### Exemplo Headlines + Subheadlines
```
H1: "Cresça mais rápido com conteúdo que converte"
Sub: "Planeje, crie e publique conteúdo estratégico que realmente gera resultados para sua startup."

H1: "Automação inteligente para *seu time*"
Sub: "Reduza tarefas manuais e foque no que importa. Integração completa em minutos."
```

---

### FEATURE LIST (Grid)

#### Anatomia
- Grid 3 colunas (desktop), 1 col (mobile)
- Cada feature card:
  - Ícone (destaque, primary color ou gradient)
  - Título (H4)
  - Descrição (Body S, muted)

#### Regras de Uso
- **DO:** 3, 6 ou 9 features (múltiplos de 3)
- **DO:** Descrições com 15-25 palavras max
- **DON'T:** Ícones genéricos (evitar clip-art)

---

### TESTIMONIALS / SOCIAL PROOF

#### Anatomia
- Container (card ou carousel)
- Quote text (Body L, italic opcional)
- Author (nome + cargo + empresa)
- Avatar (opcional)
- Rating (estrelas, opcional)

#### Regras de Uso
- **DO:** Quote 1-3 linhas max
- **DO:** Nome completo + cargo real
- **DON'T:** Testimonials falsos/genéricos

#### Exemplo
```
"Reduzimos o tempo de produção de conteúdo em 60%. A plataforma é intuitiva e os resultados aparecem rápido."
— Maria Silva, Head of Marketing @ TechCorp
```

---

### PRICING

#### Anatomia (2 tiers)
- Grid 2 colunas (desktop)
- Card 1 (Starter):
  - Nome do plano
  - Preço (destaque, H2)
  - Lista de features (check icons)
  - CTA secondary
- Card 2 (Pro) — HIGHLIGHTED:
  - Badge "Popular" ou "Recomendado"
  - Border primary
  - Shadow maior
  - CTA primary

#### Regras de Uso
- **DO:** Destacar 1 plano como recomendado
- **DO:** Features em bullets simples
- **DON'T:** Mais de 3 planos (confunde)

---

### FAQ (Accordion)

#### Anatomia
- Lista de items
- Cada item:
  - Pergunta (button, flex justify-between)
  - Ícone expand (+/−)
  - Resposta (collapse/expand, padding)

#### Regras de Uso
- **DO:** Perguntas em forma de questão direta
- **DO:** 5-10 FAQs max
- **DON'T:** Respostas longas (max 3 linhas)

#### Exemplo
```
P: "Quanto tempo leva para configurar?"
R: "A configuração inicial leva cerca de 5 minutos. Você pode começar a usar imediatamente após o cadastro."
```

---

### FINAL CTA BLOCK

#### Anatomia
- Container (bg colored ou gradient, padding grande)
- H2 (branco ou contraste alto)
- Subtitle (opcional)
- CTA button (high contrast)

#### Regras de Uso
- **DO:** CTA direto ("Comece Agora", não "Saiba Mais")
- **DO:** Contraste máximo (dark bg + white text)
- **DON'T:** Pedir muita informação (só email ou 1 botão)

#### Exemplo
```
H2: "Pronto para transformar seu crescimento?"
CTA: "Começar Gratuitamente"
```

---

### FOOTER

#### Anatomia
- Grid 4 colunas (desktop): Logo/About • Links • Recursos • Social
- Bottom bar: Copyright • Legal links

#### Regras de Uso
- **DO:** Links organizados por categoria
- **DO:** Social icons visíveis
- **DON'T:** Footer muito denso (max 20 links)

---

## ETAPA 5 — MOTION (Microinterações)

### Durações
```json
{
  "duration-fast": "150ms",    // Hover states, tooltips
  "duration-medium": "300ms",  // Transitions, fades
  "duration-slow": "600ms"     // Entrance animations, modals
}
```

### Easing Tokens
```css
ease-smooth: cubic-bezier(0.16, 1, 0.3, 1)     /* Inspirado Social Grow */
ease-out: cubic-bezier(0, 0, 0.2, 1)           /* Tailwind default */
ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)      /* Balanced */
ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1) /* Elastic bounce */
```

### Padrões de Hover

**Lift (elevação):**
```css
.card-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.12);
  transition: all 300ms ease-smooth;
}
```

**Glow (brilho):**
```css
.card-glow:hover {
  box-shadow: 0 0 40px rgba(249, 115, 22, 0.3);
  border-color: rgba(249, 115, 22, 0.5);
  transition: all 300ms ease-smooth;
}
```

**Underline (links):**
```css
.link-underline {
  position: relative;
}
.link-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: currentColor;
  transition: width 300ms ease-out;
}
.link-underline:hover::after {
  width: 100%;
}
```

### Reveal on Scroll (Opcional)

**Princípio:** Suave, sem exagero. Fade + translateY pequeno.

```css
.scroll-reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 600ms ease-smooth, transform 600ms ease-smooth;
}

.scroll-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Regras:**
- Usar apenas em elementos principais (hero, sections)
- Delay máximo 100-200ms entre elementos
- NUNCA aplicar em todo o conteúdo (performance + acessibilidade)

---

## ETAPA 6 — LANDING BLUEPRINT (Montagem de Página)

### Ordem de Seções

1. **Hero**
2. **Social Proof / Logos**
3. **Problema** (opcional, pode ser integrado no hero)
4. **Solução**
5. **Como Funciona** (3 passos)
6. **Features** (grid 3x3 ou 3x2)
7. **Depoimentos** (2-3)
8. **Pricing** (2 tiers)
9. **FAQ** (6-8 perguntas)
10. **CTA Final**
11. **Footer**

---

### 1) HERO
**Objetivo:** Capturar atenção, comunicar valor em 3 segundos.

**Componentes:** Badge + H1 + Subtitle + CTA Primary + CTA Secondary

**Layout:** Centered, background com gradient glow decorativo.

**Headlines:**
- H1: "Transforme dados em crescimento real"
- Sub: "Plataforma completa para startups que querem escalar com inteligência e velocidade."

---

### 2) SOCIAL PROOF
**Objetivo:** Credibilidade imediata.

**Componentes:** Logos de clientes/parceiros (grayscale, hover color)

**Layout:** Flex row, centralizado, gap-8.

**Nota:** "Empresas que confiam em nós" ou "Apoiado por"

---

### 3) SOLUÇÃO
**Objetivo:** Explicar o que é o produto.

**Componentes:** H2 + Paragraph + Visual (screenshot ou illustration)

**Layout:** Split 50/50 ou centered.

**Headlines:**
- H2: "Uma plataforma, infinitas possibilidades"
- P: "Integre todas as ferramentas que você já usa e automatize processos em minutos."

---

### 4) COMO FUNCIONA
**Objetivo:** Reduzir fricção, mostrar simplicidade.

**Componentes:** 3 cards com ícone + título + descrição

**Layout:** Grid 3 cols

**Headlines:**
1. "Conecte suas ferramentas"
2. "Configure automações"
3. "Acompanhe resultados"

---

### 5) FEATURES
**Objetivo:** Destacar diferenciais.

**Componentes:** Feature cards (ícone + título + descrição)

**Layout:** Grid 3 cols, 2 rows (6 features) ou 3x3 (9 features)

**Nota:** Focar em benefícios, não só funcionalidades.

---

### 6) DEPOIMENTOS
**Objetivo:** Prova social, reduzir objeções.

**Componentes:** Quote + Author + Cargo + Empresa

**Layout:** Grid 2-3 cols ou carousel

**Nota:** Usar quotes reais, específicos, com resultados.

---

### 7) PRICING
**Objetivo:** Conversão clara.

**Componentes:** 2 cards (Starter + Pro)

**Layout:** Grid 2 cols, Pro highlighted

**Nota:** Botão "Popular" no plano recomendado.

---

### 8) FAQ
**Objetivo:** Responder objeções finais.

**Componentes:** Accordion (6-8 perguntas)

**Layout:** Single column, max-width 800px

**Nota:** Perguntas sobre preço, setup, suporte, cancelamento.

---

### 9) CTA FINAL
**Objetivo:** Última chance de conversão.

**Componentes:** H2 + CTA Button

**Layout:** Centered, bg gradient ou dark, padding grande

**Headlines:**
- H2: "Pronto para crescer?"
- CTA: "Começar Grátis"

---

### 10) FOOTER
**Objetivo:** Links úteis, legal, social.

**Componentes:** Logo + Links (colunas) + Social + Copyright

**Layout:** Grid 4 cols desktop, stack mobile

---

## CHECKLIST ANTI-CLONE (7 Diferenças vs Social Grow)

1. ✅ **Nova paleta neutral:** Stone (#FAFAF9) ao invés de bege (#E3DDD7)
2. ✅ **Novo gradiente:** Orange-Violet ao invés de Orange-Purple
3. ✅ **Nova tipografia:** Space Grotesk + Instrument Serif ao invés de Geist + Playfair
4. ✅ **Novo raio dominante:** 16px (rounded-xl) ao invés de 32px (rounded-[2rem])
5. ✅ **Nova densidade de spacing:** Mais respirável, gaps maiores entre seções
6. ✅ **Novo estilo de card:** Borders mais visíveis, menos translucidez extrema
7. ✅ **Nova linguagem de motion:** Lift + glow ao invés de sonar ring + slideUpBlur

---

**PRÓXIMO PASSO:** Gerar arquivo HTML completo com todos os tokens, componentes e seções implementados.
