"use client";
import React, { useEffect } from "react";
import type { Book } from "@/types";
import { addLastRead } from "@/utils/lastRead";

export default function BookReadTracker({ book }: { book: Book }) {
	useEffect(() => {
		if (!book) addLastRead(book);
		if (!book) return;

		const handler = () => {
			try {
				addLastRead(book);
			} catch (e) {
				console.error(e);
			}
		};

		window.addEventListener("gutendex:download-click", handler);
		return () =>
			window.removeEventListener("gutendex:download-click", handler);
	}, [book]);

	return null;
}
