import type { Author, Book } from "@/types";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { FaRegCopyright } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Tabs from "@/components/tabs";
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
	console.log;
	return (
		<main
			className={cn(
				"justify-center",
				"justify-between",
				"pt-30",
				// "align-center",

				// "grid grid-cols-[3fr_2fr_0.5fr]",
				"grid grid-cols-[3fr_3fr_1fr]",
				"",
				""
			)}
		>
			<section
				id="profile-image left-side 1"
				className={cn(
					// "flex flex-col align-center",
					"p-5 flex-wrap text-wrap",
					// "min-w-0",
					"max-w-150",
					// "w-full",
					"h-full",

					"",
					""
				)}
			>
				<div
					className={cn(
						"grid grid-cols-3 grid-rows-1 items-center justify-center relative",
						"grid grid-cols-[1fr_6fr_1fr]",
						"",
						"",
						""
					)}
				>
					{imgSrc ? (
						<Image
							src={imgSrc}
							alt={book.title ?? "cover"}
							width={300}
							height={450}
							// fill={true}
							className={cn(
								"w-full h-auto object-cover rounded-xl aspect-2/3 z-10",
								"col-start-2 row-start-1",
								"shadow-2xl",
								// "p-15",
								// "h-full",
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
					"p-5 flex-wrap text-wrap",
					"h-full",
					"w-full",
					"min-w-0",
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
													"dark:bg-foreground/20 dark:hover:bg-foreground/30",
													"dark:bg-foreground/25 dark:hover:bg-foreground/35"
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
					"flex flex-col  align-center",
					"p-5 flex-wrap text-wrap",
					"h-full ",
					"justify-self-end",
					"",
					""
				)}
			>
				{/* TODO: get  books from same author Query*/}
				<h2 className="text-wrap">Discover</h2>
				<span className="text-xs text-secondary">
					other works by this author
				</span>
			</section>
		</main>
	);
}
