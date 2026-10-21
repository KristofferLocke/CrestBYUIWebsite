/* EDIT HERE FIRST — shared settings. No npm, bundler, or server is required.
 * Keep the quotes and commas. Empty values hide optional features.
 * Full instructions: docs/EDITING.md
 */
window.SITE_CONFIG = Object.freeze({
  // Keep the approved public address and matching HTML fallback links current.
  // Direct email is an alternative to the Formspree form in contact/index.html.
  contactEmail: "saeformula@byui.edu",
  socials: {
    linkedin: "https://www.linkedin.com/company/byu-i-formula-racing/",
    instagram: "https://www.instagram.com/byui.formula.racing/"
  },
  location: "Rexburg, Idaho",
  institution: "Brigham Young University–Idaho",

  // Add a PDF relative to the site root, e.g. "assets/downloads/sponsor-packet.pdf".
  // The optional download button stays hidden until a path is supplied.
  sponsorPacket: "",

  // Add real team photos relative to the site root. Update alt text too.
  // Empty src keeps the clearly labeled photography placeholder.
  photos: {
    workshop: { src: "", alt: "", caption: "" },
    car: { src: "assets/images/carrender.webp", alt: "Front view of a blue and white formula car concept render", caption: "Concept render." },
    team: { src: "", alt: "", caption: "" },
    fabrication: { src: "", alt: "", caption: "" },
    controls: { src: "", alt: "", caption: "" },
    operations: { src: "", alt: "", caption: "" },
    partnership: { src: "assets/images/team-around-formula-car.webp", alt: "A group gathered around a blue and white formula car with an exposed chassis in the workshop", caption: "" }
  },

  // Only add sponsors who have approved public recognition. Examples in EDITING.md.
  // Each item: { name: "...", logo: "assets/images/...", url: "https://...", group: "major" }
  // group: "major" or "supporting" (default). Recognition is for in-kind support.
  sponsors: [
    { name: "Grand Teton Energy Systems", logo: "assets/images/grand-teton-energy-systems-logo.png", url: "https://www.grandteton.energy/", group: "major" },
    { name: "Ecotron", logo: "assets/images/ecotron-logo.png", url: "https://ecotron.ai/news/ecotron-launching-sponsorship-program-to-student-teams/", group: "major" },
    { name: "High Performance Academy", logo: "assets/images/high-performance-academy-logo.png", url: "https://www.hpacademy.com/", group: "major" },
    { name: "Carrozzeria Silvestro", logo: "assets/images/carrozzeria-silvestro-logo.webp", url: "https://carrozzeriasilvestro.com/", group: "major" },
    { name: "Onshape", logo: "assets/images/onshape-logo.png", url: "https://www.onshape.com/en/", group: "supporting" },
    { name: "RapidHarness", logo: "assets/images/rapidharness-logo.png", url: "https://rapidharness.com/", group: "supporting" }
  ]
});
