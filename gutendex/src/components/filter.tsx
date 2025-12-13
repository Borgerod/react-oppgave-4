"use client";
import { cn } from "@/utils/cn";
import { useState } from "react";
import Form from "next/form";
import FilterInput from "./filterInput";
import CopyrightToggle from "./copyrightToggle";
import YearRangeFilter from "./yearRangeFilter";

function getTopics() {
	return [
		"children",
		"horror",
		"comedy",
		"novella",
		"poem",
		"morendin",
		"farendin",
		"mohammed",
		"erik",
		"peepeepoopoo",
		"romance",
	];
}

export default function Filter() {
	const [copyright, toggleCopyRight] = useState(false);

	// Topic search + selection state
	const [topicQuery, setTopicQuery] = useState("");
	const [allTopics] = useState<string[]>(() =>
		Array.from(new Set(getTopics().map((t) => t.trim()))).filter(Boolean)
	);
	const [selectedTopics, setSelectedTopics] = useState<
		Record<string, boolean>
	>({});

	// Language search + selection state
	const [languageQuery, setLanguageQuery] = useState("");
	const [allLanguages] = useState<string[]>(() => [
		"English",
		"Norwegian",
		"French",
		"Spanish",
		"Mandarin",
	]);
	const [selectedLanguages, setSelectedLanguages] = useState<
		Record<string, boolean>
	>({});

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
	const [selectedFormats, setSelectedFormats] = useState<
		Record<string, boolean>
	>({});

	// Year range filter
	const [yearFrom, setYearFrom] = useState("");
	const [yearTo, setYearTo] = useState("");

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
	};

	return (
		<Form
			action="/search"
			aria-label="filter"
			id="filter"
			className={cn(
				"h-fit w-full ",
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
				"sx:border-none",
				"justify-items-start",
				"justify-items-center",
				"max-w-6xl mx-auto py-0 px-5 lg:px-10 lg:max-w-7xl",
				"",
				"",
				""
			)}
		>
			<div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:col-span-2 ">
				<FilterInput
					label="topics"
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
					label="format"
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
					label="languages"
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
				<div className="grid grid-cols-2 sm:grid-cols-1 gap-0 content-start mt-5 sm:border-none border-b border-divider py-5 items-baseline">
					<YearRangeFilter
						yearFrom={yearFrom}
						yearTo={yearTo}
						onYearFromChange={setYearFrom}
						onYearToChange={setYearTo}
					/>
					<CopyrightToggle
						checked={copyright}
						onChange={toggleCopyRight}
					/>
				</div>
			</div>
			{/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:col-span-2 sm:border-none border-b border-divider py-5 items-baseline">
				<CopyrightToggle
					checked={copyright}
					onChange={toggleCopyRight}
				/>
				<YearRangeFilter
					yearFrom={yearFrom}
					yearTo={yearTo}
					onYearFromChange={setYearFrom}
					onYearToChange={setYearTo}
				/>
			</div> */}
			<div className="flex items-end justify-start gap-4 sx:col-span-2 sx:mr-auto sm:border-none border-b border-divider py-5">
				<button
					type="submit"
					className="rounded-full w-full sm:w-fit px-6 py-1 border border-accent text-accent hover:border-accent-dark hover:text-black hover:bg-accent-dark transition-colors"
				>
					Apply Filters
				</button>
				<button
					type="button"
					onClick={handleClearAll}
					className="rounded-full w-full sm:w-fit px-6 py-1 border border-secondary text-secondary hover:border-foreground hover:bg-surface transition-colors"
				>
					Clear All
				</button>
			</div>
		</Form>
	);
}
