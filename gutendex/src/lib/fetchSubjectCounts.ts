"use server";

import { cacheLife, cacheTag } from "next/cache";

export async function fetchSubjectCount(subjectName: string): Promise<number> {
	"use cache";
	cacheLife("hours");
	cacheTag("subject-counts");

	try {
		const topic = encodeURIComponent(subjectName);
		const res = await fetch(`https://gutendex.com/books?topic=${topic}`, {
			next: { revalidate: 3600 },
		});

		if (!res.ok) {
			console.warn(
				`Failed to fetch count for ${subjectName}:`,
				res.statusText
			);
			return 0;
		}

		const data = await res.json();
		return typeof data?.count === "number" ? data.count : 0;
	} catch (error) {
		console.error(`Error fetching count for ${subjectName}:`, error);
		return 0;
	}
}
