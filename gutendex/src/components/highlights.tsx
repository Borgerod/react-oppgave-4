//tsrfc
import React, { Component } from "react";
import ProductCard from "./store/productCard";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { BooksResponse, Book } from "@/types";
import CardSkeleton from "./store/cardSkeleton";
import HighLightCard from "@/components/highLightCard";

// import textBtnClass from "@/components/layout/header";
import { cn } from "@/utils/cn";
import {
	iconBtnClass,
	compressedBtnClass,
	textBtnClass,
	primaryBtnClass,
	secondaryBtnClass,
} from "@/components/buttonClasses";
import Link from "next/link";
interface HighlightProps {
	// data: BooksResponse | null;
	data: Book[] | null;
	loading: boolean;
	title: string;
	tagLabel?: string | React.ReactNode;
	// button?: string; // should really be children
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
			className={cn(
				// `${grid ? "grid grid-cols-3 grid-rows-2" : }`,
				"flex flex-col",
				"justify-items-center w-full justify-self-center gap-2",
				"h-fit",
				"",
				""
			)}
		>
			<div
				id="popular-header"
				className={cn(
					// `${
					// 	grid ? "grid grid-cols-3 grid-rows-2" : "flex flex-row"
					// }`,
					// "justify-items-center w-full justify-self-center gap-2",
					"justify-between w-full h-fit",
					"flex flex-row",
					"",
					""
				)}
				// className="flex flex-row justify-between w-full"
			>
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
						)}
					>
						{button.text}
					</Link>
				) : (
					<></>
				)}
			</div>
			<div
				id="highlight-row"
				className={cn(
					grid
						? "grid grid-cols-3 gap-2 w-full"
						: "flex flex-row gap-2 w-full "
				)}
			>
				{loading
					? // render skeleton highlight cards while loading
					  Array.from({ length: grid ? 6 : 4 }).map((_, i) => (
							<div
								key={`skeleton-${i}`}
								className="block w-full max-w-[220px] animate-pulse"
							>
								<div
									className={cn(
										"relative overflow-hidden rounded-2xl",
										"bg-white/80 dark:bg-zinc-900/80",
										"backdrop-blur-xl",
										"border border-zinc-200/50 dark:border-zinc-800/50",
										"shadow-xs",
										"transition-all duration-300",
										"hover:shadow-md",
										"shadow-lg",
										"hover:border-zinc-300/50 dark:hover:border-zinc-700/50",
										"p-0"
									)}
								>
									<div className="relative h-44 overflow-hidden bg-foreground/10" />

									<div className="absolute top-3 right-3">
										<span className="w-7 h-7 rounded-full bg-foreground/10" />
									</div>

									<div className="absolute bottom-0 left-0 right-0 p-3">
										<div className="flex items-center justify-between gap-3">
											<div className="space-y-1.5 min-w-0">
												<div className="h-4 w-36 rounded-full bg-foreground/10" />
												<div className="h-3 w-28 rounded-full bg-foreground/10" />
											</div>
											<div
												className={cn(
													"p-1.5 rounded-full",
													"bg-white/10 dark:bg-zinc-800/50",
													"backdrop-blur-md",
													"transition-colors duration-300",
													"cursor-pointer",
													"flex-shrink-0"
												)}
											>
												<span className="w-3 h-3 block bg-foreground/10 rounded" />
											</div>
										</div>
									</div>
								</div>
							</div>
					  ))
					: data?.map((book: Book, index: number) => {
							const formats = book.formats as
								| Record<string, string>
								| undefined;
							const image =
								formats?.["image/jpeg"] ||
								formats?.["image/jpg"] ||
								undefined;

							const authorNames = (book.authors || [])
								.map((a) => a?.name)
								.filter(
									(n): n is string =>
										typeof n === "string" && n.length > 0
								);
							const subtitle =
								authorNames.length === 0
									? undefined
									: authorNames.length === 1
									? authorNames[0]
									: `${authorNames
											.slice(0, -1)
											.join("; ")} & ${
											authorNames[authorNames.length - 1]
									  }`;

							function formatLinkVars(prop: string) {
								return prop
									.trim()
									.toLowerCase()
									.normalize("NFKD")
									.replace(/[\u0300-\u036f]/g, "")
									.replace(/[^\w\s-]/g, "")
									.replace(/\s+/g, "-")
									.replace(/-+/g, "-");
							}

							const href = `/book-profile/${
								book.id
							}/${formatLinkVars(book.title)}`;

							return (
								<HighLightCard
									key={`${book.id}-${index}`}
									title={book.title}
									subtitle={subtitle}
									badge={
										tagLabel
											? (() => {
													// If tagLabel is a string/number, show it as the badge text
													if (
														typeof tagLabel ===
															"string" ||
														typeof tagLabel ===
															"number"
													) {
														return {
															text: tagLabel,
															variant: "pink",
														};
													}

													// If a favorite toggle handler is provided, render a clickable heart
													if (onToggleFavorite) {
														const isFav = Boolean(
															favoriteIds &&
																favoriteIds.includes(
																	book.id
																)
														);
														const handleClick = (
															e: React.MouseEvent
														) => {
															e.preventDefault();
															e.stopPropagation();
															onToggleFavorite &&
																onToggleFavorite(
																	book
																);
														};
														const icon = isFav ? (
															<FaHeart
																onClick={
																	handleClick
																}
															/>
														) : (
															<FaRegHeart
																onClick={
																	handleClick
																}
															/>
														);
														return {
															text: icon,
															variant: "orange",
														};
													}

													// Fallback: use the provided React node as badge content
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
					  })}
				{/* {data?.map(
					(book: Book, index: number) => (
						<HighLightCard key={`${book.id}-${index}`} />
					)
				)} */}
				{/* {loading || !data || !data.results
					? Array.from({ length: 4 }).map(
							(_, index) =>
								// <HighLightCard key={index} />
								"hallo"
					  )
					: data.results.map(
							(book: Book, index: number) =>
								// <HighLightCard key={`${book.id}-${index}`} />
								"hallo"
					  )} */}
			</div>
			{/* <div
				id="highlight-row"
				className="grid grid-cols-3 grid-rows-2 gap-2"
			>

				{loading || !data || !data.results
					? Array.from({ length: 3 }).map((_, index) => (
							<HighLightCard key={index} />
					  ))
					: data.results.map((book: Book, index: number) => (
							<HighLightCard key={`${book.id}-${index}`} />
					  ))}
				{loading || !data || !data.results
					? Array.from({ length: 3 }).map((_, index) => (
							// <CardSkeleton key={index} mini />
							<HighLightCard
								// title={`CardNo.${index}`}
								// subtitle={"skeleton"}
								title={undefined}
								subtitle={undefined}
								// image={"gutendexpublicgutendex_long_light.png"}
								image={undefined}
								// badge={text={""}, variant="pink"}
								// badge={("badge", "pink")}
								badge={undefined}
								href={undefined}
							/>
					  ))
					: data.results.map((book: Book, index: number) => (
							<></>
							// <ProductCard
							// 	mini
							// 	key={`${book.id}-${index}`}
							// 	book={book}
							// 	// upperDownloadCountLimit={
							// 	// 	upperDownloadCountLimit
							// 	// }
							// 	index={index}
							// />
					  ))}
			</div> */}
		</div>
	);
}
