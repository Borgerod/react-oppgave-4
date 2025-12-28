import { promises as fs } from "fs";
import path from "path";

// Disk-backed cache for image lookups
const imageCache: Map<string, string | null> = new Map();
const IMAGE_CACHE_PATH = path.join(
	process.cwd(),
	"src",
	"temp_scraper",
	"author_image_cache.json"
);

// Load cache from disk on startup
async function loadImageCacheFromDisk() {
	try {
		const data = await fs.readFile(IMAGE_CACHE_PATH, "utf8");
		const obj = JSON.parse(data);
		for (const [k, v] of Object.entries(obj)) {
			imageCache.set(k, v as string | null);
		}
	} catch {}
}

// Write cache to disk
async function writeImageCacheToDisk() {
	try {
		const obj: Record<string, string | null> = {};
		for (const [k, v] of imageCache.entries()) {
			obj[k] = v;
		}
		await fs.writeFile(
			IMAGE_CACHE_PATH,
			JSON.stringify(obj, null, 2),
			"utf8"
		);
	} catch {}
}

// Ensure cache is loaded at module load
let imageCacheLoaded = false;
async function ensureImageCacheLoaded() {
	if (!imageCacheLoaded) {
		await loadImageCacheFromDisk();
		imageCacheLoaded = true;
	}
}

// function fileNameFromAuthor(author: string) {
// 	let s = String(author || "").trim();
// 	s = s.replace(/\s+/g, " ");
// 	if (s.includes(",")) {
// 		const parts = s
// 			.split(",")
// 			.map((p) => p.trim())
// 			.filter(Boolean);
// 		if (parts.length >= 2) {
// 			const last = parts[0];
// 			const rest = parts.slice(1).join(" ");
// 			s = `${rest} ${last}`.trim();
// 		}
// 	}
// 	return s.replace(/[.,]/g, "").replace(/\s+/g, "_");
// }

async function fetchWikimediaImage(author: string): Promise<string | null> {
	await ensureImageCacheLoaded();
	if (imageCache.has(author)) return imageCache.get(author) ?? null;
	try {
		// Try both the original and apostrophe variant for best match
		const searchVariants = [author, author + "'"];
		for (const variant of searchVariants) {
			// 1. Search for the best Wikipedia page title
			const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
				variant
			)}&format=json`;
			const sres = await fetch(searchUrl);
			if (!sres.ok) continue;
			const sjson = await sres.json();
			const first = sjson?.query?.search?.[0];
			const pageTitle = first?.title;
			if (!pageTitle) continue;

			// 2. Use the REST API summary endpoint to get a thumbnail
			const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
				pageTitle
			)}`;
			const summaryRes = await fetch(summaryUrl);
			if (!summaryRes.ok) continue;
			const summaryJson = await summaryRes.json();
			const thumb = summaryJson?.thumbnail?.source;
			if (thumb) {
				imageCache.set(author, thumb);
				await writeImageCacheToDisk();
				return thumb;
			}
		}
		// Open Library fallback
		// Wikimedia Commons MediaSearch fallback
		const commonsUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
			author
		)}&gsrlimit=10&gsrnamespace=6&prop=imageinfo&iiprop=url&format=json&origin=*`;
		try {
			const commonsRes = await fetch(commonsUrl, {
				headers: {
					"User-Agent":
						"gutendex-bot/1.0 (https://github.com/Borgerod/react-oppgave-4)",
				},
			});
			if (commonsRes.ok) {
				const commonsJson = await commonsRes.json();
				const pages = commonsJson?.query?.pages as
					| Record<string, unknown>
					| undefined;
				if (pages) {
					// Filter for non-tif images and prefer common web formats
					const preferredExts = ["jpg", "jpeg", "png", "gif", "webp"];
					const forbiddenExts = ["tif", "tiff"];
					const images = Object.values(pages)
						.map((page) => {
							if (
								typeof page === "object" &&
								page !== null &&
								"imageinfo" in page &&
								Array.isArray(
									(page as { imageinfo?: unknown }).imageinfo
								)
							) {
								const info = (page as { imageinfo: unknown[] })
									.imageinfo[0];
								if (
									info &&
									typeof info === "object" &&
									info !== null &&
									"url" in info &&
									typeof (info as { url?: unknown }).url ===
										"string"
								) {
									return (info as { url: string }).url;
								}
							}
							return undefined;
						})
						.filter((url): url is string => {
							if (!url) return false;
							const lower = url.toLowerCase();
							// Exclude forbidden extensions
							if (
								forbiddenExts.some((ext) => lower.endsWith(ext))
							)
								return false;
							// Only allow preferred web formats
							return preferredExts.some((ext) =>
								lower.endsWith(ext)
							);
						});
					if (images.length > 0) {
						const imgUrl = images[0];
						imageCache.set(author, imgUrl);
						await writeImageCacheToDisk();
						return imgUrl;
					}
				}
				// Log the full response for debugging if no image found
				console.log(
					`Commons API response for ${author}:`,
					JSON.stringify(commonsJson, null, 2)
				);
			} else {
				console.log(
					`Commons API fetch failed for ${author}:`,
					commonsRes.status,
					commonsRes.statusText
				);
			}
		} catch (e) {
			console.log(`Commons API error for ${author}:`, e);
		}
		imageCache.set(author, null);
		await writeImageCacheToDisk();
		return null;
	} catch (e) {
		imageCache.set(author, null);
		await writeImageCacheToDisk();
		return null;
		console.log(e);
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
		} catch {
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
	} catch {
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
		} catch {
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
	await ensureImageCacheLoaded();
	const enriched = await Promise.all(
		top.map(async (it) => {
			// Use cached image if present (even if null), only fetch if not in cache
			if (imageCache.has(it.author)) {
				return { ...it, image: imageCache.get(it.author) };
			}
			try {
				const img = await fetchWikimediaImage(it.author);
				return { ...it, image: img };
			} catch {
				return { ...it, image: null };
			}
		})
	);

	return new Response(JSON.stringify({ top9: enriched }), {
		headers: { "Content-Type": "application/json" },
	});
}
