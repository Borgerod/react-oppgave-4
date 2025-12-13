/**
 * Fetches Gutendex books pages and extracts category labels found in
 * `subjects` and `bookshelves` entries that include the word "category".
 *
 * The function follows the paginated `next` links until exhausted and
 * returns a deduplicated array of extracted category names.
 */
export async function fetchCategories(opts?: {
	startPage?: number;
	maxPages?: number;
	maxConsecutiveFailures?: number;
}): Promise<string[]> {
	const startPage = opts?.startPage ?? 1;
	const maxPages = opts?.maxPages ?? 500; // safety upper bound
	// Allow a higher default for consecutive failures so intermittent 5xx
	// responses don't stop the crawl prematurely. Caller can override via opts.
	const maxConsecutiveFailures = opts?.maxConsecutiveFailures ?? 100;

	const found = new Set<string>();

	// We'll iterate by page number so we can skip failing pages and continue.
	let page = startPage;
	let pagesFetched = 0;
	let consecutiveFailures = 0;

	const maxAttempts = 3;

	while (
		pagesFetched < maxPages &&
		consecutiveFailures < maxConsecutiveFailures
	) {
		const url = `/api/books?page=${page}`;

		let res: Response | null = null;
		let attempt = 0;

		while (attempt < maxAttempts) {
			attempt += 1;
			try {
				res = await fetch(url);
			} catch (err) {
				console.warn(
					`fetchCategories: network error for ${url} (attempt ${attempt})`,
					err
				);
				res = null;
			}
			if (res && res.ok) break;
			// If non-retriable error (4xx) break attempts
			if (res && res.status >= 400 && res.status < 500) break;
			// backoff
			await new Promise((r) => setTimeout(r, 150 * attempt));
		}

		if (!res) {
			console.warn(
				`fetchCategories: failed to fetch ${url} after ${maxAttempts} attempts; skipping page`
			);
			consecutiveFailures += 1;
			page += 1;
			continue;
		}

		if (!res.ok) {
			// Non-OK responses (e.g. 5xx) are skipped but not treated as fatal by default.
			console.warn(
				`fetchCategories: server returned ${res.status} ${res.statusText} for ${url}; skipping page`
			);
			consecutiveFailures += 1;
			page += 1;
			continue;
		}

		// successful page
		consecutiveFailures = 0;
		pagesFetched += 1;

		const data = await res.json();

		if (Array.isArray(data.results)) {
			for (const book of data.results) {
				if (!Array.isArray(book.bookshelves)) continue;
				for (const shelf of book.bookshelves) {
					const s = String(shelf || "").trim();
					// Match the productCard criteria exactly: must include "Category:" and must NOT include "Literature"
					if (!s.includes("Category:")) continue;
					if (s.includes("Literature")) continue;
					const parts = s.split("Category:");
					const label = (parts[1] || "").trim();
					if (!label) continue;
					found.add(label);
				}
			}
		}

		// If Gutendex returned no next link, we can stop early.
		if (!data.next) break;

		page += 1;
	}

	const topics = Array.from(found).sort();

	// Best-effort: persist topics in browser localStorage and inform server cache.
	try {
		if (typeof window !== "undefined" && topics.length > 0) {
			try {
				localStorage.setItem("gutendex:topics", JSON.stringify(topics));
			} catch (e) {
				console.warn(
					"fetchCategories: failed to write localStorage topics",
					e
				);
			}

			try {
				await fetch("/api/topics/cache", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ topics }),
				});
			} catch (e) {
				console.warn("fetchCategories: failed to POST topics cache", e);
			}
		}
	} catch (e) {
		console.warn("fetchCategories: error while persisting topics", e);
	}

	return topics;
}

export default fetchCategories;
