"use client";
import React, { useEffect } from "react";
import type { Book } from "@/types";
import { addLastRead } from "@/utils/lastRead";

export default function BookReadTracker({ book }: { book: Book }) {
	useEffect(() => {
		if (book) addLastRead(book);
	}, [book]);

	return null;
}
