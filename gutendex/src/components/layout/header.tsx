"use client";
import { IoMenu } from "react-icons/io5";
import { cn } from "@/utils/cn";
import { iconBtnClass, textBtnClass } from "@/components/buttonClasses";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import SearchBar from "@/components/filters/searchBar";
import type { BooksResponse } from "@/types";
import React, { useState } from "react";
import { useRef, useEffect } from "react";
import { PiSlidersHorizontalFill } from "react-icons/pi";
// import Filter from "@/components/filters/filter";
import { Filter } from "@/components/filters/filter";
import { useTheme } from "@/providers/providers";
import { HiLibrary } from "react-icons/hi";

type StoreHeaderProps = {
	onResults?: (data: BooksResponse, queryString?: string) => void;
	topics?: string[];
};
export default function StoreHeader({ onResults, topics }: StoreHeaderProps) {
	const { isDark } = useTheme();
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
		const languagesCount = searchParams.getAll("languages").length;
		const formatsCount = searchParams.getAll("format").length;
		const copyrightCount = searchParams.get("copyright") === "on" ? 1 : 0;
		return topicsCount + languagesCount + formatsCount + copyrightCount;
	}, [searchParams]);

	const menuRef = useRef<HTMLButtonElement | null>(null);

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
	// `iconBtnClass` and `textBtnClass` are imported from
	// src/components/buttonClasses.ts

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
		<header
			className={cn(
				"relative",
				"flex",
				"flex-col",
				"w-full",
				"py-10",
				"sm:py-5",
				"gap-y-5 sm:gap-x-5",
				// "flex-row",
				// "sm:flex-row",
				// "bg-transparent",
				// "justify-items-between",
				// "content-between",
				// "grid",
				// "flex flex-row",
				// "gap-5",
				// "justify-around",
				"",
				""
			)}>
			{isOpen && (
				<div
					aria-label="menu"
					id="menu"
					className={cn(
						"absolute",
						"h-200 w-100 bg-container-solid rounded-3xl shadow border border-edge",
						"text-xl text-center content-center",
						"shadow-xl",
						"z-50 top-25 right-0"
					)}>
					Stop snooping!
				</div>
			)}
			{/* {pathname === "/store" ? (
				<Link
					href="/"
					className={cn(
						`${iconBtnClass}`,
						`${textBtnClass}`,
						// "h-full",
						// "w-20",
						// "grid grid-cols-2",
						"absolute",
						// "md:absolute",
						// "md:top-10",
						// "sm:-left-10",
						"sm:left-0",
						"visible",
						// "sm:invisible hidden",
						// "sm:absolute",
						// "sm:top-20 sm:left-0",
						"bg-amber-400",
						"md:top-7 md:left-10",
						// "1190px:top-7",
						"lg:top-7 lg:left-5",
						// "xl:top-7 lx:left-5",
						// "xl:top-5 lx:left-10",

						// "lg:relative lg:top-0 lg:left-0",
						"",
						""
					)}
				>
					<IoChevronBack size={20} aria-label="root" />
					<span className="pr-2">/root</span>
				</Link>
			) : null} */}
			<div
				id="logo-menu-row"
				className={cn(
					"flex flex-row",
					"justify-between",
					"w-full",
					"gap-2",
					// "flex flex-row justify-between items-center",
					// "flex flex-row justify-items-stretch",

					// "justify-evenly",
					// "justify-center",
					// "justify-around",
					// "gap-5",
					// "gap-5 max-w-6xl mx-auto px-0 py-4",
					// "h-15",
					// "h-12",
					// "py-0",
					// "px-5",
					// "lg:px-10",
					// "lg:max-w-7xl",
					// "mb-5",
					// "gap-0",
					// isBookProfile ? "max-w-7xl" : "",
					"",
					""
				)}>
				<Link
					href={"/home"}
					className={cn(
						`${iconBtnClass}`,
						`${textBtnClass}`,
						`${logoBtnClass}`,
						"",
						""
					)}>
					<div className="self-center flex items-center justify-center ">
						{isDark ? (
							<>
								<Image
									src="/gutendex_long_dark.png"
									alt="logo"
									width={200}
									height={20}
									className="hidden sm:block self-center object-contain align-middle"
								/>
								<Image
									src="/gutendex_short_dark.png"
									alt="logo"
									width={60}
									height={50}
									className="block sm:hidden self-center"
								/>
							</>
						) : (
							<>
								<Image
									src="/gutendex_long_light.png"
									alt="logo"
									width={200}
									height={20}
									className="hidden sm:block self-center object-contain align-middle"
								/>
								<Image
									src="/gutendex_short_light.png"
									alt="logo"
									width={60}
									height={50}
									className={cn(
										"block",
										"sm:hidden",
										"self-center",
										"h-auto",
										"w-auto",
										""
									)}
								/>
							</>
						)}
					</div>
				</Link>
				{isBookProfile ? (
					<Link
						href={"/store"}
						className={cn(
							`${iconBtnClass}`,
							// `${textBtnClass}`,
							// `${logoBtnClass}`,
							"hidden sm:block",
							""
						)}>
						<HiLibrary
							size={19}
							className="place-self-center align-middle"
						/>
					</Link>
				) : null}
				<div
					id="searchbar-row-1"
					className={cn(
						"flex-row",
						"w-full",
						"justify-self-center",
						"justify-center",
						"gap-2",
						"hidden",
						"sm:flex",
						""
					)}>
					<SearchBar
						onResults={onResults}
						searchQuery={searchQuery}
					/>

					<button
						aria-label="filter"
						onClick={() => toggleFilter(!openFilter)}
						className={iconBtnClass}>
						<PiSlidersHorizontalFill size={19} className="block" />
						{selectedCount ? (
							<div
								className={cn(
									"m-0 p-0",
									"row-start-1 col-start-1",
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

				{/* <div ref={menuRef} className="h-full"> */}
				{/* <button
						aria-label="menu"
						onClick={() => toggleMenu((prev) => !prev)}
						className={cn(
							"aspect-square",
							"h-full",
							"pointer-events-auto",
							"rounded-full",
							"flex items-center justify-center",
							"hover:bg-foreground/10"
						)}
					> */}
				<button
					aria-label="menu"
					onClick={() => toggleMenu((prev) => !prev)}
					ref={menuRef}
					className={iconBtnClass}>
					<IoMenu size={19} className="block" />
				</button>
				{/* </div> */}
			</div>
			<div
				id="searchbar-row-mobile"
				className={cn(
					"flex w-full",
					"justify-between",
					"items-center",
					"sm:justify-center",
					"md:hidden",
					"lg:hidden",
					"sm:hidden",
					"gap-1",
					// "px-5",
					"",
					""
				)}>
				{isBookProfile ? (
					<Link
						href={"/store"}
						className={cn(`${iconBtnClass}`, "", "")}
						aria-label="library">
						<HiLibrary size={19} />
					</Link>
				) : null}
				<SearchBar onResults={onResults} searchQuery={searchQuery} />
				<button
					aria-label="filter"
					onClick={() => toggleFilter(!openFilter)}
					className={iconBtnClass}>
					<PiSlidersHorizontalFill size={19} className="" />
					{selectedCount ? (
						<div
							className={cn(
								"m-0 p-0",
								"row-start-1 col-start-1",
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
			<Filter
				open={openFilter}
				setOpen={toggleFilter}
				searchQuery={searchQuery}
				topics={topics}
				onClose={() => toggleFilter(false)}
			/>
		</header>
	);
}
