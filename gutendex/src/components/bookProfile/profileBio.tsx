import type { Author, Book, Person, Title } from "@/types";
function formatList(
	input: string[] | Person[] | Title | string | undefined | null
): string {
	/**
	 * Formats arrays of strings or Person objects for display.
	 * - For string[], joins with ", ".
	 * - For Person[], joins names with "; " and "&" before the last.
	 * - For string, returns the string or "None".
	 */
	if (Array.isArray(input)) {
		if (input.length === 0) return "None";
		if (typeof input[0] === "string") {
			return (input as string[]).join(", ");
		}
		if (typeof input[0] === "object" && input[0] && "name" in input[0]) {
			const names = (input as Person[])
				.map((p) => p.name)
				.filter(Boolean);
			if (names.length === 0) return "None";
			return names.reduce(
				(acc, name, i, arr) =>
					i === 0
						? name
						: i === arr.length - 1
						? `${acc} & ${name}`
						: `${acc}; ${name}`,
				""
			);
		}
	}
	if (typeof input === "string") {
		return input || "None";
	}
	return "None";
}
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
		<div className="grid grid-cols-1 grid-rows-[auto_auto_auto] gap-5">
			{/* Book ID: {book.id} */}
			{/* TITLE */}
			<div>
				{(() => {
					const t = book.title ?? { main: "unknown" };
					return (
						// <div className="flex items-start gap-3 justify-between ">
						<div className="flex items-center gap-3 justify-between ">
							<h1 className="text-2xl font-extralight text-primary p-0 m-0 leading-none">
								{t.main || "unknown"}
								{t.sub && (
									<span className="text-sm italic font-thin text-secondary ml-2 mt-0 align-baseline ">
										{t.sub}
									</span>
								)}
							</h1>
							{/* TODO MOVE THIS */}
							<FavoriteButton
								book={book}
								// compact
								// className="text-secondary/20 w-5 h-5 ml-auto"
								// className="text-secondary/20 w-5 h-5 ml-auto md:ml-0 mr-2"
								// className="text-secondary/20 w-5 h-5 ml-auto mr-2 relative left-0 right-0 top-0 bottom-0 p-2 w-8"
								// className="text-secondary/20 ml-auto mr-2 relative left-0 right-0 top-0 bottom-0 p-2"
								className="relative left-0 right-0 top-0 bottom-0"
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
			</div>
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
						key={i}>
						{paragraphs.length === 0
							? "unknown"
							: paragraphs.map((p, idx) =>
									idx === 0 ? (
										<p
											className="italic font-thin"
											key={`summary-${i}-${idx}`}>
											{p}
										</p>
									) : (
										<p
											className="py-5"
											key={`summary-${i}-${idx}`}>
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
					"grid",
					// "grid-cols-2",
					"gap-2",
					// "p-5",
					"items-baseline",
					"justify-items-start",
					"justify-between",
					// "justify-evenly",
					// "justify",
					// "justify-around",
					// "justify-items-between",
					// "place-content-between",
					// "justify-content-between",
					// "content-between",
					// "items-between",
					// "self-start",
					// "w-full",
					"gap-y-2",
					"gap-x-4",
					// "gap-x-auto",
					"",
					""
				)}>
				{/* TITLE */}
				<div
					id="title"
					className="flex flex-row gap-x-2 items-baseline ">
					<span id="key" className="text-sm  min-w-22">
						Title
					</span>
					<span
						id="values"
						className="text-sm text-secondary wrap-break-word">
						{formatList(book.title.main)}
					</span>
				</div>
				{/* ID */}
				<div id="id" className="flex flex-row gap-x-2 items-baseline ">
					<span id="key" className="text-sm  min-w-22">
						ID
					</span>
					<span
						id="values"
						className="text-sm text-secondary wrap-break-word">
						{formatList(book.id.toString())}
					</span>
				</div>

				{/* AUTHORS */}
				<div
					id="authors"
					className="flex flex-row gap-x-2 items-baseline ">
					<span id="key" className="text-sm  min-w-22">
						Authors
					</span>
					<span
						id="values"
						className="text-sm text-secondary wrap-break-word">
						{formatList(book.authors)}
					</span>
				</div>

				{/* Languages */}
				<div
					id="languages"
					className="flex flex-row gap-x-2 items-baseline">
					<span id="key" className="text-sm  min-w-22">
						Languages
					</span>
					<span
						id="values"
						className="text-sm text-secondary wrap-break-word">
						{formatList(book.languages)}
					</span>
				</div>
				{/* Editors */}
				<div
					id="editors"
					className="flex flex-row gap-x-2 items-baseline ">
					<span id="key" className="text-sm  min-w-22">
						Editors
					</span>
					<span
						id="values"
						className="text-sm text-secondary wrap-break-word">
						{formatList(book.editors)}
					</span>
				</div>

				{/* Media Type */}
				<div
					id="media_type"
					className="flex flex-row gap-x-2 items-baseline">
					<span id="key" className="text-sm  min-w-22">
						Media Type
					</span>
					<span
						id="values"
						className="text-sm text-secondary wrap-break-word">
						{formatList(book.media_type)}
					</span>
				</div>
				{/* Translators */}
				<div
					id="translators"
					className="flex flex-row gap-x-2 items-baseline ">
					<span id="key" className="text-sm  min-w-22">
						Translators
					</span>
					<span
						id="values"
						className="text-sm text-secondary wrap-break-word">
						{formatList(book.translators)}
					</span>
				</div>
				{/* COPYRIGHT */}
				<div id="copyright" className="grid grid-cols-2 gap-2  ">
					<span id="key" className="text-sm min-w-22">
						Copyright
					</span>
					<span id="values" className="text-sm text-secondary/80">
						{/* todo make icon */}
						{book.copyright ? (
							<div className="grid grid-cols-1 grid-rows-1">
								<FaRegCopyright
									title="is copyrighted"
									className="row-start-1 col-start-1 "
								/>
							</div>
						) : (
							<div className="grid grid-cols-1 grid-rows-1">
								<FaRegCopyright
									title="is not copyrighted"
									className="row-start-1 col-start-1 "
								/>
								<IoMdClose className="row-start-1 col-start-1 " />
							</div>
						)}
					</span>
					{/*  */}
				</div>

				{/* Formats */}
				<div
					id="formats"
					className="flex flex-row gap-x-2 col-span-2 items-baseline ">
					<span id="key" className="text-sm min-w-22">
						Formats
					</span>
					<span id="value" className="text-sm text-secondary">
						{formatList(
							Object.keys(book.formats || {}).map(prettyMime)
						)}
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
		</div>
	);
}
