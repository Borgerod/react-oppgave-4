import type { Author, Book } from "@/types";
import { cn } from "@/utils/cn";
import { FaRegCopyright } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Tabs from "@/components/ui/tabs";
import { Tag } from "@/components/filters/tag";
import FavoriteButton from "@/components/ui/favoriteButton";

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

interface ProfileBioProps {
	book: Book;
}

export default function ProfileBio({ book }: ProfileBioProps) {
	return (
		<>
			{/* Book ID: {book.id} */}
			{/* TITLE */}

			{(() => {
				const t = book.title ?? { main: "unknown" };
				return (
					<div className="flex items-start gap-3 ">
						<h1 className="text-2xl font-extralight text-primary p-0 m-0 leading-none">
							{t.main || "unknown"}
							{t.sub && (
								<span className="text-sm italic font-thin text-secondary ml-2 mt-0 align-baseline ">
									{t.sub}
								</span>
							)}
						</h1>
						<FavoriteButton
							book={book}
							compact
							// className="text-secondary/20 w-5 h-5 ml-auto"
							// className="text-secondary/20 w-5 h-5 ml-auto md:ml-0 mr-2"
							className="text-secondary/20 w-5 h-5 ml-auto mr-2"
						/>
					</div>
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
					<div
						className="py-5 text-secondary text-md lg:text-sm"
						key={i}
					>
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
			<hr className="border-t w-full border-divider" aria-hidden="true" />

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
										<Tag
											key={i}
											id={`download-${i}`}
											item={prettyMime(mime)}
											url={String(url)}
											isDownload
											checked={false}
										/>
									)
								)}
								{/* <BookReadTracker book={book} /> */}
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
										<Tag
											key={i}
											id={`subject-${i}`}
											url={String(
												`/store?topic=${subject}`
											)}
											item={subject}
											checked={false}
										/>
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
										<Tag
											key={i}
											id={`bookshelf-${i}`}
											url={String(
												`/store?topic=${bookshelf}`
											)}
											item={bookshelf}
											checked={false}
										/>
									)
								)}
							</div>
						),
					},
				]}
			/>
		</>
	);
}
