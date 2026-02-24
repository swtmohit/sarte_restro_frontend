"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function CartPage() {
  const { user, loading } = useAuth();
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Scroll reveal animations
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      ".reveal-on-scroll, .reveal-left, .reveal-right"
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [cart]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="text-xl text-gray-900 dark:text-gray-100">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = total * 0.1;
  const finalTotal = total + tax;

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    router.push("/checkout");
  };

  // Get emoji based on item name (fallback if no image)
  const getCategoryEmoji = (name: string) => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes("pizza")) return "🍕";
    if (nameLower.includes("burger")) return "🍔";
    if (nameLower.includes("salad")) return "🥗";
    if (nameLower.includes("chicken")) return "🍗";
    if (nameLower.includes("pasta")) return "🍝";
    if (nameLower.includes("fish")) return "🐟";
    if (nameLower.includes("cake") || nameLower.includes("dessert")) return "🍰";
    if (nameLower.includes("wings") || nameLower.includes("nachos")) return "🍤";
    return "🍽️";
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-60 md:h-72 lg:h-80 w-full overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop')",
          }}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />

        {/* Title and breadcrumb */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 reveal-on-scroll reveal-down">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-2xl mb-4">
            Shopping Cart
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm md:text-base font-semibold tracking-wide">
            <Link
              href="/"
              className="uppercase text-amber-400 hover:text-amber-300 transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <span className="uppercase text-amber-400">Pages</span>
            <span className="text-gray-300">/</span>
            <span className="uppercase text-white">Cart</span>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="container mx-auto px-4 py-16">
        {cart.length === 0 ? (
          <div className="text-center py-16 reveal-on-scroll reveal-down">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Your Cart is Empty
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold shadow-lg shadow-orange-500/40 hover:from-orange-700 hover:to-red-700 transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {cart.map((item, index) => (
                  <div
                    key={item.id}
                    className={`reveal-on-scroll ${
                      index % 2 === 0 ? "reveal-left" : "reveal-right"
                    } bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 border border-gray-200 dark:border-gray-700`}
                  >
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      {/* Item Image */}
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 flex items-center justify-center">
                            <span className="text-5xl">{getCategoryEmoji(item.name)}</span>
                          </div>
                        )}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 w-full md:w-auto text-center md:text-left">
                        <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                          {item.name}
                        </h3>
                        <p className="text-lg font-semibold text-amber-500 mb-4">
                          ₹{item.price.toFixed(2)} each
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center text-gray-900 dark:text-gray-100 font-bold transition-colors"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="w-12 text-center text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center text-gray-900 dark:text-gray-100 font-bold transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Price and Remove */}
                      <div className="flex flex-col items-center md:items-end gap-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="reveal-on-scroll reveal-right bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 sticky top-24 border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                  Order Summary
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>Tax (10%)</span>
                    <span className="font-semibold">₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="pt-4 border-t-2 border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900 dark:text-gray-100">Total</span>
                      <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        ₹{finalTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold shadow-lg shadow-orange-500/40 hover:from-orange-700 hover:to-red-700 transition-transform duration-200 hover:scale-105 active:scale-95"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

