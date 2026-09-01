// =============================================================================
// ===== ADD A NEW WEIGH-IN HERE (newest can go at the top or bottom; either is fine) =====
// { date: "2026-08-31", lb: 185 },
//
// That's the whole input. One object per weigh-in.
//   date  → YYYY-MM-DD
//   lb    → weight in pounds (decimals are fine: 184.6)
//
// After you paste a real row, commit and push to main. The live dashboard
// updates when GitHub Pages deploys. No forms, no backend, no extra fields.
//
// Height is fixed at 5'6" (66 in). Body fat % and BMI are calculated in js/app.js:
//   BF% = (weight - 115) / weight
//   BMI = (weight_lb / 66^2) * 703
// =============================================================================

// Flip to false once you've replaced the SAMPLE rows below.
const USING_SAMPLE_DATA = true;

const WEIGH_INS = [
  { date: "2026-08-31", lb: 185.2 }, // SAMPLE — replace me
  { date: "2026-08-28", lb: 185.8 }, // SAMPLE — replace me
  { date: "2026-08-24", lb: 186.4 }, // SAMPLE — replace me
  { date: "2026-08-17", lb: 187.6 }, // SAMPLE — replace me
  { date: "2026-08-10", lb: 188.2 }, // SAMPLE — replace me
  { date: "2026-08-03", lb: 189.4 }, // SAMPLE — replace me
  { date: "2026-07-27", lb: 190.0 }, // SAMPLE — replace me
  { date: "2026-07-20", lb: 191.6 }, // SAMPLE — replace me
  { date: "2026-07-13", lb: 192.2 }, // SAMPLE — replace me
  { date: "2026-07-06", lb: 193.8 }, // SAMPLE — replace me
  { date: "2026-06-29", lb: 195.0 }, // SAMPLE — replace me
  { date: "2026-06-22", lb: 196.4 }, // SAMPLE — replace me
  { date: "2026-06-15", lb: 198.0 }, // SAMPLE — replace me
];
