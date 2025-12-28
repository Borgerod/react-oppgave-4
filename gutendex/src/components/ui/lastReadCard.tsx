import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMdClose } from "react-icons/io";

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

export default function LastReadCard({
	title = "Modern Design Systems",
	subtitle = "Explore the fundamentals of contemporary UI design",
	authors = "By Uknown Author",
	image,
	bookId,
	href,
	onRemove,
}: LastReadCardProps) {
	// coverSrc and shadowColor were unused; fallback handled inline
	return (
		<Link
			href={href}
			className={cn(
				// "group",
				// "hover:scale-[1.02]",

				// "transition-transform",
				// "transition-cpu",
				"transition-transform transform-gpu",
				"",
				"",
				""
			)}>
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
					"transform-cpu",
					"transition-transform transform-gpu",
					"bg-container-raised",
					"pb-2",
					// "min-w-20",
					// "max-w-40",
					"sm:w-50",
					"w-full",
					"max-w-50",
					// "sm:max-w-none",
					"",
					"",

					""
				)}>
				<button
					id="close-button"
					type="button"
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						if (bookId && onRemove) onRemove(bookId);
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
						"transition-transform transform-gpu",

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
						// "bg-black/30",
						"bg-linear-to-t from-black/40 via-black/10 to-transparent",
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

						"text-xl",
						"origin-top",
						// "hover:text-2xl",
						// "hover:font-black",
						"hover:scale-110",
						"group-hover:scale-105",
						"transition-transform transform-gpu",
						"",
						""
					)}>
					<IoMdClose
						className={cn(
							//
							// "w-4",
							// "h-4",
							// "size-full",
							"size-fit",
							"aspect-square",
							"p-2",
							"overflow-visible",

							"scale-101",
							"hover:scale-105",
							// "hover:bg-",
							"text-white/90",
							"dark:text-zinc-200/90",
							"transition-transform transform-gpu",
							"",
							"",
							""
						)}
					/>
				</button>

				<Image
					src={image || "/placeholder.svg"}
					alt={title || "Book cover"}
					height={400}
					width={300}
					className={cn(
						"rounded-xl ",
						"rounded-2xl ",
						"rounded-3xl ",
						"h-full",
						"w-full",
						// -----
						// "h-fit",
						// "h-full",
						// "sm:h-full",
						// "sm:w-full",
						// "w-full",
						// "w-fit",
						// -----
						// "max-h-50",
						// "max-w-50",
						"aspect-square",
						"object-cover",
						"row-start-1 col-start-1",
						"transition-transform transform-gpu",
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
						// "p-1",
						// "p-2",
						"px-3",
						"overflow-hidden",
						"wrap-break-word",
						"transition-transform transform-gpu",
						"",
						""
					)}>
					{/* <h3 className="text-primary text-sm font-bold leading-none mb-1 pr-3 transition-transform transform-gpu"> */}
					<h3
						className={cn(
							"text-primary text-sm font-bold leading-none mb-1 pr-3",
							"transition-transform transform-gpu",
							"line-clamp-2",
							"",
							""
						)}>
						{title}
					</h3>
					<p
						className={cn(
							"text-secondary text-xs font-medium tracking-wide leading-none italic",
							"transition-transform transform-gpu",
							"line-clamp-1",
							"",
							""
						)}>
						{subtitle}
					</p>
					{/* <p className="text-primary/80 text-[11px] font-medium tracking-wide"> */}
					{/* <p className="text-primary/80 text-base font-medium tracking-wide overflow-hidden wrap-break-word"> */}
					<p
						className={cn(
							"text-secondary text-xs font-medium tracking-wide overflow-hidden wrap-break-word",
							"transition-transform transform-gpu",
							"line-clamp-1",
							"",
							""
						)}>
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
					"transition-transform transform-gpu",
					"",
					"",
					""
				)}>
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
						"transition-transform transform-gpu",
						""
					)}>
					<Image
						src={image || "/placeholder.svg"}
						alt={title || "Book cover"}
						fill
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
						loading="eager"
						className={cn(
							"object-cover",
							"origin-left",
							"transform-gpu",
							"transition-transform transform-gpu",
							"",
							""
						)}
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
						"transition-transform transform-gpu",

						"",
						"",
						"",
						""
					)}>
					<div id="Blurred Background Layer">
						<Image
							src={image || "/placeholder.svg"}
							alt=""
							fill
							sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
							className={cn(
								"group",
								"object-cover blur-2xl scale-150 ",
								"opacity-85",
								"dark:opacity-40",
								"saturate-200",
								"transition-transform transform-gpu",
								""
							)}
						/>
						<div
							id="Dark Overlay for Text Readability"
							className={cn(
								"group",
								"absolute inset-0 bg-black/40",
								"dark:bg-foreground/10",
								"transition-transform transform-gpu",
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
							"transition-transform transform-gpu",
							"",
							""
						)}>
						<h3
							className={cn(
								"text-white text-sm font-bold leading-tight mb-1 pr-3",
								// ensure proper font smoothing to avoid "bolder" rasterization on transform
								"antialiased",
								"subpixel-antialiased",
								"leading-none",
								"transition-transform transform-gpu",
								"",
								""
							)}>
							{title}
							<span
								className={cn(
									"ml-2 text-white/50  font-medium tracking-wide italic",
									"antialiased",
									// "text-[11px]",
									"text-xs",
									// "text-base",
									"subpixel-antialiased",

									"leading-none",
									"transition-transform transform-gpu",
									"",
									""
								)}>
								{subtitle}
							</span>
						</h3>
						<p
							className={cn(
								"text-white/80 font-medium tracking-wide",
								"antialiased",
								// "text-[11px] ",

								"text-xs",
								// "text-sm",
								"subpixel-antialiased",
								"transition-transform transform-gpu",
								"",
								""
							)}>
							{authors}
						</p>
					</div>
					<button
						id="close-button"
						type="button"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							if (bookId && onRemove) onRemove(bookId);
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
							"bg-linear-to-t from-black/40 via-black/10 to-transparent",
							"bg-linear-to-t dark:from-black/20 dark:via-black/5 to-transparent",
							// "bg-linear-to-t dark:from-zinc-800/90 dark:via-zinc-800/5 dark:to-transparent",
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
							"hover:scale-110",
							"group-hover:scale-105",
							"transition-transform transform-gpu",
							// className,
							"",
							""
						)}>
						<IoMdClose
							className={cn(
								"group",
								"text-xl transition-transform",
								"transition-transform transform-gpu",
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
