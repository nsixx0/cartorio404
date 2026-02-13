(function () {
  const mockCitizen = {
    fullName: "Elias Harrow",
    address: "1147 Pine Court, Unit B, Grayford, Westborough",
    idNumber: "WB-77-004912",
    dob: "08/14/1987",
    causeOfDeath: "TO BE DETERMINED BY THE SYSTEM",
    dateOfDeath: "TOMORROW"
  };

  window.Cartorio404Data = {
    countyName: "Westborough County",
    clerkOffice: "Westborough County Clerk Office",
    citizen: mockCitizen,
    getProtocolId: function () {
      const existing = localStorage.getItem("protocolId");
      if (existing) return existing;
      const p1 = String(Math.floor(1000 + Math.random() * 9000));
      const p2 = String(Math.floor(1000 + Math.random() * 9000));
      const protocol = "CLRK-" + p1 + "-" + p2;
      localStorage.setItem("protocolId", protocol);
      return protocol;
    }
  };
})();
