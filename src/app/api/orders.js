import api from "../lib/woocommerce";
import { mapCartToWooLineItems } from "../utils/mappers";

export async function createOrder(orderData, cartItems) {
    try {
        const lineItems = mapCartToWooLineItems(cartItems);

        const data = {
            payment_method: "cod", // Default to COD for now as per current UI
            payment_method_title: "Cash on Delivery",
            set_paid: false,
            billing: {
                first_name: orderData.firstName,
                last_name: orderData.lastName,
                address_1: orderData.address,
                city: orderData.city,
                postcode: orderData.zip,
                email: orderData.email,
                phone: orderData.phone || "",
            },
            shipping: {
                first_name: orderData.firstName,
                last_name: orderData.lastName,
                address_1: orderData.address,
                city: orderData.city,
                postcode: orderData.zip,
            },
            line_items: lineItems,
        };

        const response = await api.post("orders", data);
        return {
            success: true,
            orderId: response.data.id,
            orderKey: response.data.order_key,
            total: response.data.total,
        };
    } catch (error) {
        console.error("Error creating order:", error.response ? error.response.data : error.message);
        return {
            success: false,
            error: error.message,
        };
    }
}

export async function getOrderById(id) {
    try {
        const response = await api.get(`orders/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching order ${id}:`, error);
        return null;
    }
}
