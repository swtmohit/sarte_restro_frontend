"use client";

import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Food {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category?: string;
}

interface FoodCardProps {
  food: Food;
  viewMode?: "grid" | "list";
}

export default function FoodCard({ food, viewMode = "grid" }: FoodCardProps) {
  const { addToCart, cart, updateQuantity } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const animateToCart = (buttonElement: HTMLElement) => {
    const cartIcon = document.getElementById("cart-icon-navbar");
    if (!cartIcon) return;

    const buttonRect = buttonElement.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    // Create animated element
    const animatedElement = document.createElement("div");
    animatedElement.style.position = "fixed";
    animatedElement.style.left = `${buttonRect.left + buttonRect.width / 2}px`;
    animatedElement.style.top = `${buttonRect.top + buttonRect.height / 2}px`;
    animatedElement.style.width = "48px";
    animatedElement.style.height = "48px";
    animatedElement.style.borderRadius = "50%";
    animatedElement.style.background = "linear-gradient(to right, #f97316, #ef4444)";
    animatedElement.style.zIndex = "9999";
    animatedElement.style.pointerEvents = "none";
    animatedElement.style.display = "flex";
    animatedElement.style.alignItems = "center";
    animatedElement.style.justifyContent = "center";
    animatedElement.style.transform = "translate(-50%, -50%) scale(1)";
    animatedElement.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    animatedElement.style.boxShadow = "0 4px 12px rgba(249, 115, 22, 0.5), 0 0 0 2px rgba(255, 255, 255, 0.2)";

    // Add cart icon inside
    animatedElement.innerHTML = `
      <svg style="width: 24px; height: 24px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    `;

    document.body.appendChild(animatedElement);

    // Trigger animation
    requestAnimationFrame(() => {
      animatedElement.style.left = `${cartRect.left + cartRect.width / 2}px`;
      animatedElement.style.top = `${cartRect.top + cartRect.height / 2}px`;
      animatedElement.style.transform = "translate(-50%, -50%) scale(0.3)";
      animatedElement.style.opacity = "0.8";
    });

    // Remove element after animation
    setTimeout(() => {
      animatedElement.remove();
    }, 600);
  };

  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!user) {
      router.push("/login");
      return;
    }

    // Ensure the item exists in cart with at least quantity 1
    const existingItem = cart.find((item) => item.id === food.id);

    if (!existingItem) {
      addToCart({
        id: food.id,
        name: food.name,
        price: food.price,
        image: food.image,
      });
      setQuantity(1);
    } else {
      setQuantity(existingItem.quantity);
    }

    // Show quantity selector linked to cart quantity
    setShowQuantitySelector(true);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > 99) return;
    setQuantity(newQuantity);

    // Keep cart in sync so navbar count updates immediately
    updateQuantity(food.id, newQuantity);
  };

  const handleConfirmAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!user) {
      router.push("/login");
      return;
    }

    setIsAdding(true);

    // Trigger animation
    animateToCart(e.currentTarget);

    // Just play animation and close selector; cart is already in sync
    setTimeout(() => {
      setIsAdding(false);
      setShowQuantitySelector(false);
    }, 500);
  };

  const handleCancelQuantity = () => {
    setShowQuantitySelector(false);
    setQuantity(1);
  };

  // Get emoji based on category
  const getCategoryEmoji = (category?: string) => {
    const emojiMap: { [key: string]: string } = {
      Pizza: "🍕",
      Burgers: "🍔",
      Salads: "🥗",
      "Main Course": "🍖",
      Pasta: "🍝",
      Seafood: "🐟",
      Desserts: "🍰",
      Appetizers: "🍤",
    };
    return emojiMap[category || ""] || "🍽️";
  };

  if (viewMode === "list") {
    return (
      <div className="group rounded-3xl bg-white dark:bg-slate-900 shadow-lg border border-gray-200 dark:border-slate-700">
        <div className="flex flex-row rounded-3xl overflow-hidden">
          {/* Image/Icon Section */}
          <div className="relative w-32 md:w-40 flex-shrink-0 flex items-center justify-center p-4">
            {food.image ? (
              <img
                src={food.image}
                alt={food.name}
                className="h-20 w-20 md:h-24 md:w-24 rounded-full object-cover border-4 border-white/20 shadow-lg"
              />
            ) : (
              <span
                className="text-5xl md:text-6xl"
              >
                {getCategoryEmoji(food.category)}
              </span>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-1 flex flex-col justify-between p-5">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100/90 dark:bg-slate-900/90 px-3 py-1 text-xs font-semibold text-amber-500 mb-2">
                <span>{getCategoryEmoji(food.category)}</span>
                <span>{food.category || "Menu"}</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-1 text-gray-900 dark:text-white">
                {food.name}
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                {food.description}
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 mt-4">
              <div className="rounded-full bg-slate-100/90 dark:bg-slate-900/90 px-4 py-1 text-sm font-bold text-gray-900 dark:text-white shadow">
                ₹{food.price.toFixed(2)}
              </div>
              {showQuantitySelector ? (
                <div className="flex items-center gap-2 animate-fade-in-up">
                  <button
                    className="flex-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1.5 text-xs md:text-sm font-semibold text-white shadow-md shadow-orange-500/40 flex items-center justify-center gap-2"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(quantity - 1);
                      }}
                      className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold transition-colors text-xs"
                    >
                      −
                    </button>
                    <span className="text-sm font-bold min-w-[20px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(quantity + 1);
                      }}
                      className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold transition-colors text-xs"
                    >
                      +
                    </button>
                  </button>
                  <button
                    onClick={handleConfirmAdd}
                    className="px-2 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md shadow-orange-500/40 hover:from-orange-600 hover:to-red-600 transition-colors"
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAddToCartClick}
                  className={`rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-4 py-1.5 text-xs md:text-sm font-semibold text-white shadow-md shadow-orange-500/40 flex items-center justify-center gap-2 ${
                    isAdding ? "animate-pulse" : ""
                  }`}
                >
                  {isAdding ? (
                    <>
                      <svg
                        className="h-3.5 w-3.5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="group rounded-3xl bg-white dark:bg-slate-900 shadow-lg border border-gray-200 dark:border-slate-700 min-h-[420px]">
      <div className="flex h-full flex-col rounded-3xl overflow-hidden">
        {/* Top badges */}
        <div className="flex items-center justify-between px-5 pt-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100/90 dark:bg-slate-900/90 px-3 py-1 text-xs font-semibold text-amber-500">
            <span>{getCategoryEmoji(food.category)}</span>
            <span>{food.category || "Menu"}</span>
          </div>
          <div className="rounded-full bg-slate-100/90 dark:bg-slate-900/90 px-4 py-1 text-sm font-bold text-gray-900 dark:text-white shadow">
            ₹{food.price.toFixed(2)}
          </div>
        </div>

        {/* Food Image */}
        <div className="relative flex-1 flex items-center justify-center px-5 pb-4 pt-4 min-h-[220px]">
          {food.image ? (
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-40 md:h-48 object-cover rounded-2xl border-2 border-white/10 shadow-2xl"
            />
          ) : (
            <span
              className="text-7xl md:text-8xl"
            >
              {getCategoryEmoji(food.category)}
            </span>
          )}
        </div>

        {/* Bottom content */}
        <div className="mt-auto bg-white dark:bg-slate-950/95 px-5 pb-5 pt-3">
          <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
            {food.name}
          </h3>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
            {food.description}
          </p>

          {showQuantitySelector ? (
            <div className="w-3/4 mx-auto flex items-center gap-2 animate-fade-in-up">
              <button
                className="flex-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 py-2 text-sm font-semibold text-white shadow-md shadow-orange-500/40 flex items-center justify-center gap-3 px-2"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuantityChange(quantity - 1);
                  }}
                  className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold transition-colors"
                >
                  −
                </button>
                <span className="text-base font-bold min-w-[24px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuantityChange(quantity + 1);
                  }}
                  className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold transition-colors"
                >
                  +
                </button>
              </button>
              <button
                onClick={handleConfirmAdd}
                className="px-3 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md shadow-orange-500/40 hover:from-orange-600 hover:to-red-600 transition-colors"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCartClick}
              className={`w-3/4 mx-auto rounded-full bg-gradient-to-r from-orange-500 to-red-500 py-2 text-sm font-semibold text-white shadow-md shadow-orange-500/40 flex items-center justify-center gap-2 ${
                isAdding ? "animate-pulse" : ""
              }`}
            >
              {isAdding ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

