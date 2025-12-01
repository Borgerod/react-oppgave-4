import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const res = await fetch("https://gutendex.com/books");
	const data = await res.json(); // <-- required
	console.log(typeof data);
	return data;
}
export async function getBooks() {
	const res = await fetch("https://gutendex.com/books");
	const data = await res.json(); // <-- required
	console.log(typeof data);
	return data;
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
