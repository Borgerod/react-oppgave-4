"use client";
import { cn } from "@/utils/cn";
import { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";

interface SelectMenuProps {
	options: option[];
	label?: string;
	value?: string;
	onChange?: (value: string) => void;
	className?: string;
	id: string;
}
type option = {
	value: string;
	name: string;
};

const SelectMenu = ({
	options,
	label,
	value: controlledValue,
	onChange,
	className,
	id,
}: SelectMenuProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [internalValue, setInternalValue] = useState<string>(
		options[2].value
	);
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const selectedValue =
		controlledValue !== undefined ? controlledValue : internalValue;
	const selectedOption =
		options.find((opt) => opt.value === selectedValue) || options[2];

	const handleSelect = (optionValue: string) => {
		if (controlledValue === undefined) {
			setInternalValue(optionValue);
		}

		// Update URL with sort query parameter
		const params = new URLSearchParams(searchParams?.toString() || "");
		params.set("sort", optionValue);
		router.push(`?${params.toString()}`);

		onChange?.(optionValue);
		setIsOpen(false);
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div
			className={cn(
				"w-full",
				"justify-self-end",
				"justify-items-end",
				className,
				"",
				""
			)}
			ref={dropdownRef}>
			{label && (
				<label className="block text-sm font-medium text-secondary mb-1">
					{label}
				</label>
			)}
			<div className="relative">
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className={cn(
						"w-full",
						"min-w-40",
						"flex items-center justify-between",
						"bg-container-raised rounded-full px-4 py-2",
						"border border-edge-dark",
						"hover:border-edge-highlight",
						"focus:outline-none focus:ring-transparent focus:border-edge-highlight",
						"text-primary",
						"transition-colors duration-200",
						"cursor-pointer"
					)}>
					<span className="truncate">{selectedOption.name}</span>
					<div>
						<IoChevronDown className={cn(isOpen && "rotate-180")} />
					</div>
				</button>

				{isOpen && (
					<div
						className={cn(
							"absolute z-50 w-full mt-2",
							"bg-container-raised rounded-2xl",
							"border border-edge-dark",
							"shadow-lg",
							"overflow-hidden",
							"animate-in fade-in slide-in-from-top-2 duration-200"
						)}>
						<ul className="py-1 max-h-60 overflow-auto">
							{options.map((option, index) => (
								<li key={index}>
									<button
										id={id}
										type="button"
										onClick={() =>
											handleSelect(option.value)
										}
										value={option.value}
										className={cn(
											"w-full text-left px-4 py-2",
											"transition-colors duration-150",
											"",
											"hover:bg-accent-light/50 dark:hover:bg-accent-dark/30",
											"hover:text-primary dark:hover:text-primary",
											"focus:outline-none focus:bg-container-lowered",
											selectedValue === option.value
												? "bg-container text-primary font-medium"
												: "text-secondary"
										)}>
										{option.name}
									</button>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default SelectMenu;
