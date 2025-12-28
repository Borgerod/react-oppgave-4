// // CARD BACKUP

// "use client";
// import React from "react";
// import { cn } from "@/utils/cn";
// import type { Book, Title } from "@/types";
// import Image from "next/image";
// import Rating from "@/components/store/rating";
// import Link from "next/link";
// import { useUpperDownloadCount } from "@/providers/providers";
// import { Tag } from "@/components/filters/tag";
// import { FaHeart } from "react-icons/fa6";
// import { FaRegHeart } from "react-icons/fa6";

// type Props = {
// 	book: Book;
// 	index?: number;
// 	upperDownloadCountLimit?: number;
// 	mini?: boolean;
// 	isFavorite?: boolean;
// 	const title: Title = book.title;
// 	const contextUpper = useUpperDownloadCount();
// 	const formats = book.formats as Record<string, string> | undefined;
// 	const imgSrc = formats?.["image/jpeg"] || formats?.["image/jpg"] || "";

// 	// prefer explicit prop, otherwise fall back to context value, then 1
// 	const upperLimit = upperDownloadCountLimit ?? contextUpper ?? 1;

// 	const download_count = book.download_count;
// 	const href = `/book-profile/${book.id}/${formatLinkVars(book.title)}`;
// 	// prepare authors as a single formatted string (easier markup, avoids extra spans)
// 	const authorNames = (book.authors || [])
// 		.map((a) => a?.name)
// 		.filter((n): n is string => typeof n === "string" && n.length > 0);
// 	const authorsText =
// 		authorNames.length === 0
// 			? "unknown"
// 			: authorNames.length === 1
// 			? authorNames[0]
// 			: `${authorNames.slice(0, -1).join("; ")} & ${
// 					authorNames[authorNames.length - 1]
// 			  }`;

// 	// local favorite state fallback: if parent doesn't provide handler/prop,
// 	// manage favorites in localStorage so heart is always visible and usable.
// 	const [localFav, setLocalFav] = React.useState<boolean>(
// 		Boolean(isFavorite)
// 	);

// 	React.useEffect(() => {
// 		// prefer explicit prop when provided
// 		if (typeof isFavorite === "boolean") {
// 			setLocalFav(isFavorite);
// 			return;
// 		}
// 		try {
// 							src={imgSrc}
// 							alt={title.main ?? "cover"}
// 				const parsed = JSON.parse(raw) as Book[];
// 				setLocalFav(parsed.some((b) => b.id === book.id));
// 			} else {
// 				setLocalFav(false);
// 			}
// 		} catch (e) {
// 			setLocalFav(false);
// 		}
// 	}, [book.id, isFavorite]);

// 	function handleToggle(bookParam: Book) {
// 		if (onToggleFavorite) {
// 			onToggleFavorite(bookParam);
// 			return;
// 		}
// 		try {
// 			const raw = localStorage.getItem("favoriteBooks");
// 			const arr: Book[] = raw ? JSON.parse(raw) : [];
// 			const idx = arr.findIndex((b) => b.id === bookParam.id);
// 			let updated: Book[];
// 			if (idx >= 0) {
// 				updated = arr.filter((b) => b.id !== bookParam.id);
// 			} else {
// 				updated = [...arr, bookParam];
// 			}
// 			localStorage.setItem("favoriteBooks", JSON.stringify(updated));
// 			setLocalFav(updated.some((b) => b.id === bookParam.id));
// 		} catch (e) {
// 			// ignore localStorage errors
// 		}
// 	}

// 	function formatLinkVars(prop: string) {
// 		return prop
// 			.trim()
// 			.toLowerCase()
// 			.normalize("NFKD")
// 			.replace(/[\u0300-\u036f]/g, "")
// 			.replace(/[^\w\s-]/g, "")
// 			.replace(/\s+/g, "-")
// 			.replace(/-+/g, "-");
// 	}

// 	// derive title object with `main` and optional `sub`
// 	const titleRaw = book.title ?? "";
// 	const titleParts = titleRaw
// 		.split(/[:\-–—]/)
// 		.map((p) => p.trim())
// 		.filter(Boolean);
// 	const title: Title = {
// 		main: titleParts.length > 0 ? titleParts[0] : titleRaw || "Untitled",
// 		sub: titleParts.length > 1 ? titleParts.slice(1).join(" - ") : undefined,
// 	};

