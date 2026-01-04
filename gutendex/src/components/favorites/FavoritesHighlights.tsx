"use client";
import { useCallback, useEffect, useState } from "react";
import Highlights from "@/components/ui/highlights";
import { Book } from "@/types";
import { FaHeart } from "react-icons/fa6";

export default function FavoritesHighlights() {
	const [favorites, setFavorites] = useState<Book[]>([]);
	const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const raw = localStorage.getItem("favoriteBooks");
		if (raw) {
			try {
				const parsed = JSON.parse(raw) as Book[];
				setFavorites(parsed.slice(0, 10));
				setFavoriteIds(parsed.map((b) => b.id));
			} catch {
				setFavorites([]);
				setFavoriteIds([]);
			}
		} else {
			setFavorites([]);
			setFavoriteIds([]);
		}
		setLoading(false);
	}, []);

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
			loading={loading}
			data={favorites}
			title="Your Favorites"
			tagLabel={<FaHeart />}
			onToggleFavorite={handleToggleFavorite}
			favoriteIds={favoriteIds}
		/>
	);
}
