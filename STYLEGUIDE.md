# SLAP! — Styleguide

Visual identity, design tokens, motion system, and component patterns.

---

## Color System

### Score Colors (Traffic Light)

| Token | Hex | Usage |
|-------|-----|-------|
| `--score-green` | `#6BCB77` | Score >= 7, passing findings |
| `--score-yellow` | `#FFD93D` | Score 5-6, warnings |
| `--score-red` | `#FF6B6B` | Score < 5, critical findings |

### Surface Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--surface-dark` | `#1A1A2E` | Review panel, deep background |
| `--surface-mid` | `#222240` | Popover, bubble backgrounds |
| `--surface-light` | `#FAFAFA` | Design content background |
| `--surface-white` | `#FFFFFF` | CRT bezel, light surfaces |

### Text Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--text-light` | `#F5F0E1` | Primary text on dark surfaces |
| `--text-muted` | `rgba(245, 240, 225, 0.5)` | Secondary text, labels |
| `--text-dark` | `#1A1A2E` | Text on light surfaces |

### Accent Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--accent-gold` | `#FFD000` | Default accent, mode toggle active |
| `--accent-gold-dim` | `#FFD700` | Gold variant for borders |

### Reviewer Colors (Unique Per Reviewer)

**Experts:**

| Expert | Color | DiceBear Style |
|--------|-------|----------------|
| Marketing | `#FF6B6B` | shapes |
| UX | `#4ECDC4` | shapes |
| Product | `#FFD93D` | shapes |
| Technical | `#95E1D3` | shapes |
| Design | `#F38181` | shapes |

**Personas:**

| Persona | Color | DiceBear Style |
|---------|-------|----------------|
| Marcus | `#4ECDC4` | adventurer |
| Elena | `#7B68EE` | adventurer |
| Priya | `#DDA0DD` | adventurer |
| Dorothy | `#6BCB77` | adventurer |
| Kevin | `#FF8C00` | adventurer |
| Raj | `#20B2AA` | adventurer |
| Carlos | `#DAA520` | adventurer |
| Jasmine | `#87CEEB` | adventurer |
| Tommy | `#FF69B4` | adventurer |
| Frank | `#FF6B6B` | adventurer |
| Diana | `#BA55D3` | adventurer |
| Sarah | `#CD853F` | adventurer |
| Sam | `#9B59B6` | adventurer |
| Maya | `#F0E68C` | adventurer |
| Mike | `#708090` | adventurer |
| Yuki | `#FFB7C5` | adventurer |
| Dex | `#32CD32` | adventurer |
| Nora | `#C4A35A` | adventurer |

### DiceBear Avatar URLs

```
Experts: https://api.dicebear.com/9.x/shapes/svg?seed={id}-expert&backgroundColor={colorHex}
Personas: https://api.dicebear.com/9.x/adventurer/svg?seed={id}&backgroundColor={colorHex}
```

---

## Typography

### Overlay UI (Analysis Layer)

```css
font-family: 'Courier New', monospace;
```

Used for: Review panel, popover, bubble rail, section annotations, mode toggle, severity chips.

| Element | Size | Weight | Letter-Spacing |
|---------|------|--------|----------------|
| Panel heading | 0.85rem | 700 | 0.06em |
| Popover name | 0.7rem | 700 | 0.06em |
| Popover role | 0.55rem | 400 | 0.04em |
| Score large | 1.2rem | 800 | — |
| Score small (/10) | 0.55rem | 700 | — |
| Chip text | 0.5rem | 700 | 0.06em |
| Chip tooltip | 0.45rem | 600 | 0.02em |
| Mode toggle | 0.45rem | 700 | 0.06em |
| View full button | 0.55rem | 700 | 0.06em |
| Section annotation | 0.55rem | 700 | 0.04em |

### Design Content (Varies Per Project)

Each project/version defines its own typography. The overlay system never interferes with content fonts.

### Gallery / Homepage

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

Per-lens column typography (homepage):

