import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "covers.openlibrary.org",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "www.gutenberg.org",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "upload.wikimedia.org",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "ferf1mheo22r9ira.public.blob.vercel-storage.com",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
