# SECTION 2 -- UI/UX DESIGN SPECIFICATION

## 2.1 Brand Personality

VibeDeploy should feel like a product built by a credible infrastructure expert
-- not a freelance portfolio and not a generic SaaS template. The brand sits at
the intersection of technical authority and approachable clarity. Keywords:
trustworthy, technical, clean, premium, confident, direct.

## 2.2 Colour Palette

| Role       | Hex       | Name            | Usage                             |
| ---------- | --------- | --------------- | --------------------------------- |
| Primary    | `#7C3AED` | Electric Purple | CTAs, score highlights, headings  |
| Secondary  | `#2563EB` | Deep Blue       | Links, accents, cards             |
| Accent     | `#06B6D4` | Cyan            | Terminal elements, badges, scores |
| Background | `#0F0F1A` | Void Black      | Page background                   |
| Surface    | `#1E1B4B` | Deep Slate      | Cards, panels, nav                |
| Success    | `#10B981` | Emerald         | Pass badges, low risk             |
| Warning    | `#F59E0B` | Amber           | Medium risk badges                |
| Danger     | `#EF4444` | Red             | High risk, critical failures      |

## 2.3 Typography System

| Token        | Font           | Size            | Weight | Usage                         |
| ------------ | -------------- | --------------- | ------ | ----------------------------- |
| `display-xl` | Inter          | 60px / 3.75rem  | 800    | Hero headline                 |
| `display-lg` | Inter          | 48px / 3rem     | 700    | Section headlines             |
| `heading-xl` | Inter          | 36px / 2.25rem  | 700    | Page titles                   |
| `heading-lg` | Inter          | 28px / 1.75rem  | 600    | Card titles                   |
| `heading-md` | Inter          | 22px / 1.375rem | 600    | Subsection titles             |
| `body-lg`    | Inter          | 18px / 1.125rem | 400    | Lead copy                     |
| `body-md`    | Inter          | 16px / 1rem     | 400    | Body text                     |
| `body-sm`    | Inter          | 14px / 0.875rem | 400    | Captions, metadata            |
| `mono`       | JetBrains Mono | 14px / 0.875rem | 400    | Code, terminal elements       |
| `label`      | Inter          | 12px / 0.75rem  | 600    | Badges, form labels, all-caps |

## 2.4 Spacing System

VibeDeploy uses an 8px base grid. All spacing values are multiples of 8:

- 4px -- micro (icon gaps, badge padding)

- 8px -- xs (tight element spacing)

- 16px -- sm (card internal padding)

- 24px -- md (between related elements)

- 32px -- lg (between sections within a card)

- 48px -- xl (between major page sections)

- 64px -- 2xl (hero padding, large section gaps)

- 96px -- 3xl (full-section vertical padding)

## 2.5 Layout Grid

- Container max-width: 1200px

- Gutters: 24px desktop, 16px tablet, 12px mobile

- Columns: 12-column grid desktop, 4-column tablet, 1-column mobile

- Breakpoints: sm 640px, md 768px, lg 1024px, xl 1280px

## 2.6 Navigation Structure

Sticky dark glass navbar with blur effect. Items: Logo (left) | Home · Checker ·
Services · Case Studies · About (centre-right) | "Check My App" CTA button
(right, purple gradient). Mobile: hamburger menu with full-screen overlay.
Active state: underline in cyan.

## 2.7 Page-by-Page UX Breakdown

### Homepage

- Hero: Full-width dark panel. Headline gradient text. Sub-headline in grey. Two
  CTAs: primary "Check My App" + secondary "See Services". Background: animated
  mesh gradient or subtle particle grid.

- Problem Section: 3-column card grid showing real AI app failure modes with red
  risk icons.

- How It Works: 3-step horizontal process flow with numbered icons and connector
  lines.

- Score Preview: Blurred/demo report card showing a sample score to create
  curiosity.

- Services: 4-card pricing grid with feature lists and CTA buttons.

