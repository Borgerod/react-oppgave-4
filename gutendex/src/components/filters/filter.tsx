"use client";
import { cn } from "@/utils/cn";
import { startTransition, useEffect, useState } from "react";
import Form from "next/form";
import FilterInput from "@/components/filters/filterInput";
import CopyrightToggle from "@/components/filters/copyrightToggle";
import YearRangeFilter from "@/components/filters/yearRangeFilter";
import { useSearchParams } from "next/navigation";
import fetchCategories from "@/utils/fetchCategories";
import { ALL_LANGUAGES } from "@/utils/languages";
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

	// Sync copyright with URL params
	useEffect(() => {
		startTransition(() => {
			toggleCopyRight(searchParams?.get("copyright") === "on");
		});
	}, [searchParams]);

	// Topic search + selection state
	const [topicQuery, setTopicQuery] = useState("");
	const [allTopics, setAllTopics] = useState<string[]>(() => {
		const fromProps = Array.from(
			new Set((topics || []).map((t) => String(t).trim()))
		).filter(Boolean);
		if (fromProps.length > 0) return fromProps;
		// If no server topics, attempt to synchronously read client cache during render.
		if (typeof window === "undefined") return [];
		try {
			const raw = localStorage.getItem("gutendex:topics");
			if (!raw) return [];
			const parsed = JSON.parse(raw) as string[];
			if (Array.isArray(parsed) && parsed.length > 0) {
				return Array.from(
					new Set(parsed.map((t) => String(t).trim()))
				).filter(Boolean);
			}
		} catch (e) {
			console.warn("Filter: failed to read local topics cache", e);
		}
		return [];
	});

	useEffect(() => {
		if (typeof window === "undefined") return;
		try {
			const token = sessionStorage.getItem("gutendex:topicsUpdated");
			if (token === "1") return;
		} catch {
			// ignore sessionStorage errors
		}

		let mounted = true;
		(async () => {
			try {
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
				try {
					if (typeof window !== "undefined") {
						localStorage.setItem(
							"gutendex:topics",
							JSON.stringify(merged)
						);
						// Only mark session as updated if we actually fetched additional categories
						if (Array.isArray(cats) && cats.length > 0) {
							sessionStorage.setItem(
								"gutendex:topicsUpdated",
								"1"
							);
						}
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

	// Sync selected topics with URL params
	useEffect(() => {
		const topics: Record<string, boolean> = {};
		if (searchParams) {
			searchParams.getAll("topic").forEach((topic) => {
				topics[topic] = true;
			});
		}
		startTransition(() => {
			setSelectedTopics(topics);
		});
	}, [searchParams]);

	// Language search + selection state
	const [languageQuery, setLanguageQuery] = useState("");
	const [allLanguages] = useState<string[]>(() => ALL_LANGUAGES);
	// Initialize selected languages from URL
	const [selectedLanguages, setSelectedLanguages] = useState<
		Record<string, boolean>
	>(() => {
		const languages: Record<string, boolean> = {};
		if (searchParams) {
			searchParams.getAll("languages").forEach((language) => {
				languages[language] = true;
			});
		}
		return languages;
	});

	// Sync selected languages with URL params
	useEffect(() => {
		const languages: Record<string, boolean> = {};
		if (searchParams) {
			searchParams.getAll("languages").forEach((language) => {
				languages[language] = true;
			});
		}
		startTransition(() => {
			setSelectedLanguages(languages);
		});
	}, [searchParams]);

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

	// Sync selected formats with URL params
	useEffect(() => {
		const formats: Record<string, boolean> = {};
		if (searchParams) {
			searchParams.getAll("format").forEach((format) => {
				formats[format] = true;
			});
		}
		startTransition(() => {
			setSelectedFormats(formats);
		});
	}, [searchParams]);

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

	return (
		<Form
			aria-label="filter"
			id="filter"
			action="/store"
			className={cn(
				"w-full",
				"grid grid-cols-1 md:grid-cols-2 gap-4",
				"items-start",
				"justify-between ",
				"items-center gap-0 max-w-6xl mx-auto  py-0 px-5 lg:px-10 lg:max-w-7xl",
				"justify-around",
				"justify-items-around",
				"content-center",
				"px-10",
				"lg:px-15",
				"justify-items-start",
				"max-w-6xl mx-auto py-0 px-5 lg:px-10 lg:max-w-7xl",
				"w-full sm:w-fit",
				"sx:border-none",
				"",
				""
			)}>
			{searchQuery && (
				<input type="hidden" name="search" value={searchQuery} />
			)}
			{Object.entries(selectedTopics)
				.filter(([, v]) => v)
				.map(([topic]) => (
					<input
						key={`topic-${topic}`}
						type="hidden"
						name="topic"
						value={topic}
					/>
				))}
			{Object.entries(selectedFormats)
				.filter(([, v]) => v)
				.map(([format]) => (
					<input
						key={`format-${format}`}
						type="hidden"
						name="mime_type"
						value={format}
					/>
				))}
			{Object.entries(selectedLanguages)
				.filter(([, v]) => v)
				.map(([language]) => (
					<input
						key={`language-${language}`}
						type="hidden"
						name="languages"
						value={language}
					/>
				))}

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
						"hover:border-accent-dark hover:text-container-solid hover:bg-accent-dark border-accent-dark text-accent-dark",
						"",
						""
					)}>
					Apply Filters
				</button>
				<button
					type="button"
					onClick={handleClearAll}
					className={cn(
						"text-nowrap rounded-full w-full sm:w-fit px-6 py-1 transition-colors",
						"border border-secondary text-secondary",
						"hover:border-accent-dark hover:text-accent-dark",
						"w-fit",
						"",
						""
					)}>
					Clear All
				</button>
			</div>
		</Form>
	);
}
