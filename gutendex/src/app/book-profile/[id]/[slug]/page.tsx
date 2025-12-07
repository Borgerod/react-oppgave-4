import type { Book } from "@/types";

async function fetchBook(id: number): Promise<Book | null> {
	const res = await fetch(`https://gutendex.com/books/${id}`, {
		cache: "no-store",
	});

	if (!res.ok) return null;
	return res.json();
}

export default async function BookProfilePage({
	params,
}: {
	params: { id: string; slug: string };
}) {
	const bookId = Number(params.id);
	if (Number.isNaN(bookId)) {
		return <div>Invalid book id.</div>;
	}
	const book = await fetchBook(bookId);
	// const book = await fetchBook(params.id);

	if (!book) {
		return <div>Book not found.</div>;
	}

	return <div>Book ID: {book.id}</div>;
}
