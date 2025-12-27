import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getDominantColors } from "@/utils/color-utils";
import { IoMdClose } from "react-icons/io";
import { Title } from "@/types";

type LastReadCardProps = {
	title?: string | undefined;
	subtitle?: string;
	authors?: string[] | string;
	image?: string;
	badge?: {
		text: string | React.ReactNode;
		variant: "pink" | "indigo" | "orange";
	};
	href: string;
	bookId?: number;
	onRemove?: (bookId: number) => void;
};

const FALLBACK_COVER = "/Blank-Book-Cover-PNG-Picture.png";

export default function LastReadCard({
	title = "Modern Design Systems",
	subtitle = "Explore the fundamentals of contemporary UI design",
	authors = "By Uknown Author",
	image,
	// badge = { text: "Top", variant: "pink" },
	// href = "https://kokonutui.com/",
	bookId,
	href,
	onRemove,
}: LastReadCardProps) {
	const coverSrc = image ?? FALLBACK_COVER;
	const shadowColor = "rgba(10, 17, 24, 0.4)";
	const [dominantColor, setDominantColor] = useState<string>("59, 94, 91");

	useEffect(() => {
		// todo: fix this
	}, [image]);

	return (
		<Link
			href={href}
			className={cn(
				// "group",
				// "hover:scale-[1.02]",

				// "transition-transform",
				// "transition-cpu",
				"",
				""
			)}
		>
			{/* <div className="hover:scale-105"> */}
			<div
				id="small-cards"
				className={cn(
					"grid grid-cols-1 grid-rows-2",
					"grid grid-cols-1 grid-rows-[3fr_1fr]",
					"w-50 h-70",
					"p-1 ",
					"bg-container",
					"rounded-3xl",
					"shadow-lg",
					"gap-3",
					"md:hidden",
					// "group",
					"hover:scale-[1.02]",
					"transition-transform",
					"transition-cpu",

					""
				)}
			>
				<button
					id="close-button"
					type="button"
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						bookId && onRemove?.(bookId);
					}}
					className={cn(
						"w-8 h-8 flex items-center justify-center rounded-full z-10",
						"col-start-1 row-start-1 justify-self-end",
						"p-0 m-2 ",
						"bg-zinc-800/40",
						"hover:bg-zinc-600/50",
						" dark:bg-zinc-800/50",
						"backdrop-blur-md",
						" hover:dark:bg-zinc-700/50",
						"text-primary-inv/80",
						"dark:text-primary/80",
						"hover:text-primary-inv",
						"dark:hover:text-primary",
						"transition-colors duration-300 group",
						"cursor-pointer",
						"shrink-0",
						"shadow-xs",

						"",
						// ""
						// "absolute",
						// "top-3",
						// "right-3",
						// "top-4",
						// "right-4",
						// "top-5",
						// "right-5",
						"w-8",
						"h-8",
						// "p-2",
						"flex",
						"items-center",
						"justify-center",
						"rounded-full",
						"z-10",

						"bg-white/10 text-white",
						"dark:bg-zinc-800/40 dark:text-zinc-200",
						"bg-zinc-800/10 dark:text-zinc-200",
						"hover:dark:bg-zinc-900/60 hover:dark:text-zinc-300",
						"hover:bg-zinc-900/30 hover:dark:text-zinc-300",
						// "border",
						"border-edge",
						// "border-edge-dark",
						// "border-edge-highlight",
						// "border-t-edge-highlight",
						// "border-t-edge",
						// "border-l-edge-highlight",
						// "border-b-edge-dark",
						// "border-r-edge-dark",
						"backdrop-blur-sm",
						"focus:outline-none",
						"opacity-100",
						"cursor-pointer",
						// "z-30",
						"overflow-visible",
						// "place-items-center",
						// "justify-items-center",
						// "items-center",
						// "justify-center",
						// "content-center",
						"hover:scale-105",
						// className,
						"",
						""
					)}
				>
					<IoMdClose className="text-xl" />
				</button>
				<Image
					src={image || "/placeholder.svg"}
					alt={title}
					height={400}
					width={300}
					className={cn(
						"rounded-xl ",
						"rounded-2xl ",
						"rounded-3xl ",
						"h-full w-full",
						"aspect-square",
						"object-cover",
						"row-start-1 col-start-1",
						"shadow-md",
						"z-1",
						""
					)}
				/>
				<div
					id="Content Layer"
					className={cn(
						"w-full h-full",
						"row-start-2 col-start-1",
						"z-2",
						"p-1",
						"px-3",
						""
					)}
				>
					<h3 className="text-primary text-sm font-bold leading-tight mb-1 pr-3">
						{title}
					</h3>
					{/* <p className="text-primary/80 text-[11px] font-medium tracking-wide">
						{subtitle}
					</p> */}
					<p className="text-primary/80 text-[11px] font-medium tracking-wide">
						{authors}
					</p>
				</div>
			</div>

			{/* ______________________________________________ */}

			<div
				id="large-cards"
				className={cn(
					"group",
					"hidden md:flex ",
					" w-full ",
					"min-w-[260px] max-w-[320px]",
					"min-w-64",
					// "max-w-80",
					"max-w-100",
					"items-center ",
					// "rounded-[20px]",
					"rounded-3xl",
					"shadow-2xl",
					"relative ",
					"h-40",
					"mt-5",
					// "group",
					// "hover:scale-[1.02]",
					// "transition-transform",
					// "hover:scale-[1.02]",

					"hover:scale-[1.02]",
					// "transition-transform",
					"transition-cpu",

					// "bg-amber-200",
					// "hover:bg-amber-600",
					"z-10",
					"pointer-events-auto",
					"",
					"",
					""
				)}
			>
				<div
					id="book-cover"
					className={cn(
						"group",
						"absolute left-4 ",
						// "h-[140px]",
						// "w-[94px] ",
						"h-40",
						"w-29",
						"shrink-0 overflow-hidden ",
						"rounded-xl z-20",
						"bottom-5",
						"shadow-xl",
						"h-full",
						""
					)}
				>
					<Image
						src={image || "/placeholder.svg"}
						alt={title}
						fill
						className={cn(
							"object-cover",
							"origin-left",
							"transform-gpu",
							"",
							""
						)}
						priority
					/>
				</div>
				<div
					id="colored-container"
					className={cn(
						"group",
						"relative z-10 ",
						" overflow-hidden ",
						"shadow-xl",
						"h-[120px]",
						"w-full ",
						// "min-w-[260px] ",
						// "max-w-[320px] ",
						"min-w-64",
						// "max-w-80",
						"max-w-100",
						"items-center ",
						"rounded-3xl ",
						"p-4 ",
						"shadow-lg ",
						"h-full",

						"",
						"",
						"",
						""
					)}
				>
					<div id="Blurred Background Layer">
						<Image
							src={image || "/placeholder.svg"}
							alt=""
							fill
							className={cn(
								"group",
								"object-cover blur-2xl scale-150 ",
								"opacity-85",
								"dark:opacity-40",
								"saturate-200",
								""
							)}
						/>
						<div
							id="Dark Overlay for Text Readability"
							className={cn(
								"group",
								"absolute inset-0 bg-black/40",
								"dark:bg-foreground/10",
								""
							)}
						/>
					</div>

					<div
						id="Content Layer"
						className={cn(
							// "group",
							// "group-hover:scale-[1.00]",
							"relative",
							"z-10",
							"h-full",
							"p-4",
							// "pl-20",
							// "ml-12",
							"ml-30",
							// "pl-34",
							"flex flex-col justify-center",
							"antialiased",
							"subpixel-antialiased",
							"",
							""
						)}
					>
						<h3
							className={cn(
								"text-white text-sm font-bold leading-tight mb-1 pr-3",
								// ensure proper font smoothing to avoid "bolder" rasterization on transform
								"antialiased",
								"subpixel-antialiased",
								"",
								""
							)}
						>
							{title}
							<span
								className={cn(
									"ml-2 text-white/50  font-medium tracking-wide italic",
									"antialiased",
									// "text-[11px]",
									"text-xs",
									// "text-base",
									"subpixel-antialiased",
									"",
									""
								)}
							>
								{subtitle}
							</span>
						</h3>
						<p
							className={cn(
								"text-white/80 font-medium tracking-wide",
								"antialiased",
								"text-[11px] ",
								"text-xs",
								"subpixel-antialiased",
								"",
								""
							)}
						>
							{authors}
						</p>
					</div>
					<button
						id="close-button"
						type="button"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							bookId && onRemove?.(bookId);
						}}
						// className={cn(
						// 	"w-8 h-8 flex items-center justify-center rounded-full z-10",
						// 	"col-start-1 row-start-1 justify-self-end",
						// 	"p-0 m-2 ",
						// 	"absolute top-2 right-2",
						// 	"w-8 h-8 flex items-center justify-center rounded-full",
						// 	"bg-zinc-800/40",
						// 	"hover:bg-zinc-600/50",
						// 	" dark:bg-zinc-800/50",
						// 	"backdrop-blur-md",
						// 	" hover:dark:bg-zinc-700/50",
						// 	"text-primary-inv/80",
						// 	"dark:text-primary/80",
						// 	"hover:text-primary-inv",
						// 	"dark:hover:text-primary",
						// 	"transition-colors duration-300 group",
						// 	"cursor-pointer",
						// 	"shrink-0",
						// 	"shadow-xs",
						// 	"",
						// 	""

						// )}

						aria-label={""}
						className={cn(
							"absolute",
							"top-3",
							"right-3",
							// "top-4",
							// "right-4",
							// "top-5",
							// "right-5",
							"w-8",
							"h-8",
							// "p-2",
							"flex",
							"items-center",
							"justify-center",
							"rounded-full",
							"z-10",

							"bg-white/10 text-white",
							"dark:bg-zinc-800/40 dark:text-zinc-200",
							"bg-zinc-800/10 dark:text-zinc-200",
							"hover:dark:bg-zinc-900/60 hover:dark:text-zinc-300",
							"hover:bg-zinc-900/30 hover:dark:text-zinc-300",
							// "border",
							"border-edge",
							// "border-edge-dark",
							// "border-edge-highlight",
							// "border-t-edge-highlight",
							// "border-t-edge",
							// "border-l-edge-highlight",
							// "border-b-edge-dark",
							// "border-r-edge-dark",
							"backdrop-blur-sm",
							"focus:outline-none",
							"opacity-100",
							"cursor-pointer",
							// "z-30",
							"overflow-visible",
							// "place-items-center",
							// "justify-items-center",
							// "items-center",
							// "justify-center",
							// "content-center",
							"hover:scale-105",
							// className,
							"",
							""
						)}
					>
						<IoMdClose
							className={cn(
								"group",
								"text-xl transition-transform",
								"",
								""
							)}
						/>
					</button>
				</div>
			</div>
		</Link>
	);
}

