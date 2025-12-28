import Image from "next/image";
import { cn } from "@/utils/cn";

type Props = {
	title: { main?: string; sub?: string };
	authorsText?: string;
};

export default function PlaceholderBookCover({ title }: Props) {
	// export default function PlaceholderBookCover({ title, authorsText }: Props) {
	return (
		<div
			className={cn(
				"grid grid-rows-[auto_1fr]",
				"justify-items-center",
				"items-start",
				"bg-divider",
				"p-2",
				"gap-1",
				"w-full",
				"h-full",
				"max-w-30 sm:max-w-none",
				"min-h-40 sm:min-h-none",
				"aspect-2/3",
				"rounded-xl",
				"rounded-2xl",
				"overflow-hidden",
				"",
				""
			)}>
			<Image
				id="logo"
				src="/gutendex_short_dark.png"
				alt="logo"
				width={200}
				height={20}
				className={cn(
					"h-auto",
					"h-auto",
					"w-[60%]",
					"max-w-20",
					"object-contain",
					"shrink-0",
					"",
					""
				)}
			/>
			<div
				id="cover-placeholder"
				className={cn(
					"row-start-2",
					"w-full",
					"min-h-0",
					"flex-1",
					"overflow-hidden",
					"grid",
					"bg-divider",
					"h-full",
					"content-start",
					"justify-items-center",
					"text-center",
					"rounded-2xl",
					"px-1",
					"",
					""
				)}>
				<span
					className={cn(
						"text-[clamp(0.5rem,3vw,1rem)]",
						"leading-tight",
						"tracking-wide",
						"font-bold",
						"text-secondary",

						// "bg-divider",
						"py-1",
						"line-clamp-3",
						"overflow-hidden",
						"text-ellipsis",
						"wrap-break-word",
						"w-full",
						"",
						""
					)}>
					{title?.main}
				</span>
				<span
					className={cn(
						"text-[clamp(0.4rem,2vw,0.75rem)]",
						"tracking-wide",
						"text-tertiary",
						"line-clamp-2",
						"overflow-hidden",
						"hidden",
						"sm:block",
						"",
						""
					)}>
					{title?.sub}
				</span>
			</div>
		</div>
	);
}
