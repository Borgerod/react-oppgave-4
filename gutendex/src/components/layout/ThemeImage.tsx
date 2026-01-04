import { cn } from "@/utils/cn";
import Image from "next/image";

const logoClass: string[] = [
	"self-center",
	"object-contain",
	"align-middle",
	"h-auto",
	"w-auto",
	"px-2",
];

export default function Logo() {
	return (
		<>
			{/* > LONG LOGO */}
			{/* Light mode image */}
			<Image
				id={"logo-long-light"}
				alt={"logo-long-light"}
				src={"/gutendex_long_light.png"}
				width={200}
				height={20}
				className={cn(logoClass, "dark:hidden sm:block hidden")}
				fetchPriority="high"
			/>
			{/* Dark mode image */}
			<Image
				id={"logo-long-dark"}
				alt={"logo-long-dark"}
				src={"/gutendex_long_dark.png"}
				width={200}
				height={20}
				className={cn(logoClass, "sm:dark:block hidden")}
				fetchPriority="high"
			/>

			{/* > SHORT LOGO */}
			<Image
				id={"logo-short-light"}
				alt={"logo-short-light"}
				src={"/gutendex_short_light.png"}
				width={60}
				height={50}
				className={cn(logoClass, "sm:hidden dark:hidden block")}
				fetchPriority="high"
			/>
			{/* Dark mode image */}
			<Image
				id={"logo-short-dark"}
				alt={"logo-short-dark"}
				src={"/gutendex_short_dark.png"}
				width={60}
				height={50}
				className={cn(logoClass, "sm:dark:hidden dark:block hidden")}
				fetchPriority="high"
			/>
		</>
	);
}
