"use client";

import { cn } from "@/utils/cn";
import {
	iconBtnClass,
	compressedBtnClass,
	textBtnClass,
	primaryBtnClass,
	secondaryBtnClass,
} from "@/components/buttonClasses";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
type PopularAuthorsGridProps = {};
type AuthorItem = { author: string; count: number };
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";

// button classes are centralized in src/components/buttonClasses.ts
export default function PopularAuthorsGrid({}: PopularAuthorsGridProps) {
	const [items, setItems] = useState<
		(AuthorItem & { image?: string })[] | null
	>(null);
	const [loading, setLoading] = useState(true);

	const PLACEHOLDER = `data:image/svg+xml;utf8,${encodeURIComponent(
		`<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='Arial' font-size='12'>No image</text></svg>`
	)}`;

	useEffect(() => {
		let mounted = true;
		async function load() {
			try {
				const res = await fetch("/api/authors/top9");
				if (!res.ok) throw new Error("Failed to load authors");
				const json = await res.json();
				const baseItems = (json.top9 ?? []) as (AuthorItem & {
					image?: string;
				})[];
				if (mounted) setItems(baseItems);
			} catch (e) {
				console.error(e);
				if (mounted) setItems([]);
			} finally {
				if (mounted) setLoading(false);
			}
		}
		load();
		return () => {
			mounted = false;
		};
	}, []);

	function fileNameFromAuthor(author: string) {
		let s = String(author || "").trim();
		// normalize whitespace
		s = s.replace(/\s+/g, " ");
		// If format is "Last, First Middle" move surname to the end
		if (s.includes(",")) {
			const parts = s
				.split(",")
				.map((p) => p.trim())
				.filter(Boolean);
			if (parts.length >= 2) {
				const last = parts[0];
				const rest = parts.slice(1).join(" ");
				s = `${rest} ${last}`.trim();
			}
		}
		// remove commas/periods and any leftover undesirable chars, then use underscores
		return s.replace(/[.,]/g, "").replace(/\s+/g, "_");
	}

	// use built-in Intl.NumberFormat inline when rendering counts

	const cards = (items ?? []).map((it, idx) => {
		const fileName = fileNameFromAuthor(it.author);
		const fileUrl = `https://en.wikipedia.org/wiki/File:${fileName}.tif`;
		const href = `/store?search=${encodeURIComponent(it.author)}`;
		return (
			<Link href={href} key={idx} className="block">
				<div
					className={cn(
						"bg-container   rounded-3xl shadow-xl ",
						"grid grid-cols-2 grid-rows-[auto_1fr] items-start justify-start justify-items-start",
						"p-4 text-center",
						"h-full w-full",
						"hover:scale-105 hover:bg-container-solid",
						"hover:scale-105 hover:filter hover:brightness-95  dark:hover:bg-container-raised",
						"",
						""
					)}
				>
					<Image
						width={96}
						height={96}
						src={(it as any).image ?? PLACEHOLDER}
						alt={it.author}
						className="aspect-square rounded-full shadow-xl object-cover col-start-1"
						priority={false}
					/>

					<div className="col-start-2 row-start-1 inline-flex items-stretch gap-0 justify-self-end text-xs">
						<IoMdDownload className="shrink-0" />
						<span className="inline-flex items-center leading-none max-w-16 truncate">
							{it.count != null
								? new Intl.NumberFormat("en", {
										notation: "compact",
										maximumFractionDigits: 0,
								  })
										.format(it.count)
										.toLowerCase()
								: ""}
						</span>
					</div>
					<div
						className={cn(
							"flex flex-row flex-wrap w-full",
							"text-left",
							"self-end items-baseline justify-start",
							"col-start-1 col-span-2 row-start-2 row-span-2",
							"",
							""
						)}
					>
						<span className="text-sm text-primary whitespace-normal wrap-break-word text-wrap mr-1">
							{(it.author.split(",")[0] || "").trim()},
						</span>
						<span className="text-xs text-secondary whitespace-normal wrap-break-word text-wrap ">
							{(it.author.split(",")[1] || "").trim()}
						</span>
					</div>
				</div>
			</Link>
		);
	});

	// ensure exactly 9 slots (fill with placeholders if necessary)
	// only add simple placeholders when not loading (we show skeletons while loading)
	if (!loading) {
		while (cards.length < 9) {
			cards.push(
				<div
					key={`ph-${cards.length}`}
					className="bg-container-raised h-50 w-50 rounded-3xl shadow-xl"
				/>
			);
		}
	}

	return (
		<div>
			<h3 className="text-2xl font-medium mb-4">Popular authors</h3>
			{loading ? (
				<div
					className={cn(
						"grid grid-rows-3 grid-cols-3 gap-4 justify-center w-auto mt-4"
					)}
				>
					{Array.from({ length: 9 }).map((_, i) => (
						<div
							key={i}
							className={cn(
								"bg-container   rounded-3xl shadow-xl ",
								"grid grid-cols-2 grid-rows-[auto_1fr] items-start justify-start justify-items-start",
								"p-4 text-center h-full w-full animate-pulse"
							)}
						>
							<div className="col-start-1">
								<div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-xl object-cover bg-foreground/10" />
							</div>

							<div className="col-start-2 row-start-1 inline-flex items-stretch gap-0 justify-self-end text-xs">
								<div className="w-5 h-5 rounded-full bg-foreground/10 shrink-0 mr-2" />
								<span className="inline-flex items-center leading-none max-w-16 truncate w-16 h-4 bg-foreground/10 rounded" />
							</div>

							<div
								className={cn(
									"flex flex-row flex-wrap w-full",
									"text-left",
									"self-end items-baseline justify-start",
									"col-start-1 col-span-2 row-start-2 row-span-2"
								)}
							>
								<span className="text-sm text-primary whitespace-normal wrap-break-word text-wrap mr-1">
									<span className="inline-block w-32 h-3 bg-foreground/10 rounded" />
								</span>
								<span className="text-xs text-secondary whitespace-normal wrap-break-word text-wrap ">
									<span className="inline-block w-24 h-2 bg-foreground/10 rounded" />
								</span>
							</div>
						</div>
					))}
				</div>
			) : null}
			<div
				className={cn(
					"grid grid-rows-3 grid-cols-3 gap-4 justify-center w-auto mt-4"
				)}
			>
				{cards}
			</div>
		</div>
	);
}
