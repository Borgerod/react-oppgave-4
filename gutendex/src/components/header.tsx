"use client";
import { IoChevronBack, IoMenu } from "react-icons/io5";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "./searchBar";

// todo clicking gutendex homebutton should reset the query
type StoreHeaderProps = {
	onResults?: (data: any, queryString?: string) => void;
};

export default function StoreHeader({ onResults }: StoreHeaderProps) {
	const pathname = usePathname();
	const isBookProfile = pathname?.startsWith("/book-profile");
	if (pathname === "/") return null;
	return (
		<header className="relative bg-transparent w-full py-5">
			<div
				className={cn(
					"flex flex-row justify-between items-center",
					// "gap-5 max-w-6xl mx-auto px-6 py-4 ",
					"gap-5 max-w-6xl mx-auto px-0 py-4",
					"h-15",
					// "gap-5  mx-auto px-0 py-4",
					// "py-5",
					"py-0",
					"px-5",
					"lg:px-0",
					// "gap-5 max-w-7xl mx-auto px-6 py-4 ",
					isBookProfile ? "max-w-7xl" : "",
					// "ml-1",
					"",
					""
				)}
			>
				{/* <div className="flex flex-row items-center justify-center -ml-10"> */}
				<div
					className={cn(
						"flex w-full md:w-fit *:flex-row items-center justify-center",
						"",
						""
						// "absolute left-1/2 -translate-x-1/2 sm:static sm:left-auto sm:translate-x-0",
						// "z-10"
					)}
				>
					<Link href={"/store"}>
						<div
							className={cn(
								"p-2 rounded-full",
								"flex items-center justify-center",
								"hover:bg-foreground/10",
								"text-nowrap",
								"text-xl",
								"sm:text-sm",
								"",
								""
							)}
						>
							GutenDex Library
						</div>
					</Link>
					{pathname === "/store" ? (
						<Link href="/">
							<button
								aria-label="back"
								className={cn(
									"absolute top-7 left-6 md:static",
									"p-2 rounded-full",
									"flex items-center justify-center",
									"hover:bg-foreground/10",
									"",
									""
								)}
							>
								<IoChevronBack size={20} aria-label="root" />
								/root
							</button>
						</Link>
					) : null}
				</div>
				<div
					className={cn(
						"hidden md:flex lg:flex justify-center w-full"
					)}
				>
					<SearchBar onResults={onResults} />
				</div>

				<button
					aria-label="menu"
					className={cn(
						"absolute right-7 top-7 sm:static sm:right-auto sm:top-auto",
						"p-2",
						// "h-full",
						"-mr-3",
						"pointer-events-auto",
						"rounded-full",
						"flex items-center justify-center",
						"hover:bg-foreground/10"
					)}

					// onClick={}
					// TODO: make menu popup
				>
					{/* <IoMenu size={24} className="" /> */}
					<IoMenu size={19} className="" />
				</button>
			</div>
			<div
				className={cn(
					"flex justify-center w-full",
					// "hidden",
					"md:hidden",
					"lg:hidden",
					//
					"px-5",
					"",
					""
				)}
			>
				<SearchBar onResults={onResults} />
			</div>
		</header>
	);
}
