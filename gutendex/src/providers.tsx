"use client";
import { cn } from "@/utils/cn";

import React, { createContext, useContext, useState, useEffect } from "react";

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

export default function Providers({ children }: { children: React.ReactNode }) {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		// Check localStorage or system preference on mount
		const stored = localStorage.getItem("theme");
		if (stored) {
			setIsDark(stored === "dark");
		} else {
			setIsDark(
				window.matchMedia("(prefers-color-scheme: dark)").matches
			);
		}
	}, []);

	useEffect(() => {
		// Toggle .dark class on html element
		if (isDark) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [isDark]);

	const toggleTheme = () => {
		setIsDark((prev) => !prev);
	};

	return (
		<ThemeContext.Provider value={{ isDark, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
