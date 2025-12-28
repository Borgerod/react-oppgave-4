"use client";
import React from "react";
import { cn } from "@/utils/cn";
import type { Book, Title } from "@/types";
import Image from "next/image";
import Rating from "@/components/store/rating";
import Link from "next/link";
// import MiniProductCard from "./miniCard";
import { useUpperDownloadCount } from "@/providers/providers";
import { Tag } from "@/components/filters/tag";
import FavoriteButton from "@/components/ui/favoriteButton";
import PlaceholderBookCover from "@/components/ui/PlaceholderBookCover";
import {
	formatLinkVars,
	useFavorite,
	getAuthorsText,
	getImageSrc,
} from "./cardSharedUtils";
import { FaBookOpen } from "react-icons/fa";
type Props = {
	book: Book;
	index?: number;
	upperDownloadCountLimit?: number;
	mini?: boolean;
	isFavorite?: boolean;
	onToggleFavorite?: (book: Book) => void;
};
export default function ProductCard({
	book,
	upperDownloadCountLimit,
	mini,
	isFavorite,
	onToggleFavorite,
}: Props) {
	const contextUpper = useUpperDownloadCount();
	const formats = book.formats as Record<string, string> | undefined;
	const imgSrc = getImageSrc(formats);

	// prefer explicit prop, otherwise fall back to context value, then 1
	const upperLimit = upperDownloadCountLimit ?? contextUpper ?? 1;

	const download_count = book.download_count;

	// If you want to use MiniProductCard for mini view, uncomment below:
	// if (mini) {
	//   return (
	//     <MiniProductCard
	//       book={book}
	//       upperDownloadCountLimit={upperLimit}
	//       isFavorite={isFavorite}
	//       onToggleFavorite={onToggleFavorite}
	//     />
	//   );
	// }

	// prepare authors as a single formatted string (easier markup, avoids extra spans)
	const authorsText = getAuthorsText(book);

	// local favorite state fallback: if parent doesn't provide handler/prop,
	// manage favorites in localStorage so heart is always visible and usable.
	useFavorite(book, isFavorite, onToggleFavorite);

	// `book.title` is already normalized to `Title`
	const title: Title = book.title;

	return (
		<Link
			href={`/book-profile/${book.id}/${formatLinkVars(book.title)}`}
			className={cn(
				"relative group bg-container border-edge border rounded-3xl",
				`${
					mini
						? "inline-block sm:flex-none w-auto max-w-full md:max-w-2xl lg:max-w-xs h-auto overflow-visible"
						: "block h-full w-full sm:w-2xs min-w-0"
				}`,
				"hover:bg-container-raised",
				"shadow-xl",
				// "min-w-120",
				// "min-w-100",
				"sm:min-w-0",
				"",
				""
			)}>
			{/* Favorite button placed directly under Link so it is outside the scaled wrapper */}
			<FavoriteButton
				book={book}
				isFavorite={isFavorite}
				onToggleFavorite={onToggleFavorite}
			/>

			<div className={cn(`${mini ? "" : "h-full"}`)}>
				<div
					id="content-container"
					className={cn(
						"transform transition-transform duration-200 ease-out will-change-transform",
						"group-hover:scale-101",
						"flex flex-row gap-3 p-4 h-full sm:flex-col w-full min-h-0",
						"grid gap-3 p-4 h-full w-full min-h-0",
						"sm:flex-col",
						"grid-cols-[auto_1fr] grid-rows-1",
						// "grid-cols-[1fr_auto] grid-rows-1",
						"sm:grid-cols-1 sm:grid-rows-[auto_1fr]",
						"w-full h-full",
						"",
						""
					)}>
					{imgSrc ? (
						<Image
							src={imgSrc}
							alt={book.title?.main ?? "cover"}
							width={250}
							height={200}
							className={cn(
								"h-full",
								"w-full",
								"object-cover",
								"grid grid-rows-[auto_1fr_auto]",
								"justify-items-center",
								"content-start",
								"max-w-30 sm:max-w-none",
								"min-h-40 sm:min-h-none",
								"aspect-2/3",
								"rounded-2xl",
								"overflow-hidden",
								"",
								""
							)}
							priority={mini ? false : true}
						/>
					) : (
						<PlaceholderBookCover
							title={title}
							authorsText={authorsText}
						/>
					)}

					<div
						id="text-container"
						className={cn(
							"flex flex-col",
							`${
								mini
									? "flex justify-between gap-4 h-auto sm:flex-col w-full"
									: "flex justify-between gap-4 h-full sm:flex-col w-full"
							}`,
							"min-w-0",
							// "bg-amber-300",
							"",
							""
						)}>
						<div
							className={cn(
								`${
									mini
										? "flex flex-col gap-2 h-auto flex-1 min-w-0 wrap-break-word pr-6"
										: ""
								}`,
								"sm:flex-col",
								"",
								""
							)}>
							<h2
								className={cn(
									"text-2xl font-extralight text-primary p-0 m-0",
									"text-2xl font-extralight text-primary p-0 m-0 leading-tight",
									"leading-none",

									"whitespace-normal wrap-break-word pr-10",
									`${
										mini
											? "text-xs leading-tight pr-0 wrap-break-word"
											: ""
									}`
								)}>
								{title.main}
								{title.sub && (
									<span
										className={cn(
											"text-sm italic font-thin text-secondary ml-2 align-baseline leading-[0.75]",
											"leading-none",
											"",
											"",
											"",
											`${mini ? "text-xs ml-1" : ""}`
										)}>
										{title.sub}
									</span>
								)}
							</h2>
							<p
								className={cn(
									"text-sm italic font-thin mt-1 align-baseline ",
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
										`${
											mini
												? "wrap-break-word max-w-[120px] pr-10"
												: ""
										}`
									)}>
									{authorsText}
								</span>
							</p>
							<div
								className={cn(
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
							id="ratingtags-readmore-row"
							className={cn(
								"flex flex-row justify-between",
								"flex sm:flex-col sm:gap-4",
								`${mini ? "hidden" : ""}`,
								"",
								""
							)}>
							<div
								id="raintg-tags-column"
								className={cn(
									"flex flex-col",
									"h-full",
									`${mini ? "hidden" : ""}`,
									"",
									""
								)}>
								<div
									id="rating-container"
									className={cn(
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
								<p
									className={cn(
										"flex flex-row gap-1 text-nowrap flex-wrap",
										"",
										""
									)}>
									{(book.bookshelves || []).map(
										(shelf: string, idx: number) => {
											if (
												!shelf.includes("Category:") ||
												shelf.includes("Literature")
											)
												return null;
											const category = (
												shelf.split("Category:")[1] ||
												""
											).trim();
											const topic =
												encodeURIComponent(category);
											return (
												<Tag
													url={`/store?topic=${topic}`}
													key={`${shelf}-${idx}`}
													id={`${book.id}-${shelf}-${idx}`}
													item={category}
													checked={false}
													onToggle={() => {}}
												/>
											);
										}
									)}
								</p>
							</div>
							<button
								type="button"
								tabIndex={-1}
								aria-label="Read more about this book"
								className={cn(
									"rounded-full",
									"w-fit p-1 px-3",
									"border border-accent-dark text-accent-dark",
									"hover:border-accent-dark hover:text-container-solid hover:bg-accent-dark",
									"border dark:border-accent dark:ext-accent",
									"hover:dark:border-accent-dark hover:dark:text-container-solid hover:dark:bg-accent-dark",
									"h-10 text-nowrap self-end",
									"sm:h-full",
									`${mini ? "hidden" : ""}`,
									"",
									"",
									"",
									""
								)}
								onClick={(e) => e.preventDefault()}>
								<FaBookOpen
									className={cn(
										"inline-block",
										"min-[450px]:hidden",
										"w-4",
										"h-4",
										""
									)}
								/>
								<span
									className={cn(
										"hidden",
										"min-[450px]:inline-block",
										"ml-2",
										"align-middle",
										""
									)}>
									Read more
								</span>
							</button>
						</div>
						{/* TODO: check the versions maybe someone are kindle frieldy or not */}
						{/* TODO: would be funny to actually add prices and make the tutor pay to review the rest. */}
					</div>
				</div>
			</div>
		</Link>
	);
}
