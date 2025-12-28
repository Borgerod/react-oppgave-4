// import { cn } from "@/lib/utils";
import React from "react";
import { cn } from "@/utils/cn";
import { GoArrowUpRight } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import PlaceholderBookCover from "./PlaceholderBookCover";

interface HighLightCardProps {
	title?: string | undefined;
	subtitle?: string;
	authors?: string[] | string;
	image?: string;
	badge?: {
		text: string | React.ReactNode;
		variant: "pink" | "indigo" | "orange";
	};
	icon?: boolean;
	href?: string;
}

export default function HighLightCard({
	title = "Modern Design Systems",
	subtitle = "Explore the fundamentals of contemporary UI design",
	authors = "By Unknown Author",
	image,
	badge = { text: "Top", variant: "pink" },
	href = "https://kokonutui.com/",
}: // icon,
HighLightCardProps) {
	return (
		<div
			className={cn(
				"rounded-3xl",
				"overflow-hidden",
				"w-full",
				"hover:scale-102",

				"transition-all duration-300",
				""
			)}>
			<Link
				href={href}
				className={cn(
					"block",
					"w-full",
					// "h-full",
					// " max-w-[220px]",
					"group",
					// "hover:scale-102",
					// "hover:scale-103",
					// "hover:scale-[1.02]",
					"transition-transform",
					// experimental
					// "w-fit",
					// "w-full",
					"sm:w-full",
					// "sm:w-full",
					// "sm:w-fit",
					// "w-full",
					// "min-w-40",
					// "sm:max-w-[220px]",
					// "sm:min-w-40",
					// "sm:min-w-20",
					// "sm:min-w-25",
					"md:min-w-35",
					"sm:min-w-40",
					"sm:min-w-none",
					"sm:min-w-45",
					// "sm:w-fit",
					// "sm:mx-auto",
					// "w-fit sm:w-fit",

					// "inset-1",
					// "-inset-1",

					// "bg-white/80 dark:bg-zinc-900/80",
					"backdrop-blur-xl",
					// "border ",
					// "border border-zinc-200/50 dark:border-zinc-800/50",
					// "border-edge-highlight",
					// "border-edge-dark",
					"border ",
					"border-transparent",
					"hover:border-edge-highlight/50",
					"shadow-xs",

					//!NOTE try removing this
					// "hover:shadow-md",

					"shadow-lg",
					//!NOTE try removing this, while figuring out what makes highlight card weird in darkmove hover
					// "hover:border-zinc-300/50 ",
					// "dark:hover:border-zinc-700/50",
					// "bg-amber-300",

					"scale-101",
					"",
					""
				)}>
				{/* <div className="relative h-[320px] overflow-hidden"> */}
				<div
					id="highlightcard-image-container"
					className={cn(
						"relative",
						"overflow-hidden",

						////! OPTION 1:
						"h-44",
						"w-full",

						////! OPTION 2:
						// "h-full",
						// "aspect-square",

						////! OPTION 3:
						// "h-full",
						// "aspect-2/3",

						// "rounded-3xl",
						// "overflow-hidden",

						"",
						""
					)}>
					{image ? (
						<Image
							src={image}
							alt={title ?? "cover"}
							// width={64}
							// height={96}
							width={250}
							height={200}
							className={cn(
								"w-full",
								"object-cover",
								// "h-full",
								// "object-contain",
								// "object-fill",

								// "grid grid-rows-[auto_1fr_auto]",
								// "justify-items-center",
								// "content-start",
								//! NOTE: will try removing all max-w/max-h
								//! NOTE: will try removing h-full (you get to see top parts of cover)
								//! NOTE: will try removing aspect-ratio + rounded + overflow  (i dont see it makes any diff)

								// "max-w-30 sm:max-w-none",
								// "min-h-40 sm:min-h-none",
								// "max-w-none",
								// "min-h-none",
								// "aspect-2/3",
								// "rounded-xl",
								// "rounded-2xl",
								// "overflow-hidden",
								// "rounded-3xl",
								// "overflow-hidden",

								"",
								""
							)}
						/>
					) : (
						<PlaceholderBookCover
							title={{ main: title, sub: subtitle }}
							authorsText={
								Array.isArray(authors)
									? authors.join(", ")
									: authors
							}
						/>
					)}
				</div>

				<div
					id="highlightcard-overlay"
					className={cn(
						"absolute",
						// "inset-0",
						"-inset-1",

						"",
						"bg-linear-to-t from-black/90 via-black/40 to-transparent",
						// "overflow-hidden",
						// "rounded-3xl",

						// "bg-amber-300",
						"",
						""
					)}
				/>

				<div
					id="highlightcard-badge"
					className="absolute top-3 right-3">
					{badge ? (
						typeof badge.text === "string" ? (
							<span
								id="badge tag"
								className={cn(
									"px-2.5 py-1 rounded-full text-xs font-medium",
									"bg-white/90 text-zinc-800",
									"dark:bg-zinc-900/90 dark:text-zinc-200",
									"backdrop-blur-md",
									"shadow-xs",
									"border border-white/20 dark:border-zinc-800/50"
								)}>
								{badge.text}
							</span>
						) : (
							// For icon badges (used for favorites), use the same
							// rounded overlay button styling as ProductCard's
							// favorite button so the hearts look consistent.

							<div
								id="highlightcard-badge-icon"
								className={cn(
									"w-8 h-8 flex items-center justify-center rounded-full",
									// "bg-white",
									"bg-zinc-800/40",
									"hover:bg-zinc-600/50",
									"dark:bg-zinc-800/50",
									"backdrop-blur-md",
									// "hover:bg-white/20",

									//!NOTE try removing this, while figuring out what makes highlight card weird in darkmove hover
									// " hover:dark:bg-zinc-700/50",

									"transition-colors duration-300 group",
									"cursor-pointer",
									"shrink-0",
									"shadow-xs",
									// "border border-white/10 dark:border-zinc-800/30",
									"",
									""
								)}>
								{React.isValidElement(badge.text)
									? React.cloneElement(
											badge.text as React.ReactElement<{
												className?: string;
											}>,
											{
												className: cn(
													// ensure icon sizing and inherit color
													// "w-4 h-4",
													// "w-2.5 h-2.5",
													"top-0 right-0",
													"",
													"",

													"text-white dark:text-zinc-200",

													// preserve any existing className on the element
													(
														badge.text as React.ReactElement<{
															className?: string;
														}>
													).props?.className ?? ""
												),
											}
									  )
									: badge.text}
							</div>
						)
					) : null}
				</div>

				<div
					id="highlightcard-footer"
					className="absolute bottom-0 left-0 right-0 p-3">
					<div
						id="highlightcard-footer-row"
						className="flex items-center justify-between gap-3 pr-6">
						<div
							id="highlightcard-text"
							className="space-y-1.5 min-w-0"
							// className="space-y-1.5 min-w-0"
						>
							<h3 className="text-xs sm:text-base font-semibold text-white dark:text-zinc-100 leading-snug line-clamp-3">
								{title}
							</h3>
							<p className="text-sm text-zinc-200 dark:text-zinc-300 line-clamp-1">
								{subtitle}
							</p>
						</div>
						<div
							id="highlightcard-action"
							className={cn(
								"p-1.5 rounded-full",
								"bg-white/10 dark:bg-zinc-800/50",
								"backdrop-blur-md",

								//!NOTE try removing this, while figuring out what makes highlight card weird in darkmove hover
								"group-hover:bg-white/20",
								"dark:group-hover:bg-zinc-700/50",

								"transition-colors duration-300 group",
								"cursor-pointer",
								"shrink-0",
								"absolute right-3 bottom-3",
								"",
								""
							)}>
							<GoArrowUpRight className="w-3 h-3 text-white group-hover:-rotate-12 transition-transform duration-300" />
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
}
