window.DRONE = {
  defaults: { pilot: "Saksham Garg", drone: "DJI Mini 4K" },
  flights: []
};

// flight(date, location, purpose, minutes, laanc, extras)
//   laanc: "approved" | "not-needed" | "denied"
//   extras (all optional): { drone, airspace, altFt, authId, notes }
function flight(date, location, purpose, minutes, laanc, extras) {
  return Object.assign({}, { date: date, location: location, purpose: purpose, minutes: minutes, laanc: laanc }, extras || {});
}

// notes is shown in the Notes column of the flight log.
// ADD NEW FLIGHTS BELOW. Order doesn't matter; the page sorts newest first.
DRONE.flights.push(
  flight("2026-08-29", "ITA, Atlanta", "Atlanta Habitat pickleball tournament filming", 120, "approved", {
    airspace: "Class D",
    altFt: 100,
    authId: "ALTR65P58TYO",
    notes: "Smooth flight along a challenging flight path. LAANC authorized to 100 ft."
  }),
  flight("2026-07-25", "Battle Hill Haven, Atlanta", "Builder Blitz day 1: wall raising film", 30, "not-needed", {
    airspace: "Class G",
    altFt: 100,
    notes: "Smooth flight. Uncontrolled airspace; no LAANC authorization required."
  }),
  flight("2026-07-18", "West Side Community Church", "Upahar build day 1: wall raising filming", 30, "not-needed", {
    airspace: "Class G",
    altFt: 100,
    notes: "Uncontrolled airspace; no LAANC authorization required. Ground control device (phone) overheated during the flight."
  }),
  flight("2026-03-16", "Classic Center, Athens", "TSA Drone SLC competition flight", 15, "not-needed", {
    drone: "Denmark custom 5\" racing quadcopter",
    airspace: "Class D",
    altFt: 10,
    notes: "Flown under local competition approval. Experienced gyro calibration issues, significant turbulence, and heavy radio interference."
  })
);
