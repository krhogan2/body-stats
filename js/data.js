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
// =============================================================================

const USING_SAMPLE_DATA = false;

const WEIGH_INS = [
  { date: "2025-06-22", lb: 143 },
  { date: "2025-09-22", lb: 143 },
  { date: "2025-12-22", lb: 143 },
  { date: "2026-03-22", lb: 143 },
  { date: "2026-06-22", lb: 143 },
  { date: "2026-06-23", lb: 142.5 },
  { date: "2026-06-24", lb: 142 },
  { date: "2026-06-25", lb: 141.5 },
  { date: "2026-06-26", lb: 141 },
  { date: "2026-06-27", lb: 140.5 },
  { date: "2026-06-28", lb: 140 },
  { date: "2026-06-29", lb: 139.5 },
  { date: "2026-06-30", lb: 139 },
  { date: "2026-07-01", lb: 138.5 },
  { date: "2026-07-02", lb: 138 },
  { date: "2026-07-03", lb: 137.5 },
  { date: "2026-07-04", lb: 137 },
  { date: "2026-07-05", lb: 136.5 },
  { date: "2026-07-06", lb: 136 },
  { date: "2026-07-07", lb: 135.5 },
  { date: "2026-07-08", lb: 135 },
  { date: "2026-07-09", lb: 134.5 },
  { date: "2026-07-10", lb: 134 },
  { date: "2026-07-11", lb: 133.5 },
  { date: "2026-07-12", lb: 133 },
  { date: "2026-07-13", lb: 132.5 },
  { date: "2026-07-14", lb: 132 },
  { date: "2026-07-15", lb: 131.5 },
  { date: "2026-07-16", lb: 131 },
  { date: "2026-07-17", lb: 130.5 },
  { date: "2026-07-18", lb: 130 },
  { date: "2026-07-19", lb: 129.5 },
  { date: "2026-07-20", lb: 129 },
  { date: "2026-07-21", lb: 128.5 },
  { date: "2026-07-22", lb: 128 },
  { date: "2026-07-23", lb: 127.5 },
  { date: "2026-07-24", lb: 127 },
  { date: "2026-07-25", lb: 126.5 },
  { date: "2026-07-26", lb: 126 },
  { date: "2026-07-27", lb: 125.5 },
  { date: "2026-07-28", lb: 125 },
  { date: "2026-07-29", lb: 124.5 },
  { date: "2026-07-30", lb: 124 },
  { date: "2026-07-31", lb: 123.5 },
  { date: "2026-08-01", lb: 123 },
  { date: "2026-08-02", lb: 122.5 },
  { date: "2026-08-03", lb: 122 },
  { date: "2026-08-04", lb: 121.5 },
  { date: "2026-08-05", lb: 121 },
  { date: "2026-08-06", lb: 120.5 },
  { date: "2026-08-07", lb: 120 },
  { date: "2026-08-08", lb: 119.5 },
  { date: "2026-08-09", lb: 119 },
  { date: "2026-08-10", lb: 118.5 },
  { date: "2026-08-11", lb: 118 },
  { date: "2026-08-12", lb: 118 },
  { date: "2026-08-13", lb: 118 },
  { date: "2026-08-14", lb: 118 },
  { date: "2026-08-15", lb: 118 },
  { date: "2026-08-16", lb: 118 },
  { date: "2026-08-17", lb: 118 },
  { date: "2026-08-18", lb: 118 },
  { date: "2026-08-19", lb: 118 },
  { date: "2026-08-20", lb: 118 },
  { date: "2026-08-21", lb: 118 },
  { date: "2026-08-22", lb: 118 },
  { date: "2026-08-23", lb: 118 },
  { date: "2026-08-24", lb: 118 },
  { date: "2026-08-25", lb: 118 },
  { date: "2026-08-26", lb: 118 },
  { date: "2026-08-27", lb: 118 },
  { date: "2026-08-31", lb: 117 },
];
