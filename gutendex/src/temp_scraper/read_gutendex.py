"""Load `gutendex_books.csv` (located next to this script) into a pandas DataFrame and print it.

This script intentionally does exactly two things:
1. Load `gutendex_books.csv` from the same folder as this script.
2. Print the resulting pandas DataFrame to stdout.

Dependencies:
    pip install pandas
"""

from pathlib import Path
import pandas as pd
from collections import Counter, defaultdict
from pprint import pprint
import re

def printFirstRow(df):
    
    if len(df) > 0:
        first_item = df.iloc[[0]].T 
        print(first_item)

def printAll(df):
    print(df)


def get_bookshelf_counts(dataframe: pd.DataFrame) -> dict:
    if "bookshelves" not in dataframe.columns:
        return {}

    counter = Counter()
    for val in dataframe["bookshelves"].dropna():
        # Treat value as an array-like string and split by comma.
        # Remove surrounding brackets and strip quotes from items.
        parts = []
        if isinstance(val, (list, tuple)):
            parts = [str(p).strip() for p in val if str(p).strip()]
        elif isinstance(val, str):
            s = val.strip()
            # Remove surrounding brackets if present (e.g. "[...]")
            if s.startswith("[") and s.endswith("]"):
                s = s[1:-1]

            # Split on comma and clean each token
            parts = [token.strip().strip('"').strip("'") for token in s.split(",") if token.strip()]
        else:
            parts = []

        counter.update(parts)

    return dict(counter)


def get_subject_counts(dataframe: pd.DataFrame) -> dict:
    """Count occurrences of subjects across the dataframe.

    Mirrors the behavior of `get_bookshelf_counts` but for the `subjects`
    column. Returns mapping subject -> occurrence_count.
    """
    if "subjects" not in dataframe.columns:
        return {}

    counter = Counter()
    for val in dataframe["subjects"].dropna():
        parts = []
        if isinstance(val, (list, tuple)):
            parts = [str(p).strip() for p in val if str(p).strip()]
        elif isinstance(val, str):
            s = val.strip()
            if s.startswith("[") and s.endswith("]"):
                s = s[1:-1]
            parts = [token.strip().strip('"').strip("'") for token in re.split(r"[,;|]", s) if token.strip()]
        else:
            parts = []

        counter.update(parts)

    return dict(counter)


def get_author_downloads(dataframe: pd.DataFrame) -> dict:
    """Aggregate download_count per author.

    Expects columns `authors` (comma-separated string of author names) and
    `download_count` (numeric). Returns mapping author -> total_downloads.
    """
    if "authors" not in dataframe.columns or "download_count" not in dataframe.columns:
        return {}

    totals = defaultdict(int)
    for _, row in dataframe.iterrows():
        authors = row.get("authors")
        dl = row.get("download_count", 0)
        # normalize download value (robust to strings like "1,234")
        dl_val = 0
        try:
            if pd.isna(dl):
                dl_val = 0
            else:
                s = str(dl).strip()
                if not s or s.lower() in ("none", "nan"):
                    dl_val = 0
                else:
                    # remove thousands separators
                    s = s.replace(",", "")
                    if "." in s:
                        dl_val = int(float(s))
                    else:
                        dl_val = int(s)
        except Exception:
            dl_val = 0

        def _parse_authors_field(a_field):
            if isinstance(a_field, (list, tuple)):
                return [str(x).strip() for x in a_field if str(x).strip()]
            if not isinstance(a_field, str):
                return []
            s = a_field.strip()
            if not s:
                return []
            # If authors are separated by semicolons, use that
            if ";" in s:
                return [p.strip() for p in s.split(";") if p.strip()]
            # If authors are joined with ' and ', split on that
            if " and " in s and "," not in s:
                return [p.strip() for p in s.split(" and ") if p.strip()]
            # Otherwise, assume the pattern is "Lastname, Firstname" for each author
            # which were concatenated with commas. Group tokens in pairs: [Last, First, Last2, First2] -> (Last, First)
            tokens = [t.strip() for t in s.split(",") if t.strip()]
            if len(tokens) >= 2 and len(tokens) % 2 == 0:
                parts = []
                for i in range(0, len(tokens), 2):
                    parts.append(tokens[i] + ", " + tokens[i + 1])
                return parts
            # Fallback: return the whole string as one author
            return [s]

        parts = _parse_authors_field(authors)

        for a in parts:
            # Normalize and skip unwanted placeholder authors
            a_norm = re.sub(r"\s+", " ", str(a).strip()).strip(". ")
            if not a_norm:
                continue
            low = a_norm.lower()
            if low in ("various", "anonymous", "various authors", "anon"):
                continue
            totals[a_norm] += dl_val

    return dict(totals)


