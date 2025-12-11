"use client";
import { IoChevronBack, IoMenu } from "react-icons/io5";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "./searchBar";
import type { BooksResponse } from "@/types";
import { useState } from "react";
import { useRef, useEffect } from "react";
import { PiSlidersHorizontalFill } from "react-icons/pi";
import { MdToggleOn } from "react-icons/md";
import { LiaToggleOnSolid } from "react-icons/lia";
// import { useState } from "react";

// todo clicking gutendex homebutton should reset the query
type StoreHeaderProps = {
	onResults?: (data: BooksResponse, queryString?: string) => void;
};

export default function StoreHeader({ onResults }: StoreHeaderProps) {
	const pathname = usePathname();
	const isBookProfile = pathname?.startsWith("/book-profile");
	const [isOpen, toggleMenu] = useState(false);
	const [openFilter, toggleFilter] = useState(false);
	const [copyright, toggleCopyRight] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (!isOpen) return;
		function handleClickOutside(event: MouseEvent) {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				toggleMenu(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	if (pathname === "/") return null;

	return (
		<header className="relative bg-transparent w-full py-10 sm:py-5">
			{isOpen ? (
				<div
					aria-label="menu"
					id="menu"
					ref={menuRef}
					className={cn(
						"absolute z-10 top-20 right-10",
						"absolute z-10 top-5 right-60",
						"h-200 w-100 bg-container-solid rounded-2xl shadow border border-edge",
						"text-xl text-center content-center",

						"",
						""
					)}>
					Stop snooping!
				</div>
			) : (
				<></>
			)}
			<div
				className={cn(
					"flex flex-row justify-between items-center",
					// "gap-5 max-w-6xl mx-auto px-6 py-4 ",
					"gap-5 max-w-6xl mx-auto px-0 py-4",
					"h-15",
					"h-12",
					// "gap-5  mx-auto px-0 py-4",
					// "py-5",
					"py-0",
					"px-5",
					"lg:px-10",
					"lg:max-w-7xl",
					"mb-5",

					// "gap-5 max-w-7xl mx-auto px-6 py-4 ",
					isBookProfile ? "max-w-7xl" : "",
					// "ml-1",
					"",
					""
				)}>
				{/* <div className="flex flex-row items-center justify-center -ml-10"> */}
				{/* <div
					className={cn(
						"flex w-full",
						// "md:w-fit",
						// "sm:w-fit",
						// "*:flex-row",
						// "items-center justify-center",
						"",
						""
						// "absolute left-1/2 -translate-x-1/2 sm:static sm:left-auto sm:translate-x-0",
						// "z-10"
					)}> */}
				{pathname === "/store" ? (
					<Link href="/" className="h-full">
						<button
							aria-label="back"
							className={cn(
								// "absolute top-7 left-6 md:static",
								// "p-2",
								"px-2",
								" rounded-full",
								"flex items-center justify-center",
								"hover:bg-foreground/10",
								"h-full",
								"",
								""
							)}>
							<IoChevronBack size={20} aria-label="root" />
							<span className="pr-2">/root</span>
						</button>
					</Link>
				) : null}
				<Link href={"/store"} className="h-full ">
					<div
						className={cn(
							// "p-2 ",
							"px-3",
							// "w-auto",
							"rounded-full",
							// "aspect-square",
							"flex items-center justify-center",
							"hover:bg-foreground/10",
							"text-nowrap",
							"text-xl",
							"sm:text-sm",
							"h-full",

							"",
							""
						)}>
						GutenDex Library
					</div>
				</Link>
				{/* </div> */}

				<div
					className={cn(
						"justify-center items-center content-center",
						"w-full",
						"md:flex",
						"lg:flex",
						"sm:flex",
						"hidden",
						"gap-2",
						"sm:visible",
						"",
						""
					)}>
					<button
						aria-label="menu"
						onClick={() => toggleFilter(!openFilter)}
						className={cn(
							// "absolute right-7 top-7 sm:static sm:right-auto sm:top-auto",
							// "p-2",
							"p-3",
							"aspect-square",
							"h-full",
							// "-mr-3",
							"pointer-events-auto",
							"rounded-full",
							"flex items-center justify-center",
							"hover:bg-foreground/10"
						)}>
						<PiSlidersHorizontalFill size={19} className="" />
					</button>
					<SearchBar onResults={onResults} />
				</div>

				<button
					aria-label="filter"
					onClick={() => toggleMenu(!isOpen)}
					className={cn(
						// "absolute right-7 top-7 sm:static sm:right-auto sm:top-auto",
						// "p-2",
						// "p-3",
						"aspect-square",
						"h-full",
						// "-mr-3",
						"pointer-events-auto",
						"rounded-full",
						"flex items-center justify-center",
						"hover:bg-foreground/10"
					)}>
					<IoMenu size={19} className="" />
				</button>
			</div>
			<div
				className={cn(
					"flex justify-center w-full",
					// "hidden",
					"md:hidden",
					"lg:hidden",
					"sm:hidden",
					//
					"px-5",
					"",
					""
				)}>
				<SearchBar onResults={onResults} />
			</div>
			{openFilter ? (
				<div
					aria-label="filter"
					id="filter"
					// ref={menuRef}
					className={cn(
						// "absolute z-10 top-20 right-10",
						// "absolute z-10 top-5 right-60",
						// "border-y",
						"h-fit min-h-20 w-full  border-b border-edge",
						"text-xl text-center content-center",
						"gird grid-rows-auto",
						"",
						""
					)}>
					<select name="searchBy" id="searchBy">
						<option value="books">books</option>
						<option value="author">author</option>
						<option value="books">books</option>
						<option value="books">books</option>
						<option value="books">books</option>
					</select>
					<select name="language" id="language">
						{/* todo make multiselect */}
						<option value="English">English</option>
						<option value="Norwegian">Norwegian</option>
						<option value="French">French</option>
						<option value="Spanish">Spanish</option>
						<option value="Mandarin">Mandarin</option>
					</select>
					<button
						onClick={() => toggleCopyRight(!copyright)}
						className="flex gap-2 text-md">
						copyright
						{copyright ? (
							<div>
								<LiaToggleOnSolid
									size={24}
									className="rotate-180"
								/>
							</div>
						) : (
							<div>
								<LiaToggleOnSolid
									size={24}
									// fill="green"
									color="var(--accent)"
								/>
							</div>
						)}
					</button>
					FILTER TIME!
				</div>
			) : (
				<></>
			)}
		</header>
	);
}
