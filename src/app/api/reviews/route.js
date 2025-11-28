import { NextResponse } from "next/server";
import { createProductReview, getProductReviews } from "../products";

export async function POST(request) {
    try {
        const body = await request.json();
        const { product_id, review, reviewer, reviewer_email, rating } = body;

        if (!product_id || !review || !reviewer || !reviewer_email || !rating) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const newReview = await createProductReview({
            product_id,
            review,
            reviewer,
            reviewer_email,
            rating: parseInt(rating),
        });

        return NextResponse.json(newReview, { status: 201 });
    } catch (error) {
        console.error("Review submission error:", error);
        return NextResponse.json(
            { error: "Failed to submit review" },
            { status: 500 }
        );
    }
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("product_id");

    if (!productId) {
        return NextResponse.json(
            { error: "Product ID is required" },
            { status: 400 }
        );
    }

    const reviews = await getProductReviews(productId);
    return NextResponse.json(reviews);
}
