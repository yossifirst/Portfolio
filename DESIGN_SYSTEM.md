# Design system: danfirstenberg.com

**Principle:** black and white everywhere, so photos and screenshots are the only colour. Plain words, real numbers, no em dashes.

## Colour

| Token | Hex | Use |
|---|---|---|
| ink | `#0B0B0B` | text on light, dark section background |
| paper | `#F7F7F4` | light background, text on dark |
| white | `#FFFFFF` | light cards |
| mute | `#5E5E5A` | secondary text on light (6.3:1) |
| line | `#E4E4DF` | dividers on light |
| well | `#E9E9E4` | image placeholders, chips |
| ink-text | `#F2F2EE` | primary text on dark |
| ink-mute | `#8F8F8A` | secondary text on dark (6.2:1) |
| ink-soft | `#B4B4AF` | body text on dark |
| ink-line | `#262626` | dividers on dark |
| ink-tile / ink-tile-line | `#161616` / `#242424` | cards on dark |
| warm | `#1C1815` | stage behind phone screenshots |

Sections alternate light and dark. There are no accent colours.

## Type

- **Geist** (variable) for everything. **Geist Mono** for labels, dates and numbers.
- **Display:** weight 500, letter-spacing −0.06em, line-height 0.9, size `clamp(56px, 11.6vw, 168px)`.
- **H2:** weight 500, −0.045em, line-height 1, size `clamp(44px, 5vw, 72px)`.
- **Lede:** `clamp(18px, 1.55vw, 22px)`, line-height 1.45, −0.012em.
- **Body:** 15–16px, line-height 1.5.
- **Labels:** mono 11–12px, uppercase, +0.06em, mute colour.
- **Numbers:** tabular figures.

## Layout and shape

- **Grid:** max width 1440px, side gutter `clamp(16px, 4.45vw, 64px)`, section padding `clamp(80px, 11vw, 160px)`.
- **Corner radii:** 20px for media, 24px for cards, 32px for large tiles, 999px (fully rounded) for buttons.
- **Buttons:** pills at least 48px tall with 24px side padding.
  - Primary: solid ink.
  - Secondary: 1px ink outline.
  - Links: underlined with a 4px offset and a ↗.
- **Image tags:** dark pill at 78% opacity with a background blur, mono uppercase text, 14px from the bottom-left corner.
- **Section header:** mono label row, chapter number on the left and context on the right, written like `04 · Selected work`.
- **Breakpoints:**
  - 1100px: two-column layouts stack.
  - 900px: the nav becomes a Menu button and horizontal rows switch to native swipe.
  - 600px: grids drop to one or two columns.

## Motion

| Curve | Value | Use |
|---|---|---|
| out | `cubic-bezier(.23,1,.32,1)` | fades, hovers |
| expo | `cubic-bezier(.16,1,.3,1)` | headline rises, image settle |
| in-out | `cubic-bezier(.77,0,.175,1)` | image wipes, curtain |
| drawer | `cubic-bezier(.32,.72,0,1)` | menu, morphs |

- **Headline rise:** each line slides up from 110% through its own mask over 1s on the expo curve, staggered 70ms per line.
- **Fade:** opacity 0 → 1 while rising 18px, 0.9s on the out curve.
- **Image clip (the signature move):**
  - The mask opens from `inset(15% round 32px)` to `inset(0)` over 1.2s on the in-out curve.
  - At the same time the image settles from 1.15× scale to 1× over 1.6s on the expo curve.
- **Counters:** count up over about 2s with an exponential ease-out.
- **Small interactions:** press scales to 0.97; hover lasts 200–300ms; image hover zooms to 1.04 (fine pointers only).
- **Loader:** counts to 100 while fonts and the hero photo load (at least 1.1s), then the curtain lifts.
- **Smooth scroll:** Lenis with lerp 0.1. Pinned chapters run on GSAP ScrollTrigger.
- **Marquee:** 60 seconds per loop.
- **Reduced motion:** every transform turns off and everything is shown in its final state.

## Voice

Short, first-person sentences. Every number has a source and a date. No adjectives like "passionate", and no em dashes.

## Source

Full tokens and CSS classes are in `src/styles.css`. The reusable components (mask lines, fade, clip image, counter) are in `src/components/primitives.tsx`.
