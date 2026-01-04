"use client";
import { cn } from "@/utils/cn";
import YearRangeFilter from "./yearRangeFilter";
import CopyrightToggle from "./copyrightToggle";
import FilterInput from "./filterInput";
import { Fragment } from "react";
import Form from "next/form";
import { useSearchParams, useRouter } from "next/navigation";
import { LanguageOptions } from "@/types";

type FilterProps = {
	topicOptions: string[];
	formatOptions: string[];
	languageOptions: LanguageOptions[];
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	// setOpen,
};
// type FilterProps = {
// 	topicOptions: string[];
// 	formatOptions: string[];
// 	languageOptions: LanguageOption[];
// 	open: boolean;
// 	setOpen;
// };
// interface FilterProps {
// 	topicOptions: string[];
// 	formatOptions: string[];
// 	languageOptions: LanguageOption[];
// 	open: boolean;
// }

type FilterSectionProps = {
	topicOptions: string[];
	formatOptions: string[];
	languageOptions: LanguageOptions[];
};

type MobileFilterProps = FilterSectionProps & {
	// No extra props for year/copyright; all handled via form
};

function MobileFilter({
	topicOptions,
	formatOptions,
	languageOptions,
	onSubmit,
}: FilterSectionProps & {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
	return (
		<Form
			action=""
			onSubmit={onSubmit}
			className={cn(
				"flex",
				"flex-col",
				"gap-4",
				"p-4",
				"gap-3",
				"p-3",
				"bg-container",
				"border",
				"border-edge",
				"rounded-lg",
				"rounded-3xl",
				"md:hidden",
				"",
				""
			)}>
			<FilterInput
				label="Topics"
				searchParamName="topic"
				options={topicOptions}
			/>
			<FilterInput
				label="Formats"
				searchParamName="mime_type"
				options={formatOptions}
			/>
			<FilterInput
				label="Languages"
				searchParamName="languages"
				options={languageOptions}
			/>
			<YearRangeFilter />
			<CopyrightToggle />
			<button
				type="submit"
				className={cn(
					"col-span-full",
					"row-start-2",
					"w-full",
					"mt-2",
					"py-2",
					"rounded-full",
					"rounded-full",
					"bg-primary",
					"text-white",
					"font-semibold",
					"hover:bg-primary-dark",
					"transition",
					"dark:bg-accent-light dark:text-primary-inv",
					"dark:bg-transparent dark:text-accent-light dark:border dark:border-accent-light dark:hover:bg-accent-light dark:hover:text-primary-inv",
					"cursor-pointer",
					//option 1
					"dark:bg-transparent dark:text-accent-light dark:border dark:border-accent-light dark:hover:bg-accent-light dark:hover:text-primary-inv ",
					"border border-accent-dark text-accent-dark bg-transparent hover:bg-accent-dark hover:text-primary-inv",
					// option 2
					"bg-accent-dark hover:bg-accent",
					//option 3
					"border-0 text-primary-inv bg-primary hover:bg-primary-highlight dark:border",
					"",
					"",
					"",
					""
				)}>
				Apply Filters
			</button>
		</Form>
	);
}

type DesktopFilterProps = FilterSectionProps & {
	// No extra props for year/copyright; all handled via form
};

function DesktopFilter({
	topicOptions,
	formatOptions,
	languageOptions,
	onSubmit,
}: FilterSectionProps & {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
	return (
		<Form
			action=""
			onSubmit={onSubmit}
			className={cn(
				"hidden",

				"gap-4",
				"p-6",
				"p-5",
				"gap-3",
				"gap-5",
				// "p-3",
				"bg-container",
				"border",
				"border-edge",
				"rounded-3xl",
				"w-full",
				"rounded-4xl",
				"md:grid",
				// "grid-cols-4",
				// "grid-cols-auto",
				// "grid-cols-2",
				"grid-cols-2",
				"grid-rows-auto",
				"border-edge-dark/50",
				"border-edge/30",
				"dark:hover:border-edge/50",
				"",
				""
			)}>
			<div
				className={cn(
					"col-start-1 col-span-1 row-start-1 flex flex-col gap-4"
				)}>
				<FilterInput
					label="Topics"
					searchParamName="topic"
					options={topicOptions}
				/>
			</div>
			<div
				className={cn(
					"col-start-2 col-span-1 row-start-1 flex flex-col gap-4"
				)}>
				<FilterInput
					label="Formats"
					searchParamName="mime_type"
					options={formatOptions}
				/>
			</div>
			<div
				className={cn(
					"col-start-1 col-span-1 row-start-2 flex flex-col gap-4"
				)}>
				<FilterInput
					label="Languages"
					searchParamName="languages"
					options={languageOptions}
				/>
			</div>
			<div
				className={cn(
					"col-start-2 col-span-1 row-start-2 lex flex-col gap-4"
				)}>
				<YearRangeFilter />
				<CopyrightToggle />
			</div>
			<button
				type="submit"
				className={cn(
					// "col-span-full",
					// "row-start-2",
					"col-span-full",
					"col-span-3",
					"col-start-1",
					"row-start-3",

					"w-full",
					"mt-2",
					"py-2",
					"rounded-full",
					"text-white",
					"font-semibold",
					"transition",
					"cursor-pointer",
					//option 1
					"dark:bg-transparent dark:text-accent-light dark:border dark:border-accent-light dark:hover:bg-accent-light dark:hover:text-primary-inv ",
					"border border-accent-dark text-accent-dark bg-transparent hover:bg-accent-dark hover:text-primary-inv",
					// option 2
					"bg-accent-dark hover:bg-accent",
					//option 3
					"border-0 text-primary-inv bg-primary hover:bg-primary-highlight dark:border",
					"",
					"",
					""
				)}>
				Apply Filters
			</button>
		</Form>
	);
}

export default function Filter({
	topicOptions,
	formatOptions,
	languageOptions,
	open,
	setOpen,
}: FilterProps) {
	const searchParams = useSearchParams();
	const router = useRouter();

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setOpen(false);
		const form = e.currentTarget;
		const formData = new FormData(form);
		const params = new URLSearchParams(searchParams.toString());

		////* Only add non-empty values to params
		for (const [key, value] of formData.entries()) {
			// params.set(key, value);
			if (
				typeof value === "string" &&
				value.trim() !== "" &&
				value !== "on"
			) {
				params.set(key, value);
			}
		}

		router.push(`/store?${params.toString()}`);
	}

	return (
		<>
			{open && (
				<>
					<MobileFilter
						topicOptions={topicOptions}
						formatOptions={formatOptions}
						languageOptions={languageOptions}
						onSubmit={handleSubmit}
					/>
					<DesktopFilter
						topicOptions={topicOptions}
						formatOptions={formatOptions}
						languageOptions={languageOptions}
						onSubmit={handleSubmit}
					/>
				</>
			)}
		</>
	);
}