// 	return (
// 		<Link
// 			href={`/book-profile/${book.id}/${formatLinkVars(book.title)}`}
// 			className={cn(
// 				"bg-container border-edge border rounded-3xl",
// 				`${
// 					mini
// 						? // ? "inline-block sm:flex-none sm:w-80 w-full h-fit min-w-0"
// 						  "inline-block sm:flex-none sm:w-80 w-full h-fit min-w-0"
// 						: "block h-full w-full sm:w-2xs min-w-0"
// 				}`,
// 				"hover:bg-container-raised hover:scale-101",
// 				"shadow-xl",
// 				"",
// 				""
// 			)}
// 		>
// 			<div
// 				className={cn(
// 					// "overflow-hidden rounded-3xl",
// 					`${mini ? "" : "h-full"}`
// 				)}
// 			>
// 				<div
// 					id="content-container"
// 					className={cn(
// 						"relative",
// 						`${
// 							mini
// 								? "flex flex-row gap-3 items-start p-4 h-full"
// 								: "flex flex-row gap-3 p-4 h-full sm:flex-col w-full"
// 						}`,
// 						"",
// 						""
// 					)}
// 				>
// 					{imgSrc ? (
// 						<Image
// 							src={imgSrc}
// 							alt={book.title ?? "cover"}
// 							width={220}
// 							height={330}
// 							className={cn(
// 								"rounded-xl aspect-2/3",
// 								"h-full",
// 								"min-w-0",
// 								"w-30",
// 								"",
// 								`${
// 									mini
// 										? // ? "h-30 w-20 object-cover"
// 										  "h-full object-cover"
// 										: "object-cover sm:h-full sm:w-full sm:object-cover min-w-0"
// 								}`
// 							)}
// 							style={{
// 								maxWidth: "100%",
// 							}}
// 						/>
// 					) : (
// 						<div
// 							className={cn(
// 								`${
// 									mini
// 										? "w-full rounded-xl aspect-2/3 bg-gray-100"
// 										: "w-full rounded-xl aspect-2/3 bg-gray-100"
// 								}`
// 							)}
// 						/>
// 					)}

// 					{/* Favorite button overlay (always visible) */}
// 					<button
// 						onClick={(e) => {
// 							e.preventDefault();
// 							e.stopPropagation();
// 							handleToggle(book);
// 						}}
// 						aria-label={
// 							(
// 								typeof isFavorite === "boolean"
// 									? isFavorite
// 									: localFav
// 							)
// 								? "Remove favorite"
// 								: "Add favorite"
// 						}
// 						className={cn(
// 							"absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full z-10",
// 							"bg-white/10 text-white",
// 							"dark:bg-transparent dark:text-zinc-200",
// 							"backdrop-blur-sm",
// 							"focus:outline-none",
// 							"opacity-100",
// 							"cursor-pointer"
// 						)}
// 					>
// 						{(
// 							typeof isFavorite === "boolean"
// 								? isFavorite
// 								: localFav
// 						) ? (
// 							<FaHeart className="w-4 h-4 text-accent-dark" />
// 						) : (
// 							<FaRegHeart className="w-4 h-4 text-white/90 dark:text-zinc-200/90" />
// 						)}
// 					</button>

// 					<div
// 						className={cn(
// 							"flex flex-col",
// 							"flex justify-between gap-4 h-full sm:flex-col w-full",
// 							"min-w-0",
// 							"",
// 							"",
// 							""
// 						)}
// 					>
// 						<div
// 							className={cn(
// 								`${
// 									mini
// 										? "flex flex-col gap-2 h-fit min-w-80 max-w-200 text-wrap pr-22"
// 										: // ? "flex flex-col gap-2 h-fit min-w-80 max-w-200 text-wrap pr-12"
// 										  // ? "flex flex-col gap-2"

