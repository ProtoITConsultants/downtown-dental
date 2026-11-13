---
name: downtown-dental-design
description: Design system and build rules for the Downtown Dental website (downtowndentist.ca). Use whenever creating or editing any page, section or component of this site, and when moving the static HTML into WordPress with Elementor Pro and ACF Pro. Covers colours, type, curves (radii), spacing, motion, the component catalogue, page recipes, SEO rules and the WordPress mapping.
---

# Downtown Dental: design system and build rules

The approved home page (`index.html`) is the source of truth. Every other page is built
only from its tokens and patterns. The result must feel like one site.

## 1. Golden rules

1. **The home page is locked.** Do not change its layout, copy, spacing or styles. Part 1 of
   `assets/css/style.css` is a word-for-word copy of the signed-off design. Never edit Part 1.
   The only addition (client request, 2026-11-05) is scroll motion: parallax photo layers on
   the hero, team and CTA banners, plus `.dt-reveal` on the section titles, features and logo
   row. Before any scrolling, the page must still look exactly like the approved design.
   The open mobile menu also uses smaller text (15.5px rows, 14px links), set in Part 2. Main nav (client request): left of the logo Home and Services; right of the logo About and Contact Us. The About dropdown and mobile accordion list About Us, Meet Our Dentists, Our Team and Our Office.
2. **One stylesheet, one script.** Every page loads `assets/css/style.css`, the vendored
   `assets/js/lenis.min.js` (smooth scrolling, Lenis 1.3.27, MIT) and `assets/js/main.js`, and nothing else (plus Google Fonts). Don't add per-page CSS files,
   `<style>` blocks or inline scripts. Inline `style` is allowed only for a background image,
   `object-position`, a reveal delay (`--d`) or a one-off top margin.
3. **New styles go in Part 2** and use the `dt-` prefix, so they never collide with Part 1,
   the WordPress theme or Elementor.
4. **Use tokens, never raw values.** Colours, radii, shadows and spacing come from `:root`.
5. **Reuse before inventing.** If a section can be built from the catalogue below, build it
   that way. If it truly can't, add one new `dt-` component to Part 2 and document it here.
6. **The content is the clinic's own.** Copy comes from the live site (captured
   2026-11-04). You may tighten wording, but don't change the meaning. Add "Calgary" or
   "downtown Calgary" where it reads naturally.

## 2. Files

```
index.html                       Home (locked)
about-us.html                    About hub
meet-our-dentists.html  meet-the-team.html  our-office.html   (listings: card grid + "Read more")
dr-kristin-yont.html  dr-claire-whitney.html  dr-scott-townsend.html   (dentist profiles)
team-<firstname>.html ×11                                            (team profiles)
services.html                    Services hub (all 14 service cards)
new-patient-experience.html  emergency-dentistry.html  general-dentistry.html
cosmetic-dentistry.html  sports-dentistry.html  nightguards-bruxism.html
dental-surgery.html  dental-implants.html  sedation-dentistry.html
wisdom-teeth-removal.html  botox.html  invisalign.html  family-dentistry.html
canadian-dental-care-plan.html   contact-us.html
privacy-policy.html  terms-of-use.html  404.html (noindex)
sitemap.xml  robots.txt
assets/css/style.css   Part 1 = locked home CSS, Part 2 = dt- components
assets/js/main.js      Part 1 = header/menu (locked), Part 2 = reveal, demo form
assets/img/            photography (hero, team, cta, svc-*, dr-*)
assets/logos/          credential logos      assets/brand/  wordmark + favicon
```

File names map to WordPress URLs (`about-us.html` becomes `/about-us/`, `dr-kristin-yont.html` becomes `/dentists/dr-kristin-yont/`, `team-karen.html` becomes `/team/karen/`). `wordpress/pages.json` lists every page with its URL, type, template, title, description, H1 and old URL. Use lowercase
kebab-case, descriptive and keyword-led.

## 3. Tokens

