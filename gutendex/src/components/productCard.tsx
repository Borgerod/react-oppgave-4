"use client";
import { cn } from "@/utils/cn";
import type { Author, Book } from "@/types";
import Image from "next/image";
import Rating from "./rating";
import Link from "next/link";
// import { useEffect, useState } from "react";
type Props = {
	book: Book;
	index?: number;
	upperDownloadCountLimit?: number;
};

export default function ProductCard({ book, upperDownloadCountLimit }: Props) {
	const formats = book.formats as Record<string, string> | undefined;
	const imgSrc = formats?.["image/jpeg"] || formats?.["image/jpg"] || "";

	console.log("upperDownloadCountLimit: ", upperDownloadCountLimit);

	// todo get count
	const download_count = book.download_count;
	function formatLinkVars(prop: string) {
		return prop
			.trim()
			.toLowerCase()
			.normalize("NFKD") // separate diacritics
			.replace(/[\u0300-\u036f]/g, "") // remove diacritics
			.replace(/[^\w\s-]/g, "") // remove punctuation except - and spaces
			.replace(/\s+/g, "-") // spaces -> dashes
			.replace(/-+/g, "-"); // collapse repeated dashes
	}
	return (
		// <Link href="/dashboard">Dashboard</Link>
		<Link
			// href={`/book-profile/${book.id}/${formatLinkVars(book.title)}`}
			href={`/book-profile/${book.id}/${formatLinkVars(book.title)}`}
			// href={`/book/${book.id}`}
			className={cn(
				"bg-container border-edge border rounded-3xl",
				// "hover:scale-105",
				"hover:bg-container-raised hover:scale-101",
				"",
				"",
				""
			)}>
			<div className={cn("overflow-hidden h-full rounded-3xl")}>
				<div className="flex flex-col justify-between gap-4 p-4 h-full">
					{imgSrc ? (
						<Image
							src={imgSrc}
							alt={book.title ?? "cover"}
							width={300}
							height={450}
							className={cn(
								"w-full h-auto object-cover rounded-xl aspect-2/3 ",
								// "hover:scale-105",
								""
							)}
							// TODO make hover animation for zoomin.
						/>
					) : (
						<div className="w-full rounded-xl aspect-2/3 bg-gray-100" />
					)}
					<div>
						{(() => {
							const _title = (book.title ?? "").split(/[;:]/, 2);
							return (
								<>
									<h2 className="text-2xl font-extralight text-primary p-0 m-0 leading-none">
										{_title[0] || "unknown"}
										{_title[1] && (
											<span className="text-sm italic font-thin text-secondary ml-2 mt-0 align-baseline ">
												{_title[1]}
											</span>
										)}
									</h2>
								</>
							);
						})()}
						{(book.authors || []).map((a: Author, i: number) => (
							<p key={i}>
								<span className="text-xs text-tertiary">
									By:{" "}
								</span>
								<span>
									{a?.name}
									{i < (book.authors || []).length - 2
										? "; "
										: i === (book.authors || []).length - 2
										? " & "
										: ""}
								</span>
								{(book.authors || []).length === 0 && "unknown"}
							</p>
						))}
					</div>

					<div className="flex flex-row flex-wrap gap-1 mt-2">
						<Rating
							ratingCount={download_count}
							upperDownloadCountLimit={
								upperDownloadCountLimit ?? 1
							}
						/>
						{(book.bookshelves || []).map(
							(shelf: string, index: number) =>
								shelf.includes("Category:") &&
								!shelf.includes("Literature") ? (
									<button
										key={`${shelf}-${index}`}
										className=""
										// onClick={}
										// TODO:
										//       "download_count": 303668
									>
										<span
											key={`${shelf}-${index}`}
											className={cn(
												"text-xs font-thin",
												"px-2 py-0.5",
												"rounded-full",
												"text-secondary",
												"text-primary/80",
												// "text-black",
												// "text-tertiary",
												"bg-foreground/10 hover:bg-foreground/30",
												"dark:bg-foreground/20 dark:hover:bg-foreground/30",
												"dark:bg-foreground/25 dark:hover:bg-foreground/35",
												"",
												"",
												""
											)}>
											{shelf.split("Category:")[1]}
										</span>
									</button>
								) : (
									""
								)
						)}
					</div>
					{/* TODO: check the versions maybe someone are kindle frieldy or not */}
					{/* TODO: would be funny to actually add prices and make the tutor pay to review the rest. */}
					<button
						className={cn(
							"rounded-full",
							"w-fit p-1 px-5",
							"border border-accent text-accent",
							"hover:border-accent-dark hover:text-black hover:bg-accent-dark",
							// "self-center",
							// "border border-edge",
							// "bg-accent text-black",
							"",
							""
						)}>
						Read more
					</button>
				</div>
			</div>
		</Link>
	);
}

//  <div
// 	key={book.id ?? index}
// 	className="bg-container border-edge border rounded-3xl">
// 	<div
// 		className={cn(
// 			"overflow-hidden h-full rounded-3xl"
// 		)}>
// 		<div className="flex flex-col justify-between gap-4 p-4 h-full">
// 			<img
// 				src={
// 					(book as any).formats[
// 						"image/jpeg"
// 					] ||
// 					(book as any).formats[
// 						"image/jpg"
// 					] ||
// 					""
// 				}
// 				alt={book.title ?? "cover"}
// 				className="w-full h-auto object-cover rounded-xl aspect-2/3"
// 			/>
// 			{(() => {
// 				const _title = (book.title ?? "").split(
// 					/[;:]/,
// 					2
// 				);
// 				return (
// 					<>
// 						<h2 className="text-2xl font-extralight text-primary">
// 							{_title[0] || "unknown"}
// 							{_title[1] && (
// 								<span className="text-sm italic font-thin text-secondary ml-2 align-baseline">
// 									{_title[1]}
// 								</span>
// 							)}
// 						</h2>
// 					</>
// 				);
// 			})()}
// 			<hr className="border-t border-edge my-2" />
// 			<p>
// 				By:{" "}
// 				{(book.authors || []).map((a, i) => (
// 					<span key={i}>
// 						{a?.name}
// 						{i < book.authors.length - 2
// 							? "; "
// 							: i ===
// 								book.authors.length - 2
// 							? " & "
// 							: ""}
// 					</span>
// 				))}
// 				{(book.authors || []).length === 0 &&
// 					"unknown"}
// 			</p>
// 			<hr className="border-t border-edge my-2" />
// 			<div>
// 				<details className="mb-2">
// 					<summary className="cursor-pointer font-medium">
// 						subjects
// 					</summary>
// 					<div className="flex flex-row flex-wrap gap-1 mt-2">
// 						{book.subjects.map(
// 							(
// 								subject: string,
// 								index: number
// 							) => (
// 								<span
// 									key={`${subject}-${index}`}
// 									className="text-xs px-2 py-0.5 rounded bg-edge/10">
// 									{subject}
// 								</span>
// 							)
// 						)}
// 					</div>
// 				</details>

// 				<details>
// 					<summary className="cursor-pointer font-medium">
// 						bookshelves
// 					</summary>
// 					<div className="flex flex-row flex-wrap gap-1 mt-2">
// 						{book.bookshelves.map(
// 							(
// 								shelf: string,
// 								index: number
// 							) => (
// 								<span
// 									key={`${shelf}-${index}`}
// 									className="text-xs px-2 py-0.5 rounded bg-edge/10">
// 									{shelf}
// 								</span>
// 							)
// 						)}
// 					</div>
// 				</details>
// 			</div>
// 		</div>
// </div>
