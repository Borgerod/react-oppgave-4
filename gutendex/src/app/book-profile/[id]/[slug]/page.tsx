import type { Book } from "@/types";
import { parseTitle } from "@/utils/title";
import { cn } from "@/utils/cn";
import ProfileImage from "@/components/bookProfile/profileImage";
import ProfileBio from "@/components/bookProfile/profileBio";
import AuthorDiscover from "@/components/bookProfile/authorDiscover";
import BookReadTracker from "@/components/bookProfile/bookReadTracker";

async function fetchBook(id: number): Promise<Book | null> {
	const res = await fetch(`https://gutendex.com/books/${id}`, {
		next: { revalidate: 3600 }, // Cache for 1 hour
	});

	if (!res.ok) return null;
	const data = await res.json();
	try {
		data.title = parseTitle(data.title);
	} catch (e) {
		console.error("Error parsing book title:", e);
	}
	return data;
}
export default async function BookProfilePage({
	params,
}: {
	params:
		| { id: string; slug: string }
		| Promise<{ id: string; slug: string }>;
}) {
	const { id } = await params;
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
	const res = await fetch(`https://gutendex.com/books${queryString}`, {
		next: { revalidate: 3600 }, // Cache for 1 hour
	}); //other works of this author
	// const json = await res.json();
	const data = await res.json();
	try {
		if (data && Array.isArray(data.results)) {
			data.results = data.results.map((r: Book) => ({
				...r,
				title: parseTitle(r.title),
			}));
		}
	} catch (e) {
		console.error("Error parsing author book results:", e);
	}
	// if (mounted) setData(json);
	return (
		<main
			className={cn(
				"flex-1",
				"min-h-0",
				"mt-30",
				"mt-15",
				"w-screen",
				"items-stretch",
				"self-center",
				"overflow-auto",
				"max-w-7xl",

				// mobile
				"pb-0",
				"grid",
				"grid-cols-1",
				"grid-rows-3",
				"grid-rows-[auto_auto_auto]",
				"w-full",
				// md
				"md:grid-cols-2",
				"md:grid-rows-[auto_1fr]",
				"md:grid-cols-[1fr_auto]",
				"md:px-20",
				"pb-20",
				"gap-20",
				"gap-10",
				// lg
				// "lg:flex-none",
				// "lg:w-auto",
				// "lg:grid-cols-[auto_1fr_auto]",
				// "lg:grid-rows-1",
				// "lg:gap-0",
				// "lg:h-[70vh]",
				// "lg:overflow-hidden",
				// "lg:px-10",
				// "lg:py-0",
				// "lg:my-auto",
				// "lg:mx-auto",
				"",
				""
			)}>
			<section
				id="profile-image left-side 1"
				className={cn(
					"text-wrap",
					"p-5 min-h-0 w-full",
					"self-center",
					"row-start-1 row-span-1 col-start-1 col-span-1",
					"w-full",
					"h-full",
					"flex items-center justify-center",
					"md:px-0",
					// lg
					// "lg:w-auto",
					// "lg:w-full",
					// "lg:min-w-64",
					// "lg:h-full",
					// "bg-amber-100",
					"",
					""
				)}>
				<ProfileImage
					imgSrc={imgSrc}
					title={book.title.main ?? "cover"}
				/>
			</section>

			<section
				id="profile-bio middle-side 2"
				className={cn(
					"flex flex-col align-center",
					"p-5 text-wrap",
					"min-h-0",
					"w-full",
					"min-w-0",

					// mobile
					"row-start-2 row-span-1 col-start-1 col-span-full",
					// md
					"md:row-span-1 md:row-start-1 md:col-start-2 md:col-span-1",
					"md:w-lg",
					"md:w-150",
					"md:h-fit",
					// lg
					// "lg:row-span-1 lg:row-start-1 lg:col-start-2 lg:col-span-1",
					// "lg:h-auto",
					// "lg:h-full",
					// "lg:h-auto",
					// "lg:w-full",
					// "lg:px-5",
					// "lg:self-start",

					"px-0",
					// "gap-10",
					// "bg-amber-300",
					"",
					""
				)}>
				<ProfileBio book={book} />
				<BookReadTracker book={book} />
				<hr
					className="flex md:hidden border-t w-full border-divider mt-5"
					aria-hidden="true"
				/>
			</section>
			<hr
				className=" flex row-start-3 md:row-start-2 md:col-span-full border-t w-full border-divider"
				aria-hidden="true"
			/>

			<section
				id="author-discover right-side 3 "
				className={cn(
					// "mt-5",
					"md:mt-0",
					"p-5 text-wrap",
					"min-h-0",

					"grid",
					"grid-cols-1 grid-rows-1",
					"md:grid-rows-[auto]",
					//mobile
					"row-start-3 row-span-1 col-start-1 col-span-full",
					//md
					"md:row-start-2 md:row-span-1 md:col-start-1 md:col-span-full",
					//lg

					//! TEMP DISABLE maybe perm
					// "lg:row-start-1 lg:row-span-1 lg:col-start-3 lg:col-span-1",
					// "lg:grid-rows-[auto_1fr]",
					// "lg:h-full",
					// "lg:w-90",
					// "lg:self-start",
					// "lg:p-0",
					// "bg-amber-600",
					// "gap-5",
					"",
					""
				)}>
				<AuthorDiscover data={data} currentBookId={book.id} />
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