### Colour
| Token | Value | Use |
|---|---|---|
| `--blue` | `#1079a3` | Brand primary: links, rules, numbers, buttons, icons |
| `--blue-dark` | `#0d6689` | Hover state of solid blue buttons only |
| `--blue-tint` | `#eaf3f7` | Soft surfaces, notices, placeholders, badges |
| `--ink` | `#262b2e` | Headings and strong text |
| `--muted` | `#5b6266` | Body copy |
| `--grey` | `#7d7d7d` | Small labels (roles, column titles), meta text |
| `--bg` | `#f8f8f6` | Page background (warm off-white) |
| `--white` | `#fff` | Cards and alternate sections |
| `--line` | `#dcdcd8` | Dividers, chip and input borders |
| `--card-line` | `#e6e6e2` | Card borders (same as the dropdown border) |
| Photo overlay | `rgba(4,34,50,.30 → .62)` | Navy wash on every photo banner |

There is no accent colour beyond blue. Don't introduce pink, orange or gradients other than the navy photo wash.

### Type: Open Sans 400 / 700 only
| Role | Spec |
|---|---|
| Home H1 | `clamp(34px,4.6vw,66px)` 700, `-.025em`, lh 1.15 (locked) |
| Page H1 (`.dt-phero h1`) | Identical on every inner page (client request, modelled on Our Office): one short title line `.dt-phero__title` at `clamp(34px,4.6vw,66px)` 700, then the small uppercase `.dt-phero__sub` keyword line (26 characters max). Both are inside the H1. Never let the title wrap to two lines; shorten it instead. |
| Section title (`.section-title` centred / `.dt-h2` left) | `clamp(26px,1.9vw + 11px,38px)` 700, `-.015em` |
| H3 (cards) | 19–22px / 28–30px, 700 |
| Body (`.dt-prose`) | 16px / 28px, `--muted` |
| Card text | 14.5px / 25px, `--muted` (same as home features) |
| Eyebrow (white, on photos) | 13px 700, `.27em`, uppercase |
| Kicker (`.dt-kicker`, blue, on light) | 13px 700, `.27em`, uppercase |
| Labels (`.dt-role`, `.col-title`) | 11.5–12px 700, `.15–.2em`, uppercase, `--grey` |
| Buttons | 13px 700, `.16em`, uppercase |
| Numbers | `01.` style: 13px 700 blue, `.05em` |

### Curves (radius)
| Token | Value | Use |
|---|---|---|
| `--r-pill` | `999px` | All buttons (incl. `.btn--sm` "Read more"), phone pill, chips, badges, 404 page links |
| `--r-lg` | `24px` | Cards, every image and portrait, booking card, side card, tables |
| `--r-md` | `16px` | Dropdown menu (locked), notices |
| `--r-sm` | `12px` | Form inputs |
| circle | `50%` | Icon buttons, `.dt-book__ic`, `.dt-journey__ic`, `.dt-avatars` |

Full-bleed photo banners (hero, page hero, CTA band) are **square-edged**. Everything
inside the content width is **rounded**. The client specifically asked for rounded team
photos and a rounded "Read more" view (the profile page portrait).

### Spacing and layout
- Content width `--wrap: 1180px`, with a 24px gutter (20px at 960px and below).
- Dimensions match the home page, except inner-page heroes are shorter (client request): `clamp(400px,29vw,560px)`, at least 440px on phones. Home hero `clamp(560px,40.6vw,772px)`, photo band `clamp(420px,28.8vw,547px)`, CTA `clamp(280px,17.7vw,336px)`. Section rhythm `--sec` is 68px (54px at 960px and below), and the gap under a section heading is 41px (30px). Two light sections in a row collapse the gap between them automatically.
- Alternate `--bg` and white (`.dt-section--white`) sections. Never put two white sections in a row.
- Grid gap 28px. Split gap `clamp(40px,6vw,88px)`.
- Breakpoints (same as home): 1100px, **960px** (desktop → mobile nav), 600px.
- Responsive rules: no sideways scroll from 320px to 2560px. Grid tracks use `minmax(0,1fr)`. Touch targets are at least 40px at 960px and below (add padding with an equal negative margin so layouts do not shift). Tables stack into labelled rows at 600px (`td[data-label]`). Form text is 14px on every screen, with labels at 11px and fields 54px tall (50px on phones). iOS alone gets 16px in typing fields, through `@supports (-webkit-touch-callout:none)`, so it does not zoom on focus. On phones keep pages short: the booking card swaps its contact list for Call / Email / Directions buttons (`.dt-book__quick`), and banner photos and the map shrink.

### Signature motifs
- **Blue rule:** a 72×2px (48×2px in cards) `--blue` line above a heading or card. Comes from the home features.
- **Numbering:** `01.` `02.` `03.` in blue above card titles.
- **Hairline column dividers** (`--line`) like the home features.
- **Arrow icon:** the 16px stroke arrow from the home buttons, on every CTA and text link.

