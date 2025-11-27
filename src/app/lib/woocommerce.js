import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

console.log("WooCommerceRestApi import:", WooCommerceRestApi);
// Sanitize URL to remove potential duplicate API path and trailing slashes
const cleanUrl = (url) => {
    if (!url) return "";
    return url.replace(/\/wp-json\/wc\/v3\/?$/, "").replace(/\/+$/, "");
};

const api = new WooCommerceRestApi({
    url: cleanUrl(process.env.NEXT_PUBLIC_WOOCOMMERCE_URL),
    consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
    consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
    version: "wc/v3",
    queryStringAuth: true, // Force query string auth to avoid header stripping on redirects
    axiosConfig: {
        httpsAgent:
            process.env.NODE_ENV === "development"
                ? new (require("https").Agent)({ rejectUnauthorized: false })
                : undefined,
    },
});

export default api;
