require('dotenv').config();
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

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
    queryStringAuth: true,
    axiosConfig: {
        httpsAgent: new (require("https").Agent)({ rejectUnauthorized: false })
    }
});

console.log("Testing connection to (cleaned):", cleanUrl(process.env.NEXT_PUBLIC_WOOCOMMERCE_URL));

api.get("products", { per_page: 1 })
    .then((response) => {
        console.log("Connection Successful!");
        console.log("Status:", response.status);
        console.log("Products found:", response.data.length);
    })
    .catch((error) => {
        console.log("Connection Failed!");
        if (error.response) {
            console.log("Status:", error.response.status);
            console.log("Headers:", error.response.headers);
            console.log("Data:", error.response.data);
        } else {
            console.log("Error:", error.message);
        }
        if (error.config) {
            console.log("Requested URL:", error.config.url);
            console.log("Base URL:", error.config.baseURL);
        }
    });
