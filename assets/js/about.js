(function () {
  var site = window.SITE || {};

  var hobbies = document.querySelector("[data-hobbies]");
  if (hobbies && site.hobbies) {
    hobbies.innerHTML = site.hobbies
      .map(function (h) {
        return (
          '<article class="card" style="padding:1.1rem"><h3>' +
          h.label +
          "</h3><p>" +
          h.note +
          "</p></article>"
        );
      })
      .join("");
  }

  var tools = document.querySelector("[data-about-tools]");
  if (tools && site.tools) {
    tools.innerHTML = site.tools
      .map(function (t) {
        return '<span class="tag">' + t + "</span>";
      })
      .join("");
  }

  var mailEl = document.querySelector("[data-email-link]");
  if (mailEl && site.email) {
    var href = "mailto:" + site.email.user + "@" + site.email.domain;
    mailEl.setAttribute("href", href);
    mailEl.textContent = site.email.user + "@" + site.email.domain;
  }

  var ig = document.querySelector("[data-ig]");
  var li = document.querySelector("[data-li]");
  var gh = document.querySelector("[data-gh]");
  var resume = document.querySelector("[data-resume]");
  if (ig && site.socials) ig.href = site.socials.instagram;
  if (li && site.socials) li.href = site.socials.linkedin;
  if (gh && site.socials) gh.href = site.socials.github;
  if (resume) resume.href = window.withRoot ? window.withRoot(site.resume) : site.resume;

  var lightbox = document.querySelector("[data-lightbox]");
  var lightboxImg = lightbox && lightbox.querySelector("img");
  var closeBtn = lightbox && lightbox.querySelector("[data-lightbox-close]");

  function closeLb() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("hidden", "");
  }

  document.querySelectorAll("[data-photo]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!lightbox || !lightboxImg) return;
      var img = btn.querySelector("img");
      lightboxImg.src = img.getAttribute("src");
      lightboxImg.alt = img.getAttribute("alt") || "";
      lightbox.removeAttribute("hidden");
      lightbox.classList.add("is-open");
      if (closeBtn) closeBtn.focus();
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeLb);
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLb();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLb();
  });
})();
