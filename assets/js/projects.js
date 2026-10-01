(function () {
  var projects = window.PROJECTS || [];
  var active = "all";
  var grid = document.querySelector("[data-project-grid]");
  var filters = document.querySelector("[data-tag-filters]");

  function withRoot(path) {
    return window.withRoot ? window.withRoot(path) : path;
  }

  var tags = {};
  projects.forEach(function (p) {
    (p.tags || []).forEach(function (t) {
      tags[t] = true;
    });
  });

  function chip(label, value) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tag filter-chip" + (value === active ? " is-active" : "");
    btn.textContent = label;
    btn.setAttribute("aria-pressed", value === active ? "true" : "false");
    btn.addEventListener("click", function () {
      active = value;
      paintFilters();
      render(true);
    });
    return btn;
  }

  function paintFilters() {
    if (!filters) return;
    filters.innerHTML = "";
    filters.appendChild(chip("All", "all"));
    Object.keys(tags)
      .sort()
      .forEach(function (t) {
        filters.appendChild(chip(t, t));
      });
  }

  function card(p) {
    var href = withRoot(p.href);
    return (
      '<a class="card" href="' +
      href +
      '">' +
      '<div class="card-media"><img src="' +
      withRoot(p.image) +
      '" alt="' +
      p.title +
      '" width="1200" height="750" loading="lazy" decoding="async"></div>' +
      '<div class="card-body">' +
      '<p class="label">' +
      (p.year || "") +
      "</p>" +
      "<h3>" +
      p.title +
      "</h3>" +
      "<p>" +
      p.blurb +
      "</p>" +
      '<div class="tag-row" style="margin-top:0.8rem">' +
      (p.tags || [])
        .map(function (t) {
          return '<span class="tag">' + t + "</span>";
        })
        .join("") +
      "</div></div></a>"
    );
  }

  function render(animate) {
    if (!grid) return;
    var list = projects.filter(function (p) {
      return active === "all" || (p.tags || []).indexOf(active) !== -1;
    });
    if (animate) grid.classList.add("is-filtering");
    window.setTimeout(
      function () {
        grid.innerHTML = list.map(card).join("");
        grid.classList.remove("is-filtering");
      },
      animate ? 160 : 0
    );
  }

  paintFilters();
  render(false);
})();
