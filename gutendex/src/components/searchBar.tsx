"use client";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";

const SearchIcon = () => (
	<div
		className={cn(
			// "p-3",
			"p-2",
			"h-full ",
			"mr-2",
			"pointer-events-auto",
			"rounded-full",
			"flex items-center justify-center",
			"hover:bg-foreground/30",
			"hover:bg-foreground/10",
			"",
			""
		)}
	>
		<IoSearch className={cn("pointer-events-none")} />
	</div>
);

type SearchBarProps = {
	onResults?: (data: any, queryString?: string) => void;
	onQuery?: (queryString?: string) => void;
};

export default function SearchBar({ onResults, onQuery }: SearchBarProps) {
	const [query, setQuery] = useState("");
	const router = useRouter();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const trimmed = (query ?? "").trim();
		if (!trimmed) return;
		const encoded = encodeURIComponent(trimmed);
		const queryString = `?search=${encoded}`;
		try {
			const res = await fetch(`https://gutendex.com/books${queryString}`);
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const data = await res.json();
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
					"bg-container",
					"text-sm",
					"p-1",
					// "px-3",
					// "py-2",
					// "py-1",
					"border border-foreground/10",
					"focus:outline-none focus:ring-2 focus:ring-accent",
					"rounded-full",
					"w-full",
					// "hover:bg-foreground/10",
					"hover:border-edge-highlight",
					// "h-[43px]",
					""
				)}
			>
				<SearchIcon />
				<input
					name="q"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					type="text"
					placeholder="Search.."
					aria-label="Search"
					className={cn(
						"w-full",
						"bg-transparent",
						"placeholder:italic",
						"outline-none",
						"focus:outline-none"
					)}
				/>
			</div>
		</form>
	);
}
