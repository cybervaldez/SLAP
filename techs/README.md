# DiceBear

Open-source avatar library with 31+ styles from various artists. Generates deterministic SVG/PNG avatars from any seed string (name, email, ID) — same seed always produces the same avatar. Available via HTTP API (zero install), JS library (`@dicebear/core`), CLI, and Figma plugin.

## Domain Classification

| Domain | Applies |
|--------|---------|
| State Management | No |
| UI Components | Yes |
| Data Fetching | No |
| Form Handling | No |
| Animation | No |
| Routing | No |
| Testing Tools | No |
| Build Tools | No |
| Styling | No |
| Auth | No |

## Pipeline Impact

Based on domain classification, these skills may need tech-specific references:

| Skill | Impact | Reason |
|-------|--------|--------|
| create-task | High | Integrating avatar URLs/components into persona cards, preview HTMLs, ecommerce archetype |
| ui-planner | Medium | Avatar style selection must match each preview's visual aesthetic |
| ux-planner | Medium | Avatar consistency affects perceived personality of cast members |
| ux-review | Low | Verify avatars render and load correctly |
| e2e | Low | Avatar images need to load/render in test screenshots |
| coding-guard | None | No complex state or anti-patterns to flag |
| e2e-guard | None | Standard image loading — no special test patterns |

## User's Use Case

Two use cases in SLAP:
1. **Persona avatars** — profile images for the expert panel, crowd personas, and crew insiders in cast/critics sections
2. **Ecommerce product images** — DiceBear can be used on a whim as creative product thumbnails (abstract styles like Glass, Shapes, Rings, Icons) for the ecommerce archetype when stock photos aren't needed

## Integration Strategy

| Phase | Approach | Reason |
|-------|----------|--------|
| **Preview HTMLs (now)** | HTTP API | Speed, zero setup, throwaway files |
| **React app (later)** | Local install OR pre-generated SVGs | Reliability, no CDN dependency |

Pre-generated static SVGs (generate once, commit 10 files) is the simplest long-term approach for the fixed persona roster.

## Core Concepts

- **Seed-based determinism:** Any string as seed → identical avatar every time. Use persona names as seeds for consistency.
- **31+ styles:** Character styles (Adventurer, Lorelei, Notionists, Open Peeps, Personas, Pixel Art) and abstract styles (Glass, Shapes, Rings, Identicon, Icons).
- **Multiple formats:** SVG (scalable, recommended), PNG/JPG/WebP/AVIF (max 256x256).
- **Style-per-aesthetic:** Match DiceBear style to preview mood (e.g., `pixel-art` for retro, `lorelei` for editorial, `notionists` for chalkboard).

## Common Patterns

### HTTP API (zero install)
```html
<img src="https://api.dicebear.com/9.x/lorelei/svg?seed=Marketing" alt="Marketing Expert" />
```

### JS Library
```js
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';

const avatar = createAvatar(lorelei, { seed: 'Marketing' });
const svg = avatar.toString(); // SVG string
const dataUri = avatar.toDataUri(); // for img src
```

### Style options (per-style customization)
```
?hair=short01,short02&backgroundColor=b6e3f4,c0aede
```

### Recommended style mapping for SLAP previews

| Preview | DiceBear Style | Rationale |
|---------|---------------|-----------|
| F (Editorial) | `lorelei` | Detailed illustrated faces match magazine aesthetic |
| G (Wall) | `shapes` or `identicon` | Abstract/geometric matches brutalist vibe |
| H (White Cube) | `initials` or `rings` | Minimal, gallery-appropriate |
| I (Toggle) | `avataaars` (slop) / `adventurer` (styled) | Generic vs distinctive for the toggle contrast |
| J (Chalkboard) | `notionists` | Playful hand-drawn feel matches chalk aesthetic |

## Anti-Patterns & Gotchas

- **Don't hardcode API version** — use `9.x` not `9.2.4` in URLs (minor versions auto-resolve)
- **Don't use raster formats for scalable UI** — SVG is lighter and scales; PNG caps at 256x256
- **Don't rely on HTTP API for production** — rate limited (50/s SVG, 10/s raster) and commercial use requires self-hosting
- **Mixed licenses** — CC BY 4.0 styles (Adventurer, Big Ears, Micah, etc.) require attribution; CC0/MIT styles (Lorelei, Identicon, Pixel Art, etc.) are fully free

## Testing Considerations

- **E2E screenshots:** DiceBear HTTP API images may not load in offline/CI environments. Mock or use pre-generated SVGs for test stability.
- **Seed consistency:** Verify same seed produces same avatar across test runs (deterministic by design).
- **Loading states:** Avatar images load asynchronously — E2E tests may need `waitForSelector` on `img[src*="dicebear"]`.

## Resources

- Official docs: https://www.dicebear.com/
- Styles gallery: https://www.dicebear.com/styles/
- HTTP API: https://www.dicebear.com/how-to-use/http-api/
- JS Library: https://www.dicebear.com/how-to-use/js-library/
- GitHub: https://github.com/dicebear/dicebear
- npm: https://www.npmjs.com/package/@dicebear/core
