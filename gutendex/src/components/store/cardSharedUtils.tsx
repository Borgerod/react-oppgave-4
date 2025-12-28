"use client";
import React from "react";
import type { Book, Title } from "@/types";
import { parseTitle } from "@/utils/title";

export function formatLinkVars(prop: string | Title) {
	const raw = typeof prop === "string" ? prop : prop?.main ?? "";
	return raw
		.trim()
		.toLowerCase()
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^\w\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
}

export function getImageSrc(formats?: Record<string, string> | undefined) {
	return formats?.["image/jpeg"] || formats?.["image/jpg"] || "";
}

export function getAuthorsText(book: Book) {
	const authorNames = (book.authors || [])
		.map((a) => a?.name)
		.filter((n): n is string => typeof n === "string" && n.length > 0);
	return authorNames.length === 0
		? "unknown"
		: authorNames.length === 1
		? authorNames[0]
		: `${authorNames.slice(0, -1).join("; ")} & ${
				authorNames[authorNames.length - 1]
		  }`;
}

export function getTitleParts(input: string | Title): Title {
	return parseTitle(input);
}

export function useFavorite(
	book: Book,
	isFavorite?: boolean,
	onToggleFavorite?: (book: Book) => void
) {
	const [localFav, setLocalFav] = React.useState<boolean>(
		Boolean(isFavorite)
	);

	React.useEffect(() => {
		if (typeof isFavorite === "boolean") {
			setLocalFav(isFavorite);
			return;
		}
		try {
			const raw = localStorage.getItem("favoriteBooks");
			if (raw) {
				const parsed = JSON.parse(raw) as Book[];
				setLocalFav(parsed.some((b) => b.id === book.id));
			} else {
				setLocalFav(false);
			}
		} catch {
			setLocalFav(false);
		}
	}, [book.id, isFavorite]);

	function toggle() {
		if (onToggleFavorite) {
			onToggleFavorite(book);
			return;
		}
		try {
			const raw = localStorage.getItem("favoriteBooks");
			const arr: Book[] = raw ? JSON.parse(raw) : [];
			const idx = arr.findIndex((b) => b.id === book.id);
			let updated: Book[];
			if (idx >= 0) {
				updated = arr.filter((b) => b.id !== book.id);
			} else {
				updated = [...arr, book];
			}
			localStorage.setItem("favoriteBooks", JSON.stringify(updated));
			setLocalFav(updated.some((b) => b.id === book.id));
		} catch {
			// ignore localStorage errors
		}
	}

	const ariaLabel = localFav ? "Remove favorite" : "Add favorite";
	return { localFav, toggle, ariaLabel } as const;
}
