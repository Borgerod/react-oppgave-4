"use client";

import { cn } from "@/utils/cn";
// import {
// 	iconBtnClass,
// 	compressedBtnClass,
// 	textBtnClass,
// 	primaryBtnClass,
// 	secondaryBtnClass,
// } from "@/components/buttonClasses";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
type PopularAuthorsGridProps = Record<string, never>;
type AuthorItem = { author: string; count: number };
// import { FaHeart } from "react-icons/fa";
// import { FaRegHeart } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
// import { Tag } from "../filters/tag";
// import { BsPersonFill } from "react-icons/bs";

// button classes are centralized in src/components/buttonClasses.ts
export default function PopularAuthorsGrid({}: PopularAuthorsGridProps) {
	const [items, setItems] = useState<
		(AuthorItem & { image?: string })[] | null
	>(null);
	const [loading, setLoading] = useState(true);

	const personPlaceholder = (hex = "#9ca3af") =>
		`data:image/svg+xml;utf8,${encodeURIComponent(
			`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='96' height='96'><circle cx='12' cy='8' r='4' fill='${hex}'/><path d='M4 20c0-4 4-6 8-6s8 2 8 6' fill='${hex}'/></svg>`
		)}`;

	useEffect(() => {
		let mounted = true;

		const STORAGE_KEY = "popularAuthors_top9_v1";

		async function fetchAndStore(replaceIfEmpty = true) {
			try {
				const res = await fetch("/api/authors/top9");
				if (!res.ok) throw new Error("Failed to load authors");
				const json = await res.json();
				const baseItems = (json.top9 ?? []) as (AuthorItem & {
					image?: string;
				})[];

				if (mounted) setItems(baseItems);

				try {
					if (typeof window !== "undefined" && window.localStorage) {
						localStorage.setItem(
							STORAGE_KEY,
							JSON.stringify({ items: baseItems })
						);
					}
				} catch (e) {
					console.warn("Failed to write popular authors cache:", e);
				}
			} catch (e) {
				console.error("Error fetching popular authors:", e);
				if (replaceIfEmpty && mounted) setItems([]);
			}
		}

		async function load() {
			try {
				if (typeof window !== "undefined" && window.localStorage) {
					const raw = localStorage.getItem(STORAGE_KEY);
					if (raw) {
						try {
							const parsed = JSON.parse(raw) as {
								items?: (AuthorItem & { image?: string })[];
							};
							if (parsed?.items) {
								if (mounted) {
									setItems(parsed.items);
									setLoading(false);
								}
								// refresh in background, do not replace cache on error
								fetchAndStore(false);
								return;
							}
						} catch (e) {
							console.warn(
								"Failed to parse popular authors cache:",
								e
							);
						}
					}
				}

				// no cache -> fetch and store (replace on error)
				await fetchAndStore(true);
			} catch (e) {
				console.error("Error loading popular authors:", e);
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

	const cards = (items ?? []).map((it, idx) => {
		// const fileName = fileNameFromAuthor(it.author);
		// const fileUrl = `https://en.wikipedia.org/wiki/File:${fileName}.tif`;
		const href = `/store?search=${encodeURIComponent(it.author)}`;
		return (
			<Link href={href} key={idx} className="block group">
				<div
					className={cn(
						"bg-container   rounded-3xl shadow-xl ",
						"grid",
						"grid-cols-2 grid-rows-2",
						"items-start",
						"justify-start",
						"justify-items-start",
						"p-4 text-center",
						"h-full w-full",
						"hover:scale-105 hover:bg-container-solid",
						"hover:scale-105 hover:filter hover:brightness-95  dark:hover:bg-container-raised",
						"transition-transform",
						"hover:dark:bg-accent-dark",
						"hover:dark:bg-accent-dark",
						"hover:bg-accent",
						"hover:dark:text-background!",
						"",
						""
					)}>
					<Image
						width={96}
						height={96}
						src={
							it.image && it.image.trim() !== ""
								? it.image
								: personPlaceholder()
						}
						alt={it.author}
						className={cn(
							"aspect-square",
							"rounded-full",
							"shadow-xl",
							"object-cover",
							"col-start-1",
							"max-h-30",
							"",
							"",
							""
						)}
						priority={false}
					/>

					{/* <div
						className={cn(
							"col-start-2 row-start-1 ",
							"self-start justify-self-end",
							// "self-center justify-self-center",
							// "self-center justify-self-end",

							""
						)}
					>
						<Tag
							// item={`${()} hello`}
							bigText
							item={
								<div
									className={cn(
										"inline-flex items-center gap-0 text-base",
										// "md:text-base",
										"text-xl",
										"md:text-base",
										"lg:text-xl",
										"xl:text-base",
										"",
										""
									)}
								>
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
							}
						></Tag>
					</div> */}

					<div
						className={cn(
							"col-start-2 row-start-1 ",
							"self-start justify-self-end",
							// "self-center justify-self-center",
							// "self-center justify-self-end",
							"inline-flex",
							"items-stretch",
							"gap-0",
							"justify-self-end",
							// "text-xs",

							// "md:flex md:flex-col md:items-end md:justify-end",
							// "lg:flex lg:flex-row lg:items-end lg:justify-end",
							// "md:col-start-1 md:row-start-2",
							// "text-2xl",
							// "md:text-base",
							"text-base",
							"sm:text-xl",
							// "lg:text-xl",
							"xl:text-base",
							"",
							"",
							""
						)}
						// className="col-start-2 row-start-1 inline-flex items-stretch gap-0 justify-self-end text-xs"
					>
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
							"flex flex-row flex-wrap min-w-0",
							"text-left",
							"self-end items-baseline justify-start",
							"col-start-1 col-span-2 row-start-2 row-span-2",
							"",
							// "text-primary",
							"whitespace-normal wrap-break-word text-wrap ",
							"gap-1",
							"flex-col",
							"",
							""
						)}>
						<span
							id="sur-name"
							className={cn(
								"text-sm",
								"text-xl",
								"text-base",
								"sm:text-xl",
								"lg:text-sm",
								"min-w-0",
								"flex-1",
								"group-hover:dark:text-background",

								"",
								""
							)}>
							{(it.author.split(",")[0] || "").trim()},
						</span>
						<span
							id="first-name"
							className={cn(
								"text-secondary",
								"text-xs",
								"lg:text-xs",
								"text-sm",
								"min-w-0",
								"flex-1",
								"group-hover:dark:text-background",

								"",
								""
							)}>
							{(it.author.split(",")[1] || "").trim()}
						</span>
					</div>
				</div>
			</Link>
		);
	});

	const skeletons = Array.from({ length: 9 }).map((_, i) => (
		<div
			key={i}
			className={cn(
				"bg-container   rounded-3xl shadow-xl ",
				"grid",
				"grid-cols-2 grid-rows-2",
				"items-start",
				"justify-start",
				"justify-items-start",
				"p-4 text-center",
				"h-full w-full",
				"",
				""
			)}>
			<Image
				width={96}
				height={96}
				src={personPlaceholder()}
				alt={"placeholder"}
				className={cn(
					"aspect-square",
					"rounded-full",
					"shadow-xl",
					"object-cover",
					"col-start-1",
					"max-h-30",
					"bg-foreground/10 p-1",
					"",
					"",
					""
				)}
				priority={false}
			/>

			<div
				className={cn(
					"col-start-2 row-start-1 ",
					"self-start justify-self-end",
					"inline-flex",
					"items-stretch",
					"gap-0",
					"justify-self-end",
					"text-base",
					"sm:text-xl",
					"xl:text-base",
					"text-transparent",
					"rounded-full bg-foreground/10",
					"",
					""
				)}>
				<IoMdDownload className="shrink-0" />
				<span className="inline-flex items-center leading-none max-w-16 truncate">
					000k
				</span>
			</div>

			<div
				className={cn(
					"flex flex-row flex-wrap min-w-0",
					"text-left",
					"self-end items-baseline justify-start",
					"col-start-1 col-span-2 row-start-2 row-span-2",
					"",
					"whitespace-normal wrap-break-word text-wrap ",
					"gap-1",
					"flex-col",
					"",
					""
				)}>
				<span
					id="sur-name"
					className={cn(
						"text-sm",
						"text-xl",
						"text-base",
						"sm:text-xl",
						"lg:text-sm",
						"min-w-0",
						"flex-1",
						"w-full",

						"rounded-full bg-foreground/10 text-transparent",
						"",
						"",
						""
					)}>
					placeholder
				</span>
				<span
					id="first-name"
					className={cn(
						"text-secondary",
						"text-xs",
						"lg:text-xs",
						"text-sm",
						"min-w-0",
						"flex-1",
						"rounded-full bg-foreground/10 text-transparent",
						"",
						""
					)}>
					placeholder
				</span>
			</div>
		</div>
	));

	return (
		<div>
			<h3 className="text-2xl font-medium mb-4">Popular authors</h3>
			<div
				className={cn(
					"grid",
					"gap-5 justify-center w-auto mt-4",
					"grid-rows-3 grid-cols-3",
					"md:grid-rows-4 md:grid-cols-2",
					"lg:grid-rows-3 lg:grid-cols-3",
					"md:text-xl",
					"lg:text-base",
					"",
					""
				)}>
				{loading ? skeletons : cards}
			</div>
		</div>
	);
}
