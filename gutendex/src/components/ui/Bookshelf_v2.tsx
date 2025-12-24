// import { cn } from "@/utils/cn";
// import React from "react";
// import Link from "next/link";

// function buildStoreUrl(topic: string) {
// 	const params = new URLSearchParams();
// 	params.append("topic", topic);
// 	return `/store?${params.toString()}`;
// }

// type BookShelfProps = Record<string, never>;

// export default function BookShelf_v2({}: BookShelfProps) {
// 	return (
// 		// <div className="w-full">
// 		// 	<h3 className="text-xl">BookShelf</h3>
// 		// 	<div
// 		// 		className={cn(
// 		// 			"flex flex-row gap-2 overflow-auto w-full",
// 		// 			"","",
// 		// 			"",""
// 		// 		)}
// 		// 	>
// 		// 		<div className="aspect-auto  h-60 w-30 rounded-3xl shadow-xl"></div>
// 		// 		<div className="aspect-auto  h-60 w-30 rounded-3xl shadow-xl"></div>
// 		// 		<div className="aspect-auto  h-60 w-30 rounded-3xl shadow-xl"></div>
// 		// 		<div className="aspect-auto  h-60 w-30 rounded-3xl shadow-xl"></div>
// 		// 		<div className="aspect-auto  h-60 w-30 rounded-3xl shadow-xl"></div>
// 		// 		<div className="aspect-auto  h-60 w-30 rounded-3xl shadow-xl"></div>
// 		// 		<div className="aspect-auto  h-60 w-30 rounded-3xl shadow-xl"></div>
// 		// 		<div className="aspect-auto  h-60 w-30 rounded-3xl shadow-xl"></div>
// 		// 	</div>
// 		// </div>

// 		// ? ALTERNATIV
// 		// <div className="w-full py-10">
// 		// 	<h3 className="text-xl">BookShelf</h3>
// 		// 	<div className="flex flex-row w-fit gap-2 content-baseline">
// 		// 		<div className="relative rotate-10 right-5 place-self-end">
// 		// 			<h3 className="aspect-auto  h-90 w-20 rounded-3xl shadow-xl place-self-end text-2xl">
// 		// 				placeholder
// 		// 			</h3>
// 		// 		</div>
// 		// 		<div
// 		// 			className={cn(
// 		// 				"flex flex-row gap-1 w-full",
// 		// 				"justify-self-end",
// 		// 				"place-self-end ",
// 		// 				"",""
// 		// 			)}
// 		// 		>
// 		// 			<h3 className="aspect-auto  h-100 w-20 rounded-3xl shadow-xl place-self-end  text-2xl">
// 		// 				placeholder
// 		// 			</h3>
// 		// 			<h3 className="aspect-auto  h-60 w-20 rounded-3xl shadow-xl place-self-end  text-2xl">
// 		// 				placeholder
// 		// 			</h3>
// 		// 			<h3 className="aspect-auto  h-90 w-20 rounded-3xl shadow-xl place-self-end  text-2xl">
// 		// 				placeholder
// 		// 			</h3>
// 		// 		</div>
// 		// 		<div className="relative rotate-10 left-6 place-self-end">
// 		// 			<h3 className="aspect-auto  h-90 w-20 rounded-3xl shadow-xl text-2xl">
// 		// 				placeholder
// 		// 			</h3>
// 		// 		</div>
// 		// 		<div className="flex flex-row relative rotate-90 top-8 left-13 gap-1">
// 		// 			<h3 className="aspect-auto  h-70 w-30 rounded-3xl shadow-xl text-2xl">
// 		// 				placeholder
// 		// 			</h3>
// 		// 			<h3 className="aspect-auto  h-95 w-18 rounded-3xl shadow-xl relative top-5 text-2xl">
// 		// 				placeholder
// 		// 			</h3>
// 		// 			<h3 className="aspect-auto  h-90 w-20 rounded-3xl shadow-xl text-2xl">
// 		// 				placeholder
// 		// 			</h3>
// 		// 			<h3 className="aspect-auto  h-100 w-15 rounded-3xl shadow-xl relative bottom-12 text-2xl">
// 		// 				placeholder
// 		// 			</h3>
// 		// 		</div>

