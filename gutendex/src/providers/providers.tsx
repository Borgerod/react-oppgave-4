"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	startTransition,
} from "react";
import type { Book, BooksResponse } from "@/types";

type ThemeContextType = {
	isDark: boolean;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}

// Upper download count context
const UpperDownloadCountContext = createContext<number | undefined>(undefined);

export function useUpperDownloadCount() {
	const context = useContext(UpperDownloadCountContext);
	return context;
}

export default function Providers({ children }: { children: React.ReactNode }) {
	const [isDark, setIsDark] = useState(false);
	const [upperDownloadCountLimit, setUpperDownloadCountLimit] = useState<
		number | undefined
	>(undefined);

	// Load theme preference on mount
	useEffect(() => {
		const stored = localStorage.getItem("theme");
		startTransition(() => {
			if (stored) {
				setIsDark(stored === "dark");
			} else {
				setIsDark(
					window.matchMedia("(prefers-color-scheme: dark)").matches
				);
			}
		});
	}, []);

	useEffect(() => {
		// Toggle .dark class on html element and persist to localStorage
		if (isDark) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [isDark]);

	// compute an initial upper download count on first client mount
	useEffect(() => {
		let mounted = true;

		function computeUpperDownloadCountLimit(results: Book[], limit = 1.5) {
			if (!results || results.length === 0) return undefined;
			let current = results[0]?.download_count;
			for (let i = 1; i < results.length; i++) {
				const next = results[i]?.download_count;
				if (current > next * limit) {
					current = next;
					continue;
				}
				return current;
			}
			return current;
		}

		async function load() {
			try {
				const res = await fetch("/api/books");
				if (!res.ok) return;
				const json = (await res.json()) as BooksResponse;
				if (!mounted) return;
				// only set when we have the first page (no previous)
				if (!json.previous) {
					const v = computeUpperDownloadCountLimit(json.results);
					setUpperDownloadCountLimit(v);
				}
			} catch (err) {
				// silent
				console.error("Failed to compute upperDownloadCountLimit", err);
			}
		}

		load();
		return () => {
			mounted = false;
		};
	}, []);

	const toggleTheme = () => {
		setIsDark((prev) => !prev);
	};

	return (
		<UpperDownloadCountContext.Provider value={upperDownloadCountLimit}>
			<ThemeContext.Provider value={{ isDark, toggleTheme }}>
				{children}
			</ThemeContext.Provider>
		</UpperDownloadCountContext.Provider>
	);
}
