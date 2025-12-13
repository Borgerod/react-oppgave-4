"use client";
import { cn } from "@/utils/cn";
import type { Book } from "@/types";
import Image from "next/image";
import Rating from "./rating";
import Link from "next/link";
import { useUpperDownloadCount } from "@/providers/providers";
// import { useEffect, useState } from "react";
type Props = {
	book: Book;
	index?: number;
	upperDownloadCountLimit?: number;
	mini?: boolean;
};
export default function ProductCard({
	book,
	upperDownloadCountLimit,
	mini,
}: Props) {
	const contextUpper = useUpperDownloadCount();
	const formats = book.formats as Record<string, string> | undefined;
	const imgSrc = formats?.["image/jpeg"] || formats?.["image/jpg"] || "";

	// prefer explicit prop, otherwise fall back to context value, then 1
	const upperLimit = upperDownloadCountLimit ?? contextUpper ?? 1;

	// todo get count
	const download_count = book.download_count;

	// prepare authors as a single formatted string (easier markup, avoids extra spans)
	const authorNames = (book.authors || [])
		.map((a) => a?.name)
		.filter((n): n is string => typeof n === "string" && n.length > 0);
	const authorsText =
		authorNames.length === 0
			? "unknown"
			: authorNames.length === 1
			? authorNames[0]
			: `${authorNames.slice(0, -1).join("; ")} & ${
					authorNames[authorNames.length - 1]
			  }`;

	// prepare title parts (main title + optional subtitle) to simplify markup
	const _titleParts = (book.title ?? "").split(/[;:]/, 2);
	const titleMain = _titleParts[0] || "unknown";
	const titleSub = _titleParts[1] ? _titleParts[1].trim() : "";
	function formatLinkVars(prop: string) {
		return prop
			.trim()
			.toLowerCase()
			.normalize("NFKD") // separate diacritics
			.replace(/[\u0300-\u036f]/g, "") // remove diacritics
			.replace(/[^\w\s-]/g, "") // remove punctuation except - and spaces
			.replace(/\s+/g, "-") // spaces -> dashes
			.replace(/-+/g, "-"); // collapse repeated dashes
	}
	return (
		// <Link href="/dashboard">Dashboard</Link>
		<Link
			href={`/book-profile/${book.id}/${formatLinkVars(book.title)}`}
			className={cn(
				"bg-container border-edge border rounded-3xl",
				// keep mini behaviour; non-mini should stretch to the grid row so buttons can sit at bottom
				`${
					mini
						? "inline-block flex-none w-80 h-fit"
						: // : "block w-full h-full"
						  "block h-full w-lg sm:w-2xs"
				}`,
				// "w-xl",
				"",
				// "sm:p-1",
				"hover:bg-container-raised hover:scale-101",

				// "shadow-2xl",
				"shadow-xl",
				"",
				""
			)}>
			<div
				className={cn(
					"overflow-hidden rounded-3xl",
					`${mini ? "" : "h-full"}`
				)}>
				<div
					className={cn(
						`${
							mini
								? "flex flex-row gap-4 items-start p-4"
								: "flex flex-row gap-4 p-4 h-full sm:flex-col w-full"
							// : "flex flex-col gap-4 p-4 h-full md:flex-col"
							// : "flex flex-col justify-between gap-4 p-4 h-full"
						}`,
						// "flex flex-row gap-4 p-4 h-full sm:flex-col w-full",
						"",
						""
					)}>
					{imgSrc ? (
						<Image
							src={imgSrc}
							alt={book.title ?? "cover"}
							width={220}
							height={330}
							className={cn(
								"rounded-xl aspect-2/3",
								// keep aspect-ratio but prevent the image from growing too tall
								// use object-contain so the cover keeps its proportions
								"h-full",
								"w-30 ",
								"",
								`${
									mini
										? "h-30 w-20 object-cover"
										: "object-cover sm:h-full sm:w-full sm:object-cover"

									// : "  max-h-[55vh] sm:max-h-[420px] object-cover"
								}`
							)}
							style={{
								// ensure Next/Image respects the class max-height
								maxWidth: "100%",
							}}
						/>
					) : (
						<div
							className={cn(
								`${
									mini
										? "w-full rounded-xl aspect-2/3 bg-gray-100"
										: "w-full rounded-xl aspect-2/3 bg-gray-100"
								}`
							)}
						/>
					)}

					<div
						className={cn(
							"flex flex-col",
							"flex justify-between gap-4 h-full sm:flex-col w-full",
							"",
							""
						)}>
						<div
							className={cn(
								// `${mini ? "flex flex-col justify-between" : ""}`,
								`${mini ? "flex flex-col gap-2" : ""}`,
								"sm: flex-col",
								// "flex flex-col",
								"",
								""
							)}>
							<h2
								className={cn(
									"text-2xl font-extralight text-primary p-0 m-0 ",
									// "text-2xl font-extralight text-primary p-0 m-0 leading-[0.75]",
									"text-2xl font-extralight text-primary p-0 m-0 leading-none",
									"text-2xl font-extralight text-primary p-0 m-0 leading-tight",
									`${mini ? "text-xs leading-[0.75]" : ""}`,
									""
								)}>
								{titleMain}
								{titleSub && (
									<span
										className={cn(
											"text-sm italic font-thin text-secondary ml-2 align-baseline leading-[0.75]",
											`${mini ? "text-xs ml-1" : ""}`
										)}>
										{titleSub}
									</span>
								)}
							</h2>
							<p
								className={cn(
									// "text-sm italic font-thin mt-1 align-baseline leading-[0.75]",
									"text-sm italic font-thin mt-1 align-baseline ",
									// "mb-auto",
									`${mini ? "text-xs" : ""}`
								)}>
								<span
									className={cn(
										"text-xs text-tertiary mr-1"
									)}>
									By:
								</span>
								<span
									title={authorsText}
									className={cn(
										`${mini ? "truncate max-w-40" : ""}`
									)}>
									{authorsText}
								</span>
							</p>
							<div
								className={cn(
									"mt-auto",
									`${mini ? "visible" : "hidden"}`,
									"",
									""
								)}>
								<Rating
									ratingCount={download_count}
									upperDownloadCountLimit={upperLimit}
									mini={mini}
								/>
							</div>
						</div>
						<div
							className={cn(
								// "flex flex-row flex-wrap gap-1 mt-2",
								// `${mini ? "hidden" : ""}`,
								"flex flex-row justify-between",
								"flex sm:flex-col sm:gap-4",
								// "h-full",
								`${mini ? "hidden" : ""}`,
								""
							)}>
							<div
								className={cn(
									// "flex flex-row flex-wrap gap-1 mt-2",
									// `${mini ? "hidden" : ""}`,
									"flex flex-col",
									"h-full",
									`${mini ? "hidden" : ""}`,
									""
								)}>
								<div
									className={cn(
										// "flex flex-row flex-wrap gap-1 mt-2",
										`${mini ? "visible" : ""}`,

										"mt-auto",
										"",
										""
									)}>
									<Rating
										ratingCount={download_count}
										upperDownloadCountLimit={upperLimit}
										mini={mini}
									/>
								</div>
								<p>
									{(book.bookshelves || []).map(
										(shelf: string, index: number) =>
											shelf.includes("Category:") &&
											!shelf.includes("Literature") ? (
												<button
													key={`${shelf}-${index}`}
													className=""
													// onClick={}
													// TODO:
													//       "download_count": 303668
												>
													<span
														key={`${shelf}-${index}`}
														className={cn(
															"text-xs font-thin",
															"px-2 py-0.5",
															"rounded-full",
															"text-secondary",
															"text-primary/80",
															"mr-1",
															// "text-tertiary",
															"bg-foreground/10 hover:bg-foreground/30",
															"dark:bg-foreground/20 dark:hover:bg-foreground/30",
															"dark:bg-foreground/25 dark:hover:bg-foreground/35",
															"",
															"",
															""
														)}>
														{
															shelf.split(
																"Category:"
															)[1]
														}
													</span>
												</button>
											) : (
												""
											)
									)}
								</p>
							</div>
							{/* TODO: check the versions maybe someone are kindle frieldy or not */}
							{/* TODO: would be funny to actually add prices and make the tutor pay to review the rest. */}
							<button
								className={cn(
									"rounded-full",
									"w-fit p-1 px-5",
									"border border-accent-dark text-accent-dark",
									// "hover:border-accent-dark hover:text-black hover:bg-accent-dark",
									"hover:border-accent-dark hover:text-container-solid hover:bg-accent-dark",
									"border dark:border-accent dark:ext-accent",
									// "hover:dark:border-accent-dark hover:dark:text-black hover:dark:bg-accent-dark",
									"hover:dark:border-accent-dark hover:dark:text-container-solid hover:dark:bg-accent-dark",
									"h-10 text-nowrap self-",
									"sm:h-full",
									// `${mini ? "hidden" : "mt-auto"}`,
									`${mini ? "hidden" : ""}`,
									"",
									""
								)}>
								Read more
							</button>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}

//  <div
// 	key={book.id ?? index}
// 	className="bg-container border-edge border rounded-3xl">
// 	<div
// 		className={cn(
// 			"overflow-hidden h-full rounded-3xl"
// 		)}>
// 		<div className="flex flex-col justify-between gap-4 p-4 h-full">
// 			<img
// 				src={
// 					book.formats[
// 						"image/jpeg"
// 					] ||
// 					book.formats[
// 						"image/jpg"
// 					] ||
// 					""
// 				}
// 				alt={book.title ?? "cover"}
// 				className="w-full h-auto object-cover rounded-xl aspect-2/3"
// 			/>
// 			{(() => {
// 				const _title = (book.title ?? "").split(
// 					/[;:]/,
// 					2
// 				);
// 				return (
// 					<>
// 						<h2 className="text-2xl font-extralight text-primary">
// 							{_title[0] || "unknown"}
// 							{_title[1] && (
// 								<span className="text-sm italic font-thin text-secondary ml-2 align-baseline">
// 									{_title[1]}
// 								</span>
// 							)}
// 						</h2>
// 					</>
// 				);
// 			})()}
// 			<hr className="border-t border-edge my-2" />
// 			<p>
// 				By:{" "}
// 				{(book.authors || []).map((a, i) => (
// 					<span key={i}>
// 						{a?.name}
// 						{i < book.authors.length - 2
// 							? "; "
// 							: i ===
// 								book.authors.length - 2
// 							? " & "
// 							: ""}
// 					</span>
// 				))}
// 				{(book.authors || []).length === 0 &&
// 					"unknown"}
// 			</p>
// 			<hr className="border-t border-edge my-2" />
// 			<div>
// 				<details className="mb-2">
// 					<summary className="cursor-pointer font-medium">
// 						subjects
// 					</summary>
// 					<div className="flex flex-row flex-wrap gap-1 mt-2">
// 						{book.subjects.map(
// 							(
// 								subject: string,
// 								index: number
// 							) => (
// 								<span
// 									key={`${subject}-${index}`}
// 									className="text-xs px-2 py-0.5 rounded bg-edge/10">
// 									{subject}
// 								</span>
// 							)
// 						)}
// 					</div>
// 				</details>

// 				<details>
// 					<summary className="cursor-pointer font-medium">
// 						bookshelves
// 					</summary>
// 					<div className="flex flex-row flex-wrap gap-1 mt-2">
// 						{book.bookshelves.map(
// 							(
// 								shelf: string,
// 								index: number
// 							) => (
// 								<span
// 									key={`${shelf}-${index}`}
// 									className="text-xs px-2 py-0.5 rounded bg-edge/10">
// 									{shelf}
// 								</span>
// 							)
// 						)}
// 					</div>
// 				</details>
// 			</div>
// 		</div>
// </div>
