// =============================================================================
// ===== ADD A NEW WEIGH-IN HERE (newest can go at the top or bottom; either is fine) =====
// { date: "2026-08-31", lb: 117 },
//
// That's the whole input. One object per weigh-in.
//   date  → YYYY-MM-DD
//   lb    → weight in pounds (decimals are fine: 142.44)
//
// After you paste a real row, commit and push to main. The live dashboard
// updates when GitHub Pages deploys. No forms, no backend, no extra fields.
//
// Height is fixed at 5'6" (66 in). Body fat % and BMI are calculated in js/app.js:
//   BF% = (weight - 115) / weight   (0% at 115 lb; dash below 115 so it never goes negative)
//   BMI = (weight_lb / 66^2) * 703
//
// Latest / hero numbers always come from the newest DATE in this array.
// Charts plot every remaining row on its real date (no hardcoded year or 30-day window).
// =============================================================================

const USING_SAMPLE_DATA = false;

// -----------------------------------------------------------------------------
// HISTORY OFF-FLAG (default = history ON). There is NO on-flag.
// Historic = every weigh-in dated BEFORE 2026-08-11.
// Leave the `st (off)` line commented → include history.
// Uncomment `st (off)` → hide those rows (keep Aug 11 onward: 115 hold + 117 current).
let hideHistory = false;
function off() { hideHistory = true; }
function st(fn) { fn(); } // so the next line is real JS: st (off) calls off()
// Uncomment the next line to hide weigh-ins before 2026-08-11. Leave it commented = history on. There is NO on-flag.
   //st (off)
// -----------------------------------------------------------------------------

const WEIGH_INS = [
  { date: "2025-06-22", lb: 143 },
  { date: "2025-09-22", lb: 143 },
  { date: "2025-12-22", lb: 143 },
  { date: "2026-03-22", lb: 143 },
  { date: "2026-06-22", lb: 143 },
  { date: "2026-06-23", lb: 142.44 },
  { date: "2026-06-24", lb: 141.88 },
  { date: "2026-06-25", lb: 141.32 },
  { date: "2026-06-26", lb: 140.76 },
  { date: "2026-06-27", lb: 140.2 },
  { date: "2026-06-28", lb: 139.64 },
  { date: "2026-06-29", lb: 139.08 },
  { date: "2026-06-30", lb: 138.52 },
  { date: "2026-07-01", lb: 137.96 },
  { date: "2026-07-02", lb: 137.4 },
  { date: "2026-07-03", lb: 136.84 },
  { date: "2026-07-04", lb: 136.28 },
  { date: "2026-07-05", lb: 135.72 },
  { date: "2026-07-06", lb: 135.16 },
  { date: "2026-07-07", lb: 134.6 },
  { date: "2026-07-08", lb: 134.04 },
  { date: "2026-07-09", lb: 133.48 },
  { date: "2026-07-10", lb: 132.92 },
  { date: "2026-07-11", lb: 132.36 },
  { date: "2026-07-12", lb: 131.8 },
  { date: "2026-07-13", lb: 131.24 },
  { date: "2026-07-14", lb: 130.68 },
  { date: "2026-07-15", lb: 130.12 },
  { date: "2026-07-16", lb: 129.56 },
  { date: "2026-07-17", lb: 129 },
  { date: "2026-07-18", lb: 128.44 },
  { date: "2026-07-19", lb: 127.88 },
  { date: "2026-07-20", lb: 127.32 },
  { date: "2026-07-21", lb: 126.76 },
  { date: "2026-07-22", lb: 126.2 },
  { date: "2026-07-23", lb: 125.64 },
  { date: "2026-07-24", lb: 125.08 },
  { date: "2026-07-25", lb: 124.52 },
  { date: "2026-07-26", lb: 123.96 },
  { date: "2026-07-27", lb: 123.4 },
  { date: "2026-07-28", lb: 122.84 },
  { date: "2026-07-29", lb: 122.28 },
  { date: "2026-07-30", lb: 121.72 },
  { date: "2026-07-31", lb: 121.16 },
  { date: "2026-08-01", lb: 120.6 },
  { date: "2026-08-02", lb: 120.04 },
  { date: "2026-08-03", lb: 119.48 },
  { date: "2026-08-04", lb: 118.92 },
  { date: "2026-08-05", lb: 118.36 },
  { date: "2026-08-06", lb: 117.8 },
  { date: "2026-08-07", lb: 117.24 },
  { date: "2026-08-08", lb: 116.68 },
  { date: "2026-08-09", lb: 116.12 },
  { date: "2026-08-10", lb: 115.56 },
  { date: "2026-08-11", lb: 115 },
  { date: "2026-08-12", lb: 115 },
  { date: "2026-08-13", lb: 115 },
  { date: "2026-08-14", lb: 115 },
  { date: "2026-08-15", lb: 115 },
  { date: "2026-08-16", lb: 115 },
  { date: "2026-08-17", lb: 115 },
  { date: "2026-08-18", lb: 115 },
  { date: "2026-08-19", lb: 115 },
  { date: "2026-08-20", lb: 115 },
  { date: "2026-08-21", lb: 115 },
  { date: "2026-08-22", lb: 115 },
  { date: "2026-08-23", lb: 115 },
  { date: "2026-08-24", lb: 115 },
  { date: "2026-08-25", lb: 115 },
  { date: "2026-08-26", lb: 115 },
  { date: "2026-08-27", lb: 115 },
  { date: "2026-08-30", lb: 116 },
  { date: "2026-08-31", lb: 117 },
];
