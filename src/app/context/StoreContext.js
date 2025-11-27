"use client";
import React, {
  useState,
  useContext,
  createContext,
  useMemo,
  useCallback,
} from "react";
import { useToast } from "./ToastContext";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const { addToast } = useToast();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = useCallback(
    (product, quantity = 1) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + quantity } : item
          );
        }
        return [...prev, { ...product, qty: quantity }];
      });
      const message = quantity > 1
        ? `Added ${quantity} ${product.name}s to cart`
        : `Added ${product.name} to cart`;
      addToast(message);
    },
    [addToast]
  );

  const removeFromCart = useCallback(
    (id) => {
      setCart((prev) => prev.filter((item) => item.id !== id));
      addToast("Item removed from cart", "info");
    },
    [addToast]
  );

  const updateQty = useCallback((id, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.qty + delta);
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.qty, 0),
    [cart]
  );
  const cartCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.qty, 0),
    [cart]
  );

  const toggleWishlist = useCallback(
    (product) => {
      setWishlist((prev) => {
        const exists = prev.find((item) => item.id === product.id);
        if (exists) {
          return prev.filter((item) => item.id !== product.id);
        }
        return [...prev, product];
      });

      // Side effect outside of state updater
      // Note: We need to know if it was added or removed.
      // Since setWishlist is async, we can't check the new state immediately.
      // But we can check the *current* state before the update queue processes.
      // However, relying on 'wishlist' dependency might be stale if not careful.
      // Better approach: Check existence based on current 'wishlist' state in scope if we include it in dependency,
      // OR just assume the toggle logic is consistent.
      // Let's use the functional update for state, but determine toast message based on current state.
      // Actually, to be safe and simple:
      const isCurrentlyInWishlist = wishlist.some((item) => item.id === product.id);
      if (isCurrentlyInWishlist) {
        addToast("Removed from wishlist", "info");
      } else {
        addToast("Added to wishlist");
      }
    },
    [addToast, wishlist] // Added wishlist to dependency
  );

  const isInWishlist = useCallback(
    (id) => wishlist.some((item) => item.id === id),
    [wishlist]
  );

  const placeOrder = useCallback(
    (orderDetails) => {
      const newOrder = {
        id: `ORD-${Math.floor(Math.random() * 10000)}`,
        date: new Date().toISOString(),
        status: "Processing",
        items: [...cart],
        total: cartTotal,
        shipping: orderDetails,
      };
      setOrders((prev) => [newOrder, ...prev]);
      clearCart();
      return newOrder;
    },
    [cart, cartTotal, clearCart]
  );

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      cartTotal,
      cartCount,
      wishlist,
      toggleWishlist,
      isInWishlist,
      orders,
      placeOrder,
      searchQuery,
      setSearchQuery,
    }),
    [
      cart,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      cartTotal,
      cartCount,
      wishlist,
      toggleWishlist,
      isInWishlist,
      orders,
      placeOrder,
      searchQuery,
    ]
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
