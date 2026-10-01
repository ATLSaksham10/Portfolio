// Published entries sort first. Optional: tags (shown under the topic) and
// details [{ label, text }] (shown with the abstract when expanded).
window.RESEARCH = [
  {
    type: "Journal paper",
    title: "Urban Air Mobility: The Future of Air-Taxi Networks in Global Smart Cities",
    venue: "AIAA Journal (peer-reviewed)",
    year: "2026",
    role: "Co-author and lead researcher; presenter",
    topic: "Urban air mobility and eVTOL air-taxi networks",
    tags: ["UAM", "eVTOL", "Aerospace", "Research", "Policy", "AIAA"],
    abstract: "A comparative case study of eVTOL air-taxi trials in Paris, Los Angeles, and Dubai. Each city takes a different approach to infrastructure, regulation, and public adoption; this paper compares the three to identify which factors decide whether an air-taxi network can scale in a real city.",
    details: [
      { label: "Timeframe", text: "November 2025 – March 2026" },
      { label: "Co-author", text: "Wallace Moon, engineering teacher, Denmark High School" },
      { label: "Method", text: "Multi-tiered analysis of real-world air-taxi trials in Paris, Los Angeles, and Dubai, using statistical comparisons and GIS spatial analysis." },
      { label: "Findings", text: "Regulation, infrastructure, public trust, and scalability are bigger barriers to air-taxi networks than battery or automation technology, though advances are still needed in batteries, safety standards, regulatory compliance, air authority, and automation." },
      { label: "Presentation", text: "Presented at the 2026 AIAA Southern Regional Student Conference, University of South Carolina." }
    ],
    status: "Published",
    links: [] // TODO: paper link / PDF / talk video
  },
  {
    type: "AP Research",
    title: "LW-PLA Fatigue Behavior Under Cyclic Loading", // TODO: working title
    venue: "AP Capstone",
    year: "2026–2027",
    role: "Independent researcher",
    topic: "Fatigue of lightweight foaming PLA (LW-PLA) under cyclic bending",
    tags: ["Materials Science", "Additive Manufacturing", "Fatigue Testing", "Mechanical Engineering", "AP Research"],
    abstract: "Most LW-PLA research covers density, thermal behavior, and static strength, but almost nothing examines how it performs under repeated, cyclic loading, which is what real components like drone frames, brackets, and RC aircraft parts actually experience. This project investigates how foaming-induced density variation influences fatigue life and S-N response in LW-PLA under cyclic bending.",
    details: [
      { label: "Specimens (planned)", text: "3D-printed cantilever beam coupons across a standard PLA control group and multiple LW-PLA density groups." },
      { label: "Pre-characterization (planned)", text: "Quasi-static 3-point bend tests to establish the effective flexural modulus of each density group." },
      { label: "Test rig (planned)", text: "A custom-built, servo-actuated cyclic bending rig with a load cell for stress measurement, and Arduino-based rig control with automated cycle counting and stop detection." },
      { label: "Controls (planned)", text: "Quasi-static stiffness checks roughly every 1,000 cycles, plus frequency and temperature controls to prevent self-heating artifacts." }
    ],
    status: "In progress",
    links: []
  }
];
