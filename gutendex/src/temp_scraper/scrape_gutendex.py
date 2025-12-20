"""Scrape the Gutendex books API and save the results as a pandas DataFrame.

This script paginates through `https://gutendex.com/books/` until no `next` page
remains, normalizes key fields (authors, subjects, bookshelves, formats, etc.),
and saves the combined dataset to CSV and pickle files.

Usage:
    python scrape_gutendex.py --output-csv books.csv --output-pickle books.pkl

By default the outputs are saved into the same folder as this script.

Dependencies:
    pip install requests pandas
"""
from __future__ import annotations

import argparse
import json
import math
import time
from typing import Any, Dict, List
from pathlib import Path

import pandas as pd
import requests
from requests.adapters import HTTPAdapter
from requests.exceptions import RequestException
from urllib3.util.retry import Retry


API_BASE = "https://gutendex.com/books/"


def requests_session_with_retries(total_retries: int = 5, backoff_factor: float = 0.5) -> requests.Session:
    s = requests.Session()
    retries = Retry(
        total=total_retries,
        backoff_factor=backoff_factor,
        status_forcelist=(429, 500, 502, 503, 504),
        allowed_methods=("GET",),
    )
    adapter = HTTPAdapter(max_retries=retries)
    s.mount("https://", adapter)
    s.mount("http://", adapter)
    return s


def normalize_book(book: Dict[str, Any]) -> Dict[str, Any]:
    """Flatten and normalize a single book record into simple fields."""
    def join_names(items: List[Dict[str, Any]]) -> str:
        return ", ".join([i.get("name", "") for i in items]) if items else ""

    def join_list(items: List[str]) -> str:
        return ", ".join(items) if items else ""

    normalized = {
        "id": book.get("id"),
        "title": book.get("title"),
        "subtitle": book.get("subtitle"),
        "authors": join_names(book.get("authors", [])),
        "translators": join_names(book.get("translators", [])),
        "subjects": join_list(book.get("subjects", [])),
        "bookshelves": join_list(book.get("bookshelves", [])),
        "languages": join_list(book.get("languages", [])),
        "copyright": book.get("copyright"),
        "media_type": book.get("media_type"),
        "download_count": book.get("download_count"),
        # Keep formats as a JSON string to preserve keys like "text/html; charset=utf-8"
        "formats": json.dumps(book.get("formats", {}), ensure_ascii=False),
    }
    return normalized


