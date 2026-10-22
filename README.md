# BYU-I Formula Racing website

A four-page, portable website built with HTML, CSS, and JavaScript. Open the folder in VS Code and edit the files directly. There is no npm install, build command, framework, or paid service to maintain.

The design follows the supplied brand system: Midnight Navy, Racing Blue, dark navy reading surfaces, Barlow Condensed headings, and Inter body text. The original brand files are preserved in `brand-source/`; current header and footer artwork lives in `assets/images/`.

## Start here

1. Extract the ZIP.
2. In VS Code, choose **File → Open Folder** and select `byui-formula-website`.
3. Preview through a local server (Live Server or the Python command below). Page links use clean folder URLs such as `about/`. When opening `index.html` directly (`file://`), JavaScript adds `index.html` to internal page links so local previews can navigate too. Use a server for navigation with JavaScript disabled and for contact-form testing. Contact submissions require an internet connection to Formspree.
4. For live refresh while editing, install the recommended **Live Server** extension and choose **Open with Live Server** on `index.html`.

Alternative local preview with Python installed:

```bash
python -m http.server 5500
```

Visit `http://localhost:5500`. Run that command from this project folder. On some computers, use `python3` or `py` instead of `python`. For contact-form testing, open `http://localhost:5500/contact/` in a full browser rather than the editor's `file://` preview, so network requests use a normal HTTP origin. Check Formspree activation and domain restrictions if submissions are rejected; opening the page through a server alone does not verify form configuration or email delivery.

## What is included

| Page | File | Contents |
| --- | --- | --- |
| Home | `index.html` | Introduction, concept render, VIKING.1, team photos, manual subteam slideshow |
| About | `about/index.html` | Mission, work-area selector, photos, project and competition information, joining invitation |
| Sponsors | `sponsors/index.html` | In-kind contributions, partnership process, major and supporting sponsor logo grids |
| Contact | `contact/index.html` | Contact details and a Formspree submission form |

| Change | Start here |
| --- | --- |
| Page wording | The matching page's `index.html` file; search its numbered section comments |
| Email, location, photos, sponsors, sponsor PDF | `assets/js/config.js` |
| Supplied base colors, fonts, spacing (reference) | `assets/css/tokens.css` |
| Site colors, layout, and component appearance | `assets/css/site.css` |
| Header, menu, footer | `assets/js/site.js` |
| Contact submission behavior | `assets/js/contact.js` |
| Manual subteam slideshow | `assets/js/subteams.js` |
| About work areas and sponsorship contribution selector | `assets/js/disciplines.js` |

Read [the editing guide](docs/EDITING.md) for copy-paste examples, [the publishing guide](docs/PUBLISHING.md) when ready to publish, and [the design notes](docs/DESIGN.md) for the rationale and source references.

The [email signature guide](docs/EMAIL-SIGNATURE.md) covers the hosted PNG logo, Outlook installation, future logo updates, and verification. The standalone signature is [docs/email-signature.html](docs/email-signature.html).

## Finish your content

The public email, social links, six sponsors, and several team photos are configured. Several other details await approved content:

- Keep the team email and social links in `config.js` up to date.
- Add photos to the remaining subteam and team slots when available.
- Keep approved sponsor details current and, optionally, add your sponsorship PDF.
- Add verified competition information when available.
- Review the draft copy, team identity, and proposed branding against your current team information before publishing.

There are no invented sponsors, team counts, competition results, or performance figures. Empty photo slots display short descriptions relevant to their sections. Empty optional settings do not create broken links.

## Check your edits

```bash
python scripts/check_site.py
```

This checks HTML structure and references, local image/font/script paths (including shared JavaScript templates), fragments, duplicate IDs and attributes, and JSON syntax. See [the checking notes](docs/CHECKING.md) for browser checks.

## Project organization and generated files

The homepage is `index.html` at the root; the other pages live in `about/`, `sponsors/`, and `contact/` so they load at clean URLs such as `/sponsors/`. The root `about.html`, `sponsors.html`, and `contact.html` files are only redirects that keep old links working. `assets/` contains runtime CSS, JavaScript, images, and licensed fonts; `docs/` contains maintenance guides; `scripts/` contains the dependency-free checker. `.editorconfig` and `.vscode/` provide editor defaults. `brand-source/` holds the original design references, not runtime configuration.

The current supplied logos live in `assets/images/`; superseded logo files have been removed. The concept render retains its original PNG source alongside its WebP copy. Local review output in `qa/`, Python bytecode, and `.cache/` directories are ignored by Git and should stay out of published files.

The site has no service worker, Cache Storage, or local-storage cache to reset. Prefetch hints use the browser's normal HTTP cache. If a browser shows an older edit, hard-refresh or disable its cache in developer tools while testing. With Python's preview server, restart the server only if you need to change its port or serving folder.

## Publish later

This folder is ready for GitHub Pages. All page and asset links are relative, so it works under a repository URL such as `https://YOUR-ACCOUNT.github.io/YOUR-REPOSITORY/`. Follow [PUBLISHING.md](docs/PUBLISHING.md).

## Message delivery

The contact form posts to `https://formspree.io/f/xbgdbqjv`, configured in the form's `action` in `contact/index.html`. Formspree receives the submitted contact details, topic, and message; the website host only serves static files. Sending navigates to Formspree for hosted CAPTCHA and confirmation, with or without JavaScript. JavaScript adds whitespace validation, topic-based subjects, and duplicate-submit protection; it does not send AJAX requests or announce delivery. Formspree's default hosted reCAPTCHA requires this native POST flow; AJAX needs a separately configured custom CAPTCHA key. The direct email link remains an alternative. Manage recipients, verification, spam protection, and submission limits in the Formspree dashboard. No private API key belongs in this repository.

## Assets and licensing

Inter and Barlow Condensed are bundled locally as TrueType fonts with their SIL Open Font License files in `assets/fonts/`. The original palette and guide are in `brand-source/`. Supplied team artwork remains subject to the team's and university's rights. No license to the university marks is implied.
