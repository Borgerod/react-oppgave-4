import { cn } from "@/utils/cn";
import { Tag } from "./tag";

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
		<div
			className={cn(
				"grid grid-cols-1",
				"justify-start justify-items-start",
				"items-start content-start",
				"sm:border-none border-b border-divider",
				"py-5 gap-2 ",
				"py-0 gap-2 ",
				"pb-5 sm:pb-0",
				"w-full",
				"max-w-full",
				// "h-full",

				"",
				""
			)}
		>
			<span
				className={cn(
					"p-0",
					"m-0",
					"text-base",
					"text-xl",

					"",
					""
				)}
			>
				{label}
			</span>
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
					// "text-sm",
					"p-1",
					"pl-4",
					"border border-foreground/10",
					"border border-divider",
					"rounded-full",
					"w-full",
					"hover:border-edge-highlight",
					"text-lg",
					"sm:text-sm",
					"sm:text-base",
					"sm:text-md",
					// "justify-items-center",
					// // "justify-content-center",
					// "items-baseline",
					// "leading-none",

					"h-12",
					// "sm:h-fit",
					"",
					""
				)}
			/>

			{filteredItems.length === 0 ? (
				<div
					className={cn(
						"text-xs",
						"text-muted",

						"",
						""
					)}
				>
					No {label} match.
				</div>
			) : (
				<ul
					className={cn(
						"flex flex-wrap",
						"gap-1",
						"content-start",
						"w-full",
						"max-h-24",
						"max-h-32",
						"sm:max-h-35",
						"sm:max-h-39",
						"lg:max-h-40",
						"overflow-y-auto",
						// "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
						"px-2.5",
						"gap-1.5",
						"sm:gap-1.5",
						"sm:gap-1",
						"overflow-x-hidden",
						"",
						"",
						""
					)}
				>
					{filteredItems.map((item, index) => {
						const id = itemIdGetter(item, index);
						return (
							<li key={id}>
								<Tag
									id={id}
									item={item}
									checked={!!selectedItems[item]}
									onToggle={() => onToggleItem(item)}
									bigText
								/>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
