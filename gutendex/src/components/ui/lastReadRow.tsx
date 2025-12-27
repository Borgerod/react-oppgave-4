"use client";
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { cn } from "@/utils/cn";
import { iconBtnClass } from "@/components/buttonClasses";
import { Book } from "@/types";
import LastReadCard from "./lastReadCard";
import { parseTitle } from "@/utils/title";

interface LastReadRowProps {
	data: Book[] | null;
	loading: boolean;
	title: string;
	tagLabel?: string | React.ReactNode;
	button?: { text: string; href: string };
	onRemove?: (bookId: number) => void;
}

export default function LastReadRow({
	data,
	loading,
	title,
	tagLabel,
	onRemove,
}: LastReadRowProps) {
	const [pageIndex, setPageIndex] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState<number>(2); // mobile-first default
	const containerRef = useRef<HTMLDivElement | null>(null);

	const totalItems = data?.length || 0;

	// compute maxPage based on current itemsPerPage
	const maxPage = Math.max(0, Math.ceil(totalItems / itemsPerPage) - 1);

	// Keep itemsPerPage in sync with Tailwind breakpoints using matchMedia (modern API)
	useEffect(() => {
		if (typeof window === "undefined") return;

		const mqXL = window.matchMedia("(min-width:1280px)");
		const mqLG = window.matchMedia("(min-width:1024px)");
		const mqMD = window.matchMedia("(min-width:768px)");
		const mqSM = window.matchMedia("(min-width:640px)");
		// const mqSX = window.matchMedia("(min-width:450px)");

		function computeCols() {
			// mapping: base=2, sm>=640 -> 3, md>=768 -> 2, lg>=1024 -> 3, xl>=1280 -> 3
			// if (mqXL.matches) return 3;
			if (mqLG.matches) return 3;
			if (mqMD.matches) return 2;
			if (mqSM.matches) return 3;
			// if (mqSX.matches) return 1;
			// if (mqSM.matches) return 1;
			return 2;
		}

		function onChange() {
			setItemsPerPage(computeCols());
		}

		// initial
		setItemsPerPage(computeCols());

		// attach listeners (modern API)
		mqXL.addEventListener("change", onChange);
		mqLG.addEventListener("change", onChange);
		mqMD.addEventListener("change", onChange);
		mqSM.addEventListener("change", onChange);

		return () => {
			mqXL.removeEventListener("change", onChange);
			mqLG.removeEventListener("change", onChange);
			mqMD.removeEventListener("change", onChange);
			mqSM.removeEventListener("change", onChange);
		};
	}, []);

	// reset page when data or itemsPerPage changes
	useEffect(() => setPageIndex(0), [data, itemsPerPage]);

	// visible slice for current page
	const visible = useMemo(() => {
		const start = pageIndex * itemsPerPage;
		return data ? data.slice(start, start + itemsPerPage) : [];
	}, [data, pageIndex, itemsPerPage]);

	const goPrev = useCallback(
		() => setPageIndex((p) => Math.max(0, p - 1)),
		[]
	);
	const goNext = useCallback(
		() => setPageIndex((p) => Math.min(maxPage, p + 1)),
		[maxPage]
	);

	// keyboard navigation when component is focused
	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (!containerRef.current) return;
			if (!containerRef.current.contains(document.activeElement)) return;
			if (e.key === "ArrowLeft") {
				e.preventDefault();
				goPrev();
			} else if (e.key === "ArrowRight") {
				e.preventDefault();
				goNext();
			}
		}

		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [goPrev, goNext]);

	return (
		<div className={cn("grid grid-rows-[1fr_auto] h-fit w-full gap-5")}>
			{/* <h3 className="text-2xl font-medium mb-4">{title}</h3> */}
			{/* <h3 className="text-2xl font-medium p-2.5  md:pb-0 ">{title}</h3> */}
			<h3 className="text-2xl font-medium px-2.5 md:pb-0">{title}</h3>

			{/* <div className="flex items-start w-full"> */}
			{/* <div className="grid grid-rows-1 grid-cols-[1fr_auto_1fr] items-start w-full"> */}
			<div
				className={cn(
					"grid grid-rows-1 grid-cols-[auto_auto] items-start w-full",
					"justify-items-center justify-self-center",
					// "justify-items-start justify-self-start",
					"w-full",
					"",
					""
				)}
			>
				{/* <div className="flex items-start gap-3 w-full"> */}
				{/* Prev */}
				{/* {totalItems > itemsPerPage ? (
					<button
						onClick={goPrev}
						disabled={pageIndex === 0}
						aria-label="Previous page"
						className={cn(
							iconBtnClass,
							pageIndex === 0
								? "opacity-40 cursor-not-allowed"
								: "",
							"col-start-1",
							"z-20",

							""
						)}
						type="button"
					>
						<FaChevronLeft size={19} className="block" />
					</button>
				) : null}
				 */}

				{/* Grid - one row; columns change with Tailwind */}
				<div
					ref={containerRef}
					tabIndex={0}
					className={cn(
						"col-start-1 col-span-full",
						"col-start-1 row-start-1 col-span-full",

						// "grid grid-rows-1 grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3",
						"grid grid-rows-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3",
						// "justify-items-start items-start w-full ",
						// "justify-items-center items-start w-full ",
						// "justify-self-center",
						// "items-start",
						// "justify-self-evenly px-5 md:px-0",
						"px-5 md:px-0",
						// "sm:justify-self-start",
						"justify-self-center",
						// "md:justify-self-center",
						// "justify-self-evenly",
						// "justify-items-stretch",
						// "md:justify-self-evenly px-5 md:px-0",
						" w-fit ",
						// " w-full ",
						"gap-5",
						// // "h-72 md:h-72 overflow-visible"
						"h-fit ",
						"md:px-15",
						"",
						""
					)}
				>
					{visible.map((book, idx) => {
						const formats = book.formats as
							| Record<string, string>
							| undefined;
						const image =
							formats?.["image/jpeg"] ||
							formats?.["image/jpg"] ||
							undefined;

						const authorNames = (book.authors || [])
							.map((a) => a?.name)
							.filter((n): n is string => !!n);
						const authors =
							authorNames.length === 0
								? undefined
								: authorNames.length === 1
								? authorNames[0]
								: `${authorNames.slice(0, -1).join("; ")} & ${
										authorNames[authorNames.length - 1]
								  }`;

						const href = `/book-profile/${book.id}/${String(
							book.title
						)
							.trim()
							.toLowerCase()
							.normalize("NFKD")
							.replace(/[\u0300-\u036f]/g, "")
							.replace(/[^\w\s-]/g, "")
							.replace(/\s+/g, "-")
							.replace(/-+/g, "-")}`;

						const { main, sub } = parseTitle(book.title.main);

						return (
							<div
								key={`${book.id}-${
									pageIndex * itemsPerPage + idx
								}`}
							>
								<LastReadCard
									// title={book.title ? book.title : main}
									// title={main ? main : "bobobobo"}
									// title={main}
									title={
										book.title.main
											? main
											: book.title.toString()
									}
									subtitle={sub ? sub : ""}
									authors={authors}
									badge={{ text: tagLabel, variant: "pink" }}
									image={image}
									href={href}
									bookId={book.id}
									onRemove={onRemove}
								/>
							</div>
						);
					})}
				</div>
				<div
					id="next-prev-buttons"
					className={cn(
						"w-full",
						"h-full",
						"col-start-1",
						"row-start-1",
						"col-span-full",
						"grid",
						"",
						"grid-cols-[auto_auto]",
						"grid-rows-1",
						"items-center",
						"md:translate-y-2.5",
						// "justify-items-start",
						"justify-between",
						"",
						""
					)}
				>
					{/* Prev */}
					{totalItems > itemsPerPage ? (
						<button
							onClick={goPrev}
							disabled={pageIndex === 0}
							aria-label="Previous page"
							className={cn(
								iconBtnClass,
								pageIndex === 0
									? "opacity-40 cursor-not-allowed"
									: "",
								"col-start-1",
								"z-20",
								"-ml-5",
								"md:ml-0",
								// "md:-ml-10",
								""
							)}
							type="button"
						>
							<FaChevronLeft size={19} className="block" />
						</button>
					) : null}

					{/* Next */}
					{totalItems > itemsPerPage ? (
						<button
							onClick={goNext}
							disabled={pageIndex >= maxPage}
							aria-label="Next page"
							className={cn(
								iconBtnClass,
								pageIndex >= maxPage
									? "opacity-40 cursor-not-allowed"
									: "",
								"-col-start-1",
								"z-20",

								"-mr-5",
								"md:mr-0",
								// "md:-mr-15",
								""
							)}
							type="button"
						>
							<FaChevronRight size={19} className="block" />
						</button>
					) : null}
				</div>
			</div>
		</div>
	);
}
