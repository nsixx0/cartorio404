(function () {
  function $(id) {
    return document.getElementById(id);
  }

  function setText(id, value) {
    const el = $(id);
    if (el) el.textContent = value;
  }

  function fillForm() {
    const data = window.Cartorio404Data && window.Cartorio404Data.citizen;
    if (!data) return;

    $("fullName").value = data.fullName;
    $("address").value = data.address;
    $("idNumber").value = data.idNumber;
    $("dob").value = data.dob;
    $("causeOfDeath").value = data.causeOfDeath;
    $("dateOfDeath").value = data.dateOfDeath;
    setText("protocolMirror", window.Cartorio404Data.getProtocolId());
  }

  function openRequiredPages() {
    const pages = ["protocol.html", "witnesses.html", "fees.html"];
    pages.forEach(function (page, index) {
      setTimeout(function () {
        window.open(page, "_blank");
      }, 700 * (index + 1));
    });
  }

  function startCountdown() {
    if (!localStorage.getItem("countdownStart")) {
      localStorage.setItem("countdownStart", String(Date.now()));
    }
    localStorage.removeItem("countdownComplete");

    const timer = $("countdown");
    const emailLink = $("emailLink");
    const closureMessage = $("closureMessage");

    function tick() {
      const start = Number(localStorage.getItem("countdownStart"));
      const remaining = Math.max(0, 300000 - (Date.now() - start));
      const sec = Math.floor(remaining / 1000);
      const mm = String(Math.floor(sec / 60)).padStart(2, "0");
      const ss = String(sec % 60).padStart(2, "0");
      timer.textContent = mm + ":" + ss;

      if (remaining <= 0) {
        localStorage.setItem("countdownComplete", "true");
        closureMessage.classList.remove("hidden");
        emailLink.classList.remove("hidden");
        setTimeout(function () {
          window.location.href = "email.html";
        }, 1200);
      }
    }

    tick();
    window.preemptiveTickHandle = setInterval(tick, 1000);
  }

  function showOverlayFlow() {
    const overlay = $("overlay");
    const status = $("overlayStatus");
    overlay.classList.remove("hidden");
    status.textContent = "For final validation, attach a photo of what is behind you.";

    setTimeout(function () {
      status.textContent = "Attachment received.";
      localStorage.setItem("attachmentReceived", "true");
    }, 3200);
  }

  function bindControls() {
    $("proceedBtn").addEventListener("click", function () {
      $("processBanner").classList.remove("hidden");
      localStorage.setItem("processInitiated", "true");
      openRequiredPages();
      startCountdown();
      showOverlayFlow();
    });

    $("disconnectBtn").addEventListener("click", function () {
      setText("connectionStatus", "Connection is not required for final procedures.");
    });

    $("closeOverlayBtn").addEventListener("click", function () {
      $("overlay").classList.add("hidden");
    });
  }

  function restoreState() {
    if (localStorage.getItem("processInitiated") === "true") {
      $("processBanner").classList.remove("hidden");
      startCountdown();
    }

    if (localStorage.getItem("attachmentReceived") === "true") {
      setText("overlayStatus", "Attachment received.");
    }

    if (localStorage.getItem("countdownComplete") === "true") {
      $("closureMessage").classList.remove("hidden");
      $("emailLink").classList.remove("hidden");
    }
  }

  window.addEventListener("beforeunload", function (event) {
    event.preventDefault();
    event.returnValue = "Changes you made may not be saved.";
    return "Changes you made may not be saved.";
  });

  document.addEventListener("DOMContentLoaded", function () {
    fillForm();
    bindControls();
    restoreState();
  });
})();
