import { Book } from "@/types";

type Entry = { id: number; at: number; book: Book };
const KEY = "lastReadBooks";
const MAX = 10;

export function addLastRead(book: Book) {
	try {
		const raw = localStorage.getItem(KEY);
		const list: Entry[] = raw ? JSON.parse(raw) : [];
		const filtered = list.filter((e) => e.id !== book.id);
		filtered.unshift({ id: book.id, at: Date.now(), book });
		localStorage.setItem(KEY, JSON.stringify(filtered.slice(0, MAX)));
	} catch (e) {
		console.error("addLastRead error", e);
	}
}

export function getLastRead(): Book[] {
	try {
		const raw = localStorage.getItem(KEY);
		const list: Entry[] = raw ? JSON.parse(raw) : [];
		return list.map((e) => e.book);
	} catch {
		return [];
	}
}

export function removeLastRead(bookId: number) {
	try {
		const raw = localStorage.getItem(KEY);
		const list: Entry[] = raw ? JSON.parse(raw) : [];
		const filtered = list.filter((e) => e.id !== bookId);
		localStorage.setItem(KEY, JSON.stringify(filtered));
	} catch (e) {
		console.error("removeLastRead error", e);
	}
}
