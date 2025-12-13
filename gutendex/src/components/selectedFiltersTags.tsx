"use client";

import { Tag } from "./Tag";

type SelectedFiltersTagsProps = {
	selectedTopics?: Record<string, boolean>;
	selectedFormats?: Record<string, boolean>;
	selectedLanguages?: Record<string, boolean>;
	copyright?: boolean;
	onRemoveTopic?: (topic: string) => void;
	onRemoveFormat?: (format: string) => void;
	onRemoveLanguage?: (language: string) => void;
	onRemoveCopyright?: () => void;
};

export default function SelectedFiltersTags({
	selectedTopics = {},
	selectedFormats = {},
	selectedLanguages = {},
	copyright = false,
	onRemoveTopic,
	onRemoveFormat,
	onRemoveLanguage,
	onRemoveCopyright,
}: SelectedFiltersTagsProps) {
	const hasAnyFilters =
		Object.values(selectedTopics).some(Boolean) ||
		Object.values(selectedFormats).some(Boolean) ||
		Object.values(selectedLanguages).some(Boolean) ||
		copyright;

	if (!hasAnyFilters) {
		return null;
	}

	return (
		<div
			id="selected-filters-tags"
			className="col-span-full w-full mt-5 sm:mt-0">
			<ul className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
				{/* Topics */}
				{Object.entries(selectedTopics)
					.filter(([, v]) => v)
					.map(([topic]) => (
						<li key={`selected-topic-${topic}`}>
							<Tag
								id={`selected-topic-${topic}`}
								item={topic}
								checked={true}
								onToggle={() => onRemoveTopic?.(topic)}
								closeIcon
							/>
						</li>
					))}
				{/* Formats */}
				{Object.entries(selectedFormats)
					.filter(([, v]) => v)
					.map(([format]) => (
						<li key={`selected-format-${format}`}>
							<Tag
								id={`selected-format-${format}`}
								item={format}
								checked={true}
								onToggle={() => onRemoveFormat?.(format)}
								closeIcon
							/>
						</li>
					))}
				{/* Languages */}
				{Object.entries(selectedLanguages)
					.filter(([, v]) => v)
					.map(([language]) => (
						<li key={`selected-language-${language}`}>
							<Tag
								id={`selected-language-${language}`}
								item={language}
								checked={true}
								onToggle={() => onRemoveLanguage?.(language)}
								closeIcon
							/>
						</li>
					))}
				{/* Copyright */}
				{copyright && (
					<li key="selected-copyright">
						<Tag
							id="selected-copyright"
							item="Copyright Only"
							checked={true}
							onToggle={() => onRemoveCopyright?.()}
							closeIcon
						/>
					</li>
				)}
			</ul>
		</div>
	);
}
