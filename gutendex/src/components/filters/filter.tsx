"use client";
import { Drawer } from "@geist-ui/core";
import FilterInput from "./filterInput";
import CopyrightToggle from "./copyrightToggle";
import YearRangeFilter from "./yearRangeFilter";
import { useState } from "react";
import { ALL_LANGUAGES } from "@/utils/languages";
import { cn } from "@/utils/cn";
import Form from "next/form";
import { primaryBtnClass, textBtnClass } from "../buttonClasses";
type FilterProps = {
	open: boolean;
	setOpen: (open: boolean) => void;
	searchQuery?: string;
	topics?: string[];
	onClose?: () => void;
};

export function Filter({ open, setOpen, topics = [], onClose }: FilterProps) {
	const [topicInput, setTopicInput] = useState("");
	const [formatInput, setFormatInput] = useState("");
	const [languageInput, setLanguageInput] = useState("");
	const [selectedTopics, setSelectedTopics] = useState<
		Record<string, boolean>
	>({});
	const [selectedFormats, setSelectedFormats] = useState<
		Record<string, boolean>
	>({});
	const [selectedLanguages, setSelectedLanguages] = useState<
		Record<string, boolean>
	>({});
	const [copyright, setCopyright] = useState(false);
	const [yearFrom, setYearFrom] = useState("");
	const [yearTo, setYearTo] = useState("");

	// Static formats list (can be replaced with dynamic if needed)
	const formats = [
		"text/plain",
		"text/html",
		"application/pdf",
		"application/epub+zip",
		"application/x-mobipocket-ebook",
		"application/rdf+xml",
		"image/jpeg",
		"audio/mpeg",
		"audio/ogg",
		"text/markdown",
		"application/json",
	];

	const handleToggleTopic = (topic: string) => {
		setSelectedTopics((prev) => ({ ...prev, [topic]: !prev[topic] }));
	};

	const handleToggleFormat = (format: string) => {
		setSelectedFormats((prev) => ({ ...prev, [format]: !prev[format] }));
	};

	const handleToggleLanguage = (lang: string) => {
		setSelectedLanguages((prev) => ({ ...prev, [lang]: !prev[lang] }));
	};

	const handleClose = () => {
		setOpen(false);
		if (onClose) onClose();
	};
	return (
		<Drawer
			visible={open}
			onClose={handleClose}
			placement="bottom"
			width={400}
			height={200}
			className={cn(
				"flex flex-col",
				"h-fit",
				"max-h-[85vh]",
				"rounded-2xl",
				"shadow-2xl",
				"bg-white dark:bg-zinc-900",
				"border border-divider",
				"p-0",
				"mx-auto",
				""
			)}>
			<Drawer.Title>
				<span
					className={cn(
						"text-2xl font-bold text-center w-full block",
						"pt-4 pb-1",
						"text-primary dark:text-primary-inv",
						""
					)}>
					Filter
				</span>
			</Drawer.Title>
			<Drawer.Subtitle>
				<span
					className={cn(
						"text-xs font-semibold text-center w-full block",
						"pb-2  uppercase tracking-wide",
						""
					)}>
					Refine your search
				</span>
			</Drawer.Subtitle>
			<Drawer.Content className={cn("px-6 pb-6 pt-2 h-fit", "")}>
				<Form
					action=""
					className={cn(
						"flex flex-col",
						// "flex-row",
						"gap-6",
						// "w-full",
						// "max-w-md",
						// "mx-auto",
						""
					)}>
					{Object.entries(selectedTopics)
						.filter(([, v]) => v)
						.map(([topic]) => (
							<input
								key={topic}
								type="hidden"
								name="topic"
								value={topic}
							/>
						))}
					{Object.entries(selectedFormats)
						.filter(([, v]) => v)
						.map(([format]) => (
							<input
								key={format}
								type="hidden"
								name="format"
								value={format}
							/>
						))}
					{Object.entries(selectedLanguages)
						.filter(([, v]) => v)
						.map(([lang]) => (
							<input
								key={lang}
								type="hidden"
								name="languages"
								value={lang}
							/>
						))}
					<FilterInput
						label="Topics"
						value={topicInput}
						onChange={setTopicInput}
						placeholder="Search topics..."
						items={topics}
						selectedItems={selectedTopics}
						onToggleItem={handleToggleTopic}
						//    name="topic"
					/>
					<FilterInput
						label="Formats"
						value={formatInput}
						onChange={setFormatInput}
						placeholder="Search formats..."
						items={formats}
						selectedItems={selectedFormats}
						onToggleItem={handleToggleFormat}
						//    name="format"
					/>
					<FilterInput
						label="Languages"
						value={languageInput}
						onChange={setLanguageInput}
						placeholder="Search languages..."
						items={ALL_LANGUAGES}
						selectedItems={selectedLanguages}
						onToggleItem={handleToggleLanguage}
						//    name="languages"
					/>
					<div className="flex items-center gap-2">
						<CopyrightToggle
							checked={copyright}
							onChange={setCopyright}
						/>
						{copyright && (
							<input type="hidden" name="copyright" value="on" />
						)}
					</div>
					<div className="flex gap-2">
						<YearRangeFilter
							yearFrom={yearFrom}
							yearTo={yearTo}
							onYearFromChange={setYearFrom}
							onYearToChange={setYearTo}
						/>
						{yearFrom && (
							<input
								type="hidden"
								name="year_from"
								value={yearFrom}
							/>
						)}
						{yearTo && (
							<input
								type="hidden"
								name="year_to"
								value={yearTo}
							/>
						)}
					</div>
					<button
						type="submit"
						className={cn(
							"mt-6",
							"px-6 py-2",
							"rounded-lg",
							"bg-primary text-white dark:bg-accent dark:text-black",
							"font-semibold text-base",
							"hover:bg-primary/80 dark:hover:bg-accent/80",
							"transition-colors duration-200",
							"shadow-md",
							"w-full",
							"bg-accent-dark",
							"text-nowrap rounded-full w-full",
							"sm:w-fit",
							"px-6 py-2 transition-colors border",
							"      bg-transparent       border-accent-dark       text-accent-dark ",
							// "      bg-accent-dark/5       border-accent-dark       text-accent-dark ",
							"hover:bg-accent-dark hover:border-accent-dark hover:text-container-solid ",

							// "      bg-accent       border-accent       text-primary-inv ",
							// "hover:bg-accent-dark hover:border-accent-dark       text-white ",
							textBtnClass,
							primaryBtnClass,
							"w-full!",
							"px-20",
							// compressedBtnClass,
							"",

							""
						)}>
						Apply Filters
					</button>
				</Form>
			</Drawer.Content>
		</Drawer>
	);
}
