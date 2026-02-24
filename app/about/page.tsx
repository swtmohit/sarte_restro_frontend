"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function AboutPage() {
  // Scroll reveal for About page (left/right and down)
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
  }, []);

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
            About Us
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
            <span className="uppercase text-white">About</span>
          </div>
        </div>
      </section>

      {/* Welcome / Highlight Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          {/* Image collage */}
          <div className="grid gap-4 md:grid-cols-2 reveal-on-scroll reveal-left">
            <div className="rounded-2xl overflow-hidden shadow-xl shadow-gray-900/20 h-64 md:h-72">
              <img
                src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=900&h=700&fit=crop"
                alt="Restaurant interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-xl shadow-gray-900/20 h-32 md:h-36">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&h=600&fit=crop"
                  alt="Cozy dining area"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl shadow-gray-900/20 h-32 md:h-36">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&h=600&fit=crop"
                  alt="Delicious food"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="reveal-on-scroll reveal-right">
            <p className="text-sm md:text-base font-semibold uppercase tracking-[0.3em] text-amber-500 mb-3">
              About Us
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
              Welcome to{" "}
              <span className="text-amber-500 align-middle">🍴</span>{" "}
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 bg-clip-text text-transparent">
                Sarte Restro
              </span>
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
              diam amet diam et eos erat ipsum et lorem et sit, sed stet lorem
              sit.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat
              ipsum et lorem et sit, sed stet lorem sit clita duo justo magna
              dolore erat amet.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-8 md:gap-12 mb-8">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-extrabold text-amber-500">
                    15
                  </span>
                  <span className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400">
                    Years of
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Experience
                </p>
              </div>

              <div className="h-12 w-px bg-gray-300 dark:bg-gray-700 hidden md:block" />

              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-extrabold text-amber-500">
                    50
                  </span>
                  <span className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400">
                    Popular
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Master Chefs
                </p>
              </div>
            </div>

            <button className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold shadow-lg shadow-orange-500/40 hover:from-orange-700 hover:to-red-700 transition-transform duration-200 hover:scale-105 active:scale-95">
              Read More
            </button>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="bg-gray-50 dark:bg-gray-900/40 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal-on-scroll reveal-down">
            <p className="text-sm md:text-base font-semibold uppercase tracking-[0.3em] text-amber-500 mb-3">
              Team Members
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-gray-100">
              Our Master Chefs
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((chef) => (
              <div
                key={chef}
                className="reveal-on-scroll reveal-down bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900/40 px-6 pt-8 pb-6 flex flex-col items-center transition-transform duration-200 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/20"
              >
                <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-gray-100 dark:border-gray-700 shadow-md">
                  <img
                    src={
                      chef === 1
                        ? "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=600&fit=crop"
                        : chef === 2
                        ? "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&h=600&fit=crop"
                        : chef === 3
                        ? "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=600&fit=crop"
                        : "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=600&fit=crop"
                    }
                    alt="Master Chef"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Full Name
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Designation
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


