"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/store/productCard";
import { Book, BooksResponse } from "@/types";
import CurrentPath from "@/utils/getCurrentPath";
import CardSkeleton from "@/components/store/cardSkeleton";
import { cn } from "@/utils/cn";
import SelectMenu from "@/components/store/selectMenu";
import SelectedFiltersTags from "@/components/filters/selectedFiltersTags";
import Highlights from "@/components/ui/highlights";
// todo: issue, the popularity chart updates when its filtered, it should allways calculate popoularity by all books.
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
			continue;
		}
		return current;
	}
	return current;
}

export default function Store() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const searchParamsStr = searchParams ? searchParams.toString() : "";
	const [data, setData] = useState<BooksResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [favoriteBooks, setFavoriteBooks] = useState<Book[] | null>(null);
	const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
	const [lastQuery, setLastQuery] = useState<string | undefined>(undefined);
	const [pageCount, setPageCount] = useState<number>(1);
	const isFetchingMoreRef = React.useRef<boolean>(false);
	const lastFetchTriggerRef = React.useRef<number>(0);
	const hasMorePagesRef = React.useRef<boolean>(true);
	const loadMoreRef = React.useRef<HTMLDivElement | null>(null);
	const upperDownloadCountLimit =
		data && !data.previous
			? computeUpperDownloadCountLimit(data.results)
			: undefined;

	// When loading more pages, keep showing existing results. Only show full
	// skeletons on the very first load.
	const isInitialLoad = loading && pageCount === 1;
	const hasResults = !!data && !!data.results && data.results.length > 0;

	// Parse filters from URL
	const selectedTopics = React.useMemo(() => {
		const topics: Record<string, boolean> = {};
		if (searchParams) {
			searchParams.getAll("topic").forEach((topic) => {
				topics[topic] = true;
			});
		}
		return topics;
	}, [searchParams]);

	const selectedFormats = React.useMemo(() => {
		const formats: Record<string, boolean> = {};
		if (searchParams) {
			searchParams.getAll("format").forEach((format) => {
				formats[format] = true;
			});
		}
		return formats;
	}, [searchParams]);

	const selectedLanguages = React.useMemo(() => {
		const languages: Record<string, boolean> = {};
		if (searchParams) {
			searchParams.getAll("languages").forEach((language) => {
				languages[language] = true;
			});
		}
		return languages;
	}, [searchParams]);

	const copyright = searchParams?.get("copyright") === "on";

	// Handler to remove individual filters
	const removeFilter = (type: string, value?: string) => {
		const params = new URLSearchParams(searchParams?.toString() || "");

		if (type === "copyright") {
			params.delete("copyright");
		} else if (value) {
			// Remove specific value
			const allValues = params.getAll(type);
			params.delete(type);
			allValues.forEach((v) => {
				if (v !== value) {
					params.append(type, v);
				}
			});
		}

		router.push(`/store?${params.toString()}`);
	};

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
					rawParams.has("year_from") &&
					rawParams.get("year_from") === ""
				) {
					rawParams.delete("year_from");
				}
				if (
					rawParams.has("year_to") &&
					rawParams.get("year_to") === ""
				) {
					rawParams.delete("year_to");
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
				): Promise<any> => {
					const res = await fetch(url);

					// Handle 429 with Retry-After or exponential backoff
					if (res.status === 429) {
						const retryAfter = res.headers.get("retry-after");
						const wait = retryAfter
							? Number(retryAfter) * 1000
							: backoff;
						if (retries > 0) {
							console.warn(
								"Received 429, retrying after",
								wait,
								"ms",
								url
							);
							await new Promise((r) => setTimeout(r, wait));
							return fetchJson(url, retries - 1, backoff * 2);
						}
						const text = await res.text();
						console.error(
							"Too Many Requests from",
							url,
							"body:",
							text
						);
						throw new Error(`Too Many Requests from ${url}`);
					}

					// If response not OK, log body for debugging and throw
					if (!res.ok) {
						const text = await res.text();
						console.error(
							"Fetch error",
							url,
							"status",
							res.status,
							"body:",
							text
						);
						throw new Error(
							`Fetch error ${res.status} from ${url}`
						);
					}

					const contentType = res.headers.get("content-type") || "";
					if (contentType.includes("application/json")) {
						return res.json();
					}

					// Fallback: try to parse text as JSON (some APIs misconfigure headers)
					const text = await res.text();
					try {
						return JSON.parse(text);
					} catch (err) {
						console.error(
							"Failed to parse JSON from",
							url,
							"status",
							res.status,
							"body:",
							text
						);
						throw new Error(`Invalid JSON response from ${url}`);
					}
				};

				const json = (await fetchJson(apiUrl)) as BooksResponse;

				if (!mounted) return;

				// Update hasMorePages ref
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
				console.error("Failed to fetch books", err);
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
	}, [searchParamsStr, pageCount]);

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

	//* LOAD NEXT PAGE VIA INTERSECTION OBSERVER
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

	return (
		<main className={cn("min-h-screen", "px-0", "lg:px-0", "", "")}>
			{/* TEST */}

			<div className="mx-auto flex flex-col gap-1 w-full">
				{/* <div className="mx-auto flex max-w-7xl flex-col gap-1 w-fit"> */}
				{/* Selected Filters Tags */}
				<SelectedFiltersTags
					selectedTopics={selectedTopics}
					selectedFormats={selectedFormats}
					selectedLanguages={selectedLanguages}
					copyright={copyright}
					searchQuery={searchParams?.get("search") ?? undefined}
					onRemoveTopic={(topic) => removeFilter("topic", topic)}
					onRemoveFormat={(format) => removeFilter("format", format)}
					onRemoveLanguage={(language) =>
						removeFilter("languages", language)
					}
					onRemoveCopyright={() => removeFilter("copyright")}
					onClearAll={() => router.push("/store")}
				/>

				<header className="grid grid-rows-2 grid-cols-2 items-end mb-2 ">
					<span className="row-start-1 col-start-1 text-tertiary flex">
						{/* {CurrentPath(lastQuery)} */}
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
							"row-start-2 col-start-2 col-span-1",
							"w-full",
							"",
							""
						)}
						options={[
							{ value: "descending", name: "Newest" },
							{ value: "ascending", name: "Oldest" },
							{
								value: "popular",
								name: "Popularity",
							},
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
					)}
				>
					{/* If initial load or no data, show full skeleton set */}
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

							{/* when loading additional pages, append skeletons instead of hiding results */}
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
