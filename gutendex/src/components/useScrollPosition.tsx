import { useEffect, useState } from "react";

function getScrollPosition() {
	const height =
		document.documentElement.scrollHeight -
		document.documentElement.clientHeight;

	const windowScroll = document.documentElement.scrollTop;

	return (windowScroll / height) * 100;
}

export default function useScrollPosition() {
	const [scrollPosition, setScrollPosition] = useState(() =>
		getScrollPosition()
	);

	useEffect(() => {
		function handleScroll() {
			setScrollPosition(getScrollPosition());
		}

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return scrollPosition;
}