// DO NOT DELETE THIS
//! small cards with blurred background like large cards
// {/* <div
// 				id="small-cards"
// 				className={cn(
// 					// "relative flex h-[120px] w-full min-w-[260px] max-w-[320px] items-center rounded-[20px] shadow-2xl",
// 					// "transition-transform",
// 					// " hover:scale-[1.02]",
// 					// "relative ",
// 					"grid grid-cols-1 grid-rows-2",
// 					"grid grid-cols-1 grid-rows-[3fr_1fr]",
// 					"w-50 h-70",
// 					// "row-start-1 col-start-1",

// 					// "p-2 ",
// 					// "p-1 ",
// 					"bg-container",
// 					// "rounded-xl ",
// 					"rounded-3xl",
// 					"shadow-lg",
// 					// "shadow-[0_14px_36px_rgba(0,0,0,0.45)]",
// 					"gap-3",
// 					"md:hidden",
// 					// "hidden lg:visible",
// 					"",
// 					""
// 				)}
// 			>
// 				<div
// 					id="blurred image container"
// 					className={cn(
// 						//
// 						"col-span-full row-span-full",
// 						"col-start-1 row-start-1",
// 						// "bg-amber-400",
// 						"h-full w-full",
// 						"m-0 p-0",
// 						"rounded-3xl",

