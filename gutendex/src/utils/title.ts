import type { Title, Book } from "@/types";

export function parseTitle(input: string | Title): Title {
	if (!input) return { main: "Untitled" };
	if (typeof input !== "string") return { ...input };

	const titleParts = input
		// .split(/[:\-–—]/)

		.split(/[:\-–—;,]/)
		.map((p) => p.trim())
		.filter(Boolean);
	const main = titleParts.length > 0 ? titleParts[0] : input || "Untitled";
	const sub =
		titleParts.length > 1 ? titleParts.slice(1).join(" - ") : undefined;
	return { main, sub };
}

// Normalize a raw book object (from upstream) so `title` is a `Title`.
export function ensureBookTitle(raw: Book): Book {
	// shallow clone and replace title
	return {
		...(raw as Book),
		title: parseTitle((raw && raw.title) || ""),
	} as Book;
}