### Shadow and motion
- `--shadow-card` appears on card hover only. `--shadow-pop` is for dropdowns. Nothing has a shadow at rest.
- Ease: `--ease: cubic-bezier(.2,.7,.2,1)`.
- **Scroll reveal** (the client asked for it): add `class="dt-reveal"` (or
  `dt-reveal dt-reveal--zoom` for images) and stagger with `style="--d:.08s"` in 0.08s steps.
  Never use it on the page hero or anything above the fold. Content stays visible without
  JS, and `prefers-reduced-motion` is respected.
- Hovers: card lift `translateY(-4px)`, image zoom `scale(1.03–1.04)`, arrow nudge `4px`.
- **Scroll parallax** (client reference: dentalcareseattle.com): every full-bleed photo (page hero, mid-page `.dt-band`, CTA band) is `section.dt-parallax` with the photo on
  its own layer `<span class="dt-parallax__media" style="background-image:…">`. main.js moves
  that layer at 40% of scroll speed (`SPEED = 0.6`), so the photo seems to stay put while the
  content scrolls over it, then slides away. Hero copy marked `data-parallax-fade` drifts and
  fades. Transform-only (GPU), one `requestAnimationFrame` per frame, works on iOS, off under
  reduced motion. Never put the photo as the section's own background; never use
  `background-attachment: fixed`. Home uses it too: its photo layers take their image and
  framing from Part 1 via `.hero/.team/.cta .dt-parallax__media` rules in Part 2.
  "At rest" rule: each layer is anchored so it has no offset at its starting position, which
  means a page looks identical to the static design until the user scrolls. Elements already
  on screen at load reveal right away.

