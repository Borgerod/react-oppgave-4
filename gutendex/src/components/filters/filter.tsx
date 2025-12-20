"use client";
import { cn } from "@/utils/cn";
import {
	startTransition,
	useCallback,
	useEffect,
	useLayoutEffect,
	useState,
} from "react";
import Form from "next/form";
import FilterInput from "@/components/filters/filterInput";
import CopyrightToggle from "@/components/filters/copyrightToggle";
import YearRangeFilter from "@/components/filters/yearRangeFilter";
import { useSearchParams } from "next/navigation";
import fetchCategories from "@/utils/fetchCategories";
import { ALL_LANGUAGES } from "@/utils/languages";
import { useRouter } from "next/navigation";
import {
	compressedBtnClass,
	iconBtnClass,
	primaryBtnClass,
	secondaryBtnClass,
	textBtnClass,
} from "../buttonClasses";

type FilterProps = {
	searchQuery?: string;
	sortBy?: string;
	onSelectedFiltersCountChange?: (n: number) => void;
	topics?: string[]; // provided from server layout
	onClose?: () => void;
};

export default function Filter({
	searchQuery,
	onSelectedFiltersCountChange,
	topics,
	onClose,
}: FilterProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [isMobile, setIsMobile] = useState(() => {
		if (typeof window === "undefined") return false;
		return window.matchMedia("(max-width: 639px)").matches;
		// return window.matchMedia("(max-width: 639px)").matches;
	});

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
			[
				...searchParams.getAll("mime_type"),
				...searchParams.getAll("format"),
			].forEach((format) => {
				formats[format] = true;
			});
		}
		return formats;
	});

	// Sync selected formats with URL params
	useEffect(() => {
		const formats: Record<string, boolean> = {};
		if (searchParams) {
			[
				...searchParams.getAll("mime_type"),
				...searchParams.getAll("format"),
			].forEach((format) => {
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

	// Control overlay visibility for drag-to-close
	const [overlayOpen, setOverlayOpen] = useState(true);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const mediaQuery = window.matchMedia("(max-width: 639px)");
		const handleChange = (event: MediaQueryListEvent) => {
			setIsMobile(event.matches);
		};
		setIsMobile(mediaQuery.matches);
		if (typeof mediaQuery.addEventListener === "function") {
			mediaQuery.addEventListener("change", handleChange);
			return () => mediaQuery.removeEventListener("change", handleChange);
		}
		mediaQuery.addListener(handleChange);
		return () => mediaQuery.removeListener(handleChange);
	}, []);

	useEffect(() => {
		if (isMobile) {
			setOverlayOpen(true);
		}
	}, [isMobile]);

	const revertFiltersToApplied = useCallback(() => {
		const params = searchParams;

		const collectSelections = (values: string[]) => {
			const next: Record<string, boolean> = {};
			values.forEach((value) => {
				next[value] = true;
			});
			return next;
		};

		const nextTopics = collectSelections(params?.getAll("topic") ?? []);
		const nextFormats = collectSelections([
			...(params?.getAll("mime_type") ?? []),
			...(params?.getAll("format") ?? []),
		]);
		const nextLanguages = collectSelections(
			params?.getAll("languages") ?? []
		);

		startTransition(() => {
			setSelectedTopics(nextTopics);
			setSelectedFormats(nextFormats);
			setSelectedLanguages(nextLanguages);
			setYearFrom(params?.get("year_from") ?? "");
			setYearTo(params?.get("year_to") ?? "");
			toggleCopyRight(params?.get("copyright") === "on");
		});

		setTopicQuery("");
		setFormatQuery("");
		setLanguageQuery("");
	}, [
		searchParams,
		setSelectedTopics,
		setSelectedFormats,
		setSelectedLanguages,
		setYearFrom,
		setYearTo,
		toggleCopyRight,
		setTopicQuery,
		setFormatQuery,
		setLanguageQuery,
	]);

	const hasFilterChanges = useCallback(() => {
		const params = searchParams;

		const selectedKeys = (record: Record<string, boolean>) =>
			Object.entries(record)
				.filter(([, value]) => value)
				.map(([key]) => key);

		const setsDiffer = (current: string[], fromParams: string[]) => {
			const normalize = (values: string[]) =>
				Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
			const currentNormalized = normalize(current);
			const paramsNormalized = normalize(fromParams);
			if (currentNormalized.length !== paramsNormalized.length)
				return true;
			for (let i = 0; i < currentNormalized.length; i += 1) {
				if (currentNormalized[i] !== paramsNormalized[i]) return true;
			}
			return false;
		};

		const topicValues = params?.getAll("topic") ?? [];
		if (setsDiffer(selectedKeys(selectedTopics), topicValues)) return true;

		const formatValues = [
			...(params?.getAll("mime_type") ?? []),
			...(params?.getAll("format") ?? []),
		];
		if (setsDiffer(selectedKeys(selectedFormats), formatValues))
			return true;

		const languageValues = params?.getAll("languages") ?? [];
		if (setsDiffer(selectedKeys(selectedLanguages), languageValues))
			return true;

		const paramYearFrom = params?.get("year_from") ?? "";
		if ((yearFrom || "") !== paramYearFrom) return true;

		const paramYearTo = params?.get("year_to") ?? "";
		if ((yearTo || "") !== paramYearTo) return true;

		const paramCopyright = params?.get("copyright") === "on";
		if (Boolean(copyright) !== paramCopyright) return true;

		return false;
	}, [
		searchParams,
		selectedTopics,
		selectedFormats,
		selectedLanguages,
		yearFrom,
		yearTo,
		copyright,
	]);

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

	// Non-destructive runtime portal: move existing #form-container into a
	// small portal root on document.body so the filter renders outside layout
	// constraints. This does not delete or change any source tokens — it
	// operates on the rendered DOM and restores everything on unmount.
	useLayoutEffect(() => {
		if (typeof window === "undefined" || !overlayOpen || !isMobile) return;

		const el = document.getElementById("form-container");
		if (!el) return;

		const originalParent = el.parentNode as Node | null;
		const originalNextSibling = el.nextSibling;

		const portalRoot = document.createElement("div");
		portalRoot.setAttribute("id", "gutendex-filter-portal-root");
		// minimal styles on the portal root; panel/backdrop added below
		document.body.appendChild(portalRoot);

		const backdrop = document.createElement("div");
		backdrop.className = "fixed inset-0 bg-black/40 z-50";
		backdrop.addEventListener("click", () => {
			if (hasFilterChanges()) {
				const form = document.getElementById(
					"filter"
				) as HTMLFormElement | null;
				if (form) form.submit();
			} else {
				revertFiltersToApplied();
			}
			setOverlayOpen(false);
			onClose?.();
		});
		portalRoot.appendChild(backdrop);

		const panel = document.createElement("div");
		panel.setAttribute("id", "gutendex-filter-portal-panel");
		panel.className = "relative z-60";
		portalRoot.appendChild(panel);

		// move the existing element into the portal panel
		panel.appendChild(el);

		// lock body scroll while portal is mounted
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		// Drag-to-close on handlebar
		const handlebar = document.getElementById("divier handle");
		let dragStartY = 0;
		let dragStartTime = 0;
		let isDragging = false;

		const onPointerDown = (e: PointerEvent) => {
			isDragging = true;
			dragStartY = e.clientY;
			dragStartTime = Date.now();
			if (handlebar) handlebar.style.cursor = "grabbing";
			if (handlebar && "setPointerCapture" in handlebar) {
				handlebar.setPointerCapture(e.pointerId);
			}
		};

		const onPointerMove = (e: PointerEvent) => {
			if (!isDragging || dragStartY === 0) return;
			const dragDistance = e.clientY - dragStartY;
			// Only allow downward drag
			if (dragDistance > 0) {
				el.style.transform = `translateY(${dragDistance}px)`;
			}
		};

		const onPointerUp = (e: PointerEvent) => {
			if (!isDragging) return;
			isDragging = false;
			const dragDistance = e.clientY - dragStartY;
			const dragTime = Date.now() - dragStartTime;
			dragStartY = 0;

			if (handlebar) handlebar.style.cursor = "grab";

			// Close if dragged > 100px down or fast flick
			if (dragDistance > 100 || (dragDistance > 30 && dragTime < 200)) {
				if (hasFilterChanges()) {
					const form = document.getElementById(
						"filter"
					) as HTMLFormElement | null;
					if (form) form.submit();
				} else {
					revertFiltersToApplied();
				}

				// Animate slide-out before closing
				el.style.transition = "all 0.3s ease-out";
				el.style.transform = `translateY(100vh)`;
				setTimeout(() => {
					setOverlayOpen(false);
					onClose?.();
				}, 300);
			} else {
				// Snap back if didn't meet threshold
				el.style.transition = "all 0.2s ease-out";
				el.style.transform = "translateY(0)";
			}
		};

		const onPointerLeave = () => {
			if (!isDragging && handlebar) {
				handlebar.style.cursor = "grab";
			}
		};

		if (handlebar) {
			// Add grab cursor on hover
			handlebar.style.cursor = "grab";
			handlebar.addEventListener("pointerdown", onPointerDown);
			document.addEventListener("pointermove", onPointerMove);
			document.addEventListener("pointerup", onPointerUp);
			handlebar.addEventListener("pointerleave", onPointerLeave);
		}

		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				if (!hasFilterChanges()) {
					revertFiltersToApplied();
				}
				setOverlayOpen(false);
				onClose?.();
			}
		};
		document.addEventListener("keydown", onKey);

		return () => {
			if (handlebar) {
				handlebar.removeEventListener("pointerdown", onPointerDown);
				handlebar.removeEventListener("pointerleave", onPointerLeave);
				handlebar.style.cursor = "";
			}
			document.removeEventListener("pointermove", onPointerMove);
			document.removeEventListener("pointerup", onPointerUp);
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = prevOverflow;

			// move element back to its original location to avoid leaving DOM mutated
			if (originalParent) {
				if (originalNextSibling)
					originalParent.insertBefore(el, originalNextSibling);
				else originalParent.appendChild(el);
			}

			// remove portal root
			try {
				portalRoot.remove();
			} catch {}
		};
	}, [
		overlayOpen,
		isMobile,
		hasFilterChanges,
		revertFiltersToApplied,
		onClose,
	]);

	const filterContent = (
		// <Form
		// 	aria-label="filter"
		// 	id="filter"
		// 	action="/store"
		// 	className={cn(
		// 		"w-full",
		// 		"grid grid-cols-1 md:grid-cols-2 gap-4",
		// 		"items-start",
		// 		"justify-between ",
		// 		"items-center gap-0 max-w-6xl mx-auto  py-0 px-5 lg:px-10 lg:max-w-7xl",
		// 		"justify-around",
		// 		"justify-items-around",
		// 		"content-center",
		// 		"px-10",
		// 		"lg:px-15",
		// 		"justify-items-start",
		// 		// "max-w-6xl mx-auto py-0 px-5 lg:px-10 lg:max-w-7xl",
		// 		"w-full sm:w-fit",
		// 		"sx:border-none",

		// 		// container design test
		// 		"bg-container",
		// 		"shadow-xl",
		// 		"rounded-2xl",
		// 		"p-5",
		// 		// "md:p-5",
		// 		// "lg:p-5",
		// 		// "lg:px-5 mr-0",
		// 		// "md:mt-10",
		// 		"mt-5",
		// 		// "md:",
		// 		// "md:grid-rows-3 lg:grid-rows-1",

		// 		"",
		// 		"",
		// 		""
		// 	)}
		// >
		<div
			id="form-container"
			className={cn(
				"w-full",
				"grid grid-cols-1 md:grid-cols-2 gap-4",
				"items-start",
				"justify-between ",
				"items-center gap-0 max-w-6xl mx-auto py-0 px-5 lg:px-10 lg:max-w-7xl",
				"md:grid-cols-1",
				isMobile
					? cn(
							"fixed",
							"bottom-0 left-0",
							// "h-180",
							"z-999",
							"rounded-t-3xl",
							"shadow-xl",
							"bg-container-solid",
							"p-0 pt-0 lg:px-10",
							!overlayOpen && "hidden"
					  )
					: cn(
							"relative",
							"bg-container",
							"shadow-xl",
							"rounded-2xl",
							"p-5",
							"mt-5"
					  )
			)}
		>
			<div id="divier handle container" className="w-full">
				<div
					id="divier handle"
					className={cn(
						"w-10 h-1 rounded-2xl",
						"bg-container-lowered",
						"bg-edge-dark",
						"justify-self-center self-start my-5",
						!isMobile && "hidden"
					)}
				/>
			</div>
			{isMobile && (
				<div
					className={cn(
						"grid grid-cols-3 w-full h-fit ",
						"mb-0",
						"sm:mb-5",
						"border-b border-edge-dark",
						"pb-5",
						// "-mx-5 sm:mx-0",
						"px-5",

						"",
						""
					)}
				>
					<h3 className="col-start-2 justify-self-center self-center text-xl leading-none">
						Filter Search
					</h3>
					<button
						type="button"
						onClick={handleClearAll}
						className={cn(
							"col-start-3 justify-self-end",
							"text-nowrap rounded-full w-full sm:w-fit px-6 py-1 transition-colors",
							"border border-secondary text-secondary",
							"hover:border-accent-dark hover:text-accent-dark",
							"w-fit",
							"text-xl self-center",
							"leading-none",
							`${textBtnClass}`,
							`${secondaryBtnClass}`,
							`${compressedBtnClass}`,
							"",
							"",
							"",
							""
						)}
					>
						Clear Filters
						{/* Clear All */}
					</button>
				</div>
			)}
			<Form
				aria-label="filter"
				id="filter"
				action="/store"
				className={cn(
					"w-full",
					"grid grid-cols-1 md:grid-cols-2 gap-4",
					"items-start",
					"justify-between ",
					// "items-center gap-0 max-w-6xl mx-auto  py-0 px-5 lg:px-10 lg:max-w-7xl",
					"items-center gap-0 ",
					"overflow-auto",
					"[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
					"",
					"",
					"h-full",
					"p-2",
					"sm:overflow-visible",
					"sm:h-auto",
					"sm:p-0",
					// "xl:grid-cols-1",
					"gap-5",
					"p-5",
					"pt-0",
					"sm:pt-0",
					"pb-25",
					"sm:pb-5",
					// "max-w-6xl ",
					// "lg:max-w-7xl",
					// "mx-auto",
					// "justify-around",
					// "justify-items-around",
					// "content-center",
					// "px-10",
					// "lg:px-15",
					// "justify-items-start",
					// "w-full sm:w-fit",
					// "sx:border-none",
					// "bg-container",
					// "shadow-xl",
					// "rounded-2xl",
					// "p-5",
					// "mt-5",
					// _-____________________________
					// "sticky",
					// "static",
					// "fixed",
					// // "top-0",

					// "bg-container-solid",
					// "bottom-0",
					// "left-0",
					// "h-100",
					// "overflow-auto",
					// "z-99",

					// "pt-30",
					// "rounded-t-3xl",
					// "shadow-xl",

					// "bg-red-400",
					"",
					"",
					""
				)}
			>
				{/* TODO: in filters year and copyright button overflows */}
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

				<div
					id="filter-input-container"
					className={cn(
						"w-full sm:w-fit",
						"grid gap-4",
						"grid-cols-1    sm:grid-cols-2 md:grid-cols-2",
						"md:grid-rows-2 lg:grid-cols-4",
						"lg:grid-rows-1",
						"sm:col-span-2",
						"",
						""
					)}
				>
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
				<div
					id="filter button row"
					className={cn(
						"border-t border-edge-dark",
						// "border-t border-divider",
						"flex items-end justify-start gap-5",
						"sx:col-span-2 sx:mr-auto",
						// "py-5 sm:py-0 w-full sm:w-fit",
						"w-full sm:w-full",
						// "sm:border-none",
						// "border-b border-divider",
						"",
						// "sticky",
						// "absolute",
						// "static",
						"bg-container-solid p-5",
						"sm:bg-transparent sm:p-0 sm:pt-5",
						"fixed",
						"sm:relative",
						"bottom-0 left-0 right-0",
						// "sx:relative",
						// "sm:bottom-auto sm:left-auto sm:right-auto",
						"",
						""
					)}
				>
					<button
						type="submit"
						className={cn(
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
							// compressedBtnClass,
							"",
							""
						)}
					>
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
							textBtnClass,
							secondaryBtnClass,
							// compressedBtnClass,
							"hidden sm:flex",
							"",
							""
						)}
					>
						Clear Filters
						{/* Clear All */}
					</button>
				</div>
			</Form>
		</div>
	);

	return filterContent;
}
