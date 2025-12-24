// import { cn } from "@/utils/cn";
// import React from "react";
// import Link from "next/link";

// function buildStoreUrl(topic: string) {
// 	const params = new URLSearchParams();
// 	params.append("topic", topic);
// 	return `/store?${params.toString()}`;
// }

// type BookShelfProps = Record<string, never>;

// export default function BookShelf_v3({}: BookShelfProps) {
// 	return (
// 		<div
// 			className={cn(
// 				// "py-0 relative",
// 				// "py-0 absolute",
// 				//
// 				// "right-15",
// 				// "left-0",
// 				"w-full",
// 				"",
// 				""
// 			)}
// 		>
// 			<div
// 				className={cn(
// 					"w-full py-10 relative",
// 					"grid grid-cols-2",
// 					// "right-30",
// 					"",
// 					""
// 				)}
// 			>
// 				{/* <div
// 					className={
// 						cn()
// 						// "relative flex flex-row",
// 						// "h-full w-full gap-1",
// 						// "items-end justify-start",
// 						// "",
// 						// ""
// 					}
// 				> */}
// 				<div
// 					className={cn(
// 						"flex flex-col",
// 						"col-start-1 col-span-1",
// 						// " absolute rotate-0",
// 						// "-bottom-9 left-120",
// 						" gap-1 ",
// 						"items-end",
// 						"",
// 						""
// 					)}
// 				>
// 					<Link
// 						href={buildStoreUrl("Romance")}
// 						className={cn(
// 							"aspect-auto w-70 h-30 rounded-3xl shadow-xl",
// 							"flex items-center justify-center",
// 							"text-center text-2xl bg-emerald-950/50 dark:bg-emerald-200/30",
// 							"hover:scale-[1.02] transition-transform",
// 							"opacity-100",
// 							"brightness-100",
// 							"bg-container-raised dark:bg-container-raised",
// 							// "hover:text-2xl hover:font-bold cursor-pointer",
// 							"bg-neutral-200/40",
// 							"",
// 							""
// 						)}
// 						aria-label="Browse Romance"
// 					>
// 						Romance
// 					</Link>
// 					<Link
// 						href={buildStoreUrl("Literary Fiction")}
// 						className={cn(
// 							"aspect-auto w-70 h-15 rounded-3xl shadow-xl",
// 							"relative right-5 flex items-center justify-center",
// 							"text-center text-2xl bg-amber-700/50 dark:bg-amber-200/30",
// 							"hover:scale-[1.02] transition-transform",
// 							"opacity-100",
// 							"brightness-100",
// 							"bg-container-raised dark:bg-container-raised",
// 							// "hover:text-2xl hover:font-bold cursor-pointer",
// 							"bg-neutral-700/20",
// 							"",
// 							""
// 						)}
// 						aria-label="Browse Literary Fiction"
// 					>
// 						Literary Fiction
// 					</Link>
// 					<Link
// 						href={buildStoreUrl("History")}
// 						className={cn(
// 							"aspect-auto w-95 h-18 rounded-3xl shadow-xl",
// 							"relative right-5 flex items-center justify-center",
// 							"text-center text-2xl bg-slate-800/70 dark:bg-slate-300/30",
// 							"hover:scale-[1.02] transition-transform",
// 							"opacity-100",
// 							"brightness-100",
// 							"bg-container-raised dark:bg-container-raised",
// 							// "hover:text-2xl hover:font-bold cursor-pointer",
// 							"bg-neutral-400/20",
// 							"",
// 							""
// 						)}
// 						aria-label="Browse History"
// 					>
// 						History
// 					</Link>
// 					<Link
// 						href={buildStoreUrl("Fantasy")}
// 						className={cn(
// 							"aspect-auto w-90 h-20 rounded-3xl shadow-xl",
// 							"flex items-center justify-center",
// 							"text-center text-2xl bg-rose-950/60 dark:bg-rose-300/30",
// 							"hover:scale-[1.02] transition-transform",
// 							"opacity-100",
// 							"brightness-100",
// 							"bg-container-raised dark:bg-container-raised",
// 							// "hover:text-2xl hover:font-bold cursor-pointer",
// 							"bg-neutral-200/60",
// 							"",
// 							""
// 						)}
// 						aria-label="Browse Fantasy"
// 					>
// 						Fantasy
// 					</Link>

// 					<Link
// 						href={buildStoreUrl("Science")}
// 						className={cn(
// 							"aspect-auto w-100 h-15 rounded-3xl shadow-xl",
// 							"flex items-center justify-center",
// 							"text-center text-2xl bg-rose-950/60 dark:bg-rose-300/30",
// 							"hover:scale-[1.02] transition-transform",
// 							"opacity-100",
// 							"brightness-100",
// 							"bg-container-raised dark:bg-container-raised",
// 							// "hover:text-2xl hover:font-bold cursor-pointer",
// 							"bg-neutral-100/60",
// 							"",
// 							""
// 						)}
// 						aria-label="Browse Science"
// 					>
// 						Science
// 					</Link>
// 				</div>

// 				<div
// 					className={cn(
// 						// "items-end",
// 						"overflow-visible",
// 						"w-20",
// 						// "h-20",
// 						"col-start-2 col-span-1",
// 						"rotate-70",
// 						"flex flex-col",
// 						"self-start",
// 						// "justify-content-start",
// 						"ml-15",
// 						// "relative  place-self-end",
// 						// "bottom-17 left-19",
// 						// ""
// 						"",
// 						""
// 					)}
// 				>
// 					<Link
// 						href={buildStoreUrl("Thrillers and Mystery")}
// 						className={cn(
// 							"aspect-auto -rotate-5 w-80 h-25 rounded-3xl shadow-xl",
// 							"flex items-center justify-center justify-self-end",
// 							"relative bottom-4 left-7 text-center text-2xl bg-emerald-950/50 dark:bg-emerald-200/30",
// 							"hover:scale-[1.02] transition-transform",
// 							"opacity-100",
// 							"brightness-100",
// 							"bg-container-raised bg-container-raised dark:bg-container-raised",
// 							// "hover:text-2xl hover:font-bold cursor-pointer",
// 							"bg-neutral-200/40",
// 							"",
// 							""
// 						)}
// 						aria-label="Browse Thrillers and Mystery"
// 					>
// 						Thrillers and Mystery
// 					</Link>
// 					<Link
// 						href={buildStoreUrl("Crime")}
// 						className={cn(
// 							"aspect-auto w-90 h-20 rounded-3xl shadow-xl",
// 							"flex items-center justify-center",
// 							"text-center text-2xl bg-red-800/70 dark:bg-red-300/30",
// 							"hover:scale-[1.02] transition-transform",
// 							"opacity-100",
// 							"brightness-100",
// 							"bg-container-raised dark:bg-container-raised",
// 							// "hover:text-2xl hover:font-bold cursor-pointer",
// 							"bg-neutral-300/40",
// 							"",
// 							""
// 						)}
// 						aria-label="Browse Crime"
// 					>
// 						Crime
// 					</Link>
// 				</div>
// 			</div>
// 			{/* </div> */}
// 		</div>
// 	);
// }

// {
// 	/* FROM HERE */
// }
