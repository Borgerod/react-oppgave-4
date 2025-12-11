"use client";
import { IoSunny, IoMoon } from "react-icons/io5";
import { cn } from "@/utils/cn";
import { useTheme } from "@/providers/providers";

export default function ThemeToggle() {
	const { isDark, toggleTheme } = useTheme();

	return (
		<div className={cn("fixed right-4 bottom-4 z-50")}>
			{/* todo: struggling to fix this */}
			<button
				aria-label="toggle theme"
				type="button"
				aria-pressed={isDark}
				onClick={toggleTheme}
				className={cn(
					"inline-flex items-center gap-2",
					"rounded-full border border-foreground/30",
					"px-3 py-1 text-sm transition-colors",
					isDark
						? "bg-foreground text-background"
						: "bg-transparent text-foreground hover:bg-foreground/10"
				)}
			>
				{isDark ? <IoSunny /> : <IoMoon />}
				<span>{isDark ? "Dark" : "Light"}</span>
			</button>
		</div>
	);
}
