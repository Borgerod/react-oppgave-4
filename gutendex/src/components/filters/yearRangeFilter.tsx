import { cn } from "@/utils/cn";

type YearRangeFilterProps = {
	yearFrom: string;
	yearTo: string;
	onYearFromChange: (value: string) => void;
	onYearToChange: (value: string) => void;
};

export default function YearRangeFilter({
	yearFrom,
	yearTo,
	onYearFromChange,
	onYearToChange,
}: YearRangeFilterProps) {
	const yearInputStyling = [
		"bg-transparent",
		"placeholder:italic",
		"outline-none",
		"focus:outline-none",
		"flex flex-row items-center",
		"bg-container",
		"text-sm",
		"p-1",
		"border border-foreground/10",
		"focus:outline-none focus:ring-2 focus:ring-accent",
		"rounded-full",
		"hover:border-edge-highlight",
		"text-lg",
		"sm:text-sm",
		"px-2",
		"py-2.5",
		"sm:py-1",
		//
		"w-20",
		"w-40",
		"sm:w-30",
		// "w-16",
		// "sm:w-16",
		// "sm:w-20",
		// "w-fit",
		// "w-full",
		"text-lg",
		"sm:text-lg",

		"lg:flex-col",
		// "lg:grid-rows-2 lg:grid-cols-1",
		// "lg:rows-start-2 lg:cols-start-1",

		"",
		"",
	];

	return (
		//! ORIGINAL YEAR RANGE
		<div
			className={cn(
				"gap-2",
				"w-full",
				"flex",
				"justify-between",

				// OPTION 1
				"flex-row",
				"items-center",
				"lg:flex-col",
				"lg:items-start ",
				// OPTION 2
				"flex-col",
				"items-start ",

				"",
				""
			)}>
			<span
				className={cn(
					"p-0",
					"m-0",
					"text-base",

					"text-xl",

					"",
					""
				)}>
				{/* Author year range */}
				{/* Author's alive between */}
				Books written between
				{/* Year */}
			</span>
			<div
				className={cn(
					"flex",
					"flex-row",
					"gap-1",
					"items-center",

					"",
					""
				)}>
				<input
					type="number"
					name={yearFrom ? "year_from" : undefined}
					aria-label="Year from"
					placeholder="From"
					value={yearFrom}
					onChange={(e) => onYearFromChange(e.target.value)}
					className={cn(
						// OPTION 1
						yearInputStyling,

						//OPTION 2
						"w-full",
						"h-12",

						"",
						""
					)}
				/>
				<span
					className={cn(
						// "text-sm",
						"text-lg",

						"",
						""
					)}>
					-
				</span>
				<input
					type="number"
					name={yearTo ? "year_to" : undefined}
					aria-label="Year to"
					placeholder="To"
					value={yearTo}
					onChange={(e) => onYearToChange(e.target.value)}
					className={cn(
						// OPTION 1
						yearInputStyling,

						//OPTION 2
						"w-full",
						"h-12",

						"",
						""
					)}
				/>
			</div>
		</div>

		//* ALTERNATIV YEAR RANGE
		// <div
		// 	className={cn(
		// 		"gap-2",
		// 		"w-full",
		// 		"flex",
		// 		"justify-between",
		// 		"text-lg",
		// 		"text-xl",
		// 		// "font-semibold",

		// 		// OPTION 1
		// 		"flex-row",
		// 		"items-center",

		// 		// OPTION 2
		// 		"flex-col",
		// 		"items-start ",
		// 		"",
		// 		""
		// 	)}
		// >
		// 	<span
		// 		className={cn(
		// 			"p-0",
		// 			"m-0",
		// 			// "text-md",
		// 			"",
		// 			""
		// 		)}
		// 	>
		// 		{/* Author year range */}
		// 		{/* Author's alive between */}
		// 		Books written between
		// 	</span>
		// 	<div
		// 		className={cn(
		// 			"flex",
		// 			"flex-row",
		// 			"gap-1",
		// 			"items-center",
		// 			"w-full",
		// 			"justify-between",
		// 			"",
		// 			""
		// 		)}
		// 	>
		// 		<span className="font-light text-lg text-secondary">
		// 			{/* Author born */}
		// 			{/* Author's year of birth */}
		// 			{/* Books made after */}
		// 			{/* Year from */}
		// 			Year start
		// 		</span>
		// 		<input
		// 			type="number"
		// 			name={yearFrom ? "year_from" : undefined}
		// 			aria-label="Year from"
		// 			placeholder="From"
		// 			value={yearFrom}
		// 			onChange={(e) => onYearFromChange(e.target.value)}
		// 			className={cn(
		// 				yearInputStyling,

		// 				"",
		// 				""
		// 			)}
		// 		/>
		// 	</div>
		// 	<div
		// 		className={cn(
		// 			"flex",
		// 			"flex-row",
		// 			"gap-1",
		// 			"items-center",
		// 			"w-full",
		// 			"justify-between",
		// 			// "text-lg",
		// 			"",
		// 			""
		// 		)}
		// 	>
		// 		<span className="font-light text-lg text-secondary">
		// 			{/* Author died */}
		// 			{/* Author's year of death */}
		// 			{/* Books made before */}
		// 			{/* Year to */}
		// 			Year end
		// 		</span>
		// 		<input
		// 			type="number"
		// 			name={yearTo ? "year_to" : undefined}
		// 			aria-label="Year to"
		// 			placeholder="To"
		// 			value={yearTo}
		// 			onChange={(e) => onYearToChange(e.target.value)}
		// 			className={cn(
		// 				yearInputStyling,

		// 				"",
		// 				""
		// 			)}
		// 		/>
		// 	</div>
		// </div>
	);
}
