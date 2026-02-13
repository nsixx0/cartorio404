(function () {
  function byId(id) {
    return document.getElementById(id);
  }

  document.addEventListener("DOMContentLoaded", function () {
    const row = byId("messageRow");
    const panel = byId("messagePanel");
    const openAttachmentBtn = byId("openAttachment");
    const nameTarget = byId("mailCitizenName");
    const protocolTarget = byId("mailProtocol");

    if (window.Cartorio404Data) {
      nameTarget.textContent = window.Cartorio404Data.citizen.fullName;
      protocolTarget.textContent = window.Cartorio404Data.getProtocolId();
    }

    row.addEventListener("click", function () {
      panel.classList.remove("hidden");
      row.classList.add("selected");
    });

    openAttachmentBtn.addEventListener("click", function () {
      window.open("doc.html", "_blank");
    });
  });
})();
