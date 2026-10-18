# Project instructions for future code assistants

- This is a four-page HTML/CSS/JavaScript website. Preserve the no-build setup and four-page scope unless explicitly asked otherwise.
- Read README.md and the relevant section of docs/EDITING.md before changing structure.
- Page copy: index.html, about/index.html, sponsors/index.html, contact/index.html. Inner pages use ../ for assets and navigation; preserve same-document skip links. Shared settings: assets/js/config.js. Header/menu/footer: assets/js/site.js. Contact behavior: assets/js/contact.js.
- Preserve the source brand system. tokens.css contains the supplied base design tokens; site.css contains component styles and responsive overrides.
- Keep links relative so repository-based GitHub Pages URLs work. Do not add a hardcoded repository base path.
- Keep fallback HTML navigation working when JS is disabled. Preserve skip links, visible focus, form labels, dialog keyboard behavior, and reduced-motion support.
- Sponsorship is in-kind goods, services, and assistance. Do not add cash tiers or invent sponsors, performance data, results, or contact information.
- Contact is a local message builder and email draft link. Do not imply server-side delivery. No credentials, analytics, backend, or package dependencies are required.
- Run `python scripts/check_site.py` after edits. Use browser checks for layout/menu/contact changes.
- Avoid editing brand-source assets as a side effect of site work. Keep bundled font licenses.


# Website Development Instructions

This project uses vanilla HTML, CSS, and JavaScript.

## Scope
- Make only changes necessary for the request.
- Preserve existing layout and functionality.
- Avoid adding frameworks or dependencies.
- Prefer editing existing components over rewriting files.

## Context Efficiency
- Search for relevant selectors and functions first.
- Read only the necessary file sections.
- Do not repeatedly read unchanged files.
- Avoid scanning unrelated folders.
- Do not inspect generated or dependency files.

## Implementation
- Prefer CSS fixes for visual problems.
- Use JavaScript only when behavior is required.
- Reuse existing styles and CSS variables.
- Keep HTML semantic and accessible.
- Avoid unnecessary refactoring.

## Verification
- Run targeted checks on modified files.
- Do not run full test suites for minor CSS changes.
- Report any checks that were not performed.

## Output
- Summarize changes in 2-4 sentences.
- Mention modified files and remaining issues.
- Do not reproduce entire files in responses.
