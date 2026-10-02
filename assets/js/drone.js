(function () {
  var drone = window.DRONE || { defaults: {}, flights: [] };
  var defaults = drone.defaults || {};
  var rows = (drone.flights || []).map(function (f) {
    return Object.assign({}, defaults, f);
  });

  var dash = "—";
  var sortKey = "date";
  var sortDir = -1;
  var yearFilter = "all";
  var query = "";

  function cell(v) {
    return v === undefined || v === null || v === "" ? dash : String(v);
  }

  function duration(mins) {
    var m = Number(mins) || 0;
    var h = Math.floor(m / 60);
    var r = m % 60;
    return h + ":" + String(r).padStart(2, "0");
  }

  function parseDate(d) {
    var t = Date.parse(d);
    return isNaN(t) ? 0 : t;
  }

  function yearOf(d) {
    if (!d) return "";
    var m = String(d).match(/\d{4}/);
    return m ? m[0] : "";
  }

  function laancChip(v) {
    if (v === "approved") return '<span class="chip chip-ok">Approved</span>';
    if (v === "not-needed") return '<span class="chip chip-muted">Not needed</span>';
    if (v === "denied") return '<span class="chip chip-no">Denied</span>';
    return '<span class="chip">' + dash + "</span>";
  }

  function filtered() {
    return rows
      .filter(function (f) {
        var y = yearOf(f.date);
        if (yearFilter !== "all" && y !== yearFilter) return false;
        if (!query) return true;
        var hay = ((f.location || "") + " " + (f.purpose || "")).toLowerCase();
        return hay.indexOf(query) !== -1;
      })
      .sort(function (a, b) {
        var av = a[sortKey];
        var bv = b[sortKey];
        if (sortKey === "date") return (parseDate(av) - parseDate(bv)) * sortDir;
        if (sortKey === "minutes" || sortKey === "altFt") {
          return ((Number(av) || 0) - (Number(bv) || 0)) * sortDir;
        }
        return String(av || "").localeCompare(String(bv || "")) * sortDir;
      });
  }

  function stats(list) {
    var totalMin = list.reduce(function (s, f) {
      return s + (Number(f.minutes) || 0);
    }, 0);
    var locs = {};
    list.forEach(function (f) {
      if (f.location) locs[f.location] = true;
    });
    var approvals = list.filter(function (f) {
      return f.laanc === "approved";
    }).length;
    return {
      flights: list.length,
      time: duration(totalMin),
      locations: Object.keys(locs).length,
      approvals: approvals
    };
  }

  function renderStats(list) {
    var s = stats(list);
    var map = {
      "[data-drone-flights]": s.flights,
      "[data-drone-locations]": s.locations,
      "[data-drone-approvals]": s.approvals
    };
    Object.keys(map).forEach(function (sel) {
      var el = document.querySelector(sel);
      if (!el) return;
      el.setAttribute("data-count", String(map[sel]));
      el.textContent = String(map[sel]);
    });
    var timeEl = document.querySelector("[data-drone-time]");
    if (timeEl) timeEl.textContent = s.time;
  }

  function td(label, html) {
    return '<td data-label="' + label + '">' + html + "</td>";
  }

  function renderTable() {
    var tbody = document.querySelector("[data-flight-body]");
    var empty = document.querySelector("[data-flight-empty]");
    if (!tbody) return;
    var list = filtered();
    renderStats(rows);
    if (!list.length) {
      tbody.innerHTML = "";
      if (empty) {
        empty.hidden = false;
        empty.textContent = rows.length
          ? "No flights match these filters."
          : "No flights logged yet.";
      }
      return;
    }
    if (empty) empty.hidden = true;
    var frag = document.createDocumentFragment();
    var wrap = document.createElement("tbody");
    wrap.innerHTML = list
      .map(function (f) {
        return (
          "<tr>" +
          td("Date", cell(f.date)) +
          td("Drone", cell(f.drone)) +
          td("Location", cell(f.location)) +
          td("Purpose", cell(f.purpose)) +
          td("Duration", duration(f.minutes)) +
          td("Airspace", cell(f.airspace)) +
          td("Altitude (ft)", cell(f.altFt)) +
          td("LAANC", laancChip(f.laanc)) +
          td("Auth ID", cell(f.authId)) +
          td("Notes", cell(f.notes)) +
          "</tr>"
        );
      })
      .join("");
    while (wrap.firstChild) frag.appendChild(wrap.firstChild);
    tbody.innerHTML = "";
    tbody.appendChild(frag);
  }

  var yearSel = document.querySelector("[data-year-filter]");
  if (yearSel) {
    var years = {};
    rows.forEach(function (f) {
      var y = yearOf(f.date);
      if (y) years[y] = true;
    });
    Object.keys(years)
      .sort()
      .reverse()
      .forEach(function (y) {
        var opt = document.createElement("option");
        opt.value = y;
        opt.textContent = y;
        yearSel.appendChild(opt);
      });
    yearSel.addEventListener("change", function () {
      yearFilter = yearSel.value;
      renderTable();
    });
  }

  var search = document.querySelector("[data-flight-search]");
  if (search) {
    search.addEventListener("input", function () {
      query = search.value.trim().toLowerCase();
      renderTable();
    });
  }

  document.querySelectorAll("[data-sort]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var key = btn.getAttribute("data-sort");
      if (sortKey === key) sortDir *= -1;
      else {
        sortKey = key;
        sortDir = key === "date" ? -1 : 1;
      }
      renderTable();
    });
  });

  renderTable();
})();
