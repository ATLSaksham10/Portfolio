// Order = display order on the Projects page (most important first).
// comingSoon: true renders a non-clickable placeholder card and is not counted in home stats.
window.PROJECTS = [
  {
    slug: "caterpillar-wire-feed",
    title: "Caterpillar wire feed improvement",
    year: "2026",
    tags: ["CAD", "Creo", "Industry", "Robotics"],
    blurb: "A three-part redesign of a production wire feed system, from friction research to Creo CAD, prototyping, and floor implementation.",
    image: "photos/cat-hero.jpg",
    href: "projects/caterpillar-wire-feed.html"
  },
  {
    slug: "frc-2026-rebuilt-robot",
    title: "REBUILT 2026 FRC robot",
    year: "2026",
    tags: ["CAD", "Onshape", "Robotics"],
    blurb: "Custom fixed dual-shooter robot with auto-aim and path systems, built from intake, indexer, and shooter subsystems on a CAN-based drivetrain.",
    image: "photos/frc-hero.jpg",
    href: "projects/frc-2026-rebuilt-robot.html"
  },
  {
    slug: "sunroom-design",
    title: "Sunroom design",
    year: "2024",
    tags: ["CAD", "Onshape"],
    blurb: "A code-compliant sunroom, from building-code research to an Onshape model and county-approved scaled drawings.",
    image: "photos/sunroom-hero.jpg",
    href: "projects/sunroom-design.html"
  },
  {
    slug: "tsa-drone-challenge",
    title: "TSA Drone Challenge",
    year: "2025–26",
    tags: ["CAD", "CFD", "FEA", "Robotics", "Aerospace", "3D Printing"],
    blurb: "A 5\" racing quad modified with a sponge-lined servo claw and dual FPV cameras. 1st at TSA states, top 10 at nationals.",
    image: "photos/drone-hero.jpg",
    href: "projects/tsa-drone-challenge.html"
  },
  {
    slug: "coming-soon",
    comingSoon: true,
    title: "Next project",
    year: "Coming soon",
    tags: [],
    blurb: "Another write-up is on the way.",
    image: "assets/img/placeholder.svg",
    href: "#"
  }
];
