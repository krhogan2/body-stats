(function () {
  "use strict";

  // Height is FIXED at 5'6" = 66 inches. Not an input. Do not add a field.
  var HEIGHT_IN = 66;
  var BMI_FACTOR = 703;

  function bodyFatPercent(lb) {
    if (!isFiniteNumber(lb) || lb <= 115) return null;
    return ((lb - 115) / lb) * 100;
  }

  function bodyMassIndex(lb) {
    if (!isFiniteNumber(lb) || lb <= 0) return null;
    return (lb / (HEIGHT_IN * HEIGHT_IN)) * BMI_FACTOR;
  }

  function isFiniteNumber(n) {
    return typeof n === "number" && Number.isFinite(n);
  }

  function parseISODate(value) {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    var parts = value.split("-").map(Number);
    var dt = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
    if (
      dt.getUTCFullYear() !== parts[0] ||
      dt.getUTCMonth() !== parts[1] - 1 ||
      dt.getUTCDate() !== parts[2]
    ) {
      return null;
    }
    return dt;
  }

  function parseWeighIns(raw) {
    var rows = [];
    (raw || []).forEach(function (item) {
      if (!item) return;
      var date = parseISODate(item.date);
      var lb = Number(item.lb);
      if (!date || !isFiniteNumber(lb) || lb <= 0) return;
      rows.push({
        iso: item.date,
        date: date,
        lb: lb,
        bf: bodyFatPercent(lb),
        bmi: bodyMassIndex(lb),
      });
    });
    rows.sort(function (a, b) {
      return a.date.getTime() - b.date.getTime();
    });
    return rows;
  }

  function formatLb(n) {
    return n.toFixed(1);
  }

  function formatPct(n) {
    return n.toFixed(1) + "%";
  }

  function formatSignedLb(n) {
    var abs = Math.abs(n).toFixed(1);
    if (n > 0.05) return "+" + abs + " lb";
    if (n < -0.05) return "−" + abs + " lb";
    return "even";
  }

  function formatSignedPct(n) {
    var abs = Math.abs(n).toFixed(1) + "%";
    if (n > 0.05) return "+" + abs;
    if (n < -0.05) return "−" + abs;
    return "0.0%";
  }

  function trendClass(n) {
    if (n < -0.05) return "down";
    if (n > 0.05) return "up";
    return "";
  }

  function prettyDate(iso) {
    var parts = iso.split("-").map(Number);
    var dt = new Date(parts[0], parts[1] - 1, parts[2]);
    return dt.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function changeOverDays(sorted, days) {
    if (sorted.length < 2) return null;
    var latest = sorted[sorted.length - 1];
    var cutoff = latest.date.getTime() - days * 86400000;
    var baseline = null;
    for (var i = 0; i < sorted.length; i++) {
      if (sorted[i].date.getTime() <= cutoff) baseline = sorted[i];
    }
    if (!baseline || baseline === latest) return null;
    return {
      lbs: latest.lb - baseline.lb,
      pct: ((latest.lb - baseline.lb) / baseline.lb) * 100,
    };
  }

  function allTimeChange(sorted) {
    if (sorted.length < 2) return null;
    var first = sorted[0];
    var latest = sorted[sorted.length - 1];
    return {
      lbs: latest.lb - first.lb,
      pct: ((latest.lb - first.lb) / first.lb) * 100,
    };
  }

  function weeklyAverage(sorted) {
    if (!sorted.length) return null;
    var latest = sorted[sorted.length - 1].date.getTime();
    var cutoff = latest - 7 * 86400000;
    var pts = sorted.filter(function (row) {
      return row.date.getTime() >= cutoff;
    });
    if (pts.length < 2) return null;
    var sum = pts.reduce(function (acc, row) { return acc + row.lb; }, 0);
    return { avg: sum / pts.length, count: pts.length };
  }

  function setText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function setTrend(id, delta) {
    var el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("up", "down");
    if (delta !== null) {
      var cls = trendClass(delta);
      if (cls) el.classList.add(cls);
    }
  }

  function fillChange(idValue, idSub, change) {
    if (!change) {
      setText(idValue, "—");
      setText(idSub, "need an older point");
      setTrend(idValue, null);
      return;
    }
    setText(idValue, formatSignedPct(change.pct));
    setText(idSub, formatSignedLb(change.lbs));
    setTrend(idValue, change.pct);
  }

  function drawSparkline(sorted) {
    var svg = document.getElementById("sparkline");
    if (!svg) return;
    svg.replaceChildren();
    if (sorted.length < 2) return;
    var weights = sorted.map(function (row) { return row.lb; });
    var min = Math.min.apply(null, weights);
    var max = Math.max.apply(null, weights);
    var span = max - min || 1;
    var w = 160;
    var h = 40;
    var pad = 3;
    var points = weights.map(function (lb, i) {
      var x = pad + (i / (weights.length - 1)) * (w - pad * 2);
      var y = pad + (1 - (lb - min) / span) * (h - pad * 2);
      return x.toFixed(1) + "," + y.toFixed(1);
    });
    var polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    polyline.setAttribute("points", points.join(" "));
    polyline.setAttribute("fill", "none");
    polyline.setAttribute("stroke", "#ff7a5c");
    polyline.setAttribute("stroke-width", "3");
    polyline.setAttribute("stroke-linecap", "round");
    polyline.setAttribute("stroke-linejoin", "round");
    svg.appendChild(polyline);
  }

  function paintRange(sorted) {
    var now = document.getElementById("range-now");
    if (!now || sorted.length < 1) return;
    var start = sorted[0].lb;
    var latest = sorted[sorted.length - 1].lb;
    var lo = start * 0.9;
    var hi = start * 1.1;
    var pct = ((latest - lo) / (hi - lo)) * 100;
    pct = Math.min(100, Math.max(0, pct));
    now.style.left = pct + "%";
    now.textContent = formatLb(latest) + " lb";
    setText("range-lo", formatLb(lo) + " · −10%");
    setText("range-mid", formatLb(start) + " start");
    setText("range-hi", formatLb(hi) + " · +10%");
    var delta = ((latest - start) / start) * 100;
    setText(
      "band-copy",
      "Start " + formatLb(start) + " lb. Latest is " + formatSignedPct(delta) +
        " from that first weigh-in. The band is ±10%."
    );
  }

  function chartDefaults() {
    if (!window.Chart) return;
    Chart.defaults.font.family = "Nunito, system-ui, sans-serif";
    Chart.defaults.font.weight = "700";
    Chart.defaults.color = "#6d648c";
    Chart.defaults.plugins.legend.labels.boxWidth = 12;
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    Chart.defaults.elements.point.radius = 4;
    Chart.defaults.elements.point.hoverRadius = 6;
    Chart.defaults.elements.line.tension = 0.35;
    Chart.defaults.elements.line.borderWidth = 3;
  }

  function labels(sorted) {
    return sorted.map(function (row) { return prettyDate(row.iso); });
  }

  function makeLineChart(canvasId, datasets, extra) {
    var canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return null;
    extra = extra || {};
    return new Chart(canvas, {
      type: "line",
      data: { labels: extra.labels || [], datasets: datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: extra.legend !== false },
          tooltip: {
            callbacks: extra.tooltipCallbacks || {},
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 6 },
          },
          y: {
            grid: { color: "rgba(42, 33, 72, 0.06)" },
            ticks: extra.yTicks || {},
            suggestedMin: extra.suggestedMin,
            suggestedMax: extra.suggestedMax,
          },
        },
      },
    });
  }

  function renderCharts(sorted) {
    if (!window.Chart || !sorted.length) return;
    chartDefaults();
    var lbs = labels(sorted);
    var start = sorted[0].lb;
    var upper = sorted.map(function () { return start * 1.1; });
    var lower = sorted.map(function () { return start * 0.9; });

    makeLineChart("chart-weight", [
      {
        label: "Weight",
        data: sorted.map(function (row) { return row.lb; }),
        borderColor: "#ff7a5c",
        backgroundColor: "#ff7a5c",
        fill: false,
      },
      {
        label: "+10% from start",
        data: upper,
        borderColor: "rgba(110, 182, 255, 0.0)",
        backgroundColor: "rgba(110, 182, 255, 0.18)",
        pointRadius: 0,
        pointHoverRadius: 0,
        fill: "+1",
        borderWidth: 0,
      },
      {
        label: "−10% from start",
        data: lower,
        borderColor: "rgba(110, 182, 255, 0.0)",
        backgroundColor: "rgba(110, 182, 255, 0.0)",
        pointRadius: 0,
        pointHoverRadius: 0,
        fill: false,
        borderWidth: 0,
      },
    ], { labels: lbs });

    makeLineChart("chart-bf", [
      {
        label: "Body fat %",
        data: sorted.map(function (row) { return row.bf; }),
        borderColor: "#9b8cff",
        backgroundColor: "rgba(155, 140, 255, 0.16)",
        fill: true,
        spanGaps: true,
      },
    ], {
      labels: lbs,
      legend: false,
      yTicks: { callback: function (v) { return v + "%"; } },
    });

    makeLineChart("chart-bmi", [
      {
        label: "BMI",
        data: sorted.map(function (row) { return row.bmi; }),
        borderColor: "#3ecf9f",
        backgroundColor: "rgba(62, 207, 159, 0.16)",
        fill: true,
      },
    ], { labels: lbs, legend: false });

    var changePts = sorted.map(function (row) {
      return ((row.lb - start) / start) * 100;
    });
    makeLineChart("chart-change", [
      {
        label: "% from start",
        data: changePts,
        borderColor: "#6eb6ff",
        backgroundColor: "#6eb6ff",
        fill: false,
      },
      {
        label: "+10%",
        data: sorted.map(function () { return 10; }),
        borderColor: "#ff9b86",
        borderDash: [6, 6],
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: "−10%",
        data: sorted.map(function () { return -10; }),
        borderColor: "#3ecf9f",
        borderDash: [6, 6],
        pointRadius: 0,
        borderWidth: 2,
      },
    ], {
      labels: lbs,
      suggestedMin: -12,
      suggestedMax: 12,
      yTicks: { callback: function (v) { return v + "%"; } },
    });
  }

  function renderTable(sorted) {
    var body = document.getElementById("log-body");
    if (!body) return;
    body.replaceChildren();
    var newestFirst = sorted.slice().reverse();
    newestFirst.forEach(function (row, i) {
      var prev = newestFirst[i + 1];
      var delta = prev ? row.lb - prev.lb : null;
      var tr = document.createElement("tr");
      var bfCell = row.bf === null ? "—" : formatPct(row.bf);
      var bmiCell = row.bmi === null ? "—" : row.bmi.toFixed(1);
      var deltaCell = delta === null ? "—" : formatSignedLb(delta);
      tr.innerHTML =
        "<td>" + prettyDate(row.iso) + "</td>" +
        "<td>" + formatLb(row.lb) + " lb</td>" +
        "<td>" + bfCell + "</td>" +
        "<td>" + bmiCell + "</td>" +
        "<td class=\"" + (delta === null ? "" : trendClass(delta)) + "\">" + deltaCell + "</td>";
      body.appendChild(tr);
    });
  }

  function renderHero(sorted) {
    if (!sorted.length) {
      setText("lede", "Add a first weigh-in in js/data.js and this place lights up.");
      return;
    }
    var latest = sorted[sorted.length - 1];
    var prev = sorted.length > 1 ? sorted[sorted.length - 2] : null;
    setText("latest-weight", formatLb(latest.lb));
    setText("latest-bf", latest.bf === null ? "—" : formatPct(latest.bf));
    setText("latest-bmi", latest.bmi === null ? "—" : latest.bmi.toFixed(1));

    if (prev) {
      var d = latest.lb - prev.lb;
      setText("weight-delta", formatSignedLb(d) + " vs last weigh-in");
      setTrend("weight-delta", d);
    } else {
      setText("weight-delta", "first point on the board");
    }

    if (latest.bf === null) {
      var fatCard = document.querySelector(".hero.fat .hero-sub");
      if (fatCard) fatCard.textContent = "dash when weight is 115 lb or under";
    }

    var all = allTimeChange(sorted);
    if (all && all.lbs < -0.05) {
      setText("lede", "Down " + Math.abs(all.lbs).toFixed(1) + " lb from the first sample. Keep the streak kind.");
    } else if (all && all.lbs > 0.05) {
      setText("lede", "Up from the first point — still just data. Next weigh-in is a fresh start.");
    } else {
      setText("lede", "Steady numbers. Showing up is the habit that matters.");
    }
  }

  function boot() {
    var sample = document.getElementById("sample-banner");
    if (sample && typeof USING_SAMPLE_DATA !== "undefined" && USING_SAMPLE_DATA) {
      sample.classList.remove("hidden");
    }

    var sorted = parseWeighIns(typeof WEIGH_INS !== "undefined" ? WEIGH_INS : []);
    renderHero(sorted);
    fillChange("change-7", "change-7-lb", changeOverDays(sorted, 7));
    fillChange("change-30", "change-30-lb", changeOverDays(sorted, 30));
    fillChange("change-all", "change-all-lb", allTimeChange(sorted));

    var week = weeklyAverage(sorted);
    if (week) {
      setText("weekly-avg", formatLb(week.avg));
      setText("weekly-avg-sub", week.count + " weigh-ins in 7 days");
    }

    drawSparkline(sorted);
    paintRange(sorted);
    renderTable(sorted);
    renderCharts(sorted);
  }

  window.BodyStats = {
    bodyFatPercent: bodyFatPercent,
    bodyMassIndex: bodyMassIndex,
    HEIGHT_IN: HEIGHT_IN,
  };

  boot();
})();
