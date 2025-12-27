import { cn } from "@/utils/cn";

export const iconBtnClass = cn(
	"p-3",
	"aspect-square",
	"h-12",
	"pointer-events-auto",
	"rounded-full",
	"self-center",
	"hover:bg-foreground/10",
	"",
	""
);

export const compressedBtnClass = cn("px-5!", "py-1.5!", "h-fit!", "", "");

export const textBtnClass = cn(
	"aspect-auto",
	"text-nowrap",
	"flex items-center justify-center",
	"p-3",
	"h-12",
	"pointer-events-auto",
	"rounded-full",
	"",
	""
);

export const primaryBtnClass = cn(
	"border border-accent-dark text-accent-dark",
	"hover:bg-accent-dark hover:text-container-solid",
	"",
	""
);

export const secondaryBtnClass = cn(
	"border border-secondary text-secondary ",
	"hover:border-accent-dark hover:text-accent-dark",
	"",
	""
);

export const toggleButtoncls = cn(
	"fixed right-5 bottom-5 z-50",
	//
	"hover:scale-105 ",
	"hover:bg-container-inv/90",
	"hover:text-secondary",
	"hover:text-primary-inv/90",
	"hover:shadow",
	"hover:border",
	"hover:border-x-edge",
	"hover:border-t-edge-highlight",
	"hover:border-b-edge-dark",
	//
	"active:scale-105",
	"active:bg-container-inv/90",
	"active:text-secondary",
	"active:text-primary-inv/90",
	"active:shadow",
	"active:border",
	"active:border-x-edge",
	"active:border-t-edge-highlight",
	"active:border-b-edge-dark",
	//
	"dark:bg-container-inv dark:text-primary-inv",
	"bg-container-inv text-primary-inv",
	"",
	""
);
