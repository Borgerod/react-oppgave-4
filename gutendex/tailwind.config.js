/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx,css}",
		"./app/**/*.{js,ts,jsx,tsx,css}",
		"./pages/**/*.{js,ts,jsx,tsx,css}",
	],
	theme: {
		extend: {
			borderRadius: {
				"3xl": "12px",
				xl: "8px",
			},
		},
	},
	plugins: [],
};
