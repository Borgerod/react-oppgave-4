"use client";

import { cn } from "@/utils/cn";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
	FaToolbox,
	FaPalette,
	FaBook,
	FaBriefcase,
	FaPencilRuler,
} from "react-icons/fa";
// import { MdDesignServices } from "react-icons/md";
import { LuCookingPot } from "react-icons/lu";

type SubjectGridProps = {
	gridSize?: number;
};

const subjectDefinitions: {
	name: string;
	topics: string[];
	icon?: React.ReactNode;
}[] = [
	// Simple single-topic mappings per user request
	{
		name: "Arts",
		topics: ["Category: Art"],
		icon: (
			<FaPalette className="w-8 h-8 text-ultra-light group-hover:text-(--background)" />
		),
	},
	{
		name: "Business",
		topics: ["Category: Business/Management"],
		icon: (
			<FaBriefcase className="w-8 h-8 text-ultra-light group-hover:text-(--background)" />
		),
	},
	{
		name: "Cooking",
		topics: ["Cooking"],
		icon: (
			<span className="cooking-pot text-ultra-light group-hover:text-(--background)">
				<LuCookingPot
					color="currentColor"
					className="fill-current stroke-current w-8 h-8"
				/>
			</span>
		),
	},
	{
		name: "Design",
		topics: ["Design"],
		icon: (
			<FaPencilRuler className="w-8 h-8 text-ultra-light group-hover:text-(--background)" />
		),
	},
	{
		name: "Educational",
		topics: ["Category: Teaching & Education"],
		icon: (
			<FaBook className="w-8 h-8 text-ultra-light group-hover:text-(--background)" />
		),
	},
	{
		name: "Craft",
		topics: ["Category: How To ..."],
		icon: (
			<FaToolbox className="w-8 h-8 text-ultra-light group-hover:text-(--background)" />
		),
	},
];

function buildStoreUrl(topic: string) {
	const params = new URLSearchParams();
	params.append("topic", topic);
	return `/store?${params.toString()}`;
}

export default function SubjectGrid({ gridSize = 6 }: SubjectGridProps) {
	const [counts, setCounts] = useState<Record<string, number | null>>({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let mounted = true;
		async function fetchCounts() {
			try {
				const map: Record<string, number | null> = {};
				await Promise.all(
					subjectDefinitions.map(async (def) => {
						try {
							const topic = encodeURIComponent(def.name);
							const res = await fetch(
								`/api/books?topic=${topic}`
							);
							if (!res.ok) {
								map[def.name] = null;
								return;
							}
							const data = await res.json();
							map[def.name] =
								typeof data?.count === "number"
									? data.count
									: 0;
						} catch {
							map[def.name] = null;
						}
					})
				);
				if (mounted) {
					setCounts((prev) => ({ ...prev, ...map }));
				}
			} finally {
				if (mounted) setLoading(false);
			}
		}
		fetchCounts();
		return () => {
			mounted = false;
		};
	}, []);

	// Use a fixed responsive layout: mobile 2x3, md+ 3x2
	const gridClass = cn(
		"grid grid-cols-2 grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 gap-5 justify-center",
		"w-full"
	);

	// Prepare items from definitions (limit to GridSize)
	const items = subjectDefinitions.slice(0, gridSize).map((def) => {
		// Use the subject name directly as the single `topic` query param
		const href = buildStoreUrl(def.name);
		const count = counts[def.name];
		return (
			<Link
				key={def.name}
				href={href}
				className={cn(
					"group aspect-auto bg-container-raised h-30 w-full rounded-3xl shadow-xl flex items-center justify-center text-lg font-medium hover:opacity-90",
					"px-5",
					"py-0",
					"grid grid-cols-2 grid-rows-2",
					"text-2xl",
					"hover:scale-[1.02] transition-transform",
					"hover:bg-accent-dark",
					"",
					""
				)}
				aria-label={`Browse ${def.name}`}
			>
				{/* <span className="flex items-center gap-2"> */}
				<span className="row-start-1 col-start-1 self-end group-hover:text-(--background)">
					{def.name}
				</span>
				<span className="row-start-2 col-start-1 self-end flex items-end justify-start pl-0">
					<span className="self-end">
						{def.icon ?? (
							<FaBook className="w-8 h-8 text-ultra-light group-hover:text-(--background)" />
						)}
					</span>
				</span>
				<span className="row-start-1 col-start-2 self-end flex items-end justify-end text-right group-hover:text-(--background)">
					{count === undefined || count === null
						? loading
							? "..."
							: "0"
						: count}
				</span>
				<span className="row-start-2 col-start-2 text-xs text-secondary/50 self-start flex items-start justify-end text-right group-hover:text-(--background)">
					Books
				</span>
				{/* </span> */}
			</Link>
		);
	});

	// If grid is larger than available subjects, pad with placeholders
	while (items.length < gridSize) {
		const i = items.length;
		items.push(
			<div
				key={`placeholder-${i}`}
				id={`subject-item-${i}`}
				className="aspect-auto bg-container-raised h-30 w-full rounded-3xl shadow-xl"
			/>
		);
	}

	return (
		<div className="w-full">
			<style>{`.cooking-pot svg *{fill: currentColor !important; stroke: currentColor !important; opacity:1 !important}`}</style>
			<h3 className="text-2xl font-medium mb-4">Subjects</h3>
			<div
				id="subject-grid"
				className={cn(
					gridClass,

					"",
					""
				)}
			>
				{items}
			</div>
		</div>
	);
}
