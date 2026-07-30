"""Regenerate src/data/eod.ts from the exported "July 2026 EOD" workbook.

Usage:
    curl -L -o book.xlsx "https://docs.google.com/spreadsheets/d/<id>/export?format=xlsx"
    python scripts/build_eod_data.py book.xlsx > src/data/eod.ts

Asserts that the computed submission/completion figures match the sheet's own
COUNTIFS and =B4/31 formulas, and exits non-zero if they ever drift.
See scripts/README.md for why the blank-template rule matters.
"""
import io
import json
import os
import re
import sys

import openpyxl

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from parse_eod import parse  # noqa: E402

SHEET_ID = "1EsbcvFVOcw1wITKF_T2JjH8n8uDYGI9D4Us5RHaQ9ak"
EOD_TAB = "July 2026 EOD"
TRACKER_TAB = "Task Tracker"
DENOMINATOR = 31
SNAPSHOT = "17 Jul 2026"

# Every cell is pre-filled with this. The sheet's COUNTIFS excludes it, so it is
# NOT a submission - see scripts/README.md.
TPL = "1. Done today:\n2. Blockers:\n3. Plan for tomorrow:"

URL_RE = re.compile(r"https?://[^\s)>\]]+")

TS_HEADER = '''/**
 * EOD + Kanban dataset, extracted from the team's "July 2026 EOD" Google Sheet
 * (tabs: "July 2026 EOD" and "Task Tracker").
 *
 * GENERATED FILE - do not edit by hand.
 * Regenerate with: python scripts/build_eod_data.py book.xlsx > src/data/eod.ts
 *
 * Submission counting mirrors the sheet's own COUNTIFS exactly: a cell counts
 * only when it is non-empty AND is not the untouched blank template that every
 * cell is pre-filled with. Counting non-empty cells instead would report 15 per
 * person rather than the true 4 (Angelica 5) and inflate every figure ~4x.
 *
 * Completion % is the sheet's own `=B4/31` (a fixed 31-day denominator), so the
 * numbers here match what the team already reads in the spreadsheet.
 */

export type CellStatus = "submitted" | "template" | "empty";

export interface EodEntry {
  date: string;
  person: string;
  raw: string;
  done: string[];
  blockers: string[];
  plans: string[];
  links: string[];
}

export interface TrackerData {
  totalTasks: number;
  openTasks: number;
  overdueTasks: number;
  completionRate: number;
  columns: string[];
  rows: string[][];
}

export interface EodData {
  people: string[];
  dates: string[];
  /** key: `${person}|${date}` */
  matrix: Record<string, CellStatus>;
  entries: EodEntry[];
  /** Per-person submission totals exactly as the sheet's row 4 reports them. */
  sheetSubs: Record<string, number>;
  /** Per-person completion exactly as the sheet's row 3 reports it. */
  sheetComp: Record<string, number>;
  tracker: TrackerData;
  meta: {
    sheetId: string;
    tabs: string[];
    denominator: number;
    templateString: string;
    snapshot: string;
  };
}

'''


def _grid(ws):
    rows = [["" if c is None else str(c) for c in r] for r in ws.iter_rows(values_only=True)]
    while rows and not any(x.strip() for x in rows[-1]):
        rows.pop()
    return rows


def build(path):
    wb = openpyxl.load_workbook(path, data_only=True)
    rows = _grid(wb[EOD_TAB])

    people = [c for c in rows[5][1:9] if c.strip()]
    sheet_subs = {people[i]: int(rows[3][i + 1]) for i in range(len(people))}
    sheet_comp = {people[i]: float(rows[2][i + 1]) for i in range(len(people))}

    dates, matrix, entries = [], {}, []
    for r in rows[6:]:
        if not r or not r[0].strip():
            continue
        date = r[0][:10]
        dates.append(date)
        for i, p in enumerate(people):
            cell = r[i + 1] if len(r) > i + 1 else ""
            if not cell.strip():
                status = "empty"
            elif cell.strip() == TPL:
                status = "template"
            else:
                status = "submitted"
                sections = parse(cell)
                entries.append({
                    "date": date,
                    "person": p,
                    "raw": cell,
                    "done": sections["done"],
                    "blockers": sections["blockers"],
                    "plans": sections["plans"],
                    "links": sorted(set(URL_RE.findall(cell))),
                })
            matrix[p + "|" + date] = status

    # Parity with the sheet is non-negotiable: fail loudly rather than ship drift.
    for p in people:
        calc = sum(1 for e in entries if e["person"] == p)
        assert calc == sheet_subs[p], f"{p}: computed {calc} submissions, sheet says {sheet_subs[p]}"
        assert abs(calc / DENOMINATOR - sheet_comp[p]) < 1e-9, f"{p}: completion drifted from the sheet"

    t = _grid(wb[TRACKER_TAB])
    tracker = {
        "totalTasks": int(float(t[4][1] or 0)),
        "openTasks": int(float(t[4][2] or 0)),
        "overdueTasks": int(float(t[4][3] or 0)),
        "completionRate": float(t[4][4] or 0),
        "columns": [c for c in t[7][1:8] if c.strip()],
        "rows": [list(r[1:8]) for r in t[8:] if any(x.strip() for x in r[1:8])],
    }

    return {
        "people": people,
        "dates": dates,
        "matrix": matrix,
        "entries": entries,
        "sheetSubs": sheet_subs,
        "sheetComp": sheet_comp,
        "tracker": tracker,
        "meta": {
            "sheetId": SHEET_ID,
            "tabs": [EOD_TAB, TRACKER_TAB],
            "denominator": DENOMINATOR,
            "templateString": TPL,
            "snapshot": SNAPSHOT,
        },
    }


def main():
    path = sys.argv[1] if len(sys.argv) > 1 else "book.xlsx"
    data = build(path)
    out = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", newline="\n")
    out.write(TS_HEADER + "export const EOD_DATA: EodData = " +
              json.dumps(data, ensure_ascii=False, indent=2) + ";\n")
    out.flush()


if __name__ == "__main__":
    main()
