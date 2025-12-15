"use client";
import { cn } from "@/utils/cn";
import type { Book } from "@/types";

type Props = {
	book?: Book;
	index?: number;
	upperDownloadCountLimit?: number;
	mini?: boolean;
};

export default function CardSkeleton({ mini = false }: Props) {
	return (
		<div
			className={cn(
				"bg-container border-edge border rounded-3xl shadow-xl hover:bg-container-raised hover:scale-101 animate-pulse",
				mini
					? "inline-block flex-none w-80 h-fit"
					: "block h-full w-lg sm:w-2xs"
			)}>
			<div
				className={cn(
					"overflow-hidden rounded-3xl",
					!mini && "h-full"
				)}>
				<div
					id="image"
					className={cn(
						mini
							? "flex flex-row gap-4 items-start p-4"
							: "flex flex-row gap-4 p-4 h-full sm:flex-col w-full"
					)}>
					<div
						className={cn(
							"bg-foreground/10 dark:bg-foreground/10 rounded-xl aspect-2/3",
							mini ? "w-30 aspect-2/3" : "w-full ",
							"",
							""
						)}
					/>

					<div className="flex flex-col justify-between gap-4 h-full w-full">
						<div className={cn(mini && "flex flex-col gap-2")}>
							<h2
								className={cn(
									"text-2xl font-extralight text-primary leading-tight",
									mini && "text-xs leading-tight"
								)}>
								<span
									className={cn(
										"rounded-full bg-foreground/50 dark:bg-foreground/50 mr-1",
										mini ? "px-8 py-1" : "mr-1 px-20 py-1"
									)}
								/>
								<span className="rounded-full bg-foreground/20 dark:bg-foreground/20 mr-1 px-10 py-0.5 text-sm self-baseline" />
							</h2>

							<p
								className={cn(
									"text-sm italic font-thin",
									mini ? "text-xs mt-3" : "mt-3"
								)}>
								<span className="rounded-full bg-foreground/20 dark:bg-foreground/20 mr-1 px-3 py-0.5 text-sm" />
								<span className="rounded-full bg-foreground/50 px-15 ml-1" />
								{mini && (
									<span className="flex items-center gap-0.5 mt-0.5">
										<span className="rounded-full px-4 py-1.5 bg-foreground/20 dark:bg-foreground/20 text-xs" />
										<span className="rounded-full px-10 py-1.5 bg-foreground/30 dark:bg-foreground/30 text-xs" />
										<span className="rounded-full px-4 py-1.5 bg-foreground/20 dark:bg-foreground/20" />
									</span>
								)}
							</p>
						</div>

						<div
							className={cn(
								"flex flex-row justify-between sm:flex-col sm:gap-4",
								mini && "hidden"
							)}>
							<div
								className={cn(
									"flex flex-col h-full",
									mini && "hidden"
								)}>
								<div className="mt-auto">
									<p>
										<span className="rounded-full px-10 bg-foreground/10 dark:bg-foreground/10 mr-1" />
									</p>
									<div>
										<span className="rounded-full px-4 bg-foreground/10 dark:bg-foreground/10 mr-1" />
										<span className="rounded-full px-15 bg-foreground/30 dark:bg-foreground/30 mr-1" />
										<span className="rounded-full px-5 bg-foreground/10 dark:bg-foreground/10 mr-1" />
									</div>
								</div>
								<p>
									<span className="rounded-full px-10 bg-foreground/20 dark:bg-foreground/20 mr-1" />
									<span className="rounded-full px-15 bg-foreground/20 dark:bg-foreground/20 mr-1" />
								</p>
							</div>

							<span className="self-end sm:self-start rounded-full bg-foreground/10 dark:bg-foreground/10 px-12 py-3 w-30 h-10" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
