// import { cn } from "@/lib/utils";
import React from "react";
import { cn } from "@/utils/cn";
import { GoArrowUpRight } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";

interface HighLightCardProps {
	title?: string;
	subtitle?: string;
	image?: string;
	badge?: {
		text: string | React.ReactNode;
		variant: "pink" | "indigo" | "orange";
	};
	href?: string;
}

export default function HighLightCard({
	title = "Modern Design Systems",
	subtitle = "Explore the fundamentals of contemporary UI design",
	image,
	badge = { text: "Top", variant: "pink" },
	href = "https://kokonutui.com/",
}: HighLightCardProps) {
	return (
		<Link
			href={href}
			className={cn(
				"block ",
				"w-full",
				// "h-full",
				// " max-w-[220px]",
				" group ",
				"hover:scale-105",
				"",
				// experimental
				// "w-fit",
				// "w-full",
				"sm:w-full",
				// "sm:w-full",
				// "sm:w-fit",
				// "w-full",
				// "min-w-40",
				// " sm:max-w-[220px]",
				// "sm:min-w-40",
				// "sm:min-w-20",
				// "sm:min-w-25",
				"md:min-w-35",
				" sm:min-w-40",
				" sm:min-w-none",
				" sm:min-w-45",

				// "sm:w-fit",
				// "sm:mx-auto",

				// "w-fit sm:w-fit",
				"",
				""
			)}
		>
			<div
				className={cn(
					"relative overflow-hidden rounded-3xl",
					"bg-white/80 dark:bg-zinc-900/80",
					"backdrop-blur-xl",
					"border border-zinc-200/50 dark:border-zinc-800/50",
					"shadow-xs",
					"transition-all duration-300",
					"hover:shadow-md",
					"shadow-lg",
					"hover:border-zinc-300/50 dark:hover:border-zinc-700/50"
				)}
			>
				{/* <div className="relative h-[320px] overflow-hidden"> */}
				<div
					className={cn(
						"relative h-44 overflow-hidden",
						`${image ? "" : "scale-110"}`,
						"",
						""
					)}
				>
					<Image
						src={
							image ? image : "/Blank-Book-Cover-PNG-Picture.png"
						}
						alt={title}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="object-cover"
					/>
				</div>

				<div
					className={cn(
						"absolute inset-0",
						"bg-linear-to-t from-black/90 via-black/40 to-transparent"
					)}
				/>

				<div className="absolute top-3 right-3">
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
								)}
							>
								{badge.text}
							</span>
						) : (
							// For icon badges (used for favorites), use the same
							// rounded overlay button styling as ProductCard's
							// favorite button so the hearts look consistent.
							<span
								id="badge icon"
								className={cn(
									"w-8 h-8 flex items-center justify-center rounded-full z-10",
									"bg-white/10 text-white",
									"dark:bg-transparent dark:text-zinc-200",
									"backdrop-blur-sm",
									"focus:outline-none",
									"opacity-100",
									"cursor-pointer",
									"shadow-xs",
									"border border-white/10 dark:border-zinc-800/30"
								)}
							>
								{React.isValidElement(badge.text)
									? React.cloneElement(
											badge.text as React.ReactElement<{
												className?: string;
											}>,
											{
												className: cn(
													// ensure icon sizing and inherit color
													"w-4 h-4",
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
							</span>
						)
					) : null}
				</div>

				{/* no favorite button here (moved to ProductCard) */}

				<div className="absolute bottom-0 left-0 right-0 p-3">
					<div className="flex items-center justify-between gap-3">
						<div className="space-y-1.5 min-w-0">
							<h3 className="text-xs sm:text-base font-semibold text-white dark:text-zinc-100 leading-snug line-clamp-3">
								{title}
							</h3>
							<p className="text-sm text-zinc-200 dark:text-zinc-300 line-clamp-1">
								{subtitle}
							</p>
						</div>
						<div
							className={cn(
								"p-1.5 rounded-full",
								"bg-white/10 dark:bg-zinc-800/50",
								"backdrop-blur-md",
								"group-hover:bg-white/20 dark:group-hover:bg-zinc-700/50",
								"transition-colors duration-300 group",
								"cursor-pointer",
								"shrink-0"
							)}
						>
							<GoArrowUpRight className="w-3 h-3 text-white group-hover:-rotate-12 transition-transform duration-300" />
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
