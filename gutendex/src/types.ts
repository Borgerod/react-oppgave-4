export type Author = {
	name: string;
	birth_year: number;
	death_year: number;
};

export type Book = {
	id: number;
	title: string;
	authors: Author[];
	summaries: object;
	editors: object;
	translators: object;
	subjects: string[];
	bookshelves: string[];
	languages: object;
	copyright: boolean;
	media_type: string;
	formats: object;
	download_count: number;
};
