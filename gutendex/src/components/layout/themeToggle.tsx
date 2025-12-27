"use client";
import { useState, useEffect, startTransition } from "react";
import { IoSunny, IoMoon } from "react-icons/io5";
import { cn } from "@/utils/cn";
import { useTheme } from "@/providers/providers";
import {
	compressedBtnClass,
	iconBtnClass,
	primaryBtnClass,
	secondaryBtnClass,
	textBtnClass,
	toggleButtoncls,
} from "../buttonClasses";

export default function ThemeToggle() {
	const { isDark, toggleTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		startTransition(() => {
			setMounted(true);
		});
	}, []);

	if (!mounted) {
		return (
			<button
				aria-label="toggle theme"
				type="button"
				className={cn(
					textBtnClass,
					toggleButtoncls,

					"",
					""
				)}
			>
				<IoMoon />
				<span className="leading-none">Theme</span>
			</button>
		);
	}

	return (
		<button
			aria-label="toggle theme"
			type="button"
			aria-pressed={isDark}
			onClick={toggleTheme}
			className={cn(
				textBtnClass,
				toggleButtoncls,

				"",
				""
			)}
		>
			{isDark ? <IoSunny /> : <IoMoon />}
			<span className="leading-none">{isDark ? "Dark" : "Light"}</span>
		</button>
	);
}
