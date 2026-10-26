# Editing the website

## The editing model

Page content lives in HTML. Shared settings live in `assets/js/config.js`. Shared UI lives in `assets/js/site.js`. CSS controls appearance. This separation lets you make a wording change without understanding JavaScript or installing a toolchain.

Keep this project folder together. Relative asset links work because `index.html`, the page folders, and the `assets` folder keep the same relationship.

## 1. Change text

Open the page in VS Code. Find comments such as `HOME 02 / PROJECT` or `SPONSORS 02 / PROCESS`. Edit the words between tags:

```html
<h2>YOUR NEW HEADING</h2>
<p>Your new paragraph goes here.</p>
```

Keep `id`, `class`, `data-*`, and `aria-*` attributes unless you are intentionally changing layout or behavior. They connect styles, links, scripts, and accessibility features. Keep one `<h1>` per page. Use `<h2>` for sections and `<h3>` inside them.

For literal symbols in HTML, use `&amp;` for `&` and `&lt;` for `<`. Use ordinary quotation marks inside text, but do not break the quotes around an attribute.

The VIKING.1 panels use Barlow Condensed as ordinary project text. The original brand guide uses the earlier RAVN.1 project name and references a custom Nordic_Modern wordmark; that font was not supplied. Keep the preserved source guide intact when updating current website copy.

## 2. Set the public email

In `assets/js/config.js`, update the public address when needed. The current team address is `saeformula@byui.edu`. Social URLs live in the adjacent `socials` settings. Email and social links appear on Contact and in every footer. The HTML and the footer template in `site.js` include fallback links; update those too when changing a public address or social URL.

Email format:

```js
contactEmail: "your-approved-team-address@your-domain.org",
```

Use the actual address approved by your team. Save and reload `contact/index.html`. The direct email link is independent of the Formspree form's recipient settings.

The form's `action="https://formspree.io/f/xbgdbqjv"` and `method="POST"` in `contact/index.html` configure submission. Change the public endpoint there if needed; no private API key or JavaScript endpoint setting is required. Manage notification recipients and form activation in the Formspree dashboard, not `contactEmail`.

`contact.js` adds field validation, a topic-based subject, and duplicate-submit protection to the native HTML POST. It leaves named fields enabled so all values are posted. Formspree receives the existing name, email, organisation, topic, and message fields, then handles hosted CAPTCHA and the result on its own page. The same POST works without JavaScript. Keep reCAPTCHA enabled in Formspree; switching to AJAX would require a compatible custom CAPTCHA integration. No real submission should be sent during automated checks; use a local POST receiver instead.

Links can preselect a topic:

| Link | Selected topic |
| --- | --- |
| `contact/?topic=sponsorship` | Sponsorship |
| `contact/?topic=joining` | Joining the team |
| `contact/?topic=technical` | Technical assistance |
| `contact/` | General enquiry |

## 3. Add your own team photo

1. Put a photo in the matching page folder under `assets/images/`: `home/`, `about/`, `contact/`, or `sponsors/`. Use lowercase descriptive filenames separated by hyphens, for example `workshop-team.webp`. Shared branding lives in `shared/`; originals retained for editing live in `sources/`. Keep `assets/images/email-signature.png` at its existing public URL.
2. In `config.js`, find `photos.workshop` and fill it in:

```js
photos: {
  workshop: {
    src: "assets/images/home/workshop-team.webp",
    alt: "BYU-I students assembling the rear suspension in the workshop",
    caption: "Preparing suspension components for assembly."
  }
},
```

Use alt text that describes the actual photograph, not the example if it does not match. Each matching text card is replaced only after the image loads. Leave `src` empty to keep the existing content.

Use a photo around 1200–1800 pixels wide and ideally under 400 KB. WebP or JPEG is appropriate for photos. The current slot crops to a 4:3 shape with `object-fit: cover`; put faces and important details near the center. Adjust `.team-photo` in `site.css` if you need a different crop.

