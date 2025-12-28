module.exports = {
	ci: {
		collect: {
			url: [
				"http://localhost:3000/",
				// Add more URLs as needed
			],
			startServerCommand: "npm run start",
			startServerReadyPattern: "started server",
			numberOfRuns: 3,
		},
		assert: {
			assertions: {
				"categories:performance": ["error", { minScore: 0.9 }],
				"categories:accessibility": ["warn", { minScore: 0.9 }],
				"categories:best-practices": ["warn", { minScore: 0.9 }],
				"categories:seo": ["warn", { minScore: 0.9 }],
			},
		},
		upload: {
			target: "temporary-public-storage",
		},
	},
};