// 		// 		<div className="relative -rotate-20 left-32 place-self-end">
// 		// 			<h3 className="aspect-auto  h-90 w-20 rounded-3xl shadow-xl text-2xl">
// 		// 				placeholder
// 		// 			</h3>
// 		// 		</div>
// 		// 		<div className="relative -rotate-25 left-37 place-self-end">
// 		// 			<h3 className="aspect-auto  h-80 w-25 rounded-3xl shadow-xl text-2xl">
// 		// 				placeholder
// 		// 			</h3>
// 		// 		</div>
// 		// 	</div>
// 		// </div>

// 		// <div
// 		// 	className={cn(
// 		// 		// "grid grid-rows-2 lg:grid-rows-1",
// 		// 		"flex flex-col md:flex-row",
// 		// 		"gap-40 md:gap-0",
// 		// 		"",
// 		// 		""
// 		// 	)}
// 		// >
// 		// 	{/* <div className={cn("flex flex-col lg:grid-rows-1", "", "", "")}> */}
// 		// 	{/* <div className={cn("w-full py-10 relative", "left-30", "", "")}> */}
// 		// 	<div
// 		// 		className={cn(
// 		// 			"relative flex flex-row",
// 		// 			"h-full w-full gap-1",
// 		// 			"items-end justify-start",
// 		// 			"",
// 		// 			""
// 		// 		)}
// 		// 	>
// 		// 		<div
// 		// 			className={cn(
// 		// 				"absolute -left-41 bottom-30 z-10",
// 		// 				"rotate-290 origin-bottom",
// 		// 				"",
// 		// 				""
// 		// 			)}
// 		// 		>
// 		// 			<Link
// 		// 				href={buildStoreUrl("Children & Young Adult")}
// 		// 				className={cn(
// 		// 					"aspect-auto w-90 h-20 rounded-3xl shadow-xl",
// 		// 					"place-self-end flex items-center justify-center",
// 		// 					"text-center text-2xl bg-amber-700/50 dark:bg-amber-200/30",
// 		// 					"hover:scale-[1.02] transition-transform",
// 		// 					"opacity-100",
// 		// 					"brightness-100",
// 		// 					"bg-container-raised dark:bg-container-raised",
// 		// 					// "hover:text-2xl hover:font-bold cursor-pointer",
// 		// 					"bg-neutral-200/40",
// 		// 					"",
// 		// 					""
// 		// 				)}
// 		// 				aria-label="Browse Children & Young Adult"
// 		// 			>
// 		// 				Children & Young Adult
// 		// 			</Link>
// 		// 		</div>
// 		// 		<div
// 		// 			className={cn(
// 		// 				"flex flex-col gap-1 h-full",
// 		// 				"relative bottom-10",
// 		// 				"rotate-90",
// 		// 				"justify-self-end",
// 		// 				"place-self-end",
// 		// 				"",
// 		// 				""
// 		// 			)}
// 		// 		>
// 		// 			<Link
// 		// 				href={buildStoreUrl("Horror")}
// 		// 				className={cn(
// 		// 					"aspect-auto w-100 h-20 rounded-3xl shadow-xl",
// 		// 					"place-self-end flex items-center justify-center",
// 		// 					"text-center text-2xl bg-red-800/70 dark:bg-red-300/30",
// 		// 					"hover:scale-[1.02] transition-transform",
// 		// 					"opacity-100",
// 		// 					"brightness-100",
// 		// 					"bg-container-raised dark:bg-container-raised",
// 		// 					// "hover:text-2xl hover:font-bold cursor-pointer",
// 		// 					"bg-neutral-300/40",
// 		// 					"",
// 		// 					""
// 		// 				)}
// 		// 				aria-label="Browse Horror"
// 		// 			>
// 		// 				Horror
// 		// 			</Link>
// 		// 			<Link
// 		// 				href={buildStoreUrl("Humour")}
// 		// 				className={cn(
// 		// 					"aspect-auto w-60 h-20 rounded-3xl shadow-xl",
// 		// 					"place-self-end flex items-center justify-center",
// 		// 					"text-center text-2xl bg-red-800/70 dark:bg-red-300/30",
// 		// 					"hover:scale-[1.02] transition-transform",
// 		// 					"opacity-100",
// 		// 					"brightness-100",
// 		// 					"bg-container-raised dark:bg-container-raised",
// 		// 					// "hover:text-2xl hover:font-bold cursor-pointer",
// 		// 					"bg-neutral-400/40",
// 		// 					"",
// 		// 					""
// 		// 				)}
// 		// 				aria-label="Browse Humour"
// 		// 			>
// 		// 				Humour
// 		// 			</Link>
// 		// 			<Link
// 		// 				href={buildStoreUrl("Science Fiction")}
// 		// 				className={cn(
// 		// 					"aspect-auto w-90 h-20 rounded-3xl shadow-xl",
// 		// 					"place-self-end flex items-center justify-center",
// 		// 					"text-center text-2xl bg-slate-800/70 dark:bg-slate-400/30",
// 		// 					"hover:scale-[1.02] transition-transform",
// 		// 					"opacity-100",
// 		// 					"brightness-100",
// 		// 					"bg-container-raised dark:bg-container-raised",
// 		// 					// "hover:text-2xl hover:font-bold cursor-pointer",
// 		// 					"bg-neutral-300/30",
// 		// 					"",
// 		// 					""
// 		// 				)}
// 		// 				aria-label="Browse Science Fiction"
// 		// 			>
// 		// 				Science Fiction
// 		// 			</Link>
// 		// 		</div>
// 		// 		<div
// 		// 			className={cn(
// 		// 				"relative right-31 bottom-31 z-0",
// 		// 				"rotate-290 origin-bottom",
// 		// 				"",
// 		// 				""
// 		// 			)}
// 		// 		>
// 		// 			<Link
// 		// 				href={buildStoreUrl("Adventure")}
// 		// 				className={cn(
// 		// 					"aspect-auto w-90 h-20 rounded-3xl shadow-xl",
// 		// 					"place-self-end flex items-center justify-center",
// 		// 					"text-center text-2xl bg-emerald-950/50 dark:bg-emerald-200/30",
// 		// 					"hover:scale-[1.02] transition-transform",
// 		// 					"opacity-100",
// 		// 					"brightness-100",
// 		// 					"bg-container-raised dark:bg-container-raised",
// 		// 					// "hover:text-2xl hover:font-bold cursor-pointer",
// 		// 					"bg-neutral-200/40",
// 		// 					"",
// 		// 					""
// 		// 				)}
// 		// 				aria-label="Browse Adventure"
// 		// 			>
// 		// 				Adventure
// 		// 			</Link>
// 		// 		</div>
// 		// 		<div
// 		// 			className={cn(
// 		// 				"flex flex-col absolute rotate-0",
// 		// 				"-bottom-9 left-120 gap-1 items-end",
// 		// 				"",
// 		// 				""
// 		// 			)}
// 		// 		></div>
// 		// 	</div>
// 		// 	{/* FROM HERE */}
// 		// 	<div
// 		// 		className={cn(
// 		// 			"w-full py-10 relative",
// 		// 			// "left-30",
// 		// 			"right-50",
// 		// 			// "place-self-start",
// 		// 			"",
// 		// 			""
// 		// 		)}
// 		// 	>
// 		// 		<div
// 		// 			className={cn(
// 		// 				"relative flex flex-row",
// 		// 				"h-full w-full gap-1",
// 		// 				"items-end justify-start",
// 		// 				"col-start-1 row-start-2",
// 		// 				"",
// 		// 				""
// 		// 			)}
// 		// 		>
// 		// 			<div
// 		// 				className={cn(
// 		// 					"flex flex-col absolute rotate-0",
// 		// 					"-bottom-9 left-120 gap-1 items-end",
// 		// 					"",
// 		// 					""
// 		// 				)}
// 		// 			>
// 		// 				<Link
// 		// 					href={buildStoreUrl("Romance")}
// 		// 					className={cn(
// 		// 						"aspect-auto w-70 h-30 rounded-3xl shadow-xl",
// 		// 						"flex items-center justify-center",
// 		// 						"text-center text-2xl bg-emerald-950/50 dark:bg-emerald-200/30",
// 		// 						"hover:scale-[1.02] transition-transform",
// 		// 						"opacity-100",
// 		// 						"brightness-100",
// 		// 						"bg-container-raised dark:bg-container-raised",
// 		// 						// "hover:text-2xl hover:font-bold cursor-pointer",
// 		// 						"bg-neutral-200/40",
// 		// 						"",
// 		// 						""
// 		// 					)}
// 		// 					aria-label="Browse Romance"
// 		// 				>
// 		// 					Romance
// 		// 				</Link>
// 		// 				<Link
// 		// 					href={buildStoreUrl("Literary Fiction")}
// 		// 					className={cn(
// 		// 						"aspect-auto w-70 h-15 rounded-3xl shadow-xl",
// 		// 						"relative right-5 flex items-center justify-center",
// 		// 						"text-center text-2xl bg-amber-700/50 dark:bg-amber-200/30",
// 		// 						"hover:scale-[1.02] transition-transform",
// 		// 						"opacity-100",
// 		// 						"brightness-100",
// 		// 						"bg-container-raised dark:bg-container-raised",
// 		// 						// "hover:text-2xl hover:font-bold cursor-pointer",
// 		// 						"bg-neutral-700/20",
// 		// 						"",
// 		// 						""
// 		// 					)}
// 		// 					aria-label="Browse Literary Fiction"
// 		// 				>
// 		// 					Literary Fiction
// 		// 				</Link>
// 		// 				<Link
// 		// 					href={buildStoreUrl("History")}
// 		// 					className={cn(
// 		// 						"aspect-auto w-95 h-18 rounded-3xl shadow-xl",
// 		// 						"relative right-5 flex items-center justify-center",
// 		// 						"text-center text-2xl bg-slate-800/70 dark:bg-slate-300/30",
// 		// 						"hover:scale-[1.02] transition-transform",
// 		// 						"opacity-100",
// 		// 						"brightness-100",
// 		// 						"bg-container-raised dark:bg-container-raised",
// 		// 						// "hover:text-2xl hover:font-bold cursor-pointer",
// 		// 						"bg-neutral-400/20",
// 		// 						"",
// 		// 						""
// 		// 					)}
// 		// 					aria-label="Browse History"
// 		// 				>
// 		// 					History
// 		// 				</Link>
// 		// 				<Link
// 		// 					href={buildStoreUrl("Fantasy")}
// 		// 					className={cn(
// 		// 						"aspect-auto w-90 h-20 rounded-3xl shadow-xl",
// 		// 						"flex items-center justify-center",
// 		// 						"text-center text-2xl bg-rose-950/60 dark:bg-rose-300/30",
// 		// 						"hover:scale-[1.02] transition-transform",
// 		// 						"opacity-100",
// 		// 						"brightness-100",
// 		// 						"bg-container-raised dark:bg-container-raised",
// 		// 						// "hover:text-2xl hover:font-bold cursor-pointer",
// 		// 						"bg-neutral-200/60",
// 		// 						"",
// 		// 						""
// 		// 					)}
// 		// 					aria-label="Browse Fantasy"
// 		// 				>
// 		// 					Fantasy
// 		// 				</Link>

