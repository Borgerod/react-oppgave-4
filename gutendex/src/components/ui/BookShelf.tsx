import { cn } from "@/utils/cn";
// import React from "react";
import Link from "next/link";

function buildStoreUrl(topic: string) {
	const params = new URLSearchParams();
	params.append("topic", topic);
	return `/store?${params.toString()}`;
}

type BookShelfProps = Record<string, never>;

export default function BookShelf({}: BookShelfProps) {
	return (
		<div
			className={cn(
				// "bg-amber-100",
				// MOBILE
				"py-0",
				"relative",
				// "right-15",

				"scale-60",

				"place-self-center",
				"right-0",
				"left-0",
				"scale-60",
				"flex",
				"h-full",

				"top-5",
				"left-3.5",
				"mt-0",
				"py-0",
				"overflow-visible",
				// "bg-amber-300",

				// MD
				// "md:justify-start",
				// "md:justify-items-start",
				// "md:place-self-start",
				// "md:place-self-center-safe",
				// "md:place-self-start",
				// "items-end md:justify-start justify-start",

				// "md:relative",
				// "md:w-fit",

				// "md:w-full",
				"md:right-0",
				"md:left-0",
				"md:place-self-center",
				"md:scale-60",
				"md:flex",
				"md:h-full",
				// "md:h-70",
				// "md:right-15",
				// "md:top-5",
				// "md:mt-0",

				// LG
				"lg:mt-10",
				"lg:scale-90",
				// "lg:right-22",
				// "lg:right-22",
				"lg:left-10",
				// "top-5",
				// "lg:scale-90",
				// "h-100",
				// "h-100",

				"",
				"",
				"",
				""
			)}>
			<div
				className={cn(
					// "bg-amber-100",
					// "w-full",
					// "py-10",
					// "relative",
					// "left-30",

					// "md:relative",
					"md:py-0",
					"md:left-0",
					"md:left-0",

					"lg:w-full",
					"lg:py-10",
					"lg:relative",
					// "lg:left-30",
					"lg:left-0",

					"",
					""
				)}>
				<div
					className={cn(
						"relative flex flex-row",
						"h-full w-full gap-1",
						"items-end justify-start",
						"",
						""
					)}>
					<div
						className={cn(
							// "flex flex-col gap-1 h-full",

							"absolute ",
							// "relative",
							"-left-41 ",
							"bottom-30",
							" z-10",
							"rotate-290 origin-bottom",
							"",
							""
						)}>
						<Link
							href={buildStoreUrl("Children & Young Adult")}
							className={cn(
								"aspect-auto w-90 h-20 rounded-3xl shadow",
								"place-self-end flex items-center justify-center",
								"text-center text-2xl bg-amber-700/50 dark:bg-amber-200/30",
								"font-bold hover:not-focus:scale-105 hover:bg-accent transition-transform transform-gpu",
								"hover:dark:bg-accent-dark/70",
								//"hover:dark:text-background",
								"opacity-100",
								"brightness-100",
								"bg-container-raised dark:bg-container-raised",
								// "hover:text-2xl hover:font-bold cursor-pointer",
								"bg-neutral-200/40",
								"",
								""
							)}
							aria-label="Browse Children & Young Adult">
							Children & Young Adult
						</Link>
					</div>
					<div
						className={cn(
							"flex flex-col gap-1 h-full",
							"relative bottom-10",
							"rotate-90",
							"justify-self-end",
							"place-self-end",
							"",
							""
						)}>
						<Link
							href={buildStoreUrl("Horror")}
							className={cn(
								"aspect-auto w-100 h-20 rounded-3xl shadow",
								"place-self-end flex items-center justify-center",
								"text-center text-2xl bg-red-800/70 dark:bg-red-300/30",
								"font-bold hover:not-focus:scale-105 hover:bg-accent transition-transform transform-gpu",
								"hover:dark:bg-accent-dark/70",
								//"hover:dark:text-background",
								"opacity-100",
								"brightness-100",
								"bg-container-raised dark:bg-container-raised",
								// "hover:text-2xl hover:font-bold cursor-pointer",
								"bg-neutral-300/40",
								"",
								""
							)}
							aria-label="Browse Horror">
							<span
								className={cn(
									// "hover:scale-100 hover:bg-accent transition-transform",

									"",
									""
								)}>
								Horror
							</span>
						</Link>
						<Link
							href={buildStoreUrl("Humour")}
							className={cn(
								"aspect-auto w-60 h-20 rounded-3xl shadow",
								"place-self-end flex items-center justify-center",
								"text-center text-2xl bg-red-800/70 dark:bg-red-300/30",
								"font-bold hover:not-focus:scale-105 hover:bg-accent transition-transform transform-gpu",
								"hover:dark:bg-accent-dark/70",
								//"hover:dark:text-background",
								"opacity-100",
								"brightness-100",
								"bg-container-raised dark:bg-container-raised",
								// "hover:text-2xl hover:font-bold cursor-pointer",
								"bg-neutral-400/40",
								"",
								""
							)}
							aria-label="Browse Humour">
							Humour
						</Link>
						<Link
							href={buildStoreUrl("Science Fiction")}
							className={cn(
								"aspect-auto w-90 h-20 rounded-3xl shadow",
								"place-self-end flex items-center justify-center",
								"text-center text-2xl bg-slate-800/70 dark:bg-slate-400/30",
								"font-bold hover:not-focus:scale-105 hover:bg-accent transition-transform transform-gpu",
								"hover:dark:bg-accent-dark/70",
								//"hover:dark:text-background",
								"opacity-100",
								"brightness-100",
								"bg-container-raised dark:bg-container-raised",
								// "hover:text-2xl hover:font-bold cursor-pointer",
								"bg-neutral-300/30",
								"",
								""
							)}
							aria-label="Browse Science Fiction">
							Science Fiction
						</Link>
					</div>
					<div
						className={cn(
							"relative right-31 bottom-31 z-0",
							"rotate-290 origin-bottom",
							"",
							""
						)}>
						<Link
							href={buildStoreUrl("Adventure")}
							className={cn(
								"aspect-auto w-90 h-20 rounded-3xl shadow",
								"place-self-end flex items-center justify-center",
								"text-center text-2xl bg-emerald-950/50 dark:bg-emerald-200/30",
								"font-bold hover:not-focus:scale-105 hover:bg-accent transition-transform transform-gpu",
								"hover:dark:bg-accent-dark/70",
								//"hover:dark:text-background",
								"opacity-100",
								"brightness-100",
								"bg-container-raised dark:bg-container-raised",
								// "hover:text-2xl hover:font-bold cursor-pointer",
								"bg-neutral-200/40",
								"",
								""
							)}
							aria-label="Browse Adventure">
							Adventure
						</Link>
					</div>
					{/* FROM hover:bg-accent/70 hover:dark:bg-accent-dark/70 */}
					<div
						className={cn(
							"flex flex-col absolute rotate-0",
							"-bottom-9 left-120 gap-1 items-end",
							"",
							""
						)}>
						<Link
							href={buildStoreUrl("Romance")}
							className={cn(
								"aspect-auto w-70 h-30 rounded-3xl shadow",
								"flex items-center justify-center",
								"text-center text-2xl bg-emerald-950/50 dark:bg-emerald-200/30",
								"font-bold hover:not-focus:scale-105 hover:bg-accent transition-transform transform-gpu",
								"hover:dark:bg-accent-dark/70",
								//"hover:dark:text-background",
								"opacity-100",
								"brightness-100",
								"bg-container-raised dark:bg-container-raised",
								// "hover:text-2xl hover:font-bold cursor-pointer",
								"bg-neutral-200/40",
								"",
								""
							)}
							aria-label="Browse Romance">
							Romance
						</Link>
						<Link
							href={buildStoreUrl("Literary Fiction")}
							className={cn(
								"aspect-auto w-70 h-15 rounded-3xl shadow",
								"relative right-5 flex items-center justify-center",
								"text-center text-2xl bg-amber-700/50 dark:bg-amber-200/30",
								"font-bold hover:not-focus:scale-105 hover:bg-accent transition-transform transform-gpu",
								"hover:dark:bg-accent-dark/70",
								//"hover:dark:text-background",
								"opacity-100",
								"brightness-100",
								"bg-container-raised dark:bg-container-raised",
								// "hover:text-2xl hover:font-bold cursor-pointer",
								"bg-neutral-700/20",
								"",
								""
							)}
							aria-label="Browse Literary Fiction">
							Literary Fiction
						</Link>
						<Link
							href={buildStoreUrl("History")}
							className={cn(
								"aspect-auto w-95 h-18 rounded-3xl shadow",
								"relative right-5 flex items-center justify-center",
								"text-center text-2xl bg-slate-800/70 dark:bg-slate-300/30",
								"font-bold hover:not-focus:scale-105 hover:bg-accent transition-transform transform-gpu",
								"hover:dark:bg-accent-dark/70",
								//"hover:dark:text-background",
								"opacity-100",
								"brightness-100",
								"bg-container-raised dark:bg-container-raised",
								// "hover:text-2xl hover:font-bold cursor-pointer",
								"bg-neutral-400/20",
								"",
								""
							)}
							aria-label="Browse History">
							History
						</Link>
						<Link
							href={buildStoreUrl("Fantasy")}
							className={cn(
								"aspect-auto w-90 h-20 rounded-3xl shadow",
								"flex items-center justify-center",
								"text-center text-2xl bg-rose-950/60 dark:bg-rose-300/30",
								"font-bold hover:not-focus:scale-105 hover:bg-accent transition-transform transform-gpu",
								"hover:dark:bg-accent-dark/70",
								//"hover:dark:text-background",
								"opacity-100",
								"brightness-100",
								"bg-container-raised dark:bg-container-raised",
								// "hover:text-2xl hover:font-bold cursor-pointer",
								"bg-neutral-200/60",
								"",
								""
							)}
							aria-label="Browse Fantasy">
							Fantasy
						</Link>

						<Link
							href={buildStoreUrl("Science")}
							className={cn(
								"aspect-auto w-100 h-15 rounded-3xl shadow",
								"flex items-center justify-center",
								"text-center text-2xl bg-rose-950/60 dark:bg-rose-300/30",
								"font-bold hover:not-focus:scale-105 hover:bg-accent transition-transform transform-gpu",
								"hover:dark:bg-accent-dark/70",
								//"hover:dark:text-background",
								"opacity-100",
								"brightness-100",
								"bg-container-raised dark:bg-container-raised",
								// "hover:text-2xl hover:font-bold cursor-pointer",
								"bg-neutral-100/60",
								"",
								""
							)}
							aria-label="Browse Science">
							Science
						</Link>
					</div>

					<div
						className={cn(
							"relative rotate-70 place-self-end",
							"bottom-17 left-19",
							"",
							""
						)}>
						<Link
							href={buildStoreUrl("Thrillers and Mystery")}
							className={cn(
								"aspect-auto -rotate-5 w-80 h-25 rounded-3xl shadow",
								"flex items-center justify-center justify-self-end",
								"relative bottom-4 left-7 text-center text-2xl bg-emerald-950/50 dark:bg-emerald-200/30",
								"font-bold hover:not-focus:scale-105 hover:bg-accent transition-transform transform-gpu",
								"hover:dark:bg-accent-dark/70",
								//"hover:dark:text-background",
								"opacity-100",
								"brightness-100",
								"bg-container-raised dark:bg-container-raised",
								// "hover:text-2xl hover:font-bold cursor-pointer",
								"bg-neutral-200/40",
								"",
								""
							)}
							aria-label="Browse Thrillers and Mystery">
							Thrillers and Mystery
						</Link>
						<Link
							href={buildStoreUrl("Crime")}
							className={cn(
								"aspect-auto w-90 h-20 rounded-3xl shadow",
								"flex items-center justify-center",
								"text-center text-2xl bg-red-800/70 dark:bg-red-300/30",
								"font-bold hover:not-focus:scale-105 hover:bg-accent transition-transform transform-gpu",
								"hover:dark:bg-accent-dark/70",
								//"hover:dark:text-background",
								"opacity-100",
								"brightness-100",
								"bg-container-raised dark:bg-container-raised",
								// "hover:text-2xl hover:font-bold cursor-pointer",
								"bg-neutral-300/40",
								"",
								""
							)}
							aria-label="Browse Crime">
							Crime
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
