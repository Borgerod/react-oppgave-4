import { cn } from "@/utils/cn";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { textBtnClass } from "../buttonClasses";

export default function CopyrightToggle() {
	const searchParams = useSearchParams();
	const preChecked = searchParams.get("copyright") ?? "";
	const [selectedCopyright, setSelectedCopyright] =
		useState<string>(preChecked);

	const copyrightOption = {
		"": "All",
		true: "Only Copyright",
		false: "Only Public",
	};

	return (
		<fieldset
			id="copyright-toggle fieldset"
			name="copyright"
			aria-label="Filter copyrighted material">
			<div
				role="group"
				aria-labelledby="copyright-label"
				className={cn(
					// layout
					"flex", // Use Flexbox for easier alignment
					"flex-row", // Mobile: Side-by-side (Row)
					"sm:flex-col", // sm: Stacked (Column)

					// alignment
					"items-center", // Mobile: Center vertically
					"sm:items-start", // sm: Align to start
					"justify-between",
					// sizing
					"md:w-fit",
					"h-fit",
					// spacing
					// "gap-4", // Mobile: Gap between legend and buttons
					"gap-1", // Mobile: Gap between legend and buttons
					"gap-5", // Mobile: Gap between legend and buttons
					"sm:gap-2", // sm: Smaller gap when stacked
					"",
					""
				)}>
				<span
					id="copyright-label"
					className={cn(
						// layout
						// "row-start-1", // REMOVED: Let flexbox handle order
						// typography
						"text-xl",
						// "h-full",
						"",
						""
					)}>
					Copyright
				</span>

				<ul
					aria-label="Filter by copyright status"
					className={cn(
						// layout
						"grid",
						"grid-flow-col",
						"place-items-center",
						// "row-start-3",
						// sizing
						"w-fit",
						"h-12",
						"max-h-50",
						// spacing
						"p-1",
						"gap-1",
						// border
						"border",
						"border-edge/30",
						"rounded-full",
						// background
						"bg-edge/50",
						"dark:bg-edge-dark/50",
						// effects
						"inset-shadow-sm",
						// overflow
						"overflow-x-clip",
						"overflow-y-auto",
						// typography
						"text-nowrap",
						// state/variant
						"dark:hover:border-edge/50",
						"",
						""
					)}>
					{Object.entries(copyrightOption).map(([value, label]) => (
						<label
							key={value}
							className={cn(
								textBtnClass,
								// sizing
								"h-full",
								// spacing
								"p-1",
								"px-5",
								"px-3",
								"md:px-3",
								// border
								"rounded-full",
								// background & state
								selectedCopyright === value
									? "bg-edge-highlight shadow-md hover:bg-edge-highlight"
									: "bg-transparent hover:bg-edge",
								// typography
								"text-center",
								"w-fit",
								""
							)}>
							<input
								type="radio"
								name="copyright"
								id={`${label.replace(" ", "-").toLowerCase()}`}
								value={value}
								checked={selectedCopyright === value}
								onChange={() => setSelectedCopyright(value)}
								className={cn(
									// display
									"hidden",
									"",
									""
								)}
							/>
							{label}
						</label>
					))}
				</ul>
			</div>
		</fieldset>
	);
}
