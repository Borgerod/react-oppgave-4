import { promises as fs } from "fs";
import path from "path";

// Simple in-memory cache for image lookups during dev/runtime
const imageCache: Map<string, string | null> = new Map();

function fileNameFromAuthor(author: string) {
	let s = String(author || "").trim();
	s = s.replace(/\s+/g, " ");
	if (s.includes(",")) {
		const parts = s
			.split(",")
			.map((p) => p.trim())
			.filter(Boolean);
		if (parts.length >= 2) {
			const last = parts[0];
			const rest = parts.slice(1).join(" ");
			s = `${rest} ${last}`.trim();
		}
	}
	return s.replace(/[.,]/g, "").replace(/\s+/g, "_");
}

async function fetchWikimediaImage(author: string): Promise<string | null> {
	if (imageCache.has(author)) return imageCache.get(author) ?? null;
	try {
		// 1) search for an author page
		const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
			author
		)}&format=json`;
		const sres = await fetch(searchUrl);
		if (!sres.ok) {
			imageCache.set(author, null);
			return null;
		}
		const sjson = await sres.json();
		const first = sjson?.query?.search?.[0];
		let pageTitle = first?.title;
		if (!pageTitle) {
			pageTitle = `File:${fileNameFromAuthor(author)}`;
		}

		// 2) request page images (thumbnail/original)
		const infoUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
			pageTitle
		)}&prop=pageimages|images&piprop=original|thumbnail&pithumbsize=300&format=json`;
		const ires = await fetch(infoUrl);
		if (!ires.ok) {
			imageCache.set(author, null);
			return null;
		}
		const ijson = await ires.json();
		const pages = ijson?.query?.pages;
		if (!pages) {
			imageCache.set(author, null);
			return null;
		}
		const page = Object.values(pages)[0] as any;
		const thumb = page?.thumbnail?.source;
		const orig = page?.original?.source;
		if (thumb) {
			imageCache.set(author, thumb);
			return thumb;
		}
		if (orig) {
			imageCache.set(author, orig);
			return orig;
		}

		// 3) fallback: use first image on the page and request its imageinfo
		const imagesArr = page?.images;
		if (Array.isArray(imagesArr) && imagesArr.length > 0) {
			const imgTitle = imagesArr[0].title;
			const fileApi = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
				imgTitle
			)}&prop=imageinfo&iiprop=url&format=json`;
			const fres = await fetch(fileApi);
			if (!fres.ok) {
				imageCache.set(author, null);
				return null;
			}
			const fjson = await fres.json();
			const fpages = fjson?.query?.pages;
			const fpage = Object.values(fpages)[0] as any;
			const info = fpage?.imageinfo?.[0];
			const url = info?.url ?? null;
			imageCache.set(author, url);
			return url;
		}

		imageCache.set(author, null);
		return null;
	} catch (e) {
		imageCache.set(author, null);
		return null;
	}
}

function parseCSV(text: string) {
	const rows: string[][] = [];
	let cur = "";
	let row: string[] = [];
	let inQuotes = false;
	for (let i = 0; i < text.length; i++) {
		const ch = text[i];
		if (ch === '"') {
			// handle escaped quotes ""
			if (inQuotes && text[i + 1] === '"') {
				cur += '"';
				i++;
			} else {
				inQuotes = !inQuotes;
			}
			continue;
		}
		if (ch === "," && !inQuotes) {
			row.push(cur);
			cur = "";
			continue;
		}
		if ((ch === "\n" || ch === "\r") && !inQuotes) {
			// handle CRLF by skipping lone \r
			if (ch === "\r" && text[i + 1] === "\n") continue;
			row.push(cur);
			rows.push(row);
			row = [];
			cur = "";
			continue;
		}
		cur += ch;
	}
	// push last
	if (cur !== "" || row.length > 0) {
		row.push(cur);
		rows.push(row);
	}
	return rows;
}

function rowsToObjects(rows: string[][]) {
	if (rows.length === 0) return [];
	const header = rows[0].map((h) => h.trim());
	const objs = [] as Record<string, string>[];
	for (let i = 1; i < rows.length; i++) {
		const r = rows[i];
		if (r.length === 1 && r[0].trim() === "") continue;
		const obj: Record<string, string> = {};
		for (let j = 0; j < header.length; j++) {
			obj[header[j]] = r[j] ?? "";
		}
		objs.push(obj);
	}
	return objs;
}

function parseAuthorsField(a: string): string[] {
	if (!a) return [];
	const s = a.trim();
	if (!s) return [];
	// If semicolon separated
	if (s.includes(";"))
		return s
			.split(";")
			.map((p) => p.trim())
			.filter(Boolean);
	// If ' and ' and no commas
	if (s.includes(" and ") && !s.includes(","))
		return s
			.split(" and ")
			.map((p) => p.trim())
			.filter(Boolean);
	// If field is quoted JSON-like list: ["a","b"]
	if (s.startsWith("[") && s.endsWith("]")) {
		try {
			const parsed = JSON.parse(s);
			if (Array.isArray(parsed))
				return parsed.map((p) => String(p).trim()).filter(Boolean);
		} catch (e) {
			// fallthrough
		}
	}
	// Otherwise try to split on commas and if tokens look like paired Last, First produce pairs
	const tokens = s
		.split(",")
		.map((t) => t.trim())
		.filter(Boolean);
	if (tokens.length >= 2 && tokens.length % 2 === 0) {
		const parts: string[] = [];
		for (let i = 0; i < tokens.length; i += 2) {
			parts.push(`${tokens[i]}, ${tokens[i + 1]}`);
		}
		return parts;
	}
	return [s];
}

export async function GET() {
	const csvPath = path.join(
		process.cwd(),
		"src",
		"temp_scraper",
		"gutendex_books.csv"
	);
	let text: string;
	try {
		text = await fs.readFile(csvPath, "utf8");
	} catch (err) {
		return new Response(
			JSON.stringify({ error: `CSV not found: ${csvPath}` }),
			{ status: 500, headers: { "Content-Type": "application/json" } }
		);
	}

	const rows = parseCSV(text);
	const objs = rowsToObjects(rows);

	const totals: Record<string, number> = {};
	for (const row of objs) {
		const authorsField = (row["authors"] ?? row["author"] ?? "").toString();
		const dlField = (
			row["download_count"] ??
			row["downloads"] ??
			"0"
		).toString();
		let dl = 0;
		try {
			const s = dlField.replace(/,/g, "").trim();
			if (s === "" || /nan|none/i.test(s)) dl = 0;
			else dl = Math.floor(Number(s) || 0);
		} catch (e) {
			dl = 0;
		}
		const parts = parseAuthorsField(authorsField);
		for (let a of parts) {
			if (!a) continue;
			a = a
				.replace(/\s+/g, " ")
				.trim()
				.replace(/^[\.\s]+|[\.\s]+$/g, "");
			const low = a.toLowerCase();
			if (
				["various", "anonymous", "various authors", "anon"].includes(
					low
				)
			)
				continue;
			totals[a] = (totals[a] || 0) + dl;
		}
	}

	const top = Object.entries(totals)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 9)
		.map(([author, count]) => ({ author, count }));

	// enrich with image URLs server-side (parallel)
	const enriched = await Promise.all(
		top.map(async (it) => {
			try {
				const img = await fetchWikimediaImage(it.author);
				return { ...it, image: img };
			} catch (e) {
				return { ...it, image: null };
			}
		})
	);

	return new Response(JSON.stringify({ top9: enriched }), {
		headers: { "Content-Type": "application/json" },
	});
}
