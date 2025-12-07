// "use client";  // removed to make this a server component

// import { cn } from "@/utils/cn";
import React from "react";
import { getBooks } from "../api/books/route";
import StoreHeader from "@/components/header";
import ProductCard from "@/components/productCard";
import { Book } from "@/types";

function computeUpperDownloadCountLimit(
	results: Book[],
	limit: number = 1.5
): number | undefined {
	if (!results || results.length === 0) return undefined;
	let current = results[0]?.download_count;
	for (let i = 1; i < results.length; i++) {
		const next = results[i]?.download_count;
		if (current > next * limit) {
			current = next;
			continue;
		}
		return current;
	}
	return current;
}

export default async function Store() {
	const data = await getBooks();

	const upperDownloadCountLimit = !data.previous
		? computeUpperDownloadCountLimit(data.results)
		: undefined;

	console.log("upperDownloadCountLimit: ", upperDownloadCountLimit);
	return (
		<main className="min-h-screen">
			<StoreHeader />
			<div className="mx-auto flex max-w-6xl flex-col gap-8">
				<header>
					<h1 className="text-2xl font-semibold">Store</h1>
				</header>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{data.results.map((book: Book, index: number) => (
						<ProductCard
							key={book.id ?? index}
							book={book}
							upperDownloadCountLimit={upperDownloadCountLimit}
							index={index}
						/>
					))}
				</div>
			</div>
		</main>
	);
}
