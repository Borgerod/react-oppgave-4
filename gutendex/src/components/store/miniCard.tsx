"use client";
import React from "react";
import { cn } from "@/utils/cn";
import type { Book, Title } from "@/types";
import Image from "next/image";
import Rating from "@/components/store/rating";
import Link from "next/link";
import { useUpperDownloadCount } from "@/providers/providers";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import {
	formatLinkVars,
	useFavorite,
	getAuthorsText,
	getImageSrc,
} from "./cardSharedUtils";
import { number } from "prop-types";

type Props = {
	book: Book;
	upperDownloadCountLimit?: number;
	isFavorite?: boolean;
	onToggleFavorite?: (book: Book) => void;
	index: number;
};

export default function MiniProductCard({
	book,
	index,
	upperDownloadCountLimit,
	isFavorite,
	onToggleFavorite,
}: Props) {
	const contextUpper = useUpperDownloadCount();
	const formats = book.formats as Record<string, string> | undefined;
	const imgSrc = getImageSrc(formats);
	// book.title is normalized to `Title` at fetch time
	const title: Title = book.title;
	const upperLimit = upperDownloadCountLimit ?? contextUpper ?? 1;
	const download_count = book.download_count;
	const authorsText = getAuthorsText(book);
	const { localFav, toggle, ariaLabel } = useFavorite(
		book,
		isFavorite,
		onToggleFavorite
	);

	return (
		<Link
			href={`/book-profile/${book.id}/${formatLinkVars(book.title)}`}
			className={cn(
				"bg-container border-edge border rounded-3xl",

				"hover:bg-container-raised hover:scale-101",
				"shadow-xl",
				"min-w-120",
				"min-w-90",

				// "w-full",
				// "w-fit",
				// "h-full",

				// "grid",
				"grid",
				"gap-3 p-4 h-full min-h-0",
				"grid-cols-[auto_1fr] grid-rows-1",
				"grid-cols-[auto_1fr_auto] grid-rows-1",
				// "w-auto h-full",
				// "w-fit",
				"w-full",
				"h-fit",
				// "w-full h-full",
				"h-40",
				"h-30",
				"w-fit",

				"",

				""
			)}
		>
			{/* <div className={cn()}> */}
			{/* <div
					id="content-container"
					className={cn(
						"relative",
						"flex flex-row gap-3 p-4 h-full  w-full min-h-0",
						"grid gap-3 p-4 h-full w-full min-h-0",
						"",
						"grid-cols-[auto_1fr] grid-rows-1",
						// "grid-cols-[1fr_auto] grid-rows-1",
						"-1 -[auto_1fr]",
						"w-full h-full",
						"",
						""
					)}
				> */}
			{/* <div
				id="content-container"
				className={cn(
					"relative",
					// use grid only (not both flex+grid) and avoid forcing full width
					"grid",
					"gap-3 p-4 h-full min-h-0",
					"grid-cols-[auto_1fr] grid-rows-1",
					"w-auto h-full",
					"w-fit h-full",
					// "w-full h-full",
					"",
					""
				)}
			> */}
			{imgSrc ? (
				// TODO?: make this into component too?
				<Image
					src={imgSrc}
					alt={book.title?.main ?? "cover"}
					// width={64}
					// height={96}
					width={100}
					height={150}
					className={cn(
						"h-full",
						"w-full",
						"object-cover",
						"grid grid-rows-[auto_1fr_auto]",
						"justify-items-center",
						"content-start",
						// "max-w-30 ",
						// "min-h-40 ",
						"aspect-2/3",
						"rounded-xl",
						"rounded-2xl",
						"overflow-hidden",
						"col-start-1",

						"",
						"",
						""
					)}
				/>
			) : (
				<div
					className={cn(
						"grid grid-rows-[auto_1fr_auto]",
						"justify-items-center",
						"content-start",
						"bg-divider",
						"p-2 ",
						"gap-2 ",
						"max-w-30 ",
						"min-h-40 ",
						"aspect-2/3",
						"rounded-xl",
						"overflow-hidden",
						"col-start-1",
						// "w-full rounded-xl aspect-2/3 bg-divider",
						// "bg-accent-light",
						// "bg-accent-dark",
						// "bg-accent",
						// "grid grid-rows-[auto_1fr_auto] h-full",
						// "items-start",
						// "content-start",
						// "justify-items-center",
						//? NOTE: might have to set a max height too, incase you get really big ones.
						// "text-sm",
						// "rounded-xl",
						// "min-w-none",
						// "max-h-none",
						// "w-auto max-w-20 h-full object-contain self-start aspect-auto",
						// "h-full",
						// "w-full",
						// "object-cover",
						// "items-start",

						"",
						""
					)}
				>
					<Image
						id="logo"
						src="/gutendex_short_dark.png"
						alt="logo"
						width={200}
						height={20}
						className="h-fit flex  w-fit object-contain"
					/>
					<Image
						id="logo"
						src="/gutendex_long_dark.png"
						alt="logo"
						width={200}
						height={20}
						className="h-fit hidden   w-fit object-contain"
					/>
					<div
						id="cover-placeholder"
						className={cn(
							"row-start-2 h-full w-full rounded",
							"bg-divider",
							"p-5",
							"grid",
							"content-start",
							"justify-items-center",
							"text-center wrap-break-word",
							"",
							"",
							""
						)}
					>
						<span className="text-xl tracking-wide font-bold text-secondary hidden ">
							{title.main}
						</span>
						<span className="text-sm tracking-wide">
							{title.sub}
						</span>
					</div>
					<span className="text-secondary text-md leading-none tracking-widest hidden ">
						{authorsText}
					</span>
				</div>
			)}
			{/* {imgSrc ? (
				<Image
					src={imgSrc}
					alt={book.title?.main ?? "cover"}
					width={100}
					height={150}
					className={cn(
						"h-full",
						"w-auto",
						"object-cover",
						"grid grid-rows-[auto_1fr_auto]",
						"justify-items-center",
						"content-start",
						"max-w-30 ",
						"min-h-40 ",
						"aspect-2/3",
						"rounded-xl",
						"rounded-2xl",
						"overflow-hidden",
						"",
						"",
						""
					)}
				/>
			) : (
				<div
					className={cn(
						"grid grid-rows-[auto_1fr_auto]",
						"justify-items-center",
						"content-start",
						"bg-divider",
						"p-2 ",
						"gap-2 ",
						"max-w-30 ",
						"min-h-40 ",
						"aspect-2/3",
						"rounded-xl",
						"overflow-hidden",
						"",
						""
					)}
				>
					<Image
						id="logo"
						src="/gutendex_short_dark.png"
						alt="logo"
						width={200}
						height={20}
						className={cn(
							"h-fit",
							"flex",
							"w-fit",
							"object-contain",
							"",
							""
						)}
					/>
					<Image
						id="logo"
						src="/gutendex_long_dark.png"
						alt="logo"
						width={200}
						height={20}
						className={cn(
							"h-fit",
							"hidden",
							"w-fit",
							"object-contain",
							"",
							""
						)}
					/>
					<div
						id="cover-placeholder"
						className={cn(
							"row-start-2 h-full w-full rounded",
							"bg-divider",
							"p-5",
							"grid",
							"content-start",
							"justify-items-center",
							"text-center wrap-break-word",
							"",
							""
						)}
					>
						<span
							className={cn(
								"text-xl",
								"tracking-wide",
								"font-bold",
								"text-secondary",
								"hidden",
								"",
								""
							)}
						>
							{title.main}
						</span>
						<span
							className={cn("text-sm", "tracking-wide", "", "")}
						>
							{title.sub}
						</span>
					</div>
					<span
						className={cn(
							"text-secondary",
							"text-md",
							"leading-none",
							"tracking-widest",
							"hidden",
							"",
							""
						)}
					>
						{authorsText}
					</span>
				</div>
			)} */}

			{/* Favorite button overlay (always visible) */}
			<button
				// todo: make this into component
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					toggle();
				}}
				aria-label={ariaLabel}
				className={cn(
					// "absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full z-10",
					"col-start-3 row-start-1",
					// "top-3 right-3 w-8 h-8 items-center justify-center rounded-full z-10",
					// "fixed top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full z-10",
					// "static top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full z-10",

					// "dark:bg-zinc-800/40 dark:text-zinc-200",
					// "bg-white/10 ",
					// "bg-zinc-800/10 dark:text-zinc-200",
					// TODO: the fav icon gets cropped by parent
					// TODO: moved upon hover, fix scaling issue on hover
					"backdrop-blur-sm",
					"aspect-square",
					"h-7 rounded-full",
					"place-items-center",
					"focus:outline-none",
					"opacity-100",
					"cursor-pointer",
					"hover:scale-[1.05] transition-transform",
					"dark:text-secondary ",
					// "text-primary-inv",
					"text-secondary",
					// "bg-ultra-light",
					// "hover:bg-divider",
					"bg-edge-dark",
					"hover:bg-ultra-light",

					// "text-white",
					// "hover:bg-edge-dark",
					// "overflow-visible",
					"text:",
					"",
					""
				)}
			>
				{localFav ? (
					<FaHeart className="w-4 h-4 dark:text-accent-dark text-accent-dark overflow-visible" />
				) : (
					<FaRegHeart className="w-4 h-4 overflow-visible" />
				)}
			</button>

			<div
				id="text-container"
				className={cn(
					"col-start-2",
					"grid grid-rows-[auto_auto_1fr]",
					// "grid grid-rows-[1fr_1fr_auto]",
					// "grid grid-rows-[1fr_auto_auto]",
					"min-w-0",
					// "min-w-none",
					// "place-content-between",
					"w-full",
					"h-full",
					"",
					""
				)}
			>
				<h2
					className={cn(
						// "text-2xl font-extralight text-primary p-0 m-0",
						"text-2xl font-extralight text-primary p-0 m-0 leading-tight",
						"pr-10",
						"text-base",
						"h-fit",
						"w-full",
						"overflow-hidden",
						"truncate",
						"whitespace-nowrap",
						"",
						""
					)}
				>
					{title.main}
					{title.sub && (
						<span
							className={cn(
								"text-sm italic font-thin text-secondary ml-2 align-baseline leading-[0.75]",
								"h-fit",
								"w-fit",
								"",
								"",
								""
							)}
						>
							{title.sub}
						</span>
					)}
				</h2>
				<p
					className={cn(
						"text-sm italic font-thin mt-1 align-baseline ",
						"h-fit",
						"w-fit",
						// "mb-auto",
						"",
						"",
						""
					)}
				>
					<span className={cn("text-xs text-tertiary mr-1")}>
						By:
					</span>
					<span title={authorsText} className={cn()}>
						{authorsText}
					</span>
				</p>
				<div
					className={cn(
						// "justify-self-end",

						"mt-auto",
						"h-fit",
						"w-fit",

						"",
						""
					)}
				>
					<Rating
						ratingCount={download_count}
						upperDownloadCountLimit={upperLimit}
						mini={true}
					/>
				</div>
			</div>
			{/* </div> */}
			{/* </div> */}
		</Link>
	);
}
