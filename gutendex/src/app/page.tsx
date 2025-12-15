"use client";
import Link from "next/link";

export default function Home() {
	return (
		<main className="min-h-screen px-6 py-20  ">
			<div className="mx-auto flex max-w-3xl flex-col gap-8">
				<header>
					<p className="text-sm uppercase tracking-[0.3em] text-tertiary">
						Assignment
					</p>
					<h1 className="text-4xl font-semibold">
						React Oppgave 4
						<span className="text-xl text-secondary ml-2 font-thin">
							GutenDex
						</span>
					</h1>
					<h3 className="text-xl text-secondary">
						- Aleksander 102025
					</h3>
				</header>
				<div className="grid gap-4 sm:grid-cols-2">
					<Link href="/store" className="block shadow-md">
						<div className="rounded-lg border border-edge bg-container p-6 transition hover:border-edge-highlight">
							<p className="text-sm uppercase tracking-wide text-tertiary">
								Store Page
							</p>
							<p className="text-2xl font-semibold">
								GutenDex.com
							</p>
							<p className="mt-3 text-sm text-tertiary">
								Online eBook Library, displaying API usage.
							</p>
						</div>
					</Link>
				</div>
			</div>
		</main>
	);
}