The photo keys in `config.js` are `car` (Home), `team` (Home and Contact), `workshop` (Home), `fabrication` and `controls` (Home slideshow and About), `operations` (Home slideshow), and `partnership` (Sponsors). Fill in `src`, descriptive `alt`, and an optional factual `caption` for each. Shared keys use the same configured photo wherever they appear. Empty settings preserve the existing HTML image or descriptive text card. The `car` and `partnership` keys already have photos; update their matching fallback images and captions in HTML if replacing them. The About mission and work-area photos are edited directly in `about/index.html`.

Wide photo slots crop to 21:9 on desktop and 4:3 on phones; other slots stay at 4:3. Keep the main subject near the center.

To add a photo elsewhere, use ordinary HTML:

```html
<figure class="photo-figure">
  <img class="team-photo" src="assets/images/your-photo.webp"
       alt="Describe the actual scene" width="1200" height="900"
       loading="lazy" decoding="async">
  <figcaption>A short, factual caption.</figcaption>
</figure>
```

Use `loading="lazy"` for images below the opening screen. Do not lazy-load a future main hero photo.

## 4. Add sponsors

Add approved partner logo files to `assets/images/sponsors/logos/`. Append entries to the existing `sponsors` array in `config.js`; keep current approved partners unless their recognition is being removed. Each entry follows this format:

```js
sponsors: [
  {
    name: "Actual sponsor name",
    group: "major",
    logo: "assets/images/sponsors/logos/actual-sponsor.svg",
    url: "https://www.actual-sponsor-domain.com"
  }
]
```

These names are format examples. Use real approved partners. Each item needs a name and local logo path. A URL is optional; use an HTTPS address if included. Put a comma between objects when adding a second sponsor. This is JavaScript, not JSON: preserve the surrounding object's commas when replacing the array.

The sponsor page displays only configured sponsors, with no empty placeholder cards. Add entries to `config.js` to show more sponsors; rows expand automatically. Set `group` to `"major"` or `"supporting"`; omitted groups default to supporting. Major sponsors use two columns and supporting sponsors use four columns on desktop. On phones, major sponsors stack in one column and supporting sponsors use two columns. These are recognition groups for in-kind contributions, with no monetary tiers. Logos appear on a white inset within dark cards; preserve their proportions and clear space. Major logo panels are 10rem high with .5rem padding; supporting panels are 5rem high with .75rem padding. Cards with a homepage URL are clickable across their full area.

Do not promise specific logo placements, exposure, endorsement, or recruiting results unless the team has agreed to them.

## 5. Add a sponsorship PDF

Create `assets/downloads/`, add the approved PDF, and set:

```js
sponsorPacket: "assets/downloads/sponsor-packet.pdf",
```

The download button then appears on `sponsors/index.html`. Use your sponsorship packet, not the internal brand guide. The button stays hidden while the setting is empty.

## 6. Change colors, typography, and spacing

`assets/css/tokens.css` is the supplied token file, copied unchanged. Its `:root` variables are the supplied base design values. Preserve this source file. Make site-specific color, typography, and spacing adjustments in `site.css`, which loads after it. The dark surface palette is defined in the foundations section of `site.css`.

| Variable | Purpose |
| --- | --- |
| `--brand-navy` | Opening panels, menu, footer, logo ground |
| `--brand-blue` | Large accent words and decorative details |
| `--action` / `--action-hover` | Readable button backgrounds and links |
| `--surface-subtle` | Main reading background |
| `--text` / `--text-muted` | Body copy and secondary copy |
| `--content-max` | Maximum content width |
| `--page-inset` | Space at the left and right of the page |
| `--space-*` | Shared spacing scale |

Use `site.css` for component-specific changes. It loads after the tokens file and intentionally overrides some base styles. For example, look for `02 / Shared navigation`, `03 / Dark opening panels`, or `07 / Tablet and phone layouts`.

Keep normal white button labels on Action Blue, rather than Racing Blue. The guide identifies Racing Blue as suitable for large text and accents. Do not skew paragraphs or stretch logo artwork.

