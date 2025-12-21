export async function getDominantColors(
	imageUrl: string
): Promise<[string, string]> {
	return new Promise((resolve) => {
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.src = imageUrl;

		img.onload = () => {
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				resolve(["#432A1F", "#8B5E4A"]); // Fallback colors
				return;
			}

			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);

			// Sample a few points from the image to get dominant colors
			const imageData = ctx.getImageData(
				0,
				0,
				canvas.width,
				canvas.height
			).data;
			const colors: { [key: string]: number } = {};

			// Sample every 100th pixel for performance
			for (let i = 0; i < imageData.length; i += 400) {
				const r = imageData[i];
				const g = imageData[i + 1];
				const b = imageData[i + 2];
				// Filter out too bright or too dark pixels for better gradients
				const brightness = (r * 299 + g * 587 + b * 114) / 1000;
				if (brightness > 30 && brightness < 220) {
					const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b)
						.toString(16)
						.slice(1)}`;
					colors[hex] = (colors[hex] || 0) + 1;
				}
			}

			const sortedColors = Object.entries(colors).sort(
				(a, b) => b[1] - a[1]
			);

			// Get the two most frequent "distinct" colors
			const color1 = sortedColors[0]?.[0] || "#432A1F";
			const color2 =
				sortedColors.find(([hex]) => hex !== color1)?.[0] || color1;

			resolve([color1, color2]);
		};

		img.onerror = () => {
			resolve(["#432A1F", "#8B5E4A"]); // Fallback colors
		};
	});
}