// 		// 				<Link
// 		// 					href={buildStoreUrl("Science")}
// 		// 					className={cn(
// 		// 						"aspect-auto w-100 h-15 rounded-3xl shadow-xl",
// 		// 						"flex items-center justify-center",
// 		// 						"text-center text-2xl bg-rose-950/60 dark:bg-rose-300/30",
// 		// 						"hover:scale-[1.02] transition-transform",
// 		// 						"opacity-100",
// 		// 						"brightness-100",
// 		// 						"bg-container-raised dark:bg-container-raised",
// 		// 						// "hover:text-2xl hover:font-bold cursor-pointer",
// 		// 						"bg-neutral-100/60",
// 		// 						"",
// 		// 						""
// 		// 					)}
// 		// 					aria-label="Browse Science"
// 		// 				>
// 		// 					Science
// 		// 				</Link>
// 		// 			</div>

// 		// 			<div
// 		// 				className={cn(
// 		// 					"relative rotate-70 place-self-end",
// 		// 					"bottom-17 left-19",
// 		// 					"",
// 		// 					""
// 		// 				)}
// 		// 			>
// 		// 				<Link
// 		// 					href={buildStoreUrl("Thrillers and Mystery")}
// 		// 					className={cn(
// 		// 						"aspect-auto -rotate-5 w-80 h-25 rounded-3xl shadow-xl",
// 		// 						"flex items-center justify-center justify-self-end",
// 		// 						"relative bottom-4 left-7 text-center text-2xl bg-emerald-950/50 dark:bg-emerald-200/30",
// 		// 						"hover:scale-[1.02] transition-transform",
// 		// 						"opacity-100",
// 		// 						"brightness-100",
// 		// 						"bg-container-raised bg-container-raised dark:bg-container-raised",
// 		// 						// "hover:text-2xl hover:font-bold cursor-pointer",
// 		// 						"bg-neutral-200/40",
// 		// 						"",
// 		// 						""
// 		// 					)}
// 		// 					aria-label="Browse Thrillers and Mystery"
// 		// 				>
// 		// 					Thrillers and Mystery
// 		// 				</Link>
// 		// 				<Link
// 		// 					href={buildStoreUrl("Crime")}
// 		// 					className={cn(
// 		// 						"aspect-auto w-90 h-20 rounded-3xl shadow-xl",
// 		// 						"flex items-center justify-center",
// 		// 						"text-center text-2xl bg-red-800/70 dark:bg-red-300/30",
// 		// 						"hover:scale-[1.02] transition-transform",
// 		// 						"opacity-100",
// 		// 						"brightness-100",
// 		// 						"bg-container-raised dark:bg-container-raised",
// 		// 						// "hover:text-2xl hover:font-bold cursor-pointer",
// 		// 						"bg-neutral-300/40",
// 		// 						"",
// 		// 						""
// 		// 					)}
// 		// 					aria-label="Browse Crime"
// 		// 				>
// 		// 					Crime
// 		// 				</Link>
// 		// 			</div>
// 		// 		</div>
// 		// 		{/*  */}
// 		// 	</div>
// 		// 	{/* </div> */}
// 		// 	{/* </div> */}
// 		// </div>
// 		// <div className={cn("py-0 relative", "right-15", "", "")}>
// 		// 	{/* <div className={cn("w-full py-10 relative", "left-30", "", "")}> */}
// 		// 	<div
// 		// 		className={cn(
// 		// 			"relative flex flex-row",
// 		// 			"h-full w-full gap-1",
// 		// 			"items-end justify-start",
// 		// 			"",
// 		// 			""
// 		// 		)}
// 		// 	>
// 		<div
// 			className={cn(
// 				// "py-0 relative",
// 				// "py-0 absolute",
// 				//
// 				// "right-15",
// 				// "left-0",
// 				"w-full",
// 				"h-100",
// 				"h-70",
// 				// "h-full",
// 				"grid grid-cols-3",
// 				// "grid grid-cols-[1fr_2fr_2fr]",

