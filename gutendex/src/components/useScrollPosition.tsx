import { useEffect, useState } from "react";

export default function useScrollPosition() {
	const [scrollPosition, setScrollPosition] = useState(0);

	function handleScroll() {
		const height =
			document.documentElement.scrollHeight -
			document.documentElement.clientHeight;

		const windowScroll = document.documentElement.scrollTop;

		const scrolled = (windowScroll / height) * 100;

		setScrollPosition(scrolled);
	}

	useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true });
		// set initial value
		handleScroll();
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// return { scrollPosition, setScrollPosition };
	return scrollPosition;
}
// function Component() {
// 	const scrollPosition = useScrollPosition();
// 	let counter;
// 	const [pageCount, setPageCount] = useState(1);

// 	useEffect(() => {
// 		if (scrollPosition > 80) {
// 			// something happens after it reaches 80% of the screen
// 			setPageCount((prevCount) => prevCount + 1);

// 			/*
//             Needs to inherit string to whatever the current search string is.
//             e.g. when im searching for children (/books?topic=children)
//             the next page needs to be .../books?topic=children&page=${i}
//             */

// 			// const formats = book.formats as Record<string, string> | undefined;
// 			// const imgSrc =
// 			// 	formats?.["image/jpeg"] || formats?.["image/jpg"] || "";
// 			// const trimmed = (book.authors[0].name ?? "").trim();
// 			// if (!trimmed) return;
// 			// const encoded = encodeURIComponent(trimmed);
// 			// const queryString = `?search=${encoded}`;
// 			// // const res = await fetch(`/api/books${queryString}`); //other works of this author
// 			// const res = await fetch(
// 			// 	`https://gutendex.com/books${queryString}`,
// 			// 	{
// 			// 		next: { revalidate: 3600 }, // Cache for 1 hour
// 			// 	}
// 			// ); //other works of this author
// 			// // const json = await res.json();
// 			// const data = await res.json();
// 		}
// 	}, [scrollPosition]);

// 	return <div>{scrollPosition}</div>;
// }
// // ...existing code...
//     useEffect(() => {
//         window.addEventListener("scroll", handleScroll, { passive: true });
//         handleScroll(); // set initial value
//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//         };
//     }, []); // <-- ensure it runs only on mount/unmount
// // ...existing code...
