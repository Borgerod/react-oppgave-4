export type Person = {
	name: string;
	birth_year: number | null;
	death_year: number | null;
};

export type Author = Person;

export type Book = {
	id: number;
	title: Title;
	authors: Author[];
	summaries: string[];
	editors: string[];
	translators: string[];
	subjects: string[];
	bookshelves: string[];
	languages: string[];
	copyright: boolean;
	media_type: string;
	formats: Record<string, string>;
	download_count: number;
};

export type BooksResponse = {
	count: number;
	next: string | null;
	previous: string | null;
	results: Book[];
};

export type Title = {
	main: string;
	sub?: string | undefined;
};
