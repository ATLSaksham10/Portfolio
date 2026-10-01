(function () {
  var site = window.SITE || {};
  var root = (document.body.getAttribute("data-root") || "");

  function withRoot(path) {
    return window.withRoot ? window.withRoot(path) : root + path;
  }

  var nameEl = document.querySelector("[data-site-name]");
  var tagEl = document.querySelector("[data-site-tagline]");
  if (nameEl) nameEl.textContent = site.name || "Saksham Garg";
  if (tagEl) tagEl.textContent = site.tagline || "";

  var tools = document.querySelector("[data-tools]");
  if (tools && site.tools) {
    tools.innerHTML = site.tools
      .map(function (t) {
        return '<span class="tag">' + t + "</span>";
      })
      .join("");
  }

  var flights = (window.DRONE && window.DRONE.flights) || [];
  var minutes = flights.reduce(function (sum, f) {
    return sum + (Number(f.minutes) || 0);
  }, 0);
  var hours = minutes / 60;
  var projects = (window.PROJECTS || []).filter(function (p) {
    return !p.comingSoon;
  }).length;
  var pubs = (window.RESEARCH || []).filter(function (r) {
    return r.status === "Published";
  }).length;

  function setCount(sel, value, decimals) {
    var el = document.querySelector(sel);
    if (!el) return;
    el.setAttribute("data-count", String(value));
    if (decimals) el.setAttribute("data-decimals", String(decimals));
    el.textContent = decimals ? Number(value).toFixed(decimals) : String(value);
  }

  setCount("[data-stat-flights]", flights.length);
  setCount("[data-stat-hours]", hours, 1);
  setCount("[data-stat-projects]", projects);
  setCount("[data-stat-pubs]", pubs);

  var list = document.querySelector("[data-timeline]");
  if (list && window.TIMELINE) {
    list.innerHTML =
      '<div class="timeline-line" data-timeline-line></div>' +
      window.TIMELINE.map(function (item) {
        var tags = (item.tags || [])
          .map(function (t) {
            return '<span class="tag">' + t + "</span>";
          })
          .join("");
        var href = withRoot(item.href);
        return (
          '<article class="timeline-item">' +
          '<span class="timeline-node" aria-hidden="true"></span>' +
          '<div class="timeline-card">' +
          '<p class="timeline-date">' +
          item.dateLabel +
          "</p>" +
          "<h3>" +
          item.title +
          "</h3>" +
          '<p class="muted">' +
          item.org +
          " · " +
          item.location +
          "</p>" +
          "<p>" +
          item.summary +
          "</p>" +
          (tags ? '<div class="tag-row" style="margin:0.7rem 0 1rem">' + tags + "</div>" : "") +
          (item.href
            ? '<a class="btn" style="margin-top:0.7rem" href="' +
              href +
              '">View project <span class="arrow" aria-hidden="true">→</span></a>'
            : "") +
          "</div></article>"
        );
      }).join("");
  }
})();
