export default function SearchQueryBuilder(input_: string) {
	/* 
        builds gutendex string based on query:
        example-query: "/books?search=dickens%20great"
        spaces = "%20"
    */
	// const query: string = "";
	// simple:
	// const query: string = input_.split("")[0].replace(/[-._]/g, " ");
	const query: string = input_.replace(/[ ]/g, "%20");
	console.log(query);
	return query;
}
