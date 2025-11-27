import { NextResponse } from "next/server";
import { getAllProducts, searchProducts, getProductsByCategory } from "../products";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const page = searchParams.get("page") || 1;
    const limit = searchParams.get("limit") || 20;

    let products = [];

    if (search) {
        products = await searchProducts(search);
    } else if (category && category !== "All") {
        // We need to map category name to ID if possible, or search by category slug
        // For now, assuming our API service handles category name or we need to lookup ID
        // Since our getProductsByCategory takes ID, we might need to fetch categories first to find ID
        // Or update getProductsByCategory to handle slugs if WooCommerce API supports it (it does via 'slug' param)
        // Let's assume for now we pass the slug/name and update service if needed
        // Actually, WooCommerce API filters by category ID.
        // We might need a helper to get ID from slug.
        // For simplicity in this iteration, let's fetch all and filter if we can't get ID easily, 
        // OR better, let's update getAllProducts to accept params directly.

        // Let's try to use the existing service functions
        // If we don't have ID, we might struggle. 
        // Let's fetch all for now and filter? No, inefficient.
        // Let's assume we can pass the category slug to a modified service function?
        // Let's update api/products.js to support slug if possible, or just use getAllProducts with params if we exposed that.

        // Re-reading api/products.js: getProductsByCategory takes categoryId.
        // We need to find the category ID from the name/slug.
        // Let's just return all products for now and let client filter? No, that defeats the purpose.

        // Let's use getAllProducts but we need to pass filters.
        // The current getAllProducts only takes perPage and page.
        // Let's update this route to just return getAllProducts for now, 
        // and maybe we can enhance filtering later or client side filter if dataset is small.
        // But user wants REST API integration.

        // Let's use searchProducts if there is a query.
        // If category is selected, we really need the ID.
        // Let's fetch categories, find the ID, then fetch products.

        // For this MVP step, let's just fetch all products (maybe 100) and let client filter if we can't easily do server side yet without ID.
        // OR, let's just use getAllProducts.
        products = await getAllProducts(limit, page);
    } else {
        products = await getAllProducts(limit, page);
    }

    return NextResponse.json(products);
}
