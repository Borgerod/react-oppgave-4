import { Suspense } from "react";
import { cn } from "@/utils/cn";
// import FilterSection from "./FilterSection";
import StorePageInner from "./StorePageInner";
import { getLanguageOptions } from "@/components/filters/filterOptions.server";

export default async function Store() {
	const languageOptions = await getLanguageOptions();

	return (
		<main>
			{/* <Suspense
				fallback={
					<div className={cn("p-8", "text-center", "", "")}>
						Loading filters...
					</div>
				}>
				<FilterSection />
			</Suspense> */}
			<Suspense
				fallback={
					<div className={cn("p-8", "text-center", "", "")}>
						Loading store...
					</div>
				}>
				<StorePageInner languageOptions={languageOptions} />
			</Suspense>
		</main>
	);
}
