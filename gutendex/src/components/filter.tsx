"use client";
import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";
import Form from "next/form";
import FilterInput from "./filterInput";
import CopyrightToggle from "./copyrightToggle";
import YearRangeFilter from "./yearRangeFilter";
import { Tag } from "./Tag";
import { useSearchParams } from "next/navigation";
import fetchCategories from "@/utils/fetchCategories";

// TODO [ ]: selected needs to stay presistant when opening closing filter button
// TODO [ ]:               -- || --            when going back to store

import { useRouter } from "next/navigation";

type FilterProps = {
	searchQuery?: string;
	sortBy?: string;
	onSelectedFiltersCountChange?: (n: number) => void;
	topics?: string[]; // provided from server layout
};

export default function Filter({
	searchQuery,
	onSelectedFiltersCountChange,
	topics,
}: FilterProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	// Initialize copyright from URL
	const [copyright, toggleCopyRight] = useState(
		() => searchParams?.get("copyright") === "on"
	);

	// Topic search + selection state
	const [topicQuery, setTopicQuery] = useState("");
	const [allTopics, setAllTopics] = useState<string[]>(() =>
		Array.from(new Set((topics || []).map((t) => String(t).trim()))).filter(
			Boolean
		)
	);

	// On mount, if server didn't provide topics, try client localStorage cache
	useEffect(() => {
		if (typeof window === "undefined") return;
		if ((topics || []).length > 0) return; // server provided data — prefer that
		try {
			const raw = localStorage.getItem("gutendex:topics");
			if (!raw) return;
			const parsed = JSON.parse(raw) as string[];
			if (Array.isArray(parsed) && parsed.length > 0) {
				setAllTopics(
					Array.from(
						new Set(parsed.map((t) => String(t).trim()))
					).filter(Boolean)
				);
			}
		} catch (e) {
			console.warn("Filter: failed to read local topics cache", e);
		}
	}, [topics]);

	// Background fetch: load remaining pages and merge topics when ready
	useEffect(() => {
		let mounted = true;
		(async () => {
			try {
				// Server already provided page 1 topics; start background crawl at page 2
				const cats = await fetchCategories({ startPage: 2 });
				if (!mounted) return;
				const merged = Array.from(
					new Set(
						[...(topics || []), ...(cats || [])].map((t) =>
							String(t).trim()
						)
					)
				).filter(Boolean);
				setAllTopics(merged);
				// persist merged topics to localStorage (best-effort)
				try {
					if (typeof window !== "undefined") {
						localStorage.setItem(
							"gutendex:topics",
							JSON.stringify(merged)
						);
					}
				} catch (e) {
					console.warn(
						"Filter: failed to write local topics cache",
						e
					);
				}
			} catch (err) {
				console.error("background fetchCategories error:", err);
			}
		})();
		return () => {
			mounted = false;
		};
	}, [topics]);
	// Initialize selected topics from URL
	const [selectedTopics, setSelectedTopics] = useState<
		Record<string, boolean>
	>(() => {
		const topics: Record<string, boolean> = {};
		if (searchParams) {
			searchParams.getAll("topic").forEach((topic) => {
				topics[topic] = true;
			});
		}
		return topics;
	});

	// Language search + selection state
	const [languageQuery, setLanguageQuery] = useState("");
	const [allLanguages] = useState<string[]>(() => [
		"English",
		"Norwegian",
		"French",
		"Spanish",
		"Mandarin",
	]);
	// Initialize selected languages from URL
	const [selectedLanguages, setSelectedLanguages] = useState<
		Record<string, boolean>
	>(() => {
		const languages: Record<string, boolean> = {};
		if (searchParams) {
			searchParams.getAll("language").forEach((language) => {
				languages[language] = true;
			});
		}
		return languages;
	});

	// Format (mime_type) search + selection state
	const [formatQuery, setFormatQuery] = useState("");
	const [allFormats] = useState<string[]>(() => [
		"text/plain",
		"text/html",
		"application/json",
		"application/pdf",
		"image/jpeg",
		"image/png",
	]);
	// Initialize selected formats from URL
	const [selectedFormats, setSelectedFormats] = useState<
		Record<string, boolean>
	>(() => {
		const formats: Record<string, boolean> = {};
		if (searchParams) {
			searchParams.getAll("format").forEach((format) => {
				formats[format] = true;
			});
		}
		return formats;
	});

	// Report total selected filters count to parent
	useEffect(() => {
		const topicsCount =
			Object.values(selectedTopics).filter(Boolean).length;
		const languagesCount = Object.values(selectedLanguages || {}).filter(
			Boolean
		).length;
		const formatsCount = Object.values(selectedFormats || {}).filter(
			Boolean
		).length;
		const copyrightCount = copyright ? 1 : 0;
		const total =
			topicsCount + languagesCount + formatsCount + copyrightCount;
		if (onSelectedFiltersCountChange) onSelectedFiltersCountChange(total);
	}, [
		selectedTopics,
		selectedLanguages,
		selectedFormats,
		copyright,
		onSelectedFiltersCountChange,
	]);

	// Year range filter - initialize from URL
	const [yearFrom, setYearFrom] = useState(
		() => searchParams?.get("year_from") || ""
	);
	const [yearTo, setYearTo] = useState(
		() => searchParams?.get("year_to") || ""
	);

	const handleClearAll = () => {
		toggleCopyRight(false);
		setTopicQuery("");
		setSelectedTopics({});
		setLanguageQuery("");
		setSelectedLanguages({});
		setFormatQuery("");
		setSelectedFormats({});
		setYearFrom("");
		setYearTo("");

		// Also apply the cleared filters immediately by navigating with empty params
		const params = new URLSearchParams();
		if (searchQuery && searchQuery.trim()) {
			params.set("search", searchQuery.trim());
		}
		// No topics/formats/languages/copyright/year params -> cleared
		router.push(`/store?${params.toString()}`);
	};

	const handleSubmit = (e?: React.FormEvent) => {
		if (e) e.preventDefault();
		const params = new URLSearchParams();

		// Search query from SearchBar
		if (searchQuery && searchQuery.trim()) {
			params.set("search", searchQuery.trim());
		}

		// Topics
		Object.entries(selectedTopics)
			.filter(([_, v]) => v)
			.forEach(([topic]) => {
				params.append("topic", topic);
			});

		// Formats
		Object.entries(selectedFormats)
			.filter(([_, v]) => v)
			.forEach(([format]) => {
				params.append("format", format);
			});

		// Languages
		Object.entries(selectedLanguages)
			.filter(([_, v]) => v)
			.forEach(([language]) => {
				params.append("language", language);
			});

		// Copyright
		if (copyright) {
			params.set("copyright", "on");
		}

		// Year range
		if (yearFrom) params.set("year_from", yearFrom);
		if (yearTo) params.set("year_to", yearTo);

		// Redirect to /store with params
		router.push(`/store?${params.toString()}`);
	};

	const allSelected = {
		copyright,
		selectedTopics,
		selectedLanguages,
		selectedFormats,
	};

	return (
		<form
			aria-label="filter"
			id="filter"
			onSubmit={handleSubmit}
			className={cn(
				// "h-fit ",
				"w-full",
				// "border-b border-edge",
				// "p-6",
				"grid grid-cols-1 md:grid-cols-2 gap-4",
				"items-start",
				// "mx-auto flex max-w-7xl flex-col gap-1 w-full",
				"justify-between ",
				"items-center gap-0 max-w-6xl mx-auto  py-0 px-5 lg:px-10 lg:max-w-7xl",
				// "items-center gap-0 max-w-6xl mx-auto  py-0 px-5 lg:px-10 lg:max-w-7xl",
				"justify-around",
				"justify-items-around",
				"content-center",
				"px-10",
				"lg:px-15",
				"justify-items-start",
				// "justify-items-center",
				"max-w-6xl mx-auto py-0 px-5 lg:px-10 lg:max-w-7xl",
				"w-full sm:w-fit",
				"sx:border-none",
				// "border border-b-2 border-divider sm:border-none",
				"",
				""
			)}>
			<div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:col-span-2 w-full sm:w-fit">
				<FilterInput
					label="Topics"
					value={topicQuery}
					onChange={setTopicQuery}
					placeholder="Search topics..."
					items={allTopics}
					selectedItems={selectedTopics}
					onToggleItem={(topic) =>
						setSelectedTopics((s) => ({
							...s,
							[topic]: !s[topic],
						}))
					}
					getItemId={(topic, index) => `topic-${index}-${topic}`}
				/>
				<FilterInput
					label="Format"
					value={formatQuery}
					onChange={setFormatQuery}
					placeholder="Search formats..."
					items={allFormats}
					selectedItems={selectedFormats}
					onToggleItem={(fmt) =>
						setSelectedFormats((s) => ({
							...s,
							[fmt]: !s[fmt],
						}))
					}
					getItemId={(fmt, index) => `format-${index}-${fmt}`}
				/>
				<FilterInput
					label="Languages"
					value={languageQuery}
					onChange={setLanguageQuery}
					placeholder="Search languages..."
					items={allLanguages}
					selectedItems={selectedLanguages}
					onToggleItem={(language) =>
						setSelectedLanguages((s) => ({
							...s,
							[language]: !s[language],
						}))
					}
					getItemId={(language, index) =>
						`language-${index}-${language}`
					}
				/>

				{/* <div className="grid grid-cols-2 sm:grid-cols-1 gap-4 sm:col-span-1 sm:border-none border-b border-divider py-5 items-baseline"> */}
				<div className="grid grid-cols-1 sm:grid-cols-1 gap-0 content-start mt-5 sm:border-none border-b border-divider py-5 items-baseline ">
					{/* TODO: maybe change to calender? */}
					<YearRangeFilter
						yearFrom={yearFrom}
						yearTo={yearTo}
						onYearFromChange={setYearFrom}
						onYearToChange={setYearTo}
					/>
					<div className="border-b border-divider my-3 mb-10 sm:border-none sm:my- sm:mb-0" />
					<CopyrightToggle
						checked={copyright}
						onChange={toggleCopyRight}
					/>
				</div>
			</div>
			<div className="flex items-end justify-start gap-4 sx:col-span-2 sx:mr-auto sm:border-none border-b border-divider py-5 sm:py-0 w-full sm:w-fit">
				<button
					type="submit"
					className={cn(
						"text-nowrap rounded-full w-full sm:w-fit px-6 py-1 transition-colors border",
						// "text-primary bg-accent/70 border-accent/70 hover:text-primary hover:border-accent-dark/70 hover:bg-accent-dark/70", //option 1
						"hover:border-accent-dark hover:text-container-solid hover:bg-accent-dark border-accent-dark text-accent-dark", //option 2
						"",
						""
					)}>
					Apply Filters
				</button>
				<button
					type="button"
					onClick={handleClearAll}
					// className="text-nowrap rounded-full w-full sm:w-fit px-6 py-1 border border-secondary text-secondary hover:border-foreground hover:bg-surface transition-colors"
					className={cn(
						"text-nowrap rounded-full w-full sm:w-fit px-6 py-1 transition-colors",
						"border border-secondary text-secondary",
						"hover:border-accent-dark hover:text-accent-dark",
						"w-fit",
						"",
						""
					)}
					//
				>
					Clear All
				</button>
			</div>

			{/* TEMP: display all filters */}
			{/* <ul className="bg-container p-2 rounded-2xl flex flex-col justify-between content-between w-100 gap-5">
				<h2 className="text-2xl"> All Filters:</h2>
				<ul>
					<h3>Selected:</h3>
					<li className="flex flex-row w-full content-between justify-between px-5">
						<span>allSelected: </span>
						<span>{JSON.stringify(allSelected)}</span>
					</li>
					<br />
					<li className="flex flex-row w-full content-between justify-between px-5">
						<span>copyright: </span>
						<span>{String(copyright)}</span>
					</li>

					<li className="flex flex-row w-full content-between justify-between px-5">
						<span>selectedTopics: </span>
						<span>{JSON.stringify(selectedTopics)} </span>
					</li>

					<li className="flex flex-row w-full content-between justify-between px-5">
						<span>selectedLanguages: </span>
						<span>{JSON.stringify(selectedLanguages)}</span>
					</li>

					<li className="flex flex-row w-full content-between justify-between px-5">
						<span>selectedFormats: </span>
						<span>{JSON.stringify(selectedFormats)}</span>
					</li>
				</ul>
				<ul>
					<h3>Queries:</h3>
					<li className="flex flex-row w-full content-between justify-between px-5">
						<span>topicQuery: </span> <span>{topicQuery} </span>
					</li>
					<li className="flex flex-row w-full content-between justify-between px-5">
						<span>languageQuery: </span>
						<span>{languageQuery} </span>
					</li>
					<li className="flex flex-row w-full content-between justify-between px-5">
						<span>formatQuery: </span>
						<span>{formatQuery}</span>
					</li>
				</ul>
			</ul> */}
		</form>
	);
}