// 										  ""
// 								}`,
// 								"sm: flex-col",
// 								"",
// 								""
// 							)}
// 						>
// 							<h2
// 								className={cn(
// 									"text-2xl font-extralight text-primary p-0 m-0",
// 									"text-2xl font-extralight text-primary p-0 m-0 leading-tight",
// 									"whitespace-normal break-words pr-10",
// 									`${
// 										mini ? "text-xs leading-tight pr-0" : ""
// 										// mini ? "text-xs leading-tight pr-10" : ""
// 									}`
// 								)}
// 							>
// 								{title.main}
// 								{title.sub && (
// 									<span
// 										className={cn(
// 											"text-sm italic font-thin text-secondary ml-2 align-baseline leading-[0.75]",
// 											`${mini ? "text-xs ml-1" : ""}`
// 										)}
// 									>
// 										{title.sub}
// 									</span>
// 								)}
// 							</h2>
// 							<p
// 								className={cn(
// 									"text-sm italic font-thin mt-1 align-baseline ",
// 									`${mini ? "text-xs" : ""}`
// 								)}
// 							>
// 								<span
// 									className={cn("text-xs text-tertiary mr-1")}
// 								>
// 									By:
// 								</span>
// 								<span
// 									title={authorsText}
// 									className={cn(
// 										`${mini ? "break-words max-w-40" : ""}`
// 									)}
// 								>
// 									{authorsText}
// 								</span>
// 							</p>
// 							<div
// 								className={cn(
// 									"mt-auto",
// 									`${mini ? "visible" : "hidden"}`,
// 									"",
// 									""
// 								)}
// 							>
// 								<Rating
// 									ratingCount={download_count}
// 									upperDownloadCountLimit={upperLimit}
// 									mini={mini}
// 								/>
// 							</div>
// 						</div>

// 						<div
// 							id="ratingtags-readmore-row"
// 							className={cn(
// 								"flex flex-row justify-between",
// 								"flex sm:flex-col sm:gap-4",
// 								`${mini ? "hidden" : ""}`,
// 								"",
// 								""
// 							)}
// 						>
// 							<div
// 								id="raintg-tags-column"
// 								className={cn(
// 									"flex flex-col",
// 									"h-full",
// 									`${mini ? "hidden" : ""}`,
// 									"",
// 									""
// 								)}
// 							>
// 								<div
// 									// todo
// 									id="rating-container"
// 									className={cn(
// 										`${mini ? "visible" : ""}`,

// 										"mt-auto",
// 										"",
// 										""
// 									)}
// 								>
// 									<Rating
// 										ratingCount={download_count}
// 										upperDownloadCountLimit={upperLimit}
// 										mini={mini}
// 									/>
// 								</div>
// 								<p className="flex flex-row gap-1 text-nowrap flex-wrap">
// 									{(book.bookshelves || []).map(
// 										(shelf: string, index: number) => {
// 											if (
// 												!shelf.includes("Category:") ||
// 												shelf.includes("Literature")
// 											)
// 												return null;
// 											const category = (
// 												shelf.split("Category:")[1] ||
// 												""
// 											).trim();
// 											const topic =
// 												encodeURIComponent(category);
// 											return (
// 												<Tag
// 													url={`/store?topic=${topic}`}
// 													key={`${shelf}-${index}`}
// 													id={`${book.id}-${shelf}-${index}`}
// 													item={category}
// 													checked={false}
// 													onToggle={() => {}}
// 												/>
// 											);
// 										}
// 									)}
// 								</p>
// 							</div>
// 							<button
// 								className={cn(
// 									"rounded-full",
// 									"w-fit p-1 px-3",
// 									"border border-accent-dark text-accent-dark",
// 									"hover:border-accent-dark hover:text-container-solid hover:bg-accent-dark",
// 									"border dark:border-accent dark:ext-accent",
// 									"hover:dark:border-accent-dark hover:dark:text-container-solid hover:dark:bg-accent-dark",
// 									"h-10 text-nowrap self-end",
// 									"sm:h-full",
// 									`${mini ? "hidden" : ""}`,
// 									"",
// 									""
// 								)}
// 							>
// 								Read more
// 							</button>
// 						</div>
// 						{/* TODO: check the versions maybe someone are kindle frieldy or not */}
// 						{/* TODO: would be funny to actually add prices and make the tutor pay to review the rest. */}
// 					</div>
// 				</div>
// 			</div>
// 		</Link>
// 	);
// }
