import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getDominantColors } from "@/utils/color-utils";

type LastReadCardProps = {
	title?: string;
	subtitle?: string;
	image?: string;
	badge?: {
		text: string | React.ReactNode;
		variant: "pink" | "indigo" | "orange";
	};
	href?: string;
};

const FALLBACK_COVER = "/Blank-Book-Cover-PNG-Picture.png";

export default function LastReadCard({
	title = "Modern Design Systems",
	subtitle = "Explore the fundamentals of contemporary UI design",
	image,
	// badge = { text: "Top", variant: "pink" },
	href = "https://kokonutui.com/",
}: LastReadCardProps) {
	const coverSrc = image ?? FALLBACK_COVER;
	// const shadowColor = "rgba(10, 17, 24, 0.4)";
	const shadowColor = "rgba(10, 17, 24, 0.4)";
	// return (
	// 	<div className="relative pt-12 pl-6 group transition-transform duration-300 hover:scale-[1.02]">
	// 		{/* Book Cover - Overlapping */}
	// 		<div
	// 			className="absolute left-0 top-0 z-20 w-32 h-44 rounded-lg overflow-hidden transition-transform duration-300 group-hover:-translate-y-2"
	// 			style={{ boxShadow: `0 20px 40px -10px ${shadowColor}` }}>
	// 			<Image
	// 				src={image || "/placeholder.svg"}
	// 				alt={title}
	// 				width={128}
	// 				height={176}
	// 				className="w-full h-full object-cover"
	// 			/>
	// 		</div>

	// 		{/* Card Background with Blurred Image */}
	// 		<div className="relative z-10 w-[320px] h-36 rounded-[2rem] overflow-hidden shadow-xl">
	// 			{/* Blurred Background Layer */}
	// 			<div className="absolute inset-0 z-0">
	// 				<Image
	// 					src={image || "/placeholder.svg"}
	// 					alt=""
	// 					fill
	// 					className="object-cover blur-2xl scale-150 opacity-80"
	// 				/>
	// 				{/* Dark Overlay for Text Readability */}
	// 				<div className="absolute inset-0 bg-black/40" />
	// 			</div>

	// 			{/* Content Layer */}
	// 			<div className="relative z-10 h-full p-6 pl-28 flex flex-col justify-center">
	// 				<h3 className="text-white text-lg font-bold leading-tight mb-2 pr-4">
	// 					{title}
	// 				</h3>
	// 				<p className="text-white/80 text-xs font-medium tracking-wide">
	// 					{subtitle}
	// 				</p>
	// 			</div>
	// 		</div>
	// 	</div>
	// );
	const [dominantColor, setDominantColor] = useState<string>("59, 94, 91");

	useEffect(() => {
		// todo: fix this
		// getDominantColors(coverSrc).then(setDominantColor);
	}, [image]);

	return (
		<div className="relative pt-12">
			<div
				className="relative flex h-[160px] w-full min-w-[340px] max-w-[420px] items-center rounded-[32px] p-6 shadow-2xl transition-transform hover:scale-[1.02]"
				style={{
					background: `linear-gradient(to right, rgb(${dominantColor}), rgb(10, 21, 28))`,
				}}>
				<div className="absolute -top-12 left-6 h-[180px] w-[120px] shrink-0 overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
					<Image
						src={image || "/placeholder.svg"}
						alt={title}
						fill
						className="object-cover"
						priority
					/>
				</div>
				<div className="ml-[140px] flex flex-col justify-center text-white/95">
					<h3 className="text-lg font-bold leading-tight tracking-tight sm:text-xl">
						{title}
					</h3>
					<p className="mt-2 text-xs font-medium opacity-70 sm:text-sm">
						{subtitle}
					</p>
				</div>
			</div>
		</div>
	);
}

// ALT 2: looks good.
// return (
//     <div className="relative pt-12 pl-6 group transition-transform duration-300 hover:scale-[1.02]">
//       {/* Book Cover - Overlapping */}
//       <div
//         className="absolute left-0 top-0 z-20 w-32 h-44 rounded-lg overflow-hidden transition-transform duration-300 group-hover:-translate-y-2"
//         style={{ boxShadow: `0 20px 40px -10px ${shadowColor}` }}
//       >
//         <Image
//           src={image || "/placeholder.svg"}
//           alt={title}
//           width={128}
//           height={176}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Card Background with Blurred Image */}
//       <div className="relative z-10 w-[320px] h-36 rounded-[2rem] overflow-hidden shadow-xl">
//         {/* Blurred Background Layer */}
//         <div className="absolute inset-0 z-0">
//           <Image src={image || "/placeholder.svg"} alt="" fill className="object-cover blur-2xl scale-150 opacity-80" />
//           {/* Dark Overlay for Text Readability */}
//           <div className="absolute inset-0 bg-black/40" />
//         </div>

