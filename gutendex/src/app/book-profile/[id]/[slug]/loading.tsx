import { cn } from "@/utils/cn";
import CardSkeleton from "@/components/cardSkeleton";

export default function Loading() {
	return (
		<main
			className={cn(
				"flex-1",
				"min-h-0",
				"mt-30",
				"mt-15",
				"w-screen",
				"lg:gap-x-3",
				"items-stretch",
				"self-center",
				"overflow-auto",
				"lg:min-h-0",
				"lg:overflow-visible",
				"max-w-7xl",
				"pb-0",
				"grid",
				"grid-cols-1",
				"grid-rows-[auto_auto_auto]",
				"w-full",
				"md:grid-cols-2",
				"md:grid-rows-[3fr_1fr]",
				"lg:pb-40",
				"pb-20",
				"lg:grid-cols-[auto_4fr_3fr]",
				"lg:grid-rows-1"
			)}>
			{/* Image skeleton */}
			<section
				className={cn(
					"p-5 text-wrap",
					"lg:max-w-150",
					"md:max-w-150",
					"max-w-none",
					"lg:px-0",
					"min-h-0",
					"md:self-center md:place-self-center",
					"lg:self-center lg:place-self-center",
					"row-start-1 row-span-1 col-start-1 col-span-full w-full",
					"md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1",
					"lg:row-start-1 lg:row-span-1 lg:col-start-1 lg:col-span-1"
				)}>
				<div className="grid grid-cols-[1fr_6fr_1fr] row-start-2 max-w-none w-fit mx-auto justify-self-center content-center">
					<div className="self-center w-[220px] sm:w-[220px] md:w-[260px] h-[330px] sm:h-[330px] md:h-[390px] rounded-xl bg-edge animate-pulse col-start-2 row-start-1 z-10 shadow-2xl" />
					<div className="rounded-full bg-divider/30 w-full aspect-square col-start-1 col-span-3 row-start-1 z-0" />
				</div>
			</section>

			{/* Content skeleton */}
			<section
				className={cn(
					"flex flex-col align-center",
					"p-5 text-wrap",
					"min-h-0",
					"w-full",
					"min-w-0",
					"row-start-2 row-span-1 col-start-1 col-span-full",
					"md:row-span-1 md:row-start-1 md:col-start-2 md:col-span-1",
					"lg:row-span-1 lg:row-start-1 lg:col-start-2 lg:col-span-1"
				)}>
				{/* Title skeleton */}
				<div className="h-8 bg-divider animate-pulse rounded w-3/4 mb-2" />

				{/* Author skeleton */}
				<div className="h-4 bg-divider animate-pulse rounded w-1/2 mb-5" />

				{/* Summary skeleton */}
				<div className="space-y-2 py-5">
					<div className="h-3 bg-divider animate-pulse rounded w-full" />
					<div className="h-3 bg-divider animate-pulse rounded w-full" />
					<div className="h-3 bg-divider animate-pulse rounded w-3/4" />
				</div>

				<hr
					className="border-t w-full border-divider"
					aria-hidden="true"
				/>

				{/* Info table skeleton */}
				<div className="grid grid-cols-2 gap-4 p-5">
					{Array.from({ length: 6 }).map((_, i) => (
						<div
							key={i}
							className="h-4 bg-divider animate-pulse rounded w-full"
						/>
					))}
				</div>
			</section>

			{/* Discover section skeleton */}
			<section
				className={cn(
					"mt-5",
					"md:mt-0",
					"lg:mt-5",
					"p-5 text-wrap",
					"min-h-0",
					"lg:p-0",
					"grid",
					"lg:grid-rows-[auto_1fr]",
					"row-start-3 row-span-1 col-start-1 col-span-full",
					"md:row-start-2 md:row-span-1 md:col-start-1 md:col-span-full",
					"lg:row-start-1 lg:row-span-1 lg:col-start-3 lg:col-span-1"
				)}>
				<div className="flex flex-row items-baseline gap-2 md:flex md:flex-row lg:flex-col lg:gap-0">
					<h2 className="text-wrap">Discover</h2>
					<span className="text-xs text-secondary">
						other works by this author
					</span>
				</div>

				<ul
					className={cn(
						"row-start-2",
						"grid grid-rows-2 grid-flow-col auto-cols-min auto-rows-min",
						"md:flex md:flex-row md:flex-nowrap md:items-start",
						"lg:flex-col lg:flex-nowrap",
						"items-start",
						"mt-2",
						"lg:mt-5",
						"gap-4",
						"overflow-auto",
						"min-h-0",
						"pb-2",
						"px-1"
					)}>
					{Array.from({ length: 5 }).map((_, index) => (
						<CardSkeleton key={index} mini />
					))}
				</ul>
			</section>
		</main>
	);
}
