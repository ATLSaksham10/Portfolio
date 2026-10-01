(function () {
  var items = (window.FEATURED || []).slice().sort(function (a, b) {
    return String(b.date || "").localeCompare(String(a.date || ""));
  });
  var active = "all";
  var grid = document.querySelector("[data-featured-grid]");
  var filters = document.querySelector("[data-type-filters]");

  function withRoot(path) {
    return window.withRoot ? window.withRoot(path) : path;
  }

  var types = {};
  items.forEach(function (it) {
    if (it.type) types[it.type] = true;
  });

  function chip(label, value) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tag filter-chip" + (value === active ? " is-active" : "");
    btn.textContent = label;
    btn.setAttribute("aria-pressed", value === active ? "true" : "false");
    btn.addEventListener("click", function () {
      active = value;
      paint();
      render();
    });
    return btn;
  }

  function paint() {
    if (!filters) return;
    filters.innerHTML = "";
    filters.appendChild(chip("All", "all"));
    Object.keys(types).forEach(function (t) {
      filters.appendChild(chip(t, t));
    });
  }

  function render() {
    if (!grid) return;
    var list = items.filter(function (it) {
      return active === "all" || it.type === active;
    });
    grid.innerHTML = list
      .map(function (it) {
        var play =
          it.type === "video" ? '<span class="play-badge">Play</span>' : "";
        var ext =
          it.url && it.url.charAt(0) !== "#"
            ? ' target="_blank" rel="noopener"'
            : "";
        return (
          '<a class="card featured-card" href="' +
          it.url +
          '"' +
          ext +
          ">" +
          '<div class="card-media thumb-wrap"><img src="' +
          withRoot(it.thumb) +
          '" alt="' +
          it.title +
          '" width="1200" height="750" loading="lazy">' +
          play +
          "</div>" +
          '<div class="card-body">' +
          '<p class="label">' +
          it.outlet +
          " · " +
          it.date +
          "</p>" +
          "<h3>" +
          it.title +
          "</h3>" +
          "<p>" +
          it.blurb +
          "</p></div></a>"
        );
      })
      .join("");
  }

  paint();
  render();
})();