def get_subject_downloads(dataframe: pd.DataFrame) -> dict:
    """Aggregate download_count per subject.

    Expects a `subjects` column which may contain list-like values or
    delimiter-separated strings. Returns mapping subject -> total_downloads.
    """
    if "subjects" not in dataframe.columns or "download_count" not in dataframe.columns:
        return {}

    totals = defaultdict(int)
    for _, row in dataframe.iterrows():
        subj = row.get("subjects")
        dl = row.get("download_count", 0)

        # normalize download value (same logic as authors)
        dl_val = 0
        try:
            if pd.isna(dl):
                dl_val = 0
            else:
                s = str(dl).strip()
                if not s or s.lower() in ("none", "nan"):
                    dl_val = 0
                else:
                    s = s.replace(",", "")
                    if "." in s:
                        dl_val = int(float(s))
                    else:
                        dl_val = int(s)
        except Exception:
            dl_val = 0

        # parse subjects field into a list of subject strings
        parts = []
        if isinstance(subj, (list, tuple)):
            parts = [str(x).strip() for x in subj if str(x).strip()]
        elif isinstance(subj, str):
            s = subj.strip()
            if not s:
                parts = []
            else:
                # remove surrounding brackets if present
                if s.startswith("[") and s.endswith("]"):
                    s = s[1:-1]
                # prefer semicolon/pipe split if present
                if ";" in s or "|" in s:
                    parts = [p.strip().strip('"').strip("'") for p in re.split(r"[;|]", s) if p.strip()]
                else:
                    # fallback: split on comma
                    parts = [p.strip().strip('"').strip("'") for p in s.split(",") if p.strip()]
        else:
            parts = []

        for p in parts:
            p_norm = re.sub(r"\s+", " ", str(p).strip())
            if not p_norm:
                continue
            totals[p_norm] += dl_val

    return dict(totals)



def main() -> None:
    script_dir = Path(__file__).resolve().parent
    csv_path = script_dir / "gutendex_books.csv"
    if not csv_path.exists():
        raise SystemExit(f"CSV file not found: {csv_path}")

    df = pd.read_csv(csv_path)
    # printFirstRow(df)

    # counts = get_bookshelf_counts(df)
    # # Simple descending sort: sort the (bookshelf, count) pairs by count
    # pprint(sorted(counts.items(), key=lambda kv: kv[1], reverse=True))
    
    
    # # Now compute total downloads per author and print sorted (largest first)
    # author_downloads = get_author_downloads(df)
    # top10 = sorted(author_downloads.items(), key=lambda kv: kv[1], reverse=True)[:10]
    # pprint(top10)

    # # Also print top subjects by occurrence count (like bookshelves)
    # subject_counts = get_subject_counts(df)
    # top_subjects = sorted(subject_counts.items(), key=lambda kv: kv[1], reverse=True)[:100]
    # pprint(top_subjects)

    # Also print top subjects by occurrence count (like bookshelves)
    bookshelf_counts = get_bookshelf_counts(df)
    top_bookshelf = sorted(bookshelf_counts.items(), key=lambda kv: kv[1], reverse=True)[:100]
    pprint(top_bookshelf)


if __name__ == "__main__":
    main()
