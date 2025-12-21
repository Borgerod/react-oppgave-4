//tsrfc
// import React, { Component } from "react";
import React, { useEffect, useState } from "react";
// import ProductCard from "../store/productCard";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
// import { BooksResponse, Book } from "@/types";
// import CardSkeleton from "../store/cardSkeleton";
import HighLightCard from "@/components/ui/highLightCard";

// import textBtnClass from "@/components/layout/header";
import { cn } from "@/utils/cn";
import { iconBtnClass } from "@/components/buttonClasses";
import Link from "next/link";
import { Book } from "@/types";
import LastReadCard from "./lastReadCard";

interface LastReadRowProps {
	// data: BooksResponse | null;
	data: Book[] | null;
	loading: boolean;
	title: string;
	tagLabel?: string | React.ReactNode;
	// button?: string; // should really be children
	button?: { text: string; href: string }; // should really be children
	grid?: boolean;
	onToggleFavorite?: (book: Book) => void;
	favoriteIds?: number[];
}

export default function LastReadRow({
	data,
	loading,
	title,
	tagLabel,
	button,
	grid,
	onToggleFavorite,
	favoriteIds,
}: LastReadRowProps) {
	const [pageIndex, setPageIndex] = useState(0);

	const totalItems = data?.length || 0;
	const itemsPerPage = 3;
	const maxPage = Math.max(0, Math.ceil(totalItems / itemsPerPage) - 1);

	useEffect(() => {
		setPageIndex(0);
	}, [data]);

	const start = pageIndex * itemsPerPage;
	const visible = data ? data.slice(start, start + itemsPerPage) : [];

	return (
		<div
			id="highlight container"
			className={cn(
				"flex flex-col",
				"justify-items-center w-full justify-self-center gap-2",
				"h-fit",
				"",
				""
			)}>
			<h3 className="text-2xl font-medium mb-4">Continue reading</h3>

			<div className="flex items-center gap-3 w-full">
				{totalItems > itemsPerPage && pageIndex > 0 && (
					<button
						onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
						className={cn(iconBtnClass, "mt-10", "", "")}>
						<FaChevronLeft size={19} className="block" />
					</button>
				)}

				<div className="flex flex-row gap-5 w-full">
					{visible.map((book: Book, index: number) => {
						const formats = book.formats as
							| Record<string, string>
							| undefined;
						const image =
							formats?.["image/jpeg"] ||
							formats?.["image/jpg"] ||
							undefined;

						const authorNames = (book.authors || [])
							.map((a) => a?.name)
							.filter(
								(n): n is string =>
									typeof n === "string" && n.length > 0
							);
						const subtitle =
							authorNames.length === 0
								? undefined
								: authorNames.length === 1
								? authorNames[0]
								: `${authorNames.slice(0, -1).join("; ")} & ${
										authorNames[authorNames.length - 1]
								  }`;

						function formatLinkVars(prop: string) {
							return prop
								.trim()
								.toLowerCase()
								.normalize("NFKD")
								.replace(/[\u0300-\u036f]/g, "")
								.replace(/[^\w\s-]/g, "")
								.replace(/\s+/g, "-")
								.replace(/-+/g, "-");
						}

						const href = `/book-profile/${book.id}/${formatLinkVars(
							book.title
						)}`;

						return (
							<div
								key={`${book.id}-${start + index}`}
								className="w-1/3 flex items-end">
								<LastReadCard
									title={book.title}
									subtitle={subtitle}
									badge={{ text: tagLabel, variant: "pink" }}
									// image={image}
									image={
										index === 0
											? "/harry_potter.jpg"
											: index === 1
											? "/water_dancer.jpg"
											: index === 2
											? "/star.jpg"
											: // ? "/alan_moore.jpg"
											  image
									}
									href={href}
								/>
							</div>
						);
					})}
				</div>

				{totalItems > itemsPerPage && pageIndex < maxPage && (
					<button
						onClick={() =>
							setPageIndex((p) => Math.min(maxPage, p + 1))
						}
						className={cn(iconBtnClass, "mt-10", "", "")}>
						<FaChevronRight size={19} className="block" />
					</button>
				)}
			</div>
		</div>
	);
}
