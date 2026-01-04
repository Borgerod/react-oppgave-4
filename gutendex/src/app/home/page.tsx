import FavoritesHighlights from "@/components/favorites/FavoritesHighlights";
import { Suspense } from "react";
import { Book, BooksResponse } from "@/types";
import { cn } from "@/utils/cn";
import BookShelf from "@/components/ui/BookShelf";
import BookShelf_v4 from "@/components/ui/Bookshelf_v4";
import Highlights from "@/components/ui/highlights";
import PopularAuthorsGridServer from "@/components/ui/PopularAuthorsGrid.server";
import SubjectGridServer from "@/components/ui/SubjectGrid.server";
import LastReadHighlights from "@/components/ui/LastReadHighlights";
import { cacheLife, cacheTag } from "next/cache";

async function fetchBooks(path: string): Promise<Book[]> {
	"use cache";
	cacheLife("hours");
	cacheTag("home-books");

	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
	const url = new URL(path, baseUrl).toString();

	try {
		const res = await fetch(url, { cache: "no-store" });
		if (!res.ok) return [];
		const json = (await res.json()) as BooksResponse;
		return json.results;
	} catch (error) {
		console.error("Error fetching books:", error);
		return [];
	}
}

export default async function Home() {
	const previewData = (await fetchBooks(`/api/books?page=1`)).slice(0, 6);
	const newBooksData = (await fetchBooks(`/api/books?sort=descending`)).slice(
		0,
		4
	);

	return (
		<main
			className={cn(
				"",
				"grid",
				"grid-cols-1",
				"grid-flow-row auto-rows-min",
				"md:grid-rows-[auto_auto_auto] md:grid-cols-[3fr_2fr]",
				"gap-0",
				"gap-y-15",
				"md:gap-15",
				"h-full",
				"w-full",
				"justify-items-stretch",
				"content-center",
				"",
				"",
				""
			)}>
			<div
				className={cn(
					"relative",
					"w-full",
					"row-start-1",
					"col-start-1",
					"col-span-2",
					""
				)}>
				<h3 className={cn("text-2xl font-medium mb-4", "", "")}></h3>
				<div className={cn("w-full", "", "")}>
					<LastReadHighlights />
				</div>
			</div>

			<div
				id="bookshelf-mobile-mode"
				className={cn(
					"flex flex-col md:hidden",
					"flex flex-col sm:hidden",
					"row-start-2",
					"col-start-1 col-span-2",
					"gap-5",
					"",
					""
				)}>
				<h3 className={cn("text-2xl font-medium px-2.5", "", "")}>
					Genre bookshelf
				</h3>
				<BookShelf_v4 />
			</div>

			<div
				id="bookshelf-browser-mode"
				className={cn(
					"hidden sm:flex sm:flex-col",
					"w-full",
					"row-start-2 col-start-1 col-span-2",
					"mt-0",
					"h-fit md:h-fit lg:h-fit",
					"gap-5",
					"",
					""
				)}>
				<h3 className={cn("text-2xl font-medium px-2.5", "", "")}>
					Genre bookshelf
				</h3>
				<div
					className={cn(
						"w-full lg:w-fit h-fit translate-y-0",
						"flex flex-col justify-center",
						"md:gap-0 md:justify-center lg:items-center",
						"",
						""
					)}>
					<BookShelf />
				</div>
			</div>

			<div
				className={cn(
					"h-full w-full",
					"row-start-3 col-start-1 col-span-1",
					"flex flex-col justify-start",
					"md:gap-15 gap-15",
					"",
					""
				)}>
				<div className={cn("h-fit w-full flex", "", "")}>
					<Suspense
						fallback={
							<div
								className={cn("text-lg text-gray-500", "", "")}>
								Loading favorites...
							</div>
						}>
						<FavoritesHighlights />
					</Suspense>
				</div>
				<div className={cn("h-fit w-full flex", "", "")}>
					<Suspense
						fallback={
							<div
								className={cn("text-lg text-gray-500", "", "")}>
								Loading subjects...
							</div>
						}>
						<SubjectGridServer />
					</Suspense>
				</div>
				<div className={cn("h-fit w-full flex", "", "")}>
					<Suspense
						fallback={
							<div
								className={cn("text-lg text-gray-500", "", "")}>
								Loading new releases...
							</div>
						}>
						<Highlights
							loading={false}
							data={newBooksData}
							title="New Realeases"
							tagLabel="New"
							button={{
								text: "View All",
								href: "/store?sort=descending",
							}}
							onToggleFavorite={() => {}}
							favoriteIds={[]}
						/>
					</Suspense>
				</div>
			</div>
			<div
				className={cn(
					"h-full w-full",
					"md:row-start-3 row-start-4",
					"md:col-start-2 col-start-1",
					"col-span-1",
					"flex flex-col",
					"md:gap-0 gap-15",
					"mb-50",
					"justify-start",
					"md:gap-15 gap-15",
					"",
					""
				)}>
				<div className={cn("h-fit w-full flex", "", "")}>
					<Suspense
						fallback={
							<div
								className={cn("text-lg text-gray-500", "", "")}>
								Loading popular books...
							</div>
						}>
						<Highlights
							loading={false}
							data={previewData}
							title="Popular Books"
							tagLabel="Top"
							button={{ text: "View All", href: "/store" }}
							grid
							onToggleFavorite={() => {}}
							favoriteIds={[]}
						/>
					</Suspense>
				</div>
				<div className={cn("h-fit w-full flex", "", "")}>
					<Suspense
						fallback={
							<div
								className={cn("text-lg text-gray-500", "", "")}>
								Loading popular authors...
							</div>
						}>
						<PopularAuthorsGridServer />
					</Suspense>
				</div>
			</div>
		</main>
	);
}
