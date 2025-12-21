import { cn } from "@/utils/cn";
import React from "react";
import Link from "next/link";

function buildStoreUrl(topic: string) {
	const params = new URLSearchParams();
	params.append("topic", topic);
	return `/store?${params.toString()}`;
}

type BookShelfProps = Record<string, never>;

export default function BookShelf({}: BookShelfProps) {
	return (
		// <div className="w-full">
		// 	<h3 className="text-xl">BookShelf</h3>
		// 	<div
		// 		className={cn(
		// 			"flex flex-row gap-2 overflow-auto w-full",
		// 			"",
		// 			""
		// 		)}
		// 	>
		// 		<div className="aspect-auto  h-60 w-30 rounded-3xl shadow-xl"></div>
		// 		<div className="aspect-auto  h-60 w-30 rounded-3xl shadow-xl"></div>
		// 		<div className="aspect-auto  h-60 w-30 rounded-3xl shadow-xl"></div>
		// 		<div className="aspect-auto  h-60 w-30 rounded-3xl shadow-xl"></div>
		// 		<div className="aspect-auto  h-60 w-30 rounded-3xl shadow-xl"></div>
		// 		<div className="aspect-auto  h-60 w-30 rounded-3xl shadow-xl"></div>
		// 		<div className="aspect-auto  h-60 w-30 rounded-3xl shadow-xl"></div>
		// 		<div className="aspect-auto  h-60 w-30 rounded-3xl shadow-xl"></div>
		// 	</div>
		// </div>

		//? ALTERNATIV
		// <div className="w-full py-10">
		// 	<h3 className="text-xl">BookShelf</h3>
		// 	<div className="flex flex-row w-fit gap-2 content-baseline">
		// 		<div className="relative rotate-10 right-5 place-self-end">
		// 			<h3 className="aspect-auto  h-90 w-20 rounded-3xl shadow-xl place-self-end text-2xl">
		// 				placeholder
		// 			</h3>
		// 		</div>
		// 		<div
		// 			className={cn(
		// 				"flex flex-row gap-1 w-full",
		// 				"justify-self-end",
		// 				"place-self-end ",
		// 				""
		// 			)}
		// 		>
		// 			<h3 className="aspect-auto  h-100 w-20 rounded-3xl shadow-xl place-self-end  text-2xl">
		// 				placeholder
		// 			</h3>
		// 			<h3 className="aspect-auto  h-60 w-20 rounded-3xl shadow-xl place-self-end  text-2xl">
		// 				placeholder
		// 			</h3>
		// 			<h3 className="aspect-auto  h-90 w-20 rounded-3xl shadow-xl place-self-end  text-2xl">
		// 				placeholder
		// 			</h3>
		// 		</div>
		// 		<div className="relative rotate-10 left-6 place-self-end">
		// 			<h3 className="aspect-auto  h-90 w-20 rounded-3xl shadow-xl text-2xl">
		// 				placeholder
		// 			</h3>
		// 		</div>
		// 		<div className="flex flex-row relative rotate-90 top-8 left-13 gap-1">
		// 			<h3 className="aspect-auto  h-70 w-30 rounded-3xl shadow-xl text-2xl">
		// 				placeholder
		// 			</h3>
		// 			<h3 className="aspect-auto  h-95 w-18 rounded-3xl shadow-xl relative top-5 text-2xl">
		// 				placeholder
		// 			</h3>
		// 			<h3 className="aspect-auto  h-90 w-20 rounded-3xl shadow-xl text-2xl">
		// 				placeholder
		// 			</h3>
		// 			<h3 className="aspect-auto  h-100 w-15 rounded-3xl shadow-xl relative bottom-12 text-2xl">
		// 				placeholder
		// 			</h3>
		// 		</div>

		// 		<div className="relative -rotate-20 left-32 place-self-end">
		// 			<h3 className="aspect-auto  h-90 w-20 rounded-3xl shadow-xl text-2xl">
		// 				placeholder
		// 			</h3>
		// 		</div>
		// 		<div className="relative -rotate-25 left-37 place-self-end">
		// 			<h3 className="aspect-auto  h-80 w-25 rounded-3xl shadow-xl text-2xl">
		// 				placeholder
		// 			</h3>
		// 		</div>
		// 	</div>
		// </div>
		<div className="py-30 relative right-15">
			<div className="w-full py-10 relative left-30">
				<div className="relative flex flex-row h-full w-full gap-1 items-end justify-start">
					<div className="absolute -left-41 bottom-30 z-10 rotate-290 origin-bottom ">
						<Link
							href={buildStoreUrl("Children & Young Adult")}
							className="aspect-auto w-90 h-20 rounded-3xl shadow-xl place-self-end flex items-center justify-center text-center text-2xl bg-amber-600/60 hover:scale-105 hover:text-2xl hover:font-bold cursor-pointer"
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
							"place-self-end ",
							""
						)}>
						<Link
							href={buildStoreUrl("Horror")}
							className="aspect-auto  w-100 h-20 rounded-3xl shadow-xl place-self-end flex items-center justify-center text-center text-2xl bg-red-800/70 hover:scale-105 hover:text-2xl hover:font-bold cursor-pointer"
							aria-label="Browse Horror">
							Horror
						</Link>
						<Link
							href={buildStoreUrl("Humour")}
							className="aspect-auto  w-60 h-20 rounded-3xl shadow-xl place-self-end flex items-center justify-center text-center text-2xl bg-red-700/70 hover:scale-105 hover:text-2xl hover:font-bold cursor-pointer"
							aria-label="Browse Humour">
							Humour
						</Link>
						<Link
							href={buildStoreUrl("Science Fiction")}
							className="aspect-auto  w-90 h-20 rounded-3xl shadow-xl place-self-end flex items-center justify-center text-center text-2xl bg-slate-800/70 hover:scale-105 hover:text-2xl hover:font-bold cursor-pointer"
							aria-label="Browse Science Fiction">
							Science Fiction
						</Link>
					</div>
					<div className="relative right-31 bottom-31 rotate-290 origin-bottom ">
						<Link
							href={buildStoreUrl("Adventure")}
							className="aspect-auto  w-90 h-20 rounded-3xl shadow-xl place-self-end flex items-center justify-center text-center text-2xl bg-emerald-800/50 hover:scale-105 hover:text-2xl hover:font-bold cursor-pointer"
							aria-label="Browse Adventure">
							Adventure
						</Link>
					</div>
					<div className="flex flex-col absolute rotate-0 -bottom-9 left-120 gap-1 items-end">
						<Link
							href={buildStoreUrl("Romance")}
							className="aspect-auto  w-70 h-30 rounded-3xl shadow-xl flex items-center justify-center text-center text-2xl bg-emerald-950/50 hover:scale-105 hover:text-2xl hover:font-bold cursor-pointer"
							aria-label="Browse Romance">
							Romance
						</Link>
						<Link
							href={buildStoreUrl("Literary Fiction")}
							className="aspect-auto  w-70 h-15 rounded-3xl shadow-xl relative right-5 flex items-center justify-center text-center text-2xl bg-amber-700/50 hover:scale-105 hover:text-2xl hover:font-bold cursor-pointer"
							aria-label="Browse Literary Fiction">
							Literary Fiction
						</Link>
						<Link
							href={buildStoreUrl("History")}
							className="aspect-auto  w-95 h-18 rounded-3xl shadow-xl relative right-5 flex items-center justify-center text-center text-2xl bg-indigo-950/70 hover:scale-105 hover:text-2xl hover:font-bold cursor-pointer"
							aria-label="Browse History">
							History
						</Link>
						<Link
							href={buildStoreUrl("Fantasy")}
							className="aspect-auto  w-90 h-20 rounded-3xl shadow-xl flex items-center justify-center text-center text-2xl bg-rose-950/60 hover:scale-105 hover:text-2xl hover:font-bold cursor-pointer"
							aria-label="Browse Fantasy">
							Fantasy
						</Link>

						<Link
							href={buildStoreUrl("Science")}
							className="aspect-auto  w-100 h-15 rounded-3xl shadow-xl relative left-12 flex items-center justify-center text-center text-2xl bg-amber-700/50 hover:scale-105 hover:text-2xl hover:font-bold cursor-pointer"
							aria-label="Browse Science">
							Science
						</Link>
					</div>

					<div className="relative  rotate-70 place-self-end bottom-17 left-19 ">
						<Link
							href={buildStoreUrl("Thrillers and Mystery")}
							className="aspect-auto  -rotate-5 w-80 h-25 rounded-3xl shadow-xl flex items-center justify-center text-center text-2xl justify-self-end relative bottom-4 left-7 bg-green-950/50 hover:scale-105 hover:text-2xl hover:font-bold cursor-pointer"
							aria-label="Browse Thrillers and Mystery">
							Thrillers and Mystery
						</Link>
						<Link
							href={buildStoreUrl("Crime")}
							className="aspect-auto  w-90 h-20 rounded-3xl shadow-xl flex items-center justify-center text-center text-2xl bg-red-800/70 hover:scale-105 hover:text-2xl hover:font-bold cursor-pointer"
							aria-label="Browse Crime">
							Crime
						</Link>
						{/* <h3 className="aspect-auto  w-90 h-20 rounded-3xl shadow-xl flex items-center justify-center text-center text-2xl bg-red-800/70 hover:scale-105 hover:text-2xl hover:font-bold cursor-pointer">
							Literary Fiction
						</h3> */}
					</div>
				</div>
			</div>
		</div>
	);
}
