import { cn } from "@/utils/cn";

export default function Loading() {
	return (
		<div
			className={cn(
				"flex items-center justify-center h-full w-full",
				"",
				""
			)}>
			<div className={cn("text-xl text-gray-500 animate-pulse", "", "")}>
				Loading home page...
			</div>
		</div>
	);
}
