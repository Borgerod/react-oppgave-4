"use server";

import { cacheLife, cacheTag } from "next/cache";

type AuthorItem = { author: string; count: number; image?: string };

export async function fetchPopularAuthors(): Promise<AuthorItem[]> {
	"use cache";
	cacheLife("hours");
	cacheTag("popular-authors");

	try {
		// During build, this needs to return empty array since the API route isn't available
		if (
			process.env.NODE_ENV === "production" &&
			!process.env.NEXT_PUBLIC_SITE_URL
		) {
			return [];
		}
		const baseUrl =
			process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
		const res = await fetch(`${baseUrl}/api/authors/top9`, {
			next: { revalidate: 3600 },
		});

		if (!res.ok) {
			console.error("Failed to fetch popular authors:", res.statusText);
			return [];
		}

		const json = await res.json();
		return (json.top9 ?? []) as AuthorItem[];
	} catch (error) {
		console.error("Error fetching popular authors:", error);
		return [];
	}
}
