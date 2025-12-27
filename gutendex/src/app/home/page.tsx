"use client";
import BookShelf from "@/components/ui/BookShelf";
// import BookShelf_v2 from "@/components/ui/Bookshelf_v2";
// import BookShelf_v3 from "@/components/ui//BookShelf_v3";
import BookShelf_v4 from "@/components/ui/Bookshelf_v4";
import Highlights from "@/components/ui/highlights";
import PopularAuthorsGrid from "@/components/ui/PopularAuthorsGrid";
import SubjectGrid from "@/components/ui/SubjectGrid";
// import SubjectAuthorsGrid from "@/components/ui/SubjectGrid";
import { Book, BooksResponse } from "@/types";
import React, { useEffect, useState } from "react";
import { useHomeCache } from "@/providers/providers";
import { FaHeart } from "react-icons/fa6";
// import { FaRegHeart } from "react-icons/fa6";
import { getLastRead, removeLastRead } from "@/utils/lastRead";
import LastReadRow from "@/components/ui/lastReadRow";
import { cn } from "@/utils/cn";

type HomeProps = Record<string, never>;

export default function Home({}: HomeProps) {
	const [data, setData] = useState<BooksResponse | null>(null);
	const [previewData, setPreviewData] = useState<Book[] | null>(null);
	const [newBooksData, setNewBooksData] = useState<Book[] | null>(null);
	const [favBooksData, setFavBooksData] = useState<Book[] | null>(null);
	const [favoriteBooks, setFavoriteBooks] = useState<Book[] | null>(null);
	const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
	const { cache, setCache } = useHomeCache();
	const [lastReadData, setLastReadData] = useState<Book[] | null>(null);
	// populate from cache immediately to avoid showing loading state
	useEffect(() => {
		if (cache) {
			if (cache.previewData) setPreviewData(cache.previewData || null);
			if (cache.newBooksData) setNewBooksData(cache.newBooksData || null);
			if (cache.favBooksData) setFavBooksData(cache.favBooksData || null);
		}
		// only run once on mount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		const list = getLastRead();
		setLastReadData(list.length ? list : null);
	}, []);
	// GET POPULAR BOOKS
	useEffect(() => {
		let mounted = true;

		async function load() {
			// skip load if we already have previewData cached
			if (cache && cache.previewData) return;
			try {
				const pageCount = 1;
				const apiUrl = `/api/books?page=${pageCount}`;

				const res = await fetch(apiUrl);
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				const json = (await res.json()) as BooksResponse;
				const preview = json.results.slice(0, 6);
				if (mounted) setData(json);
				setPreviewData(preview);
				setCache({
					...(cache || {}),
					previewData: preview,
					timestamp: Date.now(),
				});
			} catch (err) {
				console.error("Failed to load books:", err);
			}
		}

		load();

		return () => {
			mounted = false;
		};
	}, []);

	// GET NEW BOOKS
	useEffect(() => {
		let mounted = true;

		async function load() {
			// skip load if we already have newBooksData cached
			if (cache && cache.newBooksData) return;
			try {
				// const pageCount = 1;
				// const apiUrl = `/api/books?sort=descending&page=${pageCount}`;
				const apiUrl = `/api/books?sort=descending`;

				// http://localhost:3000/store?sort=descending&search=moby

				const res = await fetch(apiUrl);
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				const json = (await res.json()) as BooksResponse;
				const newBooks = json.results.slice(0, 4);
				// const newBooks = json.results.slice(0, 3);
				// const newBooks = json.results.slice(0, 2);
				if (mounted) setData(json);
				setNewBooksData(newBooks);
				setCache({
					...(cache || {}),
					newBooksData: newBooks,
					timestamp: Date.now(),
				});
			} catch (err) {
				console.error("Failed to load books:", err);
			}
		}

		load();

		return () => {
			mounted = false;
		};
	}, []);

	// GET FAVs (TEMP)
	useEffect(() => {
		// load favorites from localStorage on mount
		const raw = localStorage.getItem("favoriteBooks");
		if (raw) {
			try {
				const parsed = JSON.parse(raw) as Book[];
				setFavoriteBooks(parsed);
				setFavBooksData(parsed.slice(0, 10));
				setFavoriteIds(parsed.map((b) => b.id));
			} catch (e) {
				setFavoriteBooks(null);
				setFavBooksData(null);
			}
		} else {
			setFavoriteBooks(null);
			setFavBooksData(null);
		}
	}, []);

	function toggleFavorite(book: Book) {
		const current = (favoriteBooks || []).slice();
		const idx = current.findIndex((b) => b.id === book.id);
		let updated: Book[];
		if (idx >= 0) {
			current.splice(idx, 1);
			updated = current;
		} else {
			updated = [book, ...current];
		}
		setFavoriteBooks(updated);
		setFavBooksData(updated.slice(0, 10));
		setFavoriteIds(updated.map((b) => b.id));
		localStorage.setItem("favoriteBooks", JSON.stringify(updated));
	}

	return (
		// <main className="grid grid-rows-3 grid-cols-3 gap-5 h-full ">
		// 	<div className="scale-70 row-start-1 col-start-1 col-span-2">hei</div>
		// <main className="grid grid-rows-none grid-cols-3 gap-5 auto-rows-min">
		// 	<div className="scale-70 row-start-1 col-start-1 col-span-2">
		// 		<BookShelf />
		// 	</div>
		// 	{/* TODO: make popularAuthor Algorithm:
		// 	- search by auther for all authors and collect their cumulative downloads
		// 	- popularAuthors = top 5 downloadedAuthors
		// 	*/}
		// 	<div className="row-start-2 col-start-1 col-span-2 h-fit">
		// 		<SubjectGrid />
		// 	</div>
		// 	<div className="row-start-3 col-start-1 col-span-2">
		// 		<Highlights
		// 			loading
		// 			data={newBooksData}
		// 			title="Newcommers"
		// 			tagLabel="New"
		// 		/>
		// 	</div>
		// 	<div className="row-start-2 col-start-3">
		// 		<Highlights
		// 			loading
		// 			data={previewData}
		// 			title="Popular Books"
		// 			tagLabel="Top"
		// 			button={{ text: "View All", href: "/store" }}
		// 			grid
		// 		/>
		// 	</div>
		// 	<div className="row-start-3 col-start-3">
		// 		<PopularAuthorsGrid />
		// 	</div>

		// 	{/* TODO: Make trend algorythm:
		// 	- save a static snapshot form this specific date: {id, downloads}
		// 	- upon page load, get all downloads (were already doing this in tags, do it then)
		// 	- make a top five based on downloads / (snapshotDate - loadDate) => downloadPrDayRate
		// 	- top five = the books with the highest downloadPrDayRate
		// 	*/}
		// 	{/* <Highlights
		// 		loading
		// 		data={newBooksData}
		// 		title="Trendy"
		// 		tagLabel="Hot"
		// 	/> */}

		// 	{/* FAVORITES */}
		// 	{/* <Highlights
		// 		loading
		// 		data={newBooksData}
		// 		title="favorites"
		// 		tagLabel={<FaHeart />}
		// 	/> */}
		// </main>

		// <main className="grid grid-rows-[auto_auto] grid-cols-[3fr_2fr] gap-5 auto-rows-min h-full w-full justify-items-stretch content-center">
		<main
			className={cn(
				// "grid grid-rows-[auto_auto_auto] grid-cols-[3fr_2fr] gap-5 auto-rows-min h-full w-full justify-items-stretch content-center",
				//
				"",
				"grid",
				"grid-cols-1",
				"grid-flow-row auto-rows-min",
				"md:grid-rows-[auto_auto_auto] md:grid-cols-[3fr_2fr]",
				"gap-0",
				"gap-y-15",
				// "gap-15",
				"md:gap-15",
				"h-full",
				"w-full",
				"justify-items-stretch",
				"content-center",
				"",
				"",
				""
			)}
		>
			{/* > NEW, TEST */}
			{/* <div className="w-full row-start-1 col-start-1 col-span-2 mt-15 mb-15"> */}
			<div className="w-full row-start-1 col-start-1 col-span-2 ">
				<h3 className="text-2xl font-medium mb-4">
					{/* Books you read last */}
				</h3>
				<div className="w-full ">
					<LastReadRow
						loading={lastReadData === null}
						data={lastReadData}
						title="Books you read last"
						// todo add remove button
						tagLabel={"continue"}
						// onToggleFavorite={toggleFavorite}
						// favoriteIds={favoriteIds}
						onRemove={(bookId) => {
							removeLastRead(bookId);
							setLastReadData((prev) =>
								prev
									? prev.filter((b) => b.id !== bookId)
									: null
							);
						}}
					/>
				</div>
			</div>

			{/* <div className="h-100 w-full row-start-2 col-start-1 col-span-2 mt-15"> */}

			{/* TODO: try combine bookshelf-mobile-mode and bookshelf-browser-mode */}
			<div
				id="bookshelf-mobile-mode"
				className={cn(
					// " block md:hidden",
					" flex flex-col md:hidden",
					" flex flex-col sm:hidden",
					"  row-start-2 ",
					"col-start-1 col-span-2",
					// " mt-0 ",
					"gap-5",
					// "h-140 ",
					// "w-fit",
					// " md:w-full ",
					// "h-full ",
					// "pb-20",
					"",
					""
				)}
			>
				{/* <h3 className="text-2xl font-medium md:pb-2.5 p-2.5"> */}
				<h3 className="text-2xl font-medium px-2.5">Genre bookshelf</h3>
				<BookShelf_v4 />
				{/* <div className="origin-top w-full h-auto mt-10 translate-y-0 gap-20 flex flex-col justify-start w-full px-10"> */}
				{/* <div className="origin-top w-full h-auto mt-10 translate-y-0 gap-20 flex flex-col justify-start w-full px-10"> */}
				{/* <BookShelf_2 /> */}
				{/* <BookShelf_3 /> */}
				{/* </div> */}
			</div>

			<div
				id="bookshelf-browser-mode"
				className={cn(
					// "hidden  md:block",
					// "hidden md:flex flex-col",
					"hidden sm:flex sm:flex-col",
					"w-full",
					"row-start-2 col-start-1 col-span-2",
					"mt-0",
					"h-fit",
					// "md:h-100",
					// "lg:h-140",
					"md:h-fit",
					// "md:w-fit",
					"lg:h-fit",
					// "mb-10",f
					"gap-5",

					// "md:items-center",
					// "md:justify-center",
					// "md:justify-items-center",
					// "md:content-center",
					// "md:place-self-start",
					// "bg-amber-100",
					"",
					""
				)}
			>
				{/* <h3 className="text-2xl font-medium md:pb-2.5 px-2.5"> */}
				<h3 className="text-2xl font-medium px-2.5">Genre bookshelf</h3>

				{/* <h3 className="text-2xl font-medium mb-0">Genre bookshelf</h3> */}
				<div
					className={cn(
						// "bg-amber-100",
						"w-full",
						// "w-fit",
						// "md:w-fit",
						"lg:w-fit",
						// "h-full",
						"h-fit",
						"translate-y-0",
						"flex flex-col",
						// "gap-20",
						"justify-center",
						// // MD
						"md:gap-0",
						// "md:justify-start",
						// "md:items-start",
						// "md:scale-60",
						// "md:origin-center",
						// "md:h-100",
						// "md:h-110",
						// "bg-amber-300",

						// "md:content-center",
						// "md:place-self-start",
						// "md:items-start",
						// "md:items-center-safe",
						// "md:items-end",
						// "md:items-stretch",
						// "md:justify-items-stretch",
						"md:justify-center",

						// "md:w-250",
						// "md:w-200",

						// "md:px-48",
						// "md:pr-20",
						// "md:pl-20",
						// "md:ml-20",
						// "md:mr-20",
						// "md:justify-center",
						// "md:justify-self-center",
						// "md:place-self-start",
						// LG
						// "lg:scale-90",
						"lg:items-center",
						// "lg:origin-center",
						// "lg:h-120",
						// "lg:mr-15",
						"",
						""
					)}
				>
					<BookShelf />
				</div>
			</div>

			<div
				className={cn(
					"h-full",
					"w-full",
					"row-start-3 col-start-1 col-span-1",
					"flex flex-col",
					// "p-5",
					"justify-around",
					"justify-start",
					"md:gap-15",
					"gap-15",
					"",
					""
				)}
			>
				<div className="h-fit w-full flex">
					{/* <div className="h-full w-full  flex"> */}
					<Highlights
						loading={favBooksData === null}
						data={favBooksData}
						title="Your Favorites"
						tagLabel={<FaHeart />}
						onToggleFavorite={toggleFavorite}
						favoriteIds={favoriteIds}
					/>
				</div>
				<div className="h-fit w-full  flex">
					<SubjectGrid />
				</div>
				<div className="h-fit w-full  flex">
					<Highlights
						loading={newBooksData === null}
						data={newBooksData}
						title="New Realeases"
						tagLabel="New"
						button={{
							text: "View All",
							href: "/store?sort=descending",
						}}
						onToggleFavorite={toggleFavorite}
						favoriteIds={favoriteIds}
					/>
				</div>
			</div>
			<div
				className={cn(
					"h-full ",
					"w-full ",
					"md:row-start-3 row-start-4",
					" md:col-start-2 col-start-1",
					" col-span-1",
					" flex flex-col ",
					// "p-5 ",
					"md:gap-0 gap-15 ",
					"mb-50",
					"justify-around",
					"justify-start",
					"md:gap-15",
					"gap-15",
					"",
					""
				)}
			>
				<div className="h-fit w-full  flex">
					<Highlights
						loading={previewData === null}
						data={previewData}
						title="Popular Books"
						tagLabel="Top"
						button={{ text: "View All", href: "/store" }}
						grid
						onToggleFavorite={toggleFavorite}
						favoriteIds={favoriteIds}
					/>
				</div>
				<div className="h-fit w-full  flex">
					<PopularAuthorsGrid />
				</div>
			</div>
			{/* <div className="w-full h-full">
				<Highlights
					loading
					data={previewData}
					title="Popular Books"
					tagLabel="Top"
					button={{ text: "View All", href: "/store" }}
					grid
				/>
			</div> */}
		</main>
	);
}
