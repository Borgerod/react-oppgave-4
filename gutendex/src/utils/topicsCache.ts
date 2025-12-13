import fs from "fs";
import { promises as fsp } from "fs";
import path from "path";

type CacheEntry = {
	topics: string[];
	updatedAt: number; // ms since epoch
	ttl: number; // seconds
};

const CACHE_DIR = path.join(process.cwd(), ".cache");
const CACHE_FILE = path.join(CACHE_DIR, "topics.json");

async function ensureCacheDir() {
	try {
		await fsp.mkdir(CACHE_DIR, { recursive: true });
	} catch (e) {
		// ignore
	}
}

export async function readTopicsCache(): Promise<CacheEntry | null> {
	try {
		if (!fs.existsSync(CACHE_FILE)) return null;
		const raw = await fsp.readFile(CACHE_FILE, "utf-8");
		const parsed = JSON.parse(raw) as CacheEntry;
		return parsed;
	} catch (e) {
		console.warn("readTopicsCache: failed to read cache", e);
		return null;
	}
}

export async function writeTopicsCache(
	topics: string[],
	ttlSeconds = 86400
): Promise<void> {
	try {
		await ensureCacheDir();
		const entry: CacheEntry = {
			topics,
			updatedAt: Date.now(),
			ttl: ttlSeconds,
		};
		await fsp.writeFile(CACHE_FILE, JSON.stringify(entry), "utf-8");
		console.log(
			`writeTopicsCache: wrote ${topics.length} topics to ${CACHE_FILE}`
		);
	} catch (e) {
		console.warn("writeTopicsCache: failed to write cache", e);
	}
}

export function isCacheValid(entry: CacheEntry | null): boolean {
	if (!entry) return false;
	try {
		const age = Date.now() - entry.updatedAt;
		return age < (entry.ttl || 0) * 1000;
	} catch (e) {
		return false;
	}
}

export default {
	readTopicsCache,
	writeTopicsCache,
	isCacheValid,
};
