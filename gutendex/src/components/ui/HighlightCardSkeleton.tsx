import React from "react";
import { cn } from "@/utils/cn";

interface HighlightCardSkeletonProps {
	button?: boolean;
}

export default function HighlightCardSkeleton({
	button = false,
}: HighlightCardSkeletonProps) {
	return (
		<div
			className={cn(
				"rounded-3xl",
				"overflow-hidden",
				"w-full",
				"bg-container-lowered",
				"",
				""
			)}>
			<div
				// href={href}
				className={cn(
					"block",
					"w-full",
					"group",
					"md:min-w-35",
					"sm:min-w-40",
					"border",
					"border-transparent",
					"scale-101",
					"",
					""
				)}>
				<div
					id="highlightcard-image-container"
					className={cn(
						"relative",
						"overflow-hidden",
						"h-44",
						"w-full",
						"",
						""
					)}></div>

				<div id="highlightcard-overlay" className={cn("")} />

				<div
					id="highlightcard-badge highlightcard-icon favorite-icon"
					className="absolute top-3 right-3">
					{button ? (
						<span
							id="badge tag"
							className={cn(
								"px-5 py-1 rounded-full text-xs font-medium",
								"border border-white/20 dark:border-zinc-800/50",
								"dark:bg-white/10",
								"bg-white/50",
								"",
								""
							)}></span>
					) : (
						<div
							id="highlightcard-badge-icon"
							className={cn(
								"w-8 h-8 flex items-center justify-center rounded-full",
								"bg-zinc-800/20",
								"dark:bg-white/10",
								"",
								""
							)}></div>
					)}
				</div>

				<div
					id="highlightcard-footer"
					className="absolute bottom-0 left-0 right-0 p-3">
					<div
						id="highlightcard-footer-row"
						className="flex items-center justify-between gap-3 pr-6">
						<div
							id="highlightcard-text"
							className={cn(
								"space-y-1.5",
								"min-w-0",
								"w-full",
								"mr-2",
								"",
								""
							)}>
							<h3
								className={cn(
									"bg-container-lowered",
									"rounded-full",
									"p-2",
									"px-10",
									"w-full",
									"mr-2",
									"bg-white/50",
									"dark:bg-zinc-100/40",
									"",
									""
								)}></h3>
							<p></p>
						</div>
						<div
							id="highlightcard-action"
							className={cn(
								"rounded-full",
								"absolute",
								"right-3",
								"bottom-3",
								"dark:bg-white/10",
								"bg-zinc-800/20",
								"p-3",
								"",
								""
							)}></div>
					</div>
				</div>
			</div>
		</div>
	);
}
