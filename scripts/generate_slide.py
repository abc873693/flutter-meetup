#!/usr/bin/env python3
"""Generate Flutter Taipei monthly meetup slides from RSS feeds + Claude.

草稿層與呈現層分離：
    RSS ─► Claude ─► <num>/topics.json  ─► render ─► <num>/slide.md
                     （草稿，PR 審這個）        （呈現，可手動微調）

topics.json 是結構化草稿，diff 乾淨、適合在 PR 上 review。
改完 topics.json 後用 --render-only 重新產生 slide.md。

Usage:
    python scripts/generate_slide.py                 # auto: latest+1, 當月
    python scripts/generate_slide.py --num 38
    python scripts/generate_slide.py --month 2026-09
    python scripts/generate_slide.py --dry-run       # 印出來，不寫檔
    python scripts/generate_slide.py --render-only --num 37   # 只從 topics.json 重產 slide.md
    python scripts/generate_slide.py --force         # 覆寫已存在的 slide.md

Env:
    ANTHROPIC_API_KEY     required（--render-only 不需要）
    ANTHROPIC_MODEL       optional, 預設 claude-sonnet-5
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_MODEL = os.environ.get("ANTHROPIC_MODEL", "claude-sonnet-5")

# Feeds curated for Flutter Taipei monthly digest. Add/remove as needed.
# 2026/07 起 Flutter 與 Dart 官方 blog 都搬離 Medium：blog.flutter.dev/feed 現在
# 301 到一個 404，medium.com/feed/dartlang 只剩搬家公告。用新家的 Atom feed。
FEEDS = [
    "https://flutter.dev/blog/feed.xml",
    "https://dart.dev/blog/feed.xml",
    "https://www.reddit.com/r/FlutterDev/.rss",
]

MONTH_ZH = {
    1: "一月", 2: "二月", 3: "三月", 4: "四月", 5: "五月", 6: "六月",
    7: "七月", 8: "八月", 9: "九月", 10: "十月", 11: "十一月", 12: "十二月",
}

MAX_BULLETS_PER_PAGE = 6

# Claude 必須用這個 tool 回覆，才能拿到可驗證的結構化草稿而非自由格式 markdown。
TOPIC_TOOL = {
    "name": "emit_topic",
    "description": "輸出一則整理好的 Flutter 月報主題。",
    "input_schema": {
        "type": "object",
        "properties": {
            "title": {
                "type": "string",
                "description": "投影片標題，簡潔有力，10 字以內為佳。",
            },
            "tagline": {
                "type": "string",
                "description": "一句話說明這則消息的重點，可留空字串。",
            },
            "bullets": {
                "type": "array",
                "items": {"type": "string"},
                "description": (
                    "3 到 6 個重點，每點一行，繁體中文。"
                    "重要關鍵字用 **粗體**，程式碼/API/指令用 `backtick`。"
                ),
            },
            "source_label": {
                "type": "string",
                "description": "來源平台名稱：官方 Medium / Reddit / 文章。",
            },
        },
        "required": ["title", "bullets", "source_label"],
    },
}

SUMMARIZE_PROMPT = """你正在為 Flutter Taipei 月會整理當月 Flutter 大小事。

請閱讀以下文章，用 `emit_topic` tool 輸出一則主題。

規則：
1. 全部用繁體中文（台灣用語），技術名詞、API、套件名保留英文原文。
2. bullets 控制在 3 到 6 點，每點盡量在 30 字以內，聚焦「開發者要知道什麼」。
3. 重要關鍵字用 **粗體**，程式碼、API、指令、檔名用 `backtick` 包起來。
4. 不要憑空編造版本號、日期或數據；資訊不足就少寫，寧可簡短。
5. source_label 依 url 判斷：blog.flutter.dev / flutter.dev → 官方 Medium；reddit.com → Reddit；其他 → 文章。

文章標題：{title}
文章來源 URL：{url}
文章內容：
{content}
"""

GDG_STYLE = """<style>
/* GDG brand — https://developers.google.com/community/gdg/brand-guidelines
   選擇器一律帶 section 前綴：Marp 會補上與 default theme 同級的高特異性前綴，
   少了 section 就會被 theme 的 `section :is(h1)` 蓋掉。 */