| Lens | Heading Font | Body Font |
|------|-------------|-----------|
| Editorial | Playfair Display | Inter |
| Brutalist | system-ui | system-ui |
| Minimal | Inter | Inter |
| Chalkboard | Patrick Hand | Nunito |
| Neutral | system-ui | system-ui |

---

## Motion System

### Timing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-micro` | 100ms | Chip hover, popover exit |
| `--duration-small` | 150ms | Button hover, toggle |
| `--duration-medium` | 250ms | Popover enter, section enter |
| `--duration-large` | 400ms | Panel slide, bubble enter |
| `--duration-page` | 600-800ms | Wipe transition, homepage expand |
| `--stagger-delay` | 60ms | Per-item stagger in lists |

### Easing Functions

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-enter` | `cubic-bezier(0.22, 0.61, 0.36, 1)` | Panel slide in, section appear |
| `--ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Popover enter, bubble enter |
| `--ease-smooth` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Homepage column expand |
| `--ease-exit` | `linear` or fast ease | Quick dismissals |

### Keyframe Animations

**Bubble Enter:**
```css
@keyframes bubbleEnter {
  from { opacity: 0; transform: translateX(20px) scale(0.5); }
  to   { opacity: 1; transform: translateX(0) scale(1); }
}
/* Duration: 400ms, Easing: cubic-bezier(0.22, 0.61, 0.36, 1) */
/* Stagger: index * 60ms delay */
```

**Panel Section Enter:**
```css
@keyframes panelSectionEnter {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
/* Duration: 250ms, Easing: cubic-bezier(0.22, 0.61, 0.36, 1) */
/* Stagger: (index + 1) * 60ms delay */
```

**Wipe Transition:**
```css
@keyframes wipeReveal {
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0 0 0 0); }
}
@keyframes wipeRevealLeft {
  from { clip-path: inset(0 0 0 100%); }
  to   { clip-path: inset(0 0 0 0); }
}
/* Duration: 800ms, Auto-wipe delay: 1000ms */
```

**Off-screen Section Pulse:**
```css
@keyframes pulse-glow {
  0%, 100% { opacity: 0.7; transform: translateX(-50%) scale(1); }
  50%      { opacity: 1;   transform: translateX(-50%) scale(1.05); }
}
/* Duration: 1.5s infinite */
```

### Popover Exit Pattern

```javascript
// Add .exiting class for 100ms, then remove .visible
element.classList.add('exiting');
setTimeout(() => {
  element.classList.remove('visible', 'exiting');
}, 100);
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0ms !important;
    transition-duration: 0ms !important;
  }
}
```

---

## Component Patterns

### CRT Bezel (DockBar)

```css
/* Chin — bottom bezel */
position: fixed;
bottom: 0;
height: 56px;
background: #FFFFFF;          /* or #1A1A2E for dark */
border: 8px solid #FFFFFF;    /* or #1A1A2E */
border-radius: 0 0 10px 10px;
box-shadow: inset 0 3px 8px rgba(0, 0, 0, 0.06);
transition: 800ms ease-in-out; /* Theme transition */
z-index: 900;
```

### Bubble Rail

```css
position: fixed;
right: 12px;
top: 50%;
transform: translateY(-50%);
z-index: 800;
display: flex;
flex-direction: column;
align-items: center;
gap: 6px;
```

**Bubble (single reviewer):**
```css
width: 40px;
height: 40px;
border-radius: 50%;
border: 2px solid transparent;
cursor: pointer;
transition: transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1),
            border-color 150ms,
            box-shadow 150ms;
```

**Active state:**
```css
border-color: {reviewer.color};
box-shadow: 0 0 12px {reviewer.color}4D;
transform: scale(1.15);
```

**Hover state:**
```css
transform: scale(1.08);
border-color: {reviewer.color};
box-shadow: 0 0 8px {reviewer.color}33;
```

### Aggregate Summary

```css
text-align: center;
padding: 6px 4px;
border: 1px solid rgba(245, 240, 225, 0.12);
border-radius: 4px;
background: rgba(34, 34, 64, 0.8);
min-width: 52px;
/* Hides when a reviewer is selected */
```

