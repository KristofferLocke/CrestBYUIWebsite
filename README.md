# BYU-I Formula Racing website

A four-page, portable website built with HTML, CSS, and JavaScript. Open the folder in VS Code and edit the files directly. There is no npm install, build command, framework, or paid service to maintain.

The design follows the supplied brand system: Midnight Navy, Racing Blue, dark navy reading surfaces, Barlow Condensed headings, and Inter body text. The original brand files are preserved in `brand-source/`; current header and footer artwork lives in `assets/images/`.

## Start here

1. Extract the ZIP.
2. In VS Code, choose **File → Open Folder** and select `byui-formula-website`.
3. Open `index.html` in a browser, or use a local server for the same clean URLs as the published site.
4. For live refresh while editing, install the recommended **Live Server** extension and choose **Open with Live Server** on `index.html`.

Alternative local preview with Python installed:

```bash
python -m http.server 5500
```

Visit `http://localhost:5500`. Run that command from this project folder. On some computers, use `python3` or `py` instead of `python`. Directory URLs such as `/sponsors/` work with this server and GitHub Pages.

## What is included

| Page | File | Contents |
| --- | --- | --- |
| Home | `index.html` | Introduction, concept render, RAVN.1, photo spaces, manual subteam slideshow |
| About | `about/index.html` | Mission, work areas, photo spaces, project and competition information, joining invitation |
| Sponsors | `sponsors/index.html` | In-kind contributions, partnership process, major and supporting sponsor logo grids |
| Contact | `contact/index.html` | Contact details and a local message builder |

| Change | Start here |
| --- | --- |
| Page wording | The matching `.html` file; search its numbered section comments |
| Email, location, photos, sponsors, sponsor PDF | `assets/js/config.js` |
| Supplied base colors, fonts, spacing (reference) | `assets/css/tokens.css` |
| Site colors, layout, and component appearance | `assets/css/site.css` |
| Header, menu, footer | `assets/js/site.js` |
| Message preparation behavior | `assets/js/contact.js` |
| Manual subteam slideshow | `assets/js/subteams.js` |

Read [the editing guide](docs/EDITING.md) for copy-paste examples, [the publishing guide](docs/PUBLISHING.md) when ready to publish, and [the design notes](docs/DESIGN.md) for the rationale and source references.

## Finish your content

The public email and social links are configured. Several other details await approved content:

- Keep the team email and social links in `config.js` up to date.
- Add your own workshop/team photos with descriptive alt text.
- Add approved sponsors and, optionally, your sponsorship PDF.
- Review the draft copy, team identity, and proposed branding against your current team information before publishing.

There are no invented sponsors, team counts, competition results, or performance figures. The photography placeholder is labeled. Empty optional settings do not create broken links.

## Check your edits

```bash
python scripts/check_site.py
```

This checks HTML structure and references, local image/font/script paths (including shared JavaScript templates), fragments, duplicate IDs and attributes, and JSON syntax. See [the checking notes](docs/CHECKING.md) for browser checks.

## Project organization and generated files

The home page stays at the root; the other three pages live in `about/`, `sponsors/`, and `contact/`, each as `index.html`. Inner pages use `../` for shared assets and navigation; `site.js` applies the same prefix to generated links and configured assets. `assets/` contains runtime CSS, JavaScript, images, and licensed fonts; `docs/` contains maintenance guides; `scripts/` contains the dependency-free checker. `.editorconfig` and `.vscode/` provide editor defaults. `brand-source/` holds the original design references, not runtime configuration.

The current supplied logos live in `assets/images/`; superseded logo files have been removed. The concept render retains its original PNG source alongside its WebP copy. Local review output in `qa/`, Python bytecode, and `.cache/` directories are ignored by Git and should stay out of published files.

The site has no service worker, Cache Storage, or local-storage cache to reset. Prefetch hints use the browser's normal HTTP cache. If a browser shows an older edit, hard-refresh or disable its cache in developer tools while testing. With Python's preview server, restart the server only if you need to change its port or serving folder.

## Publish later

This folder uses directory URLs (`about/`, `sponsors/`, and `contact/`), with `./` linking home. These work on GitHub Pages without a build or custom rewrites, including under a repository path. Cloudflare manages the custom domain's DNS. Follow [PUBLISHING.md](docs/PUBLISHING.md).

## Message delivery

This is a static website. It prepares an email draft when an address is configured; the visitor sends it from their email app. Without an address, it offers a saved text file or copyable message. It never claims to send an enquiry, and it does not store form fields or send them to a server. Long messages can be saved or copied if an email app cannot handle a long draft link.

## Assets and licensing

Inter and Barlow Condensed are bundled locally as TrueType fonts with their SIL Open Font License files in `assets/fonts/`. The original palette and guide are in `brand-source/`. Supplied team artwork remains subject to the team's and university's rights. No license to the university marks is implied.
