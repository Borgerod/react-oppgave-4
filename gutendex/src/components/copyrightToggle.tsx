import { LiaToggleOnSolid } from "react-icons/lia";

type CopyrightToggleProps = {
	checked: boolean;
	onChange: (checked: boolean) => void;
};

export default function CopyrightToggle({
	checked,
	onChange,
}: CopyrightToggleProps) {
	return (
		<label
			htmlFor="copyright"
			className="cursor-pointer grid grid-cols-2 w-full gap-2 items-center justify-between "
		>
			copyright
			<input
				id="copyright"
				type="checkbox"
				name="copyright"
				aria-label="Filter by copyright status"
				title="copyright"
				className="sr-only peer "
				checked={checked}
				onChange={() => onChange(!checked)}
			/>
			{checked ? (
				<div className="flex justify-end">
					<LiaToggleOnSolid size={32} className="rotate-180" />
				</div>
			) : (
				<div className="flex justify-end">
					<LiaToggleOnSolid size={32} color="var(--accent)" />
				</div>
			)}
		</label>
	);
}