def scrape_all_books(
    session: requests.Session,
    sleep: float = 0.0,
    max_pages: int | None = None,
    output_csv: Path | None = None,
    output_pickle: Path | None = None,
    flush_every: int = 1,
) -> List[Dict[str, Any]]:
    """Paginate through the API and return a list of normalized book dicts."""
    results: List[Dict[str, Any]] = []

    # First request to get count and page size
    try:
        resp = session.get(API_BASE, timeout=30)
        resp.raise_for_status()
    except RequestException as e:
        raise SystemExit(f"Initial request failed: {e}")

    data = resp.json()
    count = data.get("count", 0)
    page_size = len(data.get("results", [])) or 32
    total_pages = math.ceil(count / page_size) if count and page_size else None

    # If API doesn't provide total count, we'll iterate until 'next' is None
    if total_pages:
        pages_to_fetch = total_pages
        if max_pages:
            pages_to_fetch = min(pages_to_fetch, max_pages)
    else:
        pages_to_fetch = max_pages or 999999

    # Iterate by page number so we can continue on per-page errors
    fetched_pages = 0
    # If total_pages is known use it, otherwise use pages_to_fetch that may be bounded by max_pages
    max_to_iterate = pages_to_fetch

    for page_num in range(1, (max_to_iterate or 0) + 1):
        if max_pages and fetched_pages >= max_pages:
            break

        # Build URL for this page. Gutendex supports `?page=` parameter.
        url = API_BASE if page_num == 1 else f"{API_BASE}?page={page_num}"

        try:
            resp = session.get(url, timeout=30)
            resp.raise_for_status()
        except RequestException as e:
            # Log and continue to the next page rather than stopping the whole run
            print(f"Warning: request failed for page {page_num} ({url}): {e}. Continuing to next page.")
            fetched_pages += 1
            if sleep:
                time.sleep(sleep)
            continue

        try:
            page_data = resp.json()
        except ValueError as e:
            print(f"Warning: failed to decode JSON for page {page_num} ({url}): {e}. Continuing.")
            fetched_pages += 1
            if sleep:
                time.sleep(sleep)
            continue

        page_records: List[Dict[str, Any]] = []
        for book in page_data.get("results", []):
            nr = normalize_book(book)
            results.append(nr)
            page_records.append(nr)

        fetched_pages += 1

        # If an output CSV was provided, append this page's records to it immediately
        if output_csv and page_records:
            try:
                page_df = pd.DataFrame.from_records(page_records)
                write_header = not output_csv.exists()
                page_df.to_csv(str(output_csv), mode="a", header=write_header, index=False)
            except Exception as e:
                print(f"Warning: failed to write page {page_num} to CSV ({output_csv}): {e}")

        # Update pickle periodically (every `flush_every` pages) if requested
        if output_pickle and (fetched_pages % flush_every == 0):
            try:
                pd.DataFrame.from_records(results).to_pickle(str(output_pickle))
            except Exception as e:
                print(f"Warning: failed to write pickle after page {page_num} ({output_pickle}): {e}")
        # Print a short progress message every 10 pages to avoid noisy output
        if fetched_pages % 10 == 0:
            if total_pages:
                print(f"Fetched {fetched_pages}/{pages_to_fetch} pages...")
            else:
                print(f"Fetched {fetched_pages} pages...")

        if sleep:
            time.sleep(sleep)

    # Final progress
    if fetched_pages and fetched_pages % 10 != 0:
        if total_pages:
            print(f"Fetched {fetched_pages}/{pages_to_fetch} pages.")
        else:
            print(f"Fetched {fetched_pages} pages.")

    return results


def to_dataframe(records: List[Dict[str, Any]]) -> pd.DataFrame:
    df = pd.DataFrame.from_records(records)
    # Reorder common columns if present
    preferred_order = [
        "id",
        "title",
        "subtitle",
        "authors",
        "translators",
        "subjects",
        "bookshelves",
        "languages",
        "media_type",
        "copyright",
        "download_count",
        "formats",
    ]
    cols = [c for c in preferred_order if c in df.columns] + [c for c in df.columns if c not in preferred_order]
    return df.loc[:, cols]


def main() -> None:
    parser = argparse.ArgumentParser(description="Scrape Gutendex books API into a DataFrame")
    parser.add_argument("--output-csv", default=None, help="CSV output path (defaults to script folder)")
    parser.add_argument("--output-pickle", default=None, help="Pickle output path (defaults to script folder)")
    parser.add_argument("--max-pages", type=int, default=None, help="Limit number of pages to fetch (for testing)")
    parser.add_argument("--sleep", type=float, default=0.0, help="Seconds to sleep between page requests")
    args = parser.parse_args()

    # Determine default output paths inside the script folder (src/temp_scraper)
    script_dir = Path(__file__).resolve().parent
    default_csv = script_dir / "gutendex_books.csv"
    default_pickle = script_dir / "gutendex_books.pkl"

    # If user didn't provide outputs, use the defaults in script folder
    output_csv = Path(args.output_csv) if args.output_csv else default_csv
    output_pickle = Path(args.output_pickle) if args.output_pickle else default_pickle

    session = requests_session_with_retries()
    print("Starting scrape of Gutendex books API...")
    records = scrape_all_books(
        session,
        sleep=args.sleep,
        max_pages=args.max_pages,
        output_csv=output_csv,
        output_pickle=output_pickle,
    )

    df = to_dataframe(records)

    # Append-mode was chosen: we already appended pages to CSV during the run.
    # Write final pickle snapshot if requested (overwrite or create).
    if output_pickle:
        try:
            df.to_pickle(str(output_pickle))
        except Exception as e:
            print(f"Warning: failed to write final pickle ({output_pickle}): {e}")

    print(f"Fetched {len(df)} books. Final snapshot saved (pickle: {output_pickle}).")

    print("Done.")


if __name__ == "__main__":
    main()
