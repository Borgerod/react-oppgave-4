import React from "react";
import FavoriteButton from "@/components/ui/favoriteButton";
import HighLightCard from "@/components/ui/highLightCard";
import HighlightCardSkeleton from "@/components/ui/HighlightCardSkeleton";
import { cn } from "@/utils/cn";
import {
	compressedBtnClass,
	textBtnClass,
	secondaryBtnClass,
} from "@/components/buttonClasses";
import Link from "next/link";
import { Book } from "@/types";
import { parseTitle } from "@/utils/title";
interface HighlightProps {
	data: Book[] | null;
	loading: boolean;
	title: string;
	tagLabel?: string | React.ReactNode;
	button?: { text: string; href: string }; // should really be children
	grid?: boolean;
	onToggleFavorite?: (book: Book) => void;
	favoriteIds?: number[];
}
// button classes are centralized in src/components/buttonClasses.ts
//? prob need to get an assign a state to a specific amount of books by popular sort.
export default function highlights({
	data,
	loading,
	title,
	tagLabel,
	button,
	grid,
	onToggleFavorite,
	favoriteIds,
}: HighlightProps) {
	return (
		<div
			id="highlight container"
			className={cn("flex flex-col", "w-full", "h-fit", "", "")}>
			<div
				id="header-row"
				className={cn(
					"justify-between w-full ",
					"h-fit",
					"flex flex-row",
					"",
					""
				)}>
				<h3 className="text-2xl font-medium mb-4">{title}</h3>
				{button ? (
					<Link
						href={button.href ? button.href : ""}
						className={cn(
							`${secondaryBtnClass}`,
							`${compressedBtnClass}`,
							`${textBtnClass}`,
							"",
							""
						)}>
						{button.text}
					</Link>
				) : (
					<></>
				)}
			</div>
			<div
				id="content-row highlight-row hightlight-grid"
				className={cn(
					"justify-items-center",
					"sm:justify-items-start",
					"sm:justify-items-center",
					"sm:items-center",
					"",
					"",
					grid
						? "grid lg:grid-cols-3 gap-5 w-full  sm:w-full grid-cols-2"
						: "grid gap-5 w-full sm:w-fit md:w-full grid-cols-2 sm:grid-cols-4  sm:grid-rows-1   md:grid-cols-2 lg:grid-cols-4  grid-rows-2 md:grid-rows-1"
				)}>
				{loading ? (
					Array.from({ length: grid ? 6 : 4 }).map((_, i) => (
						<HighlightCardSkeleton
							key={`skeleton-${i}`}
							button={!!button}
						/>
					))
				) : !data || data.length === 0 ? (
					<div
						className={cn(
							"flex flex-col items-center justify-center w-full py-8",
							"text-lg text-gray-500",
							""
						)}>
						No favorites
					</div>
				) : (
					data.map((book: Book, index: number) => {
						const formats = book.formats as
							| Record<string, string>
							| undefined;
						const image =
							formats?.["image/jpeg"] ||
							formats?.["image/jpg"] ||
							undefined;
						const authorNames = (book.authors || [])
							.map((a) => a?.name)
							.filter((n): n is string => !!n);
						const authors =
							authorNames.length === 0
								? undefined
								: authorNames.length === 1
								? authorNames[0]
								: `${authorNames.slice(0, -1).join("; ")} & ${
										authorNames[authorNames.length - 1]
								  }`;
						const href = `/book-profile/${book.id}/${String(
							book.title
						)
							.trim()
							.toLowerCase()
							.normalize("NFKD")
							.replace(/[\u0300-\u036f]/g, "")
							.replace(/[^\w\s-]/g, "")
							.replace(/\s+/g, "-")
							.replace(/-+/g, "-")}`;
						const { main, sub } = parseTitle(book.title.main);
						return (
							<HighLightCard
								key={`${book.id}-${index}`}
								title={
									book.title.main
										? main
										: book.title.toString()
								}
								subtitle={sub ? sub : ""}
								authors={authors}
								badge={
									// TODO this should be simplified, need rework
									tagLabel
										? (() => {
												if (
													typeof tagLabel ===
														"string" ||
													typeof tagLabel === "number"
												) {
													return {
														text: tagLabel,
														variant: "pink",
													};
												}
												if (onToggleFavorite) {
													const isFav = Boolean(
														favoriteIds &&
															favoriteIds.includes(
																book.id
															)
													);
													return {
														text: (
															<FavoriteButton
																book={book}
																isFavorite={
																	isFav
																}
																onToggleFavorite={
																	onToggleFavorite
																}
																compact
															/>
														),
														variant: "orange",
													};
												}
												return {
													text: tagLabel as React.ReactNode,
													variant: "indigo",
												};
										  })()
										: undefined
								}
								image={image}
								href={href}
							/>
						);
					})
				)}
			</div>
		</div>
	);
}
