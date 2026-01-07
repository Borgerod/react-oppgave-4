"use server";

import { cacheLife, cacheTag } from "next/cache";

export type AuthorItem = { author: string; count: number; image?: string };

async function fetchWikimediaImage(author: string): Promise<string | null> {
	"use cache";
	cacheLife("days");
	cacheTag("author-images");
	try {
		const searchVariants = [author, author + "'"];
		for (const variant of searchVariants) {
			const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
				variant
			)}&format=json`;
			const sres = await fetch(searchUrl);
			if (!sres.ok) continue;
			const sjson = await sres.json();
			const first = sjson?.query?.search?.[0];
			const pageTitle = first?.title;
			if (!pageTitle) continue;

			const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
				pageTitle
			)}`;
			const summaryRes = await fetch(summaryUrl);
			if (!summaryRes.ok) continue;
			const summaryJson = await summaryRes.json();
			const thumb = summaryJson?.thumbnail?.source;
			if (thumb) {
				return thumb;
			}
		}

		const commonsUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
			author
		)}&gsrlimit=10&gsrnamespace=6&prop=imageinfo&iiprop=url&format=json&origin=*`;
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
						if (forbiddenExts.some((ext) => lower.endsWith(ext)))
							return false;
						return preferredExts.some((ext) => lower.endsWith(ext));
					});
				if (images.length > 0) {
					return images[0];
				}
			}
		}
		return null;
	} catch {
		return null;
	}
}

export async function getTop9Authors(): Promise<AuthorItem[]> {
	try {
		const totals: Record<string, number> = {};
		let nextUrl: string | null = "https://gutendex.com/books";

		// Fetch multiple pages to get a good sample
		for (let page = 0; page < 10 && nextUrl; page++) {
			const res = await fetch(nextUrl, { next: { revalidate: 86400 } });
			if (!res.ok) break;

			const data: {
				results: {
					download_count?: number;
					authors?: { name?: string }[];
				}[];
				next: string | null;
			} = await res.json();

			for (const book of data.results || []) {
				const downloads = book.download_count || 0;
				const authors = book.authors || [];

				for (const authorObj of authors) {
					const name = authorObj.name;
					if (!name) continue;

					const normalized = name.replace(/\s+/g, " ").trim();
					const low = normalized.toLowerCase();
					if (
						[
							"various",
							"anonymous",
							"various authors",
							"anon",
						].includes(low)
					) {
						continue;
					}

					totals[normalized] = (totals[normalized] || 0) + downloads;
				}
			}

			nextUrl = data.next;
		}

		const top = Object.entries(totals)
			.sort((a, b) => b[1] - a[1])
			.slice(0, 9)
			.map(([author, count]) => ({ author, count }));

		const enriched = await Promise.all(
			top.map(async (it) => {
				try {
					const img = await fetchWikimediaImage(it.author);
					return { ...it, image: img || undefined };
				} catch {
					return { ...it, image: undefined };
				}
			})
		);

		return enriched;
	} catch (error) {
		console.error("Error fetching authors from Gutendex:", error);
		return [];
	}
}
//
