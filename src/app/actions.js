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

export async function processOrder(orderData) {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("Processing Order:", orderData);

  // Revalidate orders path so the user sees the new order in their history immediately
  revalidatePath("/orders");

  return { success: true, orderId: `ORD-${Math.floor(Math.random() * 10000)}` };
}