- Founder Proof: Photo card linking to victornwoke.com with credentials and
  GitHub stats.

- Footer: Dark with links, social icons, and subdomain/domain cross-links.

### Checker Page

- Progress bar showing completion across 13 categories.

- One category per screen with question cards -- yes/no toggles and multi-select
  chips.

- Back/Next navigation with keyboard support.

- Email capture field on final step before results (optional but prompted).

- Mobile: full-screen vertical flow, large touch targets.

### Report Results Page

- Large animated score gauge (0--100) in purple/cyan gradient.

- Overall risk rating badge: Critical / High / Medium / Low.

- Per-category accordion cards with score, badge, and recommendation text.

- Sticky "Book Your Fix" CTA panel on the right side (desktop) or fixed bottom
  bar (mobile).

- Share button to copy URL with encoded answers.

### Services Page

- 4-column pricing card grid with feature lists, price, and CTA.

- Comparison table for all four tiers.

- FAQ accordion section.

- Calendly embed or button.

## 2.8 Component Library

| Component     | Variants                          | Notes                                      |
| ------------- | --------------------------------- | ------------------------------------------ |
| Button        | Primary, secondary, ghost, danger | All have focus rings for accessibility     |
| Card          | Default, glass, highlight, risk   | Glass uses backdrop-filter blur            |
| Badge         | Critical, high, medium, low, pass | Coloured dot plus label                    |
| ScoreGauge    | Animated, static                  | SVG arc with gradient fill                 |
| ChecklistItem | Pass, fail, warning               | Icon plus text with expand/collapse        |
| ProgressBar   | Linear                            | Purple fill with percentage label          |
| FormInput     | Text, email, select, toggle       | Dark background, cyan focus ring           |
| Accordion     | Default                           | Smooth height animation                    |
| TerminalCard  | Code block                        | JetBrains Mono, dark surface, green cursor |

## 2.9 Risk Badge System

| Badge            | Score Range | Colour          | Icon | Meaning                                            |
| ---------------- | ----------- | --------------- | ---- | -------------------------------------------------- |
| CRITICAL         | 0--30       | Red `#EF4444`   | ✕    | Immediate action required before launch            |
| HIGH RISK        | 31--50      | Amber `#F59E0B` | ⚠   | Significant gaps that will cause production issues |
| MEDIUM RISK      | 51--70      | Blue `#2563EB`  | ⚑    | Improvements needed; launch with caution           |
| LOW RISK         | 71--85      | Cyan `#06B6D4`  | ↑    | Minor gaps; launch viable with monitoring          |
| PRODUCTION READY | 86--100     | Green `#10B981` | ✓    | Strong production posture                          |

## 2.10 Accessibility Rules

- All interactive elements have visible focus rings (2px cyan outline)

- Colour is never the only indicator of meaning -- always paired with text or
  icon

- Minimum contrast ratio 4.5:1 for body text, 3:1 for large text

- All images have meaningful alt text

- Form inputs have associated label elements

- Keyboard navigation works for all interactive flows

- Screen reader announcements for score reveal and badge changes

## 2.11 Animation Guidance

- Framer Motion for mount/unmount transitions: 200--300ms ease-out

- Score gauge: animated count-up from 0 to final score over 1.5s

- Card hover: subtle scale(1.02) and box-shadow increase, 150ms

- Page transitions: fade-in + slight upward slide, 250ms

- No looping animations unless user-triggered -- respect prefers-reduced-motion

## 2.12 Developer Handoff Notes

- All colours as CSS custom properties on :root (e.g., \--color-purple,
  \--color-bg)

- Use Tailwind CSS with a custom theme extending default palette

- Tailwind dark mode set to class strategy ("dark" class on html element)

- shadcn/ui components installed and customised with VibeDeploy tokens

- Framer Motion installed: npm install framer-motion

- Google Fonts: Inter + JetBrains Mono via next/font or \@import
