"use client";
import { IoChevronBack, IoMenu } from "react-icons/io5";
import { cn } from "@/utils/cn";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import SearchBar from "./searchBar";
import type { BooksResponse } from "@/types";
import React, { useState } from "react";
import { useRef, useEffect } from "react";
import { PiSlidersHorizontalFill } from "react-icons/pi";
import Filter from "./filter";
import { FcKindle } from "react-icons/fc";
import { MdDownloadForOffline } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { ThemeContext } from "@emotion/react";

{
	/* <FcKindle />
<FaBook />;
<MdDownloadForOffline />;
<IoMdDownload />; */
}

// todo clicking gutendex homebutton should reset the query
type StoreHeaderProps = {
	onResults?: (data: BooksResponse, queryString?: string) => void;
	topics?: string[];
};
export default function StoreHeader({ onResults, topics }: StoreHeaderProps) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const isBookProfile = pathname?.startsWith("/book-profile");
	const [isOpen, toggleMenu] = useState(false);
	const [openFilter, toggleFilter] = useState(false);
	// Read searchQuery directly from URL params instead of local state
	const searchQuery = searchParams?.get("search") || "";

	// Calculate selected filters count directly from URL params
	const selectedCount = React.useMemo(() => {
		if (!searchParams) return 0;
		const topicsCount = searchParams.getAll("topic").length;
		const languagesCount = searchParams.getAll("language").length;
		const formatsCount = searchParams.getAll("format").length;
		const copyrightCount = searchParams.get("copyright") === "on" ? 1 : 0;
		return topicsCount + languagesCount + formatsCount + copyrightCount;
	}, [searchParams]);

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
	let filterCount;
	return (
		<header className="relative bg-transparent w-full py-10 sm:py-5">
			{isOpen && (
				<div
					aria-label="menu"
					id="menu"
					className={cn(
						"absolute",
						"z-10 sm:top-20 sm:right-7.5",
						"z-10 top-25 right-7.5",
						"h-200 w-100 bg-container-solid rounded-2xl shadow border border-edge",
						"text-xl text-center content-center",
						"shadow-xl",
						"",
						""
					)}>
					Stop snooping!
				</div>
			)}
			<div
				className={cn(
					"flex flex-row justify-between items-center",
					"gap-5 max-w-6xl mx-auto px-0 py-4",
					"h-15",
					"h-12",
					"py-0",
					"px-5",
					"lg:px-10",
					"lg:max-w-7xl",
					"mb-5",
					isBookProfile ? "max-w-7xl" : "",
					"",
					""
				)}>
				{pathname === "/store" ? (
					<Link href="/" className="h-full">
						<button
							aria-label="back"
							className={cn(
								"px-2",
								"rounded-full",
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
				<Link
					href={"/store"}
					// className="h-full flex items-center"
					className={cn(
						"px-5",
						"rounded-full",
						"flex items-center justify-center",
						"hover:bg-foreground/10",
						"text-nowrap",
						"text-xl",
						// "sm:text-sm",
						// "sm:text-sm",
						"h-full",
						"text-center",
						"leading-none",
						"w-fit gap-2",
						"",
						""
					)}>
					{/* <span></span> */}
					{/* {isDark ? (
						<Image
							src="/gutendex_dark.png"
							alt="logo"
							width={20}
							height={20}
						/>
					) : (
						<Image
							src="/gutendex_light.png"
							alt="logo"
							width={20}
							height={20}
						/>
					)} */}
					<span>GutenDex Library</span>
					{/* <span className="leading-none">GutenDex Library</span> */}
					{/* <div className={cn("", "", "")}>GutenDex Library</div> */}
					{/* <div className="grid grid-cols-1 grid-rows-1 h-full aspect-square">
						<FaBook className="row-start-1 col-start-1 h-full w-full aspect-square " />
						<div className="row-start-1 col-start-1 self-center justify-self-center bg-primary aspect-square size-6 w-7 leading-none mb-2">
							<IoMdDownload className="row-start-1 col-start-1 self-center justify-self-center text-primary bg-white rounded-full p-0.5" />
						</div>
					</div> */}
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
					<SearchBar
						onResults={onResults}
						searchQuery={searchQuery}
					/>
					{/* <button
						aria-label="filter"
						onClick={() => toggleFilter(!openFilter)}
						className={cn(
							"p-3",
							"aspect-square",
							"h-full",
							"pointer-events-auto",
							"rounded-full",
							"flex items-center justify-center",
							"hover:bg-foreground/10"
						)}>
						<PiSlidersHorizontalFill size={19} className="" />
					</button> */}
					<button
						aria-label="filter"
						onClick={() => toggleFilter(!openFilter)}
						className={cn(
							"p-3",
							"aspect-square",
							"h-full",
							"pointer-events-auto",
							"rounded-full",
							"flex items-center justify-center",
							"hover:bg-foreground/10",
							"grid grid-cols-1 grid-rows-1",
							"",
							""
						)}>
						<PiSlidersHorizontalFill size={19} className="" />
						{selectedCount ? (
							<div
								className={cn(
									"m-0 p-0",
									"row-start-1 col-start-1",
									// "self-end",
									"ml-2 mt-1",
									"w-full",
									"justify-items-end",
									"",
									""
								)}>
								<span
									className={cn(
										"h-4 aspect-square ",
										"justify-self-end",
										"bg-orange-600",
										"rounded-full",
										"flex items-center justify-center text-center",
										"text-xs text-white",
										"",
										""
									)}>
									{selectedCount}
								</span>
							</div>
						) : (
							<></>
						)}
					</button>
				</div>

				<div ref={menuRef} className="h-full">
					<button
						aria-label="menu"
						onClick={() => toggleMenu((prev) => !prev)}
						className={cn(
							"aspect-square",
							"h-full",
							"pointer-events-auto",
							"rounded-full",
							"flex items-center justify-center",
							"hover:bg-foreground/10"
						)}>
						<IoMenu size={19} className="" />
					</button>
				</div>
			</div>
			<div
				className={cn(
					"flex justify-center w-full",
					"md:hidden",
					"lg:hidden",
					"sm:hidden",
					"gap-2",
					//
					"px-5",
					"",
					""
				)}>
				<SearchBar onResults={onResults} searchQuery={searchQuery} />
				<button
					aria-label="filter"
					onClick={() => toggleFilter(!openFilter)}
					className={cn(
						"p-3",
						"aspect-square",
						"h-full",
						"pointer-events-auto",
						"rounded-full",
						"flex items-center justify-center",
						"hover:bg-foreground/10",
						"grid grid-cols-1 grid-rows-1",
						"",
						""
					)}>
					<PiSlidersHorizontalFill size={19} className="" />
					{selectedCount ? (
						<div
							className={cn(
								"m-0 p-0",
								"row-start-1 col-start-1",
								// "self-end",
								"ml-2 mt-1",
								"w-full",
								"justify-items-end",
								"",
								""
							)}>
							<span
								className={cn(
									"h-4 aspect-square ",
									"justify-self-end",
									"bg-orange-600",
									"rounded-full",
									"flex items-center justify-center text-center",
									"text-xs text-white",
									"",
									""
								)}>
								{selectedCount}
							</span>
						</div>
					) : (
						<></>
					)}
				</button>
			</div>
			{openFilter && <Filter searchQuery={searchQuery} topics={topics} />}
		</header>
	);
}
