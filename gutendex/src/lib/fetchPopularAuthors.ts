"use server";

import { getTop9Authors } from "./getTop9Authors";

export type AuthorItem = { author: string; count: number; image?: string };

export async function fetchPopularAuthors(): Promise<AuthorItem[]> {
	try {
		const authors = await getTop9Authors();
		return authors;
	} catch (error) {
		console.error("Error fetching popular authors:", error);
		return [];
	}
}

