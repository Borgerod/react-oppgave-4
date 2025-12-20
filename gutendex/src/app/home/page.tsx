"use client";
import BookShelf from "@/components/ui/BookShelf";
import Highlights from "@/components/ui/highlights";
import PopularAuthorsGrid from "@/components/ui/PopularAuthorsGrid";
import SubjectGrid from "@/components/ui/SubjectAuthorsGrid";
import SubjectAuthorsGrid from "@/components/ui/SubjectAuthorsGrid";
import { Book, BooksResponse } from "@/types";
import React, { useEffect, useState } from "react";
import { useHomeCache } from "@/providers/providers";
import { FaHeart } from "react-icons/fa6";
// import { FaRegHeart } from "react-icons/fa6";

type HomeProps = Record<string, never>;

export default function Home({}: HomeProps) {
	const [data, setData] = useState<BooksResponse | null>(null);
	const [previewData, setPreviewData] = useState<Book[] | null>(null);
	const [newBooksData, setNewBooksData] = useState<Book[] | null>(null);
	const [favBooksData, setFavBooksData] = useState<Book[] | null>(null);
	const [favoriteBooks, setFavoriteBooks] = useState<Book[] | null>(null);
	const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
	const { cache, setCache } = useHomeCache();

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

		<main className="grid grid-rows-[auto_auto] grid-cols-[3fr_2fr] gap-5 auto-rows-min h-full w-full justify-items-stretch content-center ">
			<div className="h-100 w-full row-start-1 col-start-1 col-span-2 ">
				<h3 className="text-2xl font-medium mb-4">BookShelf</h3>
				<div className="scale-80 h-fit w-full relative bottom-30">
					<BookShelf />
				</div>
			</div>

			<div className="h-full w-full row-start-2 col-start-1 col-span-1 flex flex-col p-5 gap-5">
				<div className="h-full w-full  flex">
					<Highlights
						loading={favBooksData === null}
						data={favBooksData}
						title="Your Favorites"
						tagLabel={<FaHeart />}
						onToggleFavorite={toggleFavorite}
						favoriteIds={favoriteIds}
					/>
				</div>
				<div className="h-full w-full  flex">
					<SubjectGrid />
				</div>
				<div className="h-full w-full  flex mt-10">
					<Highlights
						loading={newBooksData === null}
						data={newBooksData}
						title="New Books"
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
			<div className="h-full w-full row-start-2 col-start-2 col-span-1 flex flex-col p-5 gap-5">
				<div className="h-full w-full  flex">
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
				<div className="h-full w-full  flex">
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
