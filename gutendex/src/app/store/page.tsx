// ...existing code...
// "use client";  // removed to make this a server component

import { cn } from "@/utils/cn";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import React from "react";
import { Card, CardContent } from "@mui/material";
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

// add a Book type and type the fetched response
type Book = {
	// id?: string | number;
	// title?: string;
	// // include other fields you expect from the API
	// [key: string]: any;

	id: string;
	title: string;
	authors: string;
	summaries: string;
	editors: string;
	translators: string;
	subjects: string;
	bookshelves: string;
	languages: string;
	copyright: string;
	media_type: string;
	formats: string;
	download_count: string;
};

// export function parseProducts(results: any) {
// 	{
// 		results.map((t) => (
// 			<TaskCard
// 				key={t.id}
// 				task={t}
// 				onDelete={onDelete}
// 				onToggle={onToggle}
// 				onEdit={onEdit}
// 			/>
// 		));
// 	}
// 	for (let index = 0; index < results.length; index++) {
// 		const books = results[index];

// 		return (
// 			<html lang="en">
// 				<body>{books}</body>
// 			</html>
// 		);
// 	}
// }
export default async function Store() {
	const data = await getBooks();
	// parseProducts(data.results);
	console.log(data.results.length);
	return (
		<main className="min-h-screen">
			<div className="mx-auto flex max-w-3xl flex-col gap-8">
				<header>
					<h1 className="text-2xl font-semibold">Store</h1>
				</header>

				{/* <Grid container spacing={2}> */}
				{data.results.map((book: Book, index: number) => (
					<Grid size={8} component="div" key={book.id ?? index}>
						<Card
							sx={{ minWidth: 275 }}
							variant="outlined"
							className={cn("@container items-center")}>
							<CardContent>
								{/* {book.title} */}
								{/* {book.title ?? JSON.stringify(book)} */}
								{book.authors}
							</CardContent>
						</Card>
					</Grid>
				))}
				{/* 
					<Grid size={4}></Grid>
					<Grid size={4}></Grid>
					<Grid size={8}></Grid> */}
				{/* </Grid> */}
			</div>
		</main>
	);
}
// ...existing code...
