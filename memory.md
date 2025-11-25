# Project Memory: Online Store

## 1. Project Overview
**Name:** Store
**Description:** A modern e-commerce application built with Next.js 16, featuring a responsive design, shopping cart functionality, and server-side actions.

## 2. Tech Stack
- **Framework:** Next.js 16.0.3 (App Router)
- **Library:** React 19.2.0
- **Styling:** Tailwind CSS 4, PostCSS
- **Icons:** Lucide React
- **Linting:** ESLint

## 3. Core Features & Functionality

### 3.1. Pages
- **Home (`/`)**:
  - Hero section with "Explore Shop" and "Our Story" calls to action.
  - "Trending Now" section displaying a subset of products.
  - Responsive layout with a modern design.
- **Shop (`/shop`)**:
  - Full product listing.
  - **Client-side Filtering:** Filter by category (All, Lumina, Vogue, etc.) and search query.
  - **Search:** Real-time search functionality.
  - **Product Cards:** Display product image, name, price, and category.
- **Cart (`/cart`)**:
  - Displays added items with images, names, and prices.
  - **Quantity Controls:** Increase/decrease item quantity.
  - **Remove Item:** Delete items from the cart.
  - **Order Summary:** Calculates subtotal and total (Shipping is free).
  - **Empty State:** Visual feedback when the cart is empty with a link to start shopping.
- **Checkout (`/checkout`)**:
  - (Inferred) Page to finalize the purchase.
- **About (`/about`)**:
  - (Inferred) Company story/information.
- **Contact (`/contact`)**:
  - (Inferred) Contact form.
- **Orders (`/orders`)**:
  - (Inferred) Order history.
- **Wishlist (`/wishlist`)**:
  - (Inferred) Saved items.

### 3.2. Server Actions (`src/app/actions.js`)
- **`submitContactForm(formData)`**:
  - Simulates server-side processing (1s delay).
  - Logs form data (name, email, message).
  - Returns success message.
- **`processOrder(orderData)`**:
  - Simulates order processing (2s delay).
  - Logs order data.
  - Revalidates `/orders` path.
  - Returns success status and a generated Order ID.

### 3.3. State Management (`src/app/context`)
- **`StoreContext`**: Manages global application state, primarily the Shopping Cart (add, remove, update quantity, cart total) and Search Query.
- **`ToastContext`**: Manages toast notifications for user feedback.

### 3.4. Data Management (`src/app/data`)
- **`products.js`**: Contains static data for products and categories (`DB` object). Used for rendering product lists and filtering.

### 3.5. UI Components (`src/app/components`)
- **Global:** `Header`, `Footer`, `Layout`.
- **Product:** `ProductCard`.
- **UI Elements (`src/app/components/ui`)**:
  - `Button`: Reusable button component.
  - `Badge`: Reusable badge component.
- **Styling:** Uses a centralized theme object (`src/app/utils/theme.js`) for consistent layout and component styling.

## 4. Architecture & Design
- **App Router:** Uses Next.js App Router structure (`src/app`).
- **Responsive Design:** Mobile-friendly layouts using Tailwind CSS breakpoints.
- **Animations:** Uses `animate-fade-in` and transition effects for a smooth user experience.
- **Assets:** Images sourced from Unsplash.

## 5. Key Files
- `src/app/page.js`: Main entry point/Home page.
- `src/app/layout.js`: Root layout.
- `src/app/globals.css`: Global styles and Tailwind directives.
- `src/app/actions.js`: Server-side logic.
- `src/app/context/StoreContext.js`: Cart logic.