// 				"overflow-visible",

// 				"gap-5",
// 				"",
// 				"",
// 				""
// 			)}
// 		>
// 			<div
// 				className={cn(
// 					// "absolute -left-41 bottom-30 z-10",
// 					"col-start-1",
// 					"rotate-290 ",
// 					// "justify-self-center",
// 					// "justify-self-center-safe",
// 					// "justify-self-end-safe",
// 					// "justify-self-start",
// 					// "place-self-end",
// 					// "self-center",
// 					"place-self-center",
// 					"origin-bottom",
// 					// "origin-center",
// 					"",
// 					""
// 				)}
// 			>
// 				<Link
// 					href={buildStoreUrl("Children & Young Adult")}
// 					className={cn(
// 						"aspect-auto w-90 h-20 rounded-3xl shadow-xl",
// 						"place-self-end flex items-center justify-center",
// 						"text-center text-2xl bg-amber-700/50 dark:bg-amber-200/30",
// 						"hover:scale-[1.02] transition-transform",
// 						"opacity-100",
// 						"brightness-100",
// 						"bg-container-raised dark:bg-container-raised",
// 						// "hover:text-2xl hover:font-bold cursor-pointer",
// 						"bg-neutral-200/40",
// 						"",
// 						""
// 					)}
// 					aria-label="Browse Children & Young Adult"
// 				>
// 					Children & Young Adult
// 				</Link>
// 			</div>
// 			<div
// 				className={cn(
// 					"flex flex-col gap-1",
// 					// "relative bottom-10",
// 					"rotate-90",
// 					// "justify-self-end",
// 					// "place-self-end",

