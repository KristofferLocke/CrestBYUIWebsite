# Editing the website

## The editing model

Page content lives in HTML. Shared settings live in `assets/js/config.js`. Shared UI lives in `assets/js/site.js`. CSS controls appearance. This separation lets you make a wording change without understanding JavaScript or installing a toolchain.

Keep this project folder together. Relative asset links work because `index.html`, the other pages, and the `assets` folder keep the same relationship.

## 1. Change text

Open the page in VS Code. Find comments such as `HOME 02 / PROJECT` or `SPONSORS 02 / PROCESS`. Edit the words between tags:

```html
<h2>YOUR NEW HEADING</h2>
<p>Your new paragraph goes here.</p>
```

Keep `id`, `class`, `data-*`, and `aria-*` attributes unless you are intentionally changing layout or behavior. They connect styles, links, scripts, and accessibility features. Keep one `<h1>` per page. Use `<h2>` for sections and `<h3>` inside them.

For literal symbols in HTML, use `&amp;` for `&` and `&lt;` for `<`. Use ordinary quotation marks inside text, but do not break the quotes around an attribute.

The RAVN.1 panels use Barlow Condensed as ordinary project text. They do not recreate the custom Nordic_Modern model wordmark. Add the approved model artwork later if desired; that font was not supplied.

## 2. Set the public email

In `assets/js/config.js`, update the public address when needed. The current team address is `saeformula@byui.edu`. Social URLs live in the adjacent `socials` settings. Email and social links appear on Contact and in every footer. The HTML and the footer template in `site.js` include fallback links; update those too when changing a public address or social URL.

Email format:

```js
contactEmail: "your-approved-team-address@your-domain.org",
```

Use the actual address approved by your team. Save and reload `contact.html`. The direct email link and **Open email app** action will appear. The visitor still sends the email themselves; GitHub Pages does not process forms.

The form validates the required fields, prepares a preview, and offers **Save message** and **Copy message** as alternatives. Changing a field hides the old preview so the visitor cannot accidentally use an outdated draft.

Links can preselect a topic:

| Link | Selected topic |
| --- | --- |
| `contact?topic=sponsorship` | Sponsorship |
| `contact?topic=joining` | Joining the team |
| `contact?topic=technical` | Technical assistance |
| `contact` | General enquiry |

## 3. Add your own team photo

1. Put a photo in `assets/images/`, for example `workshop-team.webp`.
2. In `config.js`, find `photos.workshop` and fill it in:

```js
photos: {
  workshop: {
    src: "assets/images/workshop-team.webp",
    alt: "BYU-I students assembling the rear suspension in the workshop",
    caption: "Preparing suspension components for assembly."
  }
},
```

Use alt text that describes the actual photograph, not the example if it does not match. Each matching placeholder is replaced only after the image loads. Leave `src` empty to keep the placeholder.

Use a photo around 1200–1800 pixels wide and ideally under 400 KB. WebP or JPEG is appropriate for photos. The current slot crops to a 4:3 shape with `object-fit: cover`; put faces and important details near the center. Adjust `.team-photo` in `site.css` if you need a different crop.

The photo keys in `config.js` are `car` (Home), `team` (Home and Contact), `workshop` (Home and About), `fabrication` and `controls` (Home slideshow and About), `operations` (Home slideshow), and `partnership` (Sponsors). Fill in `src`, descriptive `alt`, and an optional factual `caption` for each. Shared keys use the same photo wherever they appear. The `car` key is already set to the bundled concept render; update its matching fallback image and caption in `index.html` if you replace it.

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

Add approved partner logo files to `assets/images/`. Replace the empty `sponsors: []` array in `config.js`:

```js
sponsors: [
  {
    name: "Actual sponsor name",
    group: "major",
    logo: "assets/images/actual-sponsor.svg",
    url: "https://www.actual-sponsor-domain.com"
  }
]
```

