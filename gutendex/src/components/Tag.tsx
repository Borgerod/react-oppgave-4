import { cn } from "@/utils/cn";
// import { IoIosClose } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
export type TagProps = {
	id: string;
	item: string;
	checked: boolean;
	onToggle: () => void;
	closeIcon?: boolean;
};

export function Tag({ id, item, checked, onToggle, closeIcon }: TagProps) {
	return (
		<>
			<input
				id={id}
				type="checkbox"
				name={item}
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
					"text-primary/80 bg-foreground/10 hover:bg-accent/50 hover:text-primary", // (normal) bg+text - light
					"dark:bg-foreground/25 dark:hover:bg-accent/50 hover:dark:text-primary-inv", // (normal) bg+text - dark
					"dark:bg-divider dark:hover:bg-accent/50 hover:dark:text-primary-inv", // (normal) bg+text - dark
					"active:bg-accent-dark/50", // (active) bg - light
					"active:dark:bg-accent-dark/50", // (active) bg - dark
					"peer-checked:bg-accent/50 peer-checked:text-primary", // (peer) bg+text - light
					"peer-checked:dark:text-primary-inv", // (peer) bg+text - dark
					// "peer-checked:dark:text-primary/80", // (peer) bg+text - dark
					"font-thin",

					`${closeIcon ? "pr-1.5" : ""}`,
					"",
					""
				)}>
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
						// className="p-0 m-0 bg-transparent border-0 cursor-pointer flex items-center"
						//
					>
						<IoMdClose className="" />
					</button>
				) : null}
			</label>
		</>
	);
}
