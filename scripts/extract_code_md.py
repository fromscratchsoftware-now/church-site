#!/usr/bin/env python3
"""
Extracts a multi-file code dump from code.md into real files.

The input format is a Coderick-style markdown export where each section contains
"FILE: <path>" and the code is lightly backslash-escaped for markdown rendering.
"""

from __future__ import annotations

import os
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CODE_MD = ROOT / "code.md"


UNESCAPE_RE = re.compile(r"\\([\\`*_{}\[\]()#+\-.!|<>~=:/&])")

HEADER_START_RE = re.compile(r"^\s*(?:code\s*)?(?:/\\\*|\\<\\!--)\s*\\=+")
HEADER_END_RE = re.compile(r"\\\*/\s*$|\\--\\>\s*$")
CHAT_MARKER_RE = re.compile(r"^\s*(?:Coderick AI|Restore|Current Version)\s*$")
BARE_FILENAME_RE = re.compile(r"^\s*[\w.\-]+\.(?:tsx|ts|css|html|json|js|jsx)\s*$")


def unescape_markdown(s: str) -> str:
    # Undo Coderick markdown escaping (\<, \_, \!, \[...\], etc).
    s = UNESCAPE_RE.sub(r"\1", s)
    s = s.replace(r"\&", "&")
    return s


def main() -> int:
    if not CODE_MD.exists():
        raise SystemExit(f"Missing {CODE_MD}")

    lines = CODE_MD.read_text(encoding="utf-8", errors="replace").splitlines()

    i = 0
    extracted: list[tuple[str, str]] = []
    while i < len(lines):
        line = lines[i]
        if "FILE:" not in line:
            i += 1
            continue

        m = re.search(r"FILE:\s*([^\r\n]+?)\s*$", line)
        if not m:
            i += 1
            continue

        raw_path = m.group(1).strip()
        raw_path = raw_path.replace("(COMPLETE)", "").strip()
        # Some headers include a trailing comment marker; keep only the path token.
        file_path = raw_path.split()[0]

        i += 1
        # Skip the header terminator line (the header is typically 3 lines: start, FILE, end).
        if i < len(lines) and HEADER_END_RE.search(lines[i]):
            i += 1
        # Skip blank lines after headers.
        while i < len(lines) and lines[i].strip() == "":
            i += 1

        buf: list[str] = []
        while i < len(lines):
            if "FILE:" in lines[i]:
                break
            if HEADER_START_RE.search(lines[i]):
                # Start of the next header block; stop without consuming it.
                break
            if CHAT_MARKER_RE.match(lines[i]):
                break
            if BARE_FILENAME_RE.match(lines[i]):
                break
            if lines[i].strip() == "code":
                i += 1
                continue
            buf.append(lines[i])
            i += 1

        content = "\n".join(buf).strip("\n")
        content = unescape_markdown(content)
        extracted.append((file_path, content))

    if not extracted:
        raise SystemExit("No FILE sections found in code.md")

    for rel, content in extracted:
        out_path = ROOT / rel
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(content + "\n", encoding="utf-8")

    print(f"Extracted {len(extracted)} files into {ROOT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
