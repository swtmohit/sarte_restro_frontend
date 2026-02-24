"use client";

import { useEffect, useState } from "react";
import FoodCard from "@/components/FoodCard";
import { sampleFoods } from "@/data/sampleFoods";
import Carousel from "@/components/Carousel";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFoods, setFilteredFoods] = useState(sampleFoods);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Carousel images - Replace these with your actual image paths
  // Place your images in the public/images/ directory
  const carouselImages = [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1920&h=1080&fit=crop", // Burger image
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1920&h=1080&fit=crop",
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredFoods(sampleFoods);
    } else {
      const filtered = sampleFoods.filter(
        (food) =>
          food.name.toLowerCase().includes(query.toLowerCase()) ||
          food.description.toLowerCase().includes(query.toLowerCase()) ||
          food.category?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredFoods(filtered);
    }
  };

  // Scroll reveal: add 'revealed' class when elements come into view
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal-on-scroll");
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
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Carousel Section */}
      <Carousel 
        images={carouselImages} 
        title="Sarte Restro"
        onSearch={handleSearch}
      />

      {/* Menu Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="reveal-on-scroll reveal-down flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 dark:from-orange-400 dark:via-red-400 dark:to-amber-400 bg-clip-text text-transparent">
              Our Menu
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-red-600 mx-auto md:mx-0 rounded-full"></div>
            <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">
              Discover our delicious selection of culinary delights
            </p>
          </div>
          
          {/* View Toggle */}
          <div className="flex items-center justify-center md:justify-end gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all duration-200 ${
                viewMode === "grid"
                  ? "bg-orange-600 text-white shadow-lg"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              aria-label="Grid view"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all duration-200 ${
                viewMode === "list"
                  ? "bg-orange-600 text-white shadow-lg"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              aria-label="List view"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        {searchQuery && (
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8 text-lg">
            {filteredFoods.length > 0
              ? `Found ${filteredFoods.length} result(s) for "${searchQuery}"`
              : `No results found for "${searchQuery}"`}
          </p>
        )}
        {filteredFoods.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                : "flex flex-col gap-6"
            }
          >
            {filteredFoods.map((food) => (
              <div key={food.id} className="reveal-on-scroll reveal-down">
                <FoodCard food={food} viewMode={viewMode} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              No food items found. Try a different search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

