# Team email signature

The standalone [HTML signature](email-signature.html) uses the approved horizontal team artwork, a table layout, and inline CSS. It displays the logo at 350 × 140 pixels above the team identity and clickable Instagram and LinkedIn links. The signature uses a PNG with Midnight Navy (`#031f3d`) baked into its background to keep the white lettering readable when email clients recolor HTML backgrounds. The original transparent PNG remains available separately. Text uses Midnight Navy and Action Blue (`#005eb8`) from `assets/css/tokens.css`, with Arial as an email-safe font.

## Files and public URLs

| Purpose | Repository file | Public HTTPS URL after deployment |
| --- | --- | --- |
| Original horizontal logo | `assets/images/crest-horizontal.webp` | Existing website artwork; keep unchanged |
| Transparent PNG, 800 × 320, approximately 76 KiB | `assets/images/email-signature.png` | https://byui-racing.com/assets/images/email-signature.png |
| Recommended email PNG, 800 × 320, opaque navy background | `assets/images/email-signature-navy.png` | https://byui-racing.com/assets/images/email-signature-navy.png |
| Signature to copy into Outlook | `docs/email-signature.html` | https://byui-racing.com/docs/email-signature.html |

The transparent PNG was proportionally resized from the supplied 1983 × 793 WebP and saved as an optimized RGBA PNG, retaining its transparency and artwork. The navy version composites that PNG onto `#031f3d` without changing the dimensions or artwork. Email clients can use either PNG directly without WebP support.

