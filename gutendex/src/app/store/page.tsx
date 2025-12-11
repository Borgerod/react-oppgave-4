"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/productCard";
import { Book } from "@/types";
// import { usePathname } from "next/navigation";
import CurrentPath from "@/utils/getCurrentPath";
import { cn } from "@/utils/cn";
// todo: issue, the popularity chart updates when its filtered, it should allways calculate popoularity by all books.
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

export default function Store() {
	const searchParams = useSearchParams();
	const searchParamsStr = searchParams ? searchParams.toString() : "";
	const [data, setData] = useState<any | null>(null);
	const [loading, setLoading] = useState(true);
	const [lastQuery, setLastQuery] = useState<string | undefined>(undefined);

	useEffect(() => {
		let mounted = true;
		async function load() {
			try {
				setLoading(true);
				const queryString = searchParamsStr
					? `?${searchParamsStr}`
					: "";
				const res = await fetch(`/api/books${queryString}`);
				const json = await res.json();
				if (mounted) setData(json);
				if (mounted) {
					if (!queryString) {
						setLastQuery(undefined);
					} else {
						const decoded = decodeURIComponent(
							queryString.replace(/^\?search=/, "search: ")
						);
						setLastQuery(decoded);
					}
				}
			} catch (err) {
				console.error("Failed to fetch books", err);
			} finally {
				if (mounted) setLoading(false);
			}
		}
		load();
		return () => {
			mounted = false;
		};
	}, [searchParamsStr]);

	if (loading || !data) {
		return (
			<main className="min-h-screen">
				{/* StoreHeader moved to app layout */}
				<div className="mx-auto flex max-w-6xl flex-col gap-8">
					<p>Loading books…</p>
					{/* todo: do something with this */}
				</div>
			</main>
		);
	}

	const upperDownloadCountLimit = !data.previous
		? computeUpperDownloadCountLimit(data.results)
		: undefined;

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
				"",
				""
			)}
		>
			{/* StoreHeader is rendered in app layout */}

			<div className="mx-auto flex max-w-6xl flex-col gap-8">
				<header className="flex flex-row gap-5 justify-between">
					<span className="ml-2">{CurrentPath(lastQuery)}</span>

					<span>
						Search results:{" "}
						<span>{data.count ?? data.results?.length ?? ""}</span>{" "}
						books
						{/* {lastQuery ? (
							<span className="ml-2 opacity-80">{lastQuery}</span>
						) : null} */}
					</span>
				</header>

				<div
					className={cn(
						"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
						// "mx-20",
						"w-full",
						"w-fit",
						"self-center",
						"justify-items-center",
						"",
						""
					)}
				>
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
