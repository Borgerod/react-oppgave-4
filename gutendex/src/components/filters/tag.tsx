"use client";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";

export type TagProps = {
	id: string;
	item: string;
	checked?: boolean;
	onToggle?: () => void;
	closeIcon?: boolean;
	url?: string;
	bigText?: boolean;
	isDownload?: boolean;
	className?: string;
};

export function Tag({
	id,
	item,
	checked,
	onToggle,
	closeIcon,
	url,
	bigText,
	isDownload,
	className,
}: TagProps) {
	const router = useRouter();

	const darkMode: string[] = [
		"hover:bg-accent/50",
		" hover:text-primary",
		"dark:bg-foreground/25 dark:hover:bg-accent/50 hover:dark:text-primary-inv",
		"dark:bg-divider dark:hover:bg-accent/50 hover:dark:text-primary-inv",
		"active:bg-accent-dark/50",
		"active:dark:bg-accent-dark/50",
	];

	// When URL is provided, render as a button with navigation to avoid nested links
	if (url) {
		return (
			<button
				type="button"
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					// notify listeners that a navigable tag was clicked
					try {
						if (isDownload && typeof window !== "undefined") {
							window.dispatchEvent(
								new CustomEvent("gutendex:download-click", {
									detail: { url, item },
								})
							);
						}
					} catch {
						// ignore
					}

					// call optional toggle handler
					onToggle?.();

					router.push(url);
				}}
				className={cn(
					"flex items-center gap-1 text-xs font-thin",
					"rounded-full",
					"px-2 py-0.5",
					"flex-nowrap w-fit",
					"cursor-pointer",
					// colors
					"text-primary/80 bg-foreground/10",

					darkMode,
					"font-thin",
					bigText ? "text-lg sm:text-sm" : "",

					"",
					"",
					"",

					className ?? ""
				)}>
				{item}
			</button>
		);
	}

	return (
		<>
			<input
				id={id}
				type="checkbox"
				aria-label={item}
				title={item}
				className="sr-only peer"
				checked={checked ?? false}
				onChange={() => onToggle?.()}
			/>

			<label
				htmlFor={id}
				className={cn(
					"flex",
					"items-center",
					"gap-1",
					"text-xs",
					"font-thin",
					"rounded-full",
					"h-6",
					"flex-nowrap",
					"w-fit",
					"text-primary/80",
					"hover:text-primary",
					"peer-checked:text-primary",
					"font-thin",
					"p-1",
					// `${closeIcon ? "pr-1.5" : ""}`,
					// `${closeIcon ? "pl-1.5 p-1" : "p-1"}`,
					`${closeIcon ? "pl-2" : ""}`,
					bigText ? "text-lg sm:text-base" : "text-sm",
					"text-nowrap",
					"cursor-pointer",
					closeIcon ? "select-none pointer-events-none" : "",
					"text-center",
					"content-center",
					"dark:bg-foreground/25",
					"dark:hover:bg-accent/50",
					"hover:dark:text-primary-inv",
					"dark:bg-divider",
					// "active:bg-accent-dark/50",
					// "active:dark:bg-accent-dark/50",
					// "peer-checked:dark:text-primary-inv",
					// "active:dark:bg-accent-dark/50",
					// "peer-checked:dark:text-primary-inv",
					"bg-foreground/10",
					// "peer-checked:bg-accent/50",
					// "dark:bg-foreground",
					// "peer-checked:bg-accent",
					// "dark:bg-container-raised",
					// "dark:bg-edge",
					// "dark:bg-container-solid",
					"dark:bg-container",
					"dark:border-edge dark:border",
					"hover:dark:bg-edge-highlight",
					"dark:text-accent-light!",
					// darkMode,
					className ?? ""
				)}>
				{item}
				{closeIcon ? (
					<button
						type="button"
						aria-label={`Remove ${item}`}
						onClick={() => onToggle?.()}
						className={cn(
							"p-0.5",
							"rounded-full",
							"flex",
							"items-center",
							"border-0",
							"cursor-pointer",
							"bg-container",
							"hover:bg-container-raised",
							"dark:bg-container-solid",
							"dark:bg-edge",
							"hover:dark:bg-edge",
							// "hover:dark:bg-edge-dark",
							"text-secondary",
							"hover:text-primary",
							"hover:font-bold",
							"bg-accent-light/10!",
							"text-accent-light!",
							bigText ? "text-lg sm:text-sm" : "",
							"pointer-events-auto",
							"cursor-pointer"
						)}>
						<IoMdClose />
					</button>
				) : null}
			</label>
		</>
	);
}