// 					"col-start-2",
// 					// "rotate-290 ",
// 					"justify-self-center",
// 					"place-self-end",
// 					"self-center",

// 					"",
// 					""
// 				)}
// 			>
// 				<Link
// 					href={buildStoreUrl("Horror")}
// 					className={cn(
// 						"aspect-auto w-100 h-20 rounded-3xl shadow-xl",
// 						"place-self-end flex items-center justify-center",
// 						"text-center text-2xl bg-red-800/70 dark:bg-red-300/30",
// 						"hover:scale-[1.02] transition-transform",
// 						"opacity-100",
// 						"brightness-100",
// 						"bg-container-raised dark:bg-container-raised",
// 						// "hover:text-2xl hover:font-bold cursor-pointer",
// 						"bg-neutral-300/40",
// 						"",
// 						""
// 					)}
// 					aria-label="Browse Horror"
// 				>
// 					Horror
// 				</Link>
// 				<Link
// 					href={buildStoreUrl("Humour")}
// 					className={cn(
// 						"aspect-auto w-60 h-20 rounded-3xl shadow-xl",
// 						"place-self-end flex items-center justify-center",
// 						"text-center text-2xl bg-red-800/70 dark:bg-red-300/30",
// 						"hover:scale-[1.02] transition-transform",
// 						"opacity-100",
// 						"brightness-100",
// 						"bg-container-raised dark:bg-container-raised",
// 						// "hover:text-2xl hover:font-bold cursor-pointer",
// 						"bg-neutral-400/40",
// 						"",
// 						""
// 					)}
// 					aria-label="Browse Humour"
// 				>
// 					Humour
// 				</Link>
// 				<Link
// 					href={buildStoreUrl("Science Fiction")}
// 					className={cn(
// 						"aspect-auto w-90 h-20 rounded-3xl shadow-xl",
// 						"place-self-end flex items-center justify-center",
// 						"text-center text-2xl bg-slate-800/70 dark:bg-slate-400/30",
// 						"hover:scale-[1.02] transition-transform",
// 						"opacity-100",
// 						"brightness-100",
// 						"bg-container-raised dark:bg-container-raised",
// 						// "hover:text-2xl hover:font-bold cursor-pointer",
// 						"bg-neutral-300/30",
// 						"",
// 						""
// 					)}
// 					aria-label="Browse Science Fiction"
// 				>
// 					Science Fiction
// 				</Link>
// 			</div>
// 			<div
// 				className={cn(
// 					// // "relative right-31 bottom-31 z-0",
// 					// // "rotate-290 origin-bottom",
// 					// "rotate-290",
// 					// "rotate-90",
// 					// // "justify-self-end",
// 					// // "place-self-end",