//         {/* Content Layer */}
//         <div className="relative z-10 h-full p-6 pl-28 flex flex-col justify-center">
//           <h3 className="text-white text-lg font-bold leading-tight mb-2 pr-4">{title}</h3>
//           <p className="text-white/80 text-xs font-medium tracking-wide">{subtitle}</p>
//         </div>
//       </div>
//     </div>
//   )

// ALT 1:
// import { cn } from "@/utils/cn";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// type LastReadCardProps = {
// 	title?: string;
// 	subtitle?: string;
// 	image?: string;
// 	badge?: {
// 		text: string | React.ReactNode;
// 		variant: "pink" | "indigo" | "orange";
// 	};
// 	href?: string;
// };

// const FALLBACK_COVER = "/Blank-Book-Cover-PNG-Picture.png";

// export default function LastReadCard({
// 	title = "Modern Design Systems",
// 	subtitle = "Explore the fundamentals of contemporary UI design",
// 	image,
// 	// badge = { text: "Top", variant: "pink" },
// 	href = "https://kokonutui.com/",
// }: LastReadCardProps) {
// 	const coverSrc = image ?? FALLBACK_COVER;

// 	return (
// 		<Link
// 			href={href}
// 			className={cn(
// 				"group hover:scale-105",
// 				"grid grid-cols-[2fr_3fr] grid-rows-[1fr_3fr]",
// 				"h-fit w-fit",
// 				"max-w-md",
// 				"max-h-50",
// 				"h-45",
// 				"",
// 				""
// 			)}>
// 			<div
// 				className={cn(
// 					"row-start-2 row-span-1",
// 					"col-start-1 col-span-full",
// 					"h-35 w-full",
// 					"rounded-3xl",
// 					"overflow-hidden",
// 					"relative",
// 					"shadow-xl",
// 					"place-self-end",
// 					"h-35",
// 					"",
// 					""
// 				)}>
// 				{/* Blurred background: use the same cover as a background-image so the blur shows the cover itself */}
// 				<div
// 					aria-hidden
// 					className={cn(
// 						"absolute inset-0",
// 						"-z-10",
// 						"rounded-3xl",
// 						"overflow-hidden",
// 						"bg-container-solid",
// 						"",
// 						""
// 					)}>
// 					<Image
// 						src={coverSrc}
// 						alt=""
// 						fill
// 						priority={false}
// 						aria-hidden
// 						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
// 						className={cn(
// 							"object-cover",
// 							"scale-125",
// 							"blur-3xl",
// 							"saturate-150",
// 							"",
// 							""
// 						)}
// 					/>
// 				</div>
// 				<div
// 					aria-hidden
// 					className={cn(
// 						"absolute inset-0",
// 						"bg-linear-to-r",
// 						"from-black/5",
// 						"via-transparent",
// 						"to-transparent",
// 						"",
// 						""
// 					)}
// 				/>
// 			</div>
// 			<div
// 				id="book-info-box"
// 				className={cn(
// 					"row-start-1 row-span-2",
// 					"col-start-1 col-span-2",
// 					"grid grid-cols-subgrid grid-rows-subgrid",
// 					"h-full w-fit",
// 					"p-4",
// 					"pt-0",
// 					"z-10",
// 					"gap-4",
// 					"justify-items-center",
// 					"w-40",
// 					"",
// 					""
// 				)}>
// 				<Image
// 					src={coverSrc}
// 					alt={title}
// 					width={160}
// 					height={224}
// 					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
// 					id="book-cover"
// 					className={cn(
// 						"row-start-1 row-span-2",
// 						"col-start-1 col-span-1",
// 						"h-full w-full",
// 						"rounded-2xl",
// 						"m-0 p-0",
// 						"shadow-md",
// 						"border border-edge-dark",
// 						"object-cover",
// 						"",
// 						""
// 					)}
// 				/>

