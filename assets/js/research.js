(function () {
  var items = (window.RESEARCH || []).slice().sort(function (a, b) {
    if (a.status === b.status) return 0;
    return a.status === "Published" ? -1 : 1;
  });

  var list = document.querySelector("[data-research-list]");
  if (!list) return;

  list.innerHTML = items
    .map(function (r, i) {
      var links = (r.links || [])
        .map(function (l) {
          return (
            '<a class="btn" href="' +
            l.href +
            '"' +
            (l.href && l.href.charAt(0) !== "#" ? ' target="_blank" rel="noopener"' : "") +
            ">" +
            l.label +
            ' <span class="arrow" aria-hidden="true">→</span></a>'
          );
        })
        .join(" ");
      var tags = (r.tags || [])
        .map(function (t) {
          return '<span class="tag">' + t + "</span>";
        })
        .join("");
      var details = (r.details || [])
        .map(function (d) {
          return '<p class="label" style="margin-top:1rem">' + d.label + "</p><p>" + d.text + "</p>";
        })
        .join("");
      var absId = "abs-" + i;
      var chipClass = r.status === "Published" ? "chip-ok" : "chip-muted";
      return (
        '<article class="paper-card" data-reveal>' +
        '<div class="tag-row"><span class="tag">' +
        r.type +
        '</span><span class="chip ' +
        chipClass +
        '">' +
        r.status +
        "</span></div>" +
        "<h2 style=\"margin-top:0.8rem\">" +
        r.title +
        "</h2>" +
        '<p class="muted">' +
        r.venue +
        " · " +
        r.year +
        " · " +
        r.role +
        "</p>" +
        '<p class="label">Topic</p><p>' +
        r.topic +
        "</p>" +
        (tags ? '<div class="tag-row" style="margin-top:0.7rem">' + tags + "</div>" : "") +
        '<button class="abstract-btn" type="button" aria-expanded="false" aria-controls="' +
        absId +
        '">' +
        (details ? "Abstract and details" : "Abstract") +
        "</button>" +
        '<div id="' +
        absId +
        '" hidden><p style="margin-top:0.7rem">' +
        r.abstract +
        "</p>" +
        details +
        "</div>" +
        (links ? '<div class="tag-row" style="margin-top:1rem">' + links + "</div>" : "") +
        "</article>"
      );
    })
    .join("");

  list.addEventListener("click", function (e) {
    var btn = e.target.closest(".abstract-btn");
    if (!btn) return;
    var panel = document.getElementById(btn.getAttribute("aria-controls"));
    var open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", open ? "false" : "true");
    if (panel) panel.hidden = open;
  });
})();
