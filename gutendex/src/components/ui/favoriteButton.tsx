"use client";
import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { cn } from "@/utils/cn";
import type { Book } from "@/types";
import { useFavorite } from "@/components/store/cardSharedUtils";

interface FavoriteButtonProps {
	book: Book;
	isFavorite?: boolean;
	onToggleFavorite?: (book: Book) => void;
	compact?: boolean; // render icon-only for tight spots
	className?: string;
}

export default function FavoriteButton({
	book,
	isFavorite,
	onToggleFavorite,
	compact = false,
	className = "",
}: FavoriteButtonProps) {
	const { localFav, toggle, ariaLabel } = useFavorite(
		book,
		isFavorite,
		onToggleFavorite
	);

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		toggle();
	};
	const iconSize = cn(
		//
		// "w-4",
		// "h-4",
		// "size-full",
		"size-fit",
		"aspect-square",
		"p-2",
		"overflow-visible",

		"scale-101",
		"hover:scale-105",
		// "hover:bg-",
		"",
		""
	);

	// compact: return just the icon element so callers can wrap/styled externally
	// if (compact) {
	// 	return localFav ? (
	// 		<FaHeart
	// 			onClick={handleClick}
	// 			aria-label={ariaLabel}
	// 			// className={cn(className, "text-accent-dark")}
	// 			className={cn(className, "text-primary-inv")}
	// 		/>
	// 	) : (
	// 		<FaRegHeart
	// 			onClick={handleClick}
	// 			aria-label={ariaLabel}
	// 			className={cn("", className)}
	// 		/>
	// 	);
	// }

	// default: full overlay button styling (used in ProductCard)
	return (
		<button
			onClick={handleClick}
			aria-label={ariaLabel}
			className={cn(
				"absolute",
				"top-3",
				"right-3",
				// "top-4",
				// "right-4",
				// "top-5",
				// "right-5",
				"w-8",
				"h-8",
				// "p-2",
				"flex",
				"items-center",
				"justify-center",
				"rounded-full",
				"z-10",

				"bg-white/10 text-white",
				"dark:bg-zinc-800/40 dark:text-zinc-200",
				"bg-zinc-800/10 dark:text-zinc-200",
				"hover:dark:bg-zinc-900/60 hover:dark:text-zinc-300",
				"hover:bg-zinc-900/30 hover:dark:text-zinc-300",
				// "border",
				"border-edge",
				// "border-edge-dark",
				// "border-edge-highlight",
				// "border-t-edge-highlight",
				// "border-t-edge",
				// "border-l-edge-highlight",
				// "border-b-edge-dark",
				// "border-r-edge-dark",
				"backdrop-blur-sm",
				"focus:outline-none",
				"opacity-100",
				"cursor-pointer",
				// "z-30",
				"overflow-visible",
				// "place-items-center",
				// "justify-items-center",
				// "items-center",
				// "justify-center",
				// "content-center",
				"hover:scale-105",
				className,
				"",
				""
			)}
		>
			{localFav ? (
				<FaHeart
					className={cn(
						iconSize,
						// "text-accent-dark",
						"text-white/90",
						"dark:text-zinc-200/90",
						"",
						""
					)}
				/>
			) : (
				<FaRegHeart
					className={cn(
						iconSize,
						"text-white/90",
						"dark:text-zinc-200/90",
						"",
						""
					)}
				/>
			)}
		</button>
	);
}