// 				<div
// 					id="info"
// 					className={cn(
// 						"row-start-2 row-span-1",
// 						"col-start-2 col-span-1",
// 						"h-full w-fit",
// 						"text-wrap",
// 						"py-5",
// 						"flex flex-col",
// 						"justify-center",
// 						"gap-2",
// 						"",
// 						""
// 					)}>
// 					<h3
// 						className={cn(
// 							"text-xs sm:text-base",
// 							"font-semibold",
// 							"text-primary-inv",
// 							"dark:text-primary",
// 							"leading-snug",
// 							"line-clamp-3",
// 							"",
// 							""
// 						)}>
// 						{title}
// 					</h3>

// 					<p
// 						className={cn(
// 							"text-sm",
// 							"text-primary-inv/70",
// 							"dark:text-primary/50",
// 							"line-clamp-1",
// 							"",
// 							""
// 						)}>
// 						{subtitle}
// 					</p>
// 				</div>
// 			</div>
// 		</Link>
// 	);
// }

// ORIGINAL
// import { cn } from "@/utils/cn";
// import Link from "next/link";
// import Image from "next/image";
// import React from "react";

// type LastReadCardProps = {
// 	title?: string;
// 	subtitle?: string;
// 	image?: string;
// 	badge?: {
// 		text: string | React.ReactNode;
// 		variant: "pink" | "indigo" | "orange";
// 	};
// 	href?: string;
// };

// export default function LastReadCard({
// 	title = "Modern Design Systems",
// 	subtitle = "Explore the fundamentals of contemporary UI design",
// 	image,
// 	// badge = { text: "Top", variant: "pink" },
// 	href = "https://kokonutui.com/",
// }: LastReadCardProps) {
// 	return (
// 		<Link
// 			href={href}
// 			className={cn(
// 				"group hover:scale-105",
// 				"grid grid-cols-[2fr_3fr] grid-rows-[1fr_3fr]",
// 				"h-fit w-fit",
// 				"max-w-md",
// 				"max-h-50",
// 				"h-45",
// 				"",
// 				""
// 			)}>
// 			<div
// 				className={cn(
// 					"row-start-2 row-span-1",
// 					"col-start-1 col-span-full",
// 					"h-35 w-full",
// 					"rounded-3xl",
// 					"overflow-hidden",
// 					"relative",
// 					"shadow-xl",
// 					"place-self-end",
// 					"h-35",
// 					"",
// 					""
// 				)}>
// 				{/* Blurred background: use the same cover as a background-image so the blur shows the cover itself */}
// 				<div
// 					aria-hidden
// 					style={{
// 						backgroundImage: `url(${
// 							image ? image : "/Blank-Book-Cover-PNG-Picture.png"
// 						})`,
// 					}}
// 					className={cn(
// 						"absolute inset-0",
// 						"bg-center bg-cover",
// 						"scale-105",
// 						"filter blur-2xl",
// 						"brightness-90",
// 						"-z-10",
// 						"",
// 						""
// 					)}
// 				/>
// 			</div>
// 			<div
// 				id="book-info-box"
// 				className={cn(
// 					"row-start-1 row-span-2",
// 					"col-start-1 col-span-2",
// 					"grid grid-cols-subgrid grid-rows-subgrid",
// 					"h-full w-fit",
// 					"p-4",
// 					"pt-0",
// 					"z-10",
// 					"gap-4",
// 					"justify-items-center",
// 					"w-40",
// 					"",
// 					""
// 				)}>
// 				<Image
// 					src={image ? image : "/Blank-Book-Cover-PNG-Picture.png"}
// 					alt={title}
// 					width={160}
// 					height={224}
// 					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
// 					id="book-cover"
// 					className={cn(
// 						"row-start-1 row-span-2",
// 						"col-start-1 col-span-1",
// 						"h-full w-full",
// 						"rounded-2xl",
// 						"m-0 p-0",
// 						"shadow-md",
// 						"border border-edge-dark",
// 						"object-cover",
// 						"",
// 						""
// 					)}
// 				/>

// 				<div
// 					id="info"
// 					className={cn(
// 						"row-start-2 row-span-1",
// 						"col-start-2 col-span-1",
// 						"h-full w-fit",
// 						"text-wrap",
// 						"py-5",
// 						"flex flex-col",
// 						"justify-center",
// 						"gap-2",
// 						"",
// 						""
// 					)}>
// 					<h3 className="text-xs sm:text-base font-semibold text-primary-inv dark:text-primary leading-snug line-clamp-3">
// 						{title}
// 					</h3>

// 					<p className="text-sm text-primary-inv/70 dark:text-primary/50 line-clamp-1">
// 						{subtitle}
// 					</p>
// 				</div>
// 			</div>
// 		</Link>
// 	);
// }
