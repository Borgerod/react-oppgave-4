"use client";
import React, { useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";

type TabItem = {
	id: string;
	label: string;
	content: ReactNode;
};

export default function Tabs({
	tabs,
	initial = 0,
}: {
	tabs: TabItem[];
	initial?: number;
}) {
	const [active, setActive] = useState(
		Math.max(0, Math.min(initial, tabs.length - 1))
	);

	return (
		<div className="w-full">
			<div className="flex flex-row gap-0 mb-8">
				{tabs.map((t, i) => (
					<button
						key={t.id}
						onClick={() => setActive(i)}
						className={cn(
							"text-sm",
							"font-thin",
							"border-b",
							"px-8 py-0.5 ",
							"w-fit ",
							"transition-colors",
							"border-divider",
							"",
							"",
							i === active
								? // ? "text-primary border border-b-0 rounded-t-xl"
								  "text-primary border border-b-0 border-x-0 rounded-t-xl"
								: "text-secondary hover:text-primary",

							// when active is 0
							active === 0 && i === active + 1
								? "rounded-bl-xl"
								: "",
							active === 0 ? "border-r-0" : "",

							// when active is 1
							active === 1 && i === active + 1
								? "rounded-bl-xl"
								: "",
							active === 1 && i === active - 1
								? "rounded-br-xl"
								: "",
							active === 1 ? "border-x-0" : "",

							// when active is 2
							active === 2 && i === active - 1
								? "rounded-br-xl"
								: "",
							active === 2 ? "border-l-0" : "",
							""
						)}
						aria-pressed={i === active}
						type="button">
						{t.label}
					</button>
				))}
			</div>

			<div className="tab-content">
				{tabs[active] ? (
					<div className="text-sm text-secondary px-2">
						{tabs[active].content}
					</div>
				) : null}
			</div>
		</div>
	);
}
