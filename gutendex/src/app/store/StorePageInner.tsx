"use client";

import React, { useEffect, useState } from "react";
// Extend Window type for __apiCallCount
declare global {
	interface Window {
		__apiCallCount?: number;
	}
}
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/store/productCard";
import { Book, BooksResponse } from "@/types";
import CurrentPath from "@/utils/getCurrentPath";
import CardSkeleton from "@/components/store/cardSkeleton";
import { cn } from "@/utils/cn";
import SelectMenu from "@/components/store/selectMenu";
import SelectedFiltersTags from "@/components/filters/selectedFiltersTags";
import { LanguageOptions } from "@/types";

// All client logic from the old page.tsx moved here

type StorePageInnerProps = {
	languageOptions: LanguageOptions[];
};

export default function StorePageInner({
	languageOptions,
}: StorePageInnerProps) {
	// --- State and refs ---
	const [data, setData] = useState<BooksResponse | null>(null);
	const [loading, setLoading] = useState(false);
	const [pageCount, setPageCount] = useState(1);
	const [lastQuery, setLastQuery] = useState<string | undefined>(undefined);
	const [favoriteBooks, setFavoriteBooks] = useState<Book[] | null>(null);
	const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
	const loadMoreRef = React.useRef<HTMLDivElement>(null);
	const hasMorePagesRef = React.useRef(true);
	const isFetchingMoreRef = React.useRef(false);
	const lastFetchTriggerRef = React.useRef<number>(0);

	const searchParams = useSearchParams();
	const router = useRouter();
	const searchParamsStr = searchParams?.toString() || "";

	// --- Filters ---
	// These would be derived from searchParams
	// Convert selectedTopics and selectedLanguages to Record<string, boolean>
	const selectedTopicsArr = searchParams.getAll("topic");
	const selectedLanguagesArr = searchParams.getAll("languages");
	const selectedTopics: Record<string, boolean> = {};
	const selectedLanguages: Record<string, boolean> = {};
	selectedTopicsArr.forEach((t) => (selectedTopics[t] = true));
	selectedLanguagesArr.forEach((l) => (selectedLanguages[l] = true));
	// copyright as boolean

	// const searchParams = useSearchParams()
	// --- Utility ---
	function computeUpperDownloadCountLimit(
		results: Book[],
		limit: number = 1.25
	): number | undefined {
		if (!results || results.length === 0) return undefined;
		let current = results[0]?.download_count;
		for (let i = 1; i < results.length; i++) {
			const next = results[i]?.download_count;
			if (current > next * limit) {
				current = next;
			}
		}
		return current;
	}
	const upperDownloadCountLimit = data?.results
		? computeUpperDownloadCountLimit(data.results)
		: undefined;

	// --- Remove filter handlers ---
	function removeFilter(type: string, value?: string) {
		const params = new URLSearchParams(searchParams.toString());
		if (type === "format") {
			const allFormatValues = [
				...params.getAll("format"),
				...params.getAll("mime_type"),
			];
			params.delete("format");
			params.delete("mime_type");
			allFormatValues.forEach((v) => {
				if (v !== value) params.append("format", v);
			});
		} else {
			const allValues = params.getAll(type);
			params.delete(type);
			allValues.forEach((v) => {
				if (v !== value) {
					params.append(type, v);
				}
			});
		}
		router.push(`/store?${params.toString()}`);
	}

	// --- Effects ---
	// Reset pagination when search params change
	useEffect(() => {
		setPageCount(1);
		setData(null);
		hasMorePagesRef.current = true;
		isFetchingMoreRef.current = false;
	}, [searchParamsStr]);

	// Fetch page data and append when pageCount > 1
	useEffect(() => {
		let mounted = true;
		async function load() {
			try {
				setLoading(true);
				// Clean empty year range params so they are not sent to the API

				const rawParams = new URLSearchParams(
					searchParams?.toString() || ""
				);
				if (
					rawParams.has("author_year_start") &&
					rawParams.get("author_year_start") === ""
				) {
					rawParams.delete("author_year_start");
				}
				if (
					rawParams.has("author_year_end") &&
					rawParams.get("author_year_end") === ""
				) {
					rawParams.delete("author_year_end");
				}
				const cleaned = rawParams.toString();
				const apiUrl = cleaned
					? `/api/books?${cleaned}&page=${pageCount}`
					: `/api/books?page=${pageCount}`;
				// safe fetch + parse helper: handles non-JSON responses (HTML/error pages)
				// and retries on 429 Too Many Requests with exponential backoff.
				const fetchJson = async (
					url: string,
					retries = 3,
					backoff = 1000
				): Promise<BooksResponse> => {
					if (typeof window !== "undefined") {
						window.__apiCallCount =
							(window.__apiCallCount || 0) + 1;
						// console.log("API call count:", window.__apiCallCount, "URL:", url);
					}
					const res = await fetch(url);
					// Handle 429 with Retry-After or exponential backoff
					if (res.status === 429) {
						const retryAfter = res.headers.get("retry-after");
						const wait = retryAfter
							? Number(retryAfter) * 1000
							: backoff;
						if (retries > 0) {
							await new Promise((r) => setTimeout(r, wait));
							return fetchJson(url, retries - 1, backoff * 2);
						}
						throw new Error(`Too Many Requests from ${url}`);
					}
					if (!res.ok) {
						throw new Error(
							`Fetch error ${res.status} from ${url}`
						);
					}
					const contentType = res.headers.get("content-type") || "";
					if (contentType.includes("application/json")) {
						return res.json();
					}
					const text = await res.text();
					try {
						return JSON.parse(text);
					} catch (err) {
						throw new Error(`Invalid JSON response from ${url}`);
					}
				};
				const json = (await fetchJson(apiUrl)) as BooksResponse;
				if (!mounted) return;
				hasMorePagesRef.current = !!json.next;
				if (pageCount === 1) {
					setData(json);
				} else {
					setData((prev) => {
						if (!prev) return json;
						return {
							...json,
							results: [...prev.results, ...json.results],
						};
					});
				}
				if (!searchParamsStr) {
					setLastQuery(undefined);
				} else {
					const decoded = decodeURIComponent(
						`search: ${searchParamsStr.replace(/^search=/, "")}`
					);
					setLastQuery(decoded);
				}
			} catch (err) {
				// console.error("Failed to fetch books", err);
			} finally {
				if (mounted) {
					setLoading(false);
					isFetchingMoreRef.current = false;
				}
			}
		}
		load();
		return () => {
			mounted = false;
		};
	}, [searchParamsStr, pageCount, searchParams]);

	// load favorites from localStorage on mount
	useEffect(() => {
		const raw = localStorage.getItem("favoriteBooks");
		if (raw) {
			try {
				const parsed = JSON.parse(raw) as Book[];
				setFavoriteBooks(parsed);
				setFavoriteIds(parsed.map((b) => b.id));
			} catch (e) {
				setFavoriteBooks(null);
				setFavoriteIds([]);
			}
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
		setFavoriteIds(updated.map((b) => b.id));
		localStorage.setItem("favoriteBooks", JSON.stringify(updated));
	}

	// LOAD NEXT PAGE VIA INTERSECTION OBSERVER
	useEffect(() => {
		const target = loadMoreRef.current;
		if (!target) return;
		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				if (!entry?.isIntersecting) return;
				if (isFetchingMoreRef.current) return;
				if (!hasMorePagesRef.current) return;
				if (loading) return;
				const now = Date.now();
				const cooldown = 1200;
				if (now - lastFetchTriggerRef.current < cooldown) return;
				lastFetchTriggerRef.current = now;
				isFetchingMoreRef.current = true;
				setPageCount((prev) => prev + 1);
			},
			{ root: null, rootMargin: "0px 0px 300px 0px", threshold: 0 }
		);
		observer.observe(target);
		return () => {
			observer.disconnect();
		};
	}, [loading]);

	// --- UI ---
	const isInitialLoad = loading && pageCount === 1;
	const hasResults = data && data.results && data.results.length > 0;

	return (
		<main className={cn("min-h-screen", "px-0", "lg:px-0", "", "")}>
			<div className="mx-auto flex flex-col gap-1 w-full">
				<SelectedFiltersTags languageOptions={languageOptions} />
				{/* <header className="grid grid-rows-[auto_auto] grid-cols-2 items-end mb-2 "> */}
				<header className="grid grid-rows-2 grid-cols-auto items-end mb-2 mt-5">
					<span className="row-start-1 col-start-1 text-tertiary flex">
						<span>Gutendex</span>
						<span>
							{lastQuery
								? CurrentPath("Search")
								: CurrentPath("All")}
						</span>
					</span>
					<span className="row-start-2 col-start-1">
						Search results:{" "}
						<span>
							{data?.results?.length ?? 0} out of{" "}
							{data?.count ?? 0}
						</span>{" "}
						books
					</span>
					<SelectMenu
						className={cn(
							"row-start-1 col-start-2 col-span-1 row-span-2",
							"w-full",
							"",
							""
						)}
						options={[
							{ value: "descending", name: "Newest" },
							{ value: "ascending", name: "Oldest" },
							{ value: "popular", name: "Popularity" },
						]}
						id="sortBy"
					/>
				</header>
				<div
					className={cn(
						"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
						"w-full",
						"w-fit",
						"self-center",
						"justify-items-center",
						"gap-4",
						"",
						""
					)}>
					{isInitialLoad || !hasResults ? (
						Array.from({ length: 15 }).map((_, index) => (
							<CardSkeleton key={index} />
						))
					) : (
						<>
							{data!.results.map((book: Book, index: number) => (
								<ProductCard
									key={`${book.id}-${index}`}
									book={book}
									upperDownloadCountLimit={
										upperDownloadCountLimit
									}
									index={index}
									isFavorite={favoriteIds.includes(book.id)}
									onToggleFavorite={toggleFavorite}
								/>
							))}
							{loading &&
								pageCount > 1 &&
								Array.from({ length: 8 }).map((_, i) => (
									<CardSkeleton key={`more-${i}`} />
								))}
						</>
					)}
				</div>
				<div ref={loadMoreRef} aria-hidden className="h-1 w-full" />
			</div>
		</main>
	);
}
