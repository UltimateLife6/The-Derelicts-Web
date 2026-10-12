export type RedactedPart = string | { redacted: number };

export type EvidenceFile = {
  id: "transfer-log" | "surveillance-still" | "unknown-symbol";
  exhibit: string;
  label: string;
  status: "PARTIAL" | "PENDING" | "REDACTED";
  /** Monitor overlay label while this exhibit is on screen. */
  channel: string;
  /** Optional raster slot. When missing, the monitor shows a marked placeholder. */
  image?: string;
  fields?: { label: string; value: RedactedPart[] }[];
  note: string;
};

export const SURVEILLANCE_ART = "/images/mystery/surveillance";

/** No declassified Great Discard page exists yet. Set this when one ships. */
export const caseFileHref: string | null = null;

export const evidenceFiles: EvidenceFile[] = [
  {
    id: "transfer-log",
    exhibit: "EXHIBIT A",
    label: "TRANSFER LOG",
    status: "PARTIAL",
    channel: "DOC SCAN // EXHIBIT A",
    fields: [
      { label: "SUBJECTS", value: [{ redacted: 5 }] },
      { label: "ORIGIN", value: [{ redacted: 12 }] },
      { label: "DIRECTIVE", value: ["REMOVE / RELOCATE / ", { redacted: 6 }] },
    ],
    note: "Do not answer this here.",
  },
  {
    id: "surveillance-still",
    exhibit: "EXHIBIT B",
    label: "SURVEILLANCE STILL",
    status: "PENDING",
    channel: "CAM ██ // FEED UNVERIFIED",
    image: SURVEILLANCE_ART,
    note: "The Derelicts built Punktown. That does not mean they started the disappearing.",
  },
  {
    id: "unknown-symbol",
    exhibit: "EXHIBIT C",
    label: "UNKNOWN SYMBOL",
    status: "REDACTED",
    channel: "DOC SCAN // EXHIBIT C",
    image: "/images/mystery/unknown-symbol",
    note: "A symbol repeats in maintenance tunnels, on carnival tickets, and in files that should not have survived.",
  },
];
