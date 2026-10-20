# VS Code to GitHub Pages

The project is plain static files. GitHub Pages can publish them directly. Local links are relative so both account sites and repository sites work.

## Put the project in a repository

1. Create a GitHub repository, for example `byui-formula-racing`.
2. Put this project's **contents** at the repository root. `index.html` should be at the top level, next to `about.html` and `assets/`.
3. Commit and push the files using VS Code's Source Control interface or the terminal.

For a new local repository, run these commands from the project folder. Replace `YOUR-ACCOUNT` and the repository name with your own values:

```bash
git init -b main
git add .
git commit -m "Add BYU-I Formula Racing website"
git remote add origin https://github.com/YOUR-ACCOUNT/byui-formula-racing.git
git push -u origin main
```

Use an empty remote repository for this sequence. If you created a remote README first, clone that repository into VS Code, copy the website files into it, and commit from there instead.

## Turn on publishing

1. Open the repository's **Settings → Pages**.
2. Choose **Deploy from a branch**, then **main** and **/(root)**. Save.
3. Open the published address shown by GitHub after deployment completes.

Keep `.nojekyll` at the root; it tells Pages to serve this static project directly. On GitHub Free, use a public repository. See the [official GitHub Pages guide](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) for current settings and account requirements.

## Future edits

Edit locally, check the site, commit, and push:

```bash
python scripts/check_site.py
git add .
git commit -m "Update team content"
git push
```

Keep paths relative (`assets/images/photo.webp`, not `/assets/images/photo.webp`). Filename capitalization must match exactly. No deployment workflow file or build tool is needed for this setup.

GitHub Pages does not process forms. `contact.html` uses a normal HTML POST to `https://formspree.io/f/xbgdbqjv`, opening Formspree for hosted reCAPTCHA and confirmation. This works with Formspree's built-in CAPTCHA without a custom key or AJAX. Confirm activation, notification recipients, allowed domains, spam protection, and submission limits in the Formspree dashboard. Test the published form with an approved message before relying on it; do not add private Formspree API keys to the site.
