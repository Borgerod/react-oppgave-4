import type { Book } from "@/types";
import { cn } from "@/utils/cn";
import CardSkeleton from "@/components/store/cardSkeleton";
import MiniProductCard from "../store/miniCard";

interface AuthorDiscoverProps {
	data: { results: Book[] } | null;
	currentBookId: number;
}

export default function AuthorDiscover({
	data,
	currentBookId,
}: AuthorDiscoverProps) {
	return (
		<>
			{/* TODO: get  books from same author Query*/}
			<div
				id="discover header"
				className={cn(
					// mobile
					// "border-t border-divider md:border-0 pt-10",
					"flex flex-row items-baseline gap-2",
					// md:
					"md:flex md:flex-row", //keep this because i might change it later
					// lg:
					// "lg:flex-col lg:gap-0",

					"",
					""
				)}>
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
					// "md:flex md:flex-row md:flex-nowrap md:items-start",
					// On large screens collapse into a vertical column.
					// "lg:flex-col lg:flex-nowrap",
					"items-start",
					"mt-2",
					"lg:mt-5",
					"gap-5",
					"overflow-auto",
					"min-h-0",
					"pb-2",
					"px-1",
					// "h-fit",

					"",
					""
				)}>
				{!data?.results
					? Array.from({ length: 5 }).map((_, index) => (
							<CardSkeleton key={index} mini />
					  ))
					: data.results.map((discoverBook: Book, index: number) =>
							// skips the same book as profile
							currentBookId === discoverBook.id ? null : (
								<MiniProductCard
									key={discoverBook.id ?? index}
									book={discoverBook}
									index={index}
									// mini
								/>
							)
					  )}
				{/* <div className="h-full overflow-auto">					</div> */}
			</ul>
		</>
	);
}

// import type { Book } from "@/types";
// import { cn } from "@/utils/cn";
// import ProductCard from "@/components/store/productCard";
// import CardSkeleton from "@/components/store/cardSkeleton";

// interface AuthorDiscoverProps {
// 	data: { results: Book[] } | null;
// 	currentBookId: number;
// }

// export default function AuthorDiscover({
// 	data,
// 	currentBookId,
// }: AuthorDiscoverProps) {
// 	return (
// 		<>
// 			{/* TODO: get  books from same author Query*/}
// 			<div
// 				id="discover header"
// 				className={cn(
// 					// mobile
// 					"flex flex-row items-baseline gap-2",
// 					// md:
// 					"md:flex md:flex-row", //keep this because i might change it later
// 					// lg:
// 					"lg:flex-col lg:gap-0",

// 					"",
// 					""
// 				)}
// 			>
// 				<h2 className="text-wrap">Discover</h2>
// 				<span className="text-xs text-secondary">
// 					other works by this author
// 				</span>
// 			</div>

// 			<ul
// 				className={cn(
// 					"row-start-2",
// 					// Mobile: use a grid with 2 rows; columns flow horizontally and
// 					// the number of columns depends on the number of items.
// 					"grid grid-rows-2 grid-flow-col auto-cols-min auto-rows-min",
// 					// Keep grid on small screens; switch to flex starting at `md`.
// 					"md:flex md:flex-row md:flex-nowrap md:items-start",
// 					// On large screens collapse into a vertical column.
// 					"lg:flex-col lg:flex-nowrap",
// 					"items-start",
// 					"mt-2",
// 					"lg:mt-5",
// 					"gap-5",
// 					"overflow-auto",
// 					"min-h-0",
// 					"pb-2",
// 					"px-1",
// 					// "h-fit",

// 					"",
// 					""
// 				)}
// 			>
// 				{!data?.results
// 					? Array.from({ length: 5 }).map((_, index) => (
// 							<CardSkeleton key={index} mini />
// 					  ))
// 					: data.results.map((discoverBook: Book, index: number) =>
// 							// skips the same book as profile
// 							currentBookId === discoverBook.id ? null : (
// 								<ProductCard
// 									key={discoverBook.id ?? index}
// 									book={discoverBook}
// 									index={index}
// 									mini
// 								/>
// 							)
// 					  )}
// 				{/* <div className="h-full overflow-auto">					</div> */}
// 			</ul>
// 		</>
// 	);
// }
