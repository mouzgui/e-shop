"use server";

import { revalidatePath } from "next/cache";

export async function submitContactForm(formData) {
  // Simulate server-side processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  console.log("Server received contact form:", rawData);

  // In a real app, you would send an email or save to DB here
  return { success: true, message: "Message sent successfully!" };
}

import { createOrder } from "./api/orders";

export async function processOrder(orderData, cartItems) {
  "use server";

  console.log("Processing Order for:", orderData.email);

  const result = await createOrder(orderData, cartItems);

  if (result.success) {
    // Revalidate orders path so the user sees the new order in their history immediately
    revalidatePath("/orders");
    return { success: true, orderId: result.orderId };
  } else {
    return { success: false, error: result.error };
  }
}
