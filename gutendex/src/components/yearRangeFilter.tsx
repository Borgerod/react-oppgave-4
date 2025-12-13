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
		// <div className="grid grid-cols-2 justify-start justify-items-start w-fit">
		<div className="flex flex-row gap-2  justify-items-start w-full justify-items-between items-center justify-between">
			<span className="p-0 m-0 text-base">year</span>
			<div className="flex gap-1 items-center">
				<input
					type="number"
					name="year_from"
					aria-label="Year from"
					placeholder="From"
					value={yearFrom}
					onChange={(e) => onYearFromChange(e.target.value)}
					className={cn(
						// "w-full",
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
						// "h-12",
						// "h-15",
						"w-20",
						"w-16",
						"",
						// "px-0",
						// "px-0",
						"sm:h-full",
						"text-lg sm:text-sm",
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
						// "h-12",
						// "h-15",
						"w-20",
						"w-16",
						"sm:h-full",
						"text-lg sm:text-sm",
						""
					)}
				/>
			</div>
		</div>
	);
}
