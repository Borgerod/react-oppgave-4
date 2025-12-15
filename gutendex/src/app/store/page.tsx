"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/store/productCard";
import { Book, BooksResponse } from "@/types";
// import { usePathname } from "next/navigation";
import CurrentPath from "@/utils/getCurrentPath";
import CardSkeleton from "@/components/store/cardSkeleton";
import { cn } from "@/utils/cn";
import SelectMenu from "@/components/store/selectMenu";
import SelectedFiltersTags from "@/components/filters/selectedFiltersTags";
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
	const [lastQuery, setLastQuery] = useState<string | undefined>(undefined);
	const [pageCount, setPageCount] = useState<number>(1);
	const isFetchingMoreRef = React.useRef<boolean>(false);
	const lastFetchTriggerRef = React.useRef<number>(0);
	const hasMorePagesRef = React.useRef<boolean>(true);
	const loadMoreRef = React.useRef<HTMLDivElement | null>(null);
	// const [sortByQuery, setSortByQuery] = useState("");
	const upperDownloadCountLimit =
		data && !data.previous
			? computeUpperDownloadCountLimit(data.results)
			: undefined;

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
				const apiUrl = `/api/books${
					searchParamsStr
						? `?${searchParamsStr}&page=${pageCount}`
						: `?page=${pageCount}`
				}`;

				const res = await fetch(apiUrl);
				const json = (await res.json()) as BooksResponse;

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
	// function sortByQuery(value: string): void {}

	// function loadNextPage() {
	// 	const scrollPosition = useScrollPosition();

	// 	return <div>{scrollPosition}</div>;
	// }

	return (
		<main
			className={cn(
				"min-h-screen",
				//
				"px-5",
				"lg:px-0",
				// "lg:px-0",
				// "md:px-15",
				// "sm:px-0",

				"",
				""
			)}>
			{/* StoreHeader is rendered in app layout */}

			{/* <div className="mx-auto flex max-w-6xl flex-col gap-8"> */}
			{/* <div className="mx-auto flex max-w-6xl flex-col gap-1"> */}
			<div className="mx-auto flex max-w-7xl flex-col gap-1 w-fit">
				{/* Selected Filters Tags */}
				<SelectedFiltersTags
					selectedTopics={selectedTopics}
					selectedFormats={selectedFormats}
					selectedLanguages={selectedLanguages}
					copyright={copyright}
					onRemoveTopic={(topic) => removeFilter("topic", topic)}
					onRemoveFormat={(format) => removeFilter("format", format)}
					onRemoveLanguage={(language) =>
						removeFilter("languages", language)
					}
					onRemoveCopyright={() => removeFilter("copyright")}
				/>

				{/* <header className="flex flex-row gap-5 justify-between "> */}
				<header className="grid grid-rows-2 grid-cols-2 items-end mb-2 ">
					<span className="row-start-1 col-start-1">
						{CurrentPath(lastQuery)}
					</span>
					<span className="row-start-2 col-start-1">
						Search results:{" "}
						<span>
							{data?.results?.length ?? 0} out of{" "}
							{data?.count ?? 0}
						</span>{" "}
						{/* <span>
							{data?.count ?? data?.results?.length ?? ""}
						</span>{" "} */}
						books
						{/* {lastQuery ? (
							<span className="ml-2 opacity-80">{lastQuery}</span>
						) : null} */}
					</span>
					{/* <option value="popularity-a">Popularity (Accending)</option>
					<option value="popularity-d">Popularity (Decending)</option> */}
					{/* 
					<option value="AZ">A-Z</option>
					<option value="ZA">Z-A</option> */}
					<SelectMenu
						// onChange={setSortByQuery}
						className={cn(
							"row-start-2 col-start-2 col-span-1",
							// "w-3xs",
							// "justify-end",
							// "justify-items-center",
							// "justify-items-end",
							// "gap-2",
							// "justify-self-end",
							"w-full",
							// "w-fit",
							// "min-w-20 max-w-50",
							// "bg-container-raised  rounded-full p-2 py-2",
							// "border border-edge-dark",
							// "border border-edge-dark",
							// "hover:border-edge-highlight",
							// "focus:outline-none focus:ring-transparent focus:border-edge-highlight",
							// "shadow",
							"",
							""
						)}
						options={[
							{ value: "descending", name: "Newest" },
							{ value: "ascending", name: "Oldest" },
							{
								value: "popular",
								name: "Popularity",
								// name: "Popularity (Decending)",
							},
						]}
						id="sortBy"
						// label="Sort by"
					/>
				</header>

				<div
					className={cn(
						"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
						// "mx-20",
						// "px-2",
						"w-full",
						"w-fit",
						"self-center",
						"justify-items-center",
						"gap-4",
						"",
						""
					)}>
					{loading || !data || !data.results
						? Array.from({ length: 15 }).map((_, index) => (
								<CardSkeleton key={index} />
						  ))
						: data.results.map((book: Book, index: number) => (
								<ProductCard
									key={`${book.id}-${index}`}
									book={book}
									upperDownloadCountLimit={
										upperDownloadCountLimit
									}
									index={index}
								/>
						  ))}
				</div>
				<div ref={loadMoreRef} aria-hidden className="h-1 w-full" />
			</div>
			{/* TODO: when scoll hits this point. load in next page */}
		</main>
	);
}