### Mode Toggle

```css
display: flex;
background: #222240;
border-radius: 9999px;
border: 1px solid rgba(245, 240, 225, 0.12);
overflow: hidden;
```

**Active button:**
```css
background: #FFD000;
color: #1A1A2E;
```

### Popover

```css
position: fixed;
z-index: 960;
width: 280px;
background: #222240;
border: 1px solid rgba(245, 240, 225, 0.12);
border-left: 3px solid {reviewer.color};
border-radius: 6px;
padding: 14px;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
transition: opacity 250ms cubic-bezier(0.22, 0.61, 0.36, 1),
            transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Review Panel

```css
position: fixed;
right: 0;
top: 0;
bottom: 0;
width: 380px;
max-width: 85vw;
background: #1A1A2E;
border-left: 3px solid #FFD000;
z-index: 1000;
transition: transform 400ms cubic-bezier(0.22, 0.61, 0.36, 1);
transform: translateX(0);    /* open */
transform: translateX(100%); /* closed */
overflow-y: auto;
```

### Section Highlight

```css
position: fixed;
border-radius: 4px;
box-shadow: 0 0 0 3px {color},
            0 0 16px 0 {colorRgba},
            0 0 0 9999px rgba(0,0,0,0.6);
transition: top 0.15s ease, height 0.15s ease, box-shadow 0.2s ease;
z-index: 940;
```

**Annotation badge:**
```css
position: fixed;
font: 700 0.55rem/1.3 'Courier New', monospace;
background: rgba(26, 26, 46, 0.95);
border: 1.5px solid {highlightColor};
border-radius: 4px;
padding: 4px 10px;
max-width: 320px;
z-index: 941;
```

### Severity Chips

```css
font-size: 0.5rem;
font-weight: 700;
padding: 2px 8px;
border-radius: 3px;
text-transform: uppercase;
letter-spacing: 0.06em;
cursor: pointer;
transition: transform 150ms, box-shadow 150ms;
```

**Per severity:**

| Severity | Background | Text Color |
|----------|------------|------------|
| Green | `rgba(107,203,119,0.15)` | `#6BCB77` |
| Yellow | `rgba(255,217,61,0.15)` | `#FFD93D` |
| Red | `rgba(255,107,107,0.15)` | `#FF6B6B` |

### Backdrop

```css
position: fixed;
inset: 0;
z-index: 790;
background: rgba(0, 0, 0, 0.4);
transition: opacity 200ms ease;
```

---

## Spacing Scale

| Token | Value |
|-------|-------|
| `--space-1` | 4px |
| `--space-2` | 6px |
| `--space-3` | 8px |
| `--space-4` | 10px |
| `--space-5` | 12px |
| `--space-6` | 14px |
| `--space-8` | 20px |
| `--space-10` | 28px |
| `--space-12` | 40px |

---

## Homepage Visual System

### Lens Columns

Five full-height columns representing design philosophies:

| Lens | Background | Text | Accent | Hover BG |
|------|-----------|------|--------|----------|
| Editorial | `#F5F0E1` | `#2C1810` | `#C4956A` | `#EDE5D0` |
| Brutalist | `#1A1A2E` | `#F5F0E1` | `#FF3333` | `#252542` |
| Minimal | `#FAFAF8` | `#333333` | `#333333` | `#F0F0EE` |
| Chalkboard | `#2D4A3E` | `#E8DCC8` | `#F4D35E` | `#345648` |
| Neutral | `#F0EDE8` | `#1A1A2E` | `#6B7280` | `#E5E2DD` |

### Column Expand Animation

```css
transition: flex-basis 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
/* Resting: 20% each */
/* Hover: hovered=40%, others shrink */
/* Click: selected=100%, others=0% */
```

### Archetype Card

```css
/* Hover effect */
transform: perspective(600px) rotateX(-8deg) translateY(-6px);
transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.35s ease;
```
