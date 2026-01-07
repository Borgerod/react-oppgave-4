import { NextResponse } from "next/server";
import { getTop9Authors } from "@/lib/getTop9Authors";

export async function GET() {
	const authors = await getTop9Authors();
	return NextResponse.json(authors);
}