// 					// // "rotate-290 ",
// 					// // "justify-self-center",
// 					// // "place-self-end",
// 					// // "justify-self-end",
// 					// "justify-self-start",
// 					// "self-end",
// 					// "relative",
// 					// "left-10",
// 					// // "origin-left",
// 					// // "origin-bottom",
// 					// // "origin-left",

// 					"col-start-3",
// 					"rotate-80",
// 					// "justify-self-end",
// 					// "place-self-end",

// 					// "rotate-290 ",
// 					// "place-self-end",15
// 					"justify-self-center",
// 					"self-center",
// 					// "self-top",

// 					// "place-self-center",
// 					"origin-bottom",

// 					"mb-10",
// 					"mr-15",
// 					"",
// 					""
// 				)}
// 			>
// 				<Link
// 					href={buildStoreUrl("Adventure")}
// 					className={cn(
// 						"aspect-auto w-90 h-20 rounded-3xl shadow-xl",
// 						"place-self-end flex items-center justify-center",
// 						"text-center text-2xl bg-emerald-950/50 dark:bg-emerald-200/30",
// 						"hover:scale-[1.02] transition-transform",
// 						"opacity-100",
// 						"brightness-100",
// 						"bg-container-raised dark:bg-container-raised",
// 						// "hover:text-2xl hover:font-bold cursor-pointer",
// 						"bg-neutral-200/40",
// 						"",
// 						""
// 					)}
// 					aria-label="Browse Adventure"
// 				>
// 					Adventure
// 				</Link>
// 			</div>
// 		</div>
// 		// {/* </div> **/}
// 		// </div>
// 	);
// }

