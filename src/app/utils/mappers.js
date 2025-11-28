/**
 * Maps a WooCommerce product to our app's internal product structure
 * @param {Object} wooProduct - The product object from WooCommerce API
 * @returns {Object} - The mapped product object
 */
export const mapWooProductToApp = (wooProduct) => {
    // Handle images
    const images = wooProduct.images.map((img) => img.src);
    const image = images[0] || "https://placehold.co/600x400?text=No+Image";

    // Handle categories
    const category =
        wooProduct.categories.length > 0 ? wooProduct.categories[0].name : "Uncategorized";

    // Handle price (WooCommerce returns string)
    const price = parseFloat(wooProduct.price || wooProduct.regular_price || 0);

    // Handle description (WooCommerce returns HTML)
    // Simple strip tags for now, or keep HTML if using dangerouslySetInnerHTML
    const description = wooProduct.description.replace(/<[^>]*>?/gm, "") || wooProduct.short_description.replace(/<[^>]*>?/gm, "");

    return {
        id: wooProduct.id,
        name: wooProduct.name,
        price: price,
        regular_price: parseFloat(wooProduct.regular_price || 0),
        sale_price: parseFloat(wooProduct.sale_price || 0),
        on_sale: wooProduct.on_sale,
        category: category,
        image: image,
        images: images,
        rating: parseFloat(wooProduct.average_rating) || 0,
        reviews: wooProduct.rating_count || 0,
        description: description,
        features: [], // WooCommerce doesn't have a direct features array, could use attributes
        stock_status: wooProduct.stock_status,
        stock_quantity: wooProduct.stock_quantity,
    };
};

/**
 * Maps app cart items to WooCommerce line items
 * @param {Array} cartItems - Array of cart items from StoreContext
 * @returns {Array} - Array of line items for WooCommerce order
 */
export const mapCartToWooLineItems = (cartItems) => {
    return cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.qty,
    }));
};
