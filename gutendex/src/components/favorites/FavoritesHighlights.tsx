"use client";
import { useCallback, useState } from "react";
import Highlights from "@/components/ui/highlights";
import { Book } from "@/types";
import { FaHeart } from "react-icons/fa6";

function getFavoritesFromStorage(): Book[] {
	if (typeof window === "undefined") return [];
	const raw = localStorage.getItem("favoriteBooks");
	if (!raw) return [];
	try {
		return JSON.parse(raw) as Book[];
	} catch {
		return [];
	}
}

export default function FavoritesHighlights() {
	const [favorites, setFavorites] = useState<Book[]>(() =>
		getFavoritesFromStorage().slice(0, 10)
	);
	const [favoriteIds, setFavoriteIds] = useState<number[]>(() =>
		getFavoritesFromStorage().map((b) => b.id)
	);

	const handleToggleFavorite = useCallback((book: Book) => {
		const raw = localStorage.getItem("favoriteBooks");
		const current: Book[] = raw ? JSON.parse(raw) : [];
		const exists = current.some((b) => b.id === book.id);

		let updated: Book[];
		if (exists) {
			updated = current.filter((b) => b.id !== book.id);
		} else {
			updated = [book, ...current];
		}

		localStorage.setItem("favoriteBooks", JSON.stringify(updated));
		setFavorites(updated.slice(0, 10));
		setFavoriteIds(updated.map((b) => b.id));
	}, []);

	return (
		<Highlights
			loading={false}
			data={favorites}
			title="Your Favorites"
			tagLabel={<FaHeart />}
			onToggleFavorite={handleToggleFavorite}
			favoriteIds={favoriteIds}
		/>
	);
}
