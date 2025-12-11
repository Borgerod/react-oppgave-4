import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	// Forward any search/query params from the incoming request to the Gutendex API
	const search = request.nextUrl.search || "";
	const target = `https://gutendex.com/books${search}`;
	const res = await fetch(target, {
		next: { revalidate: 60 },
	});
	const data = await res.json();
	return NextResponse.json(data);
}
// [
//   'id',             'title',
//   'authors',        'summaries',
//   'editors',        'translators',
//   'subjects',       'bookshelves',
//   'languages',      'copyright',
//   'media_type',     'formats',
//   'download_count'
// ]
