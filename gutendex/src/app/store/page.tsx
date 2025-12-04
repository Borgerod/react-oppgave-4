// "use client";  // removed to make this a server component

import { cn } from "@/utils/cn";
import React from "react";
import { getBooks } from "../api/books/route";

// async function getBooks() {
// 	const data = await fetch("/api/books");
// 	// const data = await res.json(); // <-- required
// 	// console.log(data.results.length);
// 	// const keys =
// 	// 	data.results && data.results.length
// 	// 		? Object.keys(data.results[0])
// 	// 		: Object.keys(data);
// 	// console.log(keys);

// 	// console.log(data.results?.[0]?.bookshelves);
// 	// console.log(data.results?.[0]?.subjects);

// 	return data;
// }

// function parseProducts(results: any) {
// 	for (let index = 0; index < results.length; index++) {
// 		const book = results[index];
// 	}
// 	return {};
// }

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@mui/material";
import { title } from "process";

type Author = {
	name: string;
	birth_year: number;
	death_year: number;
};

type Book = {
	id: number;
	title: string;
	authors: Author[];
	summaries: object;
	editors: object;
	translators: object;
	subjects: string[];
	bookshelves: string[];
	languages: object;
	copyright: boolean;
	media_type: string;
	formats: object;
};

export default async function Store() {
	const data = await getBooks();
	// parseProducts(data.results);
	console.log(data.results.length);

	const first_item = data.results?.[0];
	console.log(JSON.stringify(data.results?.[0], null, 2));
	for (const key in first_item) {
		console.log(key, typeof first_item[key]);
	}
	return (
		<main className="min-h-screen">
			<div className="mx-auto flex max-w-6xl flex-col gap-8">
				{/* <div className="mx-auto flex max-w-3xl flex-col gap-8"> */}
				<header>
					<h1 className="text-2xl font-semibold">Store</h1>
				</header>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{data.results.map((book: Book, index: number) => (
						<div
							key={book.id ?? index}
							className="bg-container border-edge border rounded-3xl"
						>
							<div
								className={cn(
									"overflow-hidden h-full rounded-3xl"
								)}
							>
								<div className="flex flex-col justify-between gap-4 p-4 h-full">
									<img
										src={
											(book as any).formats[
												"image/jpeg"
											] ||
											(book as any).formats[
												"image/jpg"
											] ||
											""
										}
										alt={book.title ?? "cover"}
										className="w-full h-auto object-cover rounded-xl aspect-2/3"
									/>
									{(() => {
										const _title = (book.title ?? "").split(
											/[;:]/,
											2
										);
										return (
											<>
												<h2 className="text-2xl font-extralight text-primary">
													{_title[0] || "unknown"}
													{_title[1] && (
														<span className="text-sm italic font-thin text-secondary ml-2 align-baseline">
															{_title[1]}
														</span>
													)}
												</h2>
											</>
										);
									})()}
									<hr className="border-t border-edge my-2" />
									<p>
										By:{" "}
										{(book.authors || []).map((a, i) => (
											<span key={i}>
												{a?.name}
												{i < book.authors.length - 2
													? "; "
													: i ===
													  book.authors.length - 2
													? " & "
													: ""}
											</span>
										))}
										{(book.authors || []).length === 0 &&
											"unknown"}
									</p>
									<hr className="border-t border-edge my-2" />
									<div>
										<details className="mb-2">
											<summary className="cursor-pointer font-medium">
												subjects
											</summary>
											<div className="flex flex-row flex-wrap gap-1 mt-2">
												{book.subjects.map(
													(
														subject: string,
														index: number
													) => (
														<span
															key={`${subject}-${index}`}
															className="text-xs px-2 py-0.5 rounded bg-edge/10"
														>
															{subject}
														</span>
													)
												)}
											</div>
										</details>

										<details>
											<summary className="cursor-pointer font-medium">
												bookshelves
											</summary>
											<div className="flex flex-row flex-wrap gap-1 mt-2">
												{book.bookshelves.map(
													(
														shelf: string,
														index: number
													) => (
														<span
															key={`${shelf}-${index}`}
															className="text-xs px-2 py-0.5 rounded bg-edge/10"
														>
															{shelf}
														</span>
													)
												)}
											</div>
										</details>
									</div>
								</div>
							</div>
						</div>
					))}
					{/*
					<Grid size={4}></Grid>
					<Grid size={4}></Grid>
					<Grid size={8}></Grid> */}
				</div>
			</div>
		</main>
	);
}
