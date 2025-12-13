import { cn } from "@/utils/cn";

type FilterInputProps = {
	label: string;
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
	items: string[];
	selectedItems: Record<string, boolean>;
	onToggleItem: (item: string) => void;
	getItemId?: (item: string, index: number) => string;
};

export default function FilterInput({
	label,
	value,
	onChange,
	placeholder,
	items,
	selectedItems,
	onToggleItem,
	getItemId,
}: FilterInputProps) {
	const defaultGetItemId = (item: string, index: number) =>
		`${label}-${index}-${item}`;
	const itemIdGetter = getItemId || defaultGetItemId;
	const filteredItems = items.filter((item) =>
		value ? item.toLowerCase().includes(value.toLowerCase()) : true
	);

	return (
		<div className="grid grid-cols-1 justify-start justify-items-start w-fit h-fit max-h-50 sm:border-none border-b border-divider py-5">
			{/* <div className="grid grid-cols-1 justify-start justify-items-start w-fit "> */}
			<span className="p-0 m-0 text-base">{label}</span>
			<input
				aria-label={`Filter ${label}`}
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
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
					"sm:h-full",
					"text-lg sm:text-sm",
					"",

					""
				)}
			/>

			{filteredItems.length === 0 ? (
				<div className="text-xs text-muted">No {label} match.</div>
			) : (
				// <ul className="flex flex-wrap gap-x-1 h-md h-30 w-50 overflow-auto content-start h-fit max-h-50">
				<ul className="flex flex-wrap gap-x-1 w-50 overflow-auto content-start h-fit max-h-50">
					{filteredItems.map((item, index) => {
						const id = itemIdGetter(item, index);
						return (
							<li key={id}>
								<input
									id={id}
									type="checkbox"
									name={item}
									aria-label={item}
									title={item}
									className="sr-only peer"
									checked={!!selectedItems[item]}
									onChange={() => onToggleItem(item)}
								/>
								<label
									htmlFor={id}
									className={cn(
										"text-xs font-thin px-2 py-0 rounded-full text-primary/80 bg-foreground/10 hover:bg-accent/50 dark:bg-foreground/25 dark:hover:bg-accent/50 hover:dark:text-primary-inv hover:text-primary active:dark:bg-accent-dark/50 active:bg-accent-dark/50",
										"peer-checked:bg-accent/50 peer-checked:dark:text-primary-inv peer-checked:text-primary",
										"",
										""
									)}
								>
									{item}
								</label>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