Inter and Barlow Condensed are self-hosted in `assets/fonts/`, so the site does not request Google Fonts. Preserve the accompanying licenses when moving the project. Use the supplied WebP logos without stretching, recoloring, or removing their transparency.

## 7. Change the header or footer

Find the `pages` array and the header/footer templates in `assets/js/site.js`. The four menu entries, active-page state, and footer links come from that one array.

At desktop widths, navigation links sit on either side of the centered crest. Below 768px, the menu button opens navigation below the header. The mobile menu uses the browser's native `<dialog>` element. Keep `showModal()`, the accessible name, the explicit close button, and the trigger's `aria-expanded` state. Native modal dialogs provide Escape handling, focus containment, and an inert background in modern browsers.

Each HTML file also contains a short fallback navigation and footer. If you rename or reorder pages, update those fallback links too, so navigation remains available with JavaScript disabled. For this starter, keep the four-page scope.

## 8. Add verified car details

Edit the existing project sections in Home and About. If confirmed specifications are added, use a semantic description list (`<dl>` with `<dt>` and `<dd>`) and add its component styles to `site.css`. Clearly distinguish design targets from measured results. The site does not include guessed power, mass, speed, member counts, or competition records.

## Common mistakes

| Symptom | Likely fix |
| --- | --- |
| A photo does not appear | Check the file exists, capitalization matches, `src` starts with `assets/`, and alt text is filled in |
| A sponsor does not appear | Check the name, logo path, array syntax, and browser Console |
| A setting seems ignored | Save `config.js`, reload, and look for a missing quote or comma |
| Links fail after publishing | Keep paths relative; use `assets/...`, not `/assets/...` or a Windows disk path |
| Styles look unchanged | Save both files, then hard-refresh; inspect the rule in `site.css` that overrides the token |
| The email app does not open | Configure a default email app, copy the displayed address, or use the contact form |
| Changes only appear on one page | Page copy is independent; shared UI belongs in `site.js` |

Run `python scripts/check_site.py` after editing. It catches missing local files and broken fragment links. It does not replace a browser check or review of your content.

## Homepage subteam slideshow

Edit the four subteam descriptions (Mechanical, Technical, Business, and Electrical) and their fallback photos in `index.html` under `HOME 03 / SUBTEAMS`. Their optimized WebP photos live in `assets/images/home/`: `mechanical-chassis-cad.webp`, `technical-workshop-grinding.webp`, `business-team-planning.webp`, and `electrical-team-electronics.webp`. The four original screenshots are retained under descriptive `*-original.png` names in `assets/images/sources/`; the uncorrected Mechanical WebP is also retained there. Mechanical uses the cooler edit, and Electrical uses the brightened edit. The `fabrication`, `controls`, and `operations` keys in `config.js` can override the Mechanical, Electrical, and Business photos; `fabrication` and `controls` also appear on About. Empty settings preserve the HTML photos.

`assets/js/subteams.js` controls the manual slideshow. Visitors can use previous/next, the four slide selectors, or arrow keys while focusing a control. Slides do not advance automatically. Without JavaScript, all subteams appear in sequence.

## About navigation

The About dropdown links to `about/#team-information` and `about/#competition-information`. Edit team copy in the mission section and add verified event details under `ABOUT 04 / COMPETITION`. The desktop and mobile dropdowns use native `details` elements; keep their keyboard and Escape behavior in `site.js`.

## Work-area and contribution selectors

`assets/js/disciplines.js` controls the selectors in About and Sponsors. Edit the existing `.discipline-copy` content in the matching page; About uses general descriptions of each area of work. Keep each button's `aria-controls` matched to its panel ID and preserve `data-discipline-panel`. All panels remain readable without JavaScript, and the controls appear only when enhanced.

About's `data-discipline-dropdown` moves each description beneath its button when JavaScript is available. One area opens at a time; the photo panels reserve a shared size so changing areas does not resize the card. On narrow screens the descriptions stay inside a fixed-height list below the photo; long descriptions can scroll within their available space. Sponsors keeps its existing selector layout.

