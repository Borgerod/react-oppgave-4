import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	// Forward any search/query params from the incoming request to the Gutendex API
	const search = request.nextUrl.search || "";
	const target = `https://gutendex.com/books${search}`;
	let res: Response | undefined = undefined;
	try {
		res = await fetch(target, { next: { revalidate: 60 } });
	} catch (e) {
		console.error("/api/books proxy fetch failed:", e);
		return NextResponse.json(
			{ error: "upstream fetch failed" },
			{ status: 502 }
		);
	}

	if (!res) {
		return NextResponse.json(
			{ error: "no upstream response" },
			{ status: 502 }
		);
	}

	// If upstream returned non-OK, forward status and body (text) to client
	if (!res.ok) {
		try {
			const text = await res.text();
			const contentType = res.headers.get("content-type") || "text/plain";
			return new NextResponse(text || res.statusText, {
				status: res.status,
				headers: { "content-type": contentType },
			});
		} catch (_e) {
			console.warn("/api/books: failed to read upstream body", _e);
			return new NextResponse(res.statusText || "Upstream error", {
				status: res.status,
			});
		}
	}

	// Upstream OK: parse JSON and normalize titles to the `Title` shape
	try {
		const data = await res.json();
		try {
			// lazy-import the parser to avoid server/client crossover
			const { parseTitle } = await import("@/utils/title");
			if (data && Array.isArray(data.results)) {
				data.results = data.results.map((r: any) => ({
					...r,
					title: parseTitle(r.title),
				}));
			}
		} catch (e) {
			// if normalization fails, still return upstream data
			console.warn("/api/books: title normalization failed", e);
		}

		return NextResponse.json(data);
	} catch {
		try {
			const text = await res.text();
			return new NextResponse(text || "", {
				status: 200,
				headers: { "content-type": "text/plain" },
			});
		} catch (err) {
			console.warn(
				"/api/books: failed to read upstream body after json failure",
				err
			);
			return new NextResponse("", { status: 200 });
		}
	}
}
