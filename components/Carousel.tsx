"use client";

import { useState, useEffect } from "react";

interface CarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
  title?: string;
  onSearch?: (query: string) => void;
}

export default function Carousel({ images, autoPlay = true, interval = 5000, title, onSearch }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Carousel Images */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Carousel slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40 dark:bg-black/50"></div>
          </div>
        ))}
      </div>

      {/* Title and Search Bar Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4">
        {/* Title */}
        {title && (
          <div className="mb-8 text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 drop-shadow-2xl flex items-center justify-center gap-4 flex-wrap">
              {title === "Sarte Restro" ? (
                <>
                  <span className="bg-gradient-to-r from-white via-orange-100 to-red-100 bg-clip-text text-transparent">
                    Sarte
                  </span>
                  <img 
                    src="/new.png" 
                    alt="Sarte Restro Logo" 
                    className="h-16 md:h-20 lg:h-40 w-auto drop-shadow-2xl"
                  />
                  <span className="bg-gradient-to-r from-white via-orange-100 to-red-100 bg-clip-text text-transparent">
                    Restro
                  </span>
                </>
              ) : (
                <span className="bg-gradient-to-r from-white via-orange-100 to-red-100 bg-clip-text text-transparent">
                  {title}
                </span>
              )}
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white drop-shadow-lg">
              Good Food, Great Mood.
            </p>
          </div>
        )}

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="w-full max-w-2xl">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-6 w-6 text-gray-400 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for delicious food..."
              className="w-full pl-12 pr-24 py-4 text-lg bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-2 border-white/50 dark:border-gray-700/50 rounded-full shadow-2xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-500/50 dark:focus:ring-orange-400/50 focus:border-orange-500 dark:focus:border-orange-400 transition-all duration-300"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-500 dark:to-red-500 text-white rounded-full font-semibold hover:from-orange-700 hover:to-red-700 dark:hover:from-orange-600 dark:hover:to-red-600 shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white dark:bg-orange-400 w-8"
                  : "bg-white/50 dark:bg-gray-600/50 hover:bg-white/75 dark:hover:bg-gray-500/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

