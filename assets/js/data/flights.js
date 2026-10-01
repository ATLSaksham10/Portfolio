window.DRONE = {
  defaults: { pilot: "Saksham", drone: "TODO: drone model" },
  flights: []
};

// flight(date, location, purpose, minutes, laanc, extras)
//   laanc: "approved" | "not-needed" | "denied"
//   extras (all optional): { drone, airspace, altFt, authId, notes }
function flight(date, location, purpose, minutes, laanc, extras) {
  return Object.assign({}, { date: date, location: location, purpose: purpose, minutes: minutes, laanc: laanc }, extras || {});
}

// ADD NEW FLIGHTS BELOW. Order doesn't matter; the page sorts newest first.
DRONE.flights.push(
  flight("2026-01-01", "TODO: location", "TODO: purpose", 15, "approved", {
    airspace: "Class D",
    altFt: 300,
    authId: "TODO"
  }),
  flight("2026-01-02", "TODO: location", "TODO: purpose", 12, "not-needed"),
  flight("2025-11-18", "TODO: location", "TODO: purpose", 22, "approved", {
    drone: "TODO: drone model",
    airspace: "Class E",
    altFt: 200,
    authId: "TODO"
  }),
  flight("2025-08-04", "TODO: location", "TODO: purpose", 8, "denied", {
    airspace: "Class D",
    notes: "TODO: optional note"
  }),
  flight("2025-06-21", "TODO: location", "TODO: purpose", 18, "not-needed", {
    altFt: 120
  })
);
