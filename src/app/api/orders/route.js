import { NextResponse } from "next/server";
import { getOrders } from "../orders";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    // In a real app, we would get the user's email from the session
    // For this demo, we'll accept it as a query param or fetch all if not provided (admin view simulation)

    const orders = await getOrders(email);
    return NextResponse.json(orders);
}
