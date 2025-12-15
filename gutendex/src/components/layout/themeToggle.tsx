"use client";
import { useState, useEffect, startTransition } from "react";
import { IoSunny, IoMoon } from "react-icons/io5";
import { cn } from "@/utils/cn";
import { useTheme } from "@/providers/providers";

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
			<div className={cn("fixed right-4 bottom-4 z-50")}>
				<button
					aria-label="toggle theme"
					type="button"
					className={cn(
						"inline-flex items-center gap-2",
						"rounded-full border border-foreground/30",
						"px-3 py-2 text-sm transition-colors",
						"bg-container-inv text-primary-inv"
					)}>
					<IoMoon />
					<span className="leading-none">Theme</span>
				</button>
			</div>
		);
	}

	return (
		<div className={cn("fixed right-4 bottom-4 z-50")}>
			<button
				aria-label="toggle theme"
				type="button"
				aria-pressed={isDark}
				onClick={toggleTheme}
				className={cn(
					"inline-flex items-center gap-2",
					"rounded-full border border-foreground/30",
					"px-3 py-2 text-sm transition-colors",

					"",
					isDark
						? "bg-container-inv text-primary-inv"
						: "bg-container-inv text-primary-inv"
				)}>
				{isDark ? <IoSunny /> : <IoMoon />}
				<span className="leading-none">
					{isDark ? "Dark" : "Light"}
				</span>
			</button>
		</div>
	);
}
