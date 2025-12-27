import { cn } from "@/utils/cn";
import React from "react";
import Link from "next/link";

function buildStoreUrl(topic: string) {
	const params = new URLSearchParams();
	params.append("topic", topic);
	return `/store?${params.toString()}`;
}

type BookShelfProps = Record<string, never>;

export default function BookShelf_v4({}: BookShelfProps) {
	return (
		<div
			className={cn(
				"grid grid-cols-2",
				"w-full",
				"justify-items-center",
				"justify-end",
				"items-end",
				// "min-h-96",
				"h-full",
				"gap-10",
				"",
				""
			)}
		>
			<div
				className={cn(
					"flex flex-col",
					"col-start-1 col-span-1",
					"gap-1",
					"items-end",
					"self-end",
					"justify-items-start",
					"w-full",
					"H-full",
					"",
					""
				)}
			>
				<Link
					href={buildStoreUrl("Romance")}
					className={cn(
						"aspect-auto w-48 h-10 rounded-xl shadow-xl",
						"flex items-center justify-center",
						"text-center text-sm bg-emerald-950/50 dark:bg-emerald-200/30",
						"hover:scale-105 hover:bg-accent/70 dark:hover:bg-accent-dark/70 transition-transform",
						"opacity-100",
						"brightness-100",
						"bg-container-raised dark:bg-container-raised",
						"bg-neutral-200/40",
						"",
						""
					)}
					aria-label="Browse Romance"
				>
					Romance
				</Link>
				<Link
					href={buildStoreUrl("Literary Fiction")}
					className={cn(
						"aspect-auto w-44 h-8 rounded-xl shadow-xl",
						"relative right-5 flex items-center justify-center",
						"text-center text-sm bg-amber-700/50 dark:bg-amber-200/30",
						"hover:scale-105 hover:bg-accent/70 dark:hover:bg-accent-dark/70 transition-transform",
						"opacity-100",
						"brightness-100",
						"bg-container-raised dark:bg-container-raised",
						"bg-neutral-700/20",
						"",
						""
					)}
					aria-label="Browse Literary Fiction"
				>
					Literary Fiction
				</Link>
				<Link
					href={buildStoreUrl("History")}
					className={cn(
						"aspect-auto w-52 h-9 rounded-xl shadow-xl",
						"relative left-10 flex items-center justify-center",
						"text-center text-sm bg-slate-800/70 dark:bg-slate-300/30",
						"hover:scale-105 hover:bg-accent/70 dark:hover:bg-accent-dark/70 transition-transform",
						"opacity-100",
						"brightness-100",
						"bg-container-raised dark:bg-container-raised",
						"bg-neutral-400/20",
						"",
						""
					)}
					aria-label="Browse History"
				>
					History
				</Link>
				<Link
					href={buildStoreUrl("Fantasy")}
					className={cn(
						"aspect-auto w-48 h-10 rounded-xl shadow-xl",
						"flex items-center justify-center",
						"text-center text-sm bg-rose-950/60 dark:bg-rose-300/30",
						"hover:scale-105 hover:bg-accent/70 dark:hover:bg-accent-dark/70 transition-transform",
						"opacity-100",
						"brightness-100",
						"bg-container-raised dark:bg-container-raised",
						// "hover:text-2xl hover:font-bold cursor-pointer",
						"bg-neutral-200/60",
						"",
						""
					)}
					aria-label="Browse Fantasy"
				>
					Fantasy
				</Link>

				<Link
					href={buildStoreUrl("Science")}
					className={cn(
						"aspect-auto w-52 h-8 rounded-xl shadow-xl",
						"flex items-center justify-center",
						"text-center text-sm bg-rose-950/60 dark:bg-rose-300/30",
						"hover:scale-105 hover:bg-accent/70 dark:hover:bg-accent-dark/70 transition-transform",
						"opacity-100",
						"brightness-100",
						"bg-container-raised dark:bg-container-raised",
						// "hover:text-2xl hover:font-bold cursor-pointer",
						"bg-neutral-100/60",
						"",
						""
					)}
					aria-label="Browse Science"
				>
					Science
				</Link>
				<Link
					href={buildStoreUrl("Thrillers and Mystery")}
					className={cn(
						"aspect-auto w-48 h-10 rounded-xl shadow-xl",
						"flex items-center justify-center justify-self-end",
						"relative left-7 text-center text-sm bg-emerald-950/50 dark:bg-emerald-200/30",
						"hover:scale-105 hover:bg-accent/70 dark:hover:bg-accent-dark/70 transition-transform",
						"opacity-100",
						"brightness-100",
						"bg-container-raised dark:bg-container-raised",
						// "hover:text-2xl hover:font-bold cursor-pointer",
						"bg-neutral-200/40",
						"",
						""
					)}
					aria-label="Browse Thrillers and Mystery"
				>
					Thrillers and Mystery
				</Link>
				<Link
					href={buildStoreUrl("Crime")}
					className={cn(
						"aspect-auto w-48 h-10 rounded-xl shadow-xl",
						"flex items-center justify-center",
						"text-center text-sm bg-red-800/70 dark:bg-red-300/30",
						"hover:scale-105 hover:bg-accent/70 dark:hover:bg-accent-dark/70 transition-transform",
						"opacity-100",
						"brightness-100",
						"bg-container-raised dark:bg-container-raised",
						// "hover:text-2xl hover:font-bold cursor-pointer",
						"bg-neutral-300/40",
						"",
						""
					)}
					aria-label="Browse Crime"
				>
					Crime
				</Link>
			</div>

			<div
				className={cn(
					"flex flex-col",
					"col-start-2 col-span-1",
					"gap-1",
					"items-start",
					"self-end",
					"justify-end",
					"w-full",
					"h-full",
					"",
					""
				)}
			>
				<Link
					href={buildStoreUrl("Horror")}
					className={cn(
						"aspect-auto w-52 h-10 rounded-xl shadow-xl",
						"flex items-center justify-center",
						"text-center text-sm bg-red-800/70 dark:bg-red-300/30",
						"hover:scale-105 hover:bg-accent/70 dark:hover:bg-accent-dark/70 transition-transform",
						"opacity-100",
						"brightness-100",
						"bg-container-raised dark:bg-container-raised",
						// "hover:text-2xl hover:font-bold cursor-pointer",
						"bg-neutral-300/40",
						// "-translate-x-5",

						// OPTIONAL
						"rotate-40",
						"-translate-y-14",
						"-translate-x-19",

						// OPTIONAL 2
						"origin-bottom-right",
						"rotate-30",
						"rotate-12",
						"translate-y-1",
						"-translate-x-13",
						"",
						""
					)}
					aria-label="Browse Horror"
				>
					Horror
				</Link>
				<Link
					href={buildStoreUrl("Humour")}
					className={cn(
						"aspect-auto w-40 h-10 rounded-xl shadow-xl",
						"flex items-center justify-center",
						"text-center text-sm bg-red-800/70 dark:bg-red-300/30",
						"hover:scale-105 hover:bg-accent/70 dark:hover:bg-accent-dark/70 transition-transform",
						"opacity-100",
						"brightness-100",
						"bg-container-raised dark:bg-container-raised",
						// "hover:text-2xl hover:font-bold cursor-pointer",
						"bg-neutral-400/40",
						"translate-x-5",
						"",
						""
					)}
					aria-label="Browse Humour"
				>
					Humour
				</Link>
				<Link
					href={buildStoreUrl("Science Fiction")}
					className={cn(
						"aspect-auto w-48 h-10 rounded-xl shadow-xl",
						"flex items-center justify-center",
						"text-center text-sm bg-slate-800/70 dark:bg-slate-400/30",
						"hover:scale-105 hover:bg-accent/70 dark:hover:bg-accent-dark/70 transition-transform",
						"opacity-100",
						"brightness-100",
						"bg-container-raised dark:bg-container-raised",
						// "hover:text-2xl hover:font-bold cursor-pointer",
						"bg-neutral-300/30",
						"-translate-x-8",
						"",
						""
					)}
					aria-label="Browse Science Fiction"
				>
					Science Fiction
				</Link>
				<Link
					href={buildStoreUrl("Adventure")}
					className={cn(
						"aspect-auto w-48 h-10 rounded-xl shadow-xl",
						"flex items-center justify-center",
						"text-center text-sm bg-emerald-950/50 dark:bg-emerald-200/30",
						"hover:scale-105 hover:bg-accent/70 dark:hover:bg-accent-dark/70 transition-transform",
						"opacity-100",
						"brightness-100",
						"bg-container-raised dark:bg-container-raised",
						// "hover:text-2xl hover:font-bold cursor-pointer",
						"bg-neutral-200/40",
						"translate-x-0",
						"",
						""
					)}
					aria-label="Browse Adventure"
				>
					Adventure
				</Link>
				<Link
					href={buildStoreUrl("Children & Young Adult")}
					className={cn(
						"aspect-auto w-48 h-10 rounded-xl shadow-xl",
						"flex items-center justify-center",
						"text-center text-sm bg-amber-700/50 dark:bg-amber-200/30",
						"hover:scale-105 hover:bg-accent/70 dark:hover:bg-accent-dark/70 transition-transform",
						"opacity-100",
						"brightness-100",
						"bg-container-raised dark:bg-container-raised",
						// "hover:text-2xl hover:font-bold cursor-pointer",
						"bg-neutral-200/40",
						"translate-x-5",
						"",
						""
					)}
					aria-label="Browse Children & Young Adult"
				>
					Children & Young Adult
				</Link>
			</div>
		</div>
	);
}
