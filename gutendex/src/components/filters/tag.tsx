import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";

export type TagProps = {
	id: string;
	item: string;
	checked: boolean;
	onToggle: () => void;
	closeIcon?: boolean;
	url?: string;
};

export function Tag({ id, item, checked, onToggle, closeIcon, url }: TagProps) {
	const router = useRouter();

	// When URL is provided, render as a button with navigation to avoid nested links
	if (url) {
		return (
			<button
				type="button"
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					router.push(url);
				}}
				className={cn(
					"flex items-center gap-1 text-xs font-thin",
					"rounded-full",
					"px-2 py-0.5",
					"flex-nowrap w-fit",
					"cursor-pointer",
					// colors
					"text-primary/80 bg-foreground/10 hover:bg-accent/50 hover:text-primary",
					"dark:bg-foreground/25 dark:hover:bg-accent/50 hover:dark:text-primary-inv",
					"dark:bg-divider dark:hover:bg-accent/50 hover:dark:text-primary-inv",
					"active:bg-accent-dark/50",
					"active:dark:bg-accent-dark/50",
					"font-thin",

					"",
					"",
					""
				)}
			>
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
				checked={checked}
				onChange={onToggle}
			/>
			<label
				htmlFor={id}
				className={cn(
					"flex items-center gap-1 text-xs font-thin ",
					"rounded-full",
					"px-2 py-0 ",
					"py-0.5 px-2",
					"flex-nowrap w-fit",

					// colors
					"text-primary/80 bg-foreground/10 hover:bg-accent/50 hover:text-primary",
					"dark:bg-foreground/25 dark:hover:bg-accent/50 hover:dark:text-primary-inv",
					"dark:bg-divider dark:hover:bg-accent/50 hover:dark:text-primary-inv",
					"active:bg-accent-dark/50",
					"active:dark:bg-accent-dark/50",
					"peer-checked:bg-accent/50 peer-checked:text-primary",
					"peer-checked:dark:text-primary-inv",
					"font-thin",
					`${closeIcon ? "pr-1.5" : ""}`,

					// "px-2 py-0 ",
					// "py-0.5 px-2",
					// "py-1 px-2",
					"py-1 px-2 pt-1.5",
					"",

					// "leading-0",
					"leading-none",
					"",
					""
				)}
			>
				{item}
				{closeIcon ? (
					<button
						type="button"
						aria-label={`Remove ${item}`}
						onClick={onToggle}
						className={cn(
							"p-0.5 my-1 rounded-full ",
							"flex items-center",
							"border-0 cursor-pointer",
							"bg-container hover:bg-container-raised",
							"text-secondary hover:text-primary hover:font-bold",
							"",
							""
						)}
					>
						<IoMdClose className="" />
					</button>
				) : null}
			</label>
		</>
	);
}