Some email clients recolor HTML backgrounds in dark mode while leaving logo pixels unchanged. With the transparent logo, a lightened table background can make the white “Formula Racing” lettering hard to read. Baking the navy into the recommended image removes that dependence on the table background. Client behavior still varies; verify a received message in the affected Gmail and Outlook versions. See [Microsoft's guidance on email dark mode](https://learn.microsoft.com/en-us/dynamics365/customer-insights/journeys/email-dark-mode).

If you installed the earlier transparent version, reopen the public HTML signature, copy it again, and replace the saved signature in Outlook. The new image filename helps avoid an old cached transparent image; already sent messages retain their previous signature.

The domain comes from the repository's existing `CNAME`: `byui-racing.com`. Each image URL consists of that HTTPS origin followed by its `/assets/images/` path; it does not include the repository name. Keep this domain and these file paths in service to preserve the URLs. These are stable public asset URLs without tokens or expiry, rather than a guarantee that the domain or hosting will exist forever.

## Publishing with the existing website

The site has four public pages: `index.html`, `about/index.html`, `sponsors/index.html`, and `contact/index.html`. Shared static files are under `assets/`; maintenance documents are under `docs/`. The root legacy `.html` redirects remain unchanged.

The repository is [KristofferLocke/CrestBYUIWebsite](https://github.com/KristofferLocke/CrestBYUIWebsite). Existing successful Pages deployments use `main`, and the website is served by GitHub Pages at the custom domain. The repository's [publishing guide](PUBLISHING.md) specifies publishing `main` from `/(root)`, with `.nojekyll` at the root. Adding the PNG under `assets/images/` includes it in that deployment without a new workflow, dependency, or build command. See [GitHub's publishing source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

Keep the current Pages source and custom domain. The available connector cannot read the Pages settings directly, and an unauthenticated settings request returned 404; if deployment needs troubleshooting, inspect **Settings → Pages** in GitHub. Do not switch the publishing folder to `/docs`, which would exclude the website and PNG.

Commit and push only the signature changes through the team's normal publishing process, then wait for the **pages build and deployment** run to finish. The signature files are:

```text
assets/images/email-signature.png
assets/images/email-signature-navy.png
docs/email-signature.html
docs/EMAIL-SIGNATURE.md
README.md
```

The existing HTTPS website works with the configured domain. No Cloudflare DNS, SSL, Workers, or `wrangler.jsonc` changes are needed to add this static image. The email signature intentionally uses an absolute HTTPS image URL because it must work outside the website; ordinary website navigation and asset links remain relative. See [GitHub's custom domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages).

## Install in Outlook

First deploy the files and open https://byui-racing.com/assets/images/email-signature-navy.png in a private browser window. It should show the image directly without signing in. Then open https://byui-racing.com/docs/email-signature.html in a browser and wait for the logo to appear. Select the rendered signature with **Ctrl+A**, then **Ctrl+C**. Copy the displayed content, not the HTML source or the URL.

For **new Outlook for Windows or Outlook on the web**:

1. Open **Settings → Accounts → Signatures** and select the team account. If your version uses **Mail → Compose and reply**, open its signature editor instead.
2. Add a signature named **BYU–Idaho Formula Racing**.
3. Paste the rendered signature into the editor using **Ctrl+V**, preserving source formatting if prompted.
4. Choose it for new messages and, if desired, replies and forwards; save.

For **classic Outlook for Windows**:

1. Open **File → Options → Mail → Signatures** (or **New Email → Signature → Signatures**).
2. Select the team account, choose **New**, and name the signature **BYU–Idaho Formula Racing**.
3. Paste the rendered signature into **Edit signature**, preserving formatting.
4. Set the defaults for new messages and replies/forwards, then save with **OK**.

Compose a fresh message in **HTML** format to check the result. The logo should be about 350 pixels wide, without stretching; both social links should work. Outlook may require separate signature setup for other accounts, devices, or clients. These paths follow [Microsoft's Outlook signature instructions](https://support.microsoft.com/en-us/outlook/mail/how-to-add-and-change-an-email-signature-in-outlook).

Outlook versions can rewrite pasted HTML or embed a copy of the image. Check a received test message, not just the editor. If retaining the remote image reference is required, inspect the received message's HTML and confirm its `img` source still points to the hosted PNG rather than a local path or `cid:` attachment. A hosted source in the template does not force Outlook to retain it. Recipient clients can block remote pictures until the reader allows them; the signature's text identity and social links remain usable. Image blocking does not by itself mean hosting failed.

## Update the logo later

1. Obtain the approved horizontal artwork. Keep original brand files intact; make an email export separately. If replacement artwork is missing, place the approved source under `assets/images/` with a descriptive lowercase, hyphenated filename before exporting.
2. In an image editor, export an optimized **PNG with transparency**, 800 pixels wide, with proportional scaling enabled, as `assets/images/email-signature.png`. Export a second copy composited onto a solid Midnight Navy (`#031f3d`) background as `assets/images/email-signature-navy.png`. Keep the source artwork and transparent export intact. Do not stretch, crop, or recolor the logo. The current outputs are 800 × 320; aim for under 100 KiB each where practical without harming the artwork.
3. Replace both PNGs, keeping their exact filenames and paths. The HTML signature uses the navy version. If the new aspect ratio differs, update the HTML image's `height` attribute and inline height to `round(350 × exported height / exported width)`. Keep both width values at 350.
4. Run `python scripts/check_site.py` (or `py scripts/check_site.py` on Windows), review the signature, and publish the replacement through the existing Pages process.
5. Check the public PNG after deployment. A cached copy may persist in browsers, Cloudflare, or email image proxies. Hard-refresh first; if Cloudflare is caching the image and it remains stale, purge only this exact asset URL through the existing dashboard. A DNS change is unnecessary.
6. Recopy and save the signature in Outlook if its HTML changed or Outlook embedded the previous image. Previously sent messages and recipient caches may retain the older logo.

## Brief verification checklist

- [ ] The Pages deployment for the published commit completed successfully.
- [ ] Both public PNG URLs load over HTTPS without authentication, return `200` and `Content-Type: image/png`, and contain the intended 800-pixel-wide images.
- [ ] The original PNG retains transparency; the signature uses the opaque navy PNG and shows the complete horizontal artwork at approximately 350 pixels wide.
- [ ] The signature says **BYU–Idaho Formula Racing**, with no personal name, position, or separate university line.
- [ ] Instagram opens `https://www.instagram.com/byui.formula.racing/` and LinkedIn opens `https://www.linkedin.com/company/byu-i-formula-racing/home/`.
- [ ] A received HTML email looks correct in the team's Outlook client and Gmail, on a phone, and with remote images blocked; check light and dark mode, including the white lettering inside the logo.
- [ ] If a remote image reference is required, the received HTML still references the public PNG URL.
- [ ] The website's four pages, design, navigation, contact behavior, and Cloudflare DNS remain unchanged.
