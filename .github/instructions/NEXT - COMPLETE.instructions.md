---
applyTo: "**"
---

---

## applyTo: "\*\*"

# General

Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

-   all form of styling should only use tailwind
-   only use tailwind
-   css is illegal
-   style is illegal
-   all tailwind should be wrapped in cn()
-   all cn() should end with "",""
-   all className shoyld look like this className={cn("","")}
-   tailwind inside cn() should be split into smaller lines

-   solutions suggested must be recommended from NEXTjs, Tailwind or React.
-   the solutions must be up-to-date.

-   do not do anything other that what is instructed.
-   when makeing changes, make sure that it does not disrupt other components in the project.

-   whenever i ask a simple yes/no or this/that question i expect a one word answer. a small sentance at most.
-   the answer should be as simple as humanly possible.
-   If i need more elaboration i will ask for it, do not assume i want anything more than what i specifically ask for.

# Cache Components

@doc-version: 16.1.1
@last-updated: 2025-12-20

> **Good to know:** Cache Components is an opt-in feature. Enable it by setting the `cacheComponents` flag to `true` in your Next config file. See [Enabling Cache Components](#enabling-cache-components) for more details.

Cache Components lets you mix static, cached, and dynamic content in a single route, giving you the speed of static sites with the flexibility of dynamic rendering.

Server-rendered applications typically force a choice between static pages (fast but stale) and dynamic pages (fresh but slow). Moving this work to the client trades server load for larger bundles and slower initial rendering.

Cache Components eliminates these tradeoffs by prerendering routes into a **static HTML shell** that's immediately sent to the browser, with dynamic content updating the UI as it becomes ready.

![Partially re-rendered Product Page showing static nav and product information, and dynamic cart and recommended products](https://h8DxKfmAPhn8O0p3.public.blob.vercel-storage.com/learn/light/thinking-in-ppr.png)

## How rendering works with Cache Components

At build time, Next.js renders your route's component tree. As long as components don't access network resources, certain system APIs, or require an incoming request to render, their output is **automatically added to the static shell**. Otherwise, you must choose how to handle them:

-   Defer rendering to request time by wrapping components in React's [`<Suspense>`](https://react.dev/reference/react/Suspense), [showing fallback UI](#defer-rendering-to-request-time) until the content is ready, or
-   Cache the result using the [`use cache`](/docs/app/api-reference/directives/use-cache.md) directive to [include it in the static shell](#using-use-cache) (if no request data is needed)

Because this happens ahead of time, before a request arrives, we refer to it as prerendering. This generates a static shell consisting of HTML for initial page loads and a serialized [RSC Payload](/docs/app/getting-started/server-and-client-components.md#on-the-server) for client-side navigation, ensuring the browser receives fully rendered content instantly whether users navigate directly to the URL or transition from another page.

Next.js requires you to explicitly handle components that can't complete during prerendering. If they aren't wrapped in `<Suspense>` or marked with `use cache`, you'll see an [`Uncached data was accessed outside of <Suspense>`](https://nextjs.org/docs/messages/blocking-route) error during development and build time.

> **Good to know**: Caching can be applied at the component or function level, while fallback UI can be defined around any subtree, which means you can compose static, cached, and dynamic content within a single route.

![Diagram showing partially rendered page on the client, with loading UI for chunks that are being streamed.](https://h8DxKfmAPhn8O0p3.public.blob.vercel-storage.com/docs/light/server-rendering-with-streaming.png)

This rendering approach is called **Partial Prerendering**, and it's the default behavior with Cache Components. For the rest of this document, we simply refer to it as "prerendering" which can produce a partial or complete output.

> **🎥 Watch:** Why Partial Prerendering and how it works → [YouTube (10 minutes)](https://www.youtube.com/watch?v=MTcPrTIBkpA).

## Automatically prerendered content

Operations like synchronous I/O, module imports, and pure computations can complete during prerendering. Components using only these operations have their rendered output included in the static HTML shell.

Because all operations in the `Page` component below complete during rendering, its rendered output is automatically included in the static shell. When both the layout and page prerender successfully, the entire route is the static shell.

```tsx filename="page.tsx"
import fs from "node:fs";

export default async function Page() {
	// Synchronous file system read
	const content = fs.readFileSync("./config.json", "utf-8");

	// Module imports
	const constants = await import("./constants.json");

	// Pure computations
	const processed = JSON.parse(content).items.map((item) => item.value * 2);

	return (
		<div>
			<h1>{constants.appName}</h1>
			<ul>
				{processed.map((value, i) => (
					<li key={i}>{value}</li>
				))}
			</ul>
		</div>
	);
}
```

> **Good to know**: You can verify that a route was fully prerendered by checking the build output summary. Alternatively, see what content was added to the static shell of any page by viewing the page source in your browser.

## Defer rendering to request time

During prerendering, when Next.js encounters work it can't complete (like network requests, accessing request data, or async operations), it requires you to explicitly handle it. To defer rendering to request time, a parent component must provide fallback UI using a Suspense boundary. The fallback becomes part of the static shell while the actual content resolves at request time.

Place Suspense boundaries as close as possible to the components that need them. This maximizes the amount of content in the static shell, since everything outside the boundary can still prerender normally.

> **Good to know**: With Suspense boundaries, multiple dynamic sections can render in parallel rather than blocking each other, reducing total load time.

### Dynamic content

External systems provide content asynchronously, which often takes an unpredictable time to resolve and may even fail. This is why prerendering doesn't execute them automatically.

In general, when you need the latest data from the source on each request (like real-time feeds or personalized content), defer rendering by providing fallback UI with a Suspense boundary.

For example, the `DynamicContent` component below uses multiple operations that are not automatically prerendered.

```tsx filename="page.tsx"
import { Suspense } from "react";
import fs from "node:fs/promises";

async function DynamicContent() {
	// Network request
	const data = await fetch("https://api.example.com/data");

	// Database query
	const users = await db.query("SELECT * FROM users");

	// Async file system operation
	const file = await fs.readFile("..", "utf-8");

	// Simulating external system delay
	await new Promise((resolve) => setTimeout(resolve, 100));

	return <div>Not in the static shell</div>;
}
```

To use `DynamicContent` within a page, wrap it in `<Suspense>` to define fallback UI:

```tsx filename="page.tsx"
export default async function Page(props) {
	return (
		<>
			<h1>Part of the static shell</h1>
			{/* <p>Loading..</p> is part of the static shell */}
			<Suspense fallback={<p>Loading..</p>}>
				<DynamicContent />
				<div>Sibling excluded from static shell</div>
			</Suspense>
		</>
	);
}
```

Prerendering stops at the `fetch` request. The request itself is not started, and any code after it is not executed.

The fallback (`<p>Loading...</p>`) is included in the static shell, while the component's content streams at request time.

In this example, since all operations (network request, database query, file read, and timeout) run sequentially within the same component, the content won't appear until they all complete.

> **Good to know**: For dynamic content that doesn't change frequently, you can use `use cache` to include the dynamic data in the static shell instead of streaming it. See the [during prerendering](#during-prerendering) section for an example.

### Runtime data

A specific type of dynamic data that requires request context, only available when a user makes a request.

-   [`cookies()`](/docs/app/api-reference/functions/cookies.md) - User's cookie data
-   [`headers()`](/docs/app/api-reference/functions/headers.md) - Request headers
-   [`searchParams`](/docs/app/api-reference/file-conventions/page.md#searchparams-optional) - URL query parameters
-   [`params`](/docs/app/api-reference/file-conventions/page.md#params-optional) - Dynamic route parameters (unless at least one sample is provided via [`generateStaticParams`](/docs/app/api-reference/functions/generate-static-params.md)). See [Dynamic Routes with Cache Components](/docs/app/api-reference/file-conventions/dynamic-routes.md#with-cache-components) for detailed patterns.

```tsx filename="page.tsx"
import { cookies, headers } from "next/headers";
import { Suspense } from "react";

async function RuntimeData({ searchParams }) {
	// Accessing request data
	const cookieStore = await cookies();
	const headerStore = await headers();
	const search = await searchParams;

	return <div>Not in the static shell</div>;
}
```

To use the `RuntimeData` component, wrap it in a `<Suspense>` boundary:

```tsx filename="page.tsx"
export default async function Page(props) {
	return (
		<>
			<h1>Part of the static shell</h1>
			{/* <p>Loading..</p> is part of the static shell */}
			<Suspense fallback={<p>Loading..</p>}>
				<RuntimeData searchParams={props.searchParams} />
				<div>Sibling excluded from static shell</div>
			</Suspense>
		</>
	);
}
```

Use [`connection()`](/docs/app/api-reference/functions/connection.md) if you need to defer to request time without accessing any of the runtime APIs above.

> **Good to know**: Runtime data cannot be cached with `use cache` because it requires request context. Components that access runtime APIs must always be wrapped in `<Suspense>`. However, you can extract values from runtime data and pass them as arguments to cached functions. See the [with runtime data](#with-runtime-data) section for an example.

### Non-deterministic operations

Operations like `Math.random()`, `Date.now()`, or `crypto.randomUUID()` produce different values each time they execute. To ensure these run at request time (generating unique values per request), Cache Components requires you to explicitly signal this intent by calling these operations after dynamic or runtime data access.

```tsx
import { connection } from "next/server";
import { Suspense } from "react";

async function UniqueContent() {
	// Explicitly defer to request time
	await connection();

	// Non-deterministic operations
	const random = Math.random();
	const now = Date.now();
	const date = new Date();
	const uuid = crypto.randomUUID();
	const bytes = crypto.getRandomValues(new Uint8Array(16));

	return (
		<div>
			<p>{random}</p>
			<p>{now}</p>
			<p>{date.getTime()}</p>
			<p>{uuid}</p>
			<p>{bytes}</p>
		</div>
	);
}
```

Because the `UniqueContent` component defers to request time, to use it within a route, it must be wrapped in `<Suspense>`:

```tsx filename="page.tsx"
export default async function Page() {
	return (
		// <p>Loading..</p> is part of the static shell
		<Suspense fallback={<p>Loading..</p>}>
			<UniqueContent />
		</Suspense>
	);
}
```

Every incoming request would see different random numbers, date, etc.

> **Good to know**: You can cache non-deterministic operations with `use cache`. See the [with non-deterministic operations](#with-non-deterministic-operations) section for examples.

## Using `use cache`

The [`use cache`](/docs/app/api-reference/directives/use-cache.md) directive caches the return value of async functions and components. You can apply it at the function, component, or file level.

Arguments and any closed-over values from parent scopes automatically become part of the [cache key](/docs/app/api-reference/directives/use-cache.md#cache-keys), which means different inputs produce separate cache entries. This enables personalized or parameterized cached content.

When [dynamic content](#dynamic-content) doesn't need to be fetched fresh from the source on every request, caching it lets you include the content in the static shell during prerendering, or reuse the result at runtime across multiple requests.

Cached content can be revalidated in two ways: automatically based on the cache lifetime, or on-demand using tags with [`revalidateTag`](/docs/app/api-reference/functions/revalidateTag.md) or [`updateTag`](/docs/app/api-reference/functions/updateTag.md).

> **Good to know**: See [serialization requirements and constraints](/docs/app/api-reference/directives/use-cache.md#constraints) for details on what can be cached and how arguments work.

### During prerendering

While [dynamic content](#dynamic-content) is fetched from external sources, it's often unlikely to change between accesses. Product catalog data updates with inventory changes, blog post content rarely changes after publishing, and analytics reports for past dates remain static.

If this data doesn't depend on [runtime data](#runtime-data), you can use the `use cache` directive to include it in the static HTML shell. Use [`cacheLife`](/docs/app/api-reference/functions/cacheLife.md) to define how long to use the cached data.

When revalidation occurs, the static shell is updated with fresh content. See [Tagging and revalidating](#tagging-and-revalidating) for details on on-demand revalidation.

```tsx filename="app/page.tsx" highlight={1,4,5}
import { cacheLife } from "next/cache";

export default async function Page() {
	"use cache";
	cacheLife("hours");

	const users = await db.query("SELECT * FROM users");

	return (
		<ul>
			{users.map((user) => (
				<li key={user.id}>{user.name}</li>
			))}
		</ul>
	);
}
```

The `cacheLife` function accepts a cache profile name (like `'hours'`, `'days'`, or `'weeks'`) or a custom configuration object to control cache behavior:

```tsx filename="app/page.tsx" highlight={1,4-8}
import { cacheLife } from "next/cache";

export default async function Page() {
	"use cache";
	cacheLife({
		stale: 3600, // 1 hour until considered stale
		revalidate: 7200, // 2 hours until revalidated
		expire: 86400, // 1 day until expired
	});

	const users = await db.query("SELECT * FROM users");

	return (
		<ul>
			{users.map((user) => (
				<li key={user.id}>{user.name}</li>
			))}
		</ul>
	);
}
```

See the [`cacheLife` API reference](/docs/app/api-reference/functions/cacheLife.md) for available profiles and custom configuration options.

### With runtime data

Runtime data and [`use cache`](/docs/app/api-reference/directives/use-cache.md) cannot be used in the same scope. However, you can extract values from runtime APIs and pass them as arguments to cached functions.

```tsx filename="app/profile/page.tsx"
import { cookies } from "next/headers";
import { Suspense } from "react";

export default function Page() {
	// Page itself creates the dynamic boundary
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ProfileContent />
		</Suspense>
	);
}

// Component (not cached) reads runtime data
async function ProfileContent() {
	const session = (await cookies()).get("session")?.value;

	return <CachedContent sessionId={session} />;
}

// Cached component/function receives data as props
async function CachedContent({ sessionId }: { sessionId: string }) {
	"use cache";
	// sessionId becomes part of cache key
	const data = await fetchUserData(sessionId);
	return <div>{data}</div>;
}
```

At request time, `CachedContent` executes if no matching cache entry is found, and stores the result for future requests.

### With non-deterministic operations

Within a `use cache` scope, non-deterministic operations execute during prerendering. This is useful when you want the same rendered output served to all users:

```tsx
export default async function Page() {
	"use cache";

	// Execute once, then cached for all requests
	const random = Math.random();
	const random2 = Math.random();
	const now = Date.now();
	const date = new Date();
	const uuid = crypto.randomUUID();
	const bytes = crypto.getRandomValues(new Uint8Array(16));

	return (
		<div>
			<p>
				{random} and {random2}
			</p>
			<p>{now}</p>
			<p>{date.getTime()}</p>
			<p>{uuid}</p>
			<p>{bytes}</p>
		</div>
	);
}
```

All requests will be served a route containing the same random numbers, timestamp, and UUID until the cache is revalidated.

### Tagging and revalidating

Tag cached data with [`cacheTag`](/docs/app/api-reference/functions/cacheTag.md) and revalidate it after mutations using [`updateTag`](/docs/app/api-reference/functions/updateTag.md) in Server Actions for immediate updates, or [`revalidateTag`](/docs/app/api-reference/functions/revalidateTag.md) when delays in updates are acceptable.

#### With `updateTag`

Use `updateTag` when you need to expire and immediately refresh cached data within the same request:

```tsx filename="app/actions.ts" highlight={1,4,5,13}
import { cacheTag, updateTag } from "next/cache";

export async function getCart() {
	"use cache";
	cacheTag("cart");
	// fetch data
}

export async function updateCart(itemId: string) {
	"use server";
	// write data using the itemId
	// update the user cart
	updateTag("cart");
}
```

#### With `revalidateTag`

Use `revalidateTag` when you want to invalidate only properly tagged cached entries with stale-while-revalidate behavior. This is ideal for static content that can tolerate eventual consistency.

```tsx filename="app/actions.ts" highlight={1,4,5,12}
import { cacheTag, revalidateTag } from "next/cache";

export async function getPosts() {
	"use cache";
	cacheTag("posts");
	// fetch data
}

export async function createPost(post: FormData) {
	"use server";
	// write data using the FormData
	revalidateTag("posts", "max");
}
```

For more detailed explanation and usage examples, see the [`use cache` API reference](/docs/app/api-reference/directives/use-cache.md).

### What should I cache?

What you cache should be a function of what you want your UI loading states to be. If data doesn't depend on runtime data and you're okay with a cached value being served for multiple requests over a period of time, use `use cache` with `cacheLife` to describe that behavior.

For content management systems with update mechanisms, consider using tags with longer cache durations and rely on `revalidateTag` to mark static initial UI as ready for revalidation. This pattern allows you to serve fast, cached responses while still updating content when it actually changes, rather than expiring the cache preemptively.

## Putting it all together

Here's a complete example showing static content, cached dynamic content, and streaming dynamic content working together on a single page:

```tsx filename="app/blog/page.tsx"
import { Suspense } from "react";
import { cookies } from "next/headers";
import { cacheLife } from "next/cache";
import Link from "next/link";

export default function BlogPage() {
	return (
		<>
			{/* Static content - prerendered automatically */}
			<header>
				<h1>Our Blog</h1>
				<nav>
					<Link href="/">Home</Link> |{" "}
					<Link href="/about">About</Link>
				</nav>
			</header>

			{/* Cached dynamic content - included in the static shell */}
			<BlogPosts />

			{/* Runtime dynamic content - streams at request time */}
			<Suspense fallback={<p>Loading your preferences...</p>}>
				<UserPreferences />
			</Suspense>
		</>
	);
}

// Everyone sees the same blog posts (revalidated every hour)
async function BlogPosts() {
	"use cache";
	cacheLife("hours");

	const res = await fetch("https://api.vercel.app/blog");
	const posts = await res.json();

	return (
		<section>
			<h2>Latest Posts</h2>
			<ul>
				{posts.slice(0, 5).map((post: any) => (
					<li key={post.id}>
						<h3>{post.title}</h3>
						<p>
							By {post.author} on {post.date}
						</p>
					</li>
				))}
			</ul>
		</section>
	);
}

// Personalized per user based on their cookie
async function UserPreferences() {
	const theme = (await cookies()).get("theme")?.value || "light";
	const favoriteCategory = (await cookies()).get("category")?.value;

	return (
		<aside>
			<p>Your theme: {theme}</p>
			{favoriteCategory && <p>Favorite category: {favoriteCategory}</p>}
		</aside>
	);
}
```

During prerendering the header (static) and the blog posts fetched from the API (cached with `use cache`), both become part of the static shell along with the fallback UI for user preferences.

When a user visits the page, they instantly see this prerendered shell with the header and blog posts. Only the personalized preferences need to stream in at request time since they depend on the user's cookies. This ensures fast initial page loads while still providing personalized content.

## Metadata and Viewport

`generateMetadata` and `generateViewport` are part of rendering your page or layout. During prerendering, their access to runtime data or uncached dynamic data is tracked separately from the rest of the page.

If a page or layout is prerenderable but only metadata or viewport accesses uncached dynamic data or runtime data, Next.js requires an explicit choice: cache the data if possible, or signal that deferred rendering is intentional. See [Metadata with Cache Components](/docs/app/api-reference/functions/generate-metadata.md#with-cache-components) and [Viewport with Cache Components](/docs/app/api-reference/functions/generate-viewport.md#with-cache-components) for how to handle this.

## Enabling Cache Components

You can enable Cache Components (which includes PPR) by adding the [`cacheComponents`](/docs/app/api-reference/config/next-config-js/cacheComponents.md) option to your Next config file:

```ts filename="next.config.ts" highlight={4} switcher
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheComponents: true,
};

export default nextConfig;
```

```js filename="next.config.js" highlight={3} switcher
/** @type {import('next').NextConfig} */
const nextConfig = {
	cacheComponents: true,
};

module.exports = nextConfig;
```

> **Good to know:** When Cache Components is enabled, `GET` Route Handlers follow the same prerendering model as pages. See [Route Handlers with Cache Components](/docs/app/getting-started/route-handlers.md#with-cache-components) for details.

## Navigation uses Activity

When the [`cacheComponents`](/docs/app/api-reference/config/next-config-js/cacheComponents.md) flag is enabled, Next.js uses React's [`<Activity>`](https://react.dev/reference/react/Activity) component to preserve component state during client-side navigation.

Rather than unmounting the previous route when you navigate away, Next.js sets the Activity mode to [`"hidden"`](https://react.dev/reference/react/Activity#activity). This means:

-   Component state is preserved when navigating between routes
-   When you navigate back, the previous route reappears with its state intact
-   Effects are cleaned up when a route is hidden, and recreated when it becomes visible again

This behavior improves the navigation experience by maintaining UI state (form inputs, or expanded sections) when users navigate back and forth between routes.

> **Good to know**: Next.js uses heuristics to keep a few recently visited routes `"hidden"`, while older routes are removed from the DOM to prevent excessive growth.

## Migrating route segment configs

When Cache Components is enabled, several route segment config options are no longer needed or supported:

### `dynamic = "force-dynamic"`

**Not needed.** All pages are dynamic by default.

```tsx filename="app/page.tsx"
// Before - No longer needed
export const dynamic = "force-dynamic";

export default function Page() {
	return <div>...</div>;
}
```

```tsx filename="app/page.tsx"
// After - Just remove it
export default function Page() {
	return <div>...</div>;
}
```

### `dynamic = "force-static"`

Start by removing it. When unhandled dynamic or runtime data access is detected during development and build time, Next.js raises an error. Otherwise, the [prerendering](#automatically-prerendered-content) step automatically extracts the static HTML shell.

For dynamic data access, add [`use cache`](#using-use-cache) as close to the data access as possible with a long [`cacheLife`](/docs/app/api-reference/functions/cacheLife.md) like `'max'` to maintain cached behavior. If needed, add it at the top of the page or layout.

For runtime data access (`cookies()`, `headers()`, etc.), errors will direct you to [wrap it with `Suspense`](#runtime-data). Since you started by using `force-static`, you must remove the runtime data access to prevent any request time work.

```tsx filename="app/page.tsx"
// Before
export const dynamic = "force-static";

export default async function Page() {
	const data = await fetch("https://api.example.com/data");
	return <div>...</div>;
}
```

```tsx filename="app/page.tsx"
import { cacheLife } from "next/cache";

// After - Use 'use cache' instead
export default async function Page() {
	"use cache";
	cacheLife("max");
	const data = await fetch("https://api.example.com/data");
	return <div>...</div>;
}
```

### `revalidate`

**Replace with `cacheLife`.** Use the `cacheLife` function to define cache duration instead of the route segment config.

```tsx
// Before
export const revalidate = 3600; // 1 hour

export default async function Page() {
	return <div>...</div>;
}
```

```tsx filename="app/page.tsx"
// After - Use cacheLife
import { cacheLife } from "next/cache";

export default async function Page() {
	"use cache";
	cacheLife("hours");
	return <div>...</div>;
}
```

### `fetchCache`

**Not needed.** With `use cache`, all data fetching within a cached scope is automatically cached, making `fetchCache` unnecessary.

```tsx filename="app/page.tsx"
// Before
export const fetchCache = "force-cache";
```

```tsx filename="app/page.tsx"
// After - Use 'use cache' to control caching behavior
export default async function Page() {
	"use cache";
	// All fetches here are cached
	return <div>...</div>;
}
```

### `runtime = 'edge'`

**Not supported.** Cache Components requires Node.js runtime and will throw errors with [Edge Runtime](/docs/app/api-reference/edge.md).

## Next Steps

Learn more about the config option for Cache Components.

-   [cacheComponents](/docs/app/api-reference/config/next-config-js/cacheComponents.md)
    -   Learn how to enable the cacheComponents flag in Next.js.
-   [use cache](/docs/app/api-reference/directives/use-cache.md)
    -   Learn how to use the "use cache" directive to cache data in your Next.js application.
-   [cacheLife](/docs/app/api-reference/functions/cacheLife.md)
    -   Learn how to use the cacheLife function to set the cache expiration time for a cached function or component.
-   [cacheTag](/docs/app/api-reference/functions/cacheTag.md)
    -   Learn how to use the cacheTag function to manage cache invalidation in your Next.js application.
-   [revalidateTag](/docs/app/api-reference/functions/revalidateTag.md)
    -   API Reference for the revalidateTag function.
-   [updateTag](/docs/app/api-reference/functions/updateTag.md)
    -   API Reference for the updateTag function.

# Caching and Revalidating

@doc-version: 16.1.1
@last-updated: 2025-11-05

Caching is a technique for storing the result of data fetching and other computations so that future requests for the same data can be served faster, without doing the work again. While revalidation allows you to update cache entries without having to rebuild your entire application.

Next.js provides a few APIs to handle caching and revalidation. This guide will walk you through when and how to use them.

-   [`fetch`](#fetch)
-   [`cacheTag`](#cachetag)
-   [`revalidateTag`](#revalidatetag)
-   [`updateTag`](#updatetag)
-   [`revalidatePath`](#revalidatepath)
-   [`unstable_cache`](#unstable_cache) (Legacy)

## `fetch`

By default, [`fetch`](/docs/app/api-reference/functions/fetch.md) requests are not cached. You can cache individual requests by setting the `cache` option to `'force-cache'`.

```tsx filename="app/page.tsx" switcher
export default async function Page() {
	const data = await fetch("https://...", { cache: "force-cache" });
}
```

```jsx filename="app/page.jsx" switcher
export default async function Page() {
	const data = await fetch("https://...", { cache: "force-cache" });
}
```

> **Good to know**: Although `fetch` requests are not cached by default, Next.js will [pre-render](/docs/app/guides/caching.md#static-rendering) routes that have `fetch` requests and cache the HTML. If you want to guarantee a route is [dynamic](/docs/app/guides/caching.md#dynamic-rendering), use the [`connection` API](/docs/app/api-reference/functions/connection.md).

To revalidate the data returned by a `fetch` request, you can use the `next.revalidate` option.

```tsx filename="app/page.tsx" switcher
export default async function Page() {
	const data = await fetch("https://...", { next: { revalidate: 3600 } });
}
```

```jsx filename="app/page.jsx" switcher
export default async function Page() {
	const data = await fetch("https://...", { next: { revalidate: 3600 } });
}
```

This will revalidate the data after a specified amount of seconds.

You can also tag `fetch` requests to enable on-demand cache invalidation:

```tsx filename="app/lib/data.ts" switcher
export async function getUserById(id: string) {
	const data = await fetch(`https://...`, {
		next: {
			tags: ["user"],
		},
	});
}
```

```jsx filename="app/lib/data.js" switcher
export async function getUserById(id) {
	const data = await fetch(`https://...`, {
		next: {
			tags: ["user"],
		},
	});
}
```

See the [`fetch` API reference](/docs/app/api-reference/functions/fetch.md) to learn more.

## `cacheTag`

[`cacheTag`](/docs/app/api-reference/functions/cacheTag.md) allows you to tag cached data in [Cache Components](/docs/app/getting-started/cache-components.md) so it can be revalidated on-demand. Previously, cache tagging was limited to `fetch` requests, and caching other work required the experimental `unstable_cache` API.

With Cache Components, you can use the [`use cache`](/docs/app/api-reference/directives/use-cache.md) directive to cache any computation, and `cacheTag` to tag it. This works with database queries, file system operations, and other server-side work.

```tsx filename="app/lib/data.ts" switcher
import { cacheTag } from "next/cache";

export async function getProducts() {
	"use cache";
	cacheTag("products");

	const products = await db.query("SELECT * FROM products");
	return products;
}
```

```jsx filename="app/lib/data.js" switcher
import { cacheTag } from "next/cache";

export async function getProducts() {
	"use cache";
	cacheTag("products");

	const products = await db.query("SELECT * FROM products");
	return products;
}
```

Once tagged, you can use [`revalidateTag`](#revalidatetag) or [`updateTag`](#updatetag) to invalidate the cache entry for products.

> **Good to know**: `cacheTag` is used with [Cache Components](/docs/app/getting-started/cache-components.md) and the [`use cache`](/docs/app/api-reference/directives/use-cache.md) directive. It expands the caching and revalidation story beyond `fetch`.

See the [`cacheTag` API reference](/docs/app/api-reference/functions/cacheTag.md) to learn more.

## `revalidateTag`

`revalidateTag` is used to revalidate cache entries based on a tag and following an event. The function now supports two behaviors:

-   **With `profile="max"`**: Uses stale-while-revalidate semantics, serving stale content while fetching fresh content in the background
-   **Without the second argument**: Legacy behavior that immediately expires the cache (deprecated)

After tagging your cached data, using [`fetch`](#fetch) with `next.tags`, or the [`cacheTag`](#cachetag) function, you may call `revalidateTag` in a [Route Handler](/docs/app/api-reference/file-conventions/route.md) or Server Action:

```tsx filename="app/lib/actions.ts" highlight={1,5} switcher
import { revalidateTag } from "next/cache";

export async function updateUser(id: string) {
	// Mutate data
	revalidateTag("user", "max"); // Recommended: Uses stale-while-revalidate
}
```

```jsx filename="app/lib/actions.js" highlight={1,5} switcher
import { revalidateTag } from "next/cache";

export async function updateUser(id) {
	// Mutate data
	revalidateTag("user", "max"); // Recommended: Uses stale-while-revalidate
}
```

You can reuse the same tag in multiple functions to revalidate them all at once.

See the [`revalidateTag` API reference](/docs/app/api-reference/functions/revalidateTag.md) to learn more.

## `updateTag`

`updateTag` is specifically designed for Server Actions to immediately expire cached data for read-your-own-writes scenarios. Unlike `revalidateTag`, it can only be used within Server Actions and immediately expires the cache entry.

```tsx filename="app/lib/actions.ts" highlight={1,6} switcher
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
	// Create post in database
	const post = await db.post.create({
		data: {
			title: formData.get("title"),
			content: formData.get("content"),
		},
	});

	// Immediately expire cache so the new post is visible
	updateTag("posts");
	updateTag(`post-${post.id}`);

	redirect(`/posts/${post.id}`);
}
```

```jsx filename="app/lib/actions.js" highlight={1,6} switcher
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData) {
	// Create post in database
	const post = await db.post.create({
		data: {
			title: formData.get("title"),
			content: formData.get("content"),
		},
	});

	// Immediately expire cache so the new post is visible
	updateTag("posts");
	updateTag(`post-${post.id}`);

	redirect(`/posts/${post.id}`);
}
```

The key differences between `revalidateTag` and `updateTag`:

-   **`updateTag`**: Only in Server Actions, immediately expires cache, for read-your-own-writes
-   **`revalidateTag`**: In Server Actions and Route Handlers, supports stale-while-revalidate with `profile="max"`

See the [`updateTag` API reference](/docs/app/api-reference/functions/updateTag.md) to learn more.

## `revalidatePath`

`revalidatePath` is used to revalidate a route and following an event. To use it, call it in a [Route Handler](/docs/app/api-reference/file-conventions/route.md) or Server Action:

```tsx filename="app/lib/actions.ts" highlight={1} switcher
import { revalidatePath } from 'next/cache'

export async function updateUser(id: string) {
  // Mutate data
  revalidatePath('/profile')
```

```jsx filename="app/lib/actions.js" highlight={1} switcher
import { revalidatePath } from 'next/cache'

export async function updateUser(id) {
  // Mutate data
  revalidatePath('/profile')
```

See the [`revalidatePath` API reference](/docs/app/api-reference/functions/revalidatePath.md) to learn more.

## `unstable_cache`

> **Good to know**: `unstable_cache` is an experimental API. We recommend opting into [Cache Components](/docs/app/getting-started/cache-components.md) and replacing `unstable_cache` with the [`use cache`](/docs/app/api-reference/directives/use-cache.md) directive. See the [Cache Components documentation](/docs/app/getting-started/cache-components.md) for more details.

`unstable_cache` allows you to cache the result of database queries and other async functions. To use it, wrap `unstable_cache` around the function. For example:

```ts filename="app/lib/data.ts" switcher
import { db } from "@/lib/db";
export async function getUserById(id: string) {
	return db
		.select()
		.from(users)
		.where(eq(users.id, id))
		.then((res) => res[0]);
}
```

```jsx filename="app/lib/data.js" switcher
import { db } from "@/lib/db";

export async function getUserById(id) {
	return db
		.select()
		.from(users)
		.where(eq(users.id, id))
		.then((res) => res[0]);
}
```

```tsx filename="app/page.tsx" highlight={2,11,13} switcher
import { unstable_cache } from "next/cache";
import { getUserById } from "@/app/lib/data";

export default async function Page({
	params,
}: {
	params: Promise<{ userId: string }>;
}) {
	const { userId } = await params;

	const getCachedUser = unstable_cache(
		async () => {
			return getUserById(userId);
		},
		[userId] // add the user ID to the cache key
	);
}
```

```jsx filename="app/page.js" highlight={2,7,9} switcher
import { unstable_cache } from "next/cache";
import { getUserById } from "@/app/lib/data";

export default async function Page({ params }) {
	const { userId } = await params;

	const getCachedUser = unstable_cache(
		async () => {
			return getUserById(userId);
		},
		[userId] // add the user ID to the cache key
	);
}
```

The function accepts a third optional object to define how the cache should be revalidated. It accepts:

-   `tags`: an array of tags used by Next.js to revalidate the cache.
-   `revalidate`: the number of seconds after cache should be revalidated.

```tsx filename="app/page.tsx" highlight={6-9} switcher
const getCachedUser = unstable_cache(
	async () => {
		return getUserById(userId);
	},
	[userId],
	{
		tags: ["user"],
		revalidate: 3600,
	}
);
```

```jsx filename="app/page.js" highlight={6-9} switcher
const getCachedUser = unstable_cache(
	async () => {
		return getUserById(userId);
	},
	[userId],
	{
		tags: ["user"],
		revalidate: 3600,
	}
);
```

See the [`unstable_cache` API reference](/docs/app/api-reference/functions/unstable_cache.md) to learn more.

## API Reference

Learn more about the features mentioned in this page by reading the API Reference.

-   [fetch](/docs/app/api-reference/functions/fetch.md)
    -   API reference for the extended fetch function.
-   [cacheTag](/docs/app/api-reference/functions/cacheTag.md)
    -   Learn how to use the cacheTag function to manage cache invalidation in your Next.js application.
-   [revalidateTag](/docs/app/api-reference/functions/revalidateTag.md)
    -   API Reference for the revalidateTag function.
-   [updateTag](/docs/app/api-reference/functions/updateTag.md)
    -   API Reference for the updateTag function.
-   [revalidatePath](/docs/app/api-reference/functions/revalidatePath.md)
    -   API Reference for the revalidatePath function.
-   [unstable_cache](/docs/app/api-reference/functions/unstable_cache.md)
    -   API Reference for the unstable_cache function.

# Fetching Data

@doc-version: 16.1.1
@last-updated: 2025-12-03

This page will walk you through how you can fetch data in [Server and Client Components](/docs/app/getting-started/server-and-client-components.md), and how to [stream](#streaming) components that depend on data.

## Fetching data

### Server Components

You can fetch data in Server Components using any asynchronous I/O, such as:

1. The [`fetch` API](#with-the-fetch-api)
2. An [ORM or database](#with-an-orm-or-database)
3. Reading from the filesystem using Node.js APIs like `fs`

#### With the `fetch` API

To fetch data with the `fetch` API, turn your component into an asynchronous function, and await the `fetch` call. For example:

```tsx filename="app/blog/page.tsx" switcher
export default async function Page() {
	const data = await fetch("https://api.vercel.app/blog");
	const posts = await data.json();
	return (
		<ul>
			{posts.map((post) => (
				<li key={post.id}>{post.title}</li>
			))}
		</ul>
	);
}
```

```jsx filename="app/blog/page.js" switcher
export default async function Page() {
	const data = await fetch("https://api.vercel.app/blog");
	const posts = await data.json();
	return (
		<ul>
			{posts.map((post) => (
				<li key={post.id}>{post.title}</li>
			))}
		</ul>
	);
}
```

> **Good to know:**
>
> -   `fetch` responses are not cached by default. However, Next.js will [pre-render](/docs/app/guides/caching.md#static-rendering) the route and the output will be cached for improved performance. If you'd like to opt into [dynamic rendering](/docs/app/guides/caching.md#dynamic-rendering), use the `{ cache: 'no-store' }` option. See the [`fetch` API Reference](/docs/app/api-reference/functions/fetch.md).
> -   During development, you can log `fetch` calls for better visibility and debugging. See the [`logging` API reference](/docs/app/api-reference/config/next-config-js/logging.md).

#### With an ORM or database

Since Server Components are rendered on the server, you can safely make database queries using an ORM or database client. Turn your component into an asynchronous function, and await the call:

```tsx filename="app/blog/page.tsx" switcher
import { db, posts } from "@/lib/db";

export default async function Page() {
	const allPosts = await db.select().from(posts);
	return (
		<ul>
			{allPosts.map((post) => (
				<li key={post.id}>{post.title}</li>
			))}
		</ul>
	);
}
```

```jsx filename="app/blog/page.js" switcher
import { db, posts } from "@/lib/db";

export default async function Page() {
	const allPosts = await db.select().from(posts);
	return (
		<ul>
			{allPosts.map((post) => (
				<li key={post.id}>{post.title}</li>
			))}
		</ul>
	);
}
```

### Client Components

There are two ways to fetch data in Client Components, using:

1. React's [`use` hook](https://react.dev/reference/react/use)
2. A community library like [SWR](https://swr.vercel.app/) or [React Query](https://tanstack.com/query/latest)

#### Streaming data with the `use` hook

You can use React's [`use` hook](https://react.dev/reference/react/use) to [stream](#streaming) data from the server to client. Start by fetching data in your Server component, and pass the promise to your Client Component as prop:

```tsx filename="app/blog/page.tsx" switcher
import Posts from "@/app/ui/posts";
import { Suspense } from "react";

export default function Page() {
	// Don't await the data fetching function
	const posts = getPosts();

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Posts posts={posts} />
		</Suspense>
	);
}
```

```jsx filename="app/blog/page.js" switcher
import Posts from "@/app/ui/posts";
import { Suspense } from "react";

export default function Page() {
	// Don't await the data fetching function
	const posts = getPosts();

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Posts posts={posts} />
		</Suspense>
	);
}
```

Then, in your Client Component, use the `use` hook to read the promise:

```tsx filename="app/ui/posts.tsx" switcher
"use client";
import { use } from "react";

export default function Posts({
	posts,
}: {
	posts: Promise<{ id: string; title: string }[]>;
}) {
	const allPosts = use(posts);

	return (
		<ul>
			{allPosts.map((post) => (
				<li key={post.id}>{post.title}</li>
			))}
		</ul>
	);
}
```

```jsx filename="app/ui/posts.js" switcher
"use client";
import { use } from "react";

export default function Posts({ posts }) {
	const allPosts = use(posts);

	return (
		<ul>
			{allPosts.map((post) => (
				<li key={post.id}>{post.title}</li>
			))}
		</ul>
	);
}
```

In the example above, the `<Posts>` component is wrapped in a [`<Suspense>` boundary](https://react.dev/reference/react/Suspense). This means the fallback will be shown while the promise is being resolved. Learn more about [streaming](#streaming).

#### Community libraries

You can use a community library like [SWR](https://swr.vercel.app/) or [React Query](https://tanstack.com/query/latest) to fetch data in Client Components. These libraries have their own semantics for caching, streaming, and other features. For example, with SWR:

```tsx filename="app/blog/page.tsx" switcher
"use client";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function BlogPage() {
	const { data, error, isLoading } = useSWR(
		"https://api.vercel.app/blog",
		fetcher
	);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<ul>
			{data.map((post: { id: string; title: string }) => (
				<li key={post.id}>{post.title}</li>
			))}
		</ul>
	);
}
```

```jsx filename="app/blog/page.js" switcher
"use client";

import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function BlogPage() {
	const { data, error, isLoading } = useSWR(
		"https://api.vercel.app/blog",
		fetcher
	);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<ul>
			{data.map((post) => (
				<li key={post.id}>{post.title}</li>
			))}
		</ul>
	);
}
```

## Deduplicate requests and cache data

One way to deduplicate `fetch` requests is with [request memoization](/docs/app/guides/caching.md#request-memoization). With this mechanism, `fetch` calls using `GET` or `HEAD` with the same URL and options in a single render pass are combined into one request. This happens automatically, and you can [opt out](/docs/app/guides/caching.md#opting-out) by passing an Abort signal to `fetch`.

Request memoization is scoped to the lifetime of a request.

You can also deduplicate `fetch` requests by using Next.js’ [Data Cache](/docs/app/guides/caching.md#data-cache), for example by setting `cache: 'force-cache'` in your `fetch` options.

Data Cache allows sharing data across the current render pass and incoming requests.

If you are _not_ using `fetch`, and instead using an ORM or database directly, you can wrap your data access with the [React `cache`](https://react.dev/reference/react/cache) function.

```tsx filename="app/lib/data.ts" switcher
import { cache } from "react";
import { db, posts, eq } from "@/lib/db";

export const getPost = cache(async (id: string) => {
	const post = await db.query.posts.findFirst({
		where: eq(posts.id, parseInt(id)),
	});
});
```

```jsx filename="app/lib/data.js" switcher
import { cache } from "react";
import { db, posts, eq } from "@/lib/db";
import { notFound } from "next/navigation";

export const getPost = cache(async (id) => {
	const post = await db.query.posts.findFirst({
		where: eq(posts.id, parseInt(id)),
	});
});
```

## Streaming

> **Warning:** The content below assumes the [`cacheComponents` config option](/docs/app/api-reference/config/next-config-js/cacheComponents.md) is enabled in your application. The flag was introduced in Next.js 15 canary.

When you fetch data in Server Components, the data is fetched and rendered on the server for each request. If you have any slow data requests, the whole route will be blocked from rendering until all the data is fetched.

To improve the initial load time and user experience, you can use streaming to break up the page's HTML into smaller chunks and progressively send those chunks from the server to the client.

![How Server Rendering with Streaming Works](https://h8DxKfmAPhn8O0p3.public.blob.vercel-storage.com/docs/light/server-rendering-with-streaming.png)

There are two ways you can leverage streaming in your application:

1. Wrapping a page with a [`loading.js` file](#with-loadingjs)
2. Wrapping a component with [`<Suspense>`](#with-suspense)

### With `loading.js`

You can create a `loading.js` file in the same folder as your page to stream the **entire page** while the data is being fetched. For example, to stream `app/blog/page.js`, add the file inside the `app/blog` folder.

![Blog folder structure with loading.js file](https://h8DxKfmAPhn8O0p3.public.blob.vercel-storage.com/docs/light/loading-file.png)

```tsx filename="app/blog/loading.tsx" switcher
export default function Loading() {
	// Define the Loading UI here
	return <div>Loading...</div>;
}
```

```jsx filename="app/blog/loading.js" switcher
export default function Loading() {
	// Define the Loading UI here
	return <div>Loading...</div>;
}
```

On navigation, the user will immediately see the layout and a [loading state](#creating-meaningful-loading-states) while the page is being rendered. The new content will then be automatically swapped in once rendering is complete.

![Loading UI](https://h8DxKfmAPhn8O0p3.public.blob.vercel-storage.com/docs/light/loading-ui.png)

Behind-the-scenes, `loading.js` will be nested inside `layout.js`, and will automatically wrap the `page.js` file and any children below in a `<Suspense>` boundary.

![loading.js overview](https://h8DxKfmAPhn8O0p3.public.blob.vercel-storage.com/docs/light/loading-overview.png)

This approach works well for route segments (layouts and pages), but for more granular streaming, you can use `<Suspense>`.

### With `<Suspense>`

`<Suspense>` allows you to be more granular about what parts of the page to stream. For example, you can immediately show any page content that falls outside of the `<Suspense>` boundary, and stream in the list of blog posts inside the boundary.

```tsx filename="app/blog/page.tsx" switcher
import { Suspense } from "react";
import BlogList from "@/components/BlogList";
import BlogListSkeleton from "@/components/BlogListSkeleton";

export default function BlogPage() {
	return (
		<div>
			{/* This content will be sent to the client immediately */}
			<header>
				<h1>Welcome to the Blog</h1>
				<p>Read the latest posts below.</p>
			</header>
			<main>
				{/* If there's any dynamic content inside this boundary, it will be streamed in */}
				<Suspense fallback={<BlogListSkeleton />}>
					<BlogList />
				</Suspense>
			</main>
		</div>
	);
}
```

```jsx filename="app/blog/page.js" switcher
import { Suspense } from "react";
import BlogList from "@/components/BlogList";
import BlogListSkeleton from "@/components/BlogListSkeleton";

export default function BlogPage() {
	return (
		<div>
			{/* This content will be sent to the client immediately */}
			<header>
				<h1>Welcome to the Blog</h1>
				<p>Read the latest posts below.</p>
			</header>
			<main>
				{/* If there's any dynamic content inside this boundary, it will be streamed in */}
				<Suspense fallback={<BlogListSkeleton />}>
					<BlogList />
				</Suspense>
			</main>
		</div>
	);
}
```

### Creating meaningful loading states

An instant loading state is fallback UI that is shown immediately to the user after navigation. For the best user experience, we recommend designing loading states that are meaningful and help users understand the app is responding. For example, you can use skeletons and spinners, or a small but meaningful part of future screens such as a cover photo, title, etc.

In development, you can preview and inspect the loading state of your components using the [React Devtools](https://react.dev/learn/react-developer-tools).

## Examples

### Sequential data fetching

Sequential data fetching happens when one request depends on data from another.

For example, `<Playlists>` can only fetch data after `<Artist>` completes because it needs the `artistID`:

```tsx filename="app/artist/[username]/page.tsx" switcher
export default async function Page({
	params,
}: {
	params: Promise<{ username: string }>;
}) {
	const { username } = await params;
	// Get artist information
	const artist = await getArtist(username);

	return (
		<>
			<h1>{artist.name}</h1>
			{/* Show fallback UI while the Playlists component is loading */}
			<Suspense fallback={<div>Loading...</div>}>
				{/* Pass the artist ID to the Playlists component */}
				<Playlists artistID={artist.id} />
			</Suspense>
		</>
	);
}

async function Playlists({ artistID }: { artistID: string }) {
	// Use the artist ID to fetch playlists
	const playlists = await getArtistPlaylists(artistID);

	return (
		<ul>
			{playlists.map((playlist) => (
				<li key={playlist.id}>{playlist.name}</li>
			))}
		</ul>
	);
}
```

```jsx filename="app/artist/[username]/page.js" switcher
export default async function Page({ params }) {
	const { username } = await params;
	// Get artist information
	const artist = await getArtist(username);

	return (
		<>
			<h1>{artist.name}</h1>
			{/* Show fallback UI while the Playlists component is loading */}
			<Suspense fallback={<div>Loading...</div>}>
				{/* Pass the artist ID to the Playlists component */}
				<Playlists artistID={artist.id} />
			</Suspense>
		</>
	);
}

async function Playlists({ artistID }) {
	// Use the artist ID to fetch playlists
	const playlists = await getArtistPlaylists(artistID);

	return (
		<ul>
			{playlists.map((playlist) => (
				<li key={playlist.id}>{playlist.name}</li>
			))}
		</ul>
	);
}
```

In this example, `<Suspense>` allows the playlists to stream in after the artist data loads. However, the page still waits for the artist data before displaying anything. To prevent this, you can wrap the entire page component in a `<Suspense>` boundary (for example, using a [`loading.js` file](#with-loadingjs)) to show a loading state immediately.

Ensure your data source can resolve the first request quickly, as it blocks everything else. If you can't optimize the request further, consider [caching](#deduplicate-requests-and-cache-data) the result if the data changes infrequently.

### Parallel data fetching

Parallel data fetching happens when data requests in a route are eagerly initiated and start at the same time.

By default, [layouts and pages](/docs/app/getting-started/layouts-and-pages.md) are rendered in parallel. So each segment starts fetching data as soon as possible.

However, within _any_ component, multiple `async`/`await` requests can still be sequential if placed after the other. For example, `getAlbums` will be blocked until `getArtist` is resolved:

```tsx filename="app/artist/[username]/page.tsx" switcher
import { getArtist, getAlbums } from "@/app/lib/data";

export default async function Page({ params }) {
	// These requests will be sequential
	const { username } = await params;
	const artist = await getArtist(username);
	const albums = await getAlbums(username);
	return <div>{artist.name}</div>;
}
```

Start multiple requests by calling `fetch`, then await them with [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all). Requests begin as soon as `fetch` is called.

```tsx filename="app/artist/[username]/page.tsx" highlight={3,8,23} switcher
import Albums from "./albums";

async function getArtist(username: string) {
	const res = await fetch(`https://api.example.com/artist/${username}`);
	return res.json();
}

async function getAlbums(username: string) {
	const res = await fetch(
		`https://api.example.com/artist/${username}/albums`
	);
	return res.json();
}

export default async function Page({
	params,
}: {
	params: Promise<{ username: string }>;
}) {
	const { username } = await params;

	// Initiate requests
	const artistData = getArtist(username);
	const albumsData = getAlbums(username);

	const [artist, albums] = await Promise.all([artistData, albumsData]);

	return (
		<>
			<h1>{artist.name}</h1>
			<Albums list={albums} />
		</>
	);
}
```

```jsx filename="app/artist/[username]/page.js" highlight={3,8,19} switcher
import Albums from "./albums";

async function getArtist(username) {
	const res = await fetch(`https://api.example.com/artist/${username}`);
	return res.json();
}

async function getAlbums(username) {
	const res = await fetch(
		`https://api.example.com/artist/${username}/albums`
	);
	return res.json();
}

export default async function Page({ params }) {
	const { username } = await params;

	// Initiate requests
	const artistData = getArtist(username);
	const albumsData = getAlbums(username);

	const [artist, albums] = await Promise.all([artistData, albumsData]);

	return (
		<>
			<h1>{artist.name}</h1>
			<Albums list={albums} />
		</>
	);
}
```

> **Good to know:** If one request fails when using `Promise.all`, the entire operation will fail. To handle this, you can use the [`Promise.allSettled`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) method instead.

### Preloading data

You can preload data by creating a utility function that you eagerly call above blocking requests. `<Item>` conditionally renders based on the `checkIsAvailable()` function.

You can call `preload()` before `checkIsAvailable()` to eagerly initiate `<Item/>` data dependencies. By the time `<Item/>` is rendered, its data has already been fetched.

```tsx filename="app/item/[id]/page.tsx" switcher
import { getItem, checkIsAvailable } from "@/lib/data";

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	// starting loading item data
	preload(id);
	// perform another asynchronous task
	const isAvailable = await checkIsAvailable();

	return isAvailable ? <Item id={id} /> : null;
}

const preload = (id: string) => {
	// void evaluates the given expression and returns undefined
	// https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/void
	void getItem(id);
};

export async function Item({ id }: { id: string }) {
	const result = await getItem(id);
	// ...
}
```

```jsx filename="app/item/[id]/page.js" switcher
import { getItem, checkIsAvailable } from '@/lib/data'

export default async function Page({ params }) {
  const { id } = await params
  // starting loading item data
  preload(id)
  // perform another asynchronous task
  const isAvailable = await checkIsAvailable()

  return isAvailable ? <Item id={id} /> : null
}

const preload = (id) => {
  // void evaluates the given expression and returns undefined
  // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/void
  void getItem(id)
}

export async function Item({ id }) {
  const result = await getItem(id)
  // ...
```

Additionally, you can use React's [`cache` function](https://react.dev/reference/react/cache) and the [`server-only` package](https://www.npmjs.com/package/server-only) to create a reusable utility function. This approach allows you to cache the data fetching function and ensure that it's only executed on the server.

```ts filename="utils/get-item.ts" switcher
import { cache } from "react";
import "server-only";
import { getItem } from "@/lib/data";

export const preload = (id: string) => {
	void getItem(id);
};

export const getItem = cache(async (id: string) => {
	// ...
});
```

```js filename="utils/get-item.js" switcher
import { cache } from "react";
import "server-only";
import { getItem } from "@/lib/data";

export const preload = (id) => {
	void getItem(id);
};

export const getItem = cache(async (id) => {
	// ...
});
```

## API Reference

Learn more about the features mentioned in this page by reading the API Reference.

-   [Data Security](/docs/app/guides/data-security.md)
    -   Learn the built-in data security features in Next.js and learn best practices for protecting your application's data.
-   [fetch](/docs/app/api-reference/functions/fetch.md)
    -   API reference for the extended fetch function.
-   [loading.js](/docs/app/api-reference/file-conventions/loading.md)
    -   API reference for the loading.js file.
-   [logging](/docs/app/api-reference/config/next-config-js/logging.md)
    -   Configure how data fetches are logged to the console when running Next.js in development mode.
-   [taint](/docs/app/api-reference/config/next-config-js/taint.md)
    -   Enable tainting Objects and Values.

# Form Component

@doc-version: 16.1.1
@last-updated: 2025-06-16

The `<Form>` component extends the HTML `<form>` element to provide [**prefetching**](/docs/app/getting-started/linking-and-navigating.md#prefetching) of [loading UI](/docs/app/api-reference/file-conventions/loading.md), **client-side navigation** on submission, and **progressive enhancement**.

It's useful for forms that update URL search params as it reduces the boilerplate code needed to achieve the above.

Basic usage:

```tsx filename="/app/ui/search.tsx" switcher
import Form from "next/form";

export default function Page() {
	return (
		<Form action="/search">
			{/* On submission, the input value will be appended to
          the URL, e.g. /search?query=abc */}
			<input name="query" />
			<button type="submit">Submit</button>
		</Form>
	);
}
```

```jsx filename="/app/ui/search.js" switcher
import Form from "next/form";

export default function Search() {
	return (
		<Form action="/search">
			{/* On submission, the input value will be appended to
          the URL, e.g. /search?query=abc */}
			<input name="query" />
			<button type="submit">Submit</button>
		</Form>
	);
}
```

## Reference

The behavior of the `<Form>` component depends on whether the `action` prop is passed a `string` or `function`.

-   When `action` is a **string**, the `<Form>` behaves like a native HTML form that uses a **`GET`** method. The form data is encoded into the URL as search params, and when the form is submitted, it navigates to the specified URL. In addition, Next.js:
    -   [Prefetches](/docs/app/getting-started/linking-and-navigating.md#prefetching) the path when the form becomes visible, this preloads shared UI (e.g. `layout.js` and `loading.js`), resulting in faster navigation.
    -   Performs a [client-side navigation](/docs/app/getting-started/linking-and-navigating.md#client-side-transitions) instead of a full page reload when the form is submitted. This retains shared UI and client-side state.
-   When `action` is a **function** (Server Action), `<Form>` behaves like a [React form](https://react.dev/reference/react-dom/components/form), executing the action when the form is submitted.

### `action` (string) Props

When `action` is a string, the `<Form>` component supports the following props:

| Prop       | Example            | Type                            | Required |
| ---------- | ------------------ | ------------------------------- | -------- |
| `action`   | `action="/search"` | `string` (URL or relative path) | Yes      |
| `replace`  | `replace={false}`  | `boolean`                       | -        |
| `scroll`   | `scroll={true}`    | `boolean`                       | -        |
| `prefetch` | `prefetch={true}`  | `boolean`                       | -        |

-   **`action`**: The URL or path to navigate to when the form is submitted.
    -   An empty string `""` will navigate to the same route with updated search params.
-   **`replace`**: Replaces the current history state instead of pushing a new one to the [browser's history](https://developer.mozilla.org/en-US/docs/Web/API/History_API) stack. Default is `false`.
-   **`scroll`**: Controls the scroll behavior during navigation. Defaults to `true`, this means it will scroll to the top of the new route, and maintain the scroll position for backwards and forwards navigation.
-   **`prefetch`**: Controls whether the path should be prefetched when the form becomes visible in the user's viewport. Defaults to `true`.

### `action` (function) Props

When `action` is a function, the `<Form>` component supports the following prop:

| Prop     | Example             | Type                       | Required |
| -------- | ------------------- | -------------------------- | -------- |
| `action` | `action={myAction}` | `function` (Server Action) | Yes      |

-   **`action`**: The Server Action to be called when the form is submitted. See the [React docs](https://react.dev/reference/react-dom/components/form#props) for more.

> **Good to know**: When `action` is a function, the `replace` and `scroll` props are ignored.

### Caveats

-   **`formAction`**: Can be used in a `<button>` or `<input type="submit">` fields to override the `action` prop. Next.js will perform a client-side navigation, however, this approach doesn't support prefetching.
    -   When using [`basePath`](/docs/app/api-reference/config/next-config-js/basePath.md), you must also include it in the `formAction` path. e.g. `formAction="/base-path/search"`.
-   **`key`**: Passing a `key` prop to a string `action` is not supported. If you'd like to trigger a re-render or perform a mutation, consider using a function `action` instead.

*   **`onSubmit`**: Can be used to handle form submission logic. However, calling `event.preventDefault()` will override `<Form>` behavior such as navigating to the specified URL.
*   **[`method`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#method), [`encType`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#enctype), [`target`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#target)**: Are not supported as they override `<Form>` behavior.
    -   Similarly, `formMethod`, `formEncType`, and `formTarget` can be used to override the `method`, `encType`, and `target` props respectively, and using them will fallback to native browser behavior.
    -   If you need to use these props, use the HTML `<form>` element instead.
*   **`<input type="file">`**: Using this input type when the `action` is a string will match browser behavior by submitting the filename instead of the file object.

## Examples

### Search form that leads to a search result page

You can create a search form that navigates to a search results page by passing the path as an `action`:

```tsx filename="/app/page.tsx" switcher
import Form from "next/form";

export default function Page() {
	return (
		<Form action="/search">
			<input name="query" />
			<button type="submit">Submit</button>
		</Form>
	);
}
```

```jsx filename="/app/page.js" switcher
import Form from "next/form";

export default function Page() {
	return (
		<Form action="/search">
			<input name="query" />
			<button type="submit">Submit</button>
		</Form>
	);
}
```

When the user updates the query input field and submits the form, the form data will be encoded into the URL as search params, e.g. `/search?query=abc`.

> **Good to know**: If you pass an empty string `""` to `action`, the form will navigate to the same route with updated search params.

On the results page, you can access the query using the [`searchParams`](/docs/app/api-reference/file-conventions/page.md#searchparams-optional) `page.js` prop and use it to fetch data from an external source.

```tsx filename="/app/search/page.tsx" switcher
import { getSearchResults } from "@/lib/search";

export default async function SearchPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const results = await getSearchResults((await searchParams).query);

	return <div>...</div>;
}
```

```jsx filename="/app/search/page.js" switcher
import { getSearchResults } from "@/lib/search";

export default async function SearchPage({ searchParams }) {
	const results = await getSearchResults((await searchParams).query);

	return <div>...</div>;
}
```

When the `<Form>` becomes visible in the user's viewport, shared UI (such as `layout.js` and `loading.js`) on the `/search` page will be prefetched. On submission, the form will immediately navigate to the new route and show loading UI while the results are being fetched. You can design the fallback UI using [`loading.js`](/docs/app/api-reference/file-conventions/loading.md):

```tsx filename="/app/search/loading.tsx" switcher
export default function Loading() {
	return <div>Loading...</div>;
}
```

```jsx filename="/app/search/loading.js" switcher
export default function Loading() {
	return <div>Loading...</div>;
}
```

To cover cases when shared UI hasn't yet loaded, you can show instant feedback to the user using [`useFormStatus`](https://react.dev/reference/react-dom/hooks/useFormStatus).

First, create a component that displays a loading state when the form is pending:

```tsx filename="/app/ui/search-button.tsx" switcher
"use client";
import { useFormStatus } from "react-dom";

export default function SearchButton() {
	const status = useFormStatus();
	return (
		<button type="submit">
			{status.pending ? "Searching..." : "Search"}
		</button>
	);
}
```

```jsx filename="/app/ui/search-button.js" switcher
"use client";
import { useFormStatus } from "react-dom";

export default function SearchButton() {
	const status = useFormStatus();
	return (
		<button type="submit">
			{status.pending ? "Searching..." : "Search"}
		</button>
	);
}
```

Then, update the search form page to use the `SearchButton` component:

```tsx filename="/app/page.tsx" switcher
import Form from "next/form";
import { SearchButton } from "@/ui/search-button";

export default function Page() {
	return (
		<Form action="/search">
			<input name="query" />
			<SearchButton />
		</Form>
	);
}
```

```jsx filename="/app/ui/search-button.js" switcher
import Form from "next/form";
import { SearchButton } from "@/ui/search-button";

export default function Page() {
	return (
		<Form action="/search">
			<input name="query" />
			<SearchButton />
		</Form>
	);
}
```

### Mutations with Server Actions

You can perform mutations by passing a function to the `action` prop.

```tsx filename="/app/posts/create/page.tsx" switcher
import Form from "next/form";
import { createPost } from "@/posts/actions";

export default function Page() {
	return (
		<Form action={createPost}>
			<input name="title" />
			{/* ... */}
			<button type="submit">Create Post</button>
		</Form>
	);
}
```

```jsx filename="/app/posts/create/page.js" switcher
import Form from "next/form";
import { createPost } from "@/posts/actions";

export default function Page() {
	return (
		<Form action={createPost}>
			<input name="title" />
			{/* ... */}
			<button type="submit">Create Post</button>
		</Form>
	);
}
```

After a mutation, it's common to redirect to the new resource. You can use the [`redirect`](/docs/app/guides/redirecting.md) function from `next/navigation` to navigate to the new post page.

> **Good to know**: Since the "destination" of the form submission is not known until the action is executed, `<Form>` cannot automatically prefetch shared UI.

```tsx filename="/app/posts/actions.ts" switcher
"use server";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
	// Create a new post
	// ...

	// Redirect to the new post
	redirect(`/posts/${data.id}`);
}
```

```jsx filename="/app/posts/actions.js" switcher
"use server";
import { redirect } from "next/navigation";

export async function createPost(formData) {
	// Create a new post
	// ...

	// Redirect to the new post
	redirect(`/posts/${data.id}`);
}
```

Then, in the new page, you can fetch data using the `params` prop:

```tsx filename="/app/posts/[id]/page.tsx" switcher
import { getPost } from "@/posts/data";

export default async function PostPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const data = await getPost(id);

	return (
		<div>
			<h1>{data.title}</h1>
			{/* ... */}
		</div>
	);
}
```

```jsx filename="/app/posts/[id]/page.js" switcher
import { getPost } from "@/posts/data";

export default async function PostPage({ params }) {
	const { id } = await params;
	const data = await getPost(id);

	return (
		<div>
			<h1>{data.title}</h1>
			{/* ... */}
		</div>
	);
}
```

See the [Server Actions](/docs/app/getting-started/updating-data.md) docs for more examples.

# Linking and Navigating

@doc-version: 16.1.1
@last-updated: 2025-12-19

In Next.js, routes are rendered on the server by default. This often means the client has to wait for a server response before a new route can be shown. Next.js comes with built-in [prefetching](#prefetching), [streaming](#streaming), and [client-side transitions](#client-side-transitions) ensuring navigation stays fast and responsive.

This guide explains how navigation works in Next.js and how you can optimize it for [dynamic routes](#dynamic-routes-without-loadingtsx) and [slow networks](#slow-networks).

## How navigation works

To understand how navigation works in Next.js, it helps to be familiar with the following concepts:

-   [Server Rendering](#server-rendering)
-   [Prefetching](#prefetching)
-   [Streaming](#streaming)
-   [Client-side transitions](#client-side-transitions)

### Server Rendering

In Next.js, [Layouts and Pages](/docs/app/getting-started/layouts-and-pages.md) are [React Server Components](https://react.dev/reference/rsc/server-components) by default. On initial and subsequent navigations, the [Server Component Payload](/docs/app/getting-started/server-and-client-components.md#how-do-server-and-client-components-work-in-nextjs) is generated on the server before being sent to the client.

There are two types of server rendering, based on _when_ it happens:

-   **Static Rendering (or Prerendering)** happens at build time or during [revalidation](/docs/app/getting-started/caching-and-revalidating.md) and the result is cached.
-   **Dynamic Rendering** happens at request time in response to a client request.

The trade-off of server rendering is that the client must wait for the server to respond before the new route can be shown. Next.js addresses this delay by [prefetching](#prefetching) routes the user is likely to visit and performing [client-side transitions](#client-side-transitions).

> **Good to know**: HTML is also generated for the initial visit.

### Prefetching

Prefetching is the process of loading a route in the background before the user navigates to it. This makes navigation between routes in your application feel instant, because by the time a user clicks on a link, the data to render the next route is already available client side.

Next.js automatically prefetches routes linked with the [`<Link>` component](/docs/app/api-reference/components/link.md) when they enter the user's viewport.

```tsx filename="app/layout.tsx" switcher
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html>
			<body>
				<nav>
					{/* Prefetched when the link is hovered or enters the viewport */}
					<Link href="/blog">Blog</Link>
					{/* No prefetching */}
					<a href="/contact">Contact</a>
				</nav>
				{children}
			</body>
		</html>
	);
}
```

```jsx filename="app/layout.js" switcher
import Link from "next/link";

export default function Layout() {
	return (
		<html>
			<body>
				<nav>
					{/* Prefetched when the link is hovered or enters the viewport */}
					<Link href="/blog">Blog</Link>
					{/* No prefetching */}
					<a href="/contact">Contact</a>
				</nav>
				{children}
			</body>
		</html>
	);
}
```

How much of the route is prefetched depends on whether it's static or dynamic:

-   **Static Route**: the full route is prefetched.
-   **Dynamic Route**: prefetching is skipped, or the route is partially prefetched if [`loading.tsx`](/docs/app/api-reference/file-conventions/loading.md) is present.

By skipping or partially prefetching dynamic routes, Next.js avoids unnecessary work on the server for routes the users may never visit. However, waiting for a server response before navigation can give the users the impression that the app is not responding.

![Server Rendering without Streaming](https://h8DxKfmAPhn8O0p3.public.blob.vercel-storage.com/docs/light/server-rendering-without-streaming.png)

To improve the navigation experience to dynamic routes, you can use [streaming](#streaming).

### Streaming

Streaming allows the server to send parts of a dynamic route to the client as soon as they're ready, rather than waiting for the entire route to be rendered. This means users see something sooner, even if parts of the page are still loading.

For dynamic routes, it means they can be **partially prefetched**. That is, shared layouts and loading skeletons can be requested ahead of time.

![How Server Rendering with Streaming Works](https://h8DxKfmAPhn8O0p3.public.blob.vercel-storage.com/docs/light/server-rendering-with-streaming.png)

To use streaming, create a `loading.tsx` in your route folder:

![loading.js special file](https://h8DxKfmAPhn8O0p3.public.blob.vercel-storage.com/docs/light/loading-special-file.png)

```tsx filename="app/dashboard/loading.tsx" switcher
export default function Loading() {
	// Add fallback UI that will be shown while the route is loading.
	return <LoadingSkeleton />;
}
```

```jsx filename="app/dashboard/loading.js" switcher
export default function Loading() {
	// Add fallback UI that will be shown while the route is loading.
	return <LoadingSkeleton />;
}
```

Behind the scenes, Next.js will automatically wrap the `page.tsx` contents in a `<Suspense>` boundary. The prefetched fallback UI will be shown while the route is loading, and swapped for the actual content once ready.

> **Good to know**: You can also use [`<Suspense>`](https://react.dev/reference/react/Suspense) to create loading UI for nested components.

Benefits of `loading.tsx`:

-   Immediate navigation and visual feedback for the user.
-   Shared layouts remain interactive and navigation is interruptible.
-   Improved Core Web Vitals: [TTFB](https://web.dev/articles/ttfb), [FCP](https://web.dev/articles/fcp), and [TTI](https://web.dev/articles/tti).

To further improve the navigation experience, Next.js performs a [client-side transition](#client-side-transitions) with the `<Link>` component.

### Client-side transitions

Traditionally, navigation to a server-rendered page triggers a full page load. This clears state, resets scroll position, and blocks interactivity.

Next.js avoids this with client-side transitions using the `<Link>` component. Instead of reloading the page, it updates the content dynamically by:

-   Keeping any shared layouts and UI.
-   Replacing the current page with the prefetched loading state or a new page if available.

Client-side transitions are what makes a server-rendered apps _feel_ like client-rendered apps. And when paired with [prefetching](#prefetching) and [streaming](#streaming), it enables fast transitions, even for dynamic routes.

## What can make transitions slow?

These Next.js optimizations make navigation fast and responsive. However, under certain conditions, transitions can still _feel_ slow. Here are some common causes and how to improve the user experience:

### Dynamic routes without `loading.tsx`

When navigating to a dynamic route, the client must wait for the server response before showing the result. This can give the users the impression that the app is not responding.

We recommend adding `loading.tsx` to dynamic routes to enable partial prefetching, trigger immediate navigation, and display a loading UI while the route renders.

```tsx filename="app/blog/[slug]/loading.tsx" switcher
export default function Loading() {
	return <LoadingSkeleton />;
}
```

```jsx filename="app/blog/[slug]/loading.js" switcher
export default function Loading() {
	return <LoadingSkeleton />;
}
```

> **Good to know**: In development mode, you can use the Next.js Devtools to identify if the route is static or dynamic. See [`devIndicators`](/docs/app/api-reference/config/next-config-js/devIndicators.md) for more information.

### Dynamic segments without `generateStaticParams`

If a [dynamic segment](/docs/app/api-reference/file-conventions/dynamic-routes.md) could be prerendered but isn't because it's missing [`generateStaticParams`](/docs/app/api-reference/functions/generate-static-params.md), the route will fallback to dynamic rendering at request time.

Ensure the route is statically generated at build time by adding `generateStaticParams`:

```tsx filename="app/blog/[slug]/page.tsx" switcher
export async function generateStaticParams() {
	const posts = await fetch("https://.../posts").then((res) => res.json());

	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	// ...
}
```

```jsx filename="app/blog/[slug]/page.js" switcher
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())

  return posts.map((post) => ({
    slug: post.slug,
  }))

export default async function Page({ params }) {
  const { slug } = await params
  // ...
}
```

### Slow networks

On slow or unstable networks, prefetching may not finish before the user clicks a link. This can affect both static and dynamic routes. In these cases, the `loading.js` fallback may not appear immediately because it hasn't been prefetched yet.

To improve perceived performance, you can use the [`useLinkStatus` hook](/docs/app/api-reference/functions/use-link-status.md) to show immediate feedback while the transition is in progress.

```tsx filename="app/ui/loading-indicator.tsx" switcher
"use client";

import { useLinkStatus } from "next/link";

export default function LoadingIndicator() {
	const { pending } = useLinkStatus();
	return (
		<span
			aria-hidden
			className={`link-hint ${pending ? "is-pending" : ""}`}
		/>
	);
}
```

```jsx filename="app/ui/loading-indicator.js" switcher
"use client";

import { useLinkStatus } from "next/link";

export default function LoadingIndicator() {
	const { pending } = useLinkStatus();
	return (
		<span
			aria-hidden
			className={`link-hint ${pending ? "is-pending" : ""}`}
		/>
	);
}
```

You can "debounce" the hint by adding an initial animation delay (e.g. 100ms) and starting as invisible (e.g. `opacity: 0`). This means the loading indicator will only be shown if the navigation takes longer than the specified delay. See the [`useLinkStatus` reference](/docs/app/api-reference/functions/use-link-status.md#gracefully-handling-fast-navigation) for a CSS example.

> **Good to know**: You can use other visual feedback patterns like a progress bar. View an example [here](https://github.com/vercel/react-transition-progress).

### Disabling prefetching

You can opt out of prefetching by setting the `prefetch` prop to `false` on the `<Link>` component. This is useful to avoid unnecessary usage of resources when rendering large lists of links (e.g. an infinite scroll table).

```tsx
<Link prefetch={false} href="/blog">
	Blog
</Link>
```

However, disabling prefetching comes with trade-offs:

-   **Static routes** will only be fetched when the user clicks the link.
-   **Dynamic routes** will need to be rendered on the server first before the client can navigate to it.

To reduce resource usage without fully disabling prefetch, you can prefetch only on hover. This limits prefetching to routes the user is more _likely_ to visit, rather than all links in the viewport.

```tsx filename="app/ui/hover-prefetch-link.tsx" switcher
"use client";

import Link from "next/link";
import { useState } from "react";

function HoverPrefetchLink({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	const [active, setActive] = useState(false);

	return (
		<Link
			href={href}
			prefetch={active ? null : false}
			onMouseEnter={() => setActive(true)}>
			{children}
		</Link>
	);
}
```

```jsx filename="app/ui/hover-prefetch-link.js" switcher
"use client";

import Link from "next/link";
import { useState } from "react";

function HoverPrefetchLink({ href, children }) {
	const [active, setActive] = useState(false);

	return (
		<Link
			href={href}
			prefetch={active ? null : false}
			onMouseEnter={() => setActive(true)}>
			{children}
		</Link>
	);
}
```

### Hydration not completed

`<Link>` is a Client Component and must be hydrated before it can prefetch routes. On the initial visit, large JavaScript bundles can delay hydration, preventing prefetching from starting right away.

React mitigates this with Selective Hydration and you can further improve this by:

-   Using the [`@next/bundle-analyzer`](/docs/app/guides/package-bundling.md#nextbundle-analyzer-for-webpack) plugin to identify and reduce bundle size by removing large dependencies.
-   Moving logic from the client to the server where possible. See the [Server and Client Components](/docs/app/getting-started/server-and-client-components.md) docs for guidance.

## Examples

### Native History API

Next.js allows you to use the native [`window.history.pushState`](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState) and [`window.history.replaceState`](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState) methods to update the browser's history stack without reloading the page.

`pushState` and `replaceState` calls integrate into the Next.js Router, allowing you to sync with [`usePathname`](/docs/app/api-reference/functions/use-pathname.md) and [`useSearchParams`](/docs/app/api-reference/functions/use-search-params.md).

#### `window.history.pushState`

Use it to add a new entry to the browser's history stack. The user can navigate back to the previous state. For example, to sort a list of products:

```tsx fileName="app/ui/sort-products.tsx" switcher
"use client";

import { useSearchParams } from "next/navigation";

export default function SortProducts() {
	const searchParams = useSearchParams();

	function updateSorting(sortOrder: string) {
		const params = new URLSearchParams(searchParams.toString());
		params.set("sort", sortOrder);
		window.history.pushState(null, "", `?${params.toString()}`);
	}

	return (
		<>
			<button onClick={() => updateSorting("asc")}>Sort Ascending</button>
			<button onClick={() => updateSorting("desc")}>
				Sort Descending
			</button>
		</>
	);
}
```

```jsx fileName="app/ui/sort-products.js" switcher
"use client";

import { useSearchParams } from "next/navigation";

export default function SortProducts() {
	const searchParams = useSearchParams();

	function updateSorting(sortOrder) {
		const params = new URLSearchParams(searchParams.toString());
		params.set("sort", sortOrder);
		window.history.pushState(null, "", `?${params.toString()}`);
	}

	return (
		<>
			<button onClick={() => updateSorting("asc")}>Sort Ascending</button>
			<button onClick={() => updateSorting("desc")}>
				Sort Descending
			</button>
		</>
	);
}
```

#### `window.history.replaceState`

Use it to replace the current entry on the browser's history stack. The user is not able to navigate back to the previous state. For example, to switch the application's locale:

```tsx fileName="app/ui/locale-switcher.tsx" switcher
"use client";

import { usePathname } from "next/navigation";

export function LocaleSwitcher() {
	const pathname = usePathname();

	function switchLocale(locale: string) {
		// e.g. '/en/about' or '/fr/contact'
		const newPath = `/${locale}${pathname}`;
		window.history.replaceState(null, "", newPath);
	}

	return (
		<>
			<button onClick={() => switchLocale("en")}>English</button>
			<button onClick={() => switchLocale("fr")}>French</button>
		</>
	);
}
```

```jsx fileName="app/ui/locale-switcher.js" switcher
"use client";

import { usePathname } from "next/navigation";

export function LocaleSwitcher() {
	const pathname = usePathname();

	function switchLocale(locale) {
		// e.g. '/en/about' or '/fr/contact'
		const newPath = `/${locale}${pathname}`;
		window.history.replaceState(null, "", newPath);
	}

	return (
		<>
			<button onClick={() => switchLocale("en")}>English</button>
			<button onClick={() => switchLocale("fr")}>French</button>
		</>
	);
}
```

-   [Link Component](/docs/app/api-reference/components/link.md)
    -   Enable fast client-side navigation with the built-in `next/link` component.
-   [loading.js](/docs/app/api-reference/file-conventions/loading.md)
    -   API reference for the loading.js file.
-   [Prefetching](/docs/app/guides/prefetching.md)
    -   Learn how to configure prefetching in Next.js

# Updating Data

@doc-version: 16.1.1
@last-updated: 2025-11-05

You can update data in Next.js using React's [Server Functions](https://react.dev/reference/rsc/server-functions). This page will go through how you can [create](#creating-server-functions) and [invoke](#invoking-server-functions) Server Functions.

## What are Server Functions?

A **Server Function** is an asynchronous function that runs on the server. They can be called from the client through a network request, which is why they must be asynchronous.

In an `action` or mutation context, they are also called **Server Actions**.

By convention, a Server Action is an async function used with [`startTransition`](https://react.dev/reference/react/startTransition). This happens automatically when the function is:

-   Passed to a `<form>` using the `action` prop.
-   Passed to a `<button>` using the `formAction` prop.

In Next.js, Server Actions integrate with the framework's [caching](/docs/app/guides/caching.md) architecture. When an action is invoked, Next.js can return both the updated UI and new data in a single server roundtrip.

Behind the scenes, actions use the `POST` method, and only this HTTP method can invoke them.

## Creating Server Functions

A Server Function can be defined by using the [`use server`](https://react.dev/reference/rsc/use-server) directive. You can place the directive at the top of an **asynchronous** function to mark the function as a Server Function, or at the top of a separate file to mark all exports of that file.

```ts filename="app/lib/actions.ts" switcher
export async function createPost(formData: FormData) {
	"use server";
	const title = formData.get("title");
	const content = formData.get("content");

	// Update data
	// Revalidate cache
}

export async function deletePost(formData: FormData) {
	"use server";
	const id = formData.get("id");

	// Update data
	// Revalidate cache
}
```

```js filename="app/lib/actions.js" switcher
export async function createPost(formData) {
	"use server";
	const title = formData.get("title");
	const content = formData.get("content");

	// Update data
	// Revalidate cache
}

export async function deletePost(formData) {
	"use server";
	const id = formData.get("id");

	// Update data
	// Revalidate cache
}
```

### Server Components

Server Functions can be inlined in Server Components by adding the `"use server"` directive to the top of the function body:

```tsx filename="app/page.tsx" switcher
export default function Page() {
	// Server Action
	async function createPost(formData: FormData) {
		"use server";
		// ...
	}

	return <></>;
}
```

```jsx filename="app/page.js" switcher
export default function Page() {
	// Server Action
	async function createPost(formData: FormData) {
		"use server";
		// ...
	}

	return <></>;
}
```

> **Good to know:** Server Components support progressive enhancement by default, meaning forms that call Server Actions will be submitted even if JavaScript hasn't loaded yet or is disabled.

### Client Components

It's not possible to define Server Functions in Client Components. However, you can invoke them in Client Components by importing them from a file that has the `"use server"` directive at the top of it:

```ts filename="app/actions.ts" switcher
"use server";

export async function createPost() {}
```

```js filename="app/actions.js" switcher
"use server";

export async function createPost() {}
```

```tsx filename="app/ui/button.tsx" switcher
"use client";

import { createPost } from "@/app/actions";

export function Button() {
	return <button formAction={createPost}>Create</button>;
}
```

```jsx filename="app/ui/button.js" switcher
"use client";

import { createPost } from "@/app/actions";

export function Button() {
	return <button formAction={createPost}>Create</button>;
}
```

> **Good to know:** In Client Components, forms invoking Server Actions will queue submissions if JavaScript isn't loaded yet, and will be prioritized for hydration. After hydration, the browser does not refresh on form submission.

### Passing actions as props

You can also pass an action to a Client Component as a prop:

```jsx
<ClientComponent updateItemAction={updateItem} />
```

```tsx filename="app/client-component.tsx" switcher
"use client";

export default function ClientComponent({
	updateItemAction,
}: {
	updateItemAction: (formData: FormData) => void;
}) {
	return <form action={updateItemAction}>{/* ... */}</form>;
}
```

```jsx filename="app/client-component.js" switcher
"use client";

export default function ClientComponent({ updateItemAction }) {
	return <form action={updateItemAction}>{/* ... */}</form>;
}
```

## Invoking Server Functions

There are two main ways you can invoke a Server Function:

1. [Forms](#forms) in Server and Client Components
2. [Event Handlers](#event-handlers) and [useEffect](#useeffect) in Client Components

> **Good to know:** Server Functions are designed for server-side mutations. The client currently dispatches and awaits them one at a time. This is an implementation detail and may change. If you need parallel data fetching, use [data fetching](/docs/app/getting-started/fetching-data.md#server-components) in Server Components, or perform parallel work inside a single Server Function or [Route Handler](/docs/app/guides/backend-for-frontend.md#manipulating-data).

### Forms

React extends the HTML [`<form>`](https://react.dev/reference/react-dom/components/form) element to allow a Server Function to be invoked with the HTML `action` prop.

When invoked in a form, the function automatically receives the [`FormData`](https://developer.mozilla.org/docs/Web/API/FormData/FormData) object. You can extract the data using the native [`FormData` methods](https://developer.mozilla.org/en-US/docs/Web/API/FormData#instance_methods):

```tsx filename="app/ui/form.tsx" switcher
import { createPost } from "@/app/actions";

export function Form() {
	return (
		<form action={createPost}>
			<input type="text" name="title" />
			<input type="text" name="content" />
			<button type="submit">Create</button>
		</form>
	);
}
```

```jsx filename="app/ui/form.js" switcher
import { createPost } from "@/app/actions";

export function Form() {
	return (
		<form action={createPost}>
			<input type="text" name="title" />
			<input type="text" name="content" />
			<button type="submit">Create</button>
		</form>
	);
}
```

```ts filename="app/actions.ts" switcher
"use server";

export async function createPost(formData: FormData) {
	const title = formData.get("title");
	const content = formData.get("content");

	// Update data
	// Revalidate cache
}
```

```js filename="app/actions.js" switcher
"use server";

export async function createPost(formData) {
	const title = formData.get("title");
	const content = formData.get("content");

	// Update data
	// Revalidate cache
}
```

### Event Handlers

You can invoke a Server Function in a Client Component by using event handlers such as `onClick`.

```tsx filename="app/like-button.tsx" switcher
"use client";

import { incrementLike } from "./actions";
import { useState } from "react";

export default function LikeButton({ initialLikes }: { initialLikes: number }) {
	const [likes, setLikes] = useState(initialLikes);

	return (
		<>
			<p>Total Likes: {likes}</p>
			<button
				onClick={async () => {
					const updatedLikes = await incrementLike();
					setLikes(updatedLikes);
				}}>
				Like
			</button>
		</>
	);
}
```

```jsx filename="app/like-button.js" switcher
"use client";

import { incrementLike } from "./actions";
import { useState } from "react";

export default function LikeButton({ initialLikes }) {
	const [likes, setLikes] = useState(initialLikes);

	return (
		<>
			<p>Total Likes: {likes}</p>
			<button
				onClick={async () => {
					const updatedLikes = await incrementLike();
					setLikes(updatedLikes);
				}}>
				Like
			</button>
		</>
	);
}
```

## Examples

### Showing a pending state

While executing a Server Function, you can show a loading indicator with React's [`useActionState`](https://react.dev/reference/react/useActionState) hook. This hook returns a `pending` boolean:

```tsx filename="app/ui/button.tsx" switcher
"use client";

import { useActionState, startTransition } from "react";
import { createPost } from "@/app/actions";
import { LoadingSpinner } from "@/app/ui/loading-spinner";

export function Button() {
	const [state, action, pending] = useActionState(createPost, false);

	return (
		<button onClick={() => startTransition(action)}>
			{pending ? <LoadingSpinner /> : "Create Post"}
		</button>
	);
}
```

```jsx filename="app/ui/button.js" switcher
"use client";

import { useActionState, startTransition } from "react";
import { createPost } from "@/app/actions";
import { LoadingSpinner } from "@/app/ui/loading-spinner";

export function Button() {
	const [state, action, pending] = useActionState(createPost, false);

	return (
		<button onClick={() => startTransition(action)}>
			{pending ? <LoadingSpinner /> : "Create Post"}
		</button>
	);
}
```

### Refreshing

After a mutation, you may want to refresh the current page to show the latest data. You can do this by calling [`refresh`](/docs/app/api-reference/functions/refresh.md) from `next/cache` in a Server Action:

```ts filename="app/lib/actions.ts" switcher
"use server";

import { refresh } from "next/cache";

export async function updatePost(formData: FormData) {
	// Update data
	// ...

	refresh();
}
```

```js filename="app/lib/actions.js" switcher
"use server";

import { refresh } from "next/cache";

export async function updatePost(formData) {
	// Update data
	// ...

	refresh();
}
```

This refreshes the client router, ensuring the UI reflects the latest state. The `refresh()` function does not revalidate tagged data. To revalidate tagged data, use [`updateTag`](/docs/app/api-reference/functions/updateTag.md) or [`revalidateTag`](/docs/app/api-reference/functions/revalidateTag.md) instead.

### Revalidating

After performing an update, you can revalidate the Next.js cache and show the updated data by calling [`revalidatePath`](/docs/app/api-reference/functions/revalidatePath.md) or [`revalidateTag`](/docs/app/api-reference/functions/revalidateTag.md) within the Server Function:

```ts filename="app/lib/actions.ts" switcher
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
	"use server";
	// Update data
	// ...

	revalidatePath("/posts");
}
```

```js filename="app/actions.js" switcher
import { revalidatePath } from "next/cache";

export async function createPost(formData) {
	"use server";
	// Update data
	// ...
	revalidatePath("/posts");
}
```

### Redirecting

You may want to redirect the user to a different page after performing an update. You can do this by calling [`redirect`](/docs/app/api-reference/functions/redirect.md) within the Server Function.

```ts filename="app/lib/actions.ts" switcher
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
	// Update data
	// ...

	revalidatePath("/posts");
	redirect("/posts");
}
```

```js filename="app/actions.js" switcher
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData) {
	// Update data
	// ...

	revalidatePath("/posts");
	redirect("/posts");
}
```

Calling `redirect` [throws](/docs/app/api-reference/functions/redirect.md#behavior) a framework handled control-flow exception. Any code after it won't execute. If you need fresh data, call [`revalidatePath`](/docs/app/api-reference/functions/revalidatePath.md) or [`revalidateTag`](/docs/app/api-reference/functions/revalidateTag.md) beforehand.

### Cookies

You can `get`, `set`, and `delete` cookies inside a Server Action using the [`cookies`](/docs/app/api-reference/functions/cookies.md) API.

When you [set or delete](/docs/app/api-reference/functions/cookies.md#understanding-cookie-behavior-in-server-actions) a cookie in a Server Action, Next.js re-renders the current page and its layouts on the server so the **UI reflects the new cookie value**.

> **Good to know**: The server update applies to the current React tree, re-rendering, mounting, or unmounting components, as needed. Client state is preserved for re-rendered components, and effects re-run if their dependencies changed.

```ts filename="app/actions.ts" switcher
"use server";

import { cookies } from "next/headers";

export async function exampleAction() {
	const cookieStore = await cookies();

	// Get cookie
	cookieStore.get("name")?.value;

	// Set cookie
	cookieStore.set("name", "Delba");

	// Delete cookie
	cookieStore.delete("name");
}
```

```js filename="app/actions.js" switcher
"use server";

import { cookies } from "next/headers";

export async function exampleAction() {
	// Get cookie
	const cookieStore = await cookies();

	// Get cookie
	cookieStore.get("name")?.value;

	// Set cookie
	cookieStore.set("name", "Delba");

	// Delete cookie
	cookieStore.delete("name");
}
```

### useEffect

You can use the React [`useEffect`](https://react.dev/reference/react/useEffect) hook to invoke a Server Action when the component mounts or a dependency changes. This is useful for mutations that depend on global events or need to be triggered automatically. For example, `onKeyDown` for app shortcuts, an intersection observer hook for infinite scrolling, or when the component mounts to update a view count:

```tsx filename="app/view-count.tsx" switcher
"use client";

import { incrementViews } from "./actions";
import { useState, useEffect, useTransition } from "react";

export default function ViewCount({ initialViews }: { initialViews: number }) {
	const [views, setViews] = useState(initialViews);
	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		startTransition(async () => {
			const updatedViews = await incrementViews();
			setViews(updatedViews);
		});
	}, []);

	// You can use `isPending` to give users feedback
	return <p>Total Views: {views}</p>;
}
```

```jsx filename="app/view-count.js" switcher
"use client";

import { incrementViews } from "./actions";
import { useState, useEffect, useTransition } from "react";

export default function ViewCount({ initialViews }) {
	const [views, setViews] = useState(initialViews);
	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		startTransition(async () => {
			const updatedViews = await incrementViews();
			setViews(updatedViews);
		});
	}, []);

	// You can use `isPending` to give users feedback
	return <p>Total Views: {views}</p>;
}
```

## API Reference

Learn more about the features mentioned in this page by reading the API Reference.

-   [revalidatePath](/docs/app/api-reference/functions/revalidatePath.md)
    -   API Reference for the revalidatePath function.
-   [revalidateTag](/docs/app/api-reference/functions/revalidateTag.md)
    -   API Reference for the revalidateTag function.
-   [redirect](/docs/app/api-reference/functions/redirect.md)
    -   API Reference for the redirect function.
