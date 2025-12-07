import { IoSearch } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { cn } from "@/utils/cn";

const Search = ({ children }: { children: React.ReactNode }) => (
	<div
		className={cn(
			"relative rounded-md",
			"relative rounded-full",
			"bg-white/15 hover:bg-white/25",
			"w-xl",
			"p-2 flex flex-row",
			"items-center justify-left"
		)}>
		{children}
	</div>
);

const SearchIconWrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		className={cn(
			// "px-4 h-full",
			"p-3 h-full mr-2",
			// "pointer-events-none ",
			"pointer-events-auto",
			"rounded-full",
			"flex items-center justify-center",
			"hover:bg-foreground/30",
			"",
			""
		)}>
		{children}
	</div>
);

const StyledInputBase = (
	props: React.InputHTMLAttributes<HTMLInputElement>
) => (
	<input
		{...props}
		className={cn(
			"text-inherit py-2 pr-2 transition-width w-full md:w-[20ch] bg-transparent outline-none"
		)}
	/>
);
export default function StoreHeader() {
	return (
		<header className="absolute inset-x-0 top-0 bg-transparent">
			<div
				className={cn(
					"flex flex-row justify-between items-center",
					"gap-5 max-w-6xl mx-auto px-6 py-4"
				)}>
				<div className="text-nowrap">GutenDex Library</div>
				<Search>
					<SearchIconWrapper>
						<IoSearch
							className={cn("pointer-events-none", "", "")}
							// onClick={}
							// todo add onclick to search button
						/>
					</SearchIconWrapper>
					<StyledInputBase
						className={cn("pointer-events-none", "cursor-none", "")}
						placeholder="Search…"
						aria-label="search"
					/>
				</Search>
				<button
					aria-label="menu"
					className={cn(
						// "px-4 h-full",
						"p-3 h-full mr-2",
						// "pointer-events-none ",
						"pointer-events-auto",
						"rounded-full",
						"flex items-center justify-center",
						"hover:bg-foreground/30",
						"",
						""
					)}

					// onClick={}
					// TODO: make menu popup
				>
					<IoMenu size={24} className="" />
				</button>
			</div>
		</header>
	);
}
