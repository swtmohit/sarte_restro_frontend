"use client";

import { useEffect } from "react";

export default function ServicesPage() {
  const services = [
    {
      title: "Master Chefs",
      description:
        "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam.",
      icon: "👨‍🍳",
    },
    {
      title: "Quality Food",
      description:
        "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam.",
      icon: "🍽️",
    },
    {
      title: "Online Order",
      description:
        "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam.",
      icon: "🛒",
    },
    {
      title: "24/7 Service",
      description:
        "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam.",
      icon: "🎧",
    },
    {
      title: "Master Chefs",
      description:
        "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam.",
      icon: "👨‍🍳",
    },
    {
      title: "Quality Food",
      description:
        "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam.",
      icon: "🍽️",
    },
    {
      title: "Online Order",
      description:
        "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam.",
      icon: "🛒",
    },
    {
      title: "24/7 Service",
      description:
        "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam.",
      icon: "🎧",
    },
  ];

  // Scroll reveal for Services page (left/right and down)
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
        {/* Dark overlay to match theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />

        {/* Title and Breadcrumb */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 reveal-on-scroll reveal-down">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-2xl mb-4">
            Services
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm md:text-base font-semibold tracking-wide">
            <span className="uppercase text-amber-400">Home</span>
            <span className="text-gray-300">/</span>
            <span className="uppercase text-amber-400">Pages</span>
            <span className="text-gray-300">/</span>
            <span className="uppercase text-white">Service</span>
          </div>
        </div>
      </section>

      {/* Services Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-12 reveal-on-scroll reveal-down">
            <p className="text-sm md:text-base font-semibold uppercase tracking-[0.3em] text-amber-500 mb-3">
              Our Services
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-gray-100">
              Explore Our Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`reveal-on-scroll ${
                  index % 2 === 0 ? "reveal-left" : "reveal-right"
                } bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/40 p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-800/70 transition-shadow`}
              >
                <div className="text-4xl mb-4 text-amber-500">{service.icon}</div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  {service.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-700 dark:to-red-700 rounded-lg shadow-lg p-8 text-white reveal-on-scroll reveal-down">
            <h2 className="text-3xl font-bold mb-4 text-center">
              Ready to Experience Our Services?
            </h2>
            <p className="text-center mb-6 text-lg">
              Browse our menu and place your order today, or contact us for special requests
              and catering services.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="/"
                className="px-6 py-3 bg-white dark:bg-gray-100 text-orange-600 dark:text-orange-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 font-semibold transition"
              >
                View Menu
              </a>
              <a
                href="/contact"
                className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-orange-600 dark:hover:text-orange-700 font-semibold transition"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


