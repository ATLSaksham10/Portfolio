(function () {
  var site = window.SITE;
  if (!site) return;

  var body = document.body;
  var root = body.getAttribute("data-root") || "";
  var page = body.getAttribute("data-page") || "";

  /* Missing photos fail gracefully: gallery/figure/header photos are hidden,
     everything else (cards, portrait, About grid) falls back to the placeholder. */
  function imgFallback(img) {
    if (!img || img.tagName !== "IMG" || img.getAttribute("data-fallback")) return;
    img.setAttribute("data-fallback", "1");
    var grid = img.closest(".gallery-grid");
    if (grid || img.closest("figure") || img.closest(".project-header-media")) {
      var holder = img.closest("figure") || img;
      holder.remove();
      if (grid && !grid.querySelector("img")) {
        var sec = grid.closest("section");
        if (sec) sec.hidden = true;
      }
      return;
    }
    img.src = root + "assets/img/placeholder.svg";
  }
  document.addEventListener("error", function (e) { imgFallback(e.target); }, true);
  window.addEventListener("load", function () {
    document.querySelectorAll("img").forEach(function (img) {
      if (img.complete && img.naturalWidth === 0) imgFallback(img);
    });
  });

  window.withRoot = function (path) {
    if (!path) return "#";
    if (/^(https?:|mailto:|tel:|#|data:)/i.test(path)) return path;
    return root + path;
  };

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function icon(name) {
    var paths = {
      instagram:
        '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>',
      linkedin:
        '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7.5v.01M12 17v-4.5a2 2 0 0 1 4 0V17"/>',
      github:
        '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.1-1.5 6.1-6.6A5 5 0 0 0 18 4.8 4.6 4.6 0 0 0 17.9 1S16.7.7 14 2.6a13.4 13.4 0 0 0-7 0C4.3.7 3.1 1 3.1 1A4.6 4.6 0 0 0 3 4.8 5 5 0 0 0 1.8 8.9c0 5.1 3.1 6.3 6.1 6.6A3.4 3.4 0 0 0 7 18.1V22"/>',
      email:
        '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>'
    };
    return (
      '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      (paths[name] || "") +
      "</svg>"
    );
  }

  function navAnchors(extraClass) {
    return (site.nav || [])
      .map(function (item) {
        var current = item.page === page ? ' aria-current="page"' : "";
        return (
          '<a class="' +
          (extraClass || "") +
          '" href="' +
          esc(window.withRoot(item.href)) +
          '"' +
          current +
          ">" +
          esc(item.label) +
          "</a>"
        );
      })
      .join("");
  }

  var resumeHref = window.withRoot(site.resume);
  var resumeBtn =
    '<a class="btn" href="' +
    esc(resumeHref) +
    '" target="_blank" rel="noopener">Resume <span class="arrow" aria-hidden="true">→</span></a>';

  var navEl = document.getElementById("site-nav");
  if (navEl) {
    navEl.innerHTML =
      '<header class="site-header" id="site-header">' +
      '<div class="wrap nav-bar">' +
      '<a class="wordmark" href="' +
      esc(window.withRoot("index.html")) +
      '">' +
      '<span class="wordmark-name">' +
      esc(site.name) +
      "</span>" +
      '<span class="wordmark-tag">Engineering Portfolio</span></a>' +
      '<nav class="nav-desktop" aria-label="Primary">' +
      navAnchors() +
      resumeBtn +
      "</nav>" +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-overlay" aria-label="Open menu">' +
      "<span></span></button>" +
      "</div></header>" +
      '<div class="nav-overlay" id="nav-overlay" hidden>' +
      '<nav aria-label="Mobile">' +
      navAnchors() +
      resumeBtn +
      "</nav></div>";
  }

  var mail = "mailto:" + (site.email.user || "") + "@" + (site.email.domain || "");
  var socials = site.socials || {};
  var footerEl = document.getElementById("site-footer");
  if (footerEl) {
    footerEl.innerHTML =
      '<footer class="site-footer"><div class="wrap">' +
      '<div class="footer-row">' +
      "<div><a class=\"wordmark\" href=\"" +
      esc(window.withRoot("index.html")) +
      '"><span class="wordmark-name">' +
      esc(site.name) +
      '</span><span class="wordmark-tag">Engineering Portfolio</span></a>' +
      '<p class="muted" style="margin-top:0.7rem;max-width:28rem">' +
      esc(site.tagline) +
      "</p></div>" +
      '<div class="socials">' +
      '<a href="' +
      esc(socials.instagram) +
      '" target="_blank" rel="noopener" aria-label="Instagram">' +
      icon("instagram") +
      "</a>" +
      '<a href="' +
      esc(mail) +
      '" aria-label="Email">' +
      icon("email") +
      "</a>" +
      '<a href="' +
      esc(socials.linkedin) +
      '" target="_blank" rel="noopener" aria-label="LinkedIn">' +
      icon("linkedin") +
      "</a>" +
      '<a href="' +
      esc(socials.github) +
      '" target="_blank" rel="noopener" aria-label="GitHub">' +
      icon("github") +
      "</a>" +
      "</div></div>" +
      '<p class="footer-copy">© ' +
      new Date().getFullYear() +
      " " +
      esc(site.fullName || site.name) +
      "</p>" +
      "</div></footer>";
  }
})();