// {
// 	/* FROM HERE */
// }
// // <div
// //     className={cn(
// //         "flex flex-col absolute rotate-0",
// //         "-bottom-9 left-120 gap-1 items-end",
// //         "",
// //         ""
// //     )}
// // >
// //     <Link
// //         href={buildStoreUrl("Romance")}
// //         className={cn(
// //             "aspect-auto w-70 h-30 rounded-3xl shadow-xl",
// //             "flex items-center justify-center",
// //             "text-center text-2xl bg-emerald-950/50 dark:bg-emerald-200/30",
// //             "hover:scale-[1.02] transition-transform",
// //             "opacity-100",
// //             "brightness-100",
// //             "bg-container-raised dark:bg-container-raised",
// //             // "hover:text-2xl hover:font-bold cursor-pointer",
// //             "bg-neutral-200/40",
// //             "",
// //             ""
// //         )}
// //         aria-label="Browse Romance"
// //     >
// //         Romance
// //     </Link>
// //     <Link
// //         href={buildStoreUrl("Literary Fiction")}
// //         className={cn(
// //             "aspect-auto w-70 h-15 rounded-3xl shadow-xl",
// //             "relative right-5 flex items-center justify-center",
// //             "text-center text-2xl bg-amber-700/50 dark:bg-amber-200/30",
// //             "hover:scale-[1.02] transition-transform",
// //             "opacity-100",
// //             "brightness-100",
// //             "bg-container-raised dark:bg-container-raised",
// //             // "hover:text-2xl hover:font-bold cursor-pointer",
// //             "bg-neutral-700/20",
// //             "",
// //             ""
// //         )}
// //         aria-label="Browse Literary Fiction"
// //     >
// //         Literary Fiction
// //     </Link>
// //     <Link
// //         href={buildStoreUrl("History")}
// //         className={cn(
// //             "aspect-auto w-95 h-18 rounded-3xl shadow-xl",
// //             "relative right-5 flex items-center justify-center",
// //             "text-center text-2xl bg-slate-800/70 dark:bg-slate-300/30",
// //             "hover:scale-[1.02] transition-transform",
// //             "opacity-100",
// //             "brightness-100",
// //             "bg-container-raised dark:bg-container-raised",
// //             // "hover:text-2xl hover:font-bold cursor-pointer",
// //             "bg-neutral-400/20",
// //             "",
// //             ""
// //         )}
// //         aria-label="Browse History"
// //     >
// //         History
// //     </Link>
// //     <Link
// //         href={buildStoreUrl("Fantasy")}
// //         className={cn(
// //             "aspect-auto w-90 h-20 rounded-3xl shadow-xl",
// //             "flex items-center justify-center",
// //             "text-center text-2xl bg-rose-950/60 dark:bg-rose-300/30",
// //             "hover:scale-[1.02] transition-transform",
// //             "opacity-100",
// //             "brightness-100",
// //             "bg-container-raised dark:bg-container-raised",
// //             // "hover:text-2xl hover:font-bold cursor-pointer",
// //             "bg-neutral-200/60",
// //             "",
// //             ""
// //         )}
// //         aria-label="Browse Fantasy"
// //     >
// //         Fantasy
// //     </Link>