section {
  --h1-color: #1e1e1e;
  --heading-strong-color: #4285f4;
  --paginate-color: #5f6368;
  background: #ffffff;
  color: #1e1e1e;
  font-family: "Google Sans", "Product Sans", Roboto, "Noto Sans TC",
    "PingFang TC", "Microsoft JhengHei", sans-serif;
  font-size: 26px;
  line-height: 1.65;
  padding: 64px 72px;
}

section h1 {
  font-size: 52px;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 28px;
  padding-bottom: 20px;
  background-image: linear-gradient(
    to right,
    #4285f4 0 25%, #ea4335 25% 50%, #f9ab00 50% 75%, #34a853 75% 100%
  );
  background-repeat: no-repeat;
  background-size: 200px 6px;
  background-position: left bottom;
}

section h2 { font-size: 34px; font-weight: 500; color: #4285f4; }
section h3 { font-size: 28px; font-weight: 400; color: #5f6368; }

section code {
  font-family: "Google Sans Mono", "Roboto Mono", "SF Mono", monospace;
  background: #f0f0f0;
  color: #1e1e1e;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.88em;
}
section a { color: #4285f4; text-underline-offset: 3px; }

section ul > li::marker { color: #4285f4; }
section ul ul > li::marker { color: #34a853; }
section ul ul { font-size: 0.92em; color: #3c4043; }
section li { margin: 0.3em 0; }

section blockquote {
  border-left: 5px solid #f9ab00;
  background: #fffdf5;
  margin: 20px 0;
  padding: 12px 22px;
  color: #1e1e1e;
  font-style: normal;
}

/* 封面：疊在 cover.png 上，不要四色底線 */
section.cover h1 {
  background-image: none;
  padding-bottom: 0;
  font-size: 76px;
  margin-top: 120px;
}

/* 段落分隔頁：GDG 藍底 */
section.divider {
  --h1-color: #ffffff;
  --paginate-color: rgba(255, 255, 255, 0.8);
  background: #4285f4;
  color: #ffffff;
}
section.divider h1 {
  font-size: 64px;
  background-image: linear-gradient(
    to right,
    #ffffff 0 25%, #f9ab00 25% 50%, #c3ecf6 50% 75%, #34a853 75% 100%
  );
}
section.divider h2 { color: #ffffff; opacity: 0.92; }
</style>"""

SLIDE_TEMPLATE = """---
marp: true
title: Flutter 小聚 \\#%%NUM%%
description: %%YEAR%%/%%MONTH_PAD%% 有趣新知
author: Rainer Fang
keywords: Flutter, Dart
theme: default
size: 16:9
paginate: true
---

%%STYLE%%

<!-- _class: cover -->

# Flutter 小聚 #%%NUM%%

### %%YEAR%% / %%MONTH_PAD%% ・ GDG Taipei × Flutter Taipei

![bg](../images/cover.png)

---

# 小聚說明

- 主辦社群: **GDG Taipei**、**Flutter Taipei**
- 原則上一個月會舉辦一次，時間會在當月**最後一週的週二**
- 地點：**天攏書局 2F**
- 活動主要會分成
  - 當月 Flutter 大小事: 介紹當月 Flutter 相關的大小事
  - 開發者經驗分享: 分享與 Flutter 開發的相關內容，題目不限，可洽志工報名
  - Lightning Talk: 現場/活動事前表單報名，在場有任何想法，可洽志工報名
  - 活動任何問題都可以透過 **Slido** 發問
- 小聚任何行為都參照 GDG 台灣 行為準則 https://gdg.tw/code_of_conduct/

---

![bg width:75%](../images/gdg-taipei.jpeg)

![bg width:80%](../images/gdg-taipei-qr.png)

---

![bg width:90%](../images/flutter-taipei.avif)

![bg width:80%](../images/flutter-taipei-qr.png)

---

# Flutter Taipei 每月月報

![width:80%](../images/medium-post.jpeg)

---

# 上台分享可獲得一個 Pin 針 及 帽子

![bg width:75% right ](../images/sharing-swag.jpeg)

---

# 近期社群活動

- TODO: 補上 GDG Taipei / GDG Cloud Taipei 活動
  - 活動名稱、日期時間、地點、報名連結
- TODO: 近期已辦活動

---

# [Slido](https://app.sli.do/event/TODO)

<!-- TODO: 換成本期的 Slido event 連結，並更新 %%NUM%%/images/slido.png QR -->

![bg width:75% right](./images/slido.png)

---

<!-- _class: divider -->

# Flutter %%MONTH_ZH%%大小事

## TODO: 講者

---

%%TOPICS%%

# Q & A

![bg width:75% right](./images/slido.png)
"""


@dataclass
class Entry:
    title: str
    url: str
    published: datetime
    summary: str  # raw RSS excerpt


def fetch_entries(target_year: int, target_month: int) -> list[Entry]:
    import feedparser

    entries: list[Entry] = []
    for feed_url in FEEDS:
        parsed = feedparser.parse(feed_url)
        for e in parsed.entries:
            published = _parse_date(e)
            if published is None:
                continue
            if published.year != target_year or published.month != target_month:
                continue
            entries.append(Entry(
                title=e.get("title", "").strip(),
                url=e.get("link", "").strip(),
                published=published,
                summary=_strip_html(e.get("summary", "") or e.get("description", "")),
            ))
    seen: set[str] = set()
    unique: list[Entry] = []
    for e in entries:
        if e.url in seen or not e.url:
            continue
        seen.add(e.url)
        unique.append(e)
    unique.sort(key=lambda e: e.published)
    return unique


def _parse_date(entry: dict) -> datetime | None:
    from dateutil import parser as date_parser

    for key in ("published", "updated", "created"):
        raw = entry.get(key)
        if raw:
            try:
                dt = date_parser.parse(raw)
                if dt.tzinfo is None:
                    dt = dt.replace(tzinfo=timezone.utc)
                return dt
            except (ValueError, TypeError):
                continue
    return None


def _strip_html(html: str) -> str:
    text = re.sub(r"<[^>]+>", " ", html)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def fetch_article_body(url: str) -> str:
    """Best-effort fetch of article body. Falls back to empty on failure."""
    import httpx

    try:
        with httpx.Client(follow_redirects=True, timeout=20, headers={
            "User-Agent": "Mozilla/5.0 (FlutterTaipeiBot/1.0)",
        }) as client:
            r = client.get(url)
            r.raise_for_status()
            return _strip_html(r.text)[:8000]
    except Exception as exc:  # noqa: BLE001
        print(f"  ! fetch failed for {url}: {exc}", file=sys.stderr)
        return ""


def summarize_entry(client, entry: Entry) -> dict:
    """Return a structured topic dict. Falls back to a TODO stub on failure."""
    content = fetch_article_body(entry.url) or entry.summary
    if not content:
        return _todo_topic(entry)

    msg = client.messages.create(
        model=DEFAULT_MODEL,
        max_tokens=1500,
        tools=[TOPIC_TOOL],
        tool_choice={"type": "tool", "name": "emit_topic"},
        messages=[{
            "role": "user",
            "content": SUMMARIZE_PROMPT.format(
                title=entry.title,
                url=entry.url,
                content=content,
            ),
        }],
    )
    for block in msg.content:
        if getattr(block, "type", None) == "tool_use":
            topic = dict(block.input)
            topic["source_url"] = entry.url
            topic.setdefault("tagline", "")
            topic.setdefault("source_label", "文章")
            if topic.get("bullets"):
                return topic
    return _todo_topic(entry)


def _todo_topic(entry: Entry) -> dict:
    return {
        "title": entry.title or "TODO: 標題待補",
        "tagline": "TODO: 摘要待補",
        "bullets": ["TODO: 內容待補"],
        "source_label": "文章",
        "source_url": entry.url,
    }


def render_topic(topic: dict) -> list[str]:
    """Render one topic into one or more Marp pages."""
    title = topic.get("title", "TODO")
    tagline = (topic.get("tagline") or "").strip()
    bullets = topic.get("bullets") or []
    label = topic.get("source_label", "文章")
    url = topic.get("source_url", "")

    chunks = [
        bullets[i:i + MAX_BULLETS_PER_PAGE]
        for i in range(0, len(bullets), MAX_BULLETS_PER_PAGE)
    ] or [[]]

    pages: list[str] = []
    for idx, chunk in enumerate(chunks):
        heading = title if idx == 0 else f"{title}（續）"
        lines = [f"# {heading}", ""]
        if idx == 0 and tagline:
            lines += [f"> {tagline}", ""]
        lines += [f"- {b}" for b in chunk]
        if idx == len(chunks) - 1 and url:
            lines += ["", f"- 來源：[{label}]({url})"]
        pages.append("\n".join(lines).rstrip())
    return pages


def build_slide(draft: dict) -> str:
    pages: list[str] = []
    for topic in draft.get("topics", []):
        pages.extend(render_topic(topic))
    glued = "\n\n---\n\n".join(pages)
    if glued:
        glued += "\n\n---\n\n"
    subs = {
        "%%NUM%%": str(draft["num"]),
        "%%YEAR%%": str(draft["year"]),
        "%%MONTH_PAD%%": f"{draft['month']:02d}",
        "%%MONTH_ZH%%": MONTH_ZH[draft["month"]],
        "%%STYLE%%": GDG_STYLE,
        "%%TOPICS%%": glued,
    }
    out = SLIDE_TEMPLATE
    for key, value in subs.items():
        out = out.replace(key, value)
    return out


# 期數目錄是 24 / 35 / 37 這種小數字；repo 裡另有 20260612 這類舊的日期命名目錄，
# 不濾掉會讓 auto-detect 變成 20260613。
MAX_MEETUP_NUM = 999


def auto_detect_num() -> int:
    nums = [
        int(child.name)
        for child in REPO_ROOT.iterdir()
        if child.is_dir() and child.name.isdigit() and int(child.name) <= MAX_MEETUP_NUM
    ]
    return (max(nums) + 1) if nums else 1


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--num", type=int, help="Meetup number; default: latest+1")
    ap.add_argument("--month", help="Target month YYYY-MM; default: current")
    ap.add_argument("--dry-run", action="store_true", help="Print to stdout, don't write")
    ap.add_argument("--render-only", action="store_true",
                    help="Skip RSS/Claude; re-render slide.md from existing topics.json")
    ap.add_argument("--force", action="store_true",
                    help="Overwrite an existing slide.md (default: keep manual edits)")
    args = ap.parse_args()

    if args.month:
        target = datetime.strptime(args.month, "%Y-%m")
    else:
        target = datetime.now()
    year, month = target.year, target.month
    num = args.num or auto_detect_num()

    out_dir = REPO_ROOT / str(num)
    topics_file = out_dir / "topics.json"
    slide_file = out_dir / "slide.md"

    if args.render_only:
        if not topics_file.exists():
            print(f"ERROR: {topics_file} not found", file=sys.stderr)
            return 2
        draft = json.loads(topics_file.read_text(encoding="utf-8"))
        print(f"Rendering #{draft['num']} from {topics_file.name}", file=sys.stderr)
    else:
        if not os.environ.get("ANTHROPIC_API_KEY"):
            print("ERROR: ANTHROPIC_API_KEY env var required", file=sys.stderr)
            return 1

        print(f"Generating #{num} ({year}-{month:02d})", file=sys.stderr)
        entries = fetch_entries(year, month)
        print(f"Found {len(entries)} entries from RSS feeds", file=sys.stderr)
        if not entries:
            print("No entries found for the target month. Aborting.", file=sys.stderr)
            return 2

        from anthropic import Anthropic

        client = Anthropic()
        topics: list[dict] = []
        for i, e in enumerate(entries, 1):
            print(f"  [{i}/{len(entries)}] {e.title[:60]}", file=sys.stderr)
            topics.append(summarize_entry(client, e))

        draft = {
            "num": num,
            "year": year,
            "month": month,
            "model": DEFAULT_MODEL,
            "topics": topics,
        }

    slide_md = build_slide(draft)

    if args.dry_run:
        print(json.dumps(draft, ensure_ascii=False, indent=2))
        print()
        print(slide_md)
        return 0

    out_dir.mkdir(exist_ok=True)
    (out_dir / "images").mkdir(exist_ok=True)

    if not args.render_only:
        topics_file.write_text(
            json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )
        print(f"Wrote {topics_file}", file=sys.stderr)

    if slide_file.exists() and not args.force:
        print(
            f"  ! {slide_file} already exists; keeping manual edits."
            " Re-run with --force to overwrite.",
            file=sys.stderr,
        )
    else:
        slide_file.write_text(slide_md, encoding="utf-8")
        print(f"Wrote {slide_file}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
