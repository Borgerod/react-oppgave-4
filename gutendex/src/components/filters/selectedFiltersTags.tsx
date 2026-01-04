"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tag } from "./tag";
import { cn } from "@/utils/cn";
import { simpleTextBtnClass } from "../buttonClasses";
import { LanguageOptions } from "@/types";

type SelectedFiltersTagsProps = {
	languageOptions?: LanguageOptions[];
};

export default function SelectedFiltersTags({
	languageOptions = [],
}: SelectedFiltersTagsProps) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	function formatValue(key: string, value: string) {
		switch (key) {
			case "copyright":
				switch (value) {
					case "true":
						return "Copyright Only";
					case "false":
						return "Copyright Only";
					default:
						break;
				}
			case "languages": {
				const match = languageOptions.find((opt) => opt.key === value);
				return match?.name || value;
			}

			default:
				return value;

			case "topic":
				return value.replace("Category: ", "");
		}
	}

	function deleteParam(key: string, value: string) {
		const params = new URLSearchParams(searchParams.toString());
		params.delete(key);
		router.push(`${pathname}?${params.toString()}`);
	}

	function onClearAll() {
		router.push(`${pathname}`);
	}

	return (
		<div id="selected-filters-tags" className="w-full mt-5 sm:mt-0">
			<div className="flex items-start justify-between">
				<div className="text-sm text-tertiary">Selected filters</div>
				<button
					type="button"
					aria-label="Clear all filters"
					onClick={() => onClearAll()}
					className={cn(
						simpleTextBtnClass,
						"text-warning",

						"",
						""
					)}>
					Clear All
				</button>
			</div>
			<ul className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
				{Array.from(searchParams.entries()).map(([key, value]) => {
					let tooltip: string | undefined = undefined;
					if (value.includes("Category")) tooltip = "Category";
					else if (value.includes("bookshelf")) tooltip = "bookshelf";
					return (
						<li
							key={`selected-topic-${key}`}
							{...(tooltip ? { title: tooltip } : {})}>
							<Tag
								id={`selected-topic-${key}`}
								item={formatValue(key, value)}
								checked={true}
								onToggle={() => deleteParam(key, value)}
								closeIcon
								className={cn(
									value.includes("Category")
										? // ? "peer-checked:bg-purple-300"
										  // ? "peer-checked:bg-[#c086ea]/30"
										  // ? "peer-checked:bg-[#dcb6f7]/30"
										  // ? "peer-checked:bg-[#658fd9b6]"
										  // ? "peer-checked:bg-[#658fd9b6]/30"
										  // ? "peer-checked:bg-[#435e8e]/30"
										  // ? "peer-checked:bg-[#003530]/30"
										  //   "peer-checked:bg-container-dark "
										  "peer-checked:bg-container-dark "
										: "",
									"",
									""
								)}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
