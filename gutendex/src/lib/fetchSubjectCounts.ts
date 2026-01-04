"use server";

import { cacheLife, cacheTag } from "next/cache";

export async function fetchSubjectCount(subjectName: string): Promise<number> {
	"use cache";
	cacheLife("hours");
	cacheTag("subject-counts");

	try {
		const baseUrl =
			process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
		const topic = encodeURIComponent(subjectName);
		const res = await fetch(`${baseUrl}/api/books?topic=${topic}`, {
			cache: "no-store",
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
