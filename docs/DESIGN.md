# Design decisions and sources

## Supplied brand files

- `brand-source/brand-guide-v1.0.pdf`: the supplied working brand guide, preserved as-is.
- `brand-source/palette.json`: the supplied machine-readable color/font palette, preserved as-is.
- `assets/css/tokens.css`: the supplied token stylesheet, preserved as-is.
- `assets/images/shared/combined-crest.webp`, `crest-horizontal.webp`, and `small-crest.webp`: refined supplied logos, copied unchanged. Superseded standalone logo assets have been removed.

The identity follows the current supplied guide's **BYU-I Formula Racing** naming and **RAVN.1** project label. The guide is explicitly a proposed team system; it does not establish university approval.

## Website interpretation

| Brand instruction | Implementation |
| --- | --- |
| Navy hero and logo holding areas | Dark hero, menu, footer, and supplied logo assets |
| Supplied artwork at its original proportions | Centered header artwork and a wide footer logo; current supplied artwork retained |
| Clear reading surfaces | Dark navy sections, short paragraphs, light body copy |
| Barlow Condensed / Inter | Both font families bundled locally with licenses |
| Racing Blue as an accent | Large hero words and small decorative rules |
| Action Blue for white labels | Main filled buttons use the action token |
| Mobile usability | Stacked layouts, labeled controls, 44px minimum interactive targets |
| Keyboard access | Skip link, visible focus, native dialog menu, native form validation |
| Reduced motion | CSS and menu animations respect the visitor's system preference |
| Real evidence | No invented team statistics, results, sponsors, or vehicle specifications |

The current website uses **VIKING.1** as its project name. The original guide's **RAVN.1** naming is preserved in the source documents. Nordic_Modern was not provided; project text uses Barlow Condensed. The compact `small-crest.webp` supplies the favicon and touch icon; see "Current logo library" in [EDITING.md](EDITING.md).

## Navigation and imagery

The inset, rounded header centers `combined-crest.webp`. At desktop widths, Home and About sit to its left; Sponsors and Contact sit to its right. About opens a native `details` dropdown for the team and competition sections. Below 768px, the menu button opens a native modal dialog with the same four destinations and About section links.

The footer uses `crest-horizontal.webp`. The fixed header hides when the footer logo reaches the viewport, while preserving focused navigation and an open mobile menu.

Home shows a labeled concept render, team/workshop photos, and a manual three-slide subteam carousel. About and Sponsors share a work-area/contribution selector. Remaining empty photo slots display short, relevant descriptions. About introduces each area of work and the general competition challenge without claiming specific events or results.

## Structure and maintenance

Four real HTML documents make content easy to edit and give each page its own title and description. A single shared script keeps the menu and footer consistent without a build tool. Core page copy, fallback navigation, and the native contact POST remain available without JavaScript; optional configured photos and sponsor cards require it.

The JSON palette is retained for reference or design-tool use. It is not a second runtime theme source. The supplied `tokens.css` defines the base system; `site.css` defines the site's dark palette overrides and components. The bundled fonts are TrueType files, declared in `site.css`.

The website has no analytics scripts, third-party font request, external image dependency, database, or local storage. On submission, the native contact form sends the visitor's contact details, topic, and message to Formspree for hosted CAPTCHA and confirmation. JavaScript validates fields and manages submission state; it does not send AJAX requests or announce inbox delivery. The email link is an alternative.

## Remaining content choices

Keep the configured public email and social links current. Add real photography, approved partners, and an optional sponsorship PDF. Confirm the draft mission/discipline text matches your current team. Publish only verified specifications and achievements.
