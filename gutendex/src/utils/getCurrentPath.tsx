"use client";
import { usePathname } from "next/navigation";

export default function CurrentPath() {
	const pathname = usePathname();
	return <div>{pathname}</div>;
}
