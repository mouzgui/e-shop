require('dotenv').config();
console.log("NEXT_PUBLIC_WOOCOMMERCE_URL:", process.env.NEXT_PUBLIC_WOOCOMMERCE_URL ? "Defined" : "Undefined");
console.log("WOOCOMMERCE_CONSUMER_KEY:", process.env.WOOCOMMERCE_CONSUMER_KEY ? "Defined" : "Undefined");
console.log("WOOCOMMERCE_CONSUMER_SECRET:", process.env.WOOCOMMERCE_CONSUMER_SECRET ? "Defined" : "Undefined");