These names are format examples. Use real approved partners. Each item needs a name and local logo path. A URL is optional; use an HTTPS address if included. Put a comma between objects when adding a second sponsor. This is JavaScript, not JSON: preserve the surrounding object's commas when replacing the array.

The sponsor page displays only configured sponsors, with no empty placeholder cards. Add entries to `config.js` to show more sponsors; rows expand automatically. Set `group` to `"major"` or `"supporting"`; omitted groups default to supporting. Major sponsors use two columns and supporting sponsors use four columns on desktop. On phones, major sponsors stack in one column and supporting sponsors use two columns. These are recognition groups for in-kind contributions, with no monetary tiers. Logos appear on a white inset within dark cards; preserve their proportions and clear space. Major logo panels are 10rem high with .5rem padding; supporting panels are 5rem high with .75rem padding. Cards with a homepage URL are clickable across their full area.

The original placeholder layout reserved four major spaces (two rows) and sixteen supporting spaces (four rows). Its `.sponsor-slot` styles and placeholder replacement support in `site.js` remain available if needed later. To restore an optional empty card inside either grid, use `<div class="sponsor-slot" data-sponsor-placeholder aria-hidden="true"><span>Logo space</span></div>`. Configured sponsors replace these cards first before adding new rows.

Do not promise specific logo placements, exposure, endorsement, or recruiting results unless the team has agreed to them.

## 5. Add a sponsorship PDF

Create `assets/downloads/`, add the approved PDF, and set:

```js
sponsorPacket: "assets/downloads/sponsor-packet.pdf",
```

The download button then appears on `sponsors.html`. Use your sponsorship packet, not the internal brand guide. The button stays hidden while the setting is empty.

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
| The email app does not open | Configure a default email app, or save/copy the prepared message |
| Changes only appear on one page | Page copy is independent; shared UI belongs in `site.js` |

Run `python scripts/check_site.py` after editing. It catches missing local files and broken fragment links. It does not replace a browser check or review of your content.

## Homepage subteam slideshow

Edit the three subteam descriptions in `index.html` under `HOME 03 / SUBTEAMS`. Photos use the `fabrication`, `controls`, and `operations` keys in `config.js`. The first two are also used on About. Leave their image paths empty to keep the placeholders.

`assets/js/subteams.js` controls the manual slideshow. Visitors can use previous/next, the three slide selectors, or arrow keys while focusing a control. Slides do not advance automatically. Without JavaScript, all subteams appear in sequence.

## About navigation

The About dropdown links to `about#team-information` and `about#competition-information`. Edit team copy in the mission section and add verified event details under `ABOUT 04 / COMPETITION`. The desktop and mobile dropdowns use native `details` elements; keep their keyboard and Escape behavior in `site.js`.

## Page prefetching

When served over HTTP or HTTPS, `site.js` adds low-priority document prefetch hints after 80ms of hovering over an internal page link, or when a link receives keyboard focus. Repeated destinations are deduplicated, fragment identifiers are removed, and contact-topic query strings are retained. Downloads, external sites, current-page links, touch hover, data-saving connections, and 2G connections are excluded. Brief hovers are canceled. Browsers control whether hints are fetched and cached; normal links still work without this feature. Opening local files does not trigger prefetch requests.

## Optimized images

The concept render has a lossless WebP copy in `assets/images/`. Its original PNG remains intact as source artwork. The supplied logos are already WebP and are copied without resizing, cropping, or recompression.

## Current logo library

The header uses `combined-crest.webp` (1293 ? 1217). The footer, including the fallback HTML in all four pages, uses `crest-horizontal.webp` (1983 ? 793). `small-crest.webp` (1293 ? 1216) is the supplied compact variant, stored for future placements.

The existing `.brand-lockup` and `.footer-logo` rules in `site.css` retain the header and footer sizing, spacing, responsive behavior, and proportional image fitting. Intrinsic HTML image dimensions match the new artwork. Superseded logo files and their references have been removed; the original brand guide, palette, tokens, and font licenses remain intact.
