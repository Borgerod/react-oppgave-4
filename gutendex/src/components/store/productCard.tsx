"use client";
import { cn } from "@/utils/cn";
import type { Book } from "@/types";
import Image from "next/image";
import Rating from "@/components/store/rating";
import Link from "next/link";
import { useUpperDownloadCount } from "@/providers/providers";
import { Tag } from "@/components/filters/tag";

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
			.normalize("NFKD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/[^\w\s-]/g, "")
			.replace(/\s+/g, "-")
			.replace(/-+/g, "-");
	}
	return (
		<Link
			href={`/book-profile/${book.id}/${formatLinkVars(book.title)}`}
			className={cn(
				"bg-container border-edge border rounded-3xl",
				`${
					mini
						? "inline-block flex-none w-80 h-fit"
						: "block h-full w-lg sm:w-2xs"
				}`,
				"",
				"hover:bg-container-raised hover:scale-101",
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
						}`,
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
								"h-full",
								"w-30 ",
								"",
								`${
									mini
										? "h-30 w-20 object-cover"
										: "object-cover sm:h-full sm:w-full sm:object-cover"
								}`
							)}
							style={{
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
								`${mini ? "flex flex-col gap-2" : ""}`,
								"sm: flex-col",
								"",
								""
							)}>
							<h2
								className={cn(
									"text-2xl font-extralight text-primary p-0 m-0 ",
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
								"flex flex-row justify-between",
								"flex sm:flex-col sm:gap-4",
								`${mini ? "hidden" : ""}`,
								""
							)}>
							<div
								className={cn(
									"flex flex-col",
									"h-full",
									`${mini ? "hidden" : ""}`,
									""
								)}>
								<div
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
								<p className="flex flex-row gap-1 text-nowrap flex-wrap">
									{(book.bookshelves || []).map(
										(shelf: string, index: number) => {
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
													key={`${shelf}-${index}`}
													id={`${book.id}-${shelf}-${index}`}
													item={category}
													checked={false}
													onToggle={() => {}}
												/>
											);
										}
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
									"hover:border-accent-dark hover:text-container-solid hover:bg-accent-dark",
									"border dark:border-accent dark:ext-accent",
									"hover:dark:border-accent-dark hover:dark:text-container-solid hover:dark:bg-accent-dark",
									"h-10 text-nowrap self-",
									"sm:h-full",
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
