import { Suspense } from "react";

function NotFoundContent() {
	// You can add custom 404 logic here if needed
	return <div>404 - Page Not Found</div>;
}

export default function NotFound() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<NotFoundContent />
		</Suspense>
	);
}
