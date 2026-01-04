// "use client";
// "use cache";
// import { Suspense, useState } from "react";
// import SearchBar from "@/components/filters/searchBar";
// import { PiSlidersHorizontalFill } from "react-icons/pi";
// import Filter from "@/components/filters/filter";
// import Link from "next/link";
// import Image from "next/image";
// import { cn } from "@/utils/cn";
// import { iconBtnClass, textBtnClass } from "../buttonClasses";

// const logoBtnClass = cn(
// 	"h-fit",
// 	"w-fit",
// 	"sm:-left-2",
// 	"mx-auto",
// 	"px-5",
// 	"sm:px-2 sm:pr-3",
// 	"",
// 	""
// );

// export default function Navbar() {
// 	const [filterOpen, setFilterOpen] = useState(false);
// ("use client");
"use client";
import { useEffect, useRef, useState } from "react";
import SearchBar from "@/components/filters/searchBar";
import { PiSlidersHorizontalFill } from "react-icons/pi";
import Filter from "@/components/filters/filter";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { iconBtnClass, textBtnClass } from "../buttonClasses";
import { LanguageOptions } from "@/types";

import Logo from "@/components/layout/ThemeImage";

const logoBtnClass = cn(
	"h-fit",
	"w-fit",
	"sm:-left-2",
	"mx-auto",
	"px-5",
	"sm:px-2 sm:pr-3",
	"",
	""
);

type NavbarProps = {
	topicOptions: string[];
	formatOptions: string[];
	languageOptions: LanguageOptions[];
};
import { usePathname, useSearchParams } from "next/navigation";
import { IoMenu } from "react-icons/io5";
import Menu from "./Menu";

export default function Navbar({
	topicOptions,
	formatOptions,
	languageOptions,
}: NavbarProps) {
	const [filterOpen, setFilterOpen] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const menuButtonRef = useRef<HTMLButtonElement | null>(null);
	const menuContentRef = useRef<HTMLDivElement | null>(null);
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (!menuOpen) {
			return;
		}

		const handlePointerDown = (event: PointerEvent) => {
			const targetNode = event.target as Node | null;
			if (!targetNode) {
				return;
			}

			if (
				menuContentRef.current?.contains(targetNode) ||
				menuButtonRef.current?.contains(targetNode)
			) {
				return;
			}

			setMenuOpen(false);
		};

		window.addEventListener("pointerdown", handlePointerDown);
		return () => {
			window.removeEventListener("pointerdown", handlePointerDown);
		};
	}, [menuOpen]);
	return (
		<nav
			className={cn(
				pathname === "/" ? "hidden" : "grid", //makes sure not to display navbar in root
				"items-center",
				"justify-between",
				// "p-4",
				// "lg:px-6",
				"py-4",
				"lg:py-6",
				"w-full",
				"gap-5",
				"sm:grid-rows-1",
				"sm:grid-cols-1",
				// "sm:grid-cols-[auto_1fr_auto]",
				// "sm:grid-cols-[1fr_auto_1fr]",
				// "sm:grid-cols-[1fr_3fr]",
				"grid-rows-2",
				"grid-rows-[1fr_auto]",
				// "grid-rows-[2fr_1fr]",
				"grid-cols-2",
				"grid-cols-[1fr_auto]",
				"justify-between",
				"w-fit",
				"w-full",
				// "grid-rows-3",
				// "sm:grid-rows-1",
				"relative",
				"",
				""
			)}>
			<div
				className={cn(
					// "flex",
					"w-full",
					"items-center",
					"gap-5",
					"items-center",
					"justify-between",
					// "p-4",
					// "lg:px-6",
					"grid",
					"py-4",
					"lg:py-6",
					"w-full",
					"gap-5",
					"sm:grid-rows-1",
					"sm:grid-cols-1",
					"sm:grid-cols-[auto_1fr_auto]",
					"sm:grid-cols-[1fr_auto_1fr]",
					"sm:grid-cols-[1fr_3fr]",
					"grid-rows-2",
					// "grid-rows-[2fr_1fr]",
					"grid-cols-2",
					"grid-cols-[1fr_auto]",
					"justify-between",
					"w-fit",
					"w-full",
					"",
					"",
					""
				)}>
				<Link
					href={"/store"}
					className={cn(
						iconBtnClass,
						textBtnClass,
						logoBtnClass,
						"col-span-full",
						"sm:col-span-1",
						"col-span-1",
						"col-start-1",
						// "max-w-40",
						// "h-40",

						"",
						""
					)}>
					<div className="self-center flex items-center justify-center">
						<Logo />
					</div>
				</Link>
				<button
					id="menu-button"
					aria-label="menu"
					onClick={() => setMenuOpen((prev) => !prev)}
					ref={menuButtonRef}
					// ref={menuRef}
					// className={iconBtnClass}
					className={cn(
						iconBtnClass,
						"col-span-1",
						"col-start-2",
						"sm:col-start-3",
						"",
						""
					)}>
					<IoMenu size={19} className="block" />
				</button>
				<div
					className={cn(
						"flex gap-2",
						"col-start-1 row-start-2 row-span-full col-span-full",
						"sm:col-start-2 sm:row-start-1 sm:col-span-full",
						"w-full",
						"items-stretch",
						"",
						""
					)}>
					<SearchBar
						className={cn(
							// "rows-start-2 col-span-1",
							// "sm:rows-start-1 sm:row-span-1",

							"",
							""
						)}
					/>
					<div
						id="filter-button-container"
						className={cn(
							"grid",
							"grid-cols-1 grid-rows-1",

							"",
							"",
							"",
							""
						)}>
						{Array.from(searchParams.entries()).length > 0 ? (
							<span
								className={cn(
									// "absolute -top-1 -right-1",
									"row-start-1 col-start-1",
									// "justify-self-end",
									// "self-center",
									"cursor-none",
									"cursor-not-allowed",
									"select-none",
									"pointer-events-none",
									"relative",
									"top-2 left-7",
									"size-4 aspect-square",
									"bg-orange-600",
									// "bg-red-400",
									// "bg-warning",
									"rounded-full",
									"flex",
									"justify-center text-center",
									"text-xs text-white",
									"font-bold",
									"",
									""
								)}>
								{/* {searchParams.getAll("filter").length} */}
								{/* {searchParams.getAll.length} */}
								{Array.from(searchParams.entries()).length}
							</span>
						) : (
							<></>
						)}
						<button
							id="nav-filter-toggle"
							type="button"
							aria-expanded={filterOpen}
							aria-controls="filter-panel"
							onClick={() => setFilterOpen((v) => !v)}
							className={cn(
								iconBtnClass,
								"row-start-1 col-start-1",
								"cursor-pointer",
								"",
								""
							)}>
							<PiSlidersHorizontalFill
								size={19}
								className="block"
							/>
						</button>
					</div>
				</div>
			</div>
			{/* Render the Filter panel when filterOpen is true */}
			{filterOpen && (
				<div className="col-start-1 col-span-full row-start-2">
					<Filter
						topicOptions={topicOptions}
						formatOptions={formatOptions}
						languageOptions={languageOptions}
						open={filterOpen}
						setOpen={setFilterOpen}
					/>
				</div>
			)}

			{menuOpen && (
				<div ref={menuContentRef} className={cn("contents", "", "")}>
					<Menu open={menuOpen} setOpen={setMenuOpen} />
				</div>
			)}
		</nav>
	);
}
// }
