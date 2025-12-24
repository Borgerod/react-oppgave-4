import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getDominantColors } from "@/utils/color-utils";
import { IoMdClose } from "react-icons/io";

type LastReadCardProps = {
	title?: string;
	subtitle?: string;
	image?: string;
	badge?: {
		text: string | React.ReactNode;
		variant: "pink" | "indigo" | "orange";
	};
	href?: string;
};

const FALLBACK_COVER = "/Blank-Book-Cover-PNG-Picture.png";

export default function LastReadCard({
	title = "Modern Design Systems",
	subtitle = "Explore the fundamentals of contemporary UI design",
	image,
	// badge = { text: "Top", variant: "pink" },
	href = "https://kokonutui.com/",
}: LastReadCardProps) {
	const coverSrc = image ?? FALLBACK_COVER;
	const shadowColor = "rgba(10, 17, 24, 0.4)";
	const [dominantColor, setDominantColor] = useState<string>("59, 94, 91");

	useEffect(() => {
		// todo: fix this
	}, [image]);

	return (
		<div>
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
					"group",
					"transition-transform",
					"hover:scale-[1.02]",
					""
				)}
			>
				<span
					id="badge icon"
					className={cn(
						"w-8 h-8 flex items-center justify-center rounded-full z-10",
						"bg-primary/10 text-white",
						"bg-primary-inv/10 text-white",
						"dark:bg-transparent dark:text-zinc-200",
						"dark:bg-primary-inv/10 dark:text-zinc-200",
						"hover:dark:bg-primary-inv/20 hover:dark:text-zinc-50",
						"hover:bg-primary-inv/20 hover:text-zinc-50",
						"transition-transform",
						"group-hover:scale-[1.02]",
						"backdrop-blur-sm",
						"focus:outline-none",
						"opacity-100",
						"cursor-pointer",
						"shadow-xs",
						"border border-white/10 dark:border-zinc-800/30",
						"col-start-1 row-start-1 justify-self-end",
						"p-0 m-2 ",
						""
					)}
				>
					<IoMdClose className="text-xl " />
				</span>
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
						""
					)}
				>
					<h3 className="text-primary text-sm font-bold leading-tight mb-1 pr-3">
						{title}
					</h3>
					<p className="text-primary/80 text-[11px] font-medium tracking-wide">
						{subtitle}
					</p>
				</div>
			</div>

			{/* ______________________________________________ */}

			<div
				id="large-cards"
				className={cn(
					"hidden md:flex ",
					" w-full ",
					"min-w-[260px] max-w-[320px]",
					"items-center rounded-[20px]",
					"shadow-2xl",
					"group",
					"transition-transform",
					"hover:scale-[1.02]",
					"relative ",
					"h-full",
					"h-40",
					"mt-5",
					""
				)}
			>
				<div
					id="book-cover"
					className={cn(
						"absolute  left-4 h-[140px] w-[94px] ",
						"shrink-0 overflow-hidden ",
						"rounded-xl shadow-[0_14px_36px_rgba(0,0,0,0.45)] z-20",
						"bottom-5",
						"h-full",
						""
					)}
				>
					<Image
						src={image || "/placeholder.svg"}
						alt={title}
						fill
						className="object-cover"
						priority
					/>
				</div>
				<div
					id="colored-container"
					className={cn(
						"relative z-10 ",
						" overflow-hidden ",
						"shadow-xl",
						"h-[120px] w-full ",
						"min-w-[260px] max-w-[320px] ",
						"items-center ",
						"rounded-3xl ",
						"p-4 ",
						"shadow-lg ",
						"h-full",
						""
					)}
				>
					<div id="Blurred Background Layer">
						<Image
							src={image || "/placeholder.svg"}
							alt=""
							fill
							className={cn(
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
								"absolute inset-0 bg-black/40",
								"dark:bg-foreground/10",
								""
							)}
						/>
					</div>

					<div
						id="Content Layer"
						className={cn(
							"relative z-10 h-full p-4 pl-20 flex flex-col justify-center ml-12",
							""
						)}
					>
						<h3 className="text-white text-sm font-bold leading-tight mb-1 pr-3">
							{title}
						</h3>
						<p className="text-white/80 text-[11px] font-medium tracking-wide">
							{subtitle}
						</p>
					</div>
					<span
						id="badge icon"
						className={cn(
							"w-8 h-8 flex items-center justify-center rounded-full z-10",
							"bg-primary/10 text-white",
							"bg-primary-inv/10 text-white",
							"dark:bg-transparent dark:text-zinc-200",
							"dark:bg-primary/10 dark:text-zinc-200",
							"hover:dark:bg-primary-inv/20 hover:dark:text-zinc-50",
							"hover:bg-primary-inv/20 hover:text-zinc-50",
							"transition-transform",
							"group-hover:scale-[1.02]",
							"backdrop-blur-sm",
							"focus:outline-none",
							"opacity-100",
							"cursor-pointer",
							"shadow-xs",
							"border border-white/10 dark:border-zinc-800/30",
							"absolute top-2 right-2",
							"p-0 m-0 ",
							""
						)}
					>
						<IoMdClose
							className={cn(
								"text-xl transition-transform",
								"group-hover:scale-[1.02]",
                                "",
                                ""
                            )}
                        />
                    </span>
				</div>
			</div>
		</div>
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
// 					id="badge icon"
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
