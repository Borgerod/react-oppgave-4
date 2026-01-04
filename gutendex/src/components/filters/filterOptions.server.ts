"use cache";
import fs from "fs";
import path from "path";
import { cacheLife, cacheTag } from "next/cache";
export async function getTopicOptions() {
	// "use cache ";
	cacheLife("hours");
	cacheTag("topics");
	const filePath = path.join(process.cwd(), ".cache/topics.json");
	const file = await fs.promises.readFile(filePath, "utf-8");
	const data = JSON.parse(file);
	return data.topics
		.slice(0, 30)
		.map((obj: Record<string, number>) => Object.keys(obj)[0]);
}

export async function getFormatOptions() {
	// "use cache";
	cacheLife("hours");
	cacheTag("formats");
	const filePath = path.join(process.cwd(), ".cache/formats.json");
	const file = await fs.promises.readFile(filePath, "utf-8");
	const data = JSON.parse(file);
	return Object.keys(data.formats).slice(0, 20);
}

// export async function getLanguageOptions() {
// 	// "use cache";
// 	cacheLife("hours");
// 	cacheTag("langs");
// 	const filePath = path.join(process.cwd(), ".cache/langs.json");
// 	const file = await fs.promises.readFile(filePath, "utf-8");
// 	const data = JSON.parse(file);
// 	return data.langs
// 		.slice(0, 20)
// 		.map((obj: Record<string, number>) => Object.keys(obj)[0]);
// }

//* NEW
// export async function getLanguageOptions() {
// 	// "use cache";
// 	cacheLife("hours");
// 	cacheTag("langs");
// 	const filePath = path.join(process.cwd(), ".cache/langs.json");
// 	const file = await fs.promises.readFile(filePath, "utf-8");
// 	const data = JSON.parse(file);
// 	return data.langs.map((obj: Record<string, number>) => Object.keys(obj)[0]);
// }

export async function getLanguageOptions() {
	// "use cache";
	cacheLife("hours");
	cacheTag("langs");
	const filePath = path.join(process.cwd(), ".cache/langs.json");
	const file = await fs.promises.readFile(filePath, "utf-8");
	const data = JSON.parse(file);
	return data.langs.map(
		(obj: Record<string, { count: number; name: string }>) => {
			const key = Object.keys(obj)[0];
			const { count, name } = obj[key];
			return { key, count, name };
		}
	);
}