## Page prefetching

When served over HTTP or HTTPS, `site.js` adds low-priority document prefetch hints after 80ms of hovering over an internal page link, or when a link receives keyboard focus. Repeated destinations are deduplicated, fragment identifiers are removed, and contact-topic query strings are retained. Downloads, external sites, current-page links, touch hover, data-saving connections, and 2G connections are excluded. Brief hovers are canceled. Browsers control whether hints are fetched and cached; normal links still work without this feature. Opening local files does not trigger prefetch requests.

## Optimized images

Published team photos use WebP copies in each page's `assets/images/<page>/optimized/` folder. Originals are retained for editing, including the PNG/JPEG files and originals in `sources/`. The copies are 480, 800, 1200, and up to 1600 pixels wide, without enlarging smaller originals. HTML uses `srcset` and `sizes` so phones can download smaller copies; `auto` sizes uses the actual lazy-loaded image width where supported, with explicit layout sizes as a fallback. The homepage hero background uses the full-resolution `assets/images/home/byui-formula-team-hero.webp` (3720 x 2795, WebP quality 95) at all screen sizes. Its original `byui-formula-team-hero.png` is retained unchanged alongside it. This replaces the deleted `team-hero.jpeg`; older generated hero WebP copies are retained but unused. The taller photo fills the hero behind the fixed navigation, with a 42% vertical focal position and overlaid text on mobile. The hero is excluded from the photo optimization script; regenerate its WebP from the PNG at full resolution with Pillow using `image.save(target, "WEBP", quality=95, method=6)`. Logos and brand-source assets are unchanged.

To regenerate the copies after editing an original, run `py scripts/optimize_photos.py` (or `python scripts/optimize_photos.py`). This optional editing script requires Pillow; the website itself still needs no build step or dependencies. If replacing an original with different dimensions, update the HTML `srcset` width descriptors, fallback `src`, and intrinsic `width`/`height` to match the generated files. Each photo's fallback `src` points to its largest optimized copy.

Configured photo overrides can optionally include `sources: [{ src: "assets/images/home/optimized/workshop-team-480.webp", width: 480 }, ...]` and a `sizes` string. All paths stay relative to the site root. When config points to the existing HTML photo, the HTML image and its responsive attributes are preserved; edit that image's alt text and caption directly in HTML as well as in config.

The concept render has a lossless WebP copy at `assets/images/home/formula-car-concept.webp`. Its original PNG remains intact at `assets/images/sources/formula-car-concept-original.png`. The original team photo is retained at `assets/images/sources/team-with-chassis-original.webp`. The menu and footer logos use lossless WebP copies of the supplied rounded PNG artwork, without resizing or cropping; both PNG originals are retained in `assets/images/shared/`.

## Current logo library

The rounded menu crest uses `combined-crest.png` as its retained original and `combined-crest.webp` on the site (1293 × 1217). The rounded footer logo, including the fallback HTML in all four pages, uses `crest-horizontal.webp`, with `crest-horizontal.png` retained as its original (1983 × 793). `small-crest.webp` (1293 × 1216) supplies the favicon and touch icon.

The existing `.brand-lockup` and `.footer-logo` rules in `site.css` retain the header and footer sizing, spacing, responsive behavior, and proportional image fitting. Intrinsic HTML image dimensions match the new artwork. Superseded logo files and their references have been removed; the original brand guide, palette, tokens, and font licenses remain intact.

The favicon files `favicon-32.png` (32 × 32, browser tab) and `apple-touch-icon.png` (180 × 180, phone home screens) were generated from `small-crest.webp`, scaled to fit a transparent square without stretching or cropping. Every page links them in its `<head>`. The source WebP has a transparent background, and some fully transparent pixels still hold leftover color values. If you regenerate the icons, use a tool that keeps the alpha channel; a conversion that drops it fills the background and can expose those hidden colors as purple streaks. Check the result over light and dark backgrounds before replacing the files.
