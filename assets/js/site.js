/* Shared UI: header, native dialog menu, footer, and optional configured content.
 * Page copy stays in HTML so it is readable and editable without JavaScript.
 * This is a classic script (not a module) so opening index.html also works offline.
 */
(() => {
  "use strict";
  const config = window.SITE_CONFIG || {};
  const currentPage = document.body.dataset.page;
  const siteRoot = currentPage === "home" ? "./" : "../";
  const pages = [
    { id: "home", label: "Home", href: siteRoot },
    { id: "about", label: "About", href: `${siteRoot}about/` },
    { id: "sponsors", label: "Sponsors", href: `${siteRoot}sponsors/` },
    { id: "contact", label: "Contact", href: `${siteRoot}contact/` }
  ];
  const arrow = '<span class="arrow" aria-hidden="true">↗</span>';
  const header = document.querySelector("[data-site-header]");

  const aboutDropdown = mobile => `
    <details class="${mobile ? "mobile-about" : "nav-dropdown"}${currentPage === "about" ? " is-current" : ""}">
      <summary aria-label="About sections"><a href="${siteRoot}about/#top"${currentPage === "about" ? ' aria-current="page"' : ""}>About</a><svg class="dropdown-chevron" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m4 6 4 4 4-4"/></svg></summary>
      <div class="about-dropdown-panel"><ul class="about-submenu">
        <li><a href="${siteRoot}about/#team-information">Team information</a></li>
        <li><a href="${siteRoot}about/#competition-information">Competition information</a></li>
      </ul></div>
    </details>`;

  if (header) {
    header.innerHTML = `
      <div class="container nav-shell">
        <nav class="desktop-nav" aria-label="Main navigation">
          <div class="nav-group">${pages.slice(0, 2).map(page => page.id === "about" ? aboutDropdown(false) : `<a href="${page.href}"${page.id === currentPage ? ' aria-current="page"' : ""}>${page.label}</a>`).join("")}</div>
          <div class="nav-group nav-group-right">${pages.slice(2).map(page => `<a href="${page.href}"${page.id === currentPage ? ' aria-current="page"' : ""}>${page.label}</a>`).join("")}</div>
        </nav>
        <button class="menu-button" type="button" aria-label="Open navigation menu" aria-haspopup="dialog" aria-controls="site-menu" aria-expanded="false">
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h12"/></svg>
          <span>Menu</span>
        </button>
        <a class="brand-lockup" href="${siteRoot}" aria-label="BYU-I Formula Racing home">
          <img src="${siteRoot}assets/images/combined-crest.webp" alt="" width="1293" height="1217" decoding="async">
        </a>
      </div>
      <dialog class="site-menu" id="site-menu" aria-labelledby="menu-title">
        <div class="menu-top">
          <span class="menu-racing-mark" aria-hidden="true"><i></i><i></i><i></i></span>
          <h2 class="sr-only" id="menu-title">Navigation menu</h2>
          <button class="close-menu" type="button" aria-label="Close navigation menu" autofocus>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m6 6 12 12M18 6 6 18"/></svg>
          </button>
        </div>
        <nav aria-label="Main navigation">
          <ul class="menu-links">${pages.map(page => `
            <li>${page.id === "about" ? aboutDropdown(true) : `<a href="${page.href}"${page.id === currentPage ? ' aria-current="page"' : ""}>${page.label}${arrow}</a>`}</li>`).join("")}
          </ul>
        </nav>
      </dialog>`;

    const dialog = header.querySelector("dialog");
    const trigger = header.querySelector(".menu-button");
    const closeButton = header.querySelector(".close-menu");
    const mobileMenu = window.matchMedia("(max-width: 767px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animateMenuOpening = element => {
      element.getAnimations().forEach(animation => animation.cancel());
      if (reducedMotion.matches) return;
      return element.animate(
        [{ opacity: 0, transform: "translateY(-.5rem)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 160, easing: "ease-out" }
      );
    };
    let menuOpeningAnimation;
    const dropdowns = [...header.querySelectorAll("details")];
    dropdowns.forEach(dropdown => {
      const summary = dropdown.querySelector("summary");
      const submenu = dropdown.querySelector(".about-submenu");
      let openingAnimation;
      const openDropdown = () => {
        if (dropdown.open) return;
        dropdown.open = true;
        openingAnimation = animateMenuOpening(submenu);
      };
      dropdown.addEventListener("pointerenter", event => {
        if (event.pointerType === "mouse" && !mobileMenu.matches) openDropdown();
      });
      dropdown.addEventListener("pointerleave", event => {
        if (event.pointerType !== "mouse" || mobileMenu.matches) return;
        if (!dropdown.contains(document.activeElement)) dropdown.open = false;
      });
      // Start before the first paint: the asynchronous toggle event can reveal
      // the final position briefly before restarting the opening animation.
      summary.addEventListener("click", event => {
        if (event.target.closest("a")) return;
        event.preventDefault();
        openingAnimation?.cancel();
        if (dropdown.open) dropdown.open = false;
        else openDropdown();
      });
      dropdown.addEventListener("toggle", () => {
        if (!dropdown.open) {
          openingAnimation?.cancel();
        }
      });
      dropdown.addEventListener("keydown", event => {
        if (event.key !== "Escape" || !dropdown.open) return;
        event.preventDefault();
        event.stopPropagation();
        dropdown.open = false;
        dropdown.querySelector("summary").focus();
      });
      dropdown.addEventListener("focusout", () => {
        setTimeout(() => {
          if (!dropdown.contains(document.activeElement) &&
              (mobileMenu.matches || !dropdown.matches(":hover"))) dropdown.open = false;
        }, 0);
      });
    });
    document.addEventListener("pointerdown", event => {
      dropdowns.forEach(dropdown => {
        if (!dropdown.contains(event.target)) dropdown.open = false;
      });
    });
    dialog.querySelectorAll("a").forEach(link => link.addEventListener("click", () => dialog.close()));
    mobileMenu.addEventListener("change", () => {
      dropdowns.forEach(dropdown => { dropdown.open = false; });
      if (!mobileMenu.matches && dialog.open) dialog.close();
    });
    trigger.addEventListener("click", () => {
      if (dialog.open) return;
      dialog.showModal();
      trigger.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-open");
      menuOpeningAnimation = animateMenuOpening(dialog);
    });
    closeButton.addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () => {
      if (dialog.open) return; // Ignore an earlier close event after a rapid reopen.
      menuOpeningAnimation?.cancel();
      trigger.setAttribute("aria-expanded", "false");
      const focusTarget = mobileMenu.matches ? trigger : header.querySelector('.desktop-nav [aria-current="page"], .desktop-nav .is-current summary');
      focusTarget?.focus({ preventScroll: true });
      document.body.classList.remove("menu-open");
    });
    // Clicking the native backdrop closes the menu; clicks inside do not.
    dialog.addEventListener("click", event => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    // Escape, focus containment, and making the rest of the page inert are native
    // <dialog>.showModal() behaviors. Keep the native element when changing UI.
  }

  const footer = document.querySelector("[data-site-footer]");
  if (footer) {
    footer.innerHTML = `
      <div class="container">
        <div class="footer-main">
          <a class="footer-logo" href="${siteRoot}"><img src="${siteRoot}assets/images/crest-horizontal.webp" alt="BYU-I Formula Racing home" width="1983" height="793" loading="lazy" decoding="async"></a>
          <nav class="footer-nav" aria-label="Footer navigation">${pages.map(page =>
            `<a href="${page.href}"${page.id === currentPage ? ' aria-current="page"' : ""}>${page.label}</a>`).join("")}</nav>
        </div>
        <div class="footer-contact" aria-label="Contact and social links"><a class="social-link" data-team-email href="mailto:saeformula@byui.edu" aria-label="Email saeformula@byui.edu" title="Email saeformula@byui.edu"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3.5 6 8.5 6.5L20.5 6"/></svg></a><a class="social-link" data-social="linkedin" href="https://www.linkedin.com/company/byu-i-formula-racing/" aria-label="BYU-I Formula Racing on LinkedIn" title="BYU-I Formula Racing on LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="1" y="1" width="22" height="22" rx="2" fill="currentColor"/><g fill="#031f3d"><circle cx="6.5" cy="6.5" r="1.6"/><path d="M5 9h3v10H5zm5 0h3v1.4c.7-1.1 1.8-1.7 3.2-1.7 3 0 3.8 1.9 3.8 4.7V19h-3v-5c0-1.4-.1-2.6-1.8-2.6-1.8 0-2.2 1.4-2.2 2.7V19h-3z"/></g></svg></a><a class="social-link" data-social="instagram" href="https://www.instagram.com/byui.formula.racing/" aria-label="BYU-I Formula Racing on Instagram" title="BYU-I Formula Racing on Instagram"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a></div>
        <div class="footer-bottom"><p>© ${new Date().getFullYear()} BYU-I Formula Racing</p>
          <p data-footer-location></p></div>
      </div>`;
    footer.querySelector("[data-footer-location]").textContent = config.location || "Rexburg, Idaho";
  }

  const footerLogo = footer?.querySelector(".footer-logo");
  if (header && footerLogo && "IntersectionObserver" in window) {
    const footerObserver = new IntersectionObserver(([entry]) => {
      // Stay hidden if the logo scrolls above the viewport on short screens.
      header.classList.toggle("is-footer-visible", entry.isIntersecting || entry.boundingClientRect.top < 0);
    });
    footerObserver.observe(footerLogo);
  }

  document.querySelectorAll("[data-location]").forEach(node => { node.textContent = config.location || "Rexburg, Idaho"; });
  document.querySelectorAll("[data-institution]").forEach(node => { node.textContent = config.institution || "Brigham Young University–Idaho"; });

  // Allow only local relative asset paths or full HTTPS URLs; never javascript:.
  const safeURL = (value, localOnly = false) => typeof value === "string" && value.length > 0 &&
    ((localOnly || !/^https:\/\//i.test(value))
      ? /^(?:assets\/)[^\s<>"']+$/.test(value) && !value.split("/").includes("..")
      : /^https:\/\/[^\s<>"']+$/i.test(value));

  const publicEmail = (config.contactEmail || "").trim();
  document.querySelectorAll("[data-team-email]").forEach(link => {
    if (!/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(publicEmail)) return;
    link.href = `mailto:${publicEmail}`;
    link.setAttribute("aria-label", `Email ${publicEmail}`);
    link.title = `Email ${publicEmail}`;
  });
  document.querySelectorAll("[data-social]").forEach(link => {
    const url = config.socials?.[link.dataset.social];
    if (safeURL(url) && /^https:\/\//i.test(url)) link.href = url;
  });

  document.querySelectorAll("[data-sponsor-packet]").forEach(link => {
    if (!safeURL(config.sponsorPacket, true)) return;
    link.href = siteRoot + config.sponsorPacket;
    link.hidden = false;
  });

  document.querySelectorAll("[data-photo]").forEach(figure => {
    const photo = config.photos?.[figure.dataset.photo];
    if (!photo?.alt || !safeURL(photo.src, true)) return;
    const img = document.createElement("img");
    img.className = "team-photo";
    img.src = siteRoot + photo.src;
    img.alt = photo.alt;
    img.width = 1200;
    img.height = 900;
    img.loading = "lazy";
    img.decoding = "async";
    img.addEventListener("load", () => {
      figure.replaceChildren(img);
      if (photo.caption) {
        const caption = document.createElement("figcaption");
        caption.textContent = photo.caption;
        figure.append(caption);
      }
    }, { once: true });
    // Until a valid image has loaded, keep the honest placeholder visible.
  });

  const sponsorSection = document.querySelector("[data-sponsor-section]");
  if (sponsorSection && Array.isArray(config.sponsors)) {
    for (const sponsor of config.sponsors) {
      if (!sponsor.name || !safeURL(sponsor.logo, true)) continue;
      const group = sponsor.group === "major" ? "major" : "supporting";
      const grid = sponsorSection.querySelector(`[data-sponsor-grid="${group}"]`);
      const hasLink = safeURL(sponsor.url) && /^https:\/\//i.test(sponsor.url);
      const article = document.createElement(hasLink ? "a" : "article");
      article.className = "sponsor-entry";
      if (hasLink) article.href = sponsor.url;
      const img = document.createElement("img");
      img.src = siteRoot + sponsor.logo;
      img.alt = ""; // The adjacent heading supplies the sponsor name.
      img.loading = "lazy";
      img.width = 240;
      img.height = 80;
      const heading = document.createElement("h3");
      heading.textContent = sponsor.name;
      article.append(img, heading);
      const placeholder = grid.querySelector("[data-sponsor-placeholder]");
      if (placeholder) placeholder.replaceWith(article);
      else grid.append(article);
    }
  }
  // Warm only the four site documents; normal link navigation stays native.
  // Prefetch is a browser hint, so unsupported browsers simply ignore it.
  if (/^https?:$/.test(window.location.protocol)) {
    const prefetched = new Set();
    const pendingHovers = new WeakMap();
    const pagePaths = new Set(pages.map(page => new URL(page.href, document.baseURI).pathname));
    const canPrefetch = () => {
      const connection = navigator.connection;
      return document.visibilityState === "visible" &&
        !connection?.saveData && !/^(slow-)?2g$/.test(connection?.effectiveType || "");
    };
    const pageURL = link => {
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return null;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || !pagePaths.has(url.pathname) ||
          url.pathname === window.location.pathname) return null;
      url.hash = "";
      return url.href;
    };
    const prefetch = link => {
      if (!canPrefetch()) return;
      const href = pageURL(link);
      if (!href || prefetched.has(href)) return;
      const hint = document.createElement("link");
      if (hint.relList.supports && !hint.relList.supports("prefetch")) return;
      hint.rel = "prefetch";
      hint.as = "document";
      hint.href = href;
      prefetched.add(href);
      document.head.append(hint);
    };
    document.addEventListener("pointerover", event => {
      if (event.pointerType === "touch" || !canPrefetch()) return;
      const link = event.target.closest("a[href]");
      if (!pageURL(link) || link.contains(event.relatedTarget)) return;
      clearTimeout(pendingHovers.get(link));
      pendingHovers.set(link, setTimeout(() => {
        pendingHovers.delete(link);
        prefetch(link);
      }, 80));
    });
    document.addEventListener("pointerout", event => {
      const link = event.target.closest("a[href]");
      if (!link || link.contains(event.relatedTarget)) return;
      clearTimeout(pendingHovers.get(link));
      pendingHovers.delete(link);
    });
    document.addEventListener("focusin", event => prefetch(event.target.closest("a[href]")));
  }
})();
