import { cn } from "@/utils/cn";
import Form from "next/form";
import { IoSearch } from "react-icons/io5";
import { iconBtnClass } from "../buttonClasses";

const SearchIcon = () => (
	<button type="submit" className={cn(iconBtnClass, "", "")}>
		<IoSearch className={cn("pointer-events-none")} />
	</button>
);
export type SearchBarProps = {
	className?: string;
};
export default function SearchBar({ className }: SearchBarProps) {
	return (
		<Form
			action="/store"
			className={cn(
				"w-full",
				"flex",
				"items-center",
				"rounded-full",
				"p-2",
				"gap-2",
				"bg-container",
				"select-none",
				"border",
				"border-edge",
				"hover:border-edge-dark",
				"dark:hover:border-edge-highlight",
				"bg-edge/50",
				"dark:bg-edge-dark/50",
				"dark:bg-edge/15",
				"dark:bg-edge-dark",

				// "bg-linear-to-r",
				// "dark:from-edge-dark/50",
				// "dark:to-container",
				// "bg-blend-color",
				// "dark:bg-[color-mix(in_srgb,var(--color-edge-dark)_50%,var(--color-container)_50%)]",
				"dark:bg-[color-mix(in_srgb,var(--container)_15%,var(--color-edge-dark)_50%)]",

				"",
				"border-edge-dark/50",
				"border-edge/30",
				"dark:hover:border-edge/50",
				className,

				"",
				"",
				""
			)}>
			<SearchIcon />
			<input
				name="search"
				placeholder="Søk etter bøker..."
				autoComplete="off"
				className={cn(
					"w-full",
					"h-full",
					"focus:outline-none",
					"focus:ring-0",
					"pointer-events-auto",
					"placeholder:pointer-events-none",
					"",
					""
				)}
			/>
		</Form>
	);
}
