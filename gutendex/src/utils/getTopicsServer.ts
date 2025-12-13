/**
 * Server-side helper to fetch topics (subjects + bookshelves) from Gutendex.
 * Intended to be called from server components (app router) so the work
 * happens on the server and the client receives the list as props.
 */
import { readTopicsCache, writeTopicsCache, isCacheValid } from "./topicsCache";

export async function getTopicsServer(limitPages?: number): Promise<string[]> {
	// If no page limit requested (full crawl), try cache first
	if (limitPages == null) {
		try {
			const cache = await readTopicsCache();
			if (isCacheValid(cache)) {
				return Array.from(new Set(cache!.topics)).sort();
			}
		} catch (e) {
			console.warn("getTopicsServer: cache read failed", e);
		}
	}

	const found = new Set<string>();
	let url: string | null = "https://gutendex.com/books";
	let pages = 0;

	// Continue until `data.next` is null, or until `limitPages` (if provided) is reached.
	while (url && (limitPages == null || pages < limitPages)) {
		let res: Response | undefined = undefined;
		try {
			res = await fetch(url, { next: { revalidate: 3600 } });
		} catch (e) {
			console.warn("getTopicsServer: fetch failed for", url, e);
			break;
		}
		if (!res || !res.ok) break;
		const data = await res.json();

		if (Array.isArray(data.results)) {
			for (const book of data.results) {
				// Bookshelves: follow the productCard logic — only include shelves
				// that include "Category:" and exclude ones mentioning "Literature".
				if (Array.isArray(book.bookshelves)) {
					for (const b of book.bookshelves) {
						const shelf = String(b);
						if (
							shelf.includes("Category:") &&
							!shelf.includes("Literature")
						) {
							const parts = shelf.split("Category:");
							const label = parts[1]
								? parts[1].trim()
								: parts[0].trim();
							if (label) found.add(label);
						}
					}
				}
			}
		}

		url = data.next || null;
		pages += 1;
	}

	const topics = Array.from(found).sort();

	// If this was a full crawl, write cache for faster future responses
	if (limitPages == null) {
		try {
			// cache for 24 hours
			await writeTopicsCache(topics, 60 * 60 * 24);
		} catch (e) {
			console.warn("getTopicsServer: failed to write cache", e);
		}
	}

	return topics;
}

export default getTopicsServer;
