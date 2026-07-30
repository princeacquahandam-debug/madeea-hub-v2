# EOD data pipeline

`src/data/eod.ts` is generated from the team's "July 2026 EOD" Google Sheet.

## Regenerate

```bash
# 1. Export the workbook (xlsx keeps BOTH tabs; csv would only give the first)
curl -L -o book.xlsx \
  "https://docs.google.com/spreadsheets/d/1EsbcvFVOcw1wITKF_T2JjH8n8uDYGI9D4Us5RHaQ9ak/export?format=xlsx"

# 2. Rebuild the typed dataset
python scripts/build_eod_data.py book.xlsx > src/data/eod.ts
```

## The one rule that matters

Every cell in the EOD tab is **pre-filled with a blank template**:

```
1. Done today:
2. Blockers:
3. Plan for tomorrow:
```

The sheet's own header formula excludes those:

```
=COUNTIFS(B7:B35, "<>", B7:B35, "<>1. Done today:"&CHAR(10)&"2. Blockers:"&CHAR(10)&"3. Plan for tomorrow:")
```

So a cell counts as a submission **only when it is non-empty AND not that template**.
Counting non-empty cells instead reports 15 per person rather than the true 4
(Angelica 5) and inflates every downstream figure roughly 4x.

Completion % is the sheet's `=B4/31` — a fixed 31-day denominator — so the
dashboard shows the same number the team already reads in the spreadsheet.
`build_eod_data.py` asserts parity against both formulas and fails loudly if the
computed values ever drift from the sheet.

On Windows, always open files with `encoding="utf-8"`; the default cp1252 codec
corrupts the `•` bullets the team uses.