// 						// "backdrop-blur-xl",
// 						// "blur-2xl",
// 						"overflow-hidden",
// 						// "bg-black/70",
// 						"",
// 						"",
// 						"",
// 						""
// 					)}
// 				>
// 					<Image
// 						id="background test"
// 						className={cn(
// 							//
// 							"col-span-full row-span-full",
// 							"col-start-1 row-start-1",
// 							// "bg-amber-400",
// 							"h-full w-full",
// 							"m-0 p-0",
// 							"rounded-3xl",
// 							"brightness-70",
// 							"saturate-150",
// 							"backdrop-blur-xl",
// 							"blur-2xl",
// 							""
// 						)}
// 						src={image || "/placeholder.svg"}
// 						alt={title}
// 						// fill
// 						height={400}
// 						width={300}
// 					></Image>
// 					<div
// 						id="Dark Overlay for Text Readability"
// 						className={cn(
// 							"col-span-full row-span-full",
// 							"col-start-1 row-start-1",
// 							"h-full w-full rounded-3xl",
// 							// "absolute",
// 							"relative",
// 							"inset-0",
// 							"bg-black/40",
// 							//
// 							"z-2",
// 							"",
// 							"",
// 							""
// 						)}
// 					/>
// 				</div>

// 				<span
// 					id="close-button"
// 					className={cn(
// 						"w-8 h-8 flex items-center justify-center rounded-full z-10",
// 						"bg-white/10 text-white",
// 						// "bg-primary/30 text-white",
// 						"dark:bg-transparent dark:text-zinc-200",
// 						"backdrop-blur-sm",
// 						"focus:outline-none",
// 						"opacity-100",
// 						"cursor-pointer",
// 						"shadow-xs",
// 						"border border-white/10 dark:border-zinc-800/30",
// 						"col-start-1 row-start-1 justify-self-end",
// 						"p-0 m-0 ",
// 						"",
// 						""
// 					)}
// 				>
// 					<IoMdClose
// 						//
// 						// className="row-start-1 col-start-1"
// 						className="text-xl "
// 					/>
// 				</span>
// 				<Image
// 					src={image || "/placeholder.svg"}
// 					alt={title}
// 					// fill
// 					height={400}
// 					width={300}
// 					className={cn(
// 						// "absolute  left-4",
// 						// " h-[140px] w-[94px] ",
// 						// "shrink-0 overflow-hidden ",