### Photography
- People photos live in `assets/img/people/`, named after the person (`karen.jpg`, `dr-kristin-yont.jpg`, `chantel-jaqueline-kiersten.jpg`, `downtown-dental-team-lobby.jpg`).
- Standard web sizes, no exceptions: **portraits 800×1200** (2:3, the photographer's frame, never cropped), **group and pair shots 1600×900** (16:9), JPG quality 80, progressive.
- Portraits come from the client's "Web Size" folder; never cut a person out of a group shot. `assets/img/people/PHOTO-MAP.md` lists every file's original photo. `name.jpg` is the main portrait, `name-2.jpg` to `name-4.jpg` are alternates.
- Never show near-identical shots of one person together. A profile gets one main portrait plus at most one different photo with colleagues.
- Never publish a name you have not confirmed. Staff awaiting confirmation are in `people/unconfirmed/` and are not used on the site.
- Alt text names the people (`Karen, Treatment Coordinator at Downtown Dental`). Use "a team member" for anyone unconfirmed.

- **Smooth scroll:** Lenis smooths mouse and trackpad scrolling (`lerp` 0.09), started in main.js. Keep `syncTouch` off: in testing it stopped flicks dead (362px against 638px native). Touch devices use native scrolling, and Lenis still reports it so the effects stay in step. Scroll effects subscribe with `lenis.on('scroll', fn)`, never a separate window listener. Any inner scrolling area needs `data-lenis-prevent`. It is off under reduced motion. In WordPress, enqueue lenis.min.js before main.js in the footer, and do not add Elementor smooth-scroll settings on top.

### Illustrations
- Style: line-art in ink `#3a4347` (5.5px round stroke) with a white offset "shadow" stroke,
  on a soft brand-blue blob `#a9d4e5` plus a second blob in `--blue` at 10% opacity, and
  `--blue` accents (rays, sparkles, arrows). viewBox `0 0 200 160`.
- Built-in motion: blobs morph slowly (9–12s), sparkles twinkle. Respects reduced motion.
- Files live in `assets/img/icons/` (`cosmetic-whitening`, `-aligners`, `-veneers`, `-botox`,
  `-bite`). New icons must copy the `<style>` block and blob paths from an existing file.

## 4. Component catalogue

| Component | Markup / class | Elementor equivalent |
|---|---|---|
| Header + mobile menu | copied from home (locked) | Theme Builder › Header |
| Footer | copied from home (locked) | Theme Builder › Footer |
| Page hero | `section.dt-phero.dt-parallax`: `img.dt-parallax__media`, then `.wrap[data-parallax-fade]` with breadcrumb, H1, `.eyebrow` and a Book your visit `.btn`. Same design and scroll effect as the Brad-approved home hero. Pair and trio photos use wide versions in `assets/img/heroes/` (2000x813): the tiled wall is extended to the left so people sit right of the headline at natural size. | Container with background image + overlay, Motion Effects › Scrolling, Breadcrumbs, Heading, Button |
| Section | `section.dt-section` (`--white`, `--tight`) > `.wrap` | Container (boxed 1180) |
| Section head | `.dt-head` > `.dt-kicker` + `.section-title` + `.dt-lead` | Heading ×2 + Text |
| Split | `.dt-split` (`--reverse`, `--top`, `--wide`, `--inner`) with `.dt-split__media` / `__body` | 2-column container |
| Rounded media | `figure.dt-media.dt-media--portrait|square|land|wide` | Image widget, radius 24 |
| Placeholder | `.dt-ph` inside `.dt-media` | Image with placeholder |
| Rich text | `.dt-prose` | Text Editor / ACF WYSIWYG |
| Card | `.dt-card` (+ `.num`, `h3`, `p`) | Icon Box / container |
| Service card | `article.dt-svc` > `.dt-svc__img` + `.dt-svc__body` | Loop Item (Service) |
| Person card (dentists + team) | `article.dt-person` > `a.dt-person__photo` + h3 link + `.dt-role` + excerpt + `a.btn.btn--blue.btn--sm` "Read more" → profile page | Loop Item (Dentist / Team) |
| Profile page | `section.dt-profile` > `ol.dt-crumbs--dark` + `.dt-profile__grid` (sticky `.dt-profile__media` portrait + "Let's get started!" note, `.dt-profile__body` h1 + role + bio + `.dt-checklist` + actions) | Single template for the CPT |
| Checklist | `ul.dt-checklist` (`--2`, `--links`) | Icon List |
| Sticky side card | `.dt-layout` > `.dt-main` + `aside.dt-aside` > `.dt-side` (`.dt-side__nav` link list + blue `.dt-side__call`) | 2-col container, sticky; Nav Menu + Button |
| Q&A rows | `.dt-qa` > `.dt-qa__row` (h2 + `.dt-prose`) | Container rows (feeds FAQ schema) |
| Journey (vertical steps) | `.dt-journey` > h2 + `ol` > `li` (`.dt-journey__ic` icon circle + step label, h3, p), dashed connector, inside one white card | Icon List / Icon Box ×3 |
| Facts | `.dt-grid.dt-facts` > `.dt-card` > `b` + `p` | Counter |
| Feature rows (illustration list) | `.dt-flist` > `article.dt-frow` > `.dt-frow__art` (white rounded tile + SVG) + `.dt-frow__body` (h3 title 22px with blue rule, p 15px, `.btn--blue.btn--sm`). Reference: dentalcareseattle.com/cosmetic-dentistry | Loop / repeater (ACF `features`: icon, title, text, link) |
| Parallax statement band | `section.dt-band.dt-parallax` > `.dt-parallax__media` + `.wrap.dt-band__inner` (eyebrow, h2, p, `.btn`) | Container with background + Motion Effects › Scrolling › Vertical (or our class) |
| Quote | `figure.dt-quote` | Blockquote |
| Table | `.dt-table-wrap` > `table.dt-table` | Table / HTML |
| Notice | `.dt-notice` (icon + text) | Alert |
| Custom dropdown | main.js turns every `.dt-field select` into a `.dt-select__btn` + `.dt-select__list`. The native select stays in the form and submits the value. Keyboard and screen-reader support included; the list flips upward when there is no room below. | Elementor select field: point the script at `.elementor-field-type-select select` |
| Booking card | `.dt-book` > `.dt-book__info` (solid blue: kicker, h2, lead, `.dt-avatars`, `.dt-book__rows` contact list) + `.dt-book__form` | Two-column container + Icon List |
| Form | `.dt-form` > `form` > `.dt-form__grid` > `.dt-field`: label sits inside a soft field, full-width submit | **Elementor Pro Form** (label positioned with the same CSS) |
| Gallery | `.dt-gallery` (`.g-wide`, `.g-tall`) | Gallery / Media Carousel |
| Credentials row | `.creds` (copied from home) | Logo grid |
| CTA band | `section.banner.cta` "Let's get started." (copied from home) | Global Widget / saved section |
| Buttons | `.btn` (white outline on photo), `.btn--blue` (blue outline on light), `.btn--solid` (filled blue); text link `.dt-link` | Button (global styles) |

## 5. Page recipes

- **Hub (About, Services):** page hero › section head + grid of `.dt-svc` cards › credentials (About) › CTA band.
- **People listing (Dentists, Team):** hero › `.dt-grid--3 .dt-grid--people` of person cards › CTA band. "Read more" is a pill button that opens the person's own page (no pop-ups).
- **Profile (per dentist / team member):** client reference is dentalcareseattle.com/dentist-dr-nick-radandt. No photo hero, just breadcrumbs › big rounded 4:5 portrait on the left (sticky on desktop) with a "Let's get started!" note and appointment link under it › right: name as H1, small uppercase role, full bio, "Education & roles" checklist, Book / Back buttons › "Meet our other dentists" / "More of our team" (3 cards, white section) › CTA band. Schema: `ProfilePage` + `Person`.
- **Service (category style, e.g. Cosmetic):** hero › centred intro (`.dt-head--wide`) › `.dt-flist` feature rows with illustrations › parallax `.dt-band` statement › related services › contact block.
- **Service:** hero (eyebrow "Dental services in Calgary") › `.dt-layout` (main content + sticky aside) › "Explore more services" (3 related cards) › contact block (`#book`, form preselected for that service). No CTA band, because the form replaces it.
- **Information (CDCP):** hero › `.dt-layout` with prose, checklist, table, notice › CTA band.
- **Contact:** hero › booking card (the map is in the footer).
- **Legal:** hero › `.dt-legal` prose (max 820px) › CTA band.

## 6. SEO rules (every page)

- One `<h1>` per page. Headings in order (h2 › h3). Use the exact page keyword plus "Calgary" in the H1 or title.
- Unique `<title>` (≤ 60 characters, pattern `Topic in Calgary | Downtown Dental`) and meta description (≤ 160 characters, with a call to action).
- `canonical` = `https://www.downtowndentist.ca/<slug>/` (the live site is on www; never use the bare domain), plus Open Graph and Twitter tags, `lang="en-CA"`.
- Page banners are real `<img>` elements with descriptive alt text and `fetchpriority="high"`. Every `<img>` has `width` and `height`. Never invent schema values (no made-up price range, rating or review count).
- JSON-LD `@graph`: `Dentist` (`#dentist`: NAP, hours, new patients) + `WebSite` + `WebPage` (or `MedicalWebPage` / `AboutPage` / `ContactPage` / `CollectionPage`) + `BreadcrumbList`. Service pages add `Service`. Q&A pages add `FAQPage`. Profile pages add `Person` (the dentists listing lists all three).
- Visible breadcrumbs that match the schema.
- Images: descriptive `alt` (empty `alt=""` for decorative card thumbnails that sit next to a linked title), `loading="lazy"` below the fold, and the hero image preloaded.
- Every link to the Contact page goes to `contact-us.html#book` (the booking form); on the Contact page itself those links glide to the form. In WordPress use `/contact-us/#book`.
- Internal links: every service page links to 3 related services, the services hub and the contact block.
- Location: map embeds and "Open in Google Maps" use the clinic's Google listing (CID `16009264937890452343`, coordinates 51.04445023621821, -114.0672141826333), never an address search, which pins a competitor next door. Directions buttons use a Google directions link.
- NAP (name, address, phone) must be identical everywhere: 215 9 Ave SW #150, Calgary, AB T2P 1K3 · (403) 264-1736.
- Keep `sitemap.xml` and `robots.txt` up to date. In WordPress, let Rank Math or Yoast generate them and add the schema above.

### 301 redirects (old live URL → new)
```
/our-services/                          → /services/
/our-services/new-patient-experience/   → /new-patient-experience/
/our-services/emergency-dental/         → /emergency-dentistry/
/our-services/general-dentistry/        → /general-dentistry/
/our-services/cosmetic-dentistry/       → /cosmetic-dentistry/
/our-services/sport-dentistry/          → /sports-dentistry/
/our-services/nightguards-bruxism/      → /nightguards-bruxism/
/our-services/dental-surgery/           → /dental-surgery/
/our-services/dental-implants/          → /dental-implants/
/our-services/sedation-dentistry/       → /sedation-dentistry/
/our-services/wisdom-teeth/             → /wisdom-teeth-removal/
/our-services/botox/                    → /botox/
/our-services/invisalign/               → /invisalign/
/our-services/family-dentistry/         → /family-dentistry/
/canadian-dental-care-plan-cdcp/        → /canadian-dental-care-plan/
/about-us/meet-our-dentists/            → /meet-our-dentists/   (profiles are new: /dentists/dr-kristin-yont/, /team/karen/)
/about-us/meet-the-team/                → /meet-the-team/
```
(`/about-us/`, `/our-office/`, `/contact-us/`, `/privacy-policy/` and `/terms-of-use/` keep their URLs.)

## 7. WordPress build (Elementor Pro + ACF Pro)

**Global setup**
- Elementor › Site Settings › Global Colors: Primary `#1079a3`, Secondary `#7d7d7d`, Text `#5b6266`, Accent `#262b2e`, plus custom colours for Background `#f8f8f6`, Tint `#eaf3f7` and Line `#dcdcd8`.
- Global Fonts: Open Sans 700 for headings, 400 for body. Host the fonts locally (Elementor › Settings › Performance).
- Layout: content width 1180, container padding 0. Breakpoints: Tablet 960, Mobile 600.
- Enqueue `style.css` and `main.js` once from a child theme (`wp_enqueue_style` / `wp_enqueue_script`, script in the footer). Don't paste CSS into individual widgets.
- Theme Builder: Header, Footer, Single Page templates, and **Single templates for the `dentist` and `team_member` CPTs** (the profile layout). Set the CPT rewrite slugs so URLs read `/dentists/dr-kristin-yont/` and `/team/karen/`. Save the Page Hero, CTA Band, Contact Block and Related Services as global templates.

**Build markers in the HTML.** `<body data-template="...">` names the Elementor template (`home`, `hub`, `people-listing`, `single-dentist`, `single-team-member`, `service`, `service-category`, `office`, `contact`, `information`, `legal`). `data-section` names each block to build as an Elementor container or saved template. `data-acf` names the field behind each piece of content. `data-cpt` marks a repeating item from a custom post type. Build from these and `wordpress/pages.json`, not from guesses.

**ACF field groups.** The markup carries `data-cpt`, `data-acf` and `data-section` attributes so each part can be mapped to its field.
| Where | Fields |
|---|---|
| Options page "Clinic Info" | `clinic_phone`, `clinic_fax`, `clinic_email`, `clinic_address`, `clinic_hours` (repeater), `new_patient_form_url`, social links |
| CPT `dentist` | `photo`, `name`, `role`, `credentials` (repeater → chips), `bio` (WYSIWYG), `order` |
| CPT `team_member` | `photo`, `name`, `role`, `group` (Administration / Hygiene / Assisting / Sterilization), `status` (current / retired + note), `excerpt`, `bio`, `order` |
| Pages (service template) | `hero_image`, `hero_position`, `hero_title` (short), `hero_subtitle` (keyword line), `service_title`, `service_excerpt`, `card_image`, `related_services` (relationship ×3), `form_default_service`, `faq` (repeater q/a → Q&A rows + FAQ schema) |

**Form:** Elementor Pro Form widget with fields `name`* (text), `phone`* (tel), `email`,
`service` (select, default per page), `source` (select), `message` (textarea). Add a
reCAPTCHA v3 integration, an email action to info@downtowndentist.ca, and the thank-you
message from `.dt-form__ok`. Style the widget to match `.dt-form`.

**Motion:** Elementor Entrance Animation "Fade In Up" (slow, delay 0/80/160ms) is the same
as `.dt-reveal`. Either use the CSS class through Advanced › CSS Classes, or the built-in
animation. Never use both.

## 8. Open content items (confirm with the clinic)
- Insurance wording: the site says "we accept all insurance" and also "we do not direct bill".
- Clinic hours (the live site's hours block is broken; the mock-ups use Mon–Fri 7:00–2:30).
- Names of the three staff in `people/unconfirmed/`. Higher-resolution portraits of Phyllis, Cadan, Heather and Deb (currently 500px originals from the live site).
- New Patient Form URL. Whether Heather and Deb stay listed (currently shown as retired).
- The CDCP content is dated August 27, 2024. Recheck it against current federal rules.
- Privacy contact privacy@123dentist.com (network address) is used as-is.
