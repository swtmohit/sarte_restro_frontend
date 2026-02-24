"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/contexts/OrdersContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const { orders, updateOrderStatus } = useOrders();
  const router = useRouter();
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);

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
  }, [orders]);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300";
      case "preparing":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300";
      case "delivered":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300";
      case "cancelled":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300";
    }
  };

  const handleCancelClick = (orderId: string) => {
    setOrderToCancel(orderId);
  };

  const handleConfirmCancel = () => {
    if (orderToCancel) {
      updateOrderStatus(orderToCancel, "cancelled");
      setOrderToCancel(null);
    }
  };

  const handleCancelModal = () => {
    setOrderToCancel(null);
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-56 md:h-64 lg:h-72 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1920&h=1080&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 reveal-on-scroll reveal-down">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-2xl mb-4">
            My Orders
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
            <span className="uppercase text-white">Orders</span>
          </div>
        </div>
      </section>

      {/* Orders Content */}
      <section className="container mx-auto px-4 py-16">
        {orders.length === 0 ? (
          <div className="text-center py-16 reveal-on-scroll reveal-down">
            <div className="text-6xl mb-6">🧾</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              You have no orders yet
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Start exploring our menu and place your first order.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold shadow-lg shadow-orange-500/40 hover:from-orange-700 hover:to-red-700 transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              Start Ordering
            </Link>
          </div>
        ) : (
          <div className="space-y-8 max-w-6xl mx-auto">
            {orders.map((order, index) => (
              <div
                key={order.id}
                className={`reveal-on-scroll ${
                  index % 2 === 0 ? "reveal-left" : "reveal-right"
                } bg-white dark:bg-gray-900/80 rounded-2xl shadow-lg dark:shadow-gray-900/60 border border-gray-200 dark:border-gray-700 w-full`}
              >
                {/* Header row */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 gap-4">
                  <div className="flex-shrink-0">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Order #{order.id.slice(-6)}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      {new Date(order.date).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span
                      className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <div className="text-right">
                      <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        Total
                      </p>
                      <p className="text-2xl font-extrabold text-orange-600 dark:text-orange-400">
                        ₹{order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Items + details */}
                <div className="px-6 py-4 md:py-5 grid grid-cols-1 md:grid-cols-[2fr_1.2fr] gap-6">
                  <div className="min-w-0">
                    <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Items</h4>
                    <ul className="space-y-2">
                      {order.items.map((item) => (
                        <li
                          key={item.id}
                          className="flex justify-between text-sm text-gray-700 dark:text-gray-200"
                        >
                          <span>
                            {item.name}{" "}
                            <span className="text-gray-500 dark:text-gray-400">× {item.quantity}</span>
                          </span>
                          <span className="font-semibold text-gray-900 dark:text-gray-100">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="min-w-0 rounded-xl bg-gray-100 dark:bg-slate-900/70 border border-gray-300 dark:border-slate-700 p-4 text-sm text-gray-800 dark:text-gray-200 flex flex-col justify-between">
                    <div>
                      <p className="mb-1">
                        <span className="font-semibold">Address:</span> {order.address}
                      </p>
                      <p className="mb-1">
                        <span className="font-semibold">Phone:</span> {order.phone}
                      </p>
                      <p className="mb-2">
                        <span className="font-semibold">Payment:</span>{" "}
                        {order.paymentMethod}
                      </p>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => handleCancelClick(order.id)}
                        disabled={order.status === "cancelled" || order.status === "delivered"}
                        className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                          order.status === "cancelled" || order.status === "delivered"
                            ? "border-gray-400 dark:border-gray-500 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                            : "border-red-500 dark:border-red-500 text-red-600 dark:text-red-400 hover:bg-red-500 hover:text-white"
                        }`}
                      >
                        {order.status === "cancelled" ? "Order Cancelled" : "Cancel Order"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Confirmation Modal */}
      {orderToCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Cancel Order?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Are you sure you want to cancel this order? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleCancelModal}
                className="flex-1 px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                No, Keep Order
              </button>
              <button
                onClick={handleConfirmCancel}
                className="flex-1 px-4 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors"
              >
                Yes, Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