// 						"rounded-xl ",
// 						"rounded-2xl ",
// 						"rounded-3xl ",
// 						// "shadow-[0_14px_36px_rgba(0,0,0,0.45)]",
// 						// "bottom-5",
// 						"h-full w-full",
// 						"aspect-square",
// 						"object-cover",
// 						"row-start-1 col-start-1",
// 						// "max-w-30 max-h-40 ",
// 						"shadow-md",
// 						"z-1",
// 						"p-1",
// 						"",
// 						""
// 					)}
// 					// priority
// 				/>
// 				<div
// 					id="Content Layer"
// 					className={cn(
// 						// "relative z-10 h-full p-4 pl-20 flex flex-col justify-center ml-12",
// 						"w-full h-full",
// 						"row-start-2 col-start-1",
// 						"z-2",
// 						"p-1",
// 						"p-2",
// 						"",

// 						""
// 					)}
// 				>
// 					{/* <h3 className="text-primary text-sm font-bold leading-tight mb-1 pr-3"> */}
// 					<h3 className="text-white text-sm font-bold leading-tight mb-1 pr-3">
// 						{title}
// 					</h3>
// 					{/* <p className="text-primary/80 text-[11px] font-medium tracking-wide"> */}
// 					<p className="text-white/80 text-[11px] font-medium tracking-wide">
// 						{subtitle}
// 					</p>
// 				</div>
// 			</div> */}
