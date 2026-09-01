// =============================================================================
// ===== ADD A NEW WEIGH-IN HERE (newest can go at the top or bottom; either is fine) =====
// { date: "2026-08-31", lb: 117 },
//
// That's the whole input. One object per weigh-in.
//   date  → YYYY-MM-DD
//   lb    → weight in pounds (decimals are fine: 116.8)
//
// After you paste a real row, commit and push to main. The live dashboard
// updates when GitHub Pages deploys. No forms, no backend, no extra fields.
//
// Height is fixed at 5'6" (66 in). Body fat % and BMI are calculated in js/app.js:
//   BF% = (weight - 115) / weight
//   BMI = (weight_lb / 66^2) * 703
//
// Latest / hero numbers always come from the newest DATE in this array.
// Do not add a dummy row after the real current weigh-in.
// =============================================================================

// Older rows below are demo / replace-me. 2026-08-31 at 117 lb is the real current weigh-in.
const USING_SAMPLE_DATA = true;

const WEIGH_INS = [
  { date: "2026-08-31", lb: 117 }, // REAL current weigh-in — newest date; do not add a dummy after this
  { date: "2026-08-24", lb: 118.4 }, // DEMO / replace-me — dated before the real current row
  { date: "2026-08-17", lb: 119.2 }, // DEMO / replace-me — dated before the real current row
  { date: "2026-08-10", lb: 120.0 }, // DEMO / replace-me — dated before the real current row
  { date: "2026-08-03", lb: 120.8 }, // DEMO / replace-me — dated before the real current row
  { date: "2026-07-27", lb: 121.6 }, // DEMO / replace-me — dated before the real current row
  { date: "2026-07-20", lb: 122.4 }, // DEMO / replace-me — dated before the real current row
  { date: "2026-07-13", lb: 123.0 }, // DEMO / replace-me — dated before the real current row
  { date: "2026-07-06", lb: 124.2 }, // DEMO / replace-me — dated before the real current row
  { date: "2026-06-29", lb: 125.0 }, // DEMO / replace-me — dated before the real current row
  { date: "2026-06-22", lb: 126.4 }, // DEMO / replace-me — dated before the real current row
  { date: "2026-06-15", lb: 128.0 }, // DEMO / replace-me — dated before the real current row
];
