"use client";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { cn } from "@/utils/cn";
import type { BooksResponse } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";

const SearchIcon = () => (
	<div
		className={cn(
			"w-10",
			"h-10",
			"mr-2",
			"pointer-events-auto",
			"rounded-full",
			"flex items-center justify-center",
			"hover:bg-foreground/10",
			"text-xl sm:text-md"
		)}>
		<IoSearch className={cn("pointer-events-none")} />
	</div>
);

type SearchBarProps = {
	onResults?: (data: BooksResponse, queryString?: string) => void;
	onQuery?: (queryString?: string) => void;
	searchQuery?: string;
	setSearchQuery?: (query: string) => void;
};

export default function SearchBar({
	onResults,
	onQuery,
	searchQuery,
	setSearchQuery,
}: SearchBarProps) {
	const [localQuery, setLocalQuery] = useState(searchQuery ?? "");

	// Sync if parent updates the searchQuery prop
	React.useEffect(() => {
		if (typeof searchQuery === "string") setLocalQuery(searchQuery);
	}, [searchQuery]);

	const query = localQuery;
	const router = useRouter();
	const searchParams = useSearchParams();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const trimmed = (query ?? "").trim();
		if (!trimmed) return;

		// Preserve existing filter parameters
		const params = new URLSearchParams(searchParams?.toString() || "");
		params.set("search", trimmed);

		const queryString = `?${params.toString()}`;
		const encoded = encodeURIComponent(trimmed);

		try {
			const res = await fetch(
				`https://gutendex.com/books?search=${encoded}`
			);
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const data = (await res.json()) as BooksResponse;
			if (onResults) onResults(data, queryString);
			else router.push(`/store${queryString}`);
			if (onQuery) onQuery(queryString);
		} catch (err) {
			console.error("Search failed:", err);
		}
	}

	return (
		<form onSubmit={handleSubmit} className={cn("w-full max-w-lg")}>
			<div
				className={cn(
					"flex flex-row items-center",
					"text-sm",
					"px-3 py-0",
					"focus:outline-none focus:ring-none ",
					"rounded-full",
					"w-full",
					"border border-edge-dark",
					"hover:border-edge-highlight",
					"h-12",
					"text-lg sm:text-sm",
					"bg-container",
					"",
					"",
					""
				)}>
				<SearchIcon />
				<input
					name="q"
					value={query}
					onChange={(e) => {
						const v = e.target.value;
						setLocalQuery(v);
						if (setSearchQuery) setSearchQuery(v);
					}}
					type="text"
					placeholder="Search.."
					aria-label="Search"
					className={cn(
						"w-full",
						"bg-transparent",
						"placeholder:italic",
						"outline-none",
						"focus:outline-none",
						"py-0",
						"leading-none",
						"h-full",
						"",
						""
					)}
				/>
			</div>
		</form>
	);
}
