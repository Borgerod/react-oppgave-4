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
	return (
		<div className="flex flex-row gap-2  justify-items-start w-full justify-items-between items-center justify-between sm:justify-between">
			<span className="p-0 m-0 text-base">Year</span>
			<div className="flex gap-1 items-center">
				<input
					type="number"
					name="year_from"
					aria-label="Year from"
					placeholder="From"
					value={yearFrom}
					onChange={(e) => onYearFromChange(e.target.value)}
					className={cn(
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
						"w-20",
						"w-16",
						"sm:w-16",
						"sm:w-20",
						"w-fit",
						"text-lg sm:text-sm",
						"px-2",
						"",
						""
					)}
				/>
				<span className="text-sm">-</span>
				<input
					type="number"
					name="year_to"
					aria-label="Year to"
					placeholder="To"
					value={yearTo}
					onChange={(e) => onYearToChange(e.target.value)}
					className={cn(
						"w-full",
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
						"w-full",
						"hover:border-edge-highlight",
						"w-20",
						"w-16",
						"sm:w-16",
						"sm:w-20",
						"w-fit",
						"text-lg sm:text-sm",
						"px-2",
						"",
						""
					)}
				/>
			</div>
		</div>
	);
}
