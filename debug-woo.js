const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
console.log("Type of default export:", typeof WooCommerceRestApi);
console.log("Is constructor?", typeof WooCommerceRestApi === 'function' && /^\s*class\s+/.test(WooCommerceRestApi.toString()));
console.log("Exports:", require("@woocommerce/woocommerce-rest-api"));
