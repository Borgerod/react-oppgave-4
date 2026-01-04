import { cn } from "@/utils/cn";
import { useRef } from "react";

import { useSearchParams } from "next/navigation";

export default function YearRangeFilter() {
	const searchParams = useSearchParams();
	const authorYearStart = searchParams.get("author_year_start") || "";
	const authorYearEnd = searchParams.get("author_year_end") || "";
	const formRef = useRef<HTMLFieldSetElement>(null);
	const yearInputStyling = [
		// "w-full",
		"bg-transparent",
		"placeholder:italic",
		"outline-none",
		"focus_outline-none",
		"h-12",

		"bg-transparent",
		"placeholder:italic",
		"outline-none",
		"focus:outline-none",
		"flex",
		"items-center",
		"bg-container",
		"p-1",
		"pl-4",
		"border",
		"border-divider",
		"rounded-full",
		"hover:border-edge-dark",
		"text-lg",
		"h-12",
		"appearance-none",
		"[appearance:textfield]",
		"[&::-webkit-outer-spin-button]:appearance-none",
		"[&::-webkit-inner-spin-button]:appearance-none",
		"inset-shadow-sm",
		// "bg-",
		"bg-edge/50",
		"dark:bg-edge-dark/50",
		"border-edge-dark/50",
		"border-edge/30",
		"dark:hover:border-edge/50",
		"w-full",
		"w-fit",
		"w-33",
	];

	return (
		<fieldset
			ref={formRef}
			className={cn(
				"grid",
				"grid-cols-1",
				// "grid-cols-2",
				// "grid-rows-1",
				"justify-start",
				"items-start",
				"py-4",
				"gap-2",
				// "w-full",
				// "md:w-fit",
				"content-start",

				// "text-secondary",
				"h-fit",
				// "h-full",
				"",
				""
			)}>
			<div
				className={cn(
					// layout
					"flex", // Use Flexbox for easier alignment
					"flex-row", // Mobile: Side-by-side (Row)
					"sm:flex-col", // sm: Stacked (Column)

					// alignment
					"items-center", // Mobile: Center vertically
					"sm:items-start", // sm: Align to start
					"justify-between",
					// sizing
					"md:w-fit",
					"h-fit",
					// spacing
					// "gap-4", // Mobile: Gap between legend and buttons
					"gap-1", // Mobile: Gap between legend and buttons
					"gap-5", // Mobile: Gap between legend and buttons
					"sm:gap-2", // sm: Smaller gap when stacked
					"",
					""
				)}>
				<legend
					className={cn(
						"p-0",
						"m-0",
						"text-base",
						"text-xl",
						"row-start-1"
					)}>
					{/* Books written between */}
					Written between
				</legend>
				<ul
					aria-label="Filter by copyright status"
					className={cn(
						// layout
						"grid",
						"grid-flow-col",
						"place-items-center",
						// "row-start-3",
						// sizing
						"w-fit",
						"h-12",
						"max-h-50",
						// spacing
						"p-1",
						"gap-1",
						// border
						// "border",
						// "border-edge/30",
						// "rounded-full",
						// background

						"",
						""
					)}>
					<input
						type="number"
						name="author_year_start"
						aria-label="Year from"
						placeholder="From year"
						defaultValue={authorYearStart}
						className={cn(...yearInputStyling, "", "")}
					/>
					<span className={cn("")}>-</span>
					<input
						type="number"
						name="author_year_end"
						aria-label="Year to"
						placeholder="To year"
						defaultValue={authorYearEnd}
						className={cn(...yearInputStyling)}
					/>
				</ul>
			</div>
		</fieldset>
	);
}
