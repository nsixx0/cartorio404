(function () {
  const HIDDEN_LINK_CLASS = "hidden-service-link";

  function revealHiddenLinks() {
    document.querySelectorAll('.' + HIDDEN_LINK_CLASS).forEach(function (el) {
      el.classList.add("revealed");
      el.setAttribute("aria-hidden", "false");
    });
  }

  function maybeRevealFromRecordsVisit() {
    if (localStorage.getItem("hasVisitedRecords") === "true") {
      revealHiddenLinks();
    }
  }

  function ensureCountyNames() {
    if (!window.Cartorio404Data) return;
    document.querySelectorAll("[data-county-name]").forEach(function (el) {
      el.textContent = window.Cartorio404Data.countyName;
    });
  }

  function bindCountdownMirrors() {
    const targets = document.querySelectorAll("[data-countdown]");
    if (!targets.length) return;

    function format(msRemaining) {
      const clamped = Math.max(0, Math.floor(msRemaining / 1000));
      const m = String(Math.floor(clamped / 60)).padStart(2, "0");
      const s = String(clamped % 60).padStart(2, "0");
      return m + ":" + s;
    }

    function tick() {
      const start = Number(localStorage.getItem("countdownStart") || "0");
      if (!start) return;
      const elapsed = Date.now() - start;
      const remaining = 300000 - elapsed;
      const text = format(remaining);
      targets.forEach(function (el) {
        el.textContent = text;
      });

      if (remaining <= 0) {
        localStorage.setItem("countdownComplete", "true");
        document.querySelectorAll("[data-on-expire]").forEach(function (el) {
          el.classList.remove("hidden");
        });
      }
    }

    tick();
    setInterval(tick, 1000);
  }

  document.addEventListener("DOMContentLoaded", function () {
    ensureCountyNames();
    maybeRevealFromRecordsVisit();

    const delayedLinks = document.querySelectorAll("[data-reveal-delay]");
    delayedLinks.forEach(function (el) {
      const delay = Number(el.getAttribute("data-reveal-delay") || "0");
      setTimeout(function () {
        el.classList.add("revealed");
      }, delay);
    });

    bindCountdownMirrors();
  });

  window.Cartorio404App = {
    revealHiddenLinks: revealHiddenLinks
  };
})();
