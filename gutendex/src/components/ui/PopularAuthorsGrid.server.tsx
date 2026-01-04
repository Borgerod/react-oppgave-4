import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { IoMdDownload } from "react-icons/io";
import { fetchPopularAuthors } from "@/lib/fetchPopularAuthors";

type AuthorItem = { author: string; count: number; image?: string };

const personPlaceholder = (hex = "#9ca3af") =>
	`data:image/svg+xml;utf8,${encodeURIComponent(
		`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='96' height='96'><circle cx='12' cy='8' r='4' fill='${hex}'/><path d='M4 20c0-4 4-6 8-6s8 2 8 6' fill='${hex}'/></svg>`
	)}`;

export default async function PopularAuthorsGridServer() {
	const items = await fetchPopularAuthors();

	const cards = items.map((it: AuthorItem, idx: number) => {
		const href = `/store?search=${encodeURIComponent(it.author)}`;
		return (
			<Link href={href} key={idx} className={cn("block group", "", "")}>
				<div
					className={cn(
						"bg-container rounded-3xl shadow-xl",
						"grid grid-cols-2 grid-rows-2",
						"items-start justify-start justify-items-start",
						"p-4 text-center h-full w-full",
						"hover:scale-105 hover:bg-container-solid",
						"hover:filter hover:brightness-95 dark:hover:bg-container-raised",
						"transition-transform",
						"hover:dark:bg-accent-dark hover:bg-accent",
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
							"aspect-square rounded-full shadow-xl",
							"object-cover col-start-1 max-h-30",
							"",
							""
						)}
						priority={false}
					/>

					<div
						className={cn(
							"col-start-2 row-start-1",
							"self-start justify-self-end",
							"inline-flex items-stretch gap-0",
							"text-base sm:text-xl xl:text-base",
							"",
							""
						)}>
						<IoMdDownload className={cn("shrink-0", "", "")} />
						<span
							className={cn(
								"inline-flex items-center leading-none max-w-16 truncate",
								"",
								""
							)}>
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
							"text-left self-end items-baseline justify-start",
							"col-start-1 col-span-2 row-start-2 row-span-2",
							"whitespace-normal wrap-break-word text-wrap gap-1 flex-col",
							"",
							""
						)}>
						<span
							className={cn(
								"text-sm text-xl text-base sm:text-xl lg:text-sm",
								"min-w-0 flex-1 group-hover:dark:text-background",
								"",
								""
							)}>
							{(it.author.split(",")[0] || "").trim()},
						</span>
						<span
							className={cn(
								"text-secondary text-xs lg:text-xs text-sm",
								"min-w-0 flex-1 group-hover:dark:text-background",
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

	return (
		<div>
			<h3 className={cn("text-2xl font-medium mb-4", "", "")}>
				Popular authors
			</h3>
			<div
				className={cn(
					"grid gap-5 justify-center w-auto mt-4",
					"grid-rows-3 grid-cols-3",
					"md:grid-rows-4 md:grid-cols-2",
					"lg:grid-rows-3 lg:grid-cols-3",
					"md:text-xl lg:text-base",
					"",
					""
				)}>
				{cards}
			</div>
		</div>
	);
}
