import { cn } from "@/utils/cn";
import Image from "next/image";

interface ProfileImageProps {
	imgSrc: string;
	title: string;
}

export default function ProfileImage({ imgSrc, title }: ProfileImageProps) {
	return (
		<div
			className={cn(
				"grid grid-cols-[1fr_6fr_1fr] row-start-2",
				"relative items-center justify-center",

				"w-fit",
				"h-fit",
				// "w-full",
				"mx-auto",

				// lg
				"lg:mx-auto",
				"lg:w-full",

				"",
				""
			)}>
			{imgSrc ? (
				<Image
					src={imgSrc}
					alt={title ?? "cover"}
					width={220}
					height={330}
					className={cn(
						// set an explicit width so the image is larger
						// "w-[220px] sm:w-[220px] md:w-[260px] h-auto object-cover rounded-xl aspect-2/3 z-10",
						// "md:w-xs h-auto object-cover rounded-xl aspect-2/3 z-10",
						"w-xs h-auto object-cover rounded-xl aspect-2/3 z-10",
						"col-start-2 row-start-1",
						"shadow-2xl",

						"md:min-w-3xs md:max-w-xs md:w-full",
						"md:min-w-3xs md:max-w-full md:w-full",

						// "md:w-full",
						// "lg:min-w-none lg:max-w-none lg:w-xs",
						"lg:w-full",
						"",
						""
					)}
					// TODO make hover animation for zoomin.
				/>
			) : (
				<div className="w-full  rounded-xl aspect-2/3 bg-divider" />
			)}
			<div
				className={cn(
					"rounded-full",
					"bg-divider/30",
					"w-full",
					"aspect-square",
					"w-xs h-auto object-cover ",
					"col-start-2 row-start-1",
					"shadow-2xl",
					"min-w-fit max-w-full w-full",
					// "md:min-w-3xs md:max-w-full md:w-full",
					"col-start-1 col-span-3 row-start-1 z-0",
					"md:min-w-3xs md:max-w-full md:w-full",
					// "w-[220px] sm:w-[220px] md:w-[260px] h-auto object-cover rounded-xl aspect-2/3 z-10",
					// "md:w-xs h-auto object-cover rounded-xl aspect-2/3 z-10",
					// "w-xs h-auto object-cover rounded-xl aspect-2/3 z-10",
					// "col-start-2 row-start-1",
					// "shadow-2xl",

					// "md:min-w-3xs md:max-w-xs md:w-full",
					// // "md:w-full",
					// "lg:min-w-none lg:max-w-none lg:w-xs",
					"",
					""
				)}
				//
			></div>
		</div>
	);
}
