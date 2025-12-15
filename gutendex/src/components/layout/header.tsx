"use client";
import { IoChevronBack, IoMenu } from "react-icons/io5";
import { cn } from "@/utils/cn";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import SearchBar from "@/components/filters/searchBar";
import type { BooksResponse } from "@/types";
import React, { useState } from "react";
import { useRef, useEffect } from "react";
import { PiSlidersHorizontalFill } from "react-icons/pi";
import Filter from "@/components/filters/filter";
import { useTheme } from "@/providers/providers";

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
					"gap-0",
					isBookProfile ? "max-w-7xl" : "",
					"",
					""
				)}>
				{pathname === "/store" ? (
					<Link href="/" className="h-full">
						<button
							aria-label="back"
							className={cn(
								"absolute top-10 left-10",
								"sm:top-15 sm:left-10",
								"md:top-15 md:left-10",
								"xl:top-5 lx:left-10",
								"px-2",
								"py-2",
								"rounded-full",
								"flex items-center justify-center",
								"hover:bg-foreground/10",
								"h-12",
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
					className={cn(
						"px-5",
						"rounded-full",
						"flex items-center justify-center",
						"hover:bg-foreground/10",
						"text-nowrap",
						"text-xl",
						"h-full",
						"text-center",
						"leading-none",
						"h-15",
						"w-25",
						"rounded-full p-0",
						"sm:p-2 sm:px-5",

						"sm:h-full",
						"sm:w-fit",

						"",
						""
					)}>
					<div className="self-center justify-items-center w-fit">
						{isDark ? (
							<>
								<Image
									src="/gutendex_long_dark.png"
									alt="logo"
									width={200}
									height={20}
									className="invisible sm:visible -mb-5 sm:m-0"
								/>
								<Image
									src="/gutendex_short_dark.png"
									alt="logo"
									width={60}
									height={50}
									className="visible sm:hidden sm:invisible sm:w-0 sm:h-0 "
								/>
							</>
						) : (
							<>
								<Image
									src="/gutendex_long_light.png"
									alt="logo"
									width={200}
									height={20}
									className="invisible sm:visible  -mb-5 sm:m-0"
								/>
								<Image
									src="/gutendex_short_light.png"
									alt="logo"
									width={60}
									height={50}
									className="visible sm:hidden sm:invisible sm:w-0 sm:h-0 "
								/>
							</>
						)}
					</div>
				</Link>

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
