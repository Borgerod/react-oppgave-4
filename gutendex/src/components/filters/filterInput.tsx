import { cn } from "@/utils/cn";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { LanguageOptions } from "@/types";

type FilterInputProps = {
	label: string;
	name?: string; // name for form field, defaults to label
	options?: (string | LanguageOptions)[]; // list of options to show as checkboxes
	placeholder?: string;
	searchParamName: string; // query param for search input, defaults to `${label.toLowerCase()}Search`
	// key: string;
};

export default function FilterInput({
	label,
	options = [],
	placeholder,
	searchParamName,
}: FilterInputProps) {
	const searchParams = useSearchParams();
	const preSelected = searchParams.get(searchParamName) || "";
	const [selected, setSelected] = useState<string | null>(preSelected);

	return (
		<fieldset
			className={cn(
				"grid",
				"grid-cols-1",
				"justify-start",
				"items-start",
				// "border-b",
				// "border-divider",
				"py-4",
				"gap-2",
				// "gap-5",
				"w-full",
				"w-fit",
				"h-full",
				"content-start",
				"",
				""
			)}>
			<legend
				className={cn(
					"p-0",
					"m-0",
					"text-base",
					"text-xl",
					"row-start-1",
					"",
					""
				)}>
				{label}
			</legend>
			<input
				// TODO does not work, fix
				id="search-bar"
				type="text"
				name={searchParamName}
				aria-label={`Filter ${label}`}
				placeholder={placeholder || `Search ${label}`}
				className={cn(
					"w-full",
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
					"border-edge",
					"rounded-full",
					"hover:border-edge-dark",
					"text-lg",
					"h-12",
					// "bg-divider/50",
					// "bg-container-lowered",
					// "bg-edge",
					"bg-edge/50",
					"dark:bg-edge-dark/50",
					"border-edge-dark/50",
					"border-edge/30",
					"dark:hover:border-edge/50",
					// "dark:hover:border-edge-dark",
					// "border-0",
					"inset-shadow-xs",
					"",
					""
				)}
			/>

			<div className="flex h-full line-clamp-5">
				<ul
					className={cn(
						"row-start-3",
						"flex",
						"flex-row",
						"flex-wrap",
						"gap-1",
						"gap-2",
						"gap-1.5",
						"w-full",
						"px-2.5",
						"overflow-y-auto",
						// "max-h-100",
						"max-h-60",
						"max-h-45",
						"h-full",
						"overflow-x-clip",
						// "line-clamp-6",
						"",
						""
					)}>
					{options.length === 0 ? (
						<span className={cn("text-xs", "text-muted", "", "")}>
							No {label} options.
						</span>
					) : (
						options.map((option, idx) => {
							const isLanguageOption =
								typeof option !== "string" &&
								option.key &&
								option.name;
							const optionKey = isLanguageOption
								? option.key
								: typeof option === "string"
								? option
								: option.key;
							const optionLabel = isLanguageOption
								? option.name
								: typeof option === "string"
								? option
								: option.name ?? option.key;
							const checked = selected === optionKey;
							return (
								<li key={idx}>
									<button
										key={optionKey}
										type="button"
										aria-pressed={checked}
										onClick={() =>
											setSelected(
												checked ? null : optionKey
											)
										}
										className={cn(
											"flex",
											"items-center",
											"rounded-full",
											// "px-3",
											"px-2",
											// "py-1",
											"border",
											"border-edge/50",
											// "border-transparent",
											"bg-container",
											"cursor-pointer",
											"transition",
											"hover:border-edge-dark",
											"text-nowrap",
											"text-base",
											// "text-sm",
											"transition",
											"bg-primary/10",
											checked
												? "bg-accent-light text-primaruy dark:text-primary-inv"
												: "text-secondary",
											"",
											""
										)}>
										{optionLabel}
									</button>
								</li>
							);
						})
					)}
				</ul>
			</div>
			{/* Hidden input for form submission */}
			<input
				type="hidden"
				name={searchParamName}
				value={selected ?? ""}
			/>
		</fieldset>
	);
}
