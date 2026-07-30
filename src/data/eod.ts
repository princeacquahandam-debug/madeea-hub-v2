/**
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

export const EOD_DATA: EodData = {
  "people": [
    "Reichelle Rellora",
    "Angelica Roma",
    "FJ Caballes",
    "Bryan Sumait",
    "John Carlo Caintic",
    "Rio Castillo",
    "Laura Esteban",
    "Rowena Rose Petran"
  ],
  "dates": [
    "2026-07-05",
    "2026-07-06",
    "2026-07-07",
    "2026-07-08",
    "2026-07-09",
    "2026-07-10",
    "2026-07-11",
    "2026-07-12",
    "2026-07-13",
    "2026-07-14",
    "2026-07-15",
    "2026-07-16",
    "2026-07-17",
    "2026-07-18",
    "2026-07-19",
    "2026-07-20",
    "2026-07-21",
    "2026-07-22",
    "2026-07-23",
    "2026-07-24",
    "2026-07-25",
    "2026-07-26",
    "2026-07-27",
    "2026-07-28",
    "2026-07-29",
    "2026-07-30",
    "2026-07-31",
    "2026-08-01",
    "2026-08-02"
  ],
  "matrix": {
    "Reichelle Rellora|2026-07-05": "empty",
    "Angelica Roma|2026-07-05": "empty",
    "FJ Caballes|2026-07-05": "empty",
    "Bryan Sumait|2026-07-05": "empty",
    "John Carlo Caintic|2026-07-05": "empty",
    "Rio Castillo|2026-07-05": "empty",
    "Laura Esteban|2026-07-05": "empty",
    "Rowena Rose Petran|2026-07-05": "empty",
    "Reichelle Rellora|2026-07-06": "empty",
    "Angelica Roma|2026-07-06": "empty",
    "FJ Caballes|2026-07-06": "empty",
    "Bryan Sumait|2026-07-06": "empty",
    "John Carlo Caintic|2026-07-06": "empty",
    "Rio Castillo|2026-07-06": "empty",
    "Laura Esteban|2026-07-06": "empty",
    "Rowena Rose Petran|2026-07-06": "empty",
    "Reichelle Rellora|2026-07-07": "empty",
    "Angelica Roma|2026-07-07": "empty",
    "FJ Caballes|2026-07-07": "empty",
    "Bryan Sumait|2026-07-07": "empty",
    "John Carlo Caintic|2026-07-07": "empty",
    "Rio Castillo|2026-07-07": "empty",
    "Laura Esteban|2026-07-07": "empty",
    "Rowena Rose Petran|2026-07-07": "empty",
    "Reichelle Rellora|2026-07-08": "empty",
    "Angelica Roma|2026-07-08": "empty",
    "FJ Caballes|2026-07-08": "empty",
    "Bryan Sumait|2026-07-08": "empty",
    "John Carlo Caintic|2026-07-08": "empty",
    "Rio Castillo|2026-07-08": "empty",
    "Laura Esteban|2026-07-08": "empty",
    "Rowena Rose Petran|2026-07-08": "empty",
    "Reichelle Rellora|2026-07-09": "empty",
    "Angelica Roma|2026-07-09": "empty",
    "FJ Caballes|2026-07-09": "empty",
    "Bryan Sumait|2026-07-09": "empty",
    "John Carlo Caintic|2026-07-09": "empty",
    "Rio Castillo|2026-07-09": "empty",
    "Laura Esteban|2026-07-09": "empty",
    "Rowena Rose Petran|2026-07-09": "empty",
    "Reichelle Rellora|2026-07-10": "empty",
    "Angelica Roma|2026-07-10": "empty",
    "FJ Caballes|2026-07-10": "empty",
    "Bryan Sumait|2026-07-10": "empty",
    "John Carlo Caintic|2026-07-10": "empty",
    "Rio Castillo|2026-07-10": "empty",
    "Laura Esteban|2026-07-10": "empty",
    "Rowena Rose Petran|2026-07-10": "empty",
    "Reichelle Rellora|2026-07-11": "empty",
    "Angelica Roma|2026-07-11": "empty",
    "FJ Caballes|2026-07-11": "empty",
    "Bryan Sumait|2026-07-11": "empty",
    "John Carlo Caintic|2026-07-11": "empty",
    "Rio Castillo|2026-07-11": "empty",
    "Laura Esteban|2026-07-11": "empty",
    "Rowena Rose Petran|2026-07-11": "empty",
    "Reichelle Rellora|2026-07-12": "empty",
    "Angelica Roma|2026-07-12": "empty",
    "FJ Caballes|2026-07-12": "empty",
    "Bryan Sumait|2026-07-12": "empty",
    "John Carlo Caintic|2026-07-12": "empty",
    "Rio Castillo|2026-07-12": "empty",
    "Laura Esteban|2026-07-12": "empty",
    "Rowena Rose Petran|2026-07-12": "empty",
    "Reichelle Rellora|2026-07-13": "submitted",
    "Angelica Roma|2026-07-13": "submitted",
    "FJ Caballes|2026-07-13": "submitted",
    "Bryan Sumait|2026-07-13": "submitted",
    "John Carlo Caintic|2026-07-13": "submitted",
    "Rio Castillo|2026-07-13": "submitted",
    "Laura Esteban|2026-07-13": "submitted",
    "Rowena Rose Petran|2026-07-13": "submitted",
    "Reichelle Rellora|2026-07-14": "submitted",
    "Angelica Roma|2026-07-14": "submitted",
    "FJ Caballes|2026-07-14": "submitted",
    "Bryan Sumait|2026-07-14": "submitted",
    "John Carlo Caintic|2026-07-14": "submitted",
    "Rio Castillo|2026-07-14": "submitted",
    "Laura Esteban|2026-07-14": "submitted",
    "Rowena Rose Petran|2026-07-14": "submitted",
    "Reichelle Rellora|2026-07-15": "submitted",
    "Angelica Roma|2026-07-15": "submitted",
    "FJ Caballes|2026-07-15": "submitted",
    "Bryan Sumait|2026-07-15": "submitted",
    "John Carlo Caintic|2026-07-15": "submitted",
    "Rio Castillo|2026-07-15": "submitted",
    "Laura Esteban|2026-07-15": "submitted",
    "Rowena Rose Petran|2026-07-15": "submitted",
    "Reichelle Rellora|2026-07-16": "submitted",
    "Angelica Roma|2026-07-16": "submitted",
    "FJ Caballes|2026-07-16": "submitted",
    "Bryan Sumait|2026-07-16": "submitted",
    "John Carlo Caintic|2026-07-16": "submitted",
    "Rio Castillo|2026-07-16": "submitted",
    "Laura Esteban|2026-07-16": "submitted",
    "Rowena Rose Petran|2026-07-16": "submitted",
    "Reichelle Rellora|2026-07-17": "template",
    "Angelica Roma|2026-07-17": "submitted",
    "FJ Caballes|2026-07-17": "template",
    "Bryan Sumait|2026-07-17": "template",
    "John Carlo Caintic|2026-07-17": "template",
    "Rio Castillo|2026-07-17": "submitted",
    "Laura Esteban|2026-07-17": "template",
    "Rowena Rose Petran|2026-07-17": "template",
    "Reichelle Rellora|2026-07-18": "empty",
    "Angelica Roma|2026-07-18": "empty",
    "FJ Caballes|2026-07-18": "empty",
    "Bryan Sumait|2026-07-18": "empty",
    "John Carlo Caintic|2026-07-18": "empty",
    "Rio Castillo|2026-07-18": "empty",
    "Laura Esteban|2026-07-18": "empty",
    "Rowena Rose Petran|2026-07-18": "empty",
    "Reichelle Rellora|2026-07-19": "empty",
    "Angelica Roma|2026-07-19": "empty",
    "FJ Caballes|2026-07-19": "empty",
    "Bryan Sumait|2026-07-19": "empty",
    "John Carlo Caintic|2026-07-19": "empty",
    "Rio Castillo|2026-07-19": "empty",
    "Laura Esteban|2026-07-19": "empty",
    "Rowena Rose Petran|2026-07-19": "empty",
    "Reichelle Rellora|2026-07-20": "template",
    "Angelica Roma|2026-07-20": "template",
    "FJ Caballes|2026-07-20": "template",
    "Bryan Sumait|2026-07-20": "template",
    "John Carlo Caintic|2026-07-20": "template",
    "Rio Castillo|2026-07-20": "template",
    "Laura Esteban|2026-07-20": "template",
    "Rowena Rose Petran|2026-07-20": "template",
    "Reichelle Rellora|2026-07-21": "template",
    "Angelica Roma|2026-07-21": "template",
    "FJ Caballes|2026-07-21": "template",
    "Bryan Sumait|2026-07-21": "template",
    "John Carlo Caintic|2026-07-21": "template",
    "Rio Castillo|2026-07-21": "template",
    "Laura Esteban|2026-07-21": "template",
    "Rowena Rose Petran|2026-07-21": "template",
    "Reichelle Rellora|2026-07-22": "template",
    "Angelica Roma|2026-07-22": "template",
    "FJ Caballes|2026-07-22": "template",
    "Bryan Sumait|2026-07-22": "template",
    "John Carlo Caintic|2026-07-22": "template",
    "Rio Castillo|2026-07-22": "template",
    "Laura Esteban|2026-07-22": "template",
    "Rowena Rose Petran|2026-07-22": "template",
    "Reichelle Rellora|2026-07-23": "template",
    "Angelica Roma|2026-07-23": "template",
    "FJ Caballes|2026-07-23": "template",
    "Bryan Sumait|2026-07-23": "template",
    "John Carlo Caintic|2026-07-23": "template",
    "Rio Castillo|2026-07-23": "template",
    "Laura Esteban|2026-07-23": "template",
    "Rowena Rose Petran|2026-07-23": "template",
    "Reichelle Rellora|2026-07-24": "template",
    "Angelica Roma|2026-07-24": "template",
    "FJ Caballes|2026-07-24": "template",
    "Bryan Sumait|2026-07-24": "template",
    "John Carlo Caintic|2026-07-24": "template",
    "Rio Castillo|2026-07-24": "template",
    "Laura Esteban|2026-07-24": "template",
    "Rowena Rose Petran|2026-07-24": "template",
    "Reichelle Rellora|2026-07-25": "empty",
    "Angelica Roma|2026-07-25": "empty",
    "FJ Caballes|2026-07-25": "empty",
    "Bryan Sumait|2026-07-25": "empty",
    "John Carlo Caintic|2026-07-25": "empty",
    "Rio Castillo|2026-07-25": "empty",
    "Laura Esteban|2026-07-25": "empty",
    "Rowena Rose Petran|2026-07-25": "empty",
    "Reichelle Rellora|2026-07-26": "empty",
    "Angelica Roma|2026-07-26": "empty",
    "FJ Caballes|2026-07-26": "empty",
    "Bryan Sumait|2026-07-26": "empty",
    "John Carlo Caintic|2026-07-26": "empty",
    "Rio Castillo|2026-07-26": "empty",
    "Laura Esteban|2026-07-26": "empty",
    "Rowena Rose Petran|2026-07-26": "empty",
    "Reichelle Rellora|2026-07-27": "template",
    "Angelica Roma|2026-07-27": "template",
    "FJ Caballes|2026-07-27": "template",
    "Bryan Sumait|2026-07-27": "template",
    "John Carlo Caintic|2026-07-27": "template",
    "Rio Castillo|2026-07-27": "template",
    "Laura Esteban|2026-07-27": "template",
    "Rowena Rose Petran|2026-07-27": "template",
    "Reichelle Rellora|2026-07-28": "template",
    "Angelica Roma|2026-07-28": "template",
    "FJ Caballes|2026-07-28": "template",
    "Bryan Sumait|2026-07-28": "template",
    "John Carlo Caintic|2026-07-28": "template",
    "Rio Castillo|2026-07-28": "template",
    "Laura Esteban|2026-07-28": "template",
    "Rowena Rose Petran|2026-07-28": "template",
    "Reichelle Rellora|2026-07-29": "template",
    "Angelica Roma|2026-07-29": "template",
    "FJ Caballes|2026-07-29": "template",
    "Bryan Sumait|2026-07-29": "template",
    "John Carlo Caintic|2026-07-29": "template",
    "Rio Castillo|2026-07-29": "template",
    "Laura Esteban|2026-07-29": "template",
    "Rowena Rose Petran|2026-07-29": "template",
    "Reichelle Rellora|2026-07-30": "template",
    "Angelica Roma|2026-07-30": "template",
    "FJ Caballes|2026-07-30": "template",
    "Bryan Sumait|2026-07-30": "template",
    "John Carlo Caintic|2026-07-30": "template",
    "Rio Castillo|2026-07-30": "template",
    "Laura Esteban|2026-07-30": "template",
    "Rowena Rose Petran|2026-07-30": "template",
    "Reichelle Rellora|2026-07-31": "template",
    "Angelica Roma|2026-07-31": "template",
    "FJ Caballes|2026-07-31": "template",
    "Bryan Sumait|2026-07-31": "template",
    "John Carlo Caintic|2026-07-31": "template",
    "Rio Castillo|2026-07-31": "template",
    "Laura Esteban|2026-07-31": "template",
    "Rowena Rose Petran|2026-07-31": "template",
    "Reichelle Rellora|2026-08-01": "empty",
    "Angelica Roma|2026-08-01": "empty",
    "FJ Caballes|2026-08-01": "empty",
    "Bryan Sumait|2026-08-01": "empty",
    "John Carlo Caintic|2026-08-01": "empty",
    "Rio Castillo|2026-08-01": "empty",
    "Laura Esteban|2026-08-01": "empty",
    "Rowena Rose Petran|2026-08-01": "empty",
    "Reichelle Rellora|2026-08-02": "empty",
    "Angelica Roma|2026-08-02": "empty",
    "FJ Caballes|2026-08-02": "empty",
    "Bryan Sumait|2026-08-02": "empty",
    "John Carlo Caintic|2026-08-02": "empty",
    "Rio Castillo|2026-08-02": "empty",
    "Laura Esteban|2026-08-02": "empty",
    "Rowena Rose Petran|2026-08-02": "empty"
  },
  "entries": [],
  "sheetSubs": {
    "Reichelle Rellora": 4,
    "Angelica Roma": 5,
    "FJ Caballes": 4,
    "Bryan Sumait": 4,
    "John Carlo Caintic": 4,
    "Rio Castillo": 5,
    "Laura Esteban": 4,
    "Rowena Rose Petran": 4
  },
  "sheetComp": {
    "Reichelle Rellora": 0.1290322581,
    "Angelica Roma": 0.1612903226,
    "FJ Caballes": 0.1290322581,
    "Bryan Sumait": 0.1290322581,
    "John Carlo Caintic": 0.1290322581,
    "Rio Castillo": 0.1612903226,
    "Laura Esteban": 0.1290322581,
    "Rowena Rose Petran": 0.1290322581
  },
  "tracker": {
    "totalTasks": 0,
    "openTasks": 0,
    "overdueTasks": 0,
    "completionRate": 0.0,
    "columns": [
      "Date Assigned",
      "Task Description",
      "Assignee",
      "Due Date",
      "Status",
      "Days Left",
      "Action Required"
    ],
    "rows": []
  },
  "meta": {
    "sheetId": "1EsbcvFVOcw1wITKF_T2JjH8n8uDYGI9D4Us5RHaQ9ak",
    "tabs": [
      "July 2026 EOD",
      "Task Tracker"
    ],
    "denominator": 31,
    "templateString": "1. Done today:\n2. Blockers:\n3. Plan for tomorrow:",
    "snapshot": "17 Jul 2026"
  }
};
