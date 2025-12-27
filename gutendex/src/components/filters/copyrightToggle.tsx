import { cn } from "@/utils/cn";
import { LiaToggleOnSolid } from "react-icons/lia";

type CopyrightToggleProps = {
	checked: boolean;
	onChange: (checked: boolean) => void;
};
// TODO change default color
export default function CopyrightToggle({
	checked,
	onChange,
}: CopyrightToggleProps) {
	return (
		<label
			htmlFor="copyright"
			className={cn(
				"cursor-pointer",
				"grid grid-cols-2",
				"w-full",
				"gap-2",
				"items-center",
				"justify-between",
				"text-xl",
				"",
				""
			)}
		>
			Copyright
			<input
				id="copyright"
				type="checkbox"
				name="copyright"
				value="on"
				aria-label="Filter by copyright status"
				title="copyright"
				className={cn("sr-only", "peer", "", "")}
				checked={checked}
				onChange={() => onChange(!checked)}
			/>
			{checked ? (
				<div
					className={cn(
						"flex",
						"justify-end",

						"",
						""
					)}
				>
					<LiaToggleOnSolid
						size={42}
						className={cn(
							"text-accent-dark",
							"size-13",

							"",
							""
						)}
					/>
				</div>
			) : (
				<div
					className={cn(
						"flex",
						"justify-end",

						"",
						""
					)}
				>
					<LiaToggleOnSolid
						size={42}
						className={cn(
							"size-13",
							"rotate-180",
							"text-divider",

							"",
							""
						)}
					/>
				</div>
			)}
		</label>
	);
}
