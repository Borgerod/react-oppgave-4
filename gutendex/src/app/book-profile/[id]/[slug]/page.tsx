import type { Author, Book } from "@/types";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { FaRegCopyright } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Tabs from "@/components/tabs";
import ProductCard from "@/components/productCard";
async function fetchBook(id: number): Promise<Book | null> {
	const res = await fetch(`https://gutendex.com/books/${id}`, {
		cache: "no-store",
	});

	if (!res.ok) return null;
	return res.json();
}
// friendly labels for common MIME types
const FORMAT_LABELS: Record<string, string> = {
	"text/html": "HTML",
	"application/epub+zip": "EPUB",
	"application/x-mobipocket-ebook": "MOBI",
	"text/plain; charset=us-ascii": "Plain text (us-ascii)",
	"application/rdf+xml": "RDF",
	"image/jpeg": "JPEG",
	"application/octet-stream": "ZIP",
};

function prettyMime(mime?: string) {
	if (!mime) return "unknown";
	const key = mime.split(";")[0].trim().toLowerCase();
	if (FORMAT_LABELS[key]) return FORMAT_LABELS[key];
	const parts = key.split("/");
	if (parts.length === 2) {
		const subtype = parts[1].split("+")[0].replace(/[-._]/g, " ");
		return subtype.charAt(0).toUpperCase() + subtype.slice(1);
	}
	return mime;
}
export default async function BookProfilePage({
	params,
}: {
	params:
		| { id: string; slug: string }
		| Promise<{ id: string; slug: string }>;
}) {
	const { id, slug } = await params;
	const book = await fetchBook(Number(id));

	//? strictly don't need this.
	if (Number.isNaN(id)) {
		return <div>Invalid book id.</div>;
	}

	if (!book) {
		return <div>Book not found.</div>;
	}

	// Images(s)
	const formats = book.formats as Record<string, string> | undefined;
	const imgSrc = formats?.["image/jpeg"] || formats?.["image/jpg"] || "";
	const trimmed = (book.authors[0].name ?? "").trim();
	if (!trimmed) return;
	const encoded = encodeURIComponent(trimmed);
	const queryString = `?search=${encoded}`;
	// const res = await fetch(`/api/books${queryString}`); //other works of this author
	const res = await fetch(`https://gutendex.com/books${queryString}`); //other works of this author
	// const json = await res.json();
	const data = await res.json();
	// if (mounted) setData(json);
	return (
		<main
			className={cn(
				"flex-1",
				"min-h-0",
				"mt-30",
				"mt-15",
				"w-screen",
				" lg:gap-x-3",
				"items-stretch",
				"self-center",

				// "min-h-screen",
				"overflow-auto",
				"lg:min-h-0",
				"lg:overflow-visible",
				"max-w-7xl",
				// "max-w-10xl",

				// mobile
				"pb-0",
				"grid",
				"grid-cols-1",
				"grid-rows-3",
				"grid-rows-[1fr_auto_1fr]",
				"grid-rows-[auto_auto_auto]",
				// "grid-rows-[1fr_1fr_1fr]",
				"w-full",
				// md
				"md:grid-cols-2",
				"md:grid-rows-[3fr_1fr]",

				// lg
				// "lg:grid-cols-[4fr_4fr_3fr]",
				"lg:pb-40",
				"pb-20",
				"lg:grid-cols-[4fr_4fr_3fr]",
				"lg:grid-cols-[auto_4fr_3fr]",
				// "lg:grid-cols-[auto_auto_auto]",
				// todo: 4fr_4fr_3fr does not work, i need 4fr_4fr_2fr or something, but i need to adjust "max-w-7xl" in layout to make that happen
				"lg:grid-rows-1",
				"",
				""
			)}
		>
			<section
				id="profile-image left-side 1"
				className={cn(
					"p-5 text-wrap",
					"lg:max-w-150",
					"md:max-w-150",
					"max-w-none",
					"lg:px-0 ",
					"min-h-0",
					// "lg:w-fit",
					// center vertically on medium and large screens
					"md:self-center md:place-self-center",
					"lg:self-center lg:place-self-center",
					// "justify-items-center",
					// "aling-center",

					// "lg:px-5",
					// "md:px-5",
					// "h-full",
					// "lg: h-fit",
					// "h-fit",
					//
					// "grid grid-rows-[1fr_1fr_1fr]",
					// mobile
					"row-start-1 row-span-1 col-start-1 col-span-full w-full", // vill ikke w-full i mobile
					// md
					"md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1",
					// lg
					"lg:row-start-1 lg:row-span-1 lg:col-start-1 lg:col-span-1",

					//
					// "bg-amber-100",
					"",
					"",
					""
				)}
			>
				<div
					className={cn(
						"grid grid-cols-3 grid-rows-1 items-center justify-center relative",
						"grid grid-cols-[1fr_6fr_1fr]",
						"row-start-2",
						"max-w-none w-fit",
						"lg:mx-0",
						// center this block horizontally within its parent
						"mx-auto justify-self-center",
						// "self-center justify-self-center",
						// "place-self-center",

						"content-center",
						"",
						""
					)}
				>
					{imgSrc ? (
						<Image
							src={imgSrc}
							alt={book.title ?? "cover"}
							width={220}
							height={330}
							// fill={true}
							className={cn(
								// set an explicit width so the image is larger
								"w-[220px] sm:w-[220px] md:w-[260px] h-auto object-cover rounded-xl aspect-2/3 z-10",
								"w-[220px] sm:w-[220px] md:w-[260px] h-auto object-cover rounded-xl aspect-2/3 z-10",
								"col-start-2 row-start-1",
								"shadow-2xl",
								"",
								""
							)}
							// TODO make hover animation for zoomin.
						/>
					) : (
						<div className="w-full  rounded-xl aspect-2/3 bg-divider" />
					)}
					<div className="rounded-full bg-divider/30 w-full aspect-square col-start-1 col-span-3 row-start-1 z-0"></div>
				</div>
			</section>

			<section
				id="profile-bio middle-side 2"
				className={cn(
					"flex flex-col align-center",
					// "mb-4 md:mb-0",
					"p-5 text-wrap",
					"min-h-0",
					"w-full",
					"min-w-0",

					// mobile
					"row-start-2 row-span-1 col-start-1 col-span-full",
					// md
					"md:row-span-1 md:row-start-1 md:col-start-2 md:col-span-1",
					// lg
					"lg:row-span-1 lg:row-start-1 lg:col-start-2 lg:col-span-1",

					// "lg:mr-5",
					// "bg-amber-300",
					"",
					""
				)}
			>
				{/* Book ID: {book.id} */}
				{/* TITLE */}
				{(() => {
					const _title = (book.title ?? "").split(/[;:]/, 2);
					return (
						<>
							<h1 className="text-2xl font-extralight text-primary p-0 m-0 leading-none">
								{_title[0] || "unknown"}
								{_title[1] && (
									<span className="text-sm italic font-thin text-secondary ml-2 mt-0 align-baseline ">
										{_title[1]}
									</span>
								)}
							</h1>
						</>
					);
				})()}
				{/* AUTHORS */}
				{(book.authors || []).map((a: Author, i: number) => (
					<h3 key={i}>
						<span className="text-xs text-secondary">By: </span>
						<span className="text-xs font-semibold">
							{a?.name}
							{i < (book.authors || []).length - 2
								? "; "
								: i === (book.authors || []).length - 2
								? " & "
								: ""}
						</span>
						{(book.authors || []).length === 0 && "unknown"}
					</h3>
				))}

				{/* SUMMARY */}
				{(book.summaries || []).map((summary: string, i: number) => {
					const paragraphs = (summary ?? "")
						.split(
							/\/|\\|\.\s{2,}|\(This is an automatically generated summary\.\)/
						)
						.map((s) => s.trim())
						.filter(Boolean);

					return (
						<div className="py-5 text-secondary text-sm" key={i}>
							{paragraphs.length === 0
								? "unknown"
								: paragraphs.map((p, idx) =>
										idx === 0 ? (
											<p
												className="italic font-thin"
												key={`summary-${i}-${idx}`}
											>
												{p}
											</p>
										) : (
											<p
												className="py-5"
												key={`summary-${i}-${idx}`}
											>
												{p}
											</p>
										)
								  )}
						</div>
					);
				})}

				{/* divider line */}
				<hr
					className="border-t w-full border-divider"
					aria-hidden="true"
				/>

				{/* INFO TABLE */}
				<div
					id="info table"
					className={cn(
						"grid grid-cols-2 gap-2",
						"p-5",
						"items-baseline",
						"justify-items-start",
						"",
						"gap-y-2",
						"gap-x-4"
					)}
				>
					{/* editors */}
					<div className="grid grid-cols-2 gap-2">
						<span id="key" className="text-sm font-medium">
							Editors
						</span>
						<div className="text-sm text-secondary">
							{(book.editors || []).length === 0
								? "None"
								: (book.editors || []).map(
										(editor: string, i: number) => (
											<div key={i}>{editor}</div>
										)
								  )}
						</div>
					</div>

					{/* language */}
					<div className="grid grid-cols-2 gap-2">
						<span id="key" className="text-sm font-medium">
							Languages
						</span>
						<span className="text-sm text-secondary">
							{Array.isArray(book.languages)
								? book.languages.length
									? book.languages.join(", ")
									: "None"
								: book.languages
								? book.languages
								: "None"}
						</span>
					</div>
					<div className="grid grid-cols-2 gap-2">
						<span id="key" className="text-sm font-medium">
							Translators
						</span>
						<span className="text-sm text-secondary">
							{Array.isArray(book.translators)
								? book.translators.length
									? book.translators.join(", ")
									: "None"
								: book.translators
								? book.translators
								: "None"}
						</span>
					</div>
					<div className="grid grid-cols-2 gap-2">
						{/* Mediatype */}
						<span id="key" className="text-sm font-medium">
							Media Type
						</span>
						<span className="text-sm text-secondary">
							{book.media_type || "None"}
						</span>
					</div>

					<div className="grid grid-cols-2 gap-2">
						{/* copy right */}
						<span id="key" className="text-sm font-medium">
							Copyright
						</span>
						<span className="text-lg text-secondary">
							{/* todo make icon */}
							{book.copyright ? (
								<div className="grid grid-cols-1 grid-rows-1">
									<FaRegCopyright className="row-start-1 col-start-1" />
									<IoMdClose className="row-start-1 col-start-1" />
								</div>
							) : (
								<div className="grid grid-cols-1 grid-rows-1">
									<FaRegCopyright className="row-start-1 col-start-1" />
									<IoMdClose className="row-start-1 col-start-1" />
								</div>
							)}
						</span>
						{/*  */}
					</div>

					{/* Formats */}
					<div className="col-span-2 flex flex-row justify-start items-baseline gap-x-4">
						<span id="key" className="text-sm font-medium">
							Formats
						</span>
						<span className="text-sm text-secondary block">
							{Object.keys(book.formats || {}).length === 0
								? "None"
								: Object.keys(book.formats || {})
										.map(prettyMime)
										.join(", ")}
						</span>
					</div>
				</div>

				{/* Tabbed: Downloads, Subjects, Bookshelves */}
				<Tabs
					tabs={[
						{
							id: "downloads",
							label: "Downloads",
							content: (
								<p className="flex flex-row flex-wrap gap-2">
									{Object.entries(book.formats || {}).map(
										([mime, url], i) => (
											<a
												key={i}
												href={url}
												className={cn(
													"text-xs font-thin",
													"text-nowrap",
													"px-2 py-0.5",
													"rounded-full",
													"text-secondary",
													"text-primary/80",
													"bg-foreground/10 hover:bg-foreground/30",
													"dark:bg-foreground/20 dark:hover:bg-foreground/30",
													"dark:bg-foreground/25 dark:hover:bg-foreground/35"
												)}
												target="_blank"
												rel="noopener noreferrer"
											>
												{prettyMime(mime)}
											</a>
										)
									)}
								</p>
							),
						},
						{
							id: "subjects",
							label: "Subjects",
							content: (
								<div className="flex flex-row flex-wrap gap-2">
									{(book.subjects || []).map(
										(subject: string, i: number) => (
											<a
												key={i}
												className={cn(
													"text-xs font-thin",
													"text-nowrap",
													"px-2 py-0.5",
													"rounded-full",
													"text-secondary",
													"text-primary/80",
													"w-fit",
													"bg-foreground/10 hover:bg-foreground/30",
													"dark:bg-foreground/20 dark:hover:bg-foreground/30"
												)}
												target="_blank"
												rel="noopener noreferrer"
											>
												{subject}
											</a>
										)
									)}
								</div>
							),
						},
						{
							id: "bookshelves",
							label: "Bookshelves",
							content: (
								<div className="flex flex-row flex-wrap gap-2">
									{(book.bookshelves || []).map(
										(bookshelf: string, i: number) => (
											<a
												key={i}
												className={cn(
													"text-xs font-thin",
													"text-nowrap",
													"px-2 py-0.5",
													"rounded-full",
													"text-secondary",
													"text-primary/80",
													"w-fit",
													"bg-foreground/10 hover:bg-foreground/30",
													"dark:bg-foreground/20 dark:hover:bg-foreground/30",
													"dark:bg-foreground/25 dark:hover:bg-foreground/35"
												)}
												target="_blank"
												rel="noopener noreferrer"
											>
												{bookshelf}
											</a>
										)
									)}
								</div>
							),
						},
					]}
				/>
			</section>

			<section
				id="author-discover right-side 3 "
				className={cn(
					"mt-5",

					"md:mt-0",
					"lg:mt-5",
					"p-5 text-wrap",
					"min-h-0",
					"lg:p-0",

					"grid",
					"grid-cols-1 grid-rows-1", //? need this?
					// "grid-cols-auto grid-rows-2", //? need this?
					// "grid-cols-[auto] grid-rows-1", //? need this?
					// "grid-cols-[1fr] grid-rows-1", //? need this?
					// "grid-rows-[auto_1fr]", //? need this?
					"lg:grid-rows-[auto_1fr]", //? need this?
					"md:grid-rows-[auto]", //? need this?
					// "flex flex-row flex-nowrap gap-4 overflow-auto",
					//mobile
					"row-start-3 row-span-1 col-start-1 col-span-full",
					//md
					"md:row-start-2 md:row-span-1 md:col-start-1 md:col-span-full",
					//lg
					// "lg:row-start-1 lg:row-span-1 lg:-col-start-1 lg:col-span-1",
					"lg:row-start-1 lg:row-span-1 lg:col-start-3 lg:col-span-1 ",

					// "bg-amber-600",

					"",
					""
				)}
			>
				{/* TODO: get  books from same author Query*/}
				<div
					id="discover header"
					className={cn(
						// mobile
						"flex flex-row items-baseline gap-2",
						// md:
						"md:flex md:flex-row", //keep this because i might change it later
						// lg:
						"lg:flex-col lg:gap-0",

						"",
						""
					)}
				>
					<h2 className="text-wrap">Discover</h2>
					<span className="text-xs text-secondary">
						other works by this author
					</span>
				</div>

				<ul
					className={cn(
						"row-start-2",
						// Mobile: use a grid with 2 rows; columns flow horizontally and
						// the number of columns depends on the number of items.
						"grid grid-rows-2 grid-flow-col auto-cols-min auto-rows-min",
						// Keep grid on small screens; switch to flex starting at `md`.
						"md:flex md:flex-row md:flex-nowrap md:items-start",
						// On large screens collapse into a vertical column.
						"lg:flex-col lg:flex-nowrap",
						"items-start",
						"mt-2",
						"lg:mt-5",
						"gap-4",
						"overflow-auto",
						"min-h-0",
						"pb-2",
						"px-1",
						"",
						""
					)}
				>
					{data.results.map((discoverBook: Book, index: number) =>
						// skips the same book as profile
						book.id === discoverBook.id ? null : (
							<ProductCard
								key={discoverBook.id ?? index}
								book={discoverBook}
								index={index}
								mini
							/>
						)
					)}
					{/* <div className="h-full overflow-auto">
						
					</div> */}
				</ul>
			</section>
		</main>
	);
}

//

// <div className="h-full w-70 p-20 bg-amber-800 flex justify-center items-center ">
// 	1
// </div>
// <div className="h-full w-70 p-20 bg-amber-800 flex justify-center items-center ">
// 	2
// </div>
// <div className="h-full w-70 p-20 bg-amber-800 flex justify-center items-center ">
// 	3
// </div>
// <div className="h-full w-70 p-20 bg-amber-800 flex justify-center items-center ">
// 	4
// </div>
// <div className="h-full w-70 p-20 bg-amber-800 flex justify-center items-center ">
// 	5
// </div>
// <div className="h-full w-70 p-20 bg-amber-800 flex justify-center items-center">
// 	6
// </div>
// <div className="h-full w-70 p-20 bg-amber-800 flex justify-center items-center">
// 	7
// </div>
