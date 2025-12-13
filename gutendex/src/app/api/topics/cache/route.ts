import { writeTopicsCache } from "@/utils/topicsCache";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const topics = body?.topics;
		if (!Array.isArray(topics)) {
			console.warn("/api/topics/cache: invalid payload", body);
			return new Response(JSON.stringify({ error: "invalid topics" }), {
				status: 400,
			});
		}

		console.log(`/api/topics/cache: received ${topics.length} topics`);
		// write cache (best-effort)
		await writeTopicsCache(topics, 60 * 60 * 24);
		console.log(
			`/api/topics/cache: wrote ${topics.length} topics to cache`
		);
		return new Response(
			JSON.stringify({ ok: true, written: topics.length }),
			{ status: 200 }
		);
	} catch (e) {
		console.error("/api/topics/cache POST error:", e);
		return new Response(JSON.stringify({ error: String(e) }), {
			status: 500,
		});
	}
}

export const runtime = "nodejs";
