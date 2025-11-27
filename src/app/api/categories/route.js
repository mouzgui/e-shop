import { NextResponse } from "next/server";
import { getCategories } from "../products";

export async function GET() {
    const categories = await getCategories();
    return NextResponse.json(categories);
}
