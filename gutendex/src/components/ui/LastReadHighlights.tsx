"use client";
import { useCallback, useEffect, useState } from "react";
import { Book } from "@/types";
import { getLastRead, removeLastRead } from "@/utils/lastRead";
import LastReadRow from "./lastReadRow";

export default function LastReadHighlights() {
	const [data, setData] = useState<Book[] | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		try {
			const lastRead = getLastRead();
			setData(lastRead);
		} catch (error) {
			console.error("Failed to load last read books:", error);
			setData([]);
		} finally {
			setLoading(false);
		}
	}, []);

	const handleRemove = useCallback((bookId: number) => {
		removeLastRead(bookId);
		setData((prev) => prev?.filter((b) => b.id !== bookId) ?? null);
	}, []);

	return (
		<LastReadRow
			loading={loading}
			data={data}
			title="Books you read last"
			tagLabel="continue"
			onRemove={handleRemove}
		/>
	);
}
