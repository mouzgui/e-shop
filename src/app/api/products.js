import api from "../lib/woocommerce";
import { mapWooProductToApp } from "../utils/mappers";

// Cache for categories to reduce API calls
let cachedCategories = null;

export async function getAllProducts(perPage = 20, page = 1) {
    try {
        const response = await api.get("products", {
            per_page: perPage,
            page: page,
            status: "publish",
        });
        return response.data.map(mapWooProductToApp);
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

export async function getProductById(id) {
    try {
        const response = await api.get(`products/${id}`);
        return mapWooProductToApp(response.data);
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        return null;
    }
}

export async function getProductsByCategory(categoryId, perPage = 20) {
    try {
        const response = await api.get("products", {
            category: categoryId,
            per_page: perPage,
            status: "publish",
        });
        return response.data.map(mapWooProductToApp);
    } catch (error) {
        console.error(`Error fetching products for category ${categoryId}:`, error);
        return [];
    }
}

export async function getCategories() {
    if (cachedCategories) return cachedCategories;

    try {
        const response = await api.get("products/categories", {
            per_page: 100,
            hide_empty: true,
        });

        // Map to simple array of names for now to match current app structure
        // Or return full objects if we want to update the UI to use IDs
        const categories = ["All", ...response.data.map((c) => c.name)];
        cachedCategories = categories;
        return categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return ["All"];
    }
}

export async function searchProducts(query) {
    try {
        const response = await api.get("products", {
            search: query,
            per_page: 20,
            status: "publish",
        });
        return response.data.map(mapWooProductToApp);
    } catch (error) {
        console.error(`Error searching products for "${query}":`, error);
        return [];
    }
}
