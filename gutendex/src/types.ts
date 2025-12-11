export type Author = {
	name: string;
	birth_year: number;
	death_year: number;
};

export type Book = {
	id: number;
	title: string;
	authors: Author[];
	summaries: string[];
	editors: string[];
	translators: string[];
	subjects: string[];
	bookshelves: string[];
	languages: string[];
	copyright: boolean;
	media_type: string;
	// formats: string[];
	formats: Record<string, string>;
	// formats: object;
	download_count: number;
};

export type BooksResponse = {
	count: number;
	next: string | null;
	previous: string | null;
	results: Book[];
};