// //     <Link
// //         href={buildStoreUrl("Science")}
// //         className={cn(
// //             "aspect-auto w-100 h-15 rounded-3xl shadow-xl",
// //             "flex items-center justify-center",
// //             "text-center text-2xl bg-rose-950/60 dark:bg-rose-300/30",
// //             "hover:scale-[1.02] transition-transform",
// //             "opacity-100",
// //             "brightness-100",
// //             "bg-container-raised dark:bg-container-raised",
// //             // "hover:text-2xl hover:font-bold cursor-pointer",
// //             "bg-neutral-100/60",
// //             "",
// //             ""
// //         )}
// //         aria-label="Browse Science"
// //     >
// //         Science
// //     </Link>
// // </div>

// // <div
// //     className={cn(
// //         "relative rotate-70 place-self-end",
// //         "bottom-17 left-19",
// //         "",
// //         ""
// //     )}
// // >
// //     <Link
// //         href={buildStoreUrl("Thrillers and Mystery")}
// //         className={cn(
// //             "aspect-auto -rotate-5 w-80 h-25 rounded-3xl shadow-xl",
// //             "flex items-center justify-center justify-self-end",
// //             "relative bottom-4 left-7 text-center text-2xl bg-emerald-950/50 dark:bg-emerald-200/30",
// //             "hover:scale-[1.02] transition-transform",
// //             "opacity-100",
// //             "brightness-100",
// //             "bg-container-raised bg-container-raised dark:bg-container-raised",
// //             // "hover:text-2xl hover:font-bold cursor-pointer",
// //             "bg-neutral-200/40",
// //             "",
// //             ""
// //         )}
// //         aria-label="Browse Thrillers and Mystery"
// //     >
// //         Thrillers and Mystery
// //     </Link>
// //     <Link
// //         href={buildStoreUrl("Crime")}
// //         className={cn(
// //             "aspect-auto w-90 h-20 rounded-3xl shadow-xl",
// //             "flex items-center justify-center",
// //             "text-center text-2xl bg-red-800/70 dark:bg-red-300/30",
// //             "hover:scale-[1.02] transition-transform",
// //             "opacity-100",
// //             "brightness-100",
// //             "bg-container-raised dark:bg-container-raised",
// //             // "hover:text-2xl hover:font-bold cursor-pointer",
// //             "bg-neutral-300/40",
// //             "",
// //             ""
// //         )}
// //         aria-label="Browse Crime"
// //     >
// //         Crime
// //     </Link>
// // </div>
