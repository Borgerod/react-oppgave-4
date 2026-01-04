import { cn } from "@/utils/cn";
import Link from "next/link";
import {
	FaToolbox,
	FaPalette,
	FaBook,
	FaBriefcase,
	FaPencilRuler,
} from "react-icons/fa";
import { LuCookingPot } from "react-icons/lu";
import { fetchSubjectCount } from "@/lib/fetchSubjectCounts";

type SubjectGridProps = { gridSize?: number };

const subjectDefinitions = [
	{
		name: "Arts",
		topics: ["Category: Art"],
		icon: (
			<FaPalette
				className={cn(
					"w-8 h-8 text-ultra-light group-hover:text-(--background)",
					"",
					""
				)}
			/>
		),
	},
	{
		name: "Business",
		topics: ["Category: Business/Management"],
		icon: (
			<FaBriefcase
				className={cn(
					"w-8 h-8 text-ultra-light group-hover:text-(--background)",
					"",
					""
				)}
			/>
		),
	},
	{
		name: "Cooking",
		topics: ["Cooking"],
		icon: (
			<span
				className={cn(
					"cooking-pot text-ultra-light group-hover:text-(--background)",
					"",
					""
				)}>
				<LuCookingPot
					color="currentColor"
					className={cn(
						"fill-current stroke-current w-8 h-8",
						"",
						""
					)}
				/>
			</span>
		),
	},
	{
		name: "Design",
		topics: ["Design"],
		icon: (
			<FaPencilRuler
				className={cn(
					"w-8 h-8 text-ultra-light group-hover:text-(--background)",
					"",
					""
				)}
			/>
		),
	},
	{
		name: "Educational",
		topics: ["Category: Teaching & Education"],
		icon: (
			<FaBook
				className={cn(
					"w-8 h-8 text-ultra-light group-hover:text-(--background)",
					"",
					""
				)}
			/>
		),
	},
	{
		name: "Craft",
		topics: ["Category: How To ..."],
		icon: (
			<FaToolbox
				className={cn(
					"w-8 h-8 text-ultra-light group-hover:text-(--background)",
					"",
					""
				)}
			/>
		),
	},
];

function buildStoreUrl(topic: string) {
	const params = new URLSearchParams();
	params.append("topic", topic);
	return `/store?${params.toString()}`;
}

export default async function SubjectGridServer({
	gridSize = 6,
}: SubjectGridProps) {
	const counts = await Promise.all(
		subjectDefinitions.slice(0, gridSize).map(async (def) => ({
			name: def.name,
			count: await fetchSubjectCount(def.name),
		}))
	);

	const countMap = Object.fromEntries(counts.map((c) => [c.name, c.count]));

	const items = subjectDefinitions.slice(0, gridSize).map((def) => {
		const href = buildStoreUrl(def.name);
		const count = countMap[def.name];
		return (
			<Link
				key={def.name}
				href={href}
				className={cn(
					"group aspect-auto bg-container-raised h-30 w-full rounded-3xl shadow-xl",
					"flex items-center justify-center text-lg font-medium hover:opacity-90",
					"px-5 py-0 grid grid-cols-2 grid-rows-2 text-2xl",
					"hover:scale-[1.02] transition-transform hover:bg-accent-dark",
					"",
					""
				)}
				aria-label={`Browse ${def.name}`}>
				<span
					className={cn(
						"row-start-1 col-start-1 self-end group-hover:text-(--background)",
						"",
						""
					)}>
					{def.name}
				</span>
				<span
					className={cn(
						"row-start-2 col-start-1 self-end flex items-end justify-start pl-0",
						"",
						""
					)}>
					<span className={cn("self-end", "", "")}>
						{def.icon ?? (
							<FaBook
								className={cn(
									"w-8 h-8 text-ultra-light group-hover:text-(--background)",
									"",
									""
								)}
							/>
						)}
					</span>
				</span>
				<span
					className={cn(
						"row-start-1 col-start-2 self-end flex items-end justify-end text-right group-hover:text-(--background)",
						"",
						""
					)}>
					{count ?? 0}
				</span>
				<span
					className={cn(
						"row-start-2 col-start-2 text-xs text-secondary/50 self-start flex items-start justify-end text-right group-hover:text-(--background)",
						"",
						""
					)}>
					Books
				</span>
			</Link>
		);
	});

	while (items.length < gridSize) {
		const i = items.length;
		items.push(
			<div
				key={`placeholder-${i}`}
				id={`subject-item-${i}`}
				className={cn(
					"aspect-auto bg-container-raised h-30 w-full rounded-3xl shadow-xl",
					"",
					""
				)}
			/>
		);
	}

	return (
		<div className={cn("w-full", "", "")}>
			<style>{`.cooking-pot svg *{fill: currentColor !important; stroke: currentColor !important; opacity:1 !important}`}</style>
			<h3 className={cn("text-2xl font-medium mb-4", "", "")}>
				Subjects
			</h3>
			<div
				className={cn(
					"grid grid-cols-2 grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 gap-5 justify-center w-full",
					"",
					""
				)}>
				{items}
			</div>
		</div>
	);
}
